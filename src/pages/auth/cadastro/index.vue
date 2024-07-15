<template>
  <div>
    <h3 class="app-font-size-lg">
      Cadastre-se no sistema 
      <span class="app-font-size-lg text-blue-ufba app-font-weight-semibold">
      Demoday
      </span>
      !
    </h3>
    <p class="mt-1 d-block app-font-weight-regular text-gray-500 app-font-size-sm">
      Preencha os dados abaixo para ter acesso à plataforma
    </p>
  
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

      <label for="password" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Senha
      </label>

      <v-text-field
        id="password"
        v-model="inputs.password.value"
        class="mt-3"
        :type="inputs.password.show ? 'text' : 'password'"
        color="primary"
        placeholder="Digite sua senha de acesso"
        :error-messages="inputs.password.error_messages"
      >
        <template #append-inner>
          <v-icon 
            class="me-3 cursor-pointer"
            color="gray-500" 
            :icon="inputs.password.show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            size="25"
            @click="inputs.password.show = !inputs.password.show"
          />
        </template>
      </v-text-field>

      <label for="password" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Confirme a sua senha
      </label>

      <v-text-field
        id="password_confirmation"
        v-model="inputs.password_confirmation.value"
        class="mt-3"
        :type="inputs.password_confirmation.show ? 'text' : 'password'"
        color="primary"
        placeholder="Digite sua senha de acesso"
        :error-messages="inputs.password_confirmation.error_messages"
      >
        <template #append-inner>
          <v-icon 
            class="me-3 cursor-pointer"
            color="gray-500" 
            :icon="inputs.password_confirmation.show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            size="25"
            @click="inputs.password_confirmation.show = !inputs.password_confirmation.show"
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
        Finalizar cadastro
    </v-btn>  
    </v-form>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';

definePageMeta({
  layout: 'auth-layout',
  pageTitle: 'Cadastro'
})

const typeOptions = ref([
  {
    type: 'PROFESSOR',
    text: 'Professor'
  },
  {
    type: 'STUDENT',
    text: 'Estudante'
  }
]);
const isLoading = ref(false);
const showErrorMessage = ref(false);
const errorMessage = ref('');

const inputs = ref({
  name: { error_messages: [], value: '' },
  cpf: { error_messages: [], value: '' },
  email: { error_messages: [], value: '' },
  password: { error_messages: [], value: '', show: false },
  password_confirmation: { error_messages: [], value: '', show: false },
  university: { error_messages: [], value: '' },
  type: { error_messages: [], value: 'STUDENT' },
})

const isFormValid = ref<boolean>(false)

async function handleRegisterRequest() {
  try {
    isLoading.value = true;

    const params = {
      name: inputs.value.name.value,
      cpf: inputs.value.cpf.value.split('.').join('').split('-').join(''),
      email: inputs.value.email.value,
      password: inputs.value.password.value,
      password_confirmation: inputs.value.password_confirmation.value,
      university: inputs.value.university.value,
      type: inputs.value.type.value,
    }

    const { data } = await axiosInstance.post('/user/create', params);
    console.log('data');
    console.log(data);

  } catch (e) {
    console.log('error');
    console.error(e);

    showErrorMessage.value = true;
    errorMessage.value = e.response.data.message;

    if(e.response.data.errors){
      const errors = e.response.data.errors;
      Object.keys(errors).forEach(function(key) {
          inputs.value[key].error_messages = errors[key]
      });
    }
    
  } finally {
    isLoading.value = false;
  }
}
</script>