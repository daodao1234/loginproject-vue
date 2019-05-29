<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  top: 0;
  background-image: url('assets/bac1.png');
  background-repeat: round;
  background-size: 100% 100%; 
}
</style>
