<template>
  <div class="px-8 py-8">
    <v-btn 
      text="Teste de endpoint" 
      class="mt-5 mb-10"
      size="x-large"
      @click="getProjectList" 
    />
    <v-data-table class="px-4 py-4 elevation-1 rounded-lg"
        :headers="headers"
        :items="items"
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
        
        <template v-slot:item.projectType="{ item }">
            <v-btn
                class="py-4 cursor-default"
                block
                :color="typeColor[item.projectType]" 
                rounded="lg"
                size="small"
                flat
            >
                <span class="text-white font-weight-bold"> 
                  {{ item.projectType }} 
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

const items = [
    {
      id: 1,
      title: 'Nome do projeto',
      projectType: 'IC',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui aspernatur, enim porro tempora totam ducimus minus architecto rerum pariatur, laborum minima possimus saepe, incidunt natus doloremque ab veniam consequuntur voluptatibus.',
    },
    {
      id: 2,
      title: 'Nome do projeto 1',
      projectType: 'TCC',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui aspernatur, enim porro tempora totam ducimus minus architecto rerum pariatur, laborum minima possimus saepe, incidunt natus doloremque ab veniam consequuntur voluptatibus.',
    },
    {
      id: 3,
      title: 'Nome do projeto 1',
      projectType: 'DISC',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui aspernatur, enim porro tempora totam ducimus minus architecto rerum pariatur, laborum minima possimus saepe, incidunt natus doloremque ab veniam consequuntur voluptatibus.',
    },
    {
      id: 4,
      title: 'Nome do projeto 1',
      projectType: 'MSC',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui aspernatur, enim porro tempora totam ducimus minus architecto rerum pariatur, laborum minima possimus saepe, incidunt natus doloremque ab veniam consequuntur voluptatibus.',
    },
    {
      id: 5,
      title: 'Nome do projeto 1',
      projectType: 'PHD',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui aspernatur, enim porro tempora totam ducimus minus architecto rerum pariatur, laborum minima possimus saepe, incidunt natus doloremque ab veniam consequuntur voluptatibus.',
    },
    {
      id: 6,
      title: 'Nome do projeto',
      projectType: 'IC',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui aspernatur, enim porro tempora totam ducimus minus architecto rerum pariatur, laborum minima possimus saepe, incidunt natus doloremque ab veniam consequuntur voluptatibus.',
    },
]

const headers = ref<InternalDataTableHeader[]>([
  {title: 'Nome', key: 'title'},
  {title: 'Tipo', key:'projectType'},
  {title: 'Descrição', key: 'description'},
  {title: '', key: 'details'}
]);

async function getProjectList(){
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get('/getdemodayprojects');
    console.log('retorno do endpoint');
    console.log(data);
    projectsToEvaluateList.value = data;
  } catch (error) {
    console.log('Erro no retorno do endpoint');
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

async function evaluateProject(id) {
  console.log('evaluateProject');
  console.log(id);
}

onMounted(() => {
  getProjectList();
});
</script>