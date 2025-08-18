<template>
  <div class="card shadow-sm p-4 h-100 d-flex flex-column">
    <h4 class="card-title text-center text-secondary mb-4">我的訂單</h4>
    <div class="flex-grow-1">
      <div v-if="cartItems.length > 0">
        <ul class="list-group list-group-flush mb-3">
          <li
            v-for="item in cartItems"
            :key="item.id"
            class="list-group-item d-flex justify-content-between align-items-center px-0"
          >
            <div>
              <h6 class="mb-0 fw-bold text-dark">{{ item.name }}</h6>
              <small class="text-muted">NT$ {{ item.price }}</small>
            </div>
            <div class="d-flex align-items-center">
              <input
                type="number"
                :value="item.quantity"
                min="1"
                class="form-control form-control-sm text-center mx-2"
                style="width: 60px"
                @change="updateItemQuantity(item.id, $event.target.value)"
              />
              <button
                @click="$emit('removeFromCart', item.id)"
                class="btn btn-outline-danger btn-sm rounded-circle p-0"
                style="width: 28px; height: 28px"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
          </li>
        </ul>
        <div class="d-flex justify-content-between fw-bold fs-5 mt-4 pt-2 border-top">
          <span>總計</span>
          <span>NT$ {{ totalPrice }}</span>
        </div>
      </div>
      <div v-else class="text-center text-muted py-5">
        <i class="bi bi-cart-x fs-1 mb-2"></i>
        <p>購物車是空的</p>
      </div>
    </div>
    <div class="mt-auto pt-3 border-top">
      <div class="mb-3">
        <label for="order-notes" class="form-label text-muted">備註</label>
        <textarea
          id="order-notes"
          v-model="notes"
          class="form-control rounded-3"
          rows="3"
          placeholder="輸入備註..."
        ></textarea>
      </div>
      <button
        @click="submit"
        :disabled="cartItems.length === 0"
        class="btn btn-success rounded-pill w-100 fw-bold"
      >
        <i class="bi bi-check-circle me-1"></i>
        送出訂單
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['removeFromCart', 'updateQuantity', 'submitOrder'])

const notes = ref('')

const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
})

const updateItemQuantity = (id, quantity) => {
  const newQuantity = parseInt(quantity, 10)
  if (newQuantity > 0) {
    emit('updateQuantity', { id, quantity: newQuantity })
  }
}

const submit = () => {
  emit('submitOrder', { notes: notes.value })
  notes.value = '' // 清空備註
}
</script>
