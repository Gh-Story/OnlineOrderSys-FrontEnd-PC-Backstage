<template>
	<div class="loginNew">
		<div class="loginTop">
			<div class="lt1">
				<img src="../../../static/logo-white.png"
					 class="avatar"
					 width=50%
					 height=90%
					 style="margin-top: 5px;float: right;margin-right: 5px">
			</div>
			<div class="lt2">
				<div class="lt2-1">
					 东北大学软件学院 ——
				</div>
				<div class="lt2-2">
					全栈课程项目
				</div>
				<div class="lt2-3">
					NORTHEASTERN UNIVERSITY
				</div>
			</div>
			<div class="lt3">
				<div class="lt3-1">
					<i class="el-icon-question" style="margin-right: 5px"></i>
					<a href="" target="helpLink">在线帮助</a>
				</div>
			</div>
		</div>
		<div class="loginMedium">
			<div class="lmLeft">
				<div class="lml1">
					<el-carousel height=400px>
						<el-carousel-item v-for="(item,index) in imgList" :key="item.id" style="border-radius: 30px">
							<img ref="imgHeight"
								 :src="item.idView"
								 class="avatar"
								 width=100%
								 height=100%
								 style="margin-top: 5px;float: right;margin-right: 5px">
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
			<div class="lmRight">
				<div class="lmr">
					<el-tabs type="border-card" style="height: 500px">
						<el-tab-pane label="账号密码登录">
							<div class="userlogin">
								<div class="userlogin1">
									饱了么后台账号登录
								</div>
								<div class="userlogin2">
									<div style="margin-bottom: 20px">
										<el-input v-model="user.manager_username" placeholder="请输入用户名"></el-input>
									</div>
									<div style="margin-bottom: 20px">
										<el-input type="password" v-model="user.manager_password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
									</div>
									<div style="display: inline;margin-top: 10px">
										<div style="float: left">
											<el-checkbox v-model="remember">记住密码</el-checkbox>
										</div>
										<div style="float: right">
											<i class="el-icon-question" style="margin-right: 5px"></i>
											<a href="/Login/ForgetPassword"  style="font-size: 14px;" target="helpLink">忘记密码</a>
										</div>
									</div>
									<div style="margin-top: 80px;text-align: center">
										<el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
									</div>
									<div style="font-size: 10px;color: #8c939d;margin-top: 40px;margin-left: 10px;margin-right: 10px">
										温馨提示：
										<br>
										1.账号为“管理员ID”，超级管理员账号为8位工资号，不足8位的前面用0补齐，如工资号7826的账号为00007826。
										<br>
										2.初始密码为“18位或15位身份证号后六位，字母‘x’小写”或与账号相同；留学生初始密码为护照号后六位。
										<br>
										3.咨询电话：88888888。
									</div>

								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="二维码登录">
							<div class="QRlogin">
								<div class="userlogin1">
									饱了么后台账号登录
								</div>
								<div style="margin-top: 20px;color: #8c939d;font-size: 14px;text-align: center">
									手机扫码 安全防盗
								</div>
								<div style="margin-top: 20px;color: #8c939d;font-size: 14px;">
									<img src="../../../static/loginQR.png"
										 class="avatar"
										 width=60%
										 height=50%
										 style="margin-top: 5px;margin-left: 68px">
								</div>
								<div style="text-align: center;margin-top: 20px">
									<el-tag style="border-radius: 30px">扫二维码登录饱了么后台管理系统</el-tag>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>

				</div>
			</div>
		</div>
		<div class="loginBottom">
			<div class="lb1">
				<div class="lb1-1">东北大学软件学院2017级魏子淇组 版权所有 Copyright@2020 Northeastern University Wei Ziqi Group All Rights Reserved.</div>
				<div class="lb1-1">学校地址：辽宁省沈阳市浑南区创新路195号 邮编：110167</div>
			</div>
			<div class="lb2">
				<div class="lb2-1">总访问量：102378 当日访问量：8686 日均访问量：10873</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		//单页面中不支持前面的data:{}方式
		data() {
			//相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
			return {
				logoPic:'../../../static/logo-white.png',//logo图片地址
				contain:'contain',
				//之前是在里面直接写username，password等等，但是这里要写return
				//因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
				//比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
				//同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
				//可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
				//这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
				// pics:[{
				// 	pname:'../../../static/1.jpg',
				// }, {
				// 	pname: '../../../static/2.jpg',
				// },{
				// 	pname:'../../../static/3.jpg',
				// },{
				// 	pname:'../../../static/4.jpg',
				// }],
				pics:['../../../static/1.jpg','../../../static/2.jpg','../../../static/3.jpg','../../../static/4.jpg'],
				remember:false,
				user: {
					manager_username: 'admin2',
					manager_password: 'admin',
					//为了登录方便，可以直接在这里写好用户名和密码的值
				},
				//显示图片部分图片地址
				imgList: [
					{id: 0, idView: require('../../../static/FOOD.jpg')},
					{id: 1, idView: require('../../../static/MSR.jpg')},
					{id: 2, idView: require('../../../static/MERCH.jpg')},
				]
			}
		},
		methods: {
			//跳转页面
			forgetPassword() {
				this.$router.push({ path:'/Login/ForgetPassword' });
			},
			//登录
			doLogin() { //一点击登录按钮，这个方法就会执行
				//alert(JSON.stringify(this.user)) //可以直接把this.user对象传给后端进行校验用户名和密码
                //使用post方法，提交session
                this.axios.defaults.withCredentials = true;
                this.axios.post(`http://localhost:8080/login/managerLogin`,this.user).then(r=>{
                    if(r.data.msg=='success'){
						this.$message({
						          message: '登录成功',
						          type: 'success'
						        });
						console.log(r.data);
						this.$store.commit('changeLogin',true);
						this.$store.commit('changeUser',r.data.manager);
                        this.$router.push({path:'/Home'});
                    }else{
						this.$message.error('登录失败');
                        
                        // this.erroMsg='对不起，登陆失败';
                    }
                });
			}
		}
	}
</script>
<style lang="less" scoped>
.loginNew{
	width:100%;
	height:100%;
	display: flex;
	flex-direction: column;
	.loginTop{
		flex: 1;
		display: flex;
		background-color: #409EFF;
		.lt1{
			flex: 1;
			-background-color: #42b983;
		}
		.lt2{
			flex: 4;
			display: flex;
			-background-color: lightcoral;
			text-align: left;
			margin-top: 10px;
			margin-bottom: 10px;
			margin-left: 10px;
			margin-right: 10px;
			.lt2-1{
				font-size: 34px;
				font-weight: bolder;
				color: white;
				line-height: 100px;
			}
			.lt2-2{
				font-size: 26px;
				font-weight: bolder;
				color: white;
				line-height: 100px;
				margin-left: 10px;
			}
			.lt2-3{
				font-size: 18px;
				font-weight: bolder;
				color: white;
				line-height: 100px;
				margin-left: 10px;
			}
		}
		.lt3{
			flex: 1;
			display: flex;
			-background-color: aqua;
			text-align: left;
			align-content: center;
			.lt3-1{
				font-size: 18px;
				font-weight: bolder;
				color: white;
				line-height: 120px;
				margin-left: 10px;
				a:link {color:white;}      /* 未访问链接*/
				a:visited {color:white;}  /* 已访问链接 */
				a:hover {color:white;}  /* 鼠标移动到链接上 */
				a:active {color:white;}  /* 鼠标点击时 */
			}
		}
	}
	.loginMedium{
		flex: 8;
		display: flex;
		background-color: #f1f9fe;
		.lmLeft{
			flex: 4;
			-background-color: lightcoral;
			.lml1{
				margin-top: 100px;
				margin-bottom: 50px;
				margin-left: 150px;
				margin-right: 100px;
			}
			.el-carousel__item h3 {
				color: #475669;
				font-size: 14px;
				opacity: 0.75;
				line-height: 150px;
				margin: 0;
			}

			.el-carousel__item:nth-child(2n) {
				-background-color: #99a9bf;
			}

			.el-carousel__item:nth-child(2n+1) {
				-background-color: #d3dce6;
			}
		}
		.lmRight{
			flex: 2;
			display: flex;
			-background-color: #42b983;
			.lmr{
				display: flex;
				justify-content: left;
				margin-top: 50px;
				margin-left: 50px;
				-margin-right: 100px;
				.userlogin{
					display: flex;
					flex-direction: column;
					width: 330px;
					.userlogin1{
						flex: 1;
						font-size: 20px;
						text-align: center;
						font-weight: bolder;
						color: #585d5e;
						margin-top: 20px;
						margin-bottom: 20px;
						-background-color: darkgoldenrod;
					}
					.userlogin2{
						flex: 5;
						-background-color: aqua;
					}
				}
				.QRlogin{
					display: flex;
					flex-direction: column;
					width: 330px;
					.userlogin1{
						flex: 1;
						font-size: 20px;
						text-align: center;
						font-weight: bolder;
						color: #585d5e;
						margin-top: 20px;
						margin-bottom: 20px;
						-background-color: darkgoldenrod;
					}
				}
			}

		}
	}
	.loginBottom{
		flex: 1;
		display: flex;
		background-color: #d3dce6;
		.lb1{
			flex: 2;
			margin-top: 15px;
			margin-left: 100px;
			margin-bottom: 10px;
			font-size: 12px;
			color: gray;
			-background-color: #42b983;
			.lb1-1{
				margin-top: 5px;
			}
		}
		.lb2{
			flex: 1;
			-background-color: lightcoral;
			margin-top: 15px;
			margin-left: 100px;
			margin-bottom: 10px;
			font-size: 12px;
			color: gray;
			.lb2-1{
				margin-top: 5px;
			}
		}
	}
	.clearfix {
		text-align: center;
	}
	.logintable{
		text-align: center;
		.loginbutton{
			width: 150px;
			margin-top: 10px;
		}
	}
}

</style>