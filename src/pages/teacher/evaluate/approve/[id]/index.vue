<template>
  
  <div class="px-8 py-5">
    <go-back-button class="mb-3" />
    <div 
      v-if="project"
    >
          <label for="title" class="app-font-size-lg app-font-weight-bold mt-5 text-gray-600">
            Nome do projeto
          </label>
        
          <v-text-field
            id="title"
            v-model="project.title"
            type="text"
            class="mt-3"
            color="primary"
            placeholder="Digite o nome do projeto"
            required
            readonly
          />
          <div class="d-flex justify-space-evenly">
            
            <div class="mt-2 mr-10" style="width: 100%;">
              <label for="linkVideo" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Link para o vídeo
              </label>
              
              <a :href="project.linkvideo" target="_blank">
                <v-text-field
                id="linkVideo"
                v-model="project.linkvideo"
                type="url"
                class="mt-3"
                color="primary"
                placeholder="Digite o link para o vídeo"
                required
                readonly
                />
              </a>
            </div>

            <div class="mt-2" style="width: 100%;">
              <label for="discipline" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Disciplina (Opicional)
              </label>
        
              <v-text-field
                id="discipline"
                v-model="project.discipline"
                type="text"
                class="mt-3"
                color="primary"
                placeholder="Digite a disciplina"
                readonly
              />
            </div>
          </div>

          <div class="d-flex justify-space-evenly ">
            <div class="mr-10" style="width: 100%;">
              <label for="teacher" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Professor ou Orientador
              </label>
        
              <v-text-field
                id="teacher"
                v-model="project.professor"
                type="text"
                class="mt-3"
                color="primary"
                placeholder="Digite o nome do Professor ou Orientador"
                readonly
              />
            </div>

            <div class="d-flex justify-space-evenly" style="width: 100%;">
              <div class="mr-5" style="width: 100%;">

                <label for="year" class="app-font-size-sm app-font-weight-medium text-gray-600">
                  Ano
                </label>
                
                <v-text-field
                id="year"
                v-model="project.year"
                type="number"
                class="mt-3"
                color="primary"
                placeholder="Digite o ano"
                readonly
                />
              </div>
              <div style="width: 100%;">

                <label for="period" class="app-font-size-sm app-font-weight-medium text-gray-600">
                  Semestre
                </label>
                
                <v-text-field
                id="period"
                v-model="project.period"
                type="number"
                class="mt-3"
                color="primary"
                placeholder="Digite o semestre"
                readonly
                />
              </div>
            </div>
          </div>

          <div>
            <label for="description" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Descrição
            </label>

            <v-textarea
              rows="3"
              id="description"
              v-model="project.description"
              class="mt-3"
              color="primary"
              placeholder="Digite a descrição do projeto"
              readonly
            />
          </div>

          <div class="d-flex justify-space-evenly ">
            <div class="mr-10" style="width: 100%;">
              <label for="technologies" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Tecnologias
              </label>
        
              <v-text-field
                id="technologies"
                v-model="project.tecnologies"
                type="text"
                class="mt-3"
                color="primary"
                placeholder="Digite as tecnologias utilizadas"
                readonly
              />

            </div>
            <div class="" style="width: 100%;">
              <label for="category" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Categoria
              </label>
        
              <v-select
                id="category"
                v-model="project.category"
                type="text"
                class="mt-3"
                color="primary"
                placeholder="Digite a sua categoria"
                readonly
              />
            </div>
          </div>

          <div class="mr-10" style="width: 100%;">
            <label for="linkDocumentation" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Link para documentação (opcional)
            </label>
            
            <a :href="project.linkdoc" target="_blank">

              <v-text-field
              id="linkDocumentation"
              v-model="project.linkdoc"
              type="url"
              class="mt-3"
              color="primary"
              placeholder="Digite o link da documentação"
              readonly
              />
            </a>
          </div>
            
          <div 
            v-if="project.image"
            class="mr-10 my-4" 
            style="width: 100%;"
          >
            <label for="image" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Foto do projeto (opcional)
            </label>

            <v-img
              class="align-end text-white"
              :src="`data:image/jpeg;base64, ${project.image}`"
              cover
            />

          </div>

          <button
            class="button button--full text-white button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
            :class="{'bg-green-ufba': !isRejected, 'bg-gray-500': isRejected}"
            type="submit"
            @click="approveProject"
          >
            Aprovar candidatura do projeto
          </button>

          <button
            class="mt-5 button button--full text-white button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
            :class="{'bg-yellow-ufba': !isRejected, 'bg-gray-500': isRejected}"
            type="submit"
            @click="toggleRejectProject"
          >
            Rejeitar candidatura do projeto
          </button> 
          
          <!-- class="px-8 py-5 elevation-2 rounded-lg"  -->
          <!-- style="background-color: white" -->
          <div
            v-if="isRejected"
            class="mt-10"
          >
            <label class="app-font-size-lg app-font-weight-bold mt-5 text-gray-600">
              Por que o projeto será rejeitado?
            </label>
            <p class="text-gray-700 mt-2">É recomendado que na justificativa os critérios de aceitação não atendidos estejam explicitados de maneira clara.</p>

            <v-data-table
              :items="project.demoday.accCriteriaDemoday"
              :headers="[
                {title: 'Nome', key: 'name'},
                {title: 'Descrição', key: 'description'},
              ]"
              :items-per-page="5"
              class="mt-5 mb-4 rounded-lg elevation-1"
            />

            <v-textarea
              rows="6"
              id="rejectionReason"
              v-model="rejectionReason"
              class="mt-3"
              color="primary"
              placeholder="Digite o motivo da rejeição do projeto"
            />

            <button
              class="bg-red-ufba button button--full text-white button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
              type="submit"
              @click="submitRejection"
            >
              Confirmar rejeição da candidatura do projeto
            </button>

            <button
              class="bg-blue-ufba mt-5 button button--full text-white button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
              type="submit"
              @click="toggleRejectProject"
            >
              Voltar para avalição da submissão do projeto
            </button> 
          </div>

      </div>
    </div>

    <Loader v-if="isLoading" />
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';
import axiosInstance from '@/api/axiosInstance';
import { compileScript } from 'vue/compiler-sfc';
import { Project } from '@/types/index';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Avaliar submissão do projeto',
  activeNavLink: 'evaluate'
});

// Recebendo dados do usuário passados como String
const route = useRoute();

const project = ref<Project>();
const isLoading = ref(false);
const isRejected = ref(false);
const rejectionReason = ref('');

async function getProjectData(id: any) {
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get(`/getproject?id=${id}`);
    console.log('Teste dados');
    console.log(data);
    project.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

function toggleRejectProject() {
  isRejected.value = !isRejected.value;
}

async function submitRejection() {
  try {
    isLoading.value = true;
    const response = await axiosInstance.post(`/rejectproject/${route.params.id}`, {
      reason: rejectionReason.value
    });
    console.log('Rejection submitted:', response.data);
    // Handle successful submission (e.g., show a message to the user)
  } catch (error) {
    console.error('Error submitting rejection:', error);
    // Handle error (e.g., show an error message to the user)
  } finally {
    isLoading.value = false;
    await navigateTo({ path: `/teacher/evaluate/`});
  }
}

async function approveProject() {
  try {
    isLoading.value = true;
    const response = await axiosInstance.post(`/approveproject/${route.params.id}`);
    console.log('Approval submitted:', response.data);
    // Handle successful submission (e.g., show a message to the user)
  } catch (error) {
    console.error('Error submitting approval:', error);
    // Handle error (e.g., show an error message to the user)
  } finally {
    isLoading.value = false;
    await navigateTo({ path: `/teacher/evaluate/`});
  }
}

onMounted(async () => {
  const route = useRoute();
  await getProjectData(route.params.id)
});
</script>