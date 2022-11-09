<template>
<div class = "container">
  <h2> To - Do List </h2>
  <TodoSimpleForm @add-todo="addTodo"/>
    <div v-if="!todolist.length">
      추가된 일정이 없습니다.
    </div>
    <TodoList :todolist="todolist" @toggle-todo="toggleTodo"/>
</div>    
</template>

<script>
import {ref} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {  
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todolist = ref([]);
    const todoStyle = {
      textDecoration: 'line-through',
      color:'gray'

    }

    const addTodo = (todo) =>{
      console.log(todo);
      todolist.value.push(todo);
      };

      const toggleTodo = (index) =>{
        console.log(index)
      };

      const deleteTodo = (index) =>{
          todolist.value.splice(index,1); //splice메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경
      };

     return{
        todolist,
        addTodo,
        todoStyle,
        deleteTodo,
        toggleTodo
      };
  }
}
</script>

<style>

</style>