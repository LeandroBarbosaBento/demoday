<template>
  <Loader v-if="isLoading" />
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

      <v-table class="rounded-lg elevation-2 mt-5 py-5 px-5">
        <thead>
          <tr>
            <th style="width: 20%;">Critério</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in itemsApply.accCriteriaDemoday" :key="index">
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

      <v-table class="rounded-lg elevation-2 mt-5 py-5 px-5">
        <thead>
          <tr>
            <th style="width: 20%;">Critério</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in itemsApply.evalCriteriaDemoday" :key="index">
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.description }}
              </td>
            </tr>
        </tbody>
      </v-table>

      <v-form 
        v-model="isFormValid" 
        class="pt-8 pb-5"
        id="myForm"
        @submit.prevent="handleCreateProject"
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
        />

        <v-row class="elevation-1 mx-1 rounded-lg px-3 py-3">
          <v-col cols="6">
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
                type="text"
                class="mt-3"
                color="primary"
                placeholder="Digite o nome do aluno"
                :rules="nameRules"
              />

              <label for="email" class="app-font-size-sm app-font-weight-medium text-gray-600">
                Email de Contato
              </label>
        
              <v-text-field
                id="email"
                v-model="collaborator.email"
                type="email"
                class="mt-3"
                color="primary"
                placeholder="Digite o email de contato"
                :rules="emailRules"
              />

              <v-btn
                text="Adicionar aluno ou equipe"
                color="red-ufba"
                block
                @click="addCollaborator"
              />
          
            </div>
          </v-col>
          <v-col cols="6">
            <v-data-table
              :items="project.collaborators"
              :headers="[
                {title: 'Nome', key: 'name'},
                {title: 'Email', key: 'email'},
                {title: 'Ações', key: 'actions'}
              ]"
              :items-per-page="5"
            >

              <template v-slot:item.actions="{ index }">
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
              </template>
            </v-data-table>
          </v-col>
        </v-row>

        <div class="d-flex justify-space-evenly ">
          <div class="mt-10 mr-10" style="width: 100%;">
            <label for="linkVideo" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Link para o vídeo
            </label>
      
            <v-text-field
              id="linkVideo"
              v-model="project.linkVideo"
              type="url"
              class="mt-3"
              color="primary"
              placeholder="Digite o link para o vídeo"
              :rules="linkRules"
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
              type="text"
              class="mt-3"
              color="primary"
              placeholder="Digite o nome do Professor ou Orientador"
              :rules="stringRules"
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
              :rules="yearRules"
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
              :rules="periodRules"
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
              type="text"
              class="mt-3"
              color="primary"
              placeholder="Digite as tecnologias utilizadas"
              :rules="stringRules"
            />

          </div>
          <div class="" style="width: 100%;">
            <label for="category" class="app-font-size-sm app-font-weight-medium text-gray-600">
              Categoria
            </label>
      
            <v-select
              id="category"
              v-model="project.category"
              :items="projectType"
              type="text"
              class="mt-3"
              color="primary"
              placeholder="Digite a sua categoria"
              :rules="stringRules"
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
            type="url"
            class="mt-3"
            color="primary"
            placeholder="Digite o link da documentação"
            :rules="linkRulesOptional"
          />
        </div>

        <div class="mr-10" style="width: 100%;">
          <label for="image" class="app-font-size-sm app-font-weight-medium text-gray-600">
            Foto do projeto (opcional)
          </label>
    
          <v-file-input
            id="image"
            v-model="project.image"
            accept="image/*"
            class="mt-3"
            color="primary"
          ></v-file-input>
        </div>

        <button
          class="button button--full text-white bg-red-ufba button--size-md justify-center py-4 app-font-weight-bold app-font-size-xl"
          type="submit"
        >
          Submeter projeto
        </button> 
        
      </v-form>

  </div>
</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';
import { User, Project, Demoday } from '@/src/types/index.ts';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Cadastrar projeto',
  activeNavLink: 'apply'
})

const isLoading = ref(false);

const isFormValid = ref<boolean>(false)

const projectType = ref(['IC', 'TCC', 'DISC', 'MSC', 'PHD']);

const itemsApply = ref<Demoday>({});

const user= ref<User>({});

// const itemsApply = ref<AccCriteriaDemoday[]>([])

// const itemsEvaluation = ref<EvalCriteriaDemoday[]>([])

// const itemsApply = ref([
//   {
//     name: 'Critério 1',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
//   },
//   {
//     name: 'Critério 2',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
//   },
//   {
//     name: 'Critério 3',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget arcu convallis, pretium velit vitae, egestas nisi. Duis quis rutrum urna. Vivamus urna arcu, ullamcorper et varius eget, venenatis ut est.'
//   }
// ]);


interface ProjectLocal {
  title: string
  collaborators: Collaborator[]
  linkVideo: string
  discipline: string
  teacher: string
  year: string
  period: number
  description: string
  technologies: string
  category: string
  linkDocumentation: string
  image: any
}

// const project = ref<ProjectLocal>({
//   title: '',
//   collaborators: [],
//   linkVideo: '',
//   discipline: '',
//   teacher: '',
//   year: '',
//   period: NaN,
//   description: '',
//   technologies: '',
//   category: '',
//   linkDocumentation: '',
//   image: ''
// })

const project = ref<ProjectLocal>({
  title: 'Demoday',
  collaborators: [{name: "Leandro", email: "leandro@ufba.br"}, {name: "Felipe", email: "felipe@ufba.br"}, {name: "Norma", email: "norma@ufba.br"}],
  linkVideo: 'https://www.demoday.com',
  discipline: 'Tópicos em Sistemas Web',
  teacher: 'Fred',
  year: '2024',
  period: 1,
  description: 'Demoday na veia',
  technologies: 'Vue.js, Nuxt.js, SpringBoot, Java',
  category: 'IC',
  linkDocumentation: 'https://github.com/LeandroBarbosaBento/demoday',
  image: null,
})

interface Collaborator {
  name: string
  email: string
}

const collaborator = ref<Collaborator>({
  name: "",
  email: "",
})

// Expressão regular para validar apenas letras, espaços e acentos
const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;

// Regras de validação para o campo de nome
const nameRules = [
  // (v: string) => !!v || 'O nome é obrigatório',
  (v: string) => v.length === 0 || namePattern.test(v) || 'Apenas letras, espaços e acentos são permitidos'
];

// Regras de validação para o campo de email
const emailRules = [
  // (v: string) => v.length === 0 || 'Email é obrigatório',
  (v: string) => v.length === 0 || /.+@.+\..+/.test(v) || 'Email inválido'
];

// Expressão regular para validar links
const linkPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Regras de validação para o campo de link
const linkRules = [
  (v: string) => !!v || 'O link é obrigatório',
  (v: string) => linkPattern.test(v) || 'Por favor, insira um link válido'
];

// Regra de validação de campo string nulo
const stringRules = [
  (v: string) => !!v || 'O campo é obrigatório'
];

// Regras de validação para o campo de ano
const yearRules = [
  (v: string) => !!v || 'O ano é obrigatório (apenas dígitos)',
  (v: string) => /^[2-9]\d{3}$/.test(v) || 'O ano deve ser a partir de 2024 e deve ter 4 dígitos'
];

// Regra de validação para o campo semestre
const periodRules = [
  (v: number) => !!v || 'O campo é obrigatório (apenas dígitos)',
];

// Regras de validação para o campo de link (opcional)
const linkRulesOptional = [
  (v: string) => {
    if (!v) return true; // Se o campo estiver vazio, não há problema
    return linkPattern.test(v) || 'Por favor, insira um link válido';
  }
];
// const collaborator = ref<Collaborator>({
//   name: "Reynan",
//   email: "reynan@ufba.br",
// })

function validate(value: string, rules: any[]) {
  for (let rule of rules) {
    const validationResult = rule(value);
    if (validationResult !== true) {
      return validationResult; // Retorna a mensagem de erro se a validação falhar
    }
  }
  return true; // Retorna true se todas as validações passarem
}

function addCollaborator(){
  const validateName = validate(collaborator.value.name, nameRules);
  const validateEmail = validate(collaborator.value.email, emailRules);
  if (!collaborator.value.name || !collaborator.value.email || validateName !== true || validateEmail !== true) {
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

function tempContacts(){
  const emails: string[] = [];
  project.value.collaborators.forEach(element => {
    emails.push(element.email);
  });
  console.log(emails);
  return emails;
}

async function handleCreateProject(){
  if(!isFormValid.value){
    console.error("Form Inválido");
    return;
  }
    
  const data = {
    period: project.value.period,
    title: project.value.title,
    linkvideo: project.value.linkVideo,
    discipline: project.value.discipline,
    professor: project.value.teacher,
    year: project.value.year,
    description: project.value.description,
    category: project.value.category,
    tecnologies: project.value.technologies,
    linkdoc: project.value.linkDocumentation,
    status: 'SUBMITTED',
    type: project.value.category,
    emails: tempContacts(),
    image: project.value.image ? project.value.image[0] : null,
    projectType: project.value.category
  };

  const formData = new FormData();

  project.value.collaborators.forEach((collaborator, index) => {
    formData.append(`emails[${index}]`, collaborator.email);
  });

  formData.append('period', project.value.period.toString());
  formData.append('title', project.value.title);
  formData.append('linkvideo', project.value.linkVideo);
  formData.append('discipline', project.value.discipline);
  formData.append('professor', project.value.teacher);
  formData.append('year', project.value.year);
  formData.append('description', project.value.description);
  formData.append('category', project.value.category);
  formData.append('tecnologies', project.value.technologies.toString());
  formData.append('linkdoc', project.value.linkDocumentation);
  formData.append('status', 'SUBMITTED');
  formData.append('type', project.value.category);
  formData.append('image', project.value.image ? project.value.image[0] : null);
  formData.append('projectType', project.value.category);


  console.log('data')
  console.log(data)
  console.log(formData)

  try {
    isLoading.value = true;

    const response = await axiosInstance.post(
      '/submitproject',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log('responde');
    console.log(response);

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }

}

async function receivingCriteria(){
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get('/getactivedemoday');
    itemsApply.value = data[0];
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

async function receivingUser(){
  try{
    isLoading.value = true;
    const { data } = await axiosInstance.get('/user/loggeduser');
    user.value = data;
  }catch (error) {
    console.error(error);
  }finally {
    isLoading.value = false;
  }

}

onMounted(() => {
  receivingCriteria();
  receivingUser();
});
</script>