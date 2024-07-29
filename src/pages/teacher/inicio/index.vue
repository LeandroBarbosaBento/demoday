<template>
  <div class="px-8 py-8">
    <v-col>
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
  </div>
  <Loader v-if="isLoading" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/api/axiosInstance';
import colors from '@/theme/default/index';
import { Demoday, Project } from '@/types/index';
import { typeColorCategory } from '@/theme/default/index'

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Início',
  activeNavLink: '/teacher/inicio'
})

const isLoading = ref(false);

const activeDemoday = ref<Demoday>();

const projectsAccepted = ref<Project []>([]);

async function evaluateProject(id: any) {
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

