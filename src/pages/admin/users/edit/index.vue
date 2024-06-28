<template>
  <Loader v-if="isLoading" />
  <div class="px-8 py-5">
    <div class="px-8 elevation-2 rounded-lg">
    <v-form v-model="isFormValid" class="pt-2 pb-5">
      <label for="name" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Nome
      </label>

      <v-text-field
        id="name"
        v-model="inputs.name.value"
        class="mt-3"
        color="primary"
        placeholder="Digite o seu nome"
        :error-messages="inputs.name.error_messages"
      />

      <label for="cpf" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        CPF
      </label>

      <v-text-field
        id="cpf"
        v-model="inputs.cpf.value"
        class="mt-3"
        color="primary"
        placeholder="Digite seu CPF"
        v-maska:[{'mask':'###.###.###-##'}]
        :error-messages="inputs.cpf.error_messages"
      />

      <label for="email" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Email
      </label>

      <v-text-field
        id="email"
        v-model="inputs.email.value"
        class="mt-3"
        color="primary"
        placeholder="Digite seu e-mail institucional"
        :error-messages="inputs.email.error_messages"
      >
        <template #append-inner>
          <v-icon 
            class="me-3"
            color="gray-500" 
            icon="mdi-email-outline"
            size="25"
          />
        </template>
      </v-text-field>

      <label for="university" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Universidade (opcional)
      </label>

      <v-text-field
        id="university"
        v-model="inputs.university.value"
        class="mt-3"
        color="primary"
        placeholder="Digite o seu nome"
        :error-messages="inputs.university.error_messages"
      />

      <label for="type" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Perfil
      </label>

      <v-select
        id="type"
        :items="typeOptions"
        item-title="text"
        item-value="type"
        v-model="inputs.type.value"
        class="mt-3"
        color="primary"
        :error-messages="inputs.type.error_messages"
      />

      <v-alert 
        v-model="showErrorMessage"
        closable 
        :text="errorMessage"
        class="mb-5 bg-red-100"
      />

      <v-btn
        class="py-4"
        color="red-ufba"
        block
        size="lg"
        rounded="lg"
        type="button"
        :loading="isLoading"
        @click="handleRegisterRequest"
      >
        Atualizar Dados do usuário
    </v-btn>  
    </v-form>

    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useAsyncData } from '#app';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Informações do usuário',
  activeNavLink: 'edit'
});

// Recebendo dados do usuário passados como String
const route = useRoute();

const { data: user } = await useAsyncData('user', async () => {
  let user = null;
  if (route.query.user) {
    user = JSON.parse(route.query.user as string);
  }
  return user;
});

//
const typeOptions = ref([
  {
    type: 'PROFESSOR',
    text: 'Professor'
  },
  {
    type: 'STUDENT',
    text: 'Estudante'
  },
  {
    type: 'ADMINISTRATOR',
    text: 'Administrador'
  }
]);
const isLoading = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref('');

const inputs = ref({
  name: { error_messages: [], value: user.value.name },
  cpf: { error_messages: [], value: user.value.cpf },
  email: { error_messages: [], value: user.value.email },
  password: { error_messages: [], value: '', show: false },
  password_confirmation: { error_messages: [], value: '', show: false },
  university: { error_messages: [], value: user.value.university },
  type: { error_messages: [], value: user.value.type },
})

const isFormValid = ref<boolean>(false)

</script>