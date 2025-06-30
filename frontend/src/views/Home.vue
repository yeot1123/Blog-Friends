<template>
  <div class="max-w-6xl mx-auto p-4">
    <!-- Navbar -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-blue-800">Blog-Friends</h1>
      <div class="flex gap-3">
        <router-link
          to="/login"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Login
        </router-link>
        <router-link
          to="/register"
          class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Register
        </router-link>
      </div>
    </div>

    <!-- Main Section -->
    <h2 class="text-3xl font-bold text-center p-8">Welcome to Blog-Friends</h2>

    <div class="flex justify-center mb-10">
      <router-link
        to="/postCreate"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create Blog Post
      </router-link>
    </div>

    <div v-if="loading">
      <p class="text-center text-gray-500">Loading...</p>
    </div>

    <ul v-else-if="posts" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <li
        v-for="post in posts"
        :key="post.postId"
        class="border p-4 rounded shadow hover:shadow-md bg-white transition"
      >

        <div class="flex items-center gap-3 mb-3">
          <img
            v-if="post.User?.imageUrl"
            :src="post.User.imageUrl"
            alt="Profile"
            class="w-10 h-10 rounded-full object-cover border"
          />
          <span class="text-sm font-medium text-gray-700">
            {{ post.User?.username || 'Unknown' }}
          </span>
        </div>


        <router-link
          :to="`/posts/${post.postId}`"
          class="text-lg font-bold text-blue-700 hover:underline block mb-2"
        >
          <img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            class="w-full h-48 object-cover rounded mb-3"
          />
          {{ post.title }}
        </router-link>

        <p class="text-gray-600 text-sm">
          {{ post.content?.slice(0, 100) }}...
        </p>
      </li>
    </ul>
    <div v-else>
      <p class="text-center text-gray-500"> Post Not Found</p>
    </div>
</div>

</template>



<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import socket from "../socket"; // import socket จากไฟล์กลาง

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get("/api/posts");
    posts.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch posts";
  } finally {
    loading.value = false;
  }
});

// Listen for new posts
socket.on("newPost", (newPost) => {
  newPost.isNew = true;
  posts.value.unshift(newPost);

  setTimeout(() => {
    newPost.isNew = false;
  }, 15000);
});
</script>
