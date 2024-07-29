<template>
  <div class="px-8 py-8 d-flex">
    <v-col cols="6">
      <div class="px-4 py-4 elevation-1 rounded-lg ">
          <h1 v-if="activeDemoday" class="app-font-size-xlg app-font-weight-bold text-gray-600">
              {{ activeDemoday.name }}
          </h1>
          <div
              v-for="project in projectsAccepted" 
              class="px-4 py-4 rounded-lg mt-3"
              :style="{ border: `3px solid ${colors.colors.light['gray-600']}` }"
          >
          <v-row>
              <v-col>
                  <v-row>
                      <v-col
                        class="d-flex justify-space-between flex-column"
                      >
                          <h3>{{ project.title }}</h3>
                          <p><b>Disciplina:</b> {{ project.discipline }}</p>
                          <p><b>Professor(a):</b> {{ project.professor }}</p>
                          <p><b>Tecnologias: </b> {{ project.tecnologies }}</p>
                          <p
                              :style="{   backgroundColor: typeColorCategory[project.type],
                                          padding: '10px 0',
                                          borderRadius: '10px'
                                      }"
                          >
                          <b>Categoria: </b> {{ project.type }}</p>
                      </v-col>
                      <v-col
                        class="d-flex justify-space-between flex-column"
                      >
                          <p class="mt-5"><b>Descrição:</b></p>
                          <p>{{ project.description }}</p>
                          <v-btn
                            class="mt-5"
                            variant="outlined" 
                            block
                            color="blue-ufba" 
                            rounded="lg"
                            @click="evaluateProject(project.id)"
                            >
                            Votar
                          </v-btn>
                      </v-col>
                  </v-row>
                  <v-row class="image"><h1>Imagem</h1></v-row>
              </v-col>
          </v-row>
          </div>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="px-4 py-4 elevation-1 rounded-lg ">
        <h1
          class="app-font-size-xlg app-font-weight-bold text-gray-600"
        >
          Usuários Pendentes
        </h1>
        <v-data-table class="px-4 py-4 elevation-1 rounded-lg mt-3"
          :headers="headers"
          :items="items"
        >
          <template v-slot:item.action="{ item }">
            <v-btn 
              variant="outlined" 
              color="blue-ufba" 
              rounded="lg"
              @click="handleAproveUser(item)"
              class="mr-3"
            >
              Aprovar
            </v-btn>
            <v-btn 
              variant="outlined" 
              color="red-ufba" 
              rounded="lg"
              @click="handleRejectUser(item)"
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
    </v-col>
  </div>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axiosInstance';
import colors from '@/theme/default/index';
import { Demoday, Project, User } from '@/types/index';
import { typeColorCategory } from '@/theme/default/index'

import type { InternalDataTableHeader } from 'vuetify/lib/components/VDataTable/VDataTable'
import Swal from 'sweetalert2'

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Início',
  activeNavLink: '/admin/inicio'
})

const isLoading = ref(false);

const activeDemoday = ref<Demoday>();

const projectsAccepted = ref<Project []>([]);

const items = ref<User []>([]);

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

function handleAproveUser(user: User) {
  Swal.fire({
    title: `Deseja mesmo aprovar o usuário ${user.name}?`,
    showDenyButton: true,
    confirmButtonText: "<span class='text-white'>Aprovar</span>",
    confirmButtonColor: "green",
    denyButtonText: "<span class='text-white'>Cancelar</span>"
  }).then((result) => {
    if (result.isConfirmed) {
      aproveUser(user);
    }
  }); 
}

async function aproveUser(user: User) {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.post('/user/setuserstatus', null, {
      params: {
        userId:user.id, 
        userStatus: 'APPROVED'
      }
    });

    Swal.fire({
      title: "Aprovado",
      text: "Usuário aprovado com sucesso",
      icon: "success",
      showConfirmButton: false,
      timer: 1250
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    listUsers();
  }
}

function handleRejectUser(user: User) {
  Swal.fire({
    title: `Deseja mesmo rejeitar o usuário ${user.name}?`,
    showDenyButton: true,
    confirmButtonText: "<span class='text-white'>Rejeitar</span>",
    confirmButtonColor: "red",
    denyButtonText: "<span class='text-white'>Cancelar</span>",
    denyButtonColor: "gray",
  }).then((result) => {
    if (result.isConfirmed) {
      rejectUser(user);
    }
  });
}

async function rejectUser(user: User) {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.post('/user/setuserstatus', null, {
      params: {
        userId:user.id, 
        userStatus: 'REJECTED'
      }
    });
    Swal.fire({
      title: "Rejeitado",
      text: "Usuário rejeitado com sucesso!",
      icon: "success",
      showConfirmButton: false,
      timer: 1250
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

//

async function evaluateProject(id: number) {
  navigateTo(`/student/vote/${id}`);
}

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

async function getDemodayAcceptedProjects(demodayId: number) {
  try {
      isLoading.value = true;
      const { data } = await axiosInstance.get(`/getdemodayacceptedprojects/${demodayId}`);
      console.log(data);
      projectsAccepted.value = data;
  } catch (error) {
      console.error(error);
  } finally {
      isLoading.value = false;
  }
}

onMounted(async () => {
  await getActiveDemoday();
  if(activeDemoday.value){
      const idDemoday = activeDemoday.value.id
      await getDemodayAcceptedProjects(idDemoday);
  }
  listUsers();
});
</script>
<style lang="scss" scoped>
.image {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 7px;
  background-color: black;
  color: white;
}
</style>