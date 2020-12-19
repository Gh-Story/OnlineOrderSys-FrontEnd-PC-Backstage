<template>
	<div class="taskManage">
		<div class="taskManageLeft" style="width: 600px;">
			<div class="leftTop">
				<el-card class="box-card">
					<div class="lt">
						<div class="lt1">
							任务查找 :
						</div>
						<div class="lt2">
							<el-input
									placeholder="请输入任务相关信息"
									v-model="queryTask.name"
									prefix-icon="el-icon-search"
									clearable>
							</el-input>
						</div>
						<div class="lt3">
							<el-button @click="queryTasks" type="primary">查询任务</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div class="leftMedium">
				<el-card class="box-card" style="height: 140px;">
					<div class="lm" style="margin-top: 10px;">
						<div class="lm1">
							任务状态 :
						</div>
						<div class="lm2">
							<el-radio-group  size="small" v-model="queryTask.type" @change="queryTasks">
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="使用中"></el-radio-button>
								<el-radio-button label="待使用"></el-radio-button>
								<el-radio-button label="已作废"></el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lm">
						<div class="lm1">
							任务需求 :
						</div>
						<div class="lm2">
							<el-input v-model="queryTask.min_need" size="mini" style="width: 80px;" placeholder="最小值"></el-input>
							<span style="padding-left: 10px;padding-right: 10px;padding-top: 3px;color: #585d5e">&nbsp;—&nbsp;</span>
							<el-input  v-model="queryTask.max_need" size="mini" style="width: 80px;" placeholder="最大值"></el-input>
						</div>
					</div>

				</el-card>
			</div>
			<div class="foodManageBottom">
				<el-card class="box-card" style="height: 500px">
					<div class="fmbTop">
						<div class="fmt1">
							任务管理详细列表
						</div>
						<div class="fmt2">
							<el-button @click="" size="small" icon="el-icon-delete" plain>批量删除</el-button>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="fmbBottom">
						<el-table
								ref="multipleTable"
								:data="tasks"
								height="320"
								v-loading="loading"
								tooltip-effect="dark"
								style="width: 100%;align-content: center;text-align: center"
								@selection-change="handleSelectionChange">
							<el-table-column
									type="selection"
									align="center"
									width="100">
							</el-table-column>
							<el-table-column
									label="任务编号"
									prop="ID"
									align="center"
									width="80"
							>
							</el-table-column>
							<el-table-column
									label="任务名称"
									prop="name"
									align="center"
									width="150">
							</el-table-column>
							<el-table-column
									label="需求订单数量"
									prop="need"
									align="center"
									width="160">
							</el-table-column>
							<el-table-column
									label="红包编号"
									prop="redpacket_id"
									align="center"
									width="100">
							</el-table-column>
							<el-table-column
									label="任务状态"
									prop="state"
									align="center"
									width="180">
								<template slot-scope="scope">
									<el-tag
											v-if="scope.row.state==1"
											size="mini"
											type="success"
											effect="plain">
										使用中
									</el-tag>
									<el-tag
											v-if="scope.row.state==2"
											size="mini"
											type="primary"
											effect="plain">
										未使用
									</el-tag>
									<el-tag
											v-if="scope.row.state==3"
											size="mini"
											type="danger"
											effect="plain">
										已作废
									</el-tag>

								</template>
							</el-table-column>
							<el-table-column
									align="center"
									label="操作"
									width="240"
									show-overflow-tooltip>
								　<template slot-scope="scope">
								<el-button
										@click="updateTasks(scope.row)"
										type="text"
										size="small"
										class="el-icon-edit-outline">
									编辑
								</el-button>
								<el-button
										@click="delTask(scope.row)"
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
		<div class="taskManageRight">
			<el-card class="box-card" style="height: 740px;">
				<div slot="header" class="clearfix">
					<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">任务操作</div>
				</div>
				<div>
					<span style="float: right"><i class="el-icon-refresh" @click="refresh" style="color: lightcoral;"></i></span>
				</div>
				<br>
				<br><br>
				<div class="foodOperate">
					<el-form :model="task" label-width="100px">
						<el-form-item label="任务名称">
							<el-input  placeholder="请输入任务名称" v-model="task.name" style="width:90%;"></el-input>
						</el-form-item>
						<br>
						<el-form-item label="使用红包">
							<el-select v-model="task.redpacket_id" clearable  placeholder="请选择活动区域">
								<div v-for="item in redpackets">
									<el-option  :label="item.redpacket_name" :value="item.redpacket_id"></el-option>
								</div>
							</el-select>
						</el-form-item>
						<br>
						<el-form-item label="需求数量">
							<el-input v-model="task.need" placeholder="请输入需求订单数量" style="width:65%"autocomplete="off"></el-input>
						</el-form-item>
						<br>
						<el-form-item label="开启任务">
							<el-radio-group v-model="task.state" >
								<el-radio label="启用"></el-radio>
								<el-radio label="待用"></el-radio>
							</el-radio-group>
						</el-form-item>
						<br>
						<br>
						<br>
						<el-form-item label-width="0px" style="text-align: center">
							<el-button @click="submitAdd" type="primary" plain>新建</el-button>
							<el-button @click="submitUpdate" type="success" plain>修改</el-button>
						</el-form-item>
						<br>
						<br>
						<br>
						<br>
					</el-form>
				</div>
			</el-card>
		</div>

		<div class="dialog">
			<el-dialog title="新增任务" :visible.sync="dialogFormVisible">
			  <el-form >
				<el-form-item label="任务名称" :label-width="formLabelWidth">
				  <el-input v-model="addTask.name" style="width:150px"autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="任务使用红包" :label-width="formLabelWidth">
				  <el-select v-model="addTask.redpacket_id" placeholder="请选择活动区域">
					<div v-for="item in redpackets">
						<el-option  :label="item.redpacket_name" :value="item.redpacket_id"></el-option>
					</div>

				  </el-select>
				</el-form-item>
				<el-form-item label="需求订单数量" :label-width="formLabelWidth">
				  <el-input v-model="addTask.need" style="width:150px"autocomplete="off"></el-input>

				</el-form-item>
				<el-form-item label="是否开启任务" :label-width="formLabelWidth">
				  <el-radio-group v-model="addTask.state">
					<el-radio label="启用"></el-radio>
					<el-radio label="待用"></el-radio>
				  </el-radio-group>

				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelAdd()">取 消</el-button>
				<el-button type="primary" @click="submitAdd()">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		<div class="dialog1">
			<el-dialog title="修改任务" :visible.sync="update_dialogFormVisible">
			  <el-form >
				<el-form-item label="任务名称" :label-width="formLabelWidth">
				  <el-input v-model="updateTask.name" style="width:150px"autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="任务使用红包" :label-width="formLabelWidth">
				  <el-select v-model="updateTask.redpacket_id" placeholder="请选择活动区域">
					<div v-for="item in redpackets">
						<el-option  :label="item.redpacket_name" :value="item.redpacket_id"></el-option>
					</div>
				  </el-select>
				</el-form-item>
				<el-form-item label="需求订单数量" :label-width="formLabelWidth">
				  <el-input v-model="updateTask.need" style="width:150px"autocomplete="off"></el-input>

				</el-form-item>
				<el-form-item label="任务状态" :label-width="formLabelWidth">
				  <el-select v-model="updateTask.state"   placeholder="请选择活动区域">
					<el-option label="使用中" value="使用中"></el-option>
					<el-option label="待使用" value="待使用"></el-option>
					<el-option label="已作废" value="已作废"></el-option>
				  </el-select>
				</el-form-item>

			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelUpdate()">取 消</el-button>
				<el-button type="primary" @click="submitUpdate()">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
		  return {
			loading:true,
			currentpage:1,
			pagesize:5,
			files_count:80,
			queryTask:{
				name:'',
				type:'全部',
				min_need:'',
				max_need:'',
			},
			updateTask:{
				ID:'',
				name:'',
				state:'',
				need:'',
				redpacket_id:''
			},
			addTask:{
				name:'',
				state:'',
				need:'',
				redpacket_id:'',

			},
			  task:{
				  ID:'',
				  name:'',
				  state:'',
				  need:'',
				  redpacket_id:''
			  },
			redpackets:[{
					redpacket_id:'1',
					redpacket_name:'3元红包',
				},{
					redpacket_id:'2',
					redpacket_name:'2元红包',
				},{
					redpacket_id:'3',
					redpacket_name:'10元红包',
				}
			],
			tasks: [
				{
				  ID: '1',
				  name:'0622任务',
				  need: '2',
				  redpacket_id:'6',
				  state:'3',

				},{
				  ID: '2',
				  name:'0622任务',
				  need: '2',
				  redpacket_id:'6',
				  state:'3',
				}
			],
			dialogFormVisible: false,
			//dialogFormVisible: false,
			update_dialogFormVisible: false,
			formLabelWidth: '120px',
		  }
		},
		created(){
			this.queryTasks();
			this.query();
		},
		methods: {
			refresh(){
				this.task.ID = '';
				this.name.ID = '';
				this.state.ID = '';
				this.need.ID = '';
				this.redpacket_id.ID = '';
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			query(){
				this.axios.default.withCredentials=true;
				this.axios.get('http://localhost:8080/redpacket/selectAll').then(r=>{
					console.log(r.data);
					let list = r.data.msg.redpacketList;
					this.redpackets=[];
					for(let i=0;i<list.length;i++){
						if(list[i].redpacketState != 1){
							continue;
						}
						let item={redpacket_id:'',redpacket_name:''};
						item.redpacket_id=list[i].redpacketId;
						item.redpacket_name=list[i].redpacketName;
						if(list[i].redpacketType==3){
							this.redpackets.push(item);
						}
					}
				});
			},
			delTask(row){
				let form={'mission_id':row.ID};
				console.log(row.ID);
				this.axios.default.withCredentials=true;
				this.axios.post('http://localhost:8080/mission/deleteMission',form).then(r=>{
					console.log(r.data);
					this.queryTasks();
					//alert(r.data.detail);
				});

			},
			cancelUpdate(){
				this.updateTask.name='';
				this.updateTask.state='';
				this.updateTask.need='';
				this.updateTask.redpacket_id='';
				this.update_dialogFormVisible = false;
			},
			updateTasks(row){

				//this.redpackets=queryRedpackets();
				this.updateTask.name=row.name;
				this.updateTask.ID= row.ID;
				if(row.state==1) {
					this.updateTask.state = '使用中';
				}else if(row.state==2) {
					this.updateTask.state = '待使用';
				}else {
					this.updateTask.state = '已作废';
				}
				this.updateTask.need= row.need;
				this.updateTask.redpacket_id= row.redpacket_id;
				//this.update_dialogFormVisible = true;

				this.task = this.updateTask;
			},
			submitUpdate(){
				this.updateTask = this.task;

				let updateTask = {missionId:'',missionName:'',missionState:'',missionNeed:'',
							   redpacketId:''};
				updateTask.missionId=this.updateTask.ID;
				updateTask.missionName=this.updateTask.name;
				updateTask.missionNeed=this.updateTask.need;
				updateTask.redpacketId=this.updateTask.redpacket_id;

				if(this.updateTask.state=="使用中")
				  updateTask.missionState=1;
				else if(this.updateTask.state=="待使用")
				  updateTask.missionState=2;
				else
				  updateTask.missionState=3;
				console.log(updateTask);
				this.axios.post('http://localhost:8080/mission/updateMission',updateTask).then(r=>{
					console.log(r.data);
					this.queryTasks();
				});
				this.update_dialogFormVisible = false;
			},
			cancelAdd(){
				this.addTask.name='';
				this.addTask.state='';
				this.addTask.need='';
				this.addTask.redpacket_id='';
				this.dialogFormVisible = false;
			},
			submitAdd(){
				this.addTask = this.task;

				let addTask = {missionName:'',missionState:'',missionNeed:'',
							   redpacketId:''};
				addTask.missionName=this.addTask.name;
				addTask.missionNeed=this.addTask.need;
				addTask.redpacketId=this.addTask.redpacket_id;

				if(this.addTask.state=="启用")
				  addTask.missionState=1;
				else if(this.addTask.state=="待用")
				  addTask.missionState=2;

				console.log(addTask);
				this.axios.post('http://localhost:8080/mission/addMission',addTask).then(r=>{
					console.log(r.data);
					this.queryTasks();
				});
				this.dialogFormVisible = false;

			},
			addTasks(){
				//this.redpackets=queryRedpackets();
				this.dialogFormVisible = true;
			},
			queryTasks(){
				this.currentpage=1;
				this.queryTasksPage();
			},
			queryTasksPage(){

				let queryTask={name:'',type:'0',min_need:'0',max_need:'0',page:this.currentpage,rows:this.pagesize};
				queryTask.name=this.queryTask.name;
				queryTask.min_need=this.queryTask.min_need;
				queryTask.max_need=this.queryTask.max_need;
				queryTask.type=0;
				if(this.queryTask.type=="使用中")
				  queryTask.type=1;
				else if(this.queryTask.type=="待使用")
				  queryTask.type=2;
				else if(this.queryTask.type=="已作废")
				  queryTask.type=3;
				console.log(queryTask);
				this.axios.default.withCredentials=true;
				this.axios.post('http://localhost:8080/mission/selectByDetailPage',queryTask).then(r=>{
					console.log(r.data);
					let list = r.data.msg.pageInfo.list;
					this.tasks=[];
					for(let i=0;i<list.length;i++){
						let item={ID:'',name:'',need: '',redpacket_id:'',state:'3',};
						item.ID=list[i].missionId;
						item.name=list[i].missionName;
						item.need=list[i].missionNeed;
						item.redpacket_id=list[i].redpacketId;
						item.state=list[i].missionState;
						this.tasks.push(item);
					}
					this.files_count=r.data.msg.pageInfo.total;
					this.loading=false;
				});

			},
			formatDate(value){
			  if(value.state==1)
			    return "使用中";
			  else if(value.state==2)
				return "待使用";
			  else if(value.state==3)
			    return "已作废";
			},
			handleSizeChange:function(size){
				this.pagesize = size;
				this.currentpage=1;
				this.queryTasks();
			},
			// 控制页面的切换
			handleCurrentChange: function(currentpage) {
				this.currentpage = currentpage;
				// console.log(currentPage)
				this.queryTasksPage();
			},

		},
	}
</script>

<style lang="less" scoped>
	.taskManage{
		width:100%;
		height:100%;
		display: flex;
		.taskManageLeft{
			flex:2;
			width: 600px;
			flex-direction: column;
			-background-color: lightcoral;
			display: flex;
			.leftTop{
				flex:1;
				-background-color: lightskyblue;
				padding-top: 10px;
				padding-bottom: 5px;
				padding-left: 10px;
				padding-right: 10px;
				display: flex;
				flex-direction: column;
				text-align: center;
				.lt {
					display: flex;
					text-align: center;
					-background-color: lightcoral;
					.lt1 {
						flex: 1;
						-background-color: #42b983;
						padding-top: 10px;
						text-align: center;
					}
					.lt2 {
						flex: 3;
						-background-color: coral;
						padding-top: 0px;
						text-align: center;
					}
					.lt3 {
						flex: 4;
						-background-color: azure;
						padding-top: 0px;
						text-align: right;
					}
				}
			}
			.leftMedium{
				flex:2;
				-background-color: aqua;
				padding-top: 5px;
				padding-bottom: 0px;
				padding-left: 10px;
				padding-right: 10px;
				display: flex;
				flex-direction: column;
				text-align: center;
				.lm{
					display: flex;
					text-align: center;
					-background-color: lightcoral;
					.lm1{
						flex:1;
						padding-top: 10px;
						-background-color: #42b983;
						text-align:center;
					}
					.lm2{
						flex:7;
						padding-top: 5px;
						padding-bottom: 5px;
						padding-left: 5px;
						-background-color: dodgerblue;
						text-align:left;
						display: flex;
						-flex-direction: column;
					}
					.lm3{
						flex:7;
						padding-top: 5px;
						padding-bottom: 5px;
						padding-left: 5px;
						-background-color: dodgerblue;
						text-align:left;
						display: flex;
						flex-direction: column;
						.lm3-1{
							flex:1;
							padding-left: 0px;
						}
						.lm3-2{
							flex:1;
							padding-left: 0px;
						}
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
		.taskManageRight{
			flex:1;
			-background-color: lightgreen;
			padding-top: 10px;
			padding-bottom: 10px;
			padding-left: 10px;
			padding-right: 10px;
			.foodOperate{

			}
		}

	}
</style>
