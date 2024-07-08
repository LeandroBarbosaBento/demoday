<template>
    <v-layout>
        <v-navigation-drawer
            v-model="drawer"
            expand-on-hover
            :width="320"
            app
            class="nav"
        >
            <sidebar is-expanded />
        </v-navigation-drawer>

        <v-app-bar class="elevation-0" :height="90">
            <layout-header 
                :header="$route.meta.headerText" 
                @toggle-sidebar="drawer = !drawer"
            />
        </v-app-bar>

        <v-main class="w-100 background">
            <slot></slot>
        </v-main>
    </v-layout>
</template>
<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue';
import LayoutHeader from '@/components/layout/LayoutHeader.vue';
import { useDisplay } from 'vuetify';

const { lgAndUp } = useDisplay();
const drawer = ref(lgAndUp.value);
const isNavigationExpanded = ref(false);

</script>
<style scoped lang="scss">
.background,
.v-main {
    background: rgb(var(--v-theme-background)) !important;
    min-height: 100vh !important;
}
.nav {
    background: rgb(var(--v-theme-sidebar)) !important;
}
</style>
