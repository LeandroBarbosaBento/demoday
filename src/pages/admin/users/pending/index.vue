<template>
  <div class="px-8 py-8">
      <v-data-table class="px-4 py-4 elevation-1 rounded-lg"
          :headers="headers"
          :items="items"
      >
          <template v-slot:item.action="{ item }">
              <v-btn 
                  variant="outlined" 
                  color="blue-ufba" 
                  rounded="lg"
                  @click="aproveUser(item)"
                  class="mr-3"
              >
                  Aprovar
              </v-btn>
              <v-btn 
                  variant="outlined" 
                  color="red-ufba" 
                  rounded="lg"
                  @click="rejectUser(item)"
              >
                  Rejeitar
              </v-btn>
          </template>
          
          <template v-slot:item.type="{ item }">
              <v-btn
                  class="py-4 cursor-default"
                  block
                  :color="userType[item.type].color" 
                  rounded="lg"
                  size="small"
                  flat
              >
                  <span class="text-white font-weight-bold"> 
                    {{userType[item.type].text }} 
                  </span> 
              </v-btn>
          </template>
      </v-data-table>
  </div>

  <Loader v-if="isLoading" />

</template>
<script setup lang="ts">
import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'
import axiosInstance from '@/api/axiosInstance';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Lista de usuários pendentes',
  activeNavLink: 'pending'
})

interface User {
  id: string
  cpf: string
  email: string
  status: string
  type: 'STUDENT' | 'ADMIN' | 'PROFESSOR'
  university: string
}

const items = ref<User []>([]);
const isLoading = ref(false);

const userType = {
  'STUDENT': {color: 'blue-ufba', text: 'estudante'},
  'ADMIN': {color: 'red-ufba', text: 'administrador'},
  'PROFESSOR': {color: 'green-ufba', text: 'professor'},
}

const headers = ref<InternalDataTableHeader>([
  {title: 'Nome', key: 'name'},
  {title: 'Email', key:'email'},
  {title: 'Perfil', key: 'type'},
  {title: 'Ação', key: 'action'}
]);

async function aproveUser(user) {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.post('/user/setuserstatus', null, {
      params: {
        userId:user.id, 
        userStatus: 'APPROVED'
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    listUsers();
  }
}

async function rejectUser(user) {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.post('/user/setuserstatus', null, {
      params: {
        userId:user.id, 
        userStatus: 'REJECTED'
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    listUsers();
  }
}


async function listUsers(){
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get('/user/pending');
    items.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  listUsers();
});
</script>

<style>

</style>