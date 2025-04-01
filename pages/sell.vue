<template>
  <q-page padding>
    <h1 class="text-h4 q-mb-lg">Sell Your Car</h1>
    
    <q-card class="sell-form q-pa-md">
      <q-card-section>
        <p class="text-subtitle1">Please fill out the details about your car</p>
      </q-card-section>
      
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <!-- Basic Car Information -->
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4">
              <q-input 
                v-model="form.make" 
                label="Make *" 
                :rules="[val => !!val || 'Make is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input 
                v-model="form.model" 
                label="Model *" 
                :rules="[val => !!val || 'Model is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input 
                v-model.number="form.year" 
                type="number" 
                label="Year *" 
                :rules="[
                  val => !!val || 'Year is required',
                  val => val >= 1900 && val <= new Date().getFullYear() || 'Invalid year'
                ]"
                outlined
              />
            </div>
          </div>
        </q-card-section>
        
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input 
                v-model.number="form.price" 
                type="number" 
                label="Price ($) *" 
                :rules="[
                  val => !!val || 'Price is required',
                  val => val > 0 || 'Price must be greater than 0'
                ]"
                outlined
              >
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-md-6">
              <q-input 
                v-model.number="form.mileage" 
                type="number" 
                label="Mileage *" 
                :rules="[
                  val => !!val || 'Mileage is required',
                  val => val >= 0 || 'Mileage cannot be negative'
                ]"
                outlined
              >
                <template v-slot:append>
                  <div class="text-grey-7">miles</div>
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select 
                v-model="form.fuelType" 
                :options="fuelTypes" 
                label="Fuel Type *" 
                :rules="[val => !!val || 'Fuel type is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-select 
                v-model="form.transmission" 
                :options="transmissionTypes" 
                label="Transmission *" 
                :rules="[val => !!val || 'Transmission is required']"
                outlined
              />
            </div>
          </div>
        </q-card-section>
        
        <q-card-section>
          <q-input 
            v-model="form.description" 
            type="textarea" 
            label="Description *" 
            :rules="[val => !!val || 'Description is required']"
            outlined
            autogrow
          />
        </q-card-section>
        
        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input 
                v-model="form.sellerName" 
                label="Your Name *" 
                :rules="[val => !!val || 'Name is required']"
                outlined
              />
            </div>
            <div class="col-12 col-md-6">
              <q-input 
                v-model="form.sellerContact" 
                label="Contact Email/Phone *" 
                :rules="[val => !!val || 'Contact information is required']"
                outlined
              />
            </div>
          </div>
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn label="Reset" type="reset" flat color="primary" @click="resetForm" />
          <q-btn label="Submit" type="submit" color="primary" :loading="submitting" />
        </q-card-actions>
      </q-form>
    </q-card>
    
    <!-- Success Dialog -->
    <q-dialog v-model="showSuccess">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="check_circle" color="positive" text-color="white" />
          <span class="q-ml-sm">Your car has been listed successfully!</span>
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup @click="resetForm" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useCarStore } from '~/stores/carStore';

const carStore = useCarStore();
const submitting = ref(false);
const showSuccess = ref(false);

const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
const transmissionTypes = ['Automatic', 'Manual'];

const form = ref({
  make: '',
  model: '',
  year: new Date().getFullYear(),
  price: null,
  mileage: null,
  fuelType: '',
  transmission: '',
  description: '',
  sellerName: '',
  sellerContact: '',
  images: []
});

function resetForm() {
  form.value = {
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: null,
    mileage: null,
    fuelType: '',
    transmission: '',
    description: '',
    sellerName: '',
    sellerContact: '',
    images: []
  };
}

function onSubmit() {
  submitting.value = true;
  
  setTimeout(() => {
    submitting.value = false;
    showSuccess.value = true;
    
    carStore.addCar(form.value)
      .then(() => {
        submitting.value = false;
        showSuccess.value = true;
      })
      .catch(err => {
        submitting.value = false;
      });
  }, 1000);
}
</script>

<style scoped>
.sell-form {
  max-width: 1000px;
  margin: 0 auto;
}
</style>