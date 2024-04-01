<template>
    <div>
        <h3 class="app-font-size-lg">
            Recupere a sua senha
        </h3>
        <p class="mt-1 d-block app-font-weight-regular text-gray-500 app-font-size-sm">
            Você receberá as instruções de mudança de senha diretamente no seu email!
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
                placeholder="Digite seu E-mail"
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

            <button
                class="button button--full text-white bg-red-ufba button--size-md d-flex justify-center py-4 mt-10"
                type="button"
                @click="handleRecoverPasswordRequest"
            >
                Recuperar senha
            </button>    
        </v-form>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: 'auth-layout',
    pageTitle: 'Recuperar senha'
})

const inputs = ref({
    email: { error_messages: [], value: '' },
})

const isFormValid = ref<boolean>(false)

async function handleRecoverPasswordRequest() {
    console.log('handleRecoverPasswordRequest');
    //navigateTo({ path: '/inicio' })
    /* try {
        await navigateTo({ path: '/inicio' })
    } catch (err) {
        console.log(err)
    } */
}
</script>