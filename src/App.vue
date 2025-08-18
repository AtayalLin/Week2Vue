<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/">Home</RouterLink> | <RouterLink to="/about">About</RouterLink> |
  <RouterLink to="/review">複習</RouterLink>| <RouterLink to="/todo">待辦</RouterLink>|
  <RouterLink to="/week3">第三週作業</RouterLink> |
  <RouterView />
</template>
