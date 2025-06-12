<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p>by {{ post.User.username }}</p>


    <form @submit.prevent="handleCommentSubmit">
      <div>
        <ul>
          <li v-for="comment in post.Comments" :key="comment.id" :class="{ 'new-comment': comment.isNew }">
            {{ comment.content }} — {{ comment.User.username }}
          </li>
        </ul>

        <div>
          <h3>Comment On this post</h3>
          <input type="text" name="content" id="content" v-model="commentContent">
          <button type="submit">Submit</button>
        </div>

      </div>
    </form>

    <!-- <div v-if="!post.Comments.length">
      <p>No comments yet.</p>
    </div> -->


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
const commentContent = ref('');

import socket from '../socket';  // import socket จากไฟล์กลาง

const token = localStorage.getItem('token');


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


const handleCommentSubmit = async () => {
  try {
    await axios.post('/api/comment/createComment',
      {
        content: commentContent.value,
        postId: post.value.postId,
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    //post.value.Comments.push(res.data); // ดันคอมเมนต์ใหม่เข้า array
    commentContent.value = '';
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
}

  socket.on('newcomment', (newcomment) => {
    newcomment.isNew = true;
    if (post.value && post.value.Comments) {
      post.value.Comments.push(newcomment); // ดันเข้า array
    }
    setTimeout(() => {
      newcomment.isNew = false;
    }, 15000);
  });

</script>
