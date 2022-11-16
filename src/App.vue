<template>
<div class = "container">
  <h2> To - Do List </h2>
  <!-- 검색input -->
  <input 
    class="form-control"
    type="text" 
    v-model="searchText"
    placeholder="Search"
   >
   <hr />
  <TodoSimpleForm @add-todo="addTodo"/>
  <div style="color: red">{{error}}</div>
    <div v-if="!filteredTodos.length">
     표시할 내용이 없습니다.
    </div>
    <TodoList 
    :todolist="filteredTodos"  
    @toggle-todo="toggleTodo" 
    @delete-todo="deleteTodo"
    />
</div>    
</template>

<script>
import {ref,computed} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList       from './components/TodoList.vue';
import axios from 'axios';

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
    };
    const error=ref('');
    const addTodo = async(todo) =>{ //async로 addTodo를 비동기적으로 만들어준다.
        error.value=''; //error메시지 초기화
        //데이터베이스에 todo를 저장한 후 배열에 저장을 한다.axios패키지를 이용(요청을 보낼 때 사용하는 패키지)
        try{
        const res = await axios.post('http://localhost:3000/todolist',{ //await로 잠시기다린다.
        //id는 db에 넣지 않아도 자동으로 1부터 추가된다.
            subject: todo.subject,
            completed: todo.completed,
            });
             todolist.value.push(res.data);
        }catch(err)
        {
          console.log(err);
          error.value = '데이터베이스 에러발생~';
        }

      };

   
      const toggleTodo = (index) =>{
        console.log(index)
        todolist.value[index].completed = !todolist.value[index].completed
      };

      const deleteTodo = (index) =>{
          todolist.value.splice(index, 1); //splice메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경
      };

      //검색기능
      const searchText = ref('');
      const filteredTodos = computed(()=>{
        if(searchText.value){
          return todolist.value.filter(todo => {
            return todo.subject.includes(searchText.value);
          });
        }
        return todolist.value;
      });


     return{
        todolist,
        addTodo,
        todoStyle,
        deleteTodo,
        toggleTodo,
        searchText,
        filteredTodos,
        error,
      };
  }
}
</script>

<style>

</style>