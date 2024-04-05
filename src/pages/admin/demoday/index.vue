<template>
    <div class="px-8 py-8">
      <v-form>
        <label 
          for="name" 
          class="app-font-size-sm text-gray-600"
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

        <v-stepper 
          class="mb-8"
          bg-color="rgba(255, 0, 0, 0)"
          :items="['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4']"
        >
          <template v-slot:item.1>
            <v-card title="Step One" flat>...</v-card>
          </template>

          <template v-slot:item.2>
            Fase 2
          </template>

          <template v-slot:item.3>
            <v-card title="Step Three" flat>...</v-card>
          </template>

          <template v-slot:item.4>
            <v-card title="Step 4" flat>...</v-card>
          </template>
        </v-stepper>

        


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


</script>