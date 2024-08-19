<template>
    <div class="px-8 py-8">
        <template v-if="lastDemodayFinished">

            <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mt-8 text-center">
                Resultados da fase 4
            </h2>
            <template
                v-for="(projects, index) in finalistsByCategory"
                :key="index"
            >
                <v-btn
                    class="cursor-default my-5"
                    rounded="lg"
                    size="small"
                    :color="projectType[index].color" 
                    elevation="2"
                    @click="console.log(projects);"
                >
                    <span class="text-white font-weight-bold"> 
                        {{ projectType[index].text }}
                    </span> 
                </v-btn>

                <v-data-table
                    :sort-by="[{ key: 'rating', order: 'desc' }]"
                    :headers="tableHeaders"
                    :items="projects"
                    :items-per-page-options="[5,10,20]"
                >
                </v-data-table>
            </template>

            <v-divider />

            <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mt-8 text-center">
                Resultados da fase 3
            </h2>
            <template
                v-for="(projects, index) in acceptedProjectsByCategory"
                :key="index"
            >
                <v-btn
                    class="cursor-default my-5"
                    rounded="lg"
                    size="small"
                    :color="projectType[index].color" 
                    elevation="2"
                    @click="console.log(projects);"
                >
                    <span class="text-white font-weight-bold"> 
                        {{ projectType[index].text }}
                    </span> 
                </v-btn>

                <v-data-table
                    :sort-by="[{ key: 'rating', order: 'desc' }]"
                    :headers="tableHeaders"
                    :items="projects"
                    :items-per-page-options="[5,10,20]"
                >
                </v-data-table>
            </template>
        
        </template>
    </div>
    <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axiosInstance';
import { Demoday, Project } from '@/types/index';
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable';

definePageMeta({
layout: 'default-layout',
pageTitle: 'Classificação',
activeNavLink: 'ratings'
})

const isLoading = ref(false);

const lastDemodayFinished = ref<Demoday>();

const tableHeaders = ref<InternalDataTableHeader>([
  {title: 'Projeto', key: 'title'},
  {title: 'Nota', key:'rating'},
]);

const projectType = ref({
  'IC': {color: 'blue-ufba', text: 'IC'},
  'TCC': {color: 'red-ufba', text: 'TCC'},
  'DISC': {color: 'green-ufba', text: 'DISC'},
  'MSC': {color: 'yellow-ufba', text: 'MSC'},
  'PHD': {color: 'orange', text: 'PHD'},
})

const ratingsPhase3 = ref([]);
const ratingsPhase4 = ref([]);

const finalists = ref<Project []>([]);
const finalistsByCategory = ref({
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

function filterProjectsByCategory(projects, category) {
  return projects.filter((project) => project.type == category);
}

async function getTotalRatingsPhase3() {

  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get(
        `/totalRatings?phase=3&demodayId=${lastDemodayFinished.value.id}`
    );
    ratingsPhase3.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function getTotalRatingsPhase4() {

try {
  isLoading.value = true;
  const { data } = await axiosInstance.get(
      `/totalRatings?phase=4&demodayId=${lastDemodayFinished.value.id}`
  );
  ratingsPhase4.value = data;
} catch (error) {
  console.error(error);
} finally {
  isLoading.value = false;
}
}

function setProjectRating() {
    projectsAccepted.value.forEach((project) => {
        return project.rating = ratingsPhase3.value[project.id] || 0;
    });
}

function setFinalistsRating() {
    finalists.value.forEach((project) => {
        return project.rating = ratingsPhase4.value[project.id] || 0;
    });
}


async function getDemodayAcceptedProjects(demodayId: number) {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${demodayId}`);
    projectsAccepted.value = data;

    setProjectRating();

    Object.keys(acceptedProjectsByCategory.value).forEach((category: string) => {
        return acceptedProjectsByCategory.value[category] = filterProjectsByCategory(projectsAccepted.value, category)
    });

      
  } catch (error) {
      console.error(error);
  } finally {
      isLoading.value = false;
  }
}

async function getFinalists(){
    try {
        isLoading.value = true;
        const { data } = await axiosInstance.get(`/getfinalists/${lastDemodayFinished.value.id}`);
        finalists.value = [];
        data.forEach((item) => {
            finalists.value.push(item.project)
        });

        setFinalistsRating();

        Object.keys(finalistsByCategory.value).forEach((category: string) => {
            return finalistsByCategory.value[category] = filterProjectsByCategory(finalists.value, category)
        });

    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}

// no endpoint for that

async function getLastDemoday() {
    lastDemodayFinished.value = {
        id: 1
    };
    return;
}

onMounted(async () => {
    await getLastDemoday();
    await getTotalRatingsPhase3();
    await getTotalRatingsPhase4();
    await getDemodayAcceptedProjects(lastDemodayFinished.value.id);
    await getFinalists();
});

</script>
<style lang="scss" scoped>
</style>