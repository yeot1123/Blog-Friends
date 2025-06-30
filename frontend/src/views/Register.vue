<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label class="block mb-2 text-sm font-medium text-text-black dark:text-white">Upload Photo</label>
        <input @change="handleImageChange" class="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file">

        <button
          type="submit"
          class="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();
const image = ref(null);

const handleImageChange = (e) => {
  image.value = e.target.files[0];
};


const handleRegister = async () => {
  try {
    const formData = new FormData();

    formData.append('username', username.value);
    formData.append('password', password.value);

    if (image.value){
      formData.append('image', image.value);
    }

    await axios.post('/api/auth/register', formData);
    router.push('/login'); // ไปหน้า Login
  } catch (error) {
    console.error('Register failed:', error);
    alert(error);
  }
};
</script>
