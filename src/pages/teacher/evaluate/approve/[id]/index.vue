<template>
    <div class="px-8 py-5">
      <div 
        v-if="project"
        class="px-8 py-5 elevation-2 rounded-lg" 
        style="background-color: white"
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
            <div class="mt-10 mr-10" style="width: 100%;">
              <label for="linkVideo" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Link para o vídeo
              </label>
        
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

            </div>

            <div class="mt-10" style="width: 100%;">
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
      
            <v-text-field
              id="linkDocumentation"
              v-model="project.linkdoc"
              type="url"
              class="mt-3"
              color="primary"
              placeholder="Digite o link da documentação"
              readonly
            />
          </div>

          <div class="mr-10" style="width: 100%;">
            <label for="image" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Foto do projeto (opcional)
            </label>
      
            <v-text-field
              id="image"
              v-model="project.image"
              type="url"
              class="mt-3"
              color="primary"
              placeholder="Digite o link da documentação"
              readonly
            />
          </div>

          <button
            class="button button--full text-white bg-green-ufba button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
            type="submit"
          >
            Aprovar Projeto
          </button>

          <button
            class="mt-5 button button--full text-white bg-yellow-ufba button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
            type="submit"
          >
            Rejeitar Projeto
          </button> 
          
      </div>
    </div>

    <Loader v-if="isLoading" />
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';
import axiosInstance from '@/api/axiosInstance';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Informações do projeto',
  activeNavLink: 'evaluate'
});

// Recebendo dados do usuário passados como String
const route = useRoute();

const project = ref(null);
const isLoading = ref(false);

async function getProjectData(id) {
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

onMounted(async () => {
  const route = useRoute();
  await getProjectData(route.params.id)
});
</script>