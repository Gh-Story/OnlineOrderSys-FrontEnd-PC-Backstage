<template>
	<div class="user">
		<div class="userLeft">
			<div class="userLeftTop">
				<el-card class="box-card">
					<div class="fmt">
						<div class="fmt1">
							用户查找 :
						</div>
						<div class="fmt2">
							<el-input
									placeholder="请输入用户相关信息查询"
									v-model="formInline.nickname"
									prefix-icon="el-icon-search"
									clearable>
							</el-input>
						</div>
						<div class="fmt3">
							<el-button @click="query" type="primary">查询用户</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div class="userLeftMedium">
				<el-card class="box-card">
					<div class="lm">
						<div class="lm1">
							用户类型 :
						</div>
						<div class="lm2">

							<el-radio-group  size="small" v-model="userTypeValue" @change="userTypeSelect">
								<el-radio-button label="0"  >全部</el-radio-button>
								<el-radio-button label="2" >会员</el-radio-button>
								<el-radio-button label="1"  >普通用户</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lm">
						<div class="lm1">
							帐号状态 :
						</div>
						<div class="lm2">
							<el-radio-group  size="small" v-model="acStateValue"  @change="acStateSelect">
								<el-radio-button label="0" >全部</el-radio-button>
								<el-radio-button label="1" >使用中</el-radio-button>
								<el-radio-button label="2" >已注销</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lm">
						<div class="lm1">
							用户生日 :
						</div>
						<div class="lm3">
							<el-radio-group size="small">
								<div style="-background-color: red;display: inline;display: flex">
									<div style="">
										<el-button size="small" @click="timeSelect">全部</el-button>
									</div>
									<el-date-picker
											size="small"
											v-model="timeValue"
											type="daterange"
											align="right"
											unlink-panels
											range-separator="至"
											start-placeholder="开始日期"
											end-placeholder="结束日期"
											value-format="yyyy-MM-dd"
											@change="timeChange">
									</el-date-picker>
								</div>
							</el-radio-group>
						</div>
					</div>

				</el-card>

			</div>
			<div class="userLeftBottom">
				<el-card class="box-card" style="height: 480px">
					<div class="fmbTop">
						<div class="fmt1">
							用户管理详细列表
						</div>
						<div class="fmt2">
							<el-button @click="" size="small" icon="el-icon-delete" plain>批量删除</el-button>
							<el-button @click="" size="small" icon="el-icon-plus" plain>新增用户</el-button>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="fmbBottom">
						<el-table
								ref="multipleTable"
								:data="UserData"
								height="300"
								tooltip-effect="dark"
								style="width: 100%;align-content: center;text-align: center"
								v-loading="loading">
							<el-table-column
									type="selection"
									align="center"
									width="80">
							</el-table-column>
							<el-table-column
									label="用户编号"
									prop="customerId"
									width="100"
									align="center">
							</el-table-column>
							<el-table-column
									label="用户昵称"
									prop="customerNickname"
									align="center"
									width="160">
							</el-table-column>
							<el-table-column
									label="用户姓名"
									prop="customerName"
									align="center"
									width="160">
							</el-table-column>
							<el-table-column
									label="用户类型"
									align="center"
									width="150">
								<template slot-scope="scope">
									<el-tag
											v-if="scope.row.customerType==1"
											:key="scope.row.customerType"
											size="mini"
											type=""
											effect="plain">
										普通
									</el-tag>
									<el-tag
											v-if="scope.row.customerType==2"
											:key="scope.row.customerType"
											size="mini"
											type="warning"
											effect="plain">
										会员
									</el-tag>
								</template>
							</el-table-column>
							<el-table-column
									label="出生日期"
									prop="customerBirthday"
									align="center"
									width="150">
							</el-table-column>
							<el-table-column
									label="账号状态"
									align="center"
									width="100">
								<template slot-scope="scope">
									<el-tag
											v-if="scope.row.customerState==1"
											:key="scope.row.customerState"
											size="mini"
											type=""
											effect="plain">
										使用中
									</el-tag>
									<el-tag
											v-if="scope.row.customerState==2"
											:key="scope.row.customerState"
											size="mini"
											type="info"
											effect="plain">
										已注销
									</el-tag>
								</template>
							</el-table-column>
							<el-table-column
									align="center"
									label="操作"
									width="200"
									show-overflow-tooltip>
								<template slot-scope="scope">
									<el-button
											@click="EditRow(scope.$index, UserData)"
											type="text"
											size="small"
											class="el-icon-edit-outline">
										查看
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div style="margin-top: 10px;float: right;">
						<el-pagination
						  background      
						  @size-change="handleSizeChange"
						  @current-change="handleCurrentChange"
						  :current-page="currentpage"
						  :page-sizes="[5,10,15]"
						  :page-size="pagesize"
						  layout="total,jumper,prev, pager, next,sizes"
						  :total="files_count"
						></el-pagination>
					</div>
					
				</el-card>
			</div>
		</div>
		<div class="userRight">
			<el-card class="box-card" style="height: 750px;">
				<div slot="header" class="clearfix">
					<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">用户详细信息</div>
				</div>
				<br>
				<div class="foodOperate">
					<el-form  ref="info" :model="info" label-width="100px">
						<br /><br />
						<el-form-item label="用户编号">
							<span style="width:90%;padding-left: 20px">{{info.customerId}}</span>
						</el-form-item>
						<el-form-item label="用户昵称">
							<span style="width:90%;padding-left: 20px">{{info.customerNickname}}</span>
						</el-form-item>
						<el-form-item label="用户姓名">
							<span style="width:90%;padding-left: 20px">{{info.customerName}}</span>
						</el-form-item>
						<el-form-item label="用户性别">
							<span style="width:90%;padding-left: 20px">{{info.customerSex}}</span>
						</el-form-item>
						<el-form-item label="用户类型">
							<span v-show="info.customerType==2" style="padding-left: 20px" class="text item">会员用户</span>
							<span v-show="info.customerType==1" style="padding-left: 20px" class="text item">普通用户</span>
						</el-form-item>
						<el-form-item label="出生日期">
							<span style="width:90%;padding-left: 20px">{{info.customerBirthday}}</span>
						</el-form-item>
						<el-form-item label="帐号状态">
							<span v-show="info.customerState==2" style="padding-left: 20px" class="text item">已注销</span>
							<span v-show="info.customerState==1" style="padding-left: 20px" class="text item">使用中</span>
						</el-form-item>
						<br>
						<br>
						<br>
						<br>
						<br>
					</el-form>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'user',
		created() {
			this.manager_type=0;
			this.acStateValue=0;
			this.userTypeValue=0;
			this.formInline.nickname='';
			this.timeValue=['1970-01-01','1970-12-31'];
			this.getUser();
		},
		methods: {
			timeChange(){
				if(this.timeValue==null || this.timeValue==''){
				}else{
					console.log(this.timeValue);
					if(this.acStateValue==''||this.acStateValue==null){
						this.acStateValue=0;
					}
					if(this.formInline.nickname==null){
						this.formInline.nickname=='';
					}
					if(this.userTypeValue==''||this.userTypeValue==null){
						this.userTypeValue=0;
					}
					this.currentpage=1;
					this.getUser();
				}
			},
			query(){
				if(this.acStateValue==''||this.acStateValue==null){
					this.acStateValue=0;
				}
				if(this.formInline.nickname==null){
					this.formInline.nickname=='';
				}
				if(this.userTypeValue==''||this.userTypeValue==null){
					this.userTypeValue=0;
				}
				if(this.timeValue==null || this.timeValue==''){
					this.timeValue=['1970-01-01','1970-12-31'];
				}
				this.currentpage=1;
				this.getUser();
			},
			timeSelect(){
				this.timeValue=['1970-01-01','1970-12-31'];
				
				if(this.acStateValue==''||this.acStateValue==null){
					this.acStateValue=0;
				}
				if(this.formInline.nickname==null){
					this.formInline.nickname=='';
				}
				if(this.userTypeValue==''||this.userTypeValue==null){
					this.userTypeValue=0;
				}
				this.currentpage=1;
				this.getUser();
			},
			userTypeSelect(){
				
				if(this.userTypeValue=='全部'){
					this.userTypeValue=0;
				}else if(this.userTypeValue=='会员'){
					this.userTypeValue=2;
				}else if(this.userTypeValue=='普通用户'){
					this.userTypeValue=1;
				}
				
				if(this.acStateValue==''||this.acStateValue==null){
					this.acStateValue=0;
				}
				if(this.timeValue==''||this.timeValue==null){
					this.timeValue=['1970-01-01','1970-12-31'];
				}
				if(this.formInline.nickname==null){
					this.formInline.nickname=='';
				}
				this.currentpage=1;
				this.getUser();
			},

			acStateSelect(){
				
				if(this.acStateValue=='全部'){
					this.acStateValue=0;
				}else if(this.acStateValue=='使用中'){
					this.acStateValue=1;
				}else if(this.acStateValue=='已注销'){
					this.acStateValue=2;
				}
				
				if(this.userTypeValue==''||this.userTypeValue==null){
					this.userTypeValue=0;
				}
				if(this.timeValue==''||this.timeValue==null){
					this.timeValue=['1970-01-01','1970-12-31'];
				}
				if(this.formInline.nickname==null){
					this.formInline.nickname=='';
				}
				this.currentpage=1;
				this.getUser();
			},
			EditRow(index, rows) {
				this.info.customerId=this.UserData[index].customerId;
				this.info.customerNickname=this.UserData[index].customerNickname;
				this.info.customerSex=this.UserData[index].customerSex;
				this.info.customerName=this.UserData[index].customerName;
				this.info.customerType=this.UserData[index].customerType;
				this.info.customerState=this.UserData[index].customerState;
				this.info.customerBirthday=this.UserData[index].customerBirthday;
				this.info.urow=index;
			},
			getUser(){
				console.log('getuser.....');
				let Data={
					customer_nickname:this.formInline.nickname,
					start_month:this.timeValue[0].substring(5,7),
					start_day:this.timeValue[0].substring(8,10),
					end_month:this.timeValue[1].substring(5,7),
					end_day:this.timeValue[1].substring(8,10),
					customer_type:this.userTypeValue,
					customer_state:this.acStateValue,
					page:this.currentpage,
					rows:this.pagesize,
				};
				
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/customer/selectByDetailPage',Data).then(r=>{
					console.log(r.data);
					this.UserData=[];
					for(let i=0;i<r.data.msg.pageInfo.length;i++){
						r.data.msg.pageInfo[i].customerBirthday=r.data.msg.pageInfo[i].customerBirthday.substring(0,10);
						this.UserData.push(r.data.msg.pageInfo[i]);
					}
					console.log(r.data.msg);
					this.files_count=r.data.msg.tot;
					this.loading=false;
					
				});
			},
			handleSizeChange:function(size){
				this.pagesize = size;
				this.currentpage=1;
				this.getUser();
			},
			// 控制页面的切换
			handleCurrentChange: function(currentpage) {
				this.currentpage = currentpage;
				// console.log(currentPage)
				
				this.getUser();
			},
		},
		data() {
			return {
				manager_type:'',
				info:{
					customerId:'854585',
					customerNickname:'好吃，色香味俱全',
					customerType:'1',
					customerState:'1',
					customerBirthday:'2016-05-14',
					customerName:'德州扒鸡',
					customerSex:'男',
					urow:'',
				},
				formInline: {
				    nickname: '',
				},
				userTypeValue:'',
				timeValue:'',
				acStateValue:'',
				UserData: [],
				loading:true,
				currentpage:1,
				pagesize:5,
				files_count:80,
			}
		},
		 
		
	}
</script>

<style lang="less" scoped>
.user{
	width: 100%;
	height: 100%;
	display: flex;
	.userLeft{
		flex: 2;
		flex-direction: column;
		-background-color: lightcoral;
		display: flex;
		.userLeftTop{
			flex:1;
			-background-color: lightskyblue;
			padding-top: 10px;
			padding-bottom: 5px;
			padding-left: 10px;
			padding-right: 10px;
			display: flex;
			flex-direction: column;
			text-align: center;
			.fmt{
				display: flex;
				text-align: center;
				-background-color: lightcoral;
				.fmt1{
					flex:1;
					-background-color: #42b983;
					padding-top: 10px;
					text-align:center;
				}
				.fmt2{
					flex:3;
					-background-color: coral;
					padding-top: 0px;
					text-align:center;
				}
				.fmt3{
					flex:4;
					-background-color: azure;
					padding-top: 0px;
					text-align:right;
				}
			}

		}
		.userLeftMedium{
			flex:1;
			-background-color: lightgreen;
			padding-top: 5px;
			padding-bottom: 5px;
			padding-left: 10px;
			padding-right: 10px;
			display: flex;
			flex-direction: column;
			text-align: center;
			.lm {
				display: flex;
				text-align: center;
				-background-color: lightcoral;

				.lm1 {
					flex: 1;
					padding-top: 10px;
					-background-color: #42b983;
					text-align: center;
				}

				.lm2 {
					flex: 7;
					padding-top: 5px;
					padding-bottom: 5px;
					padding-left: 5px;
					-background-color: dodgerblue;
					text-align: left;
					display: flex;
					-flex-direction: column;
				}

				.lm3 {
					flex: 7;
					padding-top: 5px;
					padding-bottom: 5px;
					padding-left: 5px;
					-background-color: dodgerblue;
					text-align: left;
					display: flex;
					flex-direction: column;

					.lm3-1 {
						flex: 1;
						padding-left: 0px;
					}

					.lm3-2 {
						flex: 1;
						padding-left: 0px;
					}
				}
			}
		}
		.userLeftBottom{
			flex:8;
			padding-top: 10px;
			padding-bottom: 5px;
			padding-left: 10px;
			padding-right: 10px;
			display: flex;
			flex-direction: column;
			-background-color: lightgreen;
			.fmbTop{
				flex:1;
				-background-color: #42b983;
				display: flex;
				.fmt1{
					flex:1;
					-background-color: #42b983;
					padding-top: 20px;
					text-align:center;
					font-size: 16px;
					-font-weight: bold;
				}
				.fmt2{
					flex:4;
					-background-color: azure;
					padding-top: 15px;
					padding-right: 20px;
					text-align:right;
				}
			}
			.fmbBottom {
				flex: 5;
				display: flex;
				-background-color: lightcoral;
			}


		}
	}
	.userRight{
		flex: 1;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;
	}
}
</style>
