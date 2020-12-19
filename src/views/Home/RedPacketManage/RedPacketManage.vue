<template>
	<div class="redPacketManage">
		<div class="redPacketManageLeft" style="width: 600px;">
			<div class="leftTop">
				<el-card class="box-card">
					<div class="lt">
						<div class="lt1">
							红包查找 :
						</div>
						<div class="lt2">
							<el-input
									placeholder="请输入红包相关信息"
									v-model="query_redpack.name"
									prefix-icon="el-icon-search"
									clearable>
							</el-input>
						</div>
						<div class="lt3">
							<el-button @click="queryRedpackPage" type="primary">查询红包</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div class="leftMedium">
				<el-card class="box-card" style="height: 140px;">
					<div class="lm" style="margin-top: 10px;">
						<div class="lm1">
							红包类型 :
						</div>
						<div class="lm2">
							<el-radio-group  size="small" v-model="query_redpack.type" @change="queryRedpackPage">
								<el-radio-button label="全部"></el-radio-button>
								<el-radio-button label="普通"></el-radio-button>
								<el-radio-button label="会员"></el-radio-button>
								<el-radio-button label="任务"></el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lm">
						<div class="lm1">
							红包金额 :
						</div>
						<div class="lm2">
							<el-input v-model="query_redpack.min_money" size="mini" style="width: 80px;" placeholder="最小值"></el-input>
							<span style="padding-left: 10px;padding-right: 10px;padding-top: 3px;color: #585d5e">&nbsp;—&nbsp;</span>
							<el-input  v-model="query_redpack.max_money" size="mini" style="width: 80px;" placeholder="最大值"></el-input>
						</div>
					</div>

				</el-card>
			</div>
			<div class="foodManageBottom">
				<el-card class="box-card" style="height: 520px">
					<div class="fmbTop">
						<div class="fmt1">
							红包管理详细列表
						</div>
						<div class="fmt2">
							<el-button @click="" size="small" icon="el-icon-delete" plain>批量删除</el-button>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="fmbBottom">
						<el-table
								ref="multipleTable"
								:data="redpackets"
								height="340"
								v-loading="loading"
								tooltip-effect="dark"
								style="width: 100%;align-content: center;text-align: center"
								@selection-change="handleSelectionChange">
							<el-table-column
									type="selection"
									align="center"
									width="80">
							</el-table-column>
							<el-table-column
									label="红包编号"
									prop="ID"
									align="center"
									width="80"
							>
							</el-table-column>
							<el-table-column
									label="红包名称"
									prop="name"
									align="center"
									width="130">
							</el-table-column>
							<el-table-column
									label="红包类型"
									prop="type"
									:formatter="formatDate"
									align="center"
									width="80">
							</el-table-column>
							<el-table-column
									label="红包期限(天)"
									prop="duration"
									align="center"
									width="120">
							</el-table-column>
							<el-table-column
									label="红包门槛(元)"
									prop="threshold"
									align="center"
									width="120">
							</el-table-column>
							<el-table-column
									label="红包金额(元)"
									prop="money"
									align="center"
									width="120">
							</el-table-column>
							<el-table-column
									label="红包状态"
									prop="state"
									align="center"
									:formatter="formatDate1"
									width="100">
							</el-table-column>
							<el-table-column
									align="center"
									label="操作"
									width="180"
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
		<div class="redPacketManageRight">
			<el-card class="box-card" style="height: 760px;">
				<div slot="header" class="clearfix">
					<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">红包操作</div>
				</div>
				<div>
					<span style="float: right"><i class="el-icon-refresh" @click="refresh" style="color: lightcoral;"></i></span>
				</div>
				<br>
				<br><br>
				<div class="foodOperate">
					<el-form  ref="form" :model="redpack" label-width="100px">
						<el-form-item label="红包名称">
							<el-input  placeholder="请输入红包名称" v-model="redpack.name" style="width:90%;"></el-input>
						</el-form-item>
						<el-form-item label="红包类型">
							<el-select v-model="redpack.type" clearable filterable placeholder="请选择红包类型" style="width:70%;">
								<el-option label="普通" value="普通"></el-option>
								<el-option label="会员" value="会员"></el-option>
								<el-option label="任务" value="任务"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="红包期限">
							<el-input v-model="redpack.duration" placeholder="请输入红包期限（单位：天）" style="width:65%"autocomplete="off"></el-input>
							<span style="color: #585d5e;padding-left: 5px">&nbsp;&nbsp;(天)</span>
<!--							<el-input  placeholder="请输入美食介绍" v-model="add_redpack.addIntro" style="width:90%;"></el-input>-->
						</el-form-item>
						<el-form-item label="红包门槛">
							<el-input  placeholder="请输入红包门槛（单位：元）" v-model="redpack.threshold" style="width:65%;"></el-input>
							<span style="color: #585d5e;padding-left: 5px">&nbsp;&nbsp;(元)</span>
						</el-form-item>
						<el-form-item label="红包金额">
							<el-input  placeholder="请输入红包金额（单位：元）" v-model="redpack.money" style="width:65%;"></el-input>
							<span style="color: #585d5e;padding-left: 5px">&nbsp;&nbsp;(元)</span>
						</el-form-item>
						<el-form-item label="红包状态">
							<el-select v-model="redpack.state" clearable filterable placeholder="请选择红包状态" style="width:70%;">
								<el-option label="使用中" value="使用中"></el-option>
								<el-option label="待使用" value="待使用"></el-option>
								<el-option label="已废除" value="已废除"></el-option>
							</el-select>
						</el-form-item>
						<br>
						<br>
						<el-form-item label-width="0px" style="text-align: center">
							<el-button @click="addRedpack" type="primary" plain>新建</el-button>
							<el-button @click="updateRedpack" type="success" plain>修改</el-button>
						</el-form-item>
						<br>
						<br>
					</el-form>
				</div>
			</el-card>
		</div>
		<div class="dialog">
			<el-dialog title="新增红包" :visible.sync="dialogFormVisible">

			  <el-form >
				<el-form-item label="红包名称" :label-width="formLabelWidth">
				  <el-input v-model="add_redpack.name" style="width:150px"autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="红包类型" :label-width="formLabelWidth">
				  <el-select v-model="add_redpack.type" placeholder="请选择红包类型">
					<el-option label="普通" value="普通"></el-option>
					<el-option label="会员" value="会员"></el-option>
					<el-option label="任务" value="任务"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="红包期限" :label-width="formLabelWidth">
				  <el-input v-model="add_redpack.duration" style="width:150px"autocomplete="off"></el-input>
				  <label>&nbsp;&nbsp;天</label>
				</el-form-item>
				<el-form-item label="红包门槛" :label-width="formLabelWidth">
				  <el-input v-model="add_redpack.threshold" style="width:150px"autocomplete="off"></el-input>
				  <label>&nbsp;&nbsp;元</label>
				</el-form-item>
				<el-form-item label="红包金额" :label-width="formLabelWidth">
				  <el-input v-model="add_redpack.money" style="width:150px"autocomplete="off">元</el-input>
				 <label>&nbsp;&nbsp;元</label>
				</el-form-item>
				<el-form-item label="红包状态" :label-width="formLabelWidth">
				  <el-select v-model="add_redpack.state" placeholder="请选择红包类型">
					<el-option label="使用中" value="使用中"></el-option>
					<el-option label="待使用" value="待使用"></el-option>
					<el-option label="已废除" value="已废除"></el-option>
				  </el-select>
				</el-form-item>
			  </el-form>
			  
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelAdd()">取 消</el-button>
				<el-button type="primary" @click="addRedpack()">确 定</el-button>
			  </div>
			</el-dialog>
		</div>
		<div class="dialog">
			<el-dialog title="修改红包" :visible.sync="update_dialogFormVisible">
			  <el-form >
				<el-form-item label="红包ID" :label-width="formLabelWidth">
				  {{update_redpack.ID}}
				</el-form-item>
				<el-form-item label="红包名称" :label-width="formLabelWidth">
				  <el-input v-model="update_redpack.name" style="width:150px"autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="红包类型" :label-width="formLabelWidth">
				  <el-select v-model="update_redpack.type" placeholder="请选择红包类型">
					<el-option label="普通" value="普通"></el-option>
					<el-option label="会员" value="会员"></el-option>
					<el-option label="任务" value="任务"></el-option>
				  </el-select>
				</el-form-item>
				<el-form-item label="红包期限" :label-width="formLabelWidth">
				  <el-input v-model="update_redpack.duration" style="width:150px"autocomplete="off"></el-input>
				  <label>&nbsp;&nbsp;天</label>
				</el-form-item>
				<el-form-item label="红包门槛" :label-width="formLabelWidth">
				  <el-input v-model="update_redpack.threshold" style="width:150px"autocomplete="off"></el-input>
				  <label>&nbsp;&nbsp;元</label>
				</el-form-item>
				<el-form-item label="红包金额" :label-width="formLabelWidth">
				  <el-input v-model="update_redpack.money" style="width:150px"autocomplete="off">元</el-input>
				 <label>&nbsp;&nbsp;元</label>
				</el-form-item>
				<el-form-item label="红包状态" :label-width="formLabelWidth">
				  <el-select v-model="update_redpack.state" placeholder="请选择红包类型">
					<el-option label="使用中" value="使用中"></el-option>
					<el-option label="待使用" value="待使用"></el-option>
					<el-option label="已废除" value="已废除"></el-option>
				  </el-select>
				</el-form-item>
			  </el-form>
			  
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelUpdate()">取 消</el-button>
				<el-button type="primary" @click="updateRedpack()">确 定</el-button>
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
			query_redpack:{
				name:'',
				type:'全部',
				min_money:'',
				max_money:'',
			},
			add_redpack:{
				name:'3元红包',
				type:'普通',
				duration:'30',
				threshold:'15',
				money:'5',
				state:'使用中',
			},
			update_redpack:{
				ID:'',
				name:'',
				type:'',
				duration:'',
				threshold:'',
				money:'',
				state:'',
			},
			  redpack:{
				  ID:'',
				  name:'',
				  type:'',
				  duration:'',
				  threshold:'',
				  money:'',
				  state:'',
			  },
			redpackets: [
				{
				  ID: '1',
				  name: '常规红包',
				  type: '1',
				  duration:'30',
				  threshold:'15',
				  money:'3',
				  state:'1',
				  
				}
			],
			dialogFormVisible: false,
			update_dialogFormVisible: false,
			formLabelWidth: '120px',
		  }
		},
		created() {
			this.queryRedpackPage();
		},
		methods: {
			refresh(){
				this.redpack.ID = '';
				this.redpack.name = '';
				this.redpack.type = '';
				this.redpack.duration = '';
				this.redpack.threshold = '';
				this.redpack.money = '';
				this.redpack.state = '';
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
		      update(row) {
				//this.update_dialogFormVisible = true
		        console.log(row);
				if(row.state==1) {
					this.update_redpack.state = "使用中";
					this.redpack.state = "使用中";
				}else if(row.state==2) {
					this.update_redpack.state = "待使用";
					this.redpack.state = "待使用";
				}else if(row.state==3){
				  this.update_redpack.state="已废除";
				  this.redpack.state="已废除";
				}

				if(row.type==1) {
					this.update_redpack.type = '普通';
					this.redpack.type = "普通";
				}else if(row.type==2) {
					this.update_redpack.type = '会员';
					this.redpack.type = "会员";
				}else if(row.type==3) {
					this.update_redpack.type = '任务';
					this.redpack.type = "任务";
				}

				this.update_redpack.ID=row.ID;
				this.update_redpack.name=row.name;
				this.update_redpack.duration=row.duration;
				this.update_redpack.threshold=row.threshold;
				this.update_redpack.money=row.money;

				  this.redpack.ID=row.ID;
				  this.redpack.name=row.name;
				  this.redpack.duration=row.duration;
				  this.redpack.threshold=row.threshold;
				  this.redpack.money=row.money;
				  
		      },
			  del(row){
				let form={'redpacket_id':row.ID};
				console.log(row.ID);
				this.axios.default.withCredentials=true;
				this.axios.post('http://localhost:8080/redpacket/deleteRedpacket',form).then(r=>{
					console.log(r.data);
					//alert(r.data.detail);
				});
			  },
			  queryRedpackPage(){
				  this.currentpage=1;
				  this.queryRedpack();
			  },
			  queryRedpack(){
				  let query_redpack={name:'3元红包',type:'0',min_money:'0',max_money:'0',page:this.currentpage,rows:this.pagesize};
				  query_redpack.name=this.query_redpack.name;
				  query_redpack.min_money=this.query_redpack.min_money;
				  query_redpack.max_money=this.query_redpack.max_money;
				  query_redpack.type=0;
				  if(this.query_redpack.type=='普通')
					query_redpack.type=1;
				  else if(this.query_redpack.type=='会员')
				    query_redpack.type=2;
				  else if(this.query_redpack.type=='任务')
				    query_redpack.type=3;
				  console.log(query_redpack);
				  this.axios.default.withCredentials=true;
				  this.axios.post('http://localhost:8080/redpacket/selectByDetailPage',query_redpack).then(r=>{
					console.log(r.data);
				  	let list = r.data.msg.pageInfo.list;
				  	this.redpackets=[];
				  	for(let i=0;i<list.length;i++){
				  		let item={ID: '',name: '',type: '',duration:'',
								  threshold:'',money:'',state:''};
				  		item.ID=list[i].redpacketId;
				  		item.name=list[i].redpacketName;
				  		item.type=list[i].redpacketType;
				  		item.duration=list[i].duration;
				  		item.threshold=list[i].threshold;
				  		item.money=list[i].redpacketNum;
				  		item.state=list[i].redpacketState;
				  		this.redpackets.push(item);
				  	}
					this.files_count=r.data.msg.pageInfo.total;
					this.loading=false;
				  });
			  },
			  cancelAdd(){
				  this.dialogFormVisible = false;
				  this.add_redpack.name='';
				  this.add_redpack.type='';
				  this.add_redpack.duration='';
				  this.add_redpack.threshold='';
				  this.add_redpack.money='';
				  this.add_redpack.state='';
			  },
			  addRedpack(){
					this.add_redpack = this.redpack;

				  let add_redpack={redpacketName:'',redpacketType:'',
								   threshold:'',duration:'',redpacketNum:'',redpacketState:''};
				  add_redpack.redpacketName=this.add_redpack.name;
				  add_redpack.duration=this.add_redpack.duration;
				  add_redpack.threshold=this.add_redpack.threshold;
				  add_redpack.redpacketNum=this.add_redpack.money;
				  add_redpack.redpacketState=1;
				  if(this.add_redpack.state=="使用中")
					add_redpack.redpacketState=1;
				  else if(this.add_redpack.state=="待使用")
				    add_redpack.redpacketState=2;
				  else if(this.add_redpack.state=="已废除")
				    add_redpack.redpacketState=3;
					
				  add_redpack.redpacketType=0;
				  if(this.add_redpack.type=='普通')
				  	add_redpack.redpacketType=1;
				  else if(this.add_redpack.type=='会员')
				    add_redpack.redpacketType=2;
				  else if(this.add_redpack.type=='任务')
				    add_redpack.redpacketType=3;
				  this.axios.default.withCredentials=true;
				  this.axios.post('http://localhost:8080/redpacket/addRedpacket',add_redpack).then(r=>{
				  	console.log(r.data);
				  	this.queryRedpackPage();
				  });
				  console.log(add_redpack);
				  this.dialogFormVisible = false;
				  this.cancelAdd();
			  },
			  cancelUpdate(){
			  	  this.update_dialogFormVisible = false;
				  this.update_redpack.ID='';
			  	  this.update_redpack.name='';
			  	  this.update_redpack.type='';
			  	  this.update_redpack.duration='';
			  	  this.update_redpack.threshold='';
			  	  this.update_redpack.money='';
			  	  this.update_redpack.state='';
			  },
			  updateRedpack(){
				this.update_redpack = this.redpack;
				  let update_redpack={'redpacketId':'',redpacketName:'',redpacketType:'',
								   threshold:'',duration:'',redpacketNum:'',redpacketState:''};
				  update_redpack.redpacketId=this.update_redpack.ID;
				  update_redpack.redpacketName=this.update_redpack.name;
				  update_redpack.duration=this.update_redpack.duration;
				  update_redpack.threshold=this.update_redpack.threshold;
				  update_redpack.redpacketNum=this.update_redpack.money;
				  update_redpack.redpacketState=1;
				  if(this.update_redpack.state=="使用中")
				  	update_redpack.redpacketState=1;
				  else if(this.update_redpack.state=="待使用")
				    update_redpack.redpacketState=2;
				  else if(this.update_redpack.state=="已废除")
				    update_redpack.redpacketState=3;
				  					
				  update_redpack.redpacketType=0;
				  if(this.update_redpack.type=='普通')
				  	update_redpack.redpacketType=1;
				  else if(this.update_redpack.type=='会员')
				    update_redpack.redpacketType=2;
				  else if(this.update_redpack.type=='任务')
				    update_redpack.redpacketType=3;
				  this.axios.default.withCredentials=true;
				  this.axios.post('http://localhost:8080/redpacket/updateRedpacket',update_redpack).then(r=>{
				  	console.log(r.data);
				  	this.queryRedpackPage();
				  });
			  	  //console.log(this.update_redpack);
			  	  this.update_dialogFormVisible = false;
				  this.cancelAdd();
			  },
			formatDate(value){
				if(value.type==1)
			      return "普通";
				else if(value.type==2)
				  return "会员";
				else if(value.type==3)
				  return "任务";
			},
			formatDate1(value){
				if(value.state==1)
			      return "使用中";
				else if(value.state==2)
				  return "待使用";
				else if(value.state==3)
				  return "已废除";
			},
			handleSizeChange:function(size){
				this.pagesize = size;
				this.currentpage=1;
				this.queryRedpack();
			},
			// 控制页面的切换
			handleCurrentChange: function(currentpage) {
				this.currentpage = currentpage;
				this.queryRedpack()
			},
		    },
	}
</script>

<style lang="less" scoped>
.redPacketManage{
	width:100%;
	height:100%;
	display: flex;
	-background-color: lightpink;
	.redPacketManageLeft{
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
	.redPacketManageRight{
		flex:1;
		-background-color: lightgreen;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;

		.bill{
			.billMedium{
				.earn{
					display: flex;
				}
				.earnName{
					flex:5;
					font-size: 14px;
					padding-left: 30px;
					padding-top: 10px;
					padding-bottom: 10px;
				}
				.earnPrice{
					flex:2;
					font-size: 13px;
					padding-top: 12px;
					padding-bottom: 10px;
				}
			}
			.billBottom{
				.highFood{
					display: flex;
					.foodName{
						flex: 6;
						font-size: 14px;
						padding-left: 30px;
						padding-top: 10px;
						padding-bottom: 5px;
					}
					.foodNum{
						flex: 1;
						font-size: 13px;
						padding-top: 14px;
						padding-bottom: 5px;
					}
				}
			}
		}
	}
}
	
</style>
