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

      <label for="profile" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Perfil
      </label>

      <v-select
        id="profile"
        :items="profileOptions"
        v-model="inputs.profile.value"
        class="mt-3"
        color="primary"
        :error-messages="inputs.profile.error_messages"
      />

      <button
        class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-4 mt-10"
        type="button"
        @click="handleRegisterRequest"
      >
        Finalizar cadastro
      </button>  
    </v-form>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  layout: 'auth-layout',
  pageTitle: 'Cadastro'
})

const profileOptions = ref(['Professor', 'Aluno']);

const inputs = ref({
  name: { error_messages: [], value: '' },
  cpf: { error_messages: [], value: '' },
  email: { error_messages: [], value: '' },
  password: { error_messages: [], value: '', show: false },
  password_confirmation: { error_messages: [], value: '', show: false },
  university: { error_messages: [], value: '' },
  profile: { error_messages: [], value: 'Aluno' },
})

const isFormValid = ref<boolean>(false)

async function handleRegisterRequest() {
  console.log('handleRegisterRequest');
}
</script>