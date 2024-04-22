<template>
  <div>
    <h3 class="app-font-size-lg">
      Seja Bem Vindo ao
      <span class="app-font-size-lg text-blue-ufba app-font-weight-semibold">
      Demoday
      </span>
      !
    </h3>
    <p class="mt-1 d-block app-font-weight-regular text-gray-500 app-font-size-sm">
      Faça o login e acesse a plataforma.
    </p>
  
    <v-form v-model="isFormValid" class="pt-2 pb-5">
      <label for="email" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Login
      </label>

      <v-text-field
        id="email"
        v-model="inputs.email.value"
        class="mt-3"
        color="primary"
        placeholder="Digite seu E-mail institucional"
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

      <nuxt-link to="/auth/password" class="d-flex justify-end forgot-password-text text-primary">
        Esqueci minha senha
      </nuxt-link>

      <button
        class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-4 mt-10"
        type="button"
        @click="handleLoginRequest"
      >
        Entrar
      </button>  
      <p class="d-flex justify-end forgot-password-text mt-3 mb-5 text-gray-600">
        Ainda não tem uma conta? 
        <nuxt-link to="/auth/cadastro" class="text-primary ml-1">
          Cadastre-se!
        </nuxt-link>
      </p>

    </v-form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
  pageTitle: 'Login',
  hideGoBackButton: true
})

const inputs = ref({
  password: { error_messages: [], show: false, value: '', },
  email: { error_messages: [], value: '' },
})

const isFormValid = ref<boolean>(false)

async function handleLoginRequest() {
  console.log('handleLoginRequest');
  navigateTo({ path: '/inicio' })
  /* try {
    await navigateTo({ path: '/inicio' })
  } catch (err) {
    console.log(err)
  } */
}
</script>