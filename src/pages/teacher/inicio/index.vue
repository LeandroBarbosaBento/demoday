<template>
    <div class="px-8 py-8">
      <template v-if="activeDemoday">
        <h1 class="app-font-size-3xl app-font-weight-bold text-gray-600 my-1">
          {{ activeDemoday.name }}
        </h1>

        <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mb-5">
          Projetos a serem aprovados
        </h2>

        <v-data-iterator
          :items="projectsPending"
          :items-per-page="$vuetify.display.xs ? 1 : 4"
        >
          <template v-slot:default="{ items }">
              <v-row dense>
                <v-col
                  v-for="project in items"
                  :key="project.raw.id"
                  sm="3"
                  cols="12"
                >
                  <v-card elevation="1">
                    <v-img
                      class="align-end text-white"
                      height="100"
                      :src="`data:image/jpeg;base64, ${project.raw.image}`"
                      cover
                    >
                      <v-btn
                        class="cursor-default"
                        style="position: absolute; top: 10px; right: 10px;"
                        rounded="lg"
                        size="small"
                        :color="projectType[project.raw.type].color" 
                        elevation="2"
                      >
                      <span class="text-white font-weight-bold"> 
                          {{ projectType[project.raw.type].text }}
                      </span> 
                      </v-btn>
                    </v-img>
                      <v-card-text>
                        <h2 class="text-gray-700 app-font-size-md text-center">
                            {{ project.raw.title }}
                        </h2>
                        <v-btn
                          color="yellow-ufba"
                          block
                          flat
                          class="mt-3"
                          @click="analyzeProject(project.raw.id)"
                        >
                          <span class="text-white app-font-weight-semibold" style="text-transform: none;">
                              Aprovar submissão
                          </span>
                        </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                density="comfortable"
                icon="mdi-arrow-left"
                variant="tonal"
                rounded
                @click="prevPage"
              />

              <div class="mx-2 text-caption text-center">
                Página {{ page }} de {{ pageCount }}
              </div>

              <v-btn
                :disabled="page >= pageCount"
                density="comfortable"
                icon="mdi-arrow-right"
                variant="tonal"
                rounded
                @click="nextPage"
              />
              <v-btn 
                variant="tonal"
                class="ml-2"
                @click="$router.push('/teacher/evaluate')"
              >Ver todos</v-btn>
            </div>
          </template>
        </v-data-iterator>

        <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mb-5 mt-10">
          Projetos aprovados
        </h2>

        <v-data-iterator
          :items="projectsAccepted"
          :items-per-page="$vuetify.display.xs ? 1 : 4"
        >
          <template v-slot:default="{ items }">
              <v-row dense>
                <v-col
                  v-for="project in items"
                  :key="project.raw.id"
                  sm="3"
                  cols="12"
                >
                  <v-card elevation="1">
                    <v-img
                      class="align-end text-white"
                      height="100"
                      :src="`data:image/jpeg;base64, ${project.raw.image}`"
                      cover
                    >
                      <v-btn
                        class="cursor-default"
                        style="position: absolute; top: 10px; right: 10px;"
                        rounded="lg"
                        size="small"
                        :color="projectType[project.raw.type].color" 
                        elevation="2"
                      >
                        <span class="text-white font-weight-bold"> 
                          {{ projectType[project.raw.type].text }}
                        </span> 
                      </v-btn>
                    </v-img>
                    <v-card-text>
                      <h2 class="text-gray-700 app-font-size-md text-center">
                        {{ project.raw.title }}
                      </h2>
                      <v-btn
                        color="green-ufba"
                        block
                        flat
                        class="mt-3"
                        @click="evaluateProject(project.raw.id)"
                      >
                        <span class="text-white app-font-weight-semibold" style="text-transform: none;">
                          Ver detalhes e avaliar
                        </span>
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                density="comfortable"
                icon="mdi-arrow-left"
                variant="tonal"
                rounded
                @click="prevPage"
              />

              <div class="mx-2 text-caption">
                Página {{ page }} de {{ pageCount }}
              </div>

              <v-btn
                :disabled="page >= pageCount"
                density="comfortable"
                icon="mdi-arrow-right"
                variant="tonal"
                rounded
                @click="nextPage"
              />

              <v-btn 
                variant="tonal"
                class="ml-2"
                @click="$router.push('/')"
              >Ver todos</v-btn>
            </div>
            
          </template>
        </v-data-iterator>
      </template>
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