<template>
    <div class="background">
        <v-container fluid class="py-0 height-100">
            <div class="background d-flex">
                <v-row class="h-100">
                    <v-col cols="12" md="6" class="pa-10 py-16 d-flex justify-center align-start">
                        <img :src="LogoDemoday" width="80%" style="margin: auto" />
                    </v-col>
                    <v-col cols="12" md="6" class="h-100 py-16">
                        <div class="form-container px-2 px-md-15 d-flex flex-column">
                            <button
                                class="button py-1 px-1 mt-10"
                                @click="$router.go(-1)"
                            >
                                <ph-arrow-circle-left 
                                    :size="40" 
                                    color="red" 
                                    weight="light" 
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
import { PhArrowCircleLeft } from "@phosphor-icons/vue";
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
    /* height: 100%; */
    border-radius: 1.25rem;
    box-shadow: -3px 20px 20px 0px rgba(0, 0, 0, 0.05);
}

.container {
    padding: 10px;
    /* height: 100%; */
    width: 100%;
    max-width: 670px;
    margin: 0 auto;

    * {
        width: 100%;
    }
}
</style>
