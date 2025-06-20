<template>
  <div class="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">📝 Create New Post</h2>
    <form @submit.prevent="submitPost" class="space-y-4">
      <input
        v-model="title"
        type="text"
        placeholder="Post Title"
        required
        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        v-model="content"
        placeholder="Write your content..."
        required
        rows="6"
        class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        ➕ Add Post
      </button>
    </form>
  </div>
</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


const title = ref('');
const content = ref('');
const token = localStorage.getItem('token');

const submitPost = async () => {
  try {
    const response = await axios.post(
      '/api/posts/createPost',
      { title: title.value, content: content.value},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (response.status === 201) {
      alert('Post added successfully!');
      router.push('/');
    }

    title.value = '';
    content.value = '';
  } catch (error) {
    if (error.status === 401){
      alert('Please Login Before Create Post !!')
      router.push('/login')
    }
  }
};
</script>
