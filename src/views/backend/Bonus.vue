<template>
    <h2 class="mt-6 mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Bonus
    </h2>
    <p class="mb-6 text-xl text-gray-500">
        <b>โจทย์</b>: กำหนดข้อมูล 2 ชุด เป็น array of number จงคิดวิธีการในการ filter array ชุดแรก ให้เหลือเพียงแค่สมาชิกที่มีใน array ที่ชุดสอง
    </p>


    <b class="mb-3 text-xl text-gray-600"> วิธีทำ </b>
    <p class="mb-2 text-xl text-gray-600">
        1. ใช้ loop ซ้อน loop แล้วเลือกเฉพาะ ข้อมูลที่ arrOne มีเหมือนกับ arrTwo แล้ว push ใส่ array อีกตัวหนึ่งไว้
    </p>
    <p class="mb-6 text-xl text-gray-600">
        2. จากนั้นนำ array ที่ได้จากข้อ 1 มา filter โดยไม่เอาตัวซ้ำ 
    </p>

    
    <!-- Cards -->
    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">

        <!-- Card -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Array 1</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{arrOne}}</p>
            </div>
        </div>

        <!-- Card -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Array 2</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{arrTwo}}</p>
            </div>
        </div>

        <!-- Card -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"></path>
                </svg>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Filter Array 1</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{result}}</p>
            </div>
        </div>

        <!-- Card -->
        <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
            <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"></path>
                </svg>
            </div>
            <div>
                <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Filter Array 1 (Unique)</p>
                <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">{{resultUnique}}</p>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            arrOne: [1, 2, 3, 3, 3, 3, 4, 5, 6, 7, 8, 9, 10],
            arrTwo: [1, 1, 1, 3, 5, 5, 7, 9, 11, 13, 15, 17, 19],
            result: [],
            resultUnique: []
        }
    },
    mounted() {
        this.filter(this.arrOne, this.arrTwo)
        
    },
    methods: {
        filter(arrOne, arrTwo){
            // 1. ใช้ loop ซ้อน loop แล้วเลือกเฉพาะ ข้อมูลที่ arrOne มีเหมือนกับ arrTwo แล้ว push ใส่ array อีกตัวหนึ่งไว้
            // 2. จากนั้นนำ array ที่ได้จากข้อ 1 มา filter โดยไม่เอาตัวซ้ำ 

            for (let i = 0; i < arrOne.length; i++) {
                for (let j = 0; j < arrTwo.length; j++) {
                    if(arrOne[i] === arrTwo[j]){
                        this.result.push(arrOne[i])
                    }
                }
            }
            this.uniqueArray(this.result)
        },
        uniqueArray( arr ) {
            let a = [];
            for (let i=0, l=arr.length; i<l; i++) {
                if (a.indexOf(arr[i]) === -1 && arr[i] !== ''){
                    a.push(arr[i]);
                }
            }
            this.resultUnique = a
        }
    },
}
</script>