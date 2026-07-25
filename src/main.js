import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// // Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Global CSS
// import './assets/css/style.css'
import "@/assets/css/responsive.css";
import './assets/css/recharge.css'
import 'sweetalert2/dist/sweetalert2.min.css';

// Create Vue App
const app = createApp(App)

// Use Vue Router
app.use(router)

// Mount App
app.mount('#app')