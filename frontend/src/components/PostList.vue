<template>
  <div>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <strong>{{ post.title }}</strong>: {{ post.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostList',
  data() {
    return {
      posts: []
    };
  },
  created() {
    axios.get('http://localhost:3000/api/posts')
      .then(res => {
        this.posts = res.data;
      });
  }
};
</script>
