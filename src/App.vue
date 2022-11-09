<template>
<div class = "container">
  <h2> To - Do List </h2>
  <TodoSimpleForm @add-todo="addTodo"/>
 
  <!-- 배열에 있는 데이터들을 똑같은 템플릿을 적용해서 반복적으로 보여주고싶을 때  V-For사용 (KEY을 사용해야한다.)-->
    <div v-if="!todolist.length">
      추가된 일정이 없습니다.
    </div>
    
    <div 
      v-for=" (t, index) in todolist" 
      :key="t.id"
      class="card mt-3"
      >
        <div class="card-body p-2 d-flex align-items-center">
          <div class = "form-check flex-grow-1">
            <input 
              class = "form-check-input"
              type="checkbox"
              v-model="t.completed">
            <label 
                class = "form-check-label" 
                :class="{ todo:t.completed }"
                > 
                {{t.subject}}
              </label>
          </div>
           <div>
            <button 
              class="btn btn-danger btn-sm"
              @click="deleteTodo(index)">
              Delete
              </button>
           </div>
        </div>
    </div>
</div>    
</template>

<script>
import {ref} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {  
  components: {
    TodoSimpleForm 
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

      const deleteTodo = (index) =>{
          todolist.value.splice(index,1); //splice메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경
      };

     return{
        todolist,
        addTodo,
        todoStyle,
        deleteTodo
      };
  }
}
</script>

<style>
.todo{
  color:gray;
  text-decoration: line-through;
}
</style>