<template>

    <div class="flex items-center justify-between my-8">
        <h2 class="my-6 text-sm font-semibold text-gray-700 md:text-xl dark:text-gray-200">
            Todo lists
        </h2>

        <button @click="openModalAddProduct" class="flex items-center justify-between px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-green-500 border border-transparent rounded-lg active:bg-purple-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-purple">
            <svg class="w-4 h-4 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>เพิ่ม</span>
        </button>
    </div>

    <!-- ตารางแสดงสินค้า -->
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-sm font-bold tracking-wide text-left text-gray-800 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                        <th class="px-4 py-3">title</th>
                        <th class="px-4 py-3">description</th>
                        <!-- <th class="px-4 py-3">Created_By</th> -->
                        <th class="px-4 py-3">created_At</th>
                        <th class="px-4 py-3">updated_At</th>
                        <th class="px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    
                    <tr 
                        v-for="product in products" :key="product._id" 
                        class="text-gray-700 dark:text-gray-400 hover:bg-blue-100"
                    >
                        <td class="px-4 py-3 text-sm">{{ product.title }}</td>
                        <td class="px-4 py-3 text-sm">{{ product.description }}</td>
                        <!-- <td class="px-4 py-3 text-sm">{{ product.user_id }}</td> -->
                        <td class="px-4 py-3 text-sm">{{ format_date(product.createdAt) }}</td>
                        <td class="px-4 py-3 text-sm">{{ format_date(product.updatedAt) }}</td>
                        <td class="px-4 py-3 text-sm">
                            <button @click="openModalEditProduct(product._id)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-yellow-400 border border-transparent rounded-lg active:bg-purple-600 hover:bg-yellow-500 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            <button @click="onclickDelete(product._id)" class="px-4 py-2 mx-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple">
                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
            
        </div>
    </div>


    <!-- Popup สำหรับเพิ่มรายการสินค้าใหม่ -->
    <div v-if="showAddModal" id="addProductModal" class="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>
         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center justify-center w-full h-auto">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                    Add Todo
                </div>
                <div @click="closeAddModal" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mb-4">
                <form ref="addProductForm" @submit.prevent="onSubmit">
                    
                    <label class="block my-3 text-gray-700 text-md" for="title">Title</label>
                    <input v-model="title" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Title">
                    <div v-if="v$.title.$error" class="mt-2 text-sm font-bold text-red-500">
                        {{ v$.title.$errors[0].$message }}
                    </div>

                    <label class="block my-3 text-gray-700 text-md" for="description">Description</label>
                    <textarea
                        v-model="description"
                        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
                        rows="5"
                        placeholder="Description"
                    ></textarea>
                    <div v-if="v$.description.$error" class="mt-2 text-sm font-bold text-red-500">
                        {{ v$.description.$errors[0].$message }}
                    </div>
         
                    <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-2">
                            <button @click="submitForm" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-purple">
                                Add
                            </button>
                        </div>

                        <div>
                            <button @click="onResetForm" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-gray-500 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-purple">
                                Clear
                            </button>
                        </div>
                    </div>
                </form>
            </div>
         </div>
    </div>

    <!-- Popup สำหรับการแก้ไขสินค้า -->
    <div v-if="showEditModal" id="editProductModal" class="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full modal">
        <div class="absolute w-full h-full bg-gray-900 opacity-70 modal-overlay"></div>
         <div class="z-50 w-11/12 p-5 mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
            <!-- Header -->
            <div class="flex items-center justify-center w-full h-auto">
                <div class="flex items-start justify-start w-full h-auto py-2 text-xl font-bold">
                    Edit Todo
                </div>
                <div @click="closeEditModal" class="flex justify-center w-1/12 h-auto cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            <!--Header End-->
            </div>
            <!-- Modal Content-->
            <div class="w-full h-auto mb-4">
                <form ref="addProductForm" @submit.prevent="onSubmit">
                    
                    <label class="block my-3 text-gray-700 text-md" for="title">Title</label>
                    <input v-model="etitle" class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow" type="text" placeholder="Title">
                    <div v-if="v$.etitle.$error" class="mt-2 text-sm font-bold text-red-500">
                        {{ v$.etitle.$errors[0].$message }}
                    </div>

                    <label class="block my-3 text-gray-700 text-md" for="description">Description</label>
                    <textarea
                        v-model="edescription"
                        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow"
                        rows="5"
                        placeholder="Description"
                    ></textarea>
                    <div v-if="v$.edescription.$error" class="mt-2 text-sm font-bold text-red-500">
                        {{ v$.edescription.$errors[0].$message }}
                    </div>
         
                    <div class="grid grid-cols-3 gap-4">
                        <div class="col-span-3">
                            <button @click="submitFormEdit(this.eid)" class="w-full px-4 py-2 mt-4 font-medium leading-5 text-white transition-colors duration-150 bg-yellow-600 border border-transparent rounded-lg text-md active:bg-purple-600 hover:bg-yellow-700 focus:outline-none focus:shadow-outline-purple">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
         </div>
    </div>

</template>

<script>

import http from '@/services/BackendService'
import useValidate from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'
import moment from 'moment'

export default {

    data(){
        return {

            /** ตัวแปรสำหรับเรียกใช้งาน Validation */
            v$: useValidate(),

            /** ตัวแปรสำหรับเก็บข้อมูลสินค้าที่อ่านจาก API */
            products: [],

            /** ตัวแปรสำหรับเปิด/ปิด popup */
            showAddModal: false, // popup เพิ่มสินค้า
            showEditModal: false, // popup แก้ไขสินค้า

            /** ตัวแปรสำหรับผูกกับฟอร์มเพิ่มสินค้า */
            title: '',
            description: '',

            /** ตัวแปรสำหรับการแก้ไขข้อมูลสินค้า */
            eid: '',
            etitle: '',
            edescription: '',
        }
    },

    mounted(){
        // อ่านสินค้าจาก API
        this.getProducts()
        
    },

    methods:{

        /***********************************************************************
        * ส่วนของการอ่านข้อมูลจาก API และแสดงผลในตาราง
        ************************************************************************/

        // ฟังก์ชันสำหรับดึงรายการสินค้าจาก api ทั้งหมด
        async getProducts(){
            let response = await http.get(`todos`)
            let responseProduct = response.data
            this.products = responseProduct
        },

        /***********************************************************************
        * ส่วนของการเพิ่มสินค้าใหม่
        ************************************************************************/
       // สร้างฟังก์ชันสำหรับเปิด popup เพิ่มสินค้า
       openModalAddProduct(){
           this.showAddModal = true
       },

       // สร้างฟังก์ชันสำหรับปิด popup เพิ่มสินค้า
       closeAddModal(){
           this.showAddModal = false
           this.onResetForm()
       },

       // สร้างฟังก์ชันสำหรับเคลียร์ข้อมูลในฟอร์มเพิ่มสินค้า
       onResetForm(){
           // การเคลียร์ค่าทั้งหมดในฟอร์ม เราจะต้อง ref
           // ล้างข้อมูลในฟอร์ม
           this.$refs.addProductForm.reset()
           this.title = ''
           this.description = ''
       },

       // สร้างฟังก์ชันสำหรับ submit form สินค้า
       submitForm(){
           this.v$.$validate()
           if(!this.v$.title.$error && !this.v$.description.$error){
                // console.log(data)
                // ส่งค่าไปยัง Laravel API Product Add
                http.post('todos',{
                    title: this.title,
                    description: this.description
                }).then((response)=>{
                    console.log(response)

                    // เพิ่มเสร็จทำการเคลียร์ค่าในฟอร์ม
                    this.onResetForm()

                    // เมื่อเพิ่มสินค้าแล้วให้ดึงรายการล่าสุดมาแสดง
                    this.getProducts()

                    this.closeAddModal()

                    // เรียกใช้งาน popup ของ sweetalert 2
                    const Toast = this.$swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'เพิ่มข้อมูลใหม่เรียบร้อย'
                    })

                })
            
           }
       },


        /***********************************************************************
        * ส่วนของการแก้ไขข้อมูลสินค้า
        ************************************************************************/
        // สร้างฟังก์ชันสำหรับเปิด popup แก้ไขสินค้า
        openModalEditProduct(id){

            http.get(`todos/${id}`).then(response => {
                // console.log(response.data)

                this.eid = response.data._id
                this.etitle = response.data.title
                this.edescription = response.data.description
                this.showEditModal = true
            })
        },

        // สร้างฟังก์ชันสำหรับปิด popup แก้ไขสินค้า
       closeEditModal(){
         this.showEditModal = false
       },

       // สร้างฟังก์ขันสำหรับอัพเดทข้อมูล
       submitFormEdit(id){
           this.v$.$validate()
           if(!this.v$.etitle.$error && !this.v$.edescription.$error){

            http.put(`todos/${id}`,{
                title: this.etitle,
                description: this.edescription
            }).then(response => {

                console.log(response.data)

                this.getProducts()

                // เรียกใช้งาน popup ของ sweetalert2
                const Toast = this.$swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', this.$swal.stopTimer)
                        toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'อัพเดทข้อมูลเรียบร้อย'
                }).then(()=>{
                    this.showEditModal = false // ปิดหน้าต่าง popup modal แก้ไข
                })
                
            }).catch(error => {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            })

           }

       },

        /***********************************************************************
        * ส่วนของการลบสินค้า
        ************************************************************************/
       // สร้างฟังก์ชันสำหรับลบสินค้า
        onclickDelete(id){
            this.$swal.fire({
                title: 'ยืนยันการลบรายการนี้',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: `ยืนยัน`,
                cancelButtonText: `ปิดหน้าต่าง`,
            }).then((result) => {
                if (result.isConfirmed) {

                    http.delete(`todos/${id}`).then(() => {
                       this.$swal.fire('ลบรายการเรียบร้อย!', '', 'success') 

                        // เมื่อแก้ไขรายการเสร็จทำการ ดึงสินค้าล่าสุดมาแสดง
                        this.getProducts()

                    }).catch(error => {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    })
                }
            });
        },

       // สร้างฟังก์ชันสำหรับจัดรูปแบบวันที่ด้วย moment.js
       format_date(value){
           if(value){
               return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
           }
       },

       // สร้างฟังก์ชันแปลงยอดเงินให้เป็นรูปแบบสกุลเงิน (10,000.50)
       formatPrice(value){
           let val = (value/1).toFixed(2).replace(',', ',')
           return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
       },

    },

    validations() {
        return {

            title: { 
                required: helpers.withMessage('title is required', required),
            },
            description: { 
                required: helpers.withMessage('description is required', required),
            },

            etitle: { 
                required: helpers.withMessage('title is required', required),
            },
            edescription: { 
                required: helpers.withMessage('description is required', required),
            },
  
        }
    },
}
</script>


<style lang="css">
    .rotate-45 {
        --tw-rotate: 90deg !important
    }

    .-rotate-45 {
        --tw-rotate: -90deg !important
    }
</style>