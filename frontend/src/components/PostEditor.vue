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
      <input type="file" @change="handleImageChange" />


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
const image = ref(null);
const token = localStorage.getItem('token');

// จัดเก็บไฟล์ภาพไว้ในตัวแปร
const handleImageChange = (e) => {
  image.value = e.target.files[0];
};

const submitPost = async () => {
  try {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', content.value);
    if (image.value) {
      formData.append('image', image.value);
    }

    const response = await axios.post(
      '/api/posts/createPost',  // ต้องให้ backend รองรับ multipart/form-data
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.status === 201) {
      alert('Post added successfully!');
      router.push('/');
    }

    title.value = '';
    content.value = '';
    image.value = null;
  } catch (error) {
    console.error('Create post error:', error);
    if (error?.response?.status === 401) {
      alert('Please Login Before Create Post !!');
      router.push('/login');
    } else {
      alert('Failed to create post.');
    }
  }
};
</script>
