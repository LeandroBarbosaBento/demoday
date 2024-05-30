<template>
    <header class="header px-8">
      <div class="header__content">
        <div class="text-white app-font-weight-semibold app-font-size-xl">
          <v-icon 
            color="white" 
            icon="mdi-menu"
            size="40"
            @click="$emit('toggleSidebar')"
            class="mr-5"
          />
          {{ route.meta.pageTitle }}
        </div>
      </div>
    </header>
</template>
<script setup lang="ts">

const route = useRoute()
defineEmits(['toggleSidebar'])

</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  max-height: 90px;
  display: flex;
  align-items: center;

  background: rgb(var(--v-theme-red-ufba));

  &__content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
