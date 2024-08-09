<template>
    <Loader v-if="isLoading" />
    <div 
      v-if="!activeDemoday"
      class="px-8 py-4"
    >
      <go-back-button class="mb-3 mt-3" />
      <v-form>
        <label 
          for="name" 
          class="app-font-size-lg app-font-weight-bold text-gray-600"
        >
          Nome do Demoday
        </label>

        <v-text-field
          id="name"
          v-model="name"
          class="mt-3"
          color="blue-ufba"
          placeholder="Digite o nome da nova edição do demoday"
        />

        <p class="app-font-size-xl app-font-weight-bold text-gray-600 mb-8 mt-3">
          Prazos
        </p>

        <div class="px-10 py-10 elevation-3 bg-white rounded-lg">
          <v-row class="px-4">
            <v-col>
              <v-row>
                <div>
                  <p class="app-font-weight-semibold">Fase 1</p>
                  <p>A primeira fase é a de submissão de projetos.</p>
                </div>
                
              </v-row>
              <v-row>
                <v-col cols="5">
                  <label for="init" class="app-font-size-sm text-gray-600">
                    Início: 
                  </label>
                  <v-text-field
                    id="init"
                    v-model="phaseOne.init"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de início"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="5">
                  <label for="end" class="app-font-size-sm text-gray-600">
                    Fim: 
                  </label>
                  <v-text-field
                    id="end"
                    v-model="phaseOne.end"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de fim"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <div>
                  <p class="app-font-weight-semibold">Fase 2</p>
                  <p>Na segunda fase a comissão avalia os projetos e pode aprová-los.</p>
                </div>
                
              </v-row>
              <v-row>
                <v-col cols="5">
                  <label for="init" class="app-font-size-sm text-gray-600">
                    Início: 
                  </label>
                  <v-text-field
                    id="init"
                    v-model="phaseTwo.init"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de início"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="5">
                  <label for="end" class="app-font-size-sm text-gray-600">
                    Fim: 
                  </label>
                  <v-text-field
                    id="end"
                    v-model="phaseTwo.end"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de fim"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="px-4">
            <v-col>
              <v-row>
                <div>
                  <p class="app-font-weight-semibold">Fase 3</p>
                  <p>A terceira fase é de votação do público para escolha dos finalistas.</p>
                </div>
                
              </v-row>
              <v-row>
                <v-col cols="5">
                  <label for="init" class="app-font-size-sm text-gray-600">
                    Início: 
                  </label>
                  <v-text-field
                    id="init"
                    v-model="phaseThree.init"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de início"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="5">
                  <label for="end" class="app-font-size-sm text-gray-600">
                    Fim: 
                  </label>
                  <v-text-field
                    id="end"
                    v-model="phaseThree.end"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de fim"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <div>
                  <p class="app-font-weight-semibold">Fase 4</p>
                  <p>Na quarta fase há a votação do público para escolha dos vencedores.</p>
                </div>
                
              </v-row>
              <v-row>
                <v-col cols="5">
                  <label for="init" class="app-font-size-sm text-gray-600">
                    Início: 
                  </label>
                  <v-text-field
                    id="init"
                    v-model="phaseFour.init"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de início"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="5">
                  <label for="end" class="app-font-size-sm text-gray-600">
                    Fim: 
                  </label>
                  <v-text-field
                    id="end"
                    v-model="phaseFour.end"
                    v-maska:[dateMask]
                    class="mt-3"
                    color="blue-ufba"
                    placeholder="Data de fim"
                  >
                    <template v-slot:prepend-inner>
                      <v-icon icon="mdi-calendar-blank" color="red-ufba"></v-icon>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>

        <v-row class="elevation-1 bg-white rounded-lg mt-5 px-5 py-5">
          <v-col cols="6">
            <p class="app-font-size-lg app-font-weight-bold text-gray-600 mb-3 mt-3">
              Critérios de inscrição
            </p>
            <label 
              for="applyName" 
              class="app-font-size-sm text-gray-600"
            >
              Nome do critério
            </label>

            <v-text-field
              id="applyName"
              v-model="applyCriteria.name"
              class="mt-3"
              color="blue-ufba"
              placeholder="Nome do critério de inscrição"
            />  

            <label 
              for="applyDescription" 
              class="app-font-size-sm text-gray-600"
            >
              Descrição do critério
            </label>

            <v-textarea
              id="applyDescription"
              v-model="applyCriteria.description"
              rows="3"
              class="mt-3"
              color="blue-ufba"
              placeholder="Descrição do critério de inscrição"
            /> 
            <button
              class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-2"
              type="button"
              @click="addApplyCriteria"
            >
              Adicionar critério
            </button> 
          </v-col>
          <v-col cols="6">
            <v-data-table
              :headers="criteriaHeaders"
              :items="applyCriteriaAdded"
              :items-per-page="5"
              :items-per-page-options="[5,10,20]"
            >
              <template v-slot:item.actions="{ index }">
                <v-icon 
                  icon="mdi-pen" 
                  color="red-ufba" 
                  class="cursor-pointer"
                  @click="editApplyCriteria(index)"
                />
                <v-icon 
                  icon="mdi-delete" 
                  color="red-ufba" 
                  class="cursor-pointer" 
                  @click="removeApplyCriteria(index)"
                />
              </template>

            </v-data-table>
          </v-col>
        </v-row>

        <v-row class="elevation-1 bg-white rounded-lg mt-10 px-5 py-5">
          <v-col cols="6">
            <p class="app-font-size-lg app-font-weight-bold text-gray-600 mb-3 mt-3">
              Critérios de avaliação
            </p>
            <label 
              for="applyName" 
              class="app-font-size-sm text-gray-600"
            >
              Nome do critério
            </label>

            <v-text-field
              id="applyName"
              v-model="evalCriteria.name"
              class="mt-3"
              color="blue-ufba"
              placeholder="Nome do critério de inscrição"
            />  

            <label 
              for="applyDescription" 
              class="app-font-size-sm text-gray-600"
            >
              Descrição do critério
            </label>



            <v-textarea
              id="applyDescription"
              v-model="evalCriteria.description"
              rows="3"
              class="mt-3"
              color="blue-ufba"
              placeholder="Descrição do critério de inscrição"
            /> 
            <button
              class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-2"
              type="button"
              @click="addEvalCriteria"
            >
              Adicionar critério
            </button> 
          </v-col>
          <v-col cols="6">
            <v-data-table
              :headers="criteriaHeaders"
              :items="evalCriteriaAdded"
              :items-per-page="5"
              :items-per-page-options="[5,10,20]"
            >
              <template v-slot:item.actions="{ index }">
                <v-icon 
                  icon="mdi-pen" 
                  color="red-ufba" 
                  class="cursor-pointer"
                  @click="editEvalCriteria(index)"
                />
                <v-icon 
                  icon="mdi-delete" 
                  color="red-ufba" 
                  class="cursor-pointer" 
                  @click="removeEvalCriteria(index)"
                />
              </template>

            </v-data-table>
          </v-col>
        </v-row>

        <button
          class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-4 mt-15 mb-15"
          type="button"
          @click="handleCreateDemoday"
        >
          Cadastrar demoday
        </button> 

      </v-form>
     
    </div>
    <div v-else class="px-8 py-4">
      <go-back-button class="mb-3 mt-3" />
      <h1>Já existe um Demoday ativo...</h1>
      <h2>Aguarde o seu encerramento</h2>
    </div>
</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';
import Swal from 'sweetalert2'
import { Demoday } from '@/types/index';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Criar novo demoday',
  activeNavLink: 'demoday'
})

const dateMask = {'mask':'##/##/####'}; 

const isLoading = ref(false);

const activeDemoday = ref<Demoday>();

const name = ref('');
const phaseOne = ref({
  init: '',
  end: '',
});
const phaseTwo = ref({
  init: '',
  end: '',
});
const phaseThree = ref({
  init: '',
  end: '',
});
const phaseFour = ref({
  init: '',
  end: '',
});

const criteriaHeaders = [
  {title: 'Critério', key: 'name'},
  {title: 'Descrição', key: 'description'},
  {title: 'Ações', key: 'actions'}
]

interface Criteria {
  name: string
  description: string
}
const applyCriteria = ref<Criteria>({
  name:'',
  description: '',
});

const applyCriteriaAdded = ref<Criteria []>([]);

const evalCriteria = ref<Criteria>({
  name:'',
  description: '',
});

const evalCriteriaAdded = ref<Criteria []>([]);

function addApplyCriteria() {
  if(!applyCriteria.value.name || !applyCriteria.value.description) {
    console.log('Não é possível adicionar um critério sem nome e descrição');
    return;
  }
  applyCriteriaAdded.value.push(applyCriteria.value);
  applyCriteria.value = {name:'', description:''};
}

function editApplyCriteria(index: number) {
  applyCriteria.value = applyCriteriaAdded.value[index];
  applyCriteriaAdded.value.splice(index, 1);
}

function removeApplyCriteria(index: number) {
  applyCriteriaAdded.value.splice(index, 1);
}

function addEvalCriteria() {
  if(!evalCriteria.value.name || !evalCriteria.value.description) {
    console.log('Não é possível adicionar um critério sem nome e descrição');
    return;
  }
  evalCriteriaAdded.value.push(evalCriteria.value);
  evalCriteria.value = {name:'', description:''};
}

function editEvalCriteria(index: number) {
  evalCriteria.value = evalCriteriaAdded.value[index];
  evalCriteriaAdded.value.splice(index, 1);
}

function removeEvalCriteria(index: number) {
  evalCriteriaAdded.value.splice(index, 1);
}

async function handleCreateDemoday() {
  console.log('handleCreateDemoday');
  const data = {
    name: name.value,
    phaseOneInit: formatSendDate(phaseOne.value.init),
    phaseOneEnd: formatSendDate(phaseOne.value.end),
    phaseTwoInit: formatSendDate(phaseTwo.value.init),
    phaseTwoEnd: formatSendDate(phaseTwo.value.init),
    phaseThreeInit: formatSendDate(phaseThree.value.init),
    phaseThreeEnd: formatSendDate(phaseThree.value.init),
    phaseFourInit: formatSendDate(phaseFour.value.init),
    phaseFourEnd: formatSendDate(phaseFour.value.init),
    accCriteriaDemoday: applyCriteriaAdded.value,
    evalCriteriaDemoday: evalCriteriaAdded.value 
  }
    
  console.log('data');
  console.log(data);

  try {
    isLoading.value = true;

    const response = await axiosInstance.post('/newdemoday', data);
    console.log('response: ');
    console.log(response);

    Swal.fire({
      title: 'Concluído!',
      text: 'Demoday criado com sucesso!',
      icon: 'success',
      confirmButtonText: '<span class="text-white">Ok</span>'

    })
    await navigateTo({path: `/inicio`})

  } catch (error) {
    console.error(error);
    let message = '';
    if(error?.response?.data?.message) message = error.response.data.message;
    else message = error.message;
    Swal.fire({
      title: 'Erro!',
      text: message,
      icon: 'error',
      confirmButtonText: '<span class="text-white">Ok</span>'

    })
  } finally {
    isLoading.value = false;
  }
}

function formatSendDate(date) {
  if(!date) return '';
  let splited = date.split('/')
  return `${splited[2]}-${splited[1]}-${splited[0]}`;
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

onMounted(() => {
  getActiveDemoday();
})
</script>
<style scoped lang="scss">
</style>