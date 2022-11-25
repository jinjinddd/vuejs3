<template>
  <Navbar/>
  <div class = "container">
      <router-view/>
      <ToastVue />
  </div>
 
</template>

<script>
import ToastVue from '@/components/Toast.vue'
import Navbar from '@/components/Navbar.vue'
import TodoTitle from '@/components/TodoTitle.vue'
export default{
  name: 'App',
  components:{
    ToastVue,
    Navbar,
     TodoTitle
  },
setup(){
     
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');
#app {
  font-family: 'Nanum Gothic', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  background: #faedf0;
}
</style>