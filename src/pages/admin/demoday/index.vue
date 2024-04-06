<template>
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

        <p class="app-font-size-lg app-font-weight-bold text-gray-600 mb-3 mt-3">
          Critérios de inscrição
        </p>

      </v-form>
     
    </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Criar novo demoday',
  activeNavLink: 'demoday'
})

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
</script>