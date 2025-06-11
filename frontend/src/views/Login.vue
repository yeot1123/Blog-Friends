<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input type="username" v-model="username" placeholder="Username" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Login</button>
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

const handleLogin = async () => {
  try {
    const response = await axios.post('/api/auth/login', { username: username.value, password: password.value });
    // สมมติว่า response.data.token
    localStorage.setItem('token', response.data.token);
    router.push('/'); // กลับไปหน้า Home
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>
