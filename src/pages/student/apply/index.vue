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

        <v-table class="rounded-lg elevation-2 mt-5">
          <thead>
            <tr>
              <th style="width: 10%;">Critério</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(item, index) in itemsApply" :key="index">
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.description }}
                </td>
              </tr>
          </tbody>
        </v-table>

        <h2 class="app-font-size-lg app-font-weight-medium mt-5">
          Critérios de avaliação
        </h2>

        <v-table class="rounded-lg elevation-2 mt-5">
          <thead>
            <tr>
              <th style="width: 10%;">Critério</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(item, index) in itemsApply" :key="index">
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.description }}
                </td>
              </tr>
          </tbody>
        </v-table>

        <v-form v-model="isFormValid" class="pt-8 pb-5">
          <label for="name" class="app-font-size-lg app-font-weight-bold mt-5 text-gray-600">
            Nome do projeto
          </label>
        
          <v-text-field
            id="name"
            v-model="project.name"
            class="mt-3"
            color="primary"
            placeholder="Digite o nome do projeto"
          />

          <div class="d-flex justify-space-evenly ">
            
            <div class="pr-5" style="width: 100%;">
              <h2 class="app-font-size-lg app-font-weight-bold mt-5 text-gray-600">
                Nome dos alunos ou equipe e contatos
              </h2>

              <!-- mudar variáveis -->
              <label for="student_name" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Nome do aluno
              </label>
        
              <v-text-field
                id="student_name"
                v-model="collaborator.name"
                class="mt-3"
                color="primary"
                placeholder="Digite o nome do aluno"
              />

              <label for="email" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Email de Contato
              </label>
        
              <v-text-field
                id="email"
                v-model="collaborator.email"
                class="mt-3"
                color="primary"
                placeholder="Digite o email de contato"
              />

              <button
                class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-4 mt-5 app-font-weight-bold app-font-size-xl"
                type="button"
                @click="addCollaborator"
                >
                Adicionar Aluno ou equipe
              </button>              

            </div>
            <div class="mt-15" style="width: 100%;">
              <v-table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(collaborator, index) in project.collaborators" :key="index">
                      <td>{{ collaborator.name }}</td>
                      <td>{{ collaborator.email }}</td>
                      <td>
                        <v-icon
                          icon="mdi-pen"
                          color="red-ufba"
                          class="cursor-pointer mr-2"
                          @click="editCollaborator(index)"
                        />
                        <v-icon
                          icon="mdi-delete"
                          color="red-ufba"
                          class="cursor-pointer"
                          @click="deleteCollaborator(index)"
                        />
                      </td>
                    </tr>
                </tbody>
              </v-table>
            </div>
          </div>

          <div class="d-flex justify-space-evenly ">
            <div class="mt-10 mr-10" style="width: 100%;">
              <label for="linkVideo" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Link para o vídeo
              </label>
        
              <v-text-field
                id="linkVideo"
                v-model="project.linkVideo"
                class="mt-3"
                color="primary"
                placeholder="Digite o link para o vídeo"
              />

            </div>
            <div class="mt-10" style="width: 100%;">
              <label for="discipline" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Disciplina (Opicional)
              </label>
        
              <v-text-field
                id="discipline"
                v-model="project.discipline"
                class="mt-3"
                color="primary"
                placeholder="Digite a disciplina"
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
                v-model="project.teacher"
                class="mt-3"
                color="primary"
                placeholder="Digite o nome do Professor ou Orientador"
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
                class="mt-3"
                color="primary"
                placeholder="Digite o ano"
                />
              </div>
              <div style="width: 100%;">

                <label for="semester" class="app-font-size-sm app-font-weight-medium text-gray-600">
                  Semestre
                </label>
                
                <v-text-field
                id="semester"
                v-model="project.semester"
                class="mt-3"
                color="primary"
                placeholder="Digite o semestre"
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
            />
          </div>

          <div class="d-flex justify-space-evenly ">
            <div class="mr-10" style="width: 100%;">
              <label for="technologies" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Tecnologias
              </label>
        
              <v-text-field
                id="technologies"
                v-model="project.technologies"
                class="mt-3"
                color="primary"
                placeholder="Digite as tecnologias utilizadas"
              />

            </div>
            <div class="" style="width: 100%;">
              <label for="category" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Categoria
              </label>
        
              <v-text-field
                id="category"
                v-model="project.category"
                class="mt-3"
                color="primary"
                placeholder="Digite a sua categoria"
              />
            </div>
          </div>

          <div class="mr-10" style="width: 100%;">
            <label for="linkDocumentation" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Link para documentação (opcional)
            </label>
      
            <v-text-field
              id="linkDocumentation"
              v-model="project.linkDocumentation"
              class="mt-3"
              color="primary"
              placeholder="Digite o link da documentação"
            />
          </div>

          <div class="mr-10" style="width: 100%;">
            <label for="photo" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Foto do projeto (opcional)
            </label>
      
            <v-text-field
              id="photo"
              v-model="project.photo"
              class="mt-3"
              color="primary"
              placeholder="Digite o link da documentação"
            />
          </div>

          <button
            class="button button--full text-white bg-red-ufba button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
            type="button"
            @click="sendProject"
          >
            Submeter projeto
          </button> 
          
        </v-form>

    </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Cadastrar projeto',
  activeNavLink: 'apply'
})

const isFormValid = ref<boolean>(false)

const itemsApply = ref([
  {
    name: 'Critério 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
  },
  {
    name: 'Critério 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
  },
  {
    name: 'Critério 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
  }
]);

interface Project {
  name: string
  collaborators: Collaborator[]
  linkVideo: string
  discipline: string
  teacher: string
  year: string
  semester: number
  description: string
  technologies: string
  category: string
  linkDocumentation: string
  photo: string
}

const project = ref<Project>({
  name: '',
  collaborators: [],
  linkVideo: '',
  discipline: '',
  teacher: '',
  year: '',
  semester: 0,
  description: '',
  technologies: '',
  category: '',
  linkDocumentation: '',
  photo: ''
})

// const project = ref<Project>({
//   name: 'Demoday',
//   collaborators: [{name: "Leandro", email: "leandro@ufba.br"}, {name: "Felipe", email: "felipe@ufba.br"}, {name: "Norma", email: "norma@ufba.br"}],
//   linkVideo: 'https://www.demoday.com',
//   discipline: 'Tópicos em Sistemas Web',
//   teacher: 'Fred',
//   year: '2024',
//   semester: 0,
//   description: 'Demoday na veia',
//   technologies: 'Vue.js, Nuxt.js, SpringBoot, Java',
//   category: 'Software',
//   linkDocumentation: 'https://github.com/LeandroBarbosaBento/demoday',
//   photo: 'demoday.png'
// })

interface Collaborator {
  name: string
  email: string
}

const collaborator = ref<Collaborator>({
  name: "",
  email: "",
})

// const collaborator = ref<Collaborator>({
//   name: "Reynan",
//   email: "reynan@ufba.br",
// })

function addCollaborator(){
  if (!collaborator.value.name || !collaborator.value.email) {
    console.log("Error");
    return ;
  }
  project.value.collaborators.push(collaborator.value)
  collaborator.value = {name: '', email: ''}
}

function editCollaborator(index: number){
  collaborator.value = project.value.collaborators[index]
  project.value.collaborators.splice(index, 1)
}

function deleteCollaborator(index: number){
  project.value.collaborators.splice(index, 1)
}

function sendProject(){
  return ;
}
</script>