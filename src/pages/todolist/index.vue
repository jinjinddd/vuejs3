<template>
<div >
   <div class="d-flex justify-content-between mb-3" >
     <TodoTitle name="작업을 관리하세요"/>
    </div>
  <!-- 검색input -->
  <div id="todosearch">
      <input 
        class="form-control"
        type="text" 
        v-model="searchText"
        placeholder="일정을 검색하세요"
        @keyup.enter="searchTodo"
      >
        <button 
          @click="moveToCreatePage"
          class="btn submit-button">
            일정 등록하기 
        </button>
  </div>
    <hr />
    <div v-if="!todolist.length">
     표시할 내용이 없습니다.
    </div>

    <TodoList 
    :todolist="todolist"  
    @toggle-todo="toggleTodo" 
    @delete-todo="deleteTodo"
    />
    <Pagination
      v-if="todolist.length"
      :PageNumber="PageNumber"
      :currentPage="currentPage"
      @click="getTodolist"
    />
</div> 

</template>

<script>
import {ref,computed, watch} from 'vue';
import TodoList  from '@/components/TodoList.vue';
import axios from '@/axios';
import ToastVue from '@/components/Toast.vue';
import {useToast} from '@/composables/toast';
import { useRouter } from 'vue-router';
import Pagination from '@/components/Pagination.vue'
import TodoTitle from '@/components/TodoTitle.vue'

export default {  
  components: {

    TodoList,
    ToastVue,
    Pagination,
    TodoTitle
  },
  setup() {
    const router = useRouter();
    const todoStyle = {
      textDecoration: 'line-through',
      color:'gray'
    };
    const todolist = ref([]);
    const error=ref('');
    const DbTodoNumber = ref(0); //DB에 저장된 할 일의 갯수
    const limit = 5;             //한 페이지에 최대 보여질 할 일
    const currentPage = ref(1);  //현재 페이지
    const searchText = ref('');
    const PageNumber = computed(()=>{
      return Math.ceil(DbTodoNumber.value/limit);
    });
    const {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast
    } = useToast();

   
    const getTodolist = async(page = currentPage.value) => {  //데이터베이스에서 Todo들을 가져온다.
      currentPage.value = page; //업데이트를 해야지 현재 페이지가 바뀔때 action이 바뀐다.
      try {
        const res =  await axios.get(
          `todolist?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}` //작은따옴표(')대신 `로 바꾸면 스크립트 변수를 작성할 수 있다.
          );//모든 todoList를 주세요
        DbTodoNumber.value = res.headers['x-total-count'];
        todolist.value = res.data;
      } catch (error) {
        console.log(error);
         triggerToast('문제가 발생했어요 ㅜㅜ','danger');
      }
    };
      getTodolist();


    const addTodo = async(todo) =>{ //async로 addTodo를 비동기적으로 만들어준다.
        error.value=''; //error메시지 초기화
        //데이터베이스에 todo를 저장한 후 배열에 저장을 한다.axios패키지를 이용(요청을 보낼 때 사용하는 패키지)
        try{
            await axios.post('todolist',{ //await로 잠시기다린다.
        //id는 db에 넣지 않아도 자동으로 1부터 추가된다.
            subject: todo.subject,
            completed: todo.completed,
            });

            getTodolist(1);
            //todolist.value.push(res.data); //배열에 바로 넣어줌 페이지 이슈
        }catch(err)
        {
          console.log(err);
          //error.value = '데이터베이스 에러발생~';
           triggerToast('문제가 발생했어요 ㅜㅜ','danger');
        }

      };

      const toggleTodo = async(index, checked) =>{
    
        error.value ='';
        const id = todolist.value[index].id;
        try {
          await axios.patch('todolist/' + id,{
          completed: checked    //데이터베이스의 completed변경
          });

          todolist.value[index].completed = checked  //배열도 update
        } catch (error) {
          console.log(error);
          //error.value = '데이터베이스 에러발생~';
           triggerToast('문제가 발생했어요 ㅜㅜ','danger');
        }
      };

      const deleteTodo = async(id) =>{ //데이터베이스에서 TOdo삭제하기
         error.value ='';
        try {
         await axios.delete('todolist/' + id);
         //todolist.value.splice(index, 1); //splice메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경
         //배열에서 삭제해줘서 할 일 삭제시 페이지 이슈 
          getTodolist(1)
        } catch (error) {
          console.log(error);
          //error.value = '에러발생 삭제 불가!';
           triggerToast('문제가 발생했어요 ㅜㅜ','danger');
        }
        };

      let timeout = null;
      const searchTodo=()=>{
        clearTimeout(timeout);
         getTodolist(1);
      } //엔터를 치면 바로 검색이 가능한 함수


      //검색기능
      //searchText가 변경되면 감지해서 getTodolist를 실행하게 된다.인자로 1을 넣어 검색할 때 첫번째 페이지에서 보여준다.
      watch(searchText,()=>{
          clearTimeout(timeout);
          timeout = setTimeout(()=>{
             getTodolist(1);
          },2000) //2초가 흐른 후에 로직이 실행된다.
      });

/*       const filteredTodos = computed(()=>{
        if(searchText.value){
          return todolist.value.filter(todo => {
            return todo.subject.includes(searchText.value);
          });
        }
        return todolist.value;
      }); */

      //일정 등록 페이지 이동하기
      const moveToCreatePage =()=>{
          router.push({
            name: 'TodoCreate',
          })
      }

     return{
        todolist,
        addTodo,
        todoStyle,
        deleteTodo,
        toggleTodo,
        searchText,
        //filteredTodos,
        error,
        getTodolist,
        PageNumber,
        currentPage,
        searchTodo,
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
        moveToCreatePage
      };
  }
}
</script>

<style lang="scss">
#todosearch {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  input {
    margin: 0 5px;
    border: 2px solid #000;
    border-radius: 5px;
    width: 300px;
    height: 30px;
  }
  .v-model-select {
    margin: 0 5px;
  }
  .submit-button {
    height: 30px;
    margin: 0 5px;
    border: none;
    background: #e494e4;
    border-radius: 30px;
    color: white;
    font-weight: 700;
  }
}
  
</style>