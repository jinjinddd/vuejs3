<template>
  <h1 class="title"> 일정 등록하기</h1>
  <TodoForm />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';

export default {
   components: {
        TodoForm
    },

}
</script>

<style>
  .title {
    font-size: 50px;
    font-weight: 800;
    color: #56296d;
    letter-spacing: -5px;
  }
</style>