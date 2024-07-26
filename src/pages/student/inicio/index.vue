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
                {{ project.title }}
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
let activeDemoday = {
    value: {name: ''}
};
let projectsAccepted = { 
    value: [{title: 'sdasdsad'}]
}
;

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