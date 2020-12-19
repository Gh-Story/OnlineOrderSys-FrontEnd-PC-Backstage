<template>
	<div class="comment">
		<!-- <div :style="{width: '300px', height: '300px'}" ref="myChart"></div> -->
			<div class="commentLeft">
				<div class="leftMedium">
					<el-card class="box-card" style="height: 140px;">
						<div class="lm" style="margin-top: 10px;">
							<div class="lm1">
								回复状态 :
							</div>
							<div class="lm2">
								<el-radio-group @change="StateSelect" v-model="stateValue" size="small">
									<el-radio-button label="0">全部</el-radio-button>
									<el-radio-button label="2">未回复</el-radio-button>
									<el-radio-button label="1">已回复</el-radio-button>
								</el-radio-group>
							</div>
						</div>
						<div class="lm">
							<div class="lm1">
								评价日期 :
							</div>
							<div class="lm3">
								<el-radio-group size="small">
									<div style="-background-color: red;display: inline;display: flex">
										<div style="">
											<el-button @click="timeSelect" size="small">全部</el-button>
										</div>
										<el-date-picker
												style="display: flex; width: 30%;"
												v-model="timeValue"
												type="daterange"
												range-separator="至"
												start-placeholder="开始日期"
												end-placeholder="结束日期"
												size='small'
												@change="query"
												value-format="yyyy-MM-dd">
										</el-date-picker>
									</div>
								</el-radio-group>
							</div>
						</div>
					</el-card>
				</div>
				<div class="leftBottom">
					<el-card class="box-card" style="height: 580px;">
						<div slot="header" class="clearfix">
							<span style="margin-left: 20px">评价数据</span>
						</div>
						<el-table
									:data="evaluationData"
									style="width: 1000px"
									height="440"
									v-loading="loading">
								<el-table-column
										fixed
										prop="evaluationId"
										label="评价编号"
										width="80px"
										align="center">
								</el-table-column>
								<el-table-column
										prop="evaluationContent"
										label="评价信息"
										align="center"
										width="300px">
								</el-table-column>
								<el-table-column
										prop="evaluationState"
										label="回复情况"
										align="center"
										width="80px">
									<template slot-scope="scope">
										<el-tag  size="mini"
												 type="info"
												 effect="plain" v-if="scope.row.evaluationState==1">已回复</el-tag>
										<el-tag size="mini"
												type=""
												effect="plain" v-if="scope.row.evaluationState==2">未回复</el-tag>
									</template>
								</el-table-column>
								<el-table-column
										prop="evaluationDate"
										label="评价日期"
										align="center"
										width="150px">
								</el-table-column>
								<el-table-column
										prop="orderId"
										label="订单编号"
										align="center"
										width="80px">
								</el-table-column>
								<el-table-column
										prop="replyMessage"
										label="回复信息"
										width="150px"
										align="center">
								</el-table-column>
								<el-table-column
										fixed="right"
										label="操作"
										width="150px"
										align="center">
									<template slot-scope="scope">
										<el-button
												v-show="scope.row.evaluationState==2"
												@click="EditRow(scope.$index, evaluationData)"
												type="text"
												size="small"
												icon="el-icon-edit-outline">回复</el-button>
										<el-button
												v-show="scope.row.evaluationState==1"
												@click="EditRow(scope.$index, evaluationData)"
												type="text"
												size="small"
												icon="el-icon-search">查看</el-button>
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
							
					</el-card>
				</div>
			</div>
			<div class="commentRight">
				<el-card class="box-card" style="height: 750px">
					<div slot="header" class="clearfix">
						<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">评价详细信息</div>
					</div>
					<el-form  ref="form" :model="info" label-width="100px">
						<br />
						<br />
						<br />
						<el-form-item label="评价编号">
							<span style="width:90%;padding-left: 20px">{{info.evaluationId}}</span>
						</el-form-item>
						<el-form-item label="回复情况">
							<span v-show="info.evaluationState==2" style="padding-left: 20px" class="text item">未回复</span>
							<span v-show="info.evaluationState==1" style="padding-left: 20px" class="text item">已回复</span>
						</el-form-item>
						<el-form-item label="评价日期">
							<span style="width:90%;padding-left: 20px">{{info.evaluationDate}}</span>
						</el-form-item>
						<el-form-item label="订单编号">
							<span style="width:90%;padding-left: 20px">{{info.orderId}}</span>
						</el-form-item>
						<el-form-item label="点赞星数">
							<span style="width:90%;padding-left: 20px">{{info.likesNumber}}</span>
						</el-form-item>
						<el-form-item label="评价信息">
							<span style="width:90%;padding-left: 20px">{{info.evaluationContent}}</span>
						</el-form-item>
						<el-form-item label="回复信息">
							<el-input v-show="info.evaluationState==1" readonly type="textarea"   style="margin-left: 10%; width:240px"  size="small" v-model="info.replyMessage" class="text item"></el-input>
							<el-input v-show="info.evaluationState==2"  type="textarea"   style="margin-left: 10%; width:240px"  size="small" v-model="info.replyMessage" class="text item"></el-input>
						</el-form-item>
						<br />
						<br />
						<el-form-item style="padding-left:100px;">
							<el-button  v-show="info.evaluationState==2" size="small" @click="checkInfo" style="" type="primary">确认</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</div>
	</div>
</template>

<script>
	
	export default {
		name: 'comment',
		created() {
			let nowDate=new Date();
			let yy=nowDate.getFullYear();
			let MM=(nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1);
			let dd=nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate();
			let formatNowDate=yy+'-'+MM+'-'+dd;
			let Data={evaluation_startdate:'1970-01-01',evaluation_enddate:formatNowDate,evaluation_state:0,page:this.currentpage,rows:this.pagesize};
			this.getComments(Data);
			
		},
		methods: {
			query(){
				if(this.timeValue==null || this.timeValue==''){
				}else{
					if(this.stateValue==''){
						this.stateValue=0;						
					}
					this.currentpage=1;
					let Data={evaluation_startdate:this.timeValue[0],evaluation_enddate:this.timeValue[1],evaluation_state:this.stateValue,page:this.currentpage,rows:this.pagesize};
					this.getComments(Data);
				}
			},
			timeSelect(){
				this.setTime()
				if(this.stateValue==''){
					this.stateValue=0;						
				}
				this.currentpage=1;
				let Data={evaluation_startdate:this.timeValue[0],evaluation_enddate:this.timeValue[1],evaluation_state:this.stateValue,page:this.currentpage,rows:this.pagesize};
				this.getComments(Data);
			},
			setTime(){
				let nowDate=new Date();
				let yy=nowDate.getFullYear();
				let MM=(nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1);
				let dd=nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate();
				let formatNowDate=yy+'-'+MM+'-'+dd;
				this.timeValue=['1970-01-01',formatNowDate];
			},
			StateSelect(label){
				if(label=='全部'){
					this.stateValue=0;
				}else if(label=='未回复'){
					this.stateValue=2;
				}else if(label=='已回复'){
					this.stateValue=1;
				}
				if(this.timeValue==null ||this.timeValue==''){
					this.setTime()
				}
				this.currentpage=1;
				let Data={evaluation_startdate:this.timeValue[0],evaluation_enddate:this.timeValue[1],evaluation_state:this.stateValue,page:this.currentpage,rows:this.pagesize};
				console.log(Data);
				this.getComments(Data);
				
			},
			EditRow(index, rows) {
				console.log(index);
				this.info.evaluationId=this.evaluationData[index].evaluationId;
				this.info.evaluationContent=this.evaluationData[index].evaluationContent;
				this.info.evaluationState=this.evaluationData[index].evaluationState;
				this.info.evaluationDate=this.evaluationData[index].evaluationDate;
				this.info.orderId=this.evaluationData[index].orderId;
				this.info.replyMessage=this.evaluationData[index].replyMessage;
				this.info.likesNumber=this.evaluationData[index].likesNumber;
				this.info.crow=index;
			},
			checkInfo(){
				let Data={evaluation_id:this.info.evaluationId,reply_message:this.info.replyMessage,evaluation_state:1};
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/evaluation/updateReply',Data).then(r=>{
					if(r.data.detail=='更新成功'){
						console.log('ddddddddd');
						this.info.evaluationState=1;
						this.evaluationData[this.info.crow].replyMessage=this.info.replyMessage;
						this.evaluationData[this.info.crow].evaluationState=this.info.evaluationState;
					}else{
						
						this.$message.error('更新失败哦，请联系数据库管理员');
					}
				});
			},
			getComments(Data){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/evaluation/selectByDetailPage',Data).then(r=>{
					console.log('getData',r.data.msg.pageInfo);
					this.evaluationData=[];
					for(let i=0;i<r.data.msg.pageInfo.list.length;i++){
						r.data.msg.pageInfo.list[i].evaluationDate=r.data.msg.pageInfo.list[i].evaluationDate.substring(0,10);
						this.evaluationData.push(r.data.msg.pageInfo.list[i]);
					}	
					console.log('eva',this.evaluationData);
					this.files_count=r.data.msg.pageInfo.total;
					this.loading=false;
					
				});
				
			},
			handleSizeChange:function(size){
				this.pagesize = size;
				if(this.timeValue==null ||this.timeValue==''){
					this.setTime()
				}
				if(this.stateValue==''){
					this.stateValue=0;						
				}
				this.currentpage=1;
				let Data={evaluation_startdate:this.timeValue[0],evaluation_enddate:this.timeValue[1],evaluation_state:this.stateValue,page:this.currentpage,rows:this.pagesize};
				this.getComments(Data);
			},
			// 控制页面的切换
			handleCurrentChange: function(currentpage) {
				this.currentpage = currentpage;
				// console.log(currentPage)
				if(this.timeValue==null ||this.timeValue==''){
					this.setTime()
				}
				if(this.stateValue==''){
					this.stateValue=0;						
				}
				let Data={evaluation_startdate:this.timeValue[0],evaluation_enddate:this.timeValue[1],evaluation_state:this.stateValue,page:this.currentpage,rows:this.pagesize};
				this.getComments(Data);
			},
			//对所有数据进行分页处理 发送请求
		},
		data() {
			return {
				timeValue:'',
				stateValue: '',
				info:{
					evaluationId:'854585',
					orderId:'982546',
					evaluationContent:'好吃，色香味俱全,希望魏老板的店越来越好',
					replyMessage:'请老板赶快回复',
					evaluationState:'2',
					evaluationDate:'2016-05-14',
					likesNumber:'4',
					crow:'',
				},
				evaluationData: [],
				testmessage:'',
				loading:true,
				currentpage:1,
				pagesize:5,
				files_count:80,
				
			}
		},
		 
		
	}
</script>

<style lang="less" scoped>
.comment{
	width: 100%;
	height: 100%;
	display: flex;
	.commentLeft{
		flex:2;
		flex-direction: column;
		-background-color: lightcoral;
		display: flex;
		.leftMedium{
			flex:2;
			-background-color: aqua;
			padding-top: 10px;
			padding-left: 10px;
			padding-right: 10px;
			padding-bottom: 0px;
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
		.leftBottom{
			flex:8;
			-background-color: coral;
			padding-top: 0px;
			padding-bottom: 5px;
			padding-left: 10px;
			padding-right: 10px;
			.order{
				display: flex;
				flex-direction: column;
				-background-color: antiquewhite;
				.orderTitle{
					display: flex;
					flex-direction: column;
					.orderNo{
						flex: 1;
						background-color: #42b983;
					}
					.orderNos{
						flex: 1;
						color: dodgerblue;
						background-color: bisque;
					}
					.orderRequest{
						flex: 2;
						color: dodgerblue;
						font-size:12px;
						padding-left: 40px;
						background-color: teal;
					}
					.orderLimit{
						flex: 2;
						font-size:12px;
						padding-right: 100px;
						background-color: lightcoral;
					}
					.orderState{
						flex: 4;
						float: right;
						background-color: coral;
					}
				}
				.user{
					flex:2;
					-background-color: lightcoral;
					padding-top: 10px;
					padding-bottom: 10px;
					padding-left: 10px;
				}
				.foods{
					flex:2;
					-background-color: azure;
					padding-top: 10px;
					padding-bottom: 10px;
					padding-left: 10px;
				}
				.price{
					flex:2;
					-background-color: lightgreen;
					padding-top: 10px;
					padding-bottom: 10px;
					padding-left: 10px;
				}
				.info{
					flex:2;
					padding-top: 10px;
					padding-bottom: 10px;
					padding-left: 10px;
				}
			}
		}
	}
	.commentRight{
		flex:1;
		-background-color: lightgreen;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;

	}
}
</style>
