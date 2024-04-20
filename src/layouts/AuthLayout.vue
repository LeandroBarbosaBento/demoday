<template>
    <div class="background">
        <v-container fluid class="py-0 height-100">
            <div class="background d-flex">
                <v-row class="h-100 p-5">
                    <v-col cols="12" md="6" class="mt-5 left-col">
                        <img :src="LogoDemoday" width="80%" />
                    </v-col>
                    <v-col cols="12" md="6" class="h-100 py-16">
                        <div class="form-container px-2 px-md-15 d-flex flex-column">
                            <button
                                v-if="!$route.meta.hideGoBackButton" 
                                class="button py-1 px-1 mt-10"
                                @click="$router.go(-1)"
                            >
                                <v-icon 
                                    color="red-ufba" 
                                    icon="mdi-arrow-left-thin-circle-outline"
                                    size="40"
                                />
                            </button> <br/>
                            <div class="container">
                                <slot></slot>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import LogoDemoday from '@/assets/logo_demoday.png';
</script>
<style scoped lang="scss">
.height-100 {
    height: 100vh !important;
}

.background {
    background-color: rgb(var(--v-theme-background)) !important;
}
.form-container {
    max-height: 100%;
    box-sizing: border-box;
    background-color: rgb(var(--v-theme-white));
    border-radius: 1.25rem;
    box-shadow: -3px 20px 20px 0px rgba(0, 0, 0, 0.05);
}

.container {
    padding: 10px;
    width: 100%;
    max-width: 670px;
    margin: 0 auto;

    * {
        width: 100%;
    }
}
.left-col {
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
</style>
