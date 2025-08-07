<template>
  <div class="container" data-aos="fade-up">
    <h1>待辦</h1>
    <h2>註冊功能</h2>
    <input type="email" placeholder="email" v-model="signupField.email" />
    <input type="text" placeholder="密碼" v-model="signupField.password" />
    <input type="text" placeholder="名稱" v-model="signupField.nickname" />
    <br />
    {{ signupField }}
    <br />
    <button type="button" @click="signup">註冊</button>
    {{ signupRes }}

    <h2>登入功能</h2>
    <input type="email" placeholder="email" v-model="signInField.email" />
    <input type="text" placeholder="密碼" v-model="signInField.password" />
    <br />
    {{ signInField }}
    <br />
    <button type="button" @click="signIn">登入</button>
    <div v-if="signinRes" class="token-box">
      <strong>目前 Token：</strong>
      <p>{{ signinRes }}</p>
    </div>

    <h2>驗證</h2>
    <div v-if="user.uid">
      <p>UID:{{ user.uid }}</p>
      <p>NickName:{{ user.nickname }}</p>
    </div>
    <div v-else>尚未登入</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const api = 'https://todolist-api.hexschool.io/'
const signupField = ref({
  email: '',
  password: '',
  nickname: '',
})
const signupRes = ref('')
const signup = async () => {
  try {
    const res = await axios.post(`${api}users/sign_up`, signupField.value)
    console.log(res)
    signupRes.value = res.data.uid
  } catch (error) {
    console.log('錯誤!')
    console.log(error)
  }
}

const signInField = ref({
  email: '',
  password: '',
})
const signinRes = ref('')
const signIn = async () => {
  try {
    const res = await axios.post(`${api}users/sign_in`, signInField.value)
    console.log(res)
    signinRes.value = res.data.token
    document.cookie = `customerToken=${res.data.token}; path=/;`
  } catch (error) {
    console.log('錯誤!')
    console.log(error)
  }
}
// 驗證

const user = ref({
  nickname: '',
  uid: '',
})

onMounted(async () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)customerToken\s*\=\s*([^;]*).*$)|^.*$/i,
    '$1',
  )
  const res = await axios.get(`${api}users/checkout`, {
    headers: {
      Authorization: token,
    },
  })
  console.log(res)
  user.value = res.data
})
</script>

<style scoped>
/* 整體頁面背景與排版 */
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f6f8;
}

/* 主容器 */
.container {
  max-width: 400px;
  margin: 60px auto;
  padding: 32px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

/* 標題樣式 */
h1,
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 16px;
}

/* 輸入框樣式 */
input {
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  transition: border 0.2s ease-in-out;
}
input:focus {
  border-color: #007bff;
  outline: none;
}

/* 按鈕樣式 */
button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
button:hover {
  background-color: #0056b3;
}

/* 驗證資訊區塊 */
.auth-info {
  margin-top: 24px;
  background: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #444;
}

.token-box {
  margin-top: 24px;
  background-color: #e6f4ff;
  border: 1px solid #91d5ff;
  padding: 16px;
  border-radius: 8px;
  color: #003a8c;
  word-break: break-all;
  font-size: 14px;
}

/* AOS 動畫設定建議放在容器上 */
[data-aos] {
  opacity: 0;
  transition-property: opacity, transform;
}
</style>
