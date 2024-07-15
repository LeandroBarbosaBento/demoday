<template>
  <div class="px-8 py-8">
    <Loader v-if="isLoading" />
    <go-back-button />

    <h2 class="mb-5">Dados do projeto</h2>

    <v-row v-if="project">
      <v-col cols="6">
        <label for="projectTitle" class="app-font-size-sm app-font-weight-medium text-gray-600">
          Nome do projeto
        </label>

        <v-text-field
          id="projectTitle"
          v-model="project.title"
          type="url"
          class="mt-3"
          color="primary"
          placeholder="Nome do projeto"
          readonly
        />
      </v-col>
      <v-col cols="6">
        <label for="linkVideo" class="app-font-size-sm app-font-weight-medium text-gray-600">
          Link do vídeo
        </label>

        <v-text-field
          id="linkVideo"
          v-model="project.linkvideo"
          type="url"
          class="mt-3"
          color="primary"
          placeholder="Link do vídeo"
          readonly
        />
      </v-col>

      <v-col cols="6">
        <label for="tecnologies" class="app-font-size-sm app-font-weight-medium text-gray-600">
          Tecnologias
        </label>

        <v-text-field
          id="tecnologies"
          v-model="project.tecnologies"
          type="url"
          class="mt-3"
          color="primary"
          placeholder="Tecnologias"
          readonly
        />
      </v-col>

      <v-col cols="6">
        <label for="type" class="app-font-size-sm app-font-weight-medium text-gray-600">
          Categoria
        </label>

        <v-text-field
          id="type"
          v-model="project.type"
          type="url"
          class="mt-3"
          color="primary"
          placeholder="Categoria"
          readonly
        />
      </v-col>

      <v-col cols="12">
        <label for="description" class="app-font-size-sm app-font-weight-medium text-gray-600">
          Descrição
        </label>

        <v-text-field
          id="description"
          v-model="project.description"
          type="url"
          class="mt-3"
          color="primary"
          placeholder="Descrição"
          readonly
        />
      </v-col>
    </v-row>

    <h3 class=" mt-5 mb-5">Faça a sua avaliação</h3>

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