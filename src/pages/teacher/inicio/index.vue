<template>
    <div class="px-8 py-8">
  
        <h1 v-if="activeDemoday" class="app-font-size-3xl app-font-weight-bold text-gray-600 my-1">
          {{ activeDemoday.name }}
        </h1>
        <p class="app-font-size-2xl app-font-weight-semibold text-gray-500 mb-5">Projetos submetidos</p>
  
        <v-row
          align-content="stretch"
        >   
          <v-col
            v-for="project in projectsPending"
            :key="project.id"
            sm="4"
            cols="12"
          >
              <v-card
                elevation="1"
              >
                  <v-img
                    class="align-end text-white"
                    height="200"
                    :src="`data:image/jpeg;base64, ${project.image}`"
                    cover
                  >
                      <v-btn
                        class="cursor-default"
                        style="position: absolute; top: 10px; right: 10px;"
                        rounded="lg"
                        size="small"
                        :color="projectType[project.type].color" 
                        elevation="2"
                      >
                        <span class="text-white font-weight-bold"> 
                            {{ projectType[project.type].text }}
                        </span> 
                      </v-btn>
                  </v-img>
                  <v-card-text>
                      <div
                        style="overflow:hidden;"
                      >
                        <h2 class="text-gray-700 app-font-size-md text-center">
                          {{ project.title }}
                        </h2>
                      </div>
                      <v-btn
                        color="yellow-ufba"
                        size="large"
                        block
                        flat
                        class="mt-3"
                        @click="analyzeProject(project.id)"
                        >
                        <span class="text-white app-font-weight-semibold" style="text-transform: none;">
                          Aprovar submissão
                        </span>
                      </v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
        </v-row>
  
        <v-row
          align-content="stretch"
        >   
          <v-col
            v-for="project in projectsAccepted"
            :key="project.id"
            sm="4"
            cols="12"
          >
              <v-card
                elevation="1"
              >
                  <v-img
                    class="align-end text-white"
                    height="200"
                    :src="`data:image/jpeg;base64, ${project.image}`"
                    cover
                  >
                      <v-btn
                        class="cursor-default"
                        style="position: absolute; top: 10px; right: 10px;"
                        rounded="lg"
                        size="small"
                        :color="projectType[project.type].color" 
                        elevation="2"
                      >
                        <span class="text-white font-weight-bold"> 
                            {{ projectType[project.type].text }}
                        </span> 
                      </v-btn>
                  </v-img>
                  <v-card-text>
                      <div
                        style="overflow:hidden;"
                      >
                        <h2 class="text-gray-700 app-font-size-md text-center">
                          {{ project.title }}
                        </h2>
                      </div>
                      <v-btn
                        color="green-ufba"
                        size="large"
                        block
                        flat
                        class="mt-3"
                        @click="evaluateProject(project.id)"
                      >
                        <span class="text-white app-font-weight-semibold" style="text-transform: none;">
                          Ver detalhes e avaliar
                        </span>
                      </v-btn>
                  </v-card-text>
              </v-card>
          </v-col>
        </v-row>
    </div>
    <Loader v-if="isLoading" />
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axiosInstance from '@/api/axiosInstance';
  import { Demoday, Project } from '@/types/index';
  
  definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Início',
  activeNavLink: '/teacher/inicio'
  })
  
  const isLoading = ref(false);
  
  const activeDemoday = ref<Demoday>();
  
  const projectsAccepted = ref<Project []>([]);
  
  const projectType = ref({
  'IC': {color: 'blue-ufba', text: 'IC'},
  'TCC': {color: 'red-ufba', text: 'TCC'},
  'DISC': {color: 'green-ufba', text: 'DISC'},
  'MSC': {color: 'yellow-ufba', text: 'MSC'},
  'PHD': {color: 'orange', text: 'PHD'},
  })
  
  const projectsPending = ref<Project []>([]);
  
  async function listPendingProjects() {
    try {
      isLoading.value = true;
      const { data } = await axiosInstance.get('/pendingprojects');
      projectsPending.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
  
  async function evaluateProject(id: number) {
    navigateTo(`/student/vote/${id}`);
  }
  
  async function analyzeProject(id: number) {
    await navigateTo({ path: `/teacher/evaluate/approve/${id}`});
  }
  
  async function getActiveDemoday() {
    try {
        isLoading.value = true;
        const { data } = await axiosInstance.get('/getactivedemoday');
        activeDemoday.value = data[0];
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
  }
  
  async function getDemodayAcceptedProjects(demodayId: number) {
    try {
        isLoading.value = true;
        const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${demodayId}`);
        projectsAccepted.value = data;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
  }
  
  onMounted(async () => {
    await getActiveDemoday();
    if(activeDemoday.value){
        const idDemoday = activeDemoday.value.id
        await getDemodayAcceptedProjects(idDemoday);
    }
    listPendingProjects()
  });
  </script>
  <style lang="scss" scoped>
  </style>