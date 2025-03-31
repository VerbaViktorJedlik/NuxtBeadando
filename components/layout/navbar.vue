<template>
      <q-header elevated class="bg-secondary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <h1 class="q-mt-none q-mb-none">Used Cars</h1>
          </q-toolbar-title>
          <div class="q-pa-md q-gutter-sm">
          <q-btn outline icon="home" label="Home" to="/" class="text-white" />
          <q-btn outline icon="directions_car" label="Browse Cars" to="/browse" class="text-white" />
          <q-btn outline icon="sell" label="Sell Your Car" to="/sell" class="text-white" />
        </div>
        </q-toolbar>
      </q-header>
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