<template>
    <div class="px-8 py-5">
        <h1 class="app-font-size-lg">
          Bem vindo ao Demoday 2024!
        </h1>
        <p class="text-gray-600 mt-3">
          Parágrafo qualquer
        </p>

        <h2 class="app-font-size-lg app-font-weight-medium mt-5">
          Critérios de inscrição
        </h2>

        <v-data-table 
          :headers="headersApply"
          :items="itemsApply"
          class="elevation-2 mt-5"
        >
        </v-data-table>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Cadastrar projeto',
  activeNavLink: 'apply'
})

const headersApply = ref([
  {title:'Nome do critério', key: 'name'},
  {title: 'Descrição', key: 'description'}
]);

const itemsApply = ref([
  {
    name: 'Nome do critério',
    description: 'Descrição'
  }
]);
</script>