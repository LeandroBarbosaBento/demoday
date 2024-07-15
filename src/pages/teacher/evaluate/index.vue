<template>
    <div class="px-8 py-8">
      <v-data-table class="px-4 py-4 elevation-1 rounded-lg"
          :headers="headers"
          :items="projectList"
      >
          <template v-slot:item.action="{ item }">
              <v-btn 
                  variant="outlined" 
                  block
                  color="blue-ufba" 
                  rounded="lg"
                  @click="analyzeProject(item)"
              >
                  Analisar projeto
              </v-btn>
          </template>
          
          <template v-slot:item.type="{ item }">
              <v-btn
                  class="py-4 cursor-default"
                  block
                  rounded="lg"
                  size="small"
                  flat
                  :color="projectType[item.type].color" 
              >
                  <span class="text-white font-weight-bold"> 
                    {{ projectType[item.type].text }}
                  </span> 
              </v-btn>
          </template>
      </v-data-table>
    </div>
    <Loader v-if="isLoading" />
</template>
<script lang="ts" setup>
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'
import axiosInstance from '@/api/axiosInstance';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Avaliar submissões de projetos',
  activeNavLink: 'evaluate'
})

const isLoading = ref(false);

const headers = ref<InternalDataTableHeader>([
  {title: 'Projeto', key: 'title'},
  {title: 'Descrição', key:'description'},
  {title: 'Categoria', key: 'type'},
  {title: 'Ação', key: 'action'}
]);

const projectType = ref({
  'IC': {color: 'blue-ufba', text: 'IC'},
  'TCC': {color: 'red-ufba', text: 'TCC'},
  'DISC': {color: 'green-ufba', text: 'DISC'},
  'MSC': {color: 'yellow-ufba', text: 'MSC'},
  'PHD': {color: 'orange', text: 'PHD'},
})

const projectList = ref([]);

async function listPendingProjects() {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get('/pendingprojects');
    projectList.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function analyzeProject(project: any) {
  console.log('analyzeProject');
  console.log(project);
  await navigateTo({ path: `/teacher/evaluate/approve/${project.id}`});
}

onMounted(() => {
  listPendingProjects();
});
</script>