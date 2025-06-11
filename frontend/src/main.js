
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

import './assets/css/tailwind.css'; // ลองเปลี่ยนเป็นแบบนี้


axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;  // backend Express
const app = createApp(App);
app.use(router);
app.mount('#app');
