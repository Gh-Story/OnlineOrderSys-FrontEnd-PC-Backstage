<template>
	<div class="diary">
		<div class="diaryLeft" style="width: 600px">
			<div class="foodManageTop">
				<el-card class="box-card">
					<div class="fmt">
						<div class="fmt1">
							日志查找 :
						</div>
						<div class="fmt2">
							<el-input
									placeholder="请输入日志相关信息查询"
									v-model="diaryContent"
									prefix-icon="el-icon-search"
									clearable>
							</el-input>
						</div>
						<div class="fmt3">
							<el-button @click="" type="primary">查询日志</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div class="foodManageMedium">
				<el-card class="box-card" style="height: 140px;">
					<div class="lm" style="margin-top: 10px;">
						<div class="lm1">
							日志日期 :
						</div>
						<div class="lm3">
							<el-radio-group size="small">
								<div style="-background-color: red;display: inline;display: flex">
									<div style="">
										<el-button @click="timeSelect" size="small">全部</el-button>
									</div>
									<el-date-picker
											align="right"
											v-model="timeValue"
											type="daterange"
											range-separator="至"
											start-placeholder="开始日期"
											end-placeholder="结束日期"
											size='small'
											value-format="yyyy-MM-dd"
											@change="timeChange">
									</el-date-picker>
								</div>
							</el-radio-group>
						</div>
					</div>
					<div class="lm">
						<div class="lm1">
							日志导出 :
						</div>
						<div class="lm2">
							<a style="padding-top: 8px" class="el-icon-download" href="http://localhost:8080/exportExlce/allOperationLog">导出日志记录</a>
						</div>
					</div>
				</el-card>
			</div>
			<div class="foodManageBottom">
				<el-card class="box-card" style="height: 510px">
					<div class="fmbTop">
						<div class="fmt1">
							日志管理详细列表
						</div>
						<div class="fmt2">
							<el-button @click="" size="small" icon="el-icon-delete" plain>批量删除</el-button>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="fmbBottom">
						<el-table
								ref="multipleTable"
								:data="logData"
								height="330"
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
									label="日志编号"
									prop="operationLog.logId"
									align="center"
									width="150"
							>
							</el-table-column>
							<el-table-column
									label="管理员姓名"
									prop="manager.managerName"
									align="center"
									width="200">
							</el-table-column>
							<el-table-column
									label="日志操作"
									prop="operation.operationDetail"
									align="center"
									width="160">
							</el-table-column>
							<el-table-column
									prop="operationLog.operationTime"
									label="日志日期"
									align="center"
									width="240"
									show-overflow-tooltip>
							</el-table-column>
							<el-table-column
									prop="manager.managerId"
									label="用户编号"
									align="center"
									width="120">
							</el-table-column>
							<el-table-column
									align="center"
									label="操作"
									width="160"
									fixed="right"
									show-overflow-tooltip>
								　<template slot-scope="scope">
								<el-button
										@click="EditRow(scope.$index, logData)"
										type="text"
										size="small"
										class="el-icon-search">
									查看
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
		<div class="diaryRight">
			<el-card class="box-card" style="height: 750px;">
				<div slot="header" class="clearfix">
					<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">日志详细信息</div>
				</div>
				<br><br><br>
				<div class="foodOperate">
					<el-form :model="info" label-width="100px">
						<el-form-item label="日志编号">
							<span style="width:90%;padding-left: 20px">{{info.operationLog.logId}}</span>
						</el-form-item>
						<el-form-item label="管理姓名">
							<span style="width:90%;padding-left: 20px">{{info.manager.managerName}}</span>
						</el-form-item>
						<el-form-item label="身份证号">
							<span style="width:90%;padding-left: 20px">{{info.manager.managerIdno}}</span>
						</el-form-item>
						<el-form-item label="管理性别">
							<span style="width:90%;padding-left: 20px">{{info.manager.managerSex}}</span>
						</el-form-item>
						<el-form-item label="管理编号">
							<span style="width:90%;padding-left: 20px" >{{info.manager.managerId}}</span>
						</el-form-item>
						<el-form-item label="日志日期">
							<span style="width:90%;padding-left: 20px">{{info.operationLog.operationTime}}</span>
						</el-form-item>
						<el-form-item label="日志操作">
							<span style="width:90%;padding-left: 20px" >{{info.operation.operationDetail}}</span>
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

<!--		<el-row type="flex" justify="space-around" class="fm_div">-->
<!--			<el-col :span="16">-->
<!--				<div>-->
<!--					<el-container>-->
<!--						<el-header height="80px">-->
<!--							<el-container direction="horizontal">-->
<!--								<h1>日志管理</h1>-->
<!--							</el-container>-->
<!--						</el-header>-->
<!--						<h1 class="footerdiv"></h1>-->
<!--						<el-header height="120px">-->
<!--							-->
<!--							<el-row style="padding-top:40px; height: 40px;display: flex;flex-direction: row;">-->
<!--								<p style="line-height: 30px; margin-right: 10px;">日志日期:</p>-->
<!--								<el-radio-group  size="small" >-->
<!--								  <el-button @click="timeSelect" size="small">全部</el-button>-->
<!--								</el-radio-group>-->
<!--								<el-date-picker-->
<!--								style="display: flex; width: 30%;"-->
<!--								v-model="timeValue"-->
<!--								type="daterange"-->
<!--								range-separator="至"-->
<!--								start-placeholder="开始日期"-->
<!--								end-placeholder="结束日期"-->
<!--								size='small'-->
<!--								value-format="yyyy-MM-dd"-->
<!--								@change="timeChange">-->
<!--								</el-date-picker>-->
<!--								<a style="padding-top:5px; padding-left: 20px;" class="el-icon-download" href="http://localhost:8080/exportExlce/allOperationLog">导出日志记录</a>-->
<!--							</el-row>-->
<!--						</el-header>-->
<!--						<el-footer height="360px" class="el-footer1">-->
<!--							<h3 class="footerdiv">日志数据：</h3>-->
<!--							<el-row style="height: 320px;margin-top:10px;display: flex;flex-direction: row;">-->
<!--								<el-table-->
<!--								:data="logData"-->
<!--								style="width: 900px"-->
<!--								height="300"-->
<!--								v-loading="loading">-->
<!--								    <el-table-column-->
<!--								      prop="operationLog.logId"-->
<!--								      label="日志ID"-->
<!--									  align="center">-->
<!--								    </el-table-column>-->
<!--								    <el-table-column-->
<!--								      prop="manager.managerName"-->
<!--								      label="管理员姓名"-->
<!--									  align="center">-->
<!--								    </el-table-column>-->
<!--								    <el-table-column-->
<!--								      prop="operation.operationDetail"-->
<!--								      label="日志操作"-->
<!--									  align="center">-->
<!--								    </el-table-column>-->
<!--								    <el-table-column-->
<!--								      prop="operationLog.operationTime"-->
<!--								      label="日志日期"-->
<!--									  align="center"-->
<!--									  width="180">-->
<!--								    </el-table-column>-->
<!--								    <el-table-column-->
<!--								      prop="manager.managerId"-->
<!--								      label="用户ID"-->
<!--									  align="center">-->
<!--								    </el-table-column>-->
<!--								    <el-table-column-->
<!--								      fixed="right"-->
<!--								      label="操作"-->
<!--									  align="center">-->
<!--								      <template slot-scope="scope">-->
<!--								        <el-button-->
<!--								          @click="EditRow(scope.$index, logData)"-->
<!--								          type="text"-->
<!--								          size="small"-->
<!--										  class="el-icon-edit-outline">-->
<!--								          查看-->
<!--								        </el-button>-->
<!--								      </template>-->
<!--								    </el-table-column>-->
<!--								</el-table>-->
<!--							</el-row>-->
<!--							<div style="margin-top: 10px;float: right;">-->
<!--								<el-pagination-->
<!--								  background      -->
<!--								  @size-change="handleSizeChange"-->
<!--								  @current-change="handleCurrentChange"-->
<!--								  :current-page="currentpage"-->
<!--								  :page-sizes="[5,10,15]"-->
<!--								  :page-size="pagesize"-->
<!--								  layout="total,jumper,prev, pager, next,sizes"-->
<!--								  :total="files_count"-->
<!--								></el-pagination>-->
<!--							</div>-->

<!--						</el-footer>-->
<!--					</el-container>-->
<!--				</div>-->
<!--			</el-col>-->

<!--			<el-col :span="7">-->
<!--				<el-card class="box-card">-->
<!--					<div slot="header" class="clearfix">-->
<!--						<span>日志详细信息</span>-->
<!--					</div>-->
<!--					<el-row><span>日志ID:</span><span style="margin-left: 14%;" class="text item">{{info.operationLog.logId}}</span></el-row>-->
<!--					<el-row><span>管理员姓名:</span><span style="margin-left: 6%;" class="text item">{{info.manager.managerName}}</span></el-row>-->
<!--					<el-row><span>管理员身份证:</span><span style="margin-left: 6%;" class="text item">{{info.manager.managerIdno}}</span></el-row>-->
<!--					<el-row><span>管理员性别:</span><span style="margin-left: 6%;" class="text item">{{info.manager.managerSex}}</span></el-row>-->
<!--					<el-row><span>管理员ID:</span><span style="margin-left: 10%;" class="text item">{{info.manager.managerId}}</span></el-row>-->
<!--					<el-row><span>日志日期:</span><span style="margin-left: 10%;" class="text item">{{info.operationLog.operationTime}}</span></el-row>-->
<!--					<el-row><span>日志操作:</span><span style="margin-left: 10%;" class="text item">{{info.operation.operationDetail}}</span></el-row>-->
<!--					</el-card>-->
<!--			</el-col>-->
<!--		</el-row>-->
	</div>
</template>

<script>
	export default {
		name: 'diary',
		created() {
			this.setTime();
			this.getDiary();
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
		    EditRow(index, rows) {
				this.info.manager=this.logData[index].manager;
				this.info.operation=this.logData[index].operation;
				this.info.operationLog=this.logData[index].operationLog;
				this.info.drow=index;
				
		    },
			downLoad(){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/exportExlce/allOperationLog',
					{
					responseType: "blob"
					//responseType:'arraybuffer'
					},
				).then(r=>{
					let fileName = 'log.xlsx';
					let fileURL = window.URL.createObjectURL(new Blob([r.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}));
					let fileLink = document.createElement('a');
					fileLink.href = fileURL;
					fileLink.setAttribute('download',fileName);
					document.body.appendChild(fileLink);
					
					fileLink.click();
				}).catch(r=>{});
				
			},
			timeChange(){
				
				if(this.timeValue==null || this.timeValue==''){
				}else{
					this.currentpage=1;
					this.getDiary();
				}
			},
			timeSelect(){
				this.setTime();
				this.currentpage=1;
				this.getDiary();
			},
			setTime(){
				let nowDate=new Date();
				let yy=nowDate.getFullYear();
				let MM=(nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1);
				let dd=nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate();
				let formatNowDate=yy+'-'+MM+'-'+dd;
				this.timeValue=['1970-01-01',formatNowDate];
			},
			getDiary(){
				let Data={
					log_start:this.timeValue[0],
					log_end:this.timeValue[1],
					page:this.currentpage,
					rows:this.pagesize,
				}
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/log/selectByDetailPage',Data).then(r=>{
					console.log(r.data.msg.pageInfo);
					this.logData=[];
					for(let i=0;i<r.data.msg.pageInfo.length;i++){
						//r.data.msg.operationLogs[i].operationLog.operationTime=r.data.msg.operationLogs[i].operationLog.operationTime.substring(0,10);
						this.logData.push(r.data.msg.pageInfo[i]);
					}
					
					this.files_count=r.data.msg.tot;
					this.loading=false;
				});
			},
			handleSizeChange:function(size){
				this.pagesize = size;
				this.currentpage=1;
				this.getDiary();
			},
			// 控制页面的切换
			handleCurrentChange: function(currentpage) {
				this.currentpage = currentpage;

				this.getDiary();
			},
			
		},
		data() {
			return {
				diaryContent:'',
				info:{
					manager:'',
					operation:'',
					operationLog:'',
					drow:'',
				},
				timeValue:'',
				logData: [],
				loading:true,
				currentpage:1,
				pagesize:5,
				files_count:80,
				
			}
		},
		 
		
	}
</script>

<style lang="less" scoped>
.diary{
	width:100%;
	height:100%;
	display: flex;
	.diaryLeft{
		flex:2;
		width: 600px;
		flex-direction: column;
		-background-color: lightcoral;
		display: flex;
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
	.diaryRight{
		flex:1;
		-background-color: lightgreen;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;
	}
	a:link {color: #409EFF} /* 未被访问的链接 蓝色 */
	a:visited {color: deepskyblue} /* 已被访问过的链接 蓝色 */
	a:hover {color: lightcoral} /* 鼠标悬浮在上的链接 蓝色 */
	a:active {color: coral} /* 鼠标点中激活链接 蓝色 */
}
</style>
