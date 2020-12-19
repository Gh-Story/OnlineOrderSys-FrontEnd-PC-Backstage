<template>
	<div class="home">
	    <div class="home_head">
			<div class="log">
				<img src="../../../static/logotext-white.png"
					 class="avatar"
					 width=80%
					 height=100%
					 style="margin-top: 5px;float: right;margin-right: 5px">
				
			</div>
			
			<div class="name">

			</div>
			
			<div class="user">
				<el-dropdown>
				  <span class="el-dropdown-link" style="color: white;font-size: 16px">
					用户：{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
				  </span>
					<el-dropdown-menu slot="dropdown">
						
						<el-dropdown-item>
							<el-link @click="exit" icon="el-icon-switch-button" target="_blank">退出登录</el-link>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
	    </div>
	    <div class="home_content">
	        <div class="home_content_left">
				    <el-menu
				      class="el-menu-vertical-demo"
					  router
					  unique-opened
					  @select="handleSelect"
				      @open="handleOpen"
				      @close="handleClose">
				      <el-menu-item index="/Home/HomePage">
				        <i class="el-icon-s-home"></i>
				        <span slot="title">后台主页</span>
				      </el-menu-item>
					  
				      <el-submenu index="2">
				        <template slot="title">
				          <i class="el-icon-s-order"></i>
				          <span>订单管理</span>
				        </template>
				        <el-menu-item-group>
				          <el-menu-item index="/Home/OrderSelect">订单查询</el-menu-item>
						  <el-menu-item index="/Home/Comment">评价管理</el-menu-item>
						  
				        </el-menu-item-group>
				      </el-submenu>
					  
				      <el-menu-item index="/Home/FoodManage">
				        <i class="el-icon-fork-spoon"></i>
				        <span slot="title">美食管理</span>
				      </el-menu-item>
					  
					  <el-menu-item index="/Home/TagManager">
					    <i class="el-icon-collection-tag"></i>
					    <span slot="title">标签管理</span>
					  </el-menu-item>
					  
					  
					  
					  
					  <el-menu-item index="/Home/User">
					    <i class="el-icon-user-solid"></i>
					    <span slot="title">用户管理</span>
					  </el-menu-item>
					  
					  <el-menu-item index="/Home/AuthorityManage" v-if="show">
					    <i class="el-icon-key"></i>
					    <span slot="title">权限管理</span>
					  </el-menu-item>
					  
					  <el-submenu index="7">
					    <template slot="title">
					      <i class="el-icon-present"></i>
					      <span>活动管理</span>
					    </template>
					    <el-menu-item-group>
						  <el-menu-item index="/Home/Activity">活动管理</el-menu-item>
					      <el-menu-item index="/Home/RedPacketManage">红包管理</el-menu-item>
					      <el-menu-item index="/Home/TaskManage">任务管理</el-menu-item>
					    </el-menu-item-group>
					  </el-submenu>
					  
					  <el-menu-item index="/Home/ResturantManage">
					    <i class="el-icon-school"></i>
					    <span slot="title">店铺管理</span>
					  </el-menu-item>
					  
					  
					  <el-menu-item index="/Home/Diary" v-if="show">
					    <i class="el-icon-document-copy"></i>
					    <span slot="title">日志管理</span>
					  </el-menu-item>
					  <el-menu-item index="/Home/Chat">
					    <i class="el-icon-s-promotion"></i>
					    <span slot="title">客服咨询</span>
					  </el-menu-item>
					  <el-menu-item index="/Home/DataView" v-if="show">
						<i class="el-icon-s-marketing"></i>
						<span slot="title">数据可视化</span>
					  </el-menu-item>
				    </el-menu>
	        </div>
	        <div class="home_content_right">
				<el-tag type="success">{{nowPage}}:</el-tag>
	            <router-view></router-view>
	        </div>
	    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				show:false,
				username:'魏子淇',
				nowPage:'后台主页',
				list:[
					{path:'/Home/HomePage',name:'后台主页'},
					{path:'/Home/OrderSelect',name:'订单管理/订单查询'},
					{path:'/Home/OrderManager',name:'订单管理/订单处理'},
					{path:'/Home/Comment',name:'订单管理/评价管理'},
					{path:'/Home/FoodManage',name:'美食管理'},
					{path:'/Home/TagManager',name:'标签管理/标签管理'},
					{path:'/Home/FoodLabels',name:'标签管理/美食标签管理'},
					{path:'/Home/User',name:'用户管理'},
					{path:'/Home/AuthorityManage',name:'权限管理'},
					{path:'/Home/Activity',name:'活动管理/活动管理'},
					{path:'/Home/RedPacketManage',name:'活动管理/红包管理'},
					{path:'/Home/TaskManage',name:'活动管理/任务管理'},
					{path:'/Home/ResturantManage',name:'店铺管理'},
					{path:'/Home/Diary',name:'日志管理'},
					{path:'/Home/Chat',name:'客服咨询'},
					{path:'/Home/DataView',name:'数据可视化'},
				]
			}
			
		},
		mounted(){
			console.log("???");
			console.log(this.$store.getters.getCustomer);
			this.username=this.$store.getters.getCustomer.managerName;
			let userType=this.$store.getters.getCustomer.managerType;
			if(userType==2)
				this.show=true;
		},
	    methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },
		  handleSelect(key,keyPath){
			console.log(key);
			for(let i=0;i<this.list.length;i++){
				if(key==this.list[i].path){
					this.nowPage=this.list[i].name;
					break;
				}
			}
			//console.log(keyPath);
		  },
			//退出登录
			exit:function () {
				this.$store.commit('changeLogin',false);
				alert('退出登录');
				this.$router.push({path:'/'});
			}

	    }
	  }
</script>

<style lang="less" scoped>
	.home{
	    width:100%;
	    height:100%;
	    display: flex;
	    flex-direction: column;
	    .home_head{
	        flex:1;
	        background-color: lightskyblue;
	        display: flex;
			.log{
			    flex:1;
			    -padding-top:15px;
				margin-bottom: 10px;
				text-align: center;
			}
			.name{
				//border: black  solid 2px;
			    flex:5;
				//padding: auto;
				text-align:center;
			}
			.user{
				flex:1;
				text-align: center;
				margin-top: 45px;
			}
	    }
	    .home_content{
	        flex:7;
	        //background-color: lightpink;
	        display: flex;
	        .home_content_left{
				
	            flex:1;
	            //background-color: lightblue;
	        }
	        .home_content_right{
				
	            flex:6;
	            background-color: ghostwhite;
	        }
	    }
	}
</style>
