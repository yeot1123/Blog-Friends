<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Login
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

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/auth/login', { username: username.value, password: password.value });
    localStorage.setItem('token', response.data.token);
    router.push('/'); // กลับไปหน้า Home
  } catch (error) {
    if (error.status === 401) {
      alert('Invalid username or password, IF You Dont Have an account please Signup First');
    }
    console.error('Login failed:', error);
  }
};
</script>
