<template>
    <v-timeline align="start" side="end" class="text-gray-700">
        <v-timeline-item
          dot-color="red-ufba"
          size="small"
          :icon=" currentPhase === 1 ? 'mdi-star' : ''"
        >
        <template v-slot:opposite>
          <div
            v-if="currentPhase === 1"
            :class="`pt-1 headline font-weight-bold`"
            v-text="'fase atual'"
          ></div>
        </template>
          <div class="d-flex">
            <strong class="me-4">Fase 1</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseOneInit)}} - 
                {{formatDate(demoday.phaseOneEnd)}}
              </strong>
              <div class="text-caption text-gray-500">
                Submissão de projetos
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="blue-ufba"
          size="small"
          :icon=" currentPhase === 2 ? 'mdi-star' : ''"

        >
          <template v-slot:opposite>
            <div
              v-if="currentPhase === 2"
              :class="`pt-1 headline font-weight-bold`"
              v-text="'fase atual'"
            ></div>
          </template>
          <div class="d-flex">
            <strong class="me-4">Fase 2</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseTwoInit)}} - 
                {{formatDate(demoday.phaseTwoEnd)}}
              </strong>
              <div class="text-caption text-gray-500">
                Avaliação de projetos pela comissão
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="red-ufba"
          size="small"
          :icon=" currentPhase === 3 ? 'mdi-star' : ''"
        >
          <template v-slot:opposite>
            <div
              v-if="currentPhase === 3"
              :class="`pt-1 headline font-weight-bold`"
              v-text="'fase atual'"
            ></div>
          </template>
          <div class="d-flex">
            <strong class="me-4">Fase 3</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseThreeInit)}} - 
                {{formatDate(demoday.phaseThreeEnd)}}
              </strong>
              <div class="text-caption text-gray-500">
                Votação para escolha dos finalistas
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="blue-ufba"
          size="small"
          :icon=" currentPhase === 4 ? 'mdi-star' : ''"
        >
          <template v-slot:opposite>
            <div
              v-if="currentPhase === 4"
              :class="`pt-1 headline font-weight-bold`"
              v-text="'fase atual'"
            ></div>
          </template>
          <div class="d-flex">
            <strong class="me-4">Fase 4</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseFourInit)}} - 
                {{formatDate(demoday.phaseFourEnd)}}
              </strong>
              <div class="text-caption text-gray-500">
                Final
              </div>
            </div>
          </div>
        </v-timeline-item>
    </v-timeline>
</template>
<script setup lang="ts">
import { Demoday } from "@/types";
import { getCurrentPhase } from "@/utils/helpers"
interface Props {
    demoday: Demoday
}
const props = defineProps<Props>();

const currentPhase = getCurrentPhase(props.demoday)

function formatDate(date) {
  let newDate = date.split('-');
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
}
</script>