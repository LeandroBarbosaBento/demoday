<template>
    <v-card elevation="1">
        <v-img
        class="align-end text-white"
        height="100"
        :src="`data:image/jpeg;base64, ${project.image}`"
        cover
        >
        <v-btn
            class="cursor-default"
            style="position: absolute; top: 10px; right: 10px;"
            rounded="lg"
            size="small"
            :color="projectType[project.type].color" 
            elevation="2"
        >
            <span class="text-white font-weight-bold"> 
            {{ projectType[project.type].text }}
            </span> 
        </v-btn>
        </v-img>
        <v-card-text>
        <h2 class="text-gray-700 app-font-size-md text-center">
            {{ project.title }}
        </h2>
        <v-btn
            color="green-ufba"
            block
            flat
            class="mt-3"
            @click="$emit('onButtonClick')"
        >
            <span class="text-white app-font-weight-semibold" style="text-transform: none;">
                {{ buttonText }}
            </span>
        </v-btn>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { Project } from "@/types";
interface Props {
    project: Project
    buttonText: string
}
const props = defineProps<Props>();

const projectType = ref({
  'IC': {color: 'blue-ufba', text: 'IC'},
  'TCC': {color: 'red-ufba', text: 'TCC'},
  'DISC': {color: 'green-ufba', text: 'DISC'},
  'MSC': {color: 'yellow-ufba', text: 'MSC'},
  'PHD': {color: 'orange', text: 'PHD'},
})

defineEmits<{
  "onButtonClick": [],
}>();
</script>