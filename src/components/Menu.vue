<template>
  <div class="card shadow-sm p-4 h-100">
    <h4 class="card-title text-center text-secondary mb-4">飲品選單</h4>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="drink in products" :key="drink.id" class="col">
        <div class="card h-100 border-0 shadow-sm rounded-3 overflow-hidden product-card">
          <div
            class="product-img-placeholder bg-light d-flex align-items-center justify-content-center text-muted"
          >
            <i class="bi bi-cup-hot-fill fs-2"></i>
          </div>
          <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title text-primary fw-bold">{{ drink.name }}</h5>
            <p class="card-text text-muted flex-grow-1">{{ drink.description }}</p>
            <div class="mt-auto">
              <p class="h6 fw-bold text-success mb-2">NT$ {{ drink.price }}</p>
              <button
                @click="$emit('add-to-cart', drink)"
                class="btn btn-primary btn-sm rounded-pill w-100"
              >
                <i class="bi bi-cart-plus me-1"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap-icons/font/bootstrap-icons.css'
defineProps({
  products: {
    type: Array,
    required: true,
  },
})
defineEmits(['add-to-cart'])
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}
.product-img-placeholder {
  height: 120px;
  background-color: #f8f9fa;
  color: #adb5bd;
}
</style>
