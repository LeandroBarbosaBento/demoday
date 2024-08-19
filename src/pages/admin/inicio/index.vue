<template>
  <div class="px-8 py-8">
    <template v-if="!activeDemoday">
      <div class="d-flex flex-column justify-center align-center gap-10">      
        <h1 class="app-font-size-2xl app-font-weight-bold text-gray-600 my-1 text-center">
          Não há um Demoday em andamento.
        </h1>
        <p class="text-gray-500 text-center">Crie uma nova edição clicando no botão abaixo.</p>
        <div class="d-flex">
          <v-card
            width="150"
            height="150"
            class="d-flex flex-column justify-center align-center gap-10"
            @click="$router.push('/admin/demoday')"
          >
            <v-btn 
              icon="mdi-invoice-plus"
              color="red-ufba"
              flat
            />
            <p class="text-center text-red-ufba">Criar novo demoday</p>
          </v-card>

          <v-card
            width="150"
            height="150"
            class="d-flex flex-column justify-center align-center gap-10"
            @click="$router.push('/ratings')"
          >
            <v-btn 
              icon="mdi-crown"
              color="red-ufba"
              flat
            />
            <p class="text-center text-red-ufba">Ver classificação do demoday anterior</p>
          </v-card>
        </div>
        
      </div>
    </template>
    <template v-else>
      <v-row>
        <v-col sm="6" cols="12" class="d-flex justify-center align-center">

          <h1 class="app-font-size-3xl app-font-weight-bold text-gray-600 my-1 text-center py-3">
            {{ activeDemoday.name }}
          </h1>
        </v-col>
        <v-col sm="6" cols="12">
          <demoday-timeline
            :demoday="activeDemoday"
          />
        </v-col>
      </v-row>
      <v-divider />

      <demoday-phase-one 
        v-if="getCurrentPhase(activeDemoday) == 1"
        :demoday="activeDemoday"
      />

      <demoday-phase-two 
        v-if="getCurrentPhase(activeDemoday) == 2"
        :demoday="activeDemoday"
      />

      <demoday-phase-three 
        v-if="getCurrentPhase(activeDemoday) == 3"
        :demoday="activeDemoday"
      />

      <demoday-phase-four 
        v-if="getCurrentPhase(activeDemoday) == 4"
        :demoday="activeDemoday"
      />

    </template>
  </div>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axiosInstance';
import { Demoday, Project } from '@/types/index';
import { getCurrentPhase } from "@/utils/helpers"

definePageMeta({
layout: 'default-layout',
pageTitle: 'Início',
activeNavLink: '/admin/inicio'
})

const isLoading = ref(false);

const activeDemoday = ref<Demoday>();

const projectType = ref({
'IC': {color: 'blue-ufba', text: 'IC'},
'TCC': {color: 'red-ufba', text: 'TCC'},
'DISC': {color: 'green-ufba', text: 'DISC'},
'MSC': {color: 'yellow-ufba', text: 'MSC'},
'PHD': {color: 'orange', text: 'PHD'},
})


async function getActiveDemoday() {
  try {
      isLoading.value = true;
      const { data } = await axiosInstance.get('/getactivedemoday');
      activeDemoday.value = data[0];
  } catch (error) {
      console.error(error);
  } finally {
      isLoading.value = false;
  }
}


onMounted(async () => {
  await getActiveDemoday();
});
</script>
<style lang="scss" scoped>
</style>