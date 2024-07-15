<template>
  <div class="px-8">
    <Loader v-if="isLoading" />
    <go-back-button />

    <h2 class="mb-5">Dados do projeto</h2>

    <v-row v-if="project">
      <v-col cols="6">
        <p class="text-gray-600">
          <span class="app-font-weight-semibold">Nome do projeto: </span>
          {{ project.title }}
        </p>
      </v-col>
      <v-col cols="6">
        <p class="text-gray-600">
          <span class="app-font-weight-semibold">Link do vídeo: </span>
          <a :href="project.linkvideo" target="_blank">
            {{ project.linkvideo }}
          </a>
        </p>
      </v-col>

      <v-col cols="6">
        <p class="text-gray-600">
          <span class="app-font-weight-semibold">Tecnologias: </span>
          {{ project.tecnologies }}
        </p>
      </v-col>

      <v-col cols="6">
        <p class="text-gray-600">
          <span class="app-font-weight-semibold">Categoria: </span>
          {{ project.type }}
        </p>
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
          @click="onVote(item)"
        />
      </template>
      <template v-slot:bottom></template>
    </v-data-table>

    <v-btn 
      text="Enviar avaliação"
      block
      color="green-ufba"
      size="large"
      flat
      class="mt-10 text-white"
    />    

  </div>

</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';
import { useRoute } from 'vue-router';
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'


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
    console.log(evalCriteria.value);
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

function onVote(criteria) {
  console.log('onVote');
  console.log(votes.value);
}

onMounted(async () => {
  await receivingCriteria();
  await getProjectData();
});
</script>