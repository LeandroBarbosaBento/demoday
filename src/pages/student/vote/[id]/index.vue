<template>
  <v-btn @click="receivingCriteria">Teste endpoint</v-btn>
  <div class="px-8 py-8">
    <h1>Teste</h1>
  </div>

</template>
<script setup lang="ts">
import axiosInstance from '@/api/axiosInstance';

definePageMeta({
  layout: 'default-layout',
  pageTitle: 'Avaliar projeto',
  activeNavLink: '/vote/list'
})

async function receivingCriteria(){
  try {
    const { data } = await axiosInstance.get('/getactivedemoday');
    console.log("receivingCriteria");
    console.log(data[0]);
    console.log(data[0].accCriteriaDemoday);
    console.log(data[0].evalCriteriaDemoday);
  } catch (error) {
    console.error(error);
  } finally {
  }
};

onMounted(async () => {
  receivingCriteria();
});
</script>