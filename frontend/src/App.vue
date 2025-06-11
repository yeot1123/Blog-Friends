<template>
  <div id="app">
    <h1>Blog Friends</h1>

    <!-- PostEditor อยู่ด้านบน -->
    <PostEditor />

    <!-- router-view แสดงคอนเทนต์ตาม route -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import PostEditor from './components/PostEditor.vue';
</script>
