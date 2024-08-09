<template>
  <Loader v-if="isLoading" />
  <div class="px-8 py-4">
    <go-back-button class="mb-4" />
    <div class="px-8 elevation-1 rounded-lg">
    <v-form v-model="isFormValid" class="pt-2 pb-5">
      <label for="name" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Nome
      </label>

      <v-text-field
        id="name"
        v-model="userUpdate.name"
        class="mt-3"
        color="primary"
        placeholder="Digite o seu nome"
        required
      />

      <label for="cpf" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        CPF
      </label>

      <v-text-field
        id="cpf"
        v-model="userUpdate.cpf"
        class="mt-3"
        color="primary"
        placeholder="Digite seu CPF"
        v-maska:[{'mask':'###.###.###-##'}]
      />

      <label for="email" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Email
      </label>

      <v-text-field
        id="email"
        v-model="userUpdate.email"
        class="mt-3"
        color="primary"
        placeholder="Digite seu e-mail institucional"
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
        v-model="userUpdate.university"
        class="mt-3"
        color="primary"
        placeholder="Digite o seu nome"
      />

      <label for="type" class="app-font-size-sm text-gray-600 app-font-weight-medium">
        Perfil
      </label>

      <v-select
        id="type"
        :items="typeOptions"
        item-title="text"
        item-value="type"
        v-model="userUpdate.type"
        class="mt-3"
        color="primary"
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
        @click="handleUpdateUser"
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
import { User } from "@/types/index"
import axiosInstance from '@/api/axiosInstance';
import Swal from 'sweetalert2'

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Informações do usuário',
  activeNavLink: 'users'
});

// Recebendo dados do usuário passados como String
const route = useRoute();

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

const userUpdate = ref<User>({
  id: "",
  name: "",
  email: "",
  cpf: "",
  university: "",
  type: "STUDENT",
  status: "APPROVED",
  password: ""
});

const isFormValid = ref<boolean>(false)

async function handleUpdateUser() {
  if(isFormValid.value){
    try {
      isLoading.value = true;
      const data = {
        name: userUpdate.value.name,
        email: userUpdate.value.email,
        cpf: userUpdate.value.cpf.split('.').join('').split('-').join(''),
        university: userUpdate.value.university,
      };
      const response = await axiosInstance.post(
        `/user/update/${route.params.id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('response: ');
      console.log(response);

      Swal.fire({
      title: 'Concluído!',
      text: 'Usuário editado com sucesso!',
      icon: 'success',
      confirmButtonText: '<span class="text-white">Ok</span>'

    })
    await navigateTo({path: `/inicio`})

    } catch (error) {
      console.error(error);
      Swal.fire({
      title: 'Erro!',
      text: 'Ocorreu um erro, tente novamente...',
      icon: 'error',
      confirmButtonText: '<span class="text-white">Ok</span>'
    })
      
    } finally {
      isLoading.value = false;
      await navigateTo({ path: `/admin/users/`});
    }

  } else {
    console.log("Formulário inválido");

  }
}

async function getUser(id: any){
  try {
    isLoading.value = true;
    const { data } = await axiosInstance.get(`/user/${id}`);
    userUpdate.value = data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await getUser(route.params.id);
})
</script>