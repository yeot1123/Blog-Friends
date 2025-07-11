<template>
  <div class="max-w-2xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
    <div v-if="post">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        {{ post.title }}
      </h2>

      <!-- โปรไฟล์ผู้เขียน -->
      <div class="flex items-center gap-3 mb-3">
        <img
          v-if="post.User?.imageUrl"
          :src="post.User.imageUrl"
          alt="Profile"
          class="w-10 h-10 rounded-full object-cover border"
        />
        <span class="text-sm font-medium text-gray-700">
          Post By {{ post.User?.username || 'Unknown' }}
        </span>
      </div>

      <p class="text-gray-700 mb-4 whitespace-pre-line break-words">{{ post.content }}</p>

      <!-- รูปประกอบโพสต์ -->
      <img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        alt="Post image"
        class="w-auto max-auto object-cover rounded mb-4"
      />

      <!-- คอมเมนต์ -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-3">💬 Comments</h3>
        <ul class="space-y-3">
          <li
            v-for="comment in post.Comments"
            :key="comment.id"
            :class="[
              'p-3 border rounded',
              comment.isNew ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-50 border-gray-200'
            ]"
          >
            <p class="text-gray-800 break-words">{{ comment.content }}</p>
            <p class="text-sm text-gray-500 mt-1">— {{ comment.User.username }}</p>
          </li>
        </ul>
      </div>

      <!-- ฟอร์มคอมเมนต์ -->
      <form @submit.prevent="handleCommentSubmit" class="space-y-4">
        <h3 class="text-lg font-medium">Add a Comment</h3>
        <input
          type="text"
          v-model="commentContent"
          placeholder="Write your comment..."
          class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          :disabled="isSubmitting"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? 'Submitting...' : '💌 Submit' }}
        </button>
      </form>
    </div>

    <div v-else>
      <p class="text-center text-gray-500">Loading...</p>
    </div>
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
const isSubmitting = ref(false);
import socket from '../socket';  // import socket จากไฟล์กลาง

const token = localStorage.getItem('token');


onMounted(async () => {
  try {
    const response = await axios.get(`/api/posts/${postId}`);
    post.value = response.data;

    // ลบสถานะ highlight ของ postId นี้
    const storedIds = JSON.parse(localStorage.getItem("newCommentPosts") || "[]");
    const updated = storedIds.filter(id => id !== Number(postId));
    localStorage.setItem("newCommentPosts", JSON.stringify(updated));
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch post detail";
  } finally {
    loading.value = false;
  }
});



const handleCommentSubmit = async () => {
  if (isSubmitting.value || !commentContent.value.trim()) return;

  isSubmitting.value = true;

  try {
    await axios.post(
      '/api/comment/createComment',
      {
        content: commentContent.value,
        postId: post.value.postId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    commentContent.value = '';
  } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.error || 'Unexpected error';

        if (status === 401) {
          alert('กรุณาเข้าสู่ระบบก่อนแสดงความคิดเห็น');
          router.push('/login');
        } else if (status === 400) {
          alert('⚠️ กรุณากรอกข้อความคอมเมนต์');
        } else {
          alert(`❌ เกิดข้อผิดพลาด: ${message}`);
        }
      } else {
        console.error('❌ Unknown error:', error);
        alert('เกิดข้อผิดพลาดที่ไม่รู้จัก');
      }
  } finally {
      isSubmitting.value = false;
  }
};

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
