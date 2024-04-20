<template>
  <div class="px-8 py-8">
      <v-data-table class="px-4 py-4 elevation-1 rounded-lg"
          :headers="headers"
          :items="items"
      >
          <template v-slot:item.action="{ item }">
              <v-btn 
                  variant="outlined" 
                  block
                  color="blue-ufba" 
                  rounded="lg"
                  @click="editUser(item)"
              >
                  EDITAR
              </v-btn>
          </template>
          
          <template v-slot:item.profile="{ item }">
              <v-btn
                  block
                  :color="item.profile === 'professor' ? 'green-ufba' : 'blue-ufba'" 
                  rounded="lg"
                  size="small"
              >
                  <span class="text-white"> {{item.profile }} </span> 
              </v-btn>
          </template>
      </v-data-table>
  </div>

</template>
<script setup lang="ts">
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'
definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Lista de usuários ',
  activeNavLink: 'users'
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
    profile: 'aluno'
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
    profile: 'aluno'
  },{
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'professor'
  },
  {
    id: 1,
    name: 'Estudante da Silva Souza',
    email: 'teste@gmail.com',
    profile: 'aluno'
  }
]

const headers = ref<InternalDataTableHeader>([
{title: 'id', key: 'id'},
{title: 'Nome', key: 'name'},
{title: 'Email', key:'email'},
{title: 'Perfil', key: 'profile'},
{title: 'Ação', key: 'action'}
]);

function editUser(user) {
  console.log(user)
}
</script>

<style>

</style>