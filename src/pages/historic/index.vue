<template>
    <div class="px-8 py-8">
      <v-data-table 
        :headers="headers"
        :items="items"
        class="elevation-2"
      >
      </v-data-table>
    </div>
</template>
<script setup lang=ts>
definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Lista de Demodays',
  activeNavLink: 'historic'
})

const items = [
    {
      name: 'Nome do projeto',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 1',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 2',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 3',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 4',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Nome do projeto 5',
      category: 'Categoria do projeto',
      video: 'youtube.com/link-do-video',
      habitat: 'Savanna, Forests',
    },
]

const headers = ref([
  {title: 'Nome', key: 'name'},
  {title: 'Categoria', key:'category'},
  {title: 'Vídeo', key: 'video'}
]);
</script>