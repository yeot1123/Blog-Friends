<template>
  <div>
    <h2>New Post</h2>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="Title" required />
      <textarea v-model="content" placeholder="Content" required></textarea>
      <button type="submit">Add Post</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';


const title = ref('');
const content = ref('');
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

const submitPost = async () => {
  try {
    const response = await axios.post(
      '/api/posts/createPost',
      { title: title.value, content: content.value, userId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (response.status === 201) {
      alert('Post added successfully!');
    }

    title.value = '';
    content.value = '';
  } catch (error) {
    alert(error.message);
  }
};
</script>
