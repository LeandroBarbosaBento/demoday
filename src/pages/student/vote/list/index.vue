<template>
  <div class="px-8 py-4">
    <go-back-button class="mb-3" />
    <v-divider />

    <template
      v-for="(projects, index) in projectsToEvaluateByCategory"
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
    <Loader v-if="isLoading" />
  </div>
</template>
<script setup lang=ts>
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'
import axiosInstance from '@/api/axiosInstance';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Lista de projetos para votação',
  activeNavLink: '/vote/list'
})

const isLoading = ref(false);

const projectsToEvaluateList = ref([]);

const projectType = ref({
  'IC': {color: 'blue-ufba', text: 'IC'},
  'TCC': {color: 'red-ufba', text: 'TCC'},
  'DISC': {color: 'green-ufba', text: 'DISC'},
  'MSC': {color: 'yellow-ufba', text: 'MSC'},
  'PHD': {color: 'orange', text: 'PHD'},
})

const projectsToEvaluateByCategory = ref({
  'IC': [],
  'TCC': [],
  'DISC': [],
  'MSC': [],
  'PHD': [],
})

function filterProjectsByCategory(projects, category) {
  return projects.filter((project) => project.type == category);
}

const headers = ref<InternalDataTableHeader[]>([
  {title: 'Nome', key: 'title'},
  {title: 'Categoria', key:'type'},
  {title: 'Descrição', key: 'description'},
  {title: '', key: 'details'}
]);

async function getProjectList(){
  try {
    isLoading.value = true;
    const response = await axiosInstance.get('/getactivedemoday');

    const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${response.data[0].id}`);

    projectsToEvaluateList.value = data;

    Object.keys(projectsToEvaluateByCategory.value).forEach((category: string) => {
      return projectsToEvaluateByCategory.value[category] = filterProjectsByCategory(
        projectsToEvaluateList.value,
          category
        )
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

async function evaluateProject(id) {
  navigateTo(`/student/vote/${id}`);
}

onMounted(() => {
  getProjectList();
});
</script>