<template>
       <!-- 배열에 있는 데이터들을 똑같은 템플릿을 적용해서 반복적으로 보여주고싶을 때  V-For사용 (KEY을 사용해야한다.)-->
    <div 
      v-for=" (t, index) in todolist" 
      :key="t.id"
      class="card mt-3"
      >
        <div class="card-body p-2 d-flex align-items-center">
          <div class = "form-check flex-grow-1">
              <!--props는 자식컴포넌트가 받은 데이터를 직접적으로 변경할 수 없다 v-modle="t.completed"를 변경해주어야함-->
            <input 
              class = "form-check-input"
              type="checkbox"
              :value="t.completed"
              @change="toggleTodo(index)"
              >
          
            <label 
                class = "form-check-label" 
                :class="{ todo:t.completed }"
                > 
                {{t.subject}}
              </label>
          </div>
           <div>
            <!--삭제버튼-->
            <button 
              class="btn btn-danger btn-sm"
              @click="deleteTodo(index)"
              >   
              Delete
              </button>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    //props: ['todolist']
    props: {
        todolist:{
            type: Array,
            required: true
        }
    },
    emits: ['toggle-todo','delete-todo'],
    setup(props, {emit}){
        const toggleTodo = (index) =>{
            emit('toggle-todo', index);
        };

        const deleteTodo = (index) =>{
          emit('delete-todo', index);
        };
        return{
            toggleTodo,
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