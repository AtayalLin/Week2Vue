<template>
  <div id="app" class="bg-light min-vh-100 p-4">
    <div class="container py-5">
      <h2 class="text-center text-primary mb-5 fw-bold">飲料訂單管理系統</h2>
      <div class="row g-4">
        <div class="col-lg-7">
          <MenuPage :products="drinks" @add-to-cart="addToCart" />
        </div>

        <div class="col-lg-5">
          <CartPage
            :cartItems="cart"
            @removeFromCart="removeFromCart"
            @updateQuantity="updateQuantity"
            @submitOrder="submitOrder"
          />
          <OrderPage v-if="order" :order="order" class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import MenuPage from '../components/Menu.vue'
import CartPage from '../components/Cart.vue'
import OrderPage from '../components/Order.vue'

// 商品資料 (與原版相同)
const drinks = ref([
  { id: 1, name: '珍珠奶茶', description: '香濃奶茶搭配QQ珍珠', price: 50 },
  { id: 2, name: '冬瓜檸檬', description: '清新冬瓜配上新鮮檸檬', price: 45 },
  { id: 3, name: '翡翠檸檬', description: '綠茶與檸檬的完美結合', price: 55 },
  { id: 4, name: '四季春茶', description: '香醇四季春茶，回甘無比', price: 45 },
  { id: 5, name: '阿薩姆奶茶', description: '阿薩姆紅茶搭配香醇鮮奶', price: 50 },
  { id: 6, name: '檸檬冰茶', description: '檸檬與冰茶的清新組合', price: 45 },
  { id: 7, name: '芒果綠茶', description: '芒果與綠茶的獨特風味', price: 55 },
  { id: 8, name: '抹茶拿鐵', description: '抹茶與鮮奶的絕配', price: 60 },
])

// 購物車資料
const cart = ref([])
const order = ref(null)

// 加入購物車
const addToCart = (drink) => {
  const target = cart.value.find((item) => item.id === drink.id)
  if (target) {
    target.quantity++
  } else {
    cart.value.push({ ...drink, quantity: 1 })
  }
}

// 刪除購物車項目
const removeFromCart = (id) => {
  cart.value = cart.value.filter((item) => item.id !== id)
}

// 更新數量
const updateQuantity = ({ id, quantity }) => {
  const target = cart.value.find((item) => item.id === id)
  if (target) target.quantity = quantity
}

// 提交訂單
const submitOrder = ({ notes }) => {
  order.value = {
    drinks: cart.value,
    remark: notes,
    sum: cart.value.reduce((total, item) => total + item.price * item.quantity, 0),
  }
  cart.value = [] // 清空購物車
}
</script>

<style>
/* 自定義 CSS */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');

#app {
  font-family: 'Noto Sans TC', sans-serif;
  color: #333;
}
.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.rounded-pill {
  border-radius: 50px !important;
}
</style>
