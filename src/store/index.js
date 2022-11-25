//vuex Store
import { createStore } from 'vuex';
import modules from './modules';

export default createStore({

    modules: modules //modules로 생략가능
});