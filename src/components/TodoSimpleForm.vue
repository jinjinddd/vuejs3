<template>
     <form @submit.prevent="onSubmit">
      <div class="d-flex">
          <div class ="flex-grow-1  mr-2">
              <input 
                  class="form-control"
                  type="text" 
                  v-model="todo"
                  placeholder="새로운 일정을 등록하세요."
              >
            </div>
              <div>
                  <button class="btn btn-primary"
                    type = "submit">
                      추가
                  </button>
              </div>
      </div>
      <div v-show="hasError" style="color: red">
        (경고!!)글을 입력하세요.
      </div>
  </form>
</template>

<script>
import { ref } from 'vue';
export default {
    emits:['add-todo'],
    setup(props, {emit}) { //composition API를 사용할때 setup()메소드 안에 두개의 인자를 받아온다.                   
        const hasError = ref(false); 
        const todo= ref('');
        
        const onSubmit = () =>{
        if(todo.value == ''){
            hasError.value = true;
         }else{
            emit('add-todo',{
                id: Date.now(),
                subject: todo.value,
                completed: false
            });//자식컴포넌트에서 부모컴포넌트로 데이터를 보낼 때 필요한 기능이 context에 들어있다. emit을 통해서 데이터를 보낸다.               
            hasError.value = false;
            todo.value=''; //입력 후 입력상자 빈칸으로
            }
      };
        return{
            todo,
            hasError,
            onSubmit
        };
    }
}
</script>

<style>

</style>
