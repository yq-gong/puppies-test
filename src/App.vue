<template>
  <div class="container">
    <div>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { testInput: 20 };
  },
  methods: {
    onClick() {
      this.testInput += 1;
    },

    
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
