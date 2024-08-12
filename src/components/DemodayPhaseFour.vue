<template>
    <div>

        <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mb-5 mt-8 text-center">
            Finalistas escolhidos
        </h2>
        <template
            v-for="(projects, index) in finalistsByCategory"
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
                            button-text="Avaliar projeto"
                            @on-button-click="evaluateProject(project.raw.id)"
                        />
                        </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
        </template>

        <v-divider />

        <template v-if="userData.type === 'ADMIN'">
            <h2 class="app-font-size-2xl app-font-weight-semibold text-gray-500 mt-8 text-center">
                Resultados da fase 3
            </h2>
            <p class="text-center text-gray-400 mb-5">Escolha os seus finalistas.</p>
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
                    :headers="semiFinalistsTableHeaders"
                    :items="projects"
                    :items-per-page-options="[5,10,20]"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-btn
                            color="green-ufba"
                            @click="turnIntoFinalist(item)"
                        >
                            Tornar finalista
                        </v-btn>
                    </template>
                </v-data-table>
            </template>
        </template>

        <Loader v-if="isLoading" />
    </div>
</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';
import { Demoday, Project } from '@/types/index';
import Swal from 'sweetalert2'

interface Props {
    demoday: Demoday
}
const props = defineProps<Props>();

const userData = JSON.parse(localStorage.getItem('userData') || '');

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

const isLoading = ref(false);

const ratings = ref([]);

const semiFinalistsTableHeaders = [
  {title: 'Projeto', key: 'title'},
  {title: 'Nota', key: 'rating', sortable: true},
  {title: 'Ações', key: 'actions'}
]

const finalists = ref<Project []>([]);
const finalistsByCategory = ref({
  'IC': [],
  'TCC': [],
  'DISC': [],
  'MSC': [],
  'PHD': [],
});

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

function setProjectRating() {
    projectsAccepted.value.forEach((project) => {
        return project.rating = ratings.value[project.id];
    });
}

function evaluateProject(id: number) {
    navigateTo(`/student/vote/${id}`);
}

function filterProjectsByCategory(projects, category) {
  return projects.filter((project) => project.type == category);
}

async function getTotalRatings() {

  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get(
        `/totalRatings?phase=3&demodayId=${props.demoday.id}`
    );
    ratings.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

function turnIntoFinalist(project) {
    Swal.fire({
        title: `Deseja mesmo tornar este projeto um finalista?`,
        showDenyButton: true,
        confirmButtonText: "<span class='text-white'>Confirmar</span>",
        confirmButtonColor: "green",
        denyButtonText: "<span class='text-white'>Cancelar</span>"
    }).then((result) => {
        if (result.isConfirmed) {
            confirmFinalist(project)
        }
    }); 
}

async function confirmFinalist(project: Project){
    try {
        isLoading.value = true;

        const params = [{
            "demoday": { "id": project.demoday.id },
            "project": { "id": project.id }
        }]

        await axiosInstance.post('/setfinalists', params);

        await getFinalists();
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}

async function getFinalists(){
    try {
        isLoading.value = true;
        const { data } = await axiosInstance.get(`/getfinalists/${props.demoday.id}`);
        finalists.value = [];
        data.forEach((item) => {
            finalists.value.push(item.project)
        });

        Object.keys(finalistsByCategory.value).forEach((category: string) => {
            return finalistsByCategory.value[category] = filterProjectsByCategory(finalists.value, category)
        });

    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
}
onMounted(async () => {
    await getTotalRatings();
    await getDemodayAcceptedProjects(props.demoday.id);
    await getFinalists();
});
</script>