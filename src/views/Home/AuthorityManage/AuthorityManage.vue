<template>
	<div class="authorityManage">
		<div class="am_left">
			<div class="foodManageTop">
				<el-card class="box-card">
					<div class="fmt">
						<div class="fmt1">
							管理员查找 :
						</div>
						<div class="fmt2">
							<el-input
									placeholder="请输入管理员相关信息查询"
									v-model="manager_name"
									prefix-icon="el-icon-search"
									clearable>
							</el-input>
						</div>
						<div class="fmt3">
							<el-button @click="query" type="primary">查询管理员</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div class="foodManageMedium">
				<el-card class="box-card">
					<div class="fmm">
						<div class="mm1">
							管理员类型 :
						</div>
						<div class="mm2">
							<el-radio-group  size="small" v-model="manager_type" @change="query">
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="普通"></el-radio-button>
								<el-radio-button label="超级"></el-radio-button>
							</el-radio-group>
						</div>
					</div>
				</el-card>
			</div>
			<div class="foodManageBottom">
				<el-card class="box-card" style="height: 570px">
					<div class="fmbTop">
						<div class="fmt1">
							管理员管理详细列表
						</div>
						<div class="fmt2">
							<el-button @click="" size="small" icon="el-icon-delete" plain>批量删除</el-button>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="fmbBottom">
						<el-table
								ref="multipleTable"
								:data="managers"
								height="390"
								:default-sort = "{prop: 'ID', order: 'ascending'}"
								tooltip-effect="dark"
								style="width: 100%;align-content: center;text-align: center"
								v-loading="loading"
								@selection-change="handleSelectionChange">
							<el-table-column
									type="selection"
									align="center"
									width="100">
							</el-table-column>
							<el-table-column
									label="编号"
									prop="ID"
									align="center"
									width="100"
							>
							</el-table-column>
							<el-table-column
									label="姓名"
									prop="name"
									align="center"
									width="150">
							</el-table-column>
							<el-table-column
									label="类型"
									align="center"
									width="100">
								<template slot-scope="scope">
									<el-tag
											v-if="scope.row.type==1"
											size="mini"
											type="success"
											effect="plain">
										普通
									</el-tag>
									<el-tag
											v-if="scope.row.type==2"
											size="mini"
											type="danger"
											effect="plain">
										超级
									</el-tag>

								</template>
							</el-table-column>
							<el-table-column
									label="用户名"
									prop="username"
									align="center"
									width="150">
							</el-table-column>
							<el-table-column
									prop="managerPassword"
									label="密码"
									align="center"
									width="100"
									show-overflow-tooltip>
							</el-table-column>
							<el-table-column
									label="性别"
									prop="managerSex"
									align="center"
									width="80">
							</el-table-column>
							<el-table-column
									label="身份证号"
									prop="managerIdno"
									align="center"
									width="180">
							</el-table-column>
							<el-table-column
									align="center"
									label="操作"
									width="160"
									fixed="right"
									show-overflow-tooltip>
								　<template slot-scope="scope">
								<el-button
										@click="update(scope.row)"
										type="text"
										size="small"
										class="el-icon-edit-outline">
									编辑
								</el-button>
								<el-button
										@click="del(scope.row)"
										type="text"
										size="small"
										class="el-icon-delete">
									删除
								</el-button>
								　</template>
							</el-table-column>
						</el-table>
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
					</div>

				</el-card>
			</div>
		</div>
		<div class="am_right">
			<el-card class="box-card" style="height: 750px;">
				<div slot="header" class="clearfix">
					<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">权限修改</div>
				</div>
				<br>
				<br />
				<div>
					<span style="font-weight: bolder;font-size: 14px;color: #409EFF;padding-left: 10px;">管理员编号 :{{manager.ID}}</span>
					<span style="float: right"><i class="el-icon-refresh" @click="refresh" style="color: lightcoral;"></i></span>
				</div>
				<br><br />
				<div class="foodOperate">
					<el-form  ref="form" :model="manager" label-width="100px">
						<el-form-item label="管理姓名">
							<el-input  placeholder="请输入管理员姓名" v-model="manager.name" style="width:90%;"></el-input>
						</el-form-item>
						<el-form-item label="用户名称">
							<el-input  placeholder="请输入管理员名称" v-model="manager.username" style="width:90%;"></el-input>
						</el-form-item>
						<el-form-item label="用户密码">
							<el-input  placeholder="请输入用户密码" v-model="manager.managerPassword" style="width:90%;"></el-input>
						</el-form-item>
						<el-form-item label="身份证号">
							<el-input  placeholder="请输入身份证号" v-model="manager.managerIdno" style="width:90%;"></el-input>
						</el-form-item>
						<el-form-item label="管理类型">
							<el-select v-model="manager.type" clearable filterable placeholder="请选择类别" style="width:70%;">
								<el-option label="普通管理员" value="普通管理员"></el-option>
								<el-option label="超级管理员" value="超级管理员"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="manager.managerSex" style="width:70%;">
								<el-radio label="男"></el-radio>
								<el-radio label="女"></el-radio>
							</el-radio-group>
						</el-form-item>
						<br><br>
						<br>
						<el-form-item label-width="0px" style="text-align: center">
							<el-button @click="add" type="primary" plain>新建</el-button>
							<el-button @click="submitUpdate" type="success" plain>修改</el-button>
						</el-form-item>
					</el-form>
				</div>
		  </el-card>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
		  return {
			manager_name:'',
			manager_type:'',
			managers: [{
			          ID: 1,
			          name: '刘美丽',
					  username:'666888哈哈哈',
			          type: '1',
					  managerSex:'男',
					  managerPassword:'123',
					  managerIdno:'110101199928376475',
					  managerFeature:'1.jpg',
			        },{
			          ID: 8,
			          name: '刘美丽',
					  username:'666888哈哈哈',
			          type: 2,
					  managerSex:'男',
					  managerPassword:'123',
					  managerIdno:'110101199928376475',
					  managerFeature:'1.jpg',
			        },{
			          ID: 3,
			          name: '刘美丽',
					  username:'666888哈哈哈',
			          type: '1',
					  managerSex:'男',
					  managerPassword:'123',
					  managerIdno:'110101199928376475',
					  managerFeature:'1.jpg',
			        },{
			          ID: 10,
			          name: '刘美丽',
					  username:'666888哈哈哈',
			          type: '2',
					  managerSex:'男',
					  managerPassword:'123',
					  managerIdno:'110101199928376475',
					  managerFeature:'1.jpg',
			        },{
			          ID: 11,
			          name: '刘美丽',
					  username:'666888哈哈哈',
			          type: '1',
					  managerSex:'男',
					  managerPassword:'123',
					  managerIdno:'110101199928376475',
					  managerFeature:'1.jpg',
			        }
			],
			multipleSelection: [],
			manager: {
			    ID:'',
				name: '',
				username:'',
			    type:'',
				managerSex:'',
				managerPassword:'',
				managerIdno:'',
				managerFeature:'1.jpg',
			},
			
			update_manager: {
			    ID:'111',
				name: '',
				username:'',
			    type:''
			},
			loading:true,
			currentpage:1,
			pagesize:5,
			files_count:80,
			
		  }
		},
		created(){
			this.search();
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val;
				//console.log(this.multipleSelection);
			},
			query(){
				this.currentpage=1;
				this.search();
			},
			search(){
				let manager_name=this.manager_name;
				let manager_type=0;
				if(this.manager_type=='普通')
					manager_type=1;
				else if(this.manager_type=='超级')
					manager_type=2;
				//console.log(manager_name,manager_type);
				this.axios.default.withCredentials=true;
				this.axios.post('http://localhost:8080/manager/selectByDetailPage',{
					manager_name:manager_name,
					manager_type:manager_type,
					page:this.currentpage,
					rows:this.pagesize,
				}).then(r=>{
					//console.log(r.data.msg);
					let list = r.data.msg.pageInfo.list;
					this.managers=[];
					for(let i=0;i<list.length;i++){
						let item={ ID:0,name: '',username:'',type: '',managerSex:'',
								   managerPassword:'',managerIdno:'',managerFeature:''};
						item.ID=list[i].managerId;
						item.name=list[i].managerName;
						item.username=list[i].managerUsername;
						item.type=list[i].managerType;
						item.managerSex=list[i].managerSex;
						item.managerPassword=list[i].managerPassword;
						item.managerIdno=list[i].managerIdno;
						item.managerFeature=list[i].managerFeature;
						this.managers.push(item);
					}
					this.files_count=r.data.msg.pageInfo.total;
					this.loading=false;
				});
			},
			update(row){
				//console.log(row);
				this.manager.ID=row.ID;
				this.manager.name=row.name;
				this.manager.username=row.username;
				this.manager.managerSex=row.managerSex;
				this.manager.managerPassword=row.managerPassword;
				this.manager.managerIdno=row.managerIdno;
				this.manager.managerFeature=row.managerFeature;
				if(row.type==1)
					this.manager.type='普通管理员';
				else
					this.manager.type='超级管理员';
				this.search();
			},
			del(row){
				this.axios.default.withCredentials=true;
				//console.log('managerid',row.ID);
				this.axios.post('http://localhost:8080/manager/deleteManager',{
					manager_id:row.ID,
				}).then(r=>{
					//console.log(r.data);
					this.search();
					this.$message({
					          message: r.data.detail,
					          type: 'success'
					        });
				});
			},
			add(){
				let add_manager={managerName: '',managerUsername:'',managerType:'',
									managerSex:'',managerPassword:'',managerIdno:'',managerFeature:'',authorityId:2,managerState: 1};
				if(this.manager.type=='普通管理员')
					add_manager.managerType=1;
				else
					add_manager.managerType=2;
				
				add_manager.managerName=this.manager.name;
				add_manager.managerUsername=this.manager.username;
				add_manager.managerSex=this.manager.managerSex;
				add_manager.managerPassword=this.manager.managerPassword;
				add_manager.managerIdno=this.manager.managerIdno;
				add_manager.managerFeature=this.manager.managerFeature;
				//console.log(add_manager);
				this.axios.default.withCredentials=true;
				this.axios.post('http://localhost:8080/manager/addManager',add_manager).then(r=>{
					this.$message({
					          message: r.data.detail,
					          type: 'success'
					        });
					this.search();
				});
				this.refresh();
			},
			submitUpdate(){
				let update_manager={managerId:'',managerName: '',managerUsername:'',managerType:'',managerFeature:'',
									managerSex:'',managerPassword:'',managerIdno:'',authorityId:2,managerState: 1};
				if(this.manager.type=='普通管理员')
					update_manager.managerType=1;
				else
					update_manager.managerType=2;
				update_manager.managerId=this.manager.ID;
				update_manager.managerName=this.manager.name;
				update_manager.managerUsername=this.manager.username;
				update_manager.managerSex=this.manager.managerSex;
				update_manager.managerPassword=this.manager.managerPassword;
				update_manager.managerIdno=this.manager.managerIdno;
				update_manager.managerFeature=this.manager.managerFeature;
				//console.log(update_manager);
				this.axios.default.withCredentials=true;
				this.axios.post('http://localhost:8080/manager/updateManager',update_manager).then(r=>{
					this.$message({
					          message: r.data.detail,
					          type: 'success'
					        });
					//console.log(r.data.detail);
				});
				this.refresh();
				//console.log(update_manager);
			},
			refresh(){
				  //alert(this.manager.type);
				  this.manager.id="";
				  this.manager.name="";
				  this.manager.username="";
				  this.manager.type="";
				  this.manager.managerIdno="";
				  this.manager.managerPassword="";
				  this.manager.managerSex="";
				  this.manager.managerFeature="";
			},
			formatDate(value){
				  if(value.type==1)
			        return "普通管理员";
				  else
				    return "超级管理员";
			},
			handleSizeChange:function(size){
				this.pagesize = size;
				this.search();
			},
			// 控制页面的切换
			handleCurrentChange: function(currentpage) {
				this.currentpage = currentpage;
				// console.log(currentPage)
				this.search();
			},
		  }
		
	}
</script>

<style lang="less" scoped>
.authorityManage{
	width:100%;
	height:100%;
	display: flex;
	-background-color: lightpink;
	.am_left{
		flex:2;
		width: 600px;
		flex-direction: column;
		-background-color: lightcoral;
		display: flex;
		.foodManageTop{
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
		.foodManageMedium{
			flex:1;
			-background-color: lightgreen;
			padding-top: 5px;
			padding-bottom: 5px;
			padding-left: 10px;
			padding-right: 10px;
			display: flex;
			flex-direction: column;
			text-align: center;
			.fmm{
				display: flex;
				text-align: center;
				-background-color: lightcoral;
				.mm1{
					flex:1;
					padding-top: 10px;
					-background-color: #42b983;
					text-align:center;
				}
				.mm2{
					flex:7;
					padding-top: 5px;
					padding-bottom: 5px;
					padding-left: 5px;
					-background-color: dodgerblue;
					text-align:left;
					display: flex;
					-flex-direction: column;
				}
			}
		}
		.foodManageBottom{
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
				-background-color: lightcoral;
			}


		}
	}
	.am_right{
		flex:1;
		-background-color: lightgreen;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;


	}
		
}


</style>
