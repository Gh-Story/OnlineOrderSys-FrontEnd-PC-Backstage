import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
  	  	isLogin:window.sessionStorage.getItem('isLogin'),
	  	customer:window.sessionStorage.getItem('customer'),
	   	foodType:window.sessionStorage.getItem('foodType'),
	    foodChooseList:window.sessionStorage.getItem('foodChooseList'),
    },
    mutations: {
		changeLogin(state,isOK){
			state.isLogin = isOK;
			window.sessionStorage.setItem('isLogin',isOK);
		},
		changeUser(state,obj){
			state.customer = obj;
			window.sessionStorage.setItem('customer',obj);
		},
		setFoodType(state, foodType){
			state.foodType = foodType;
			window.sessionStorage.setItem('foodType',foodType);
		},
		setFoodChooseList(state, foodChooseList){
			state.foodChooseList = foodChooseList;
			window.sessionStorage.setItem('foodChooseList',foodChooseList);
		},
    },
    getters: {
		getIsLogin(state){
			return state.isLogin ? state.isLogin:window.sessionStorage.getItem('isLogin');
		},
		getCustomer(state){
			return state.customer ? state.customer:window.sessionStorage.getItem('customer');
		},
		getFoodType(state){
			return state.foodType ? state.foodType:window.sessionStorage.getItem('foodType');
		},
		getFoodChooseList(state){
			return state.foodChooseList ? state.foodChooseList:window.sessionStorage.getItem('foodChooseList');
		}
    },
    actions:{
  	  
    },
    modules: {
    }
})
