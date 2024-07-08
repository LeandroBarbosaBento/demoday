<template>
  <div class="px-8 py-8">
    <v-data-table class="px-4 py-4 elevation-1 rounded-lg"
        :headers="headers"
        :items="projectsToEvaluateList"
    >
        <template v-slot:item.details="{ item }">
            <v-btn 
                variant="outlined" 
                block
                color="blue-ufba" 
                rounded="lg"
                size="large"
                @click="evaluateProject(item.id)"
            >
                Votar
            </v-btn>
        </template>
        
        <template v-slot:item.type="{ item }">
            <v-btn
                class="py-4 cursor-default"
                block
                :color="typeColor[item.type]" 
                rounded="lg"
                size="small"
                flat
            >
                <span class="text-white font-weight-bold"> 
                  {{ item.type }} 
                </span> 
            </v-btn>
        </template>
    </v-data-table>
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

const typeColor = ref({
  IC: 'orange', 
  TCC: 'blue', 
  DISC: 'red',
  MSC: 'green',
  PHD: 'pink',
});

const headers = ref<InternalDataTableHeader[]>([
  {title: 'Nome', key: 'title'},
  {title: 'Tipo', key:'type'},
  {title: 'Descrição', key: 'description'},
  {title: '', key: 'details'}
]);

async function getProjectList(){
  try {
    isLoading.value = true;
    const response = await axiosInstance.get('/getactivedemoday');

    const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${response.data[0].id}`);

    projectsToEvaluateList.value = data;
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