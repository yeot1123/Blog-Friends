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

    <!-- Loading -->
    <div v-if="loading">
      <p class="text-center text-gray-500">Loading...</p>
    </div>

    <!-- Post List -->
    <ul
      v-else-if="posts"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <li
        v-for="post in posts"
        :key="post.postId"
        :class="[
          'border p-4 rounded shadow hover:shadow-md transition',
          post.hasNewComment ? 'border-yellow-400 bg-yellow-50' : 'bg-white'
        ]"
      >
        <!-- User Info -->
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

        <!-- Post Title -->
        <router-link
          :to="`/posts/${post.postId}`"
          class="text-lg font-bold text-blue-700 hover:underline block"
        >
          <img
            v-if="post.imageUrl"
            :src="post.imageUrl"
            class="w-full h-40 object-cover rounded mb-3"
          />
          <div class="flex items-center gap-2">
            <span>{{ post.title }}</span>
            <span
              v-if="post.hasNewComment"
              class="text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full font-semibold animate-pulse"
            >
              💬 New comment
            </span>
          </div>
        </router-link>

        <!-- Snippet -->
        <p class="text-gray-600 text-sm mt-2">
          {{ post.content?.slice(0, 100) }}...
        </p>
      </li>
    </ul>

    <!-- No Post -->
    <div v-else>
      <p class="text-center text-gray-500">Post Not Found</p>
    </div>
  </div>
</template>




<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import socket from "../socket"; // socket.io client

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// postId ที่มี comment ใหม่จาก localStorage
const getNewCommentPostIds = () => {
  return JSON.parse(localStorage.getItem("newCommentPosts") || "[]");
};

// เพิ่ม postId ที่มี comment ใหม่ลง localStorage
const addNewCommentPostId = (postId) => {
  const ids = getNewCommentPostIds();
  if (!ids.includes(postId)) {
    ids.push(postId);
    localStorage.setItem("newCommentPosts", JSON.stringify(ids));
  }
};

// ลบ postId ออกจาก localStorage เมื่อ user เปิดอ่านแล้ว
// const removeNewCommentPostId = (postId) => {
//   const ids = getNewCommentPostIds();
//   const updated = ids.filter((id) => id !== postId);
//   localStorage.setItem("newCommentPosts", JSON.stringify(updated));
// };

onMounted(async () => {
  try {
    const response = await axios.get("/api/posts");
    const storedHighlightIds = getNewCommentPostIds();

    posts.value = response.data.map((post) => ({
      ...post,
      hasNewComment: storedHighlightIds.includes(post.postId),
    }));
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch posts";
  } finally {
    loading.value = false;
  }
});

// รับ comment ใหม่แบบ realtime แล้ว mark postId
socket.on("newcomment", (comment) => {
  const post = posts.value.find((p) => p.postId === comment.postId);
  if (post) {
    post.hasNewComment = true;
    addNewCommentPostId(comment.postId); // บันทึกไว้ใน localStorage

    // highlight ชั่วคราว 15 วินาที (UI)
    setTimeout(() => {
      post.hasNewComment = false;
    }, 15000);
  }
});
</script>
