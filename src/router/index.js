import { createRouter, createWebHistory } from 'vue-router'

// Import Layouts
// import FrontendLayout from '@/layouts/Frontend.vue'
import BackendLayout from '@/layouts/Backend.vue'
import DefaultLayout from '@/layouts/Default.vue'

// Import Views
// Frontend
import Register from '@/views/frontend/Register.vue'
import Login from '@/views/frontend/Login.vue'
import ForgotPassword from '@/views/frontend/ForgotPassword.vue'
import NotFound404 from '@/views/frontend/NotFound404.vue'

// Backend
import Todo from '@/views/backend/Todo.vue'
import Bonus from '@/views/backend/Bonus.vue'

// ทดสอบสร้างตัวแปรไว้เช็คว่า login หรือยัง
// let state = false

// สร้างฟังก์ชันสำหรับเช็ค route ก่อนเรียกใช้งาน (Route Auth Guard)
function authGuard(to, from, next){
  
  let isAuthenticated = false

  if(localStorage.getItem('user')){
    isAuthenticated = true // ถ้ามีข้อมูล localStorage อยู่
  }else{
    isAuthenticated = false // ถ้าไม่มี localStorage
  }

  if(isAuthenticated){
    next() // อนุญาติให้เข้าสู่ route และโหลด component ที่ต้องการได้
  }else{
    next({name: 'Home'})
  }

}

const routes = [

  /** Frontend Route */
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Login
      }
    ],
    meta: {
      title: 'หน้าหลัก',
      description: 'หน้าหลักระบบคงคลังสินค้า'
    }
  },
  {
    path: '/register',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Register',
        component: Register
      }
    ],
    meta: {
      title: 'สมัครสมาชิกใหม่',
      description: 'รายละเอียดสมัครสมาชิกใหม่'
    }
  },
  {
    path: '/forgotpassword',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'ForgotPassword',
        component: ForgotPassword
      }
    ],
    meta: {
      title: 'ลืมรหัสผ่าน',
      description: 'รายละเอียดหน้าลืมรหัสผ่าน'
    }
  },

  // Error 404 
  {
    path: "/:catchAll(.*)",
    component: NotFound404,
    meta: {
      title: '404 ไม่พบหน้านี้',
      description: 'รายละเอียดหน้า 404'
    }
  },

  /** Backend Route */
  {
    path: '/backend',
    component: BackendLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Todo,
        beforeEnter: authGuard
      }
    ],
    meta:{
      title: 'Dashboard'
    }
  },
  {
    path: '/backend',
    // name: 'Bonus',
    component: BackendLayout,
    children: [
      {
        path: 'Bonus',
        name: 'Bonus',
        component: Bonus,
        beforeEnter: authGuard
      }
    ],
    meta:{
      title: 'Bonus'
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
