import {reactive, toRefs} from 'vue';

export const useCount = () => {
    const state = reactive({
        count: 0
    });

    return toRefs(state);
}

//export const userCount로 하면 import할 때 {}중괄호로 해줘야한다.
//export default userCout로 한다면 import useCount .. 로 바로 사용할 수 있다.