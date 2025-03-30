<!-- filepath: d:\suli\progi\vue.js\Beadandó\components\layout\navbar.vue -->
<template>
    <q-layout>
      <q-header elevated class="bg-secondary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <h1 class="q-mt-none q-mb-none">Used Cars</h1>
          </q-toolbar-title>
          <q-btn outline icon="home" label="Home" to="/" class="text-white" />
          <q-btn outline icon="directions_car" label="Browse Cars" to="/browse" class="text-white" />
          <q-btn outline icon="sell" label="Sell Your Car" to="/sell" class="text-white" />
          <q-btn outline icon="contact_mail" label="Contact Us" to="/contact" class="text-white" />
          <q-space /> <!-- Pushes the Login button to the right -->
          <q-btn color="primary" icon="login" label="Login" to="/login" class="text-white" />
        </q-toolbar>
      </q-header>
    </q-layout>
  </template>
  
  <script>
  export default {
    name: "Navbar",
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 28pt;
    margin: 0;
  }

  </style>