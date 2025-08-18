<template>
  <div class="card shadow-sm p-4 bg-light">
    <h5 class="card-title text-center text-success mb-4 fw-bold">已送出訂單</h5>
    <ul class="list-group list-group-flush mb-3">
      <li
        v-for="item in order.drinks"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0"
      >
        <span class="text-dark">{{ item.name }} x {{ item.quantity }}</span>
        <span class="text-success fw-bold">NT$ {{ item.price * item.quantity }}</span>
      </li>
    </ul>
    <div v-if="order.remark" class="alert alert-info py-2 my-3 rounded-3">
      <small><span class="fw-bold">備註:</span> {{ order.remark }}</small>
    </div>
    <div class="d-flex justify-content-between fw-bold fs-4 pt-2 border-top border-secondary">
      <span>總金額</span>
      <span class="text-success">NT$ {{ order.sum }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: {
    type: Object,
    required: true,
  },
})
</script>
