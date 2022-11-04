<template>
  <div class="name">
    {{name}}
    </div> 
    <button class="btn btn-primary"
    v-on:click="updatename"
    >
    Click
    </button>
</template>

<script>
import { ref } from 'vue';
export default {  
  setup() {
    const name = ref('seonjin')
    // const greeting = (name) =>{
    //   return "hello," + name;
    // }
    // const greet = greeting(name);
    const updatename = () =>{
      // console.log('hello world');
      name.id =2;
      console.log(name);
    };

     return{
     name,
     updatename
    };
  }
}
</script>

<style>
.name{
  color:red;
}
</style>