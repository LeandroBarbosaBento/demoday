<template>
    <v-timeline align="start" side="end">
        <v-timeline-item
          dot-color="red-ufba"
          size="small"
        >
          <div class="d-flex">
            <strong class="me-4">Fase 1</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseOneInit)}} - 
                {{formatDate(demoday.phaseOneEnd)}}
              </strong>
              <div class="text-caption">
                Submissão de projetos
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="blue-ufba"
          size="small"
        >
          <div class="d-flex">
            <strong class="me-4">Fase 2</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseTwoInit)}} - 
                {{formatDate(demoday.phaseTwoEnd)}}
              </strong>
              <div class="text-caption mb-2">
                Avaliação de projetos pela comissão
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="red-ufba"
          size="small"
        >
          <div class="d-flex">
            <strong class="me-4">Fase 3</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseThreeInit)}} - 
                {{formatDate(demoday.phaseThreeEnd)}}
              </strong>
              <div class="text-caption">
                Votação para escolha dos finalistas
              </div>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item
          dot-color="blue-ufba"
          size="small"
        >
          <div class="d-flex">
            <strong class="me-4">Fase 4</strong>
            <div>
              <strong>
                {{formatDate(demoday.phaseFourInit)}} - 
                {{formatDate(demoday.phaseFourEnd)}}
              </strong>
              <div class="text-caption">
                Final
              </div>
            </div>
          </div>
        </v-timeline-item>
    </v-timeline>
</template>
<script setup lang="ts">
import { Demoday } from "@/types";
interface Props {
    demoday: Demoday
}
const props = defineProps<Props>();

function formatDate(date) {
  let newDate = date.split('-');
  return `${newDate[2]}/${newDate[1]}/${newDate[0]}`;
}
</script>