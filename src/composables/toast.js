import {ref, onUnmounted} from 'vue';

export const useToast =() =>{
    const toastMessage = ref("");
    const toastAlertType = ref('');
    const showToast = ref(false);
    const toastTimeout = ref(null);
    const timeout = ref(null);
    const triggerToast = (message,type='success')=>
      {
          toastMessage.value=message;
          toastAlertType.value = type;
          showToast.value = true
          toastTimeout.value = setTimeout(()=>{
          toastAlertType.value = '';
          toastMessage.value = '';
          showToast.value = false;
          },4000);
          //메시지가 뜨고 3초후에 메시지가 사라진다.
      }

        //컴포넌트를 벗어나면 setTimeOut을 벗어나도록 한다.
        //unmounted는 메모리를 정리할 때 사용하면 유용하다.
        onUnmounted(()=>{
            clearTimeout(timeout.value);
        })


      return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast
      }
}