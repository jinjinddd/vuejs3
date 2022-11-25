export default{
    
        namespaced: true,
        state: {
            //원하는 state정의 Toast state /vuex state는 vue.js안에 있는 어떤 컴포넌트에서든지 접근이 가능
            toasts:[],
            toastMessage :'',
            toastAlertType :'',
            showToast :false,
            timeout :null
        },
    
        mutations:{
            UPDATE_TOAST_MESSAGE(state, payload){
                state.toastMessage = payload;     
            },
            UPDATE_TOAST_ALERT__MESSAGE(state,payload){
                state.toastAlertType = payload;
            },
            UPDATE_TOAST_STATUS(state,payload){
                state.showToast = payload;
            },
            UPDATE_TOAST_TIMEOUT(state,payload){
                state.timeout = payload;
            },
            ADD_TOAST(state,payload){
                 state.toasts.push(payload);   
            },
            REMOVE_TOAST(state,payload){
                state.toasts.shift();
            }
        },
        actions:{
            triggerToast({commit}, payload) {
                // //toastMessage.value = message;
                // commit('UPDATE_TOAST_MESSAGE',message)
                // //toastAlertType.value = type;
                // commit('UPDATE_TOAST_ALERT__MESSAGE',type)
                // //showToast.value = true;
                // commit('UPDATE_TOAST_STATUS',true)
                
                commit('ADD_TOAST',{
                    id:Date.now(),
                    message: payload.message,
                    type: payload.type,
                });

                //초기화
                setTimeout(() => {
                //  // toastMessage.value = '';
                //   commit('UPDATE_TOAST_MESSAGE','')
                //   //toastAlertType.value = '';
                //   commit('UPDATE_TOAST_ALERT__MESSAGE','')
                //   //showToast.value = false;
                //   commit('UPDATE_TOAST_STATUS',false)
                    commit('REMOVE_TOAST');
                }, 5000)
              }
    
        },
    
        getters: {
            toastMessageWithSmile(state){
                return state.toastMessage + '^_^';
            }
        },
    
}