<!--Todo를 생성하고 수정하는 페이지-->
<template>
  <div v-if="loading">
    Loading..
  </div>
  <form 
    v-else
    @submit.prevent="onSave"
  >
    <div class="row mt-4">
      <div class="col-6">
        <Input 
            label="Subject" 
            v-model:subject="todo.subject"
            :error="subjectError"
        />
      </div>

      <div v-if="editing" class="col-6 ">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button 
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? '완료' : '미완료' }}
            </button>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="form-group">
          <label>설명</label>
          <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
    
    <button 
      type="submit" 
      class="btn btn-primary"
      :disabled="!todoUpdated"
    >
      {{ editing ? 'Update' : 'Create' }}
    </button>
    <button 
      class="btn btn-outline-dark ml-2"
      @click="moveToTodoListPage"
    >
      Cancel
    </button>
  </form>

</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import { ref, computed, onUpdated  } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';


export default {
  components: {
    Toast,
    Input
  },
  props: {
      editing: {
          type: Boolean,
          default: false  //일정관리 페이지에서 
      }
  },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false,
            body: ''
        });
        onUpdated(()=>{
            console.log(todo.value.subject)
        });

        const subjectError =ref('');
        const originalTodo = ref(null);
        const loading = ref(false);
        const {
          toastMessage,
          toastAlertType,
          showToast,
          triggerToast
        } = useToast();

        const todoId = route.params.id        

       
        const getTodo = async () => {
            loading.value = true;
          try {
            const res = await axios.get(`todolist/${todoId}
            `);
            todo.value = { ...res.data };
            originalTodo.value = { ...res.data };
            loading.value = false;
          } catch (error) {
            loading.value = false;
            console.log(error);
            triggerToast('Something went wrong', 'danger');
          }
        };
        const todoUpdated = computed(() => {
          return !_.isEqual(todo.value, originalTodo.value)
        });

        const toggleTodoStatus = () => {
          todo.value.completed = !todo.value.completed;
        };

        const moveToTodoListPage = () => {
          router.push({
            name: 'Todolist'
          })
        };

        if (props.editing) {
            getTodo();
        }

        const onSave = async () => {
          subjectError.value = '';
          if(!todo.value.subject){
            subjectError.value = 'Subject를 작성해 주세요';
            return;
          }
          try {
            let res;
            const data ={
              subject: todo.value.subject,
              completed: todo.value.completed,
              body: todo.value.body,
            };

            if (props.editing){
             res = await axios.put(
                `todolist/${todoId}`, data );
                 originalTodo.value = {...res.data};
            }
            else{ //editing이 아니면 데이터베이스 post(생성)해라
              res = await axios.post(
              'todolist', data);
              todo.value.subject ='';
              todo.value.body = '';

            }
            const message ='Successsfully ' +( props.editing ? 'Updated!!' : 'Created!!');
            triggerToast(message);
            
             if(!props.editing)  //생성할 때면
            {
                router.push({
                  name:'Todolist',
                })
            }

          } catch (error) {
            console.log(error);
            triggerToast('Something went wrong', 'danger')
          }

        };
        return {
          todo,
          loading,
          toggleTodoStatus,
          moveToTodoListPage,
          onSave,
          todoUpdated,
          showToast,
          toastMessage,
          toastAlertType,
          subjectError,
        };
    }
}
</script>

<!--scoped를 사용하면 style이 이 컴포넌트 안에서만 바뀌게 된다.(unique한 id가 추가가된다.)-->
<style scoped> 
  .text-red{
  color: red;
  }
  .fade-enter-active,
  .fade-leave-active{
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to{
    opacity: 0;
  }

  .fade-enter-to,
  .fade-leave-from{
    opacity: 1;
  }

  .slide-enter-active,
  .slide-leave-active{
    transition: all 0.5s ease;
  }

  .slide-enter-from,
  .slide-leave-to{
    opacity: 0;
    transform: translateY(-30px);
  }

  .slide-enter-to,
  .slide-leave-from{
    opacity: 1;
    transform: translateY(0px);
  }
  

</style>

