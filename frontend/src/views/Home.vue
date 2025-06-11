<template>
  <div>
    <h1>All Posts</h1>

    <router-link to="/login">Login Page</router-link>
    <br>
    <router-link to="/register">Register Page</router-link>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <!-- ลิงก์ไปที่ PostDetail -->
        <router-link :to="`/posts/${post.postId}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import socket from '../socket';  // import socket จากไฟล์กลาง

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('/api/posts');
    posts.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch posts';
  } finally {
    loading.value = false;
  }
});

// Listen for new posts
socket.on('newPost', (newPost) => {
  posts.value.push(newPost);
});
</script>
