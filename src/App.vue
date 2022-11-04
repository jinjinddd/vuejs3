<template>
  <div :class="nameClass">
    {{ name }}
  </div> 
    <input :type="type" :value="name">
    
    <button class="btn btn-primary"
       @click="updatename"
    >
    Click
    </button>

</template>

<script>
import { ref } from 'vue';
export default {  
  setup() {
    const name = ref('seonjin')
    const type = ref('number')
    const nameClass = ref('')

    const updatename = () =>{
      // console.log('hello world');
      name.value ='pretty woman';
      type.value = 'text';
      nameClass.value = 'name';
      console.log(name);
    };

     return{
     name,
     updatename,
     type,
     nameClass
    };
  }
}
</script>

<style>
.name{
  color:red;
}
</style>