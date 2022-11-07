<template>
<div class = "container">
  <h2> To - Do List </h2>
  <form @submit.prevent="onSubmit">
      <div class="d-flex">
          <div class ="flex-grow-1  mr-2">
              <input 
                  class="form-control"
                  type="text" 
                  v-model="todo"
                  placeholder="Type new to-do"
              >
            </div>
              <div>
                  <button class="btn btn-primary"
                    type = "submit">
                      Add
                  </button>
              </div>
      </div>
      <div v-show="hasError" style="color: red">
        (error)글을 입력하세요.
      </div>

  </form>
  <!-- 배열에 있는 데이터들을 똑같은 템플릿을 적용해서 반복적으로 보여주고싶을 때  V-For사용 (KEY을 사용해야한다.)-->
    <div 
      v-for=" t in todolist" 
      :key="t.id"
      class="card mt-3"
      >
        <div class="card-body p-2 ">
          <div class = "form-check">
            <input 
              class = "form-check-input"
              type="checkbox"
              v-model="t.completed">
            <label 
                class = "form-check-label" 
                > 
                {{t.subject}}
              </label>
          </div>
           
        </div>

    </div>
</div>    
</template>

<script>
import {ref} from 'vue';
export default {  
  setup() {
    const hasError = ref(false);
    const todo= ref('');
    const todolist = ref([]);

    const onSubmit = () =>{
      if(todo.value == ''){
        hasError.value = true;
      }else{
          todolist.value.push({
            id: Date.now(),
            subject: todo.value,
            completed: false
            });
            
            hasError.value = false;
            todo.value=''; //입력 후 입력상자 빈칸으로
      }
      };

     return{
        todo,
        todolist,
        onSubmit,
        hasError
      };
  }
}
</script>

<style>
.name{
  color:red;
}
</style>