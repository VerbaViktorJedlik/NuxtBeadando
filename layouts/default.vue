<script setup lang="ts">
import Navbar from '@/components/layout/navbar.vue'
</script>
<template>
   <q-layout view="hHh lpR fFf">
        <Navbar />
        <q-page-container>
            <slot></slot>
        </q-page-container>
    </q-layout>
</template>
<style>
</style>