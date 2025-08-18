<template>
  <div class="container" data-aos="fade-up">
    <h1>待辦</h1>

    <!-- 註冊功能 -->
    <h2>註冊功能</h2>
    <input type="email" placeholder="email" v-model="signupField.email" />
    <input type="password" placeholder="密碼" v-model="signupField.password" />
    <input type="text" placeholder="名稱" v-model="signupField.nickname" />
    <br />
    <button type="button" @click="signup">註冊</button>
    <div v-if="signupRes" class="response-box">
      <strong>註冊成功！UID: </strong>
      <p>{{ signupRes }}</p>
    </div>

    <!-- 登入功能 -->
    <h2>登入功能</h2>
    <input type="email" placeholder="email" v-model="signInField.email" />
    <input type="password" placeholder="密碼" v-model="signInField.password" />
    <br />
    <button type="button" @click="signIn">登入</button>
    <div v-if="signinRes" class="token-box">
      <strong>目前 Token：</strong>
      <p>{{ signinRes }}</p>
    </div>

    <!-- 驗證用戶資料 -->
    <h2>驗證</h2>
    <div v-if="user.uid">
      <p>UID: {{ user.uid }}</p>
      <p>NickName: {{ user.nickname }}</p>
    </div>
    <div v-else>尚未登入</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 定義 API 路徑
const api = 'https://todolist-api.hexschool.io/'

// 註冊資料
const signupField = ref({
  email: '',
  password: '',
  nickname: '',
})

// 註冊結果
const signupRes = ref('')

// 註冊方法
const signup = async () => {
  // 基本表單驗證
  if (!signupField.value.email || !signupField.value.password || !signupField.value.nickname) {
    alert('請填寫所有欄位！')
    return
  }
  try {
    const res = await axios.post(`${api}users/sign_up`, signupField.value)
    signupRes.value = res.data.uid
    console.log(res)
  } catch (error) {
    console.error('註冊錯誤:', error)
  }
}

// 登入資料
const signInField = ref({
  email: '',
  password: '',
})

// 登入結果
const signinRes = ref('')

// 登入方法
const signIn = async () => {
  // 基本表單驗證
  if (!signInField.value.email || !signInField.value.password) {
    alert('請填寫所有欄位！')
    return
  }
  try {
    const res = await axios.post(`${api}users/sign_in`, signInField.value)
    signinRes.value = res.data.token
    document.cookie = `customerToken=${res.data.token}; path=/;`
  } catch (error) {
    console.error('登入錯誤:', error)
  }
}

// 驗證用戶
const user = ref({
  nickname: '',
  uid: '',
})

onMounted(async () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)customerToken\s*\=\s*([^;]*).*$)|^.*$/i,
    '$1',
  )

  if (!token) {
    console.error('未找到 token')
    return
  }

  try {
    const res = await axios.get(`${api}users/checkout`, {
      headers: {
        Authorization: token,
      },
    })
    user.value = res.data
    console.log(res)
  } catch (error) {
    console.error('驗證錯誤:', error)
  }
})
</script>

<style scoped>
/* 基本樣式設定 */
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

/* 回應框 */
.response-box {
  margin-top: 12px;
  background-color: #e6f4ff;
  border: 1px solid #91d5ff;
  padding: 12px;
  border-radius: 8px;
  color: #003a8c;
  font-size: 14px;
  word-break: break-all;
}

/* 驗證 Token 框 */
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

/* AOS 動畫設定 */
[data-aos] {
  opacity: 0;
  transition-property: opacity, transform;
}
</style>
