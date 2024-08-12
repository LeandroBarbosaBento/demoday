<template>
    <div class="px-8 py-4">
      <go-back-button class="mb-3" />
      <v-divider />

      <template
        v-for="(projects, index) in pendingProjectsByCategory"
        :key="index"
      >

        <v-btn
          class="cursor-default my-3"
          rounded="lg"
          size="small"
          :color="projectType[index].color" 
          elevation="2"
        >
          <span class="text-white font-weight-bold"> 
            {{ projectType[index].text }}
          </span> 
        </v-btn>

        <p 
          v-if="!projects.length"
          class="text-gray-400"
        > 
          Nenhum projeto encontrado nesta categoria.
        </p>

        <v-data-iterator
          v-if="projects.length"
          :items="projects"
          class="mb-5"
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
        </v-data-iterator>
      </template>
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
const pendingProjectsByCategory = ref({
  'IC': [],
  'TCC': [],
  'DISC': [],
  'MSC': [],
  'PHD': [],
})

function filterProjectsByCategory(projects, category) {
  return projects.filter((project) => project.type == category);
}

async function listPendingProjects() {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get('/pendingprojects');
    projectList.value = data;
    Object.keys(pendingProjectsByCategory.value).forEach((category: string) => {
      return pendingProjectsByCategory.value[category] = filterProjectsByCategory(
        projectList.value,
          category
        )
    });
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