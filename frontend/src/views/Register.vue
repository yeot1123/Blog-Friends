<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();



const handleRegister = async () => {
  try {
    await axios.post('/api/auth/register', { username: username.value, password: password.value });
    router.push('/login'); // ไปหน้า Login
  } catch (error) {
    console.error('Register failed:', error);
  }
};
</script>
