<!--Todo목록을 보는 페이지-->
<template >
  <!-- 배열에 있는 데이터들을 똑같은 템플릿을 적용해서 반복적으로 보여주고싶을 때  V-For사용 (KEY을 사용해야한다.)-->
    <List
      :items="todolist"
      :index="index"
    >
    <template #default="{item, index}">
        <div 
        class="card-body p-2 d-flex align-items-center"
        @click="moveToPage(item.id)"
        style="cursor: pointer"
        >
          <div class = " flex-grow-1">
              <!--props는 자식컴포넌트가 받은 데이터를 직접적으로 변경할 수 없다 v-modle="t.completed"를 변경해주어야함-->
           <!--체크박스-->
            <input 
              class="ml-2 mr-2"
              type="checkbox"
              :checked="item.completed"
              @change="toggleTodo(index, $event)"
              @click.stop
              >
          
            <span :class="{ todo:item.completed }"> 
                {{item.subject}}
              </span>
          </div>
           <div>
            <!--삭제버튼-->
              <font-awesome-icon icon="fa-trash" class="remove-btn"  @click.stop="openModal(item.id)" />
           </div>
        </div>
    </template>
    </List>
  

     <teleport to="#modal">
        <DeleteModal 
          v-if ="showModal"
          @close ="closeModal"
          @delete ="deleteTodo"
        />
    </teleport>
     
</template>

<script>
import { useRouter } from 'vue-router';
import DeleteModal from '@/components/DeleteModal.vue'
import { ref } from 'vue';
import List from '@/components/List.vue'


//import { watchEffect } from 'vue';
export default {
  components:{
    DeleteModal,
    List
  },
    //props: ['todolist']
    props: {
        todolist:{
            type: Array,
            required: true
        }
    },
    emits: ['toggle-todo','delete-todo'],


    setup(props, {emit}){
       const showModal = ref(false);
       const todoDeleteId = ref(null);

      const router = useRouter();
        const toggleTodo = (index, event) =>{
            emit('toggle-todo', index, event.target.checked);
        };

        const openModal =(id)=>{
          todoDeleteId.value = id;
          showModal.value=true;
        };

        const closeModal = () =>{
          todoDeleteId.value = null;
          showModal.value= false;
        };

        const deleteTodo = () =>{
          emit('delete-todo', todoDeleteId.value);

          showModal.value = false;
          todoDeleteId.value = null;
        };
         
/*         watchEffect(()=>{
            console.log(props.todolist.length);
        }); */

        const moveToPage =(todoID)=>{
          //router.push('/todolist/'+ todoID);
          router.push({
              name: 'Todo',
              params : {id: todoID}
          })
        };

       

        return{
            toggleTodo,
            deleteTodo,
            moveToPage,
            showModal,
            openModal,
            closeModal,

        };
    }
}
</script>

<style lang="scss" scoped>

.item {
  background: white;
  width: 500px;
  margin: 5px;
  padding: 15px 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-basis: fit-content;
  
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.todo{
  color:gray;
  text-decoration: line-through;
}
 .remove-btn {
        margin-left: 10px;
        color: #de4343;
        cursor: pointer;
}
</style>