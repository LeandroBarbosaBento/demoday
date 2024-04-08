<template>
    <div class="px-8 py-5">
        <h1 class="app-font-size-lg">
          Bem vindo ao Demoday 2024!
        </h1>
        <p class="text-gray-600 mt-3">
          Preencha o formulário abaixo para submeter o seu projeto para o Demoday 2024. Confira os critérios de aceitação atentamente antes de submeter.
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

        <h2 class="app-font-size-lg app-font-weight-medium mt-5">
          Critérios de avaliação
        </h2>

        <v-data-table 
          :headers="headersApply"
          :items="itemsApply"
          class="elevation-2 mt-5"
        >
        </v-data-table>

        <v-form v-model="isFormValid" class="pt-8 pb-5">
          <label for="project_name" class="app-font-size-lg app-font-weight-bold mt-5 text-gray-600">
            Nome do projeto
          </label>
        
          <v-text-field
            id="project_name"
            v-model="inputs.project_name.value"
            class="mt-3"
            color="primary"
            placeholder="Digite o nome do projeto"
            :error-messages="inputs.project_name.error_messages"
          />

          <div class="d-flex justify-space-evenly flex-grow-1">
            
            <div class="pr-5 flex-grow-1">
              <h2 class="app-font-size-lg app-font-weight-bold mt-5 text-gray-600">
                Nome dos alunos ou equipe e contatos
              </h2>

              <!-- mudar variáveis -->
              <label for="student_name" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Nome do aluno
              </label>
        
              <v-text-field
                id="student_name"
                v-model="inputs.name.value"
                class="mt-3"
                color="primary"
                placeholder="Digite o nome do aluno"
                :error-messages="inputs.name.error_messages"
              />

              <label for="email" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Email de Contato
              </label>
        
              <v-text-field
                id="email"
                v-model="inputs.modify_variable.value"
                class="mt-3"
                color="primary"
                placeholder="Digite o email de contato"
                :error-messages="inputs.modify_variable.error_messages"
              />

              <button
                class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-4 mt-5 app-font-weight-bold app-font-size-xl"
                type="button"
                @click="" 
                >
                <!--  handleLoginRequest // implementar nova função
                      mudar o objeto para possuir uma lista de alunos com email;
                      fazer funções que adicionem, editem e excluão um aluno da lista
                -->
                Adicionar Aluno ou equipe
              </button>              

            </div>
            <div class="flex-grow-0 mt-15">
              <v-data-table 
                :headers="headersApply"
                :items="itemsApply"
                class=""
              >
              </v-data-table>
            </div>
          </div>

          <div class="d-flex justify-space-evenly flex-grow-1">
            <div class="flex-grow-1 mt-10">
              <label for="link_video" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Link para o vídeo
              </label>
        
              <v-text-field
                id="link_video"
                v-model="inputs.link_video.value"
                class="mt-3"
                color="primary"
                placeholder="Digite o link para o vídeo"
                :error-messages="inputs.link_video.error_messages"
              />

            </div>
            <div>
              <!-- <label for="link_video" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Link para o vídeo
              </label>
        
              <v-text-field
                id="link_video"
                v-model="inputs.link_video.value"
                class="mt-3"
                color="primary"
                placeholder="Digite o link para o vídeo"
                :error-messages="inputs.link_video.error_messages"
              /> -->
              
            </div>
          </div>


        </v-form>

    </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Cadastrar projeto',
  activeNavLink: 'apply'
})

const headersApply = ref([
  {title:'Critério', key: 'name'},
  {title: 'Descrição', key: 'description'}
]);

const itemsApply = ref([
  {
    name: 'Critério 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
  },
  {
    name: 'Critério 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
  },
  {
    name: 'Critério 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
  }
]);

const inputs = ref({
  project_name: { error_messages: [], value: '' },
  link_video: { error_messages: [], value: '' },
  name: { error_messages: [], value: '' },
  modify_variable: { error_messages: [], value: ''}
})

const isFormValid = ref<boolean>(false)
// email: { error_messages: [], value: '' },
// password: { error_messages: [], value: '', show: false },
// password_confirmation: { error_messages: [], value: '', show: false },
// university: { error_messages: [], value: '' },
// profile: { error_messages: [], value: 'Aluno' },

const collaborators = ref({
  list: [{
    name: "",
    email: "",
    error_messages: []
  }]
})
</script>