<template>
	<div>
		<!--flex弹性盒子模型，justify-content：主抽 -->
		<div style="display: flex;justify-content: center;margin-top: 200px">
			<el-card>
				<div slot="header" class="clearfix">
					<span>管理员密码更新</span>
				</div>
				<el-form ref="form" :model="form" label-width="85px">
				  <el-form-item label="用户名">
				    <el-input v-model="form.manager_username"></el-input>
				  </el-form-item>
				  <el-form-item label="更新口令">
				    <el-input v-model="form.string"></el-input>
				  </el-form-item>
				  <el-form-item label="新密码">
				    <el-input v-model="form.manager_password"></el-input>
				  </el-form-item>
				  <el-form-item label="确认新密码">
				    <el-input v-model="form.manager_password_again"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="forgetPasswordSubmit">更新密码</el-button>
				  </el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
	        form: {
                manager_username:'',//用户名
                string:'',//口令
                manager_password:'',//新密码
                manager_password_again:'',//新密码确认
	        }
	      }
	    },
        created() {
            // this.axios.post(`http://localhost:8080/login/managerForgetPwd`,this.form).then(r=>{
            //     console.log(r);
            //     if(r.data.msg=='success'){
            //         alert('该用户存在');
            //     }else{
            //         alert('该用户不存在');
            //         this.$router.push({ path:'/' });
            //     }
            // });
        },
        methods: {
            forgetPasswordSubmit() {
                this.axios.defaults.withCredentials = true;
                console.log(this.form);
                this.axios.post(`http://localhost:8080/login/managerChangePwd`,this.form).then(r=>{
                    console.log(r);
                    if(r.data.msg=='success'){
						this.$message({
						          message: '更改密码成功',
						          type: 'success'
						        });

                        this.$router.push({path:'/'});
                    }else{
						this.$message.error('更改密码失败');
						
                        // this.erroMsg='对不起，登陆失败';
                    }
                });
	      }
	    }
	  }
</script>

<style lang="less" scoped>
	.clearfix {
		text-align: center;
	}
	.registertable{
		text-align: center;
		.loginbutton{
			width: 150px;
			margin-top: 10px;
		}
	}
</style>
