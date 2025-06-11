<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>by {{ post.User.username }}</p>

    <div v-if="post.Comments.length">
      <h3>Comments</h3>
      <ul>
        <li v-for="comment in post.Comments" :key="comment.id">
          {{ comment.content }} — {{ comment.User.username }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No comments yet.</p>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = route.params.postId;

const post = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/posts/${postId}`);
    post.value = response.data;
  } catch (err) {
    console.error(err);
    error.value = 'Failed to fetch post detail';
  } finally {
    loading.value = false;
  }
});
</script>
