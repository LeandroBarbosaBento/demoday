<template>
  <div class="px-8">
    <Loader v-if="isLoading" />
    <go-back-button class="mb-3 mt-3" />

    <h2 class="mb-5">Dados do projeto</h2>

    <v-row v-if="project">
      <v-col cols="6">
        <v-col cols="12">
          <p class="text-gray-600">
            <span class="app-font-weight-semibold">Nome do projeto: </span>
            {{ project.title }}
          </p>
        </v-col>

        <v-col cols="12">
          <p class="text-gray-600">
            <span class="app-font-weight-semibold">Tecnologias: </span>
            {{ project.tecnologies }}
          </p>
        </v-col>

        <v-col cols="12">
          <p class="text-gray-600">
            <span class="app-font-weight-semibold">Link do vídeo: </span>
            <a :href="project.linkvideo" target="_blank">
              {{ project.linkvideo }}
            </a>
          </p>
        </v-col>

        <v-col cols="12">
          <p class="text-gray-600">
            <span class="app-font-weight-semibold">Categoria: </span>
            {{ project.type }}
          </p>
        </v-col>

      </v-col>
      <v-col cols="6">
        <v-img
          :src="`data:image/jpeg;base64, ${project.image}`"
          cover
          style="width: 400px;"
        />
      </v-col>

      <v-col cols="12">
        <p class="text-gray-600">
          <span class="app-font-weight-semibold">Descrição: </span>
          {{ project.description }}
        </p>
      </v-col>
    </v-row>

    <h3 class=" mt-10 mb-5">Faça a sua avaliação</h3>

    <v-data-table
      :items="evalCriteria"
      class="mt-5 px-5 py-5"
      :headers="tableHeaders"
      hide-default-footer
    >
      <template v-slot:item.action="{ item }">
        <v-rating
          v-model="votes[item.id]"
          active-color="blue-ufba"
          color="orange-lighten-1"
        />
      </template>
      <template v-slot:bottom>
        <div class="d-flex justify-end">
          <v-btn 
            flat
            class="mt-4"
          >
            Avaliação final: {{ finalEvaluation }}
          </v-btn>
        </div>
      </template>
    </v-data-table>

    <v-btn 
      text="Enviar avaliação"
      block
      color="green-ufba"
      size="large"
      flat
      class="mt-10 text-white mb-15"
      @click="sendEvaluation"
    />    
  </div>

</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';
import { useRoute } from 'vue-router';
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'
import Swal from 'sweetalert2'

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Avaliar projeto',
  activeNavLink: '/vote/list'
})

const route = useRoute();

const accCriteria = ref([]);
const evalCriteria = ref([]);
const votes = ref({});

const project = ref();

const finalEvaluation = computed(() => {
  let total = 0;
  Object.keys(votes.value).forEach((index) => {
    total += votes.value[index];
  })

  if(!evalCriteria.value.length) return 0;

  return (total / evalCriteria.value.length).toFixed(2);
});

const tableHeaders = ref<InternalDataTableHeader []>([
  {
    title: 'Nome', 
    key: 'name',
    sortable: false,
  },
  {
    title: 'Descrição', 
    key: 'description',
    sortable: false,
  },
  {
    title: 'Vote', 
    key: 'action',
    sortable: false,
  },
])

const isLoading = ref(false);

async function receivingCriteria(){
  isLoading.value = true;
  try {
    const { data } = await axiosInstance.get('/getactivedemoday');
    accCriteria.value = data[0].accCriteriaDemoday;
    evalCriteria.value = data[0].evalCriteriaDemoday;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

async function getProjectData() {
  isLoading.value = true;
  try {
    const { data } = await axiosInstance.get(`/getproject?id=${route.params.id}`);
    project.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

async function sendEvaluation() {

  if(Object.keys(votes.value).length !== evalCriteria.value.length) {

    Swal.fire({
      icon: "error",
      title: "É necessário selecionar todos os critérios",
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "<span class='text-white'>Fechar</span>",
      confirmButtonColor: "blue-ufba",
      timer: 1500,
    });

    return;
  } 

  interface Rating {
    evalCriteriaId: number
    rate: number
  }

  interface Vote {
    projectId: number
    evalRatings: Rating []
  }

  let params: Vote = {
    evalRatings: [],
    projectId: project.value.id,
  }


  Object.keys(votes.value).forEach((vote) => {
    params.evalRatings.push({
      evalCriteriaId: parseInt(vote),
      rate: votes.value[vote]
    })
  });

  isLoading.value = true;


  try {
    const { data } = await axiosInstance.post(`/evaluateproject`, params);

    Swal.fire({
      icon: "success",
      title: "Avaliação enviada com sucesso",
      showDenyButton: false,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: "<span class='text-white'>Fechar</span>",
      confirmButtonColor: "blue-ufba",
      timer: 1500,
    });
    
    navigateTo('/student/vote/list');

  } catch (error) {
    console.error(error);
    if(error.response.data.message){
      Swal.fire({
        title: 'Erro!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: '<span class="text-white">Ok</span>'
      })
    }
    else {
      Swal.fire({
        title: 'Erro!',
        text: 'Ocorreu um erro, tente novamente...',
        icon: 'error',
        confirmButtonText: '<span class="text-white">Ok</span>'
      })
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await receivingCriteria();
  await getProjectData();
});
</script>