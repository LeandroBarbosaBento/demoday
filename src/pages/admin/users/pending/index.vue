<template>
  <div class="px-8 py-8">
      <v-data-table class="px-4 py-4 elevation-1 rounded-lg"
          :headers="headers"
          :items="items"
      >
          <template v-slot:item.action="{ item }">
              <v-btn 
                  class="py-5"
                  variant="outlined" 
                  block
                  color="green-ufba" 
                  rounded="lg"
                  @click="aproveUser(item)"
              >
                  
                  <span class="font-weight-bold"> 
                    Aprovar cadastro
                  </span>
              </v-btn>
          </template>
          
          <template v-slot:item.profile="{ item }">
              <v-btn
                  class="py-4 cursor-default"
                  block
                  color="blue-ufba" 
                  rounded="lg"
                  size="small"
                  flat
              >
                  <span class="text-white font-weight-bold"> {{item.profile }} </span> 
              </v-btn>
          </template>
      </v-data-table>
  </div>

</template>
<script setup lang="ts">
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'
definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Lista de usuários pendentes ',
  activeNavLink: 'pending'
})

const items = [
  {
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'professor'
  },
  {
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'professor'
  },
  {
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'professor'
  },
  {
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'professor'
  },
  {
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'professor'
  },
  {
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'professor'
  },
]

const headers = ref<InternalDataTableHeader>([
  {title: 'id', key: 'id'},
  {title: 'Nome', key: 'name'},
  {title: 'Email', key:'email'},
  {title: 'Perfil', key: 'profile'},
  {title: 'Ação', key: 'action'}
]);

function aproveUser(user) {
  console.log(user)
}
</script>

<style>

</style>