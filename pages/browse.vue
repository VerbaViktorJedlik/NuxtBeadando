<template>
  <q-page padding>
    <h1 class="text-h4 q-mb-lg">Browse Available Cars</h1>
    
    <!-- Simple Search & Filter -->
    <div class="row q-mb-md">
      <div class="col-12 col-md-6">
        <q-input v-model="search" label="Search cars..." outlined dense>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-negative">
      {{ error }}
    </div>
    
    <!-- Car Cards Grid -->
    <div v-else class="row q-col-gutter-md">
      <div v-for="car in filteredCars" :key="car.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="car-card">
          <q-img
            :src="car.image || 'https://placehold.co/600x400?text=Car+Image'"
            :ratio="16/9"
          />
          
          <q-card-section>
            <div class="text-h6">{{ car.make }} {{ car.model }}</div>
            <div class="text-subtitle2">{{ car.year }}</div>
            <div class="text-h5 text-primary q-mt-sm">${{ car.price.toLocaleString() }}</div>
          </q-card-section>
          
          <q-card-section>
            <div class="row items-center">
              <q-icon name="speed" size="sm" class="q-mr-xs" />
              <span class="q-mr-md">{{ car.mileage.toLocaleString() }} miles</span>
              
              <q-icon name="local_gas_station" size="sm" class="q-mr-xs" />
              <span>{{ car.fuelType }}</span>
            </div>
          </q-card-section>
          
          <q-separator />
          
          <q-card-actions>
            <q-btn flat color="primary" label="View Details" />
            <q-space />
            <q-btn flat round icon="favorite_border" />
          </q-card-actions>
        </q-card>
      </div>
      
      <!-- No Results Message -->
      <div v-if="filteredCars.length === 0" class="col-12 text-center q-pa-md">
        <q-icon name="search_off" size="3em" color="grey-7" />
        <div class="text-h6 q-mt-sm">No cars match your search</div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCarStore } from '~/stores/carStore';

const carStore = useCarStore();
const search = ref('');
const loading = ref(true);
const error = ref(null);

// Sample data for demonstration
// const cars = ref([
//   {
//     id: 1,
//     make: 'Toyota',
//     model: 'Camry',
//     year: 2019,
//     price: 15000,
//     mileage: 45000,
//     fuelType: 'Gasoline',
//     transmission: 'Automatic',
//     image: 'https://placehold.co/600x400?text=Toyota+Camry'
//   },
//   {
//     id: 2,
//     make: 'Honda',
//     model: 'Civic',
//     year: 2018,
//     price: 12500,
//     mileage: 55000,
//     fuelType: 'Gasoline',
//     transmission: 'Manual',
//     image: 'https://placehold.co/600x400?text=Honda+Civic'
//   },
//   {
//     id: 3,
//     make: 'Ford',
//     model: 'F-150',
//     year: 2020,
//     price: 25000,
//     mileage: 35000,
//     fuelType: 'Diesel',
//     transmission: 'Automatic',
//     image: 'https://placehold.co/600x400?text=Ford+F-150'
//   },
//   {
//     id: 4,
//     make: 'BMW',
//     model: '3 Series',
//     year: 2017,
//     price: 19500,
//     mileage: 62000,
//     fuelType: 'Gasoline',
//     transmission: 'Automatic',
//     image: 'https://placehold.co/600x400?text=BMW+3+Series'
//   }
// ]);

const filteredCars = computed(() => {
  if (!search.value) return cars.value;
  
  const searchTerm = search.value.toLowerCase();
  return cars.value.filter(car => 
    car.make.toLowerCase().includes(searchTerm) ||
    car.model.toLowerCase().includes(searchTerm) ||
    car.year.toString().includes(searchTerm) ||
    car.fuelType.toLowerCase().includes(searchTerm)
  );
});

onMounted(() => {
  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    // Uncomment below to use actual store data when ready
    carStore.fetchCars()
      .then(() => {
        loading.value = false;
      })
      .catch(err => {
        error.value = 'Failed to load cars';
        loading.value = false;
      });
  }, 500);
});
</script>

<style scoped>
.car-card {
  transition: transform 0.3s ease;
  height: 100%;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>