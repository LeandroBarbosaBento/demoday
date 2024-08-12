<template>
    <div class="mt-5 mb-5">
        <template v-if="userData.type === 'PROFESSOR'"> 
            <p class="text-center text-gray-500 mt-10">
                Na fase 1 ainda não há nada a ser feito! Aguarde a fase 2 para avaliar os projetos que forem submetidos pelos estudantes. 
            </p>
        </template>
        <template v-if="userData.type === 'ADMIN'">
            <v-card
                class="d-flex justify-center align-center gap-20 py-3"
            >
                <v-btn 
                    icon="mdi-archive-check"
                    color="green"
                    flat
                />
                <p class="text-center text-green app-font-weight-medium">
                    {{ projects.length }} projetos submetidos
                </p>
            </v-card>

            <v-data-iterator
                class="mt-5"
                :items="projects"
                :items-per-page="projects.length"
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
                            button-text="Ver detalhes"
                            @on-button-click="console.log(project.raw.id)"
                        />
                    </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
        </template>
        <template v-if="userData.type === 'STUDENT'">
            <v-card
                class="d-flex justify-center align-center gap-20 py-3"
            >
                <v-btn 
                    icon="mdi-archive-clock"
                    color="green"
                    flat
                />
                <p class="text-center text-green app-font-weight-medium">
                    Submeta o seu projeto!
                </p>
            </v-card>
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

const projects = ref<Project []>([]);

const userData = JSON.parse(localStorage.getItem('userData') || '');

async function getDemodayProjects(id) {

  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${id}`);
    projects.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
    await getDemodayProjects(props.demoday.id);
});
</script>