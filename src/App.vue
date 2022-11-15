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
    const addTodo = (todo) =>{
        error.value=''; //error메시지 초기화
        //데이터베이스에 todo를 저장한 후 배열에 저장을 한다.axios패키지를 이용(요청을 보낼 때 사용하는 패키지)
        axios.post('http://localhost:3000/todolist',{
        //id는 db에 넣지 않아도 자동으로 1부터 추가된다.
        subject: todo.subject,
        completed: todo.completed,
          }).then(res => {
          //자바스크립트에서 요청은 비동기적으로 일어난다. 응답이 promise란 곳으로오게되는데
          //요청을 보내고 요청이 끝나고 응답이 오기전에 바로 다음으로 넘어가게된다.
          //then 키워드를 통해 요청에 대한 응답이 왔을 때 실행할 수 있다.
          //then이 없다면 요청이 끝났는지 아닌지 알 수 없을 때 다음 문장이 실행된다.
              console.log(res);
              todolist.value.push(res.data); //id까지 포함된 정보가 배열에 저장된다.
             }).catch(err =>{ //데이터베이스에 저장실패했을 때 catch실행된다.
              console.log(err);
              error.value = '데이터베이스 에러발생~';
             });     
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