<template>
  <div class="px-8 py-8">
    <div class="d-flex">
      <!-- Início <br> -->
      <!-- <span v-if="userData"
        class="app-font-size-lg app-font-weight-bold text-gray-600"
      >{{ userData.type }}</span>
      <span v-else>Carregando...</span> -->


        <!-- <div 
          class="px-4 py-4 elevation-1 rounded-lg"
          v-if="userData.type === userType.STUDENT || userData.type === userType.PROFESSOR">
          STUDENT
        </div>
        <div 
          class="px-4 py-4 elevation-1 rounded-lg"
          v-else-if="userData.type === userType.ADMIN">
          ADMIN
        </div> -->

        <div class="px-4 py-4 elevation-1 rounded-lg " cols="6">oi</div>
      </div>

  </div>
</template>

<script setup lang="ts">
import { User } from '@/src/types/index.ts';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Início',
  activeNavLink: '/inicio'
})

enum userType {
    ADMIN="ADMIN",
    PROFESSOR="PROFESSOR",
    STUDENT="STUDENT"
}

const userData = ref<User | null>(null);

onMounted(() => {
    let data = localStorage.getItem('userData');
    if(data) userData.value = JSON.parse(data);

    // items.value = menus[userData.value.type];
});
</script>
<style lang="scss" scoped>
</style>