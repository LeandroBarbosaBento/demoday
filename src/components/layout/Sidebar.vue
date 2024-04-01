<template>
    <div class="sidebar">
        <div class="d-flex justify-center align-center pa-4">
            <nuxt-link to="/inicio" class="d-flex align-center">
                <v-img :src="LogoImage" alt="logo" width="75px" class="mt-4" />
            </nuxt-link>
        </div>

        <ul v-for="(item, i) in items" :key="i">
            <li
                :class="{
                    'sidebar__item--active': route.meta.activeNavLink === item.slug,
                }"
                class="sidebar__item cursor-pointer"
                @click="navigateToLink(item)"
            >
                <div 
                    class="d-flex align-center" 
                    :class="{ 'justify-center': !isExpanded }"
                >
                    <v-icon 
                        color="red-ufba" 
                        :icon="item.icon"
                        size="40"
                    />
                    <span
                        v-if="isExpanded"
                        class="ms-4 d-inline-block sidebar__text app-font-size-md app-font-weight-medium"
                    >
                        {{ item.text }}
                    </span>
                </div>
            </li>
        </ul>                      
    </div>
</template>
<script setup lang="ts">
import LogoImage from '@/assets/logo_demoday.png'
import { useTheme } from 'vuetify'


interface Props {
  isExpanded: boolean
}
defineProps<Props>()

interface RouterItem {
    text: string
    icon: string
    url: string
    slug: string
}

const route = useRoute()

const items: RouterItem[] = [
    {
        text: 'Inicio',
        icon: 'mdi-home',
        url: '/inicio',
        slug: 'inicio'
    },
    {
        text: 'Criar novo demoday',
        icon: 'mdi-invoice-plus',
        url: '/admin/demoday',
        slug: 'demoday'
    },
    {
        text: 'Sair',
        icon: 'mdi-exit-to-app',
        url: '/auth/login',
        slug: 'login'
    },
];

async function navigateToLink(item: RouterItem) {
    await navigateTo(item.url)
}
</script>
<style lang="scss" scoped>
.decoration-none {
  text-decoration: none;
}

ul {
  list-style-type: none;
}

.sidebar {
  background: rgb(var(--v-theme-sidebar));
  height: 100%;

  &__text {
    color: rgb(var(--v-theme-red-ufba));
    width: 250px;
    white-space: normal;
    word-break: none;
    word-wrap: nowrap;
  }

  &__item {
    min-height: 50px;
    padding: 10px 29px 10px 29px;
    margin: 0.7rem 0.2rem;
  }

  &__item--active {
    color: rgb(var(--v-theme-red-ufba));
    border-radius: 0.5rem !important;
    background: rgba(22, 122, 131, .3);

  }
}
</style>