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
        <label >Subject</label>
        <div class="form-group">
          <input 
             placeholder="할 일을 입력하세요"
            v-model="todo.subject" 
            type="text" 
            class="form-control"
          >
        </div>
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
  <Toast 
    v-if="showToast" 
    :message="toastMessage"
    :type="toastAlertType"
  />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed  } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
export default {
  components: {
    Toast
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
            const res = await axios.get(`
              http://localhost:3000/todolist/${todoId}
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
          try {
            let res;
            const data ={
              subject: todo.value.subject,
              completed: todo.value.completed,
              body: todo.value.body,
            };
          
            if (props.editing){
             res = await axios.put(
                `http://localhost:3000/todolist/${todoId}`, data );
                 originalTodo.value = {...res.data};
            }
            else{ //editing이 아니면 데이터베이스 post(생성)해라
              res = await axios.post(
              `http://localhost:3000/todolist/`, data);
              todo.value.subject ='';
              todo.value.body = '';

            }

            const message ='Successfully ' +( props.editing ? 'Updated!!' : 'Created!!');
            triggerToast(message);

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
        };
    }
}
</script>

<style>
</style>