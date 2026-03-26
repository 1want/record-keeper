<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div class="main" :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script></script>

<style>
.main {
  flex: 1;
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
