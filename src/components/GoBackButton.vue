<template>
    <v-btn
        class="py-1 px-1 mt-10 mb-10"
        @click="$router.go(-1)"
        icon
        flat
    >
        <v-icon 
            color="red-ufba" 
            icon="mdi-arrow-left-thin-circle-outline"
            size="40"
        />
</v-btn>
</template>