<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-center">Welcome to Blog-Friends</h1>
    <div class="flex justify-center gap-4 mb-6">
      <router-link
        to="/postCreate"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create Blog Post
      </router-link>
      <router-link
        to="/login"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Login Page
      </router-link>
      <router-link
        to="/register"
        class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Register Page
      </router-link>
    </div>

    <figure>

    </figure>


    <ul class="space-y-2">
      <li
        v-for="post in posts"
        :key="post.postId"
        :class="[                       // v-bind
          'border p-4 rounded transition',
          post.isNew ? 'bg-yellow-100 animate-pulse' : 'hover:bg-gray-100'
        ]"
      >
        <router-link
          :to="`/posts/${post.postId}`"
          class="text-lg font-semibold text-blue-700 hover:underline"
        >
          {{ post.title }}
        </router-link>
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
  newPost.isNew = true;
  posts.value.unshift(newPost);

  setTimeout(() => {
    newPost.isNew = false;
  }, 15000);
});

</script>
