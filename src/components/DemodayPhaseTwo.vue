<template>
    <div class="mt-5 mb-5">
        <template v-if="userData.type === 'ADMIN' || userData.type === 'PROFESSOR'">

            <v-row class="my-8 mb-5">
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
                            {{ projectsAccepted.length }} projetos aceitos
                        </p>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card
                        class="d-flex justify-center align-center gap-20 py-3"
                    >
                        <v-btn 
                            icon="mdi-archive-alert"
                            color="red-ufba"
                            flat
                        />
                        <p class="text-center text-red-ufba app-font-weight-medium">
                            {{ projectsPending.length }} projetos aguardando avaliação
                        </p>
                    </v-card>
                </v-col>
            </v-row>

            <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mb-5 mt-8 text-center">
                Projetos a serem aprovados
            </h2>

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
                            @click="$router.push('/teacher/evaluate')"
                        >Ver todos</v-btn>
                        </div>
                    </template>
                </v-data-iterator>
            </template>

            <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mb-5 mt-8 text-center">
                Projetos aprovados
            </h2>

            <template
                v-for="(projects, index) in acceptedProjectsByCategory"
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
                                button-text="Projeto avaliado!"
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
                            @click="$router.push('/teacher/evaluate')"
                        >Ver todos</v-btn>
                        </div>
                    </template>
                </v-data-iterator>
                
            </template>


        </template>
        <Loader v-if="isLoading" />
    </div>
</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';
import { Demoday, Project } from "@/types";

interface Props {
    demoday: Demoday
}
const props = defineProps<Props>();

const isLoading = ref(false);

const userData = JSON.parse(localStorage.getItem('userData') || '');

const projectsPending = ref<Project []>([]);
const pendingProjectsByCategory = ref({
  'IC': [],
  'TCC': [],
  'DISC': [],
  'MSC': [],
  'PHD': [],
});

const projectsAccepted = ref<Project []>([]);
const acceptedProjectsByCategory = ref({
  'IC': [],
  'TCC': [],
  'DISC': [],
  'MSC': [],
  'PHD': [],
});

const projectType = ref({
'IC': {color: 'blue-ufba', text: 'IC'},
'TCC': {color: 'red-ufba', text: 'TCC'},
'DISC': {color: 'green-ufba', text: 'DISC'},
'MSC': {color: 'yellow-ufba', text: 'MSC'},
'PHD': {color: 'orange', text: 'PHD'},
})


async function getDemodayAcceptedProjects(demodayId: number) {
  try {
      isLoading.value = true;
      const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${demodayId}`);
      projectsAccepted.value = data;

      Object.keys(acceptedProjectsByCategory.value).forEach((category: string) => {
        return acceptedProjectsByCategory.value[category] = filterProjectsByCategory(projectsAccepted.value, category)
      });

      
  } catch (error) {
      console.error(error);
  } finally {
      isLoading.value = false;
  }
}

async function listPendingProjects() {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get('/pendingprojects');
    projectsPending.value = data;

    Object.keys(pendingProjectsByCategory.value).forEach((category: string) => {
      return pendingProjectsByCategory.value[category] = filterProjectsByCategory(projectsPending.value, category)
    });
    
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

function filterProjectsByCategory(projects, category) {
  return projects.filter((project) => project.type == category);
}

async function analyzeProject(id: number) {
  await navigateTo({ path: `/teacher/evaluate/approve/${id}`});
}

async function evaluateProject(id: number) {
  navigateTo(`/student/vote/${id}`);
}

onMounted(async () => {
    const idDemoday = props.demoday.id
    await getDemodayAcceptedProjects(idDemoday);
    await listPendingProjects();
});
</script>