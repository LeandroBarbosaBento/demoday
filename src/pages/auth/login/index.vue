<template>
  <div>
    <h3 class="app-font-size-lg">
      Seja Bem Vindo ao
      <span 
        class="app-font-size-lg text-blue-ufba app-font-weight-semibold"
        @click="userHelper.show = !userHelper.show"
      >
      Demoday
      </span>
      !
    </h3>
    <p class="mt-1 d-block app-font-weight-regular text-gray-500 app-font-size-sm">
      Faça o login e acesse a plataforma.
    </p>

    <v-select 
      v-if="userHelper.show"
      v-model="userHelper.selected"
      label="Selecione um tipo de usuário"
      placeholder="Selecione um tipo de usuário"
      :items="['estudante', 'professor', 'admin']"
      class="mt-5"
      @update:modelValue="onUserHelper"
    />
  
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

      <v-btn
        class="text-white py-4 mt-10"
        color="red-ufba"
        block
        size="lg"
        type="button"
        @click="handleLoginRequest"
        :loading="isLoading"
      >
        Entrar
      </v-btn>  
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
import app from '@/utils/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axiosInstance from '@/api/axiosInstance';


definePageMeta({
  layout: 'auth-layout',
  pageTitle: 'Login',
  hideGoBackButton: true
})

const inputs = ref({
  password: { error_messages: [], show: false, value: '12345678', },
  email: { error_messages: [], value: 'meumiler@gmail.com' },
})

const userHelper = ref({
  show: false,
  selected: null,
  email: '',
  password: '',
});

function onUserHelper() {
  if(userHelper.value.selected === 'admin') {
    inputs.value.password.value = '12345678';
    inputs.value.email.value = 'meumiler@gmail.com';
  }

  if(userHelper.value.selected === 'estudante') {
    inputs.value.password.value = '123456';
    inputs.value.email.value = 'aluno3@email.com';
  }

  if(userHelper.value.selected === 'professor') {
    inputs.value.password.value = '123456';
    inputs.value.email.value = 'professor1@email.com';
  }
  
}

const isLoading = ref(false);

const isFormValid = ref<boolean>(false)

async function handleLoginRequest() {  
  try {
    isLoading.value = true;
    const auth = getAuth(app);
    const userCredential : any = await signInWithEmailAndPassword(
      auth,
      inputs.value.email.value, 
      inputs.value.password.value
    );
    const idToken = userCredential._tokenResponse.idToken;
    const { data } = await axiosInstance.post(`signin?userToken=${idToken}`)
    localStorage.setItem('userData', JSON.stringify(data));
    if(data.type === 'ADMIN') navigateTo({ path: '/admin/inicio' })
    if(data.type === 'PROFESSOR') navigateTo({ path: '/teacher/inicio' })
    if(data.type === 'STUDENT') navigateTo({ path: '/student/inicio' })
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }  
  
}
</script>