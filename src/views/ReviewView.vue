<template>
  <h1>複習</h1>
  <div>
    <input type="text" v-model="newName" /> {{ newName }}
    <input type="number" v-model="newNumber" /> {{ newNumber }}
    <button type="button" @click="addProduct">新增到資料集裡面</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>標題</th>
        <th>價格</th>
        <th>調整價格</th>
        <th>刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td><input type="number" v-model="item.price" /></td>
        <td><button type="button" @click="delItem(item.id)">刪除品項</button></td>
      </tr>
    </tbody>
  </table>
  <h2>總價 : {{ sum }}</h2>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const newName = ref('')
const newNumber = ref(0)

const data = ref([])

const addProduct = () => {
  console.log('addProduct')
  data.value.push({
    id: new Date().getTime(),
    name: newName.value,
    price: newNumber.value,
  })
  newName.value = ''
  newNumber.value = 0
}
const delItem = (id) => {
  console.log('delItem', id)
  const index = data.value.findIndex((item) => item.id === id)
  data.value.splice(index, 1)
}
const sum = computed(() => {
  console.log('sum', data.value)
  let tempSum = 0
  data.value.forEach((item) => {
    tempSum += item.price
  })
  return tempSum
})

onMounted(() => {
  setTimeout(() => {
    data.value = [
      {
        id: 1,
        name: '珍珠奶茶',
        content: '香濃奶茶搭配QQ珍珠',
        price: 50,
        stock: 20,
      },
      {
        id: 2,
        name: '冬瓜檸檬',
        content: '清新冬瓜配上新鮮檸檬',
        price: 45,
        stock: 15,
      },
      {
        id: 3,
        name: '翡翠檸檬',
        content: '綠茶與檸檬的完美結合',
        price: 55,
        stock: 30,
      },
      {
        id: 4,
        name: '四季春茶',
        content: '香醇四季春茶，回甘無比',
        price: 45,
        stock: 10,
      },
      {
        id: 5,
        name: '阿薩姆奶茶',
        content: '阿薩姆紅茶搭配香醇鮮奶',
        price: 50,
        stock: 25,
      },
      {
        id: 6,
        name: '檸檬冰茶',
        content: '檸檬與冰茶的清新組合',
        price: 45,
        stock: 20,
      },
      {
        id: 7,
        name: '芒果綠茶',
        content: '芒果與綠茶的獨特風味',
        price: 55,
        stock: 18,
      },
      {
        id: 8,
        name: '抹茶拿鐵',
        content: '抹茶與鮮奶的絕配',
        price: 60,
        stock: 20,
      },
    ]
  }, 5000)
})
// AJAX 請求

async function getData() {
  console.log('getData')
  const response = await axios.get('https://randomuser.me/api')
  console.log(response)
}
getData()
</script>

<style></style>
