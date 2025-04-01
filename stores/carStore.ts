import { defineStore } from 'pinia';
import axios from 'axios';

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  description: string;
  sellerName?: string;
  sellerContact?: string;
  images?: string[];
  color?: string;
  features?: string[];
}

export interface Inquiry {
  carId: number;
  carTitle: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export const useCarStore = defineStore('cars', {
  state: () => ({
    cars: [] as Car[],
    loading: false,
    error: null as string | null,
    selectedCar: null as Car | null
  }),

  getters: {
    getCars: (state) => state.cars,
    getCarById: (state) => (id: number) => state.cars.find(car => car.id === id)
  },

  actions: {
    async fetchCars() {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await axios.get<Car[]>(`${config.public.apiBase}/cars`);
        this.cars = response.data;
        this.error = null;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error fetching cars:', error);
      } finally {
        this.loading = false;
      }
    },

    async addCar(newCar: Omit<Car, 'id'>) {
      this.loading = true;
      try {
        const config = useRuntimeConfig();
        const response = await axios.post(`${config.public.apiBase}/cars`, newCar);
        this.cars.push(response.data);
        this.error = null;
        return response.data;
      } catch (error: any) {
        this.error = error.message;
        console.error('Error adding car:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});