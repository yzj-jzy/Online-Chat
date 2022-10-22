import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './router'
import ElementUI from 'element-ui'; // 2.1引入结构
import 'element-ui/lib/theme-chalk/index.css'; // 2.2引入样式
import vClickOutside from "click-outside-vue3"

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ElementUI); // 3.安装
Vue.use(vClickOutside);
// Vuex
import store from './store'

// Lottie

import lottie from "lottie-web";
Vue.prototype.$lottie = lottie;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9nEhmStfxkKnxfy2y3hZJERwbW8Xdkj4",
  authDomain: "chatroom-backend-d28fe.firebaseapp.com",
  projectId: "chatroom-backend-d28fe",
  storageBucket: "chatroom-backend-d28fe.appspot.com",
  messagingSenderId: "542767840409",
  appId: "1:542767840409:web:c9823627014878717acc08",
  measurementId: "G-T61WBNTKPN",
  databaseURL: "https://chatroom-backend-d28fe-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
