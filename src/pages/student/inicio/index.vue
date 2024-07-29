<template>
    <div class="px-8 py-8">
        <div class="px-4 py-4 elevation-1 rounded-lg ">
            <h1 v-if="activeDemoday" class="app-font-size-xlg app-font-weight-bold text-gray-600">
                {{ activeDemoday.value.name }}
            </h1>
            <div
                v-for="project in projectsAccepted.value" 
                class="px-4 py-4 border-solid rounded-lg mt-3"
            >
            <v-row>
                <v-col>
                    <v-row>
                        <v-col>
                            <h3>{{ project.title }}</h3>
                            <p><b>Disciplina:</b> {{ project.discipline }}</p>
                            <p><b>Professor(a):</b> {{ project.professor }}</p>
                            <p><b>Tecnologias: </b> {{ project.tecnologies }}</p>
                            <p
                                :style="{   backgroundColor: typeColor[project.type],
                                            padding: '10px 0',
                                            borderRadius: '10px'
                                        }"
                            >
                            <b>Categoria: </b> {{ project.type }}</p>
                        </v-col>
                        <v-col>
                            <p class="mt-5"><b>Descrição:</b></p>
                            <p>{{ project.description }}</p>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="image"><h1>Imagem</h1></v-col>
            </v-row>
            </div>
        </div>
    </div>
    <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axiosInstance';
// import { Demoday } from '@/src/types/index.ts';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Início',
  activeNavLink: '/student/inicio'
})

const isLoading = ref(false);

const typeColor = ref({
  IC: 'orange', 
  TCC: 'blue', 
  DISC: 'red',
  MSC: 'green',
  PHD: 'pink',
});

let activeDemoday = {
    value: {name: ''}
};

let projectsAccepted = { 
    value: [{
        title: '',
        linkvideo: '',
        discipline: '',
        professor: '',
        tecnologies: '',
        description: '',
        type: '',
    }]
};

async function getActiveDemoday() {
    try {
        isLoading.value = true;
        const { data } = await axiosInstance.get('/getactivedemoday');
        activeDemoday.value = data[0];
        // console.log(activeDemoday.value)
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
        // console.log(projectsAccepted.value[0].title);
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
        // console.log(idDemoday)
        await getDemodayAcceptedProjects(idDemoday);
    }
});
</script>
<style lang="scss" scoped>
.image {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 7px;
    background-color: black;
    color: white;
}
</style>