<template>
    <div class="px-8 py-8">
      <template v-if="!activeDemoday">
        <div class="d-flex flex-column justify-center align-center gap-10">      
          <h1 class="app-font-size-2xl app-font-weight-bold text-gray-600 my-1 text-center">
            Não há um Demoday em andamento.
          </h1>
        </div>
      </template>
      <template v-else>
        <h1 class="app-font-size-3xl app-font-weight-bold text-gray-600 my-1">
          {{ activeDemoday.name }}
        </h1>

        <v-row>
          <v-col sm="6" cols="12">
            <v-card
              class="d-flex justify-center align-center gap-20 py-3"
            >
              <v-btn 
                icon="mdi-archive-check"
                color="green"
                flat
              />
              <p class="text-center text-green app-font-weight-medium">
                {{ projectsAccepted.length }} projetos aprovados
              </p>
            </v-card>

            <v-card
              class="d-flex justify-center align-center gap-20 py-3 mt-5"
            >
              <v-btn 
                icon="mdi-archive-alert"
                color="red-ufba"
                flat
              />
              <p class="text-center text-red-ufba app-font-weight-medium">
                {{ projectsPending.length }} projetos pendentes
              </p>
            </v-card>
          </v-col>
          <v-col sm="6" cols="12">
            <demoday-timeline
              :demoday="activeDemoday"
            />
          </v-col>
        </v-row>

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
                  <project-card 
                    :project="project.raw"
                    button-text="Avaliar submissão"
                    @on-button-click="analyzeProject(project.raw.id)"
                  />
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
                  <project-card 
                    :project="project.raw"
                    button-text="Ver detalhes e avaliar"
                    @on-button-click="evaluateProject(project.raw.id)"
                  />
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
                @click="$router.push('/student/vote/list')"
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
        await listPendingProjects();
    }
    
  });
  </script>
  <style lang="scss" scoped>
  </style>