import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import HomePage from '../views/Home/HomePage/HomePage.vue'
import FoodLabels from '../views/Home/FoodLabels/FoodLabels.vue'
import RedPacketManage from '../views/Home/RedPacketManage/RedPacketManage.vue'
import AuthorityManage from '../views/Home/AuthorityManage/AuthorityManage.vue'
import TaskManage from '../views/Home/TaskManage/TaskManage.vue'
import TagManager from '../views/Home/TagManager/TagManager.vue'
import Login from '../views/Login/Login.vue'
import ForgetPassword from '../views/ForgetPassword/ForgetPassword.vue'
import FoodManage from '../views/Home/FoodManage/FoodManage.vue'
import OrderSelect from '../views/Home/OrderSelect/OrderSelect.vue'
import ResturantManage from '../views/Home/ResturantManage/ResturantManage.vue'
import User from '../views/Home/User/User.vue'
import Diary from '../views/Home/Diary/Diary.vue'
import Comment from '../views/Home/Comment/Comment.vue'
import Activity from '../views/Home/Activity/Activity.vue'
import Pagedemo from '../views/Home/Pagedemo/Pagedemo.vue'
import Chat from '../views/Home/Chat/Chat.vue'
import DataView from '../views/Home/DataView/DataView.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

  const routes = [
  {
      path: '/',
      name: 'Login',
      component: Login,
  	
  },
  {
  	path: '/Login/ForgetPassword',
  	name: 'ForgetPassword',
  	component: ForgetPassword,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
	children:[
	  {
	    path: '/Home/HomePage',
	    name: 'HomePage',
	    component: HomePage,
	  },
	  
	  {
	  	path: '/Home/TagManager',
	  	name: 'TagManager',
	  	component: TagManager,
	  },
	  {
	    path: '/Home/FoodLabels',
	    name: 'FoodLabels',
	    component: FoodLabels,
	  },
	  {
	    path: '/Home/RedPacketManage',
	    name: 'RedPacketManage',
	    component: RedPacketManage,
	  },
	  {
	    path: '/Home/AuthorityManage',
	    name: 'AuthorityManage',
	    component: AuthorityManage,
	  },
	  {
	    path: '/Home/TaskManage',
	    name: 'TaskManage',
	    component: TaskManage,
	  },
	  {
	    path: '/Home/FoodManage',
	    name: 'FoodManage',
	    component: FoodManage,
	  },
	  {
	    path: '/Home/OrderSelect',
	    name: 'OrderSelect',
	    component: OrderSelect,
	  },
	  {
	    path: '/Home/ResturantManage',
	    name: 'ResturantManage',
	    component: ResturantManage,
	  },
	  {
	    path: '/Home/User',
	    name: 'User',
	    component: User,
	  },
	  {
	    path: '/Home/Diary',
	    name: 'Diary',
	    component: Diary,
	  },
	  {
	    path: '/Home/Comment',
	    name: 'Comment',
	    component: Comment,
	  },
	  {
	    path: '/Home/Activity',
	    name: 'Activity',
	    component: Activity,
	  },
	  {
	    path: '/Home/Pagedemo',
	    name: 'Pagedemo',
	    component: Pagedemo,
	  },
	  {
	    path: '/Home/Chat',
	    name: 'Chat',
	    component: Chat,
	  },
	  {
	    path: '/Home/DataView',
	    name: 'DataView',
	    component: DataView,
	  },
	],
	redirect: '/Home/HomePage',
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
	if(to.path=="/"){
		next();
	}else{
		console.log(store.getters.getIsLogin);
		if(!store.getters.getIsLogin){
			next({
				path:'/'
			});
			return;
		}
		next();
	}
	
})


export default router
