<template>
    <div class="d-flex loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="red-ufba"
        indeterminate
        class="mt-16"
      />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.loading {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  border-radius: 0px;
  z-index: 21;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
