<template>
    <div>
        <v-btn @click="test">Teste</v-btn>

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
                        @click="turnIntoFinalist(item.id)"
                    >
                        Tornar finalista
                    </v-btn>
                </template>
            </v-data-table>
        </template>
    </div>
</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';
import { Demoday, Project } from '@/types/index';

interface Props {
    demoday: Demoday
}
const props = defineProps<Props>();

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

async function test() {
    console.log('teste');
    console.log(ratings.value);
    console.log(projectsAccepted.value);
}

async function getDemodayAcceptedProjects(demodayId: number) {
  try {
      isLoading.value = true;
      const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${demodayId}`);
      projectsAccepted.value = data;

      setProjectRating();

      console.log('projectsAccepted');
      console.log(projectsAccepted.value);

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

function filterProjectsByCategory(projects, category) {
  return projects.filter((project) => project.type == category);
}

async function getTotalRatings() {

  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get(
        `/totalRatings?phase=3&demodayId=${props.demoday.id}`
    );

    Object.keys(data).forEach((rating) => {
        ratings.value.push({
            id: rating,
            rating: data[rating]
        })
    });
    ratings.value = data;
    console.log('totalRatings')
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

function turnIntoFinalist(id) {
    console.log('tornar finalista');
    console.log(id);
}

onMounted(async () => {
    await getTotalRatings();
    await getDemodayAcceptedProjects(props.demoday.id);
});
</script>