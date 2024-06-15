<template>
    <div class="sidebar">
        <div class="d-flex justify-center align-center pa-4">
            <nuxt-link to="/inicio" class="d-flex align-center">
                <v-img :src="LogoImage" alt="logo" width="75px" class="mt-4" />
            </nuxt-link>
        </div>

        <ul 
            v-for="(item, i) in items.concat(menuGeneral)" 
            :key="i"
        >
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

enum userType {
    ADMIN="ADMIN",
    PROFESSOR="PROFESSOR",
    STUDENT="STUDENT"
}

interface Menu {
    [index: userType]: RouterItem []
}

const menus : Menu = {
    [userType.ADMIN]: [
        {
            text: 'Inicio',
            icon: 'mdi-home',
            url: '/inicio',
            slug: '/inicio'
        },
        {
            text: 'Criar novo demoday',
            icon: 'mdi-invoice-plus',
            url: '/admin/demoday',
            slug: 'demoday'
        },
        {
            text: 'Lista de usuários',
            icon: 'mdi-account',
            url: '/admin/users',
            slug: 'users',
        },
        {
            text: 'Usuários Pendentes',
            icon: 'mdi-account-clock',
            url: '/admin/users/pending',
            slug: 'pending'
        },
        // REMOVER
        {
            text: 'Avaliar projetos',
            icon: 'mdi-format-list-bulleted',
            url: '/teacher/evaluate',
            slug: 'evaluate',
        },
        
    ],
    [userType.PROFESSOR]: [
        {
            text: 'Avaliar projetos',
            icon: 'mdi-format-list-bulleted',
            url: '/teacher/evaluate',
            slug: 'evaluate',
        },
        {
            text: 'Sair',
            icon: 'mdi-exit-to-app',
            url: '/auth/login',
            slug: 'login'
        },
    ],
    [userType.STUDENT]: [
        {
            text: 'Cadastro de projeto',
            icon: 'mdi-projector-screen',
            url: '/student/apply',
            slug: 'apply'
        },
        {
            text: 'Votar nos projetos',
            icon: 'mdi-ballot-outline',
            url: '/student/vote/list',
            slug: '/vote/list'
        },
        {
            text: 'Sair',
            icon: 'mdi-exit-to-app',
            url: '/auth/login',
            slug: 'login'
        },
    ]
}

const items = ref<RouterItem[]>([]);

const menuGeneral: RouterItem[] = [
    {
        text: 'Histórico de demodays',
        icon: 'mdi-database-eye',
        url: '/historic',
        slug: 'historic',
    },
    {
        text: 'Sair',
        icon: 'mdi-exit-to-app',
        url: '/auth/login',
        slug: 'login'
    },
];

interface User {
    cpf: string
    email: string
    id: string
    name: string
    password: string | null
    status: string
    type: string
    university?: string
}

const userData = ref<User>();
async function navigateToLink(item: RouterItem) {
    await navigateTo(item.url)
}

onMounted(() => {
    let data = localStorage.getItem('userData');
    if(data) userData.value = JSON.parse(data);

    items.value = menus[userData.value.type];
});
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
    background: rgba(255, 92, 92, 0.1);

  }
}
</style>
