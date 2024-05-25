<template>
    <Loader v-if="isLoading" />
    <div class="px-8 py-8">
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

        <p class="app-font-size-lg app-font-weight-bold text-gray-600 mb-3 mt-3">
          Prazos
        </p>

        <v-stepper 
          class="mb-8 text-gray-600 rounded-lg"
          :elevation="1"
        >
          <template v-slot:default="{ prev, next }">
            <v-stepper-header 
              style="box-shadow: none; border-bottom: 1px solid rgba(100, 100, 100, 0.521)"
            >
              <v-stepper-item
                v-for="step in stepperPhases"
                :key="step.value"
                :value="step.value"
              >
                <div class="d-flex gap-5 align-center justify-center">
                  {{ step.title }}
                  <v-icon 
                    :id="`menu-activator-phase-${step.value}`" 
                    icon="mdi-information-outline"
                    color="gray-500"
                    class="cursor-pointer"
                    size="sm"
                  />
                </div>
                <v-menu :activator="`#menu-activator-phase-${step.value}`">
                  <v-card :width="300" class="px-5 py-5">
                    {{ step.description }}
                  </v-card>
                </v-menu>
              </v-stepper-item>

            </v-stepper-header>

            <v-stepper-window>
              <v-stepper-window-item :value="1">
                <p>A primeira fase é a de submissão de projetos.</p>
                <div class="d-flex align-center gap-20">
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
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="2">
                <p>Na segunda fase a comissão avalia os projetos e pode aprová-los ou não.</p>
                <div class="d-flex align-center gap-20">
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
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="3">
                <p>A terceira fase é de votação do público para escolha dos finalistas.</p>
                <div class="d-flex align-center gap-20">
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
                </div>
              </v-stepper-window-item>

              <v-stepper-window-item :value="4">
                <p>Na quarta fase há a votação do público para escolha dos vencedores.</p>
                <div class="d-flex align-center gap-20">
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
                </div>
              </v-stepper-window-item>
            </v-stepper-window>

            <v-stepper-actions
              class="d-flex justify-space-between align-center py-3"
            >
              <template v-slot:next> 
                <v-btn 
                  variant="text" 
                  append-icon="mdi-arrow-collapse-right"
                  @click="next"
                >
                  Próximo
                </v-btn>
              </template>
              <template v-slot:prev> 
                <v-btn 
                  variant="text" 
                  prepend-icon="mdi-arrow-collapse-left"
                  @click="prev"
                >
                  Anterior
                </v-btn>
              </template>
            </v-stepper-actions>
          </template>

        </v-stepper>

        <div class="d-flex gap-20 width-100 bg-white rounded-lg elevation-1 mt-5 px-5 py-5">
          <div class="width-100">
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
          </div>
          <div class="width-100">
            <p class="app-font-size-lg app-font-weight-bold text-gray-600 mb-3 mt-3">
              Critérios de inscrição adicionados
            </p>
            <p v-if="!applyCriteriaAdded.length" class="text-center">Sem critérios adicionados</p>
            <v-table v-else class="elevation-1 rounded-lg">
              <thead>
                <tr>
                  <th>Critério</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(criteria, index) in applyCriteriaAdded" :key="index">
                  <td> {{ criteria.name }}</td>
                  <td class="py-2">
                    {{ criteria.description }}
                  </td>
                  <td>
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
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>

        <div class="d-flex gap-20 width-100 bg-white rounded-lg elevation-1 mt-5 px-5 py-5">
          <div class="width-100">
            <p class="app-font-size-lg app-font-weight-bold text-gray-600 mb-3 mt-3">
              Critérios de avaliação
            </p>
            <label 
              for="evalName" 
              class="app-font-size-sm text-gray-600"
            >
              Nome do critério
            </label>

            <v-text-field
              id="evalName"
              v-model="evalCriteria.name"
              class="mt-3"
              color="blue-ufba"
              placeholder="Nome do critério de inscrição"
            />  

            <label 
              for="evalDescription" 
              class="app-font-size-sm text-gray-600"
            >
              Descrição do critério
            </label>

            <v-textarea
              id="evalDescription"
              v-model="evalCriteria.description"
              rows="3"
              class="mt-3"
              color="blue-ufba"
              placeholder="Descrição do critério de avaliação"
            /> 
            <button
              class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-2"
              type="button"
              @click="addEvalCriteria"
            >
              Adicionar critério
            </button> 
          </div>
          <div class="width-100">
            <p class="app-font-size-lg app-font-weight-bold text-gray-600 mb-3 mt-3">
              Critérios de avaliação adicionados
            </p>
            <p v-if="!evalCriteriaAdded.length" class="text-center">Sem critérios adicionados</p>
            <v-table v-else class="elevation-1 rounded-lg">
              <thead>
                <tr>
                  <th>Critério</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(criteria, index) in evalCriteriaAdded" :key="index">
                  <td> {{ criteria.name }}</td>
                  <td class="py-2">
                    {{ criteria.description }}
                  </td>
                  <td>
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
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>

        <button
          class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-4 mt-15 mb-15"
          type="button"
          @click="handleCreateDemoday"
        >
          Cadastrar demoday
        </button> 

      </v-form>
     
    </div>
</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Criar novo demoday',
  activeNavLink: 'demoday'
})

const dateMask = {'mask':'##/##/####'}; 

const isLoading = ref(false);

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
const stepperPhases = ref([
  {
    title: 'Fase 1',
    value: 1,
    description: 'A primeira fase é a de submissão de projetos.'
  },
  {
    title: 'Fase 2',
    value: 2,
    description: 'Na segunda fase a comissão avalia os projetos e pode aprová-los ou não.'
  },
  {
    title: 'Fase 3',
    value: 3,
    description: 'A terceira fase é de votação do público para escolha dos finalistas.  '
  },
  {
    title: 'Fase 4',
    value: 4,
    description: 'Na quarta fase há a votação do público para escolha dos vencedores. '
  }
]);

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
    phaseOneInit: phaseOne.value.init,
    phaseOneEnd: phaseOne.value.end,
    phaseTwoInit: phaseTwo.value.init,
    phaseTwoEnd: phaseTwo.value.init,
    phaseThreeInit: phaseThree.value.init,
    phaseThreeEnd: phaseThree.value.init,
    phaseFourInit: phaseFour.value.init,
    phaseFourEnd: phaseFour.value.init,
    accCriteriaDemoday: applyCriteriaAdded.value,
    evalCriteriaDemoday: evalCriteriaAdded.value 
  }
    
  console.log('data');
  console.log(data);

  try {
    isLoading.value = true;

    const response = await axiosInstance.post('/newDemoday', data);
    console.log('response: ');
    console.log(response);

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<style scoped lang="scss">
</style>