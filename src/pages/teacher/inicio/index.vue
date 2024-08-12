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

        <v-row>
          <v-col sm="6" cols="12" class="d-flex justify-center align-center">

            <h1 class="app-font-size-3xl app-font-weight-bold text-gray-600 my-1 text-center py-3">
              {{ activeDemoday.name }}
            </h1>
          </v-col>
          <v-col sm="6" cols="12">
            <demoday-timeline
              :demoday="activeDemoday"
            />
          </v-col>
        </v-row>
        <v-divider />

        <demoday-phase-one 
          v-if="getCurrentPhase(activeDemoday) == 1"
          :demoday="activeDemoday"
        />

        <demoday-phase-two 
          v-if="getCurrentPhase(activeDemoday) == 2"
          :demoday="activeDemoday"
        />
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