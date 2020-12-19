<template>
	<div class="orderSelect">
		<!-- <div :style="{width: '300px', height: '300px'}" ref="myChart"></div> -->
		<div class="orderSelectLeft" style="width: 600px;">
			<div class="leftTop">
				<el-card class="box-card">
					<div class="lt">
						<div class="lt1">
							活动查找 :
						</div>
						<div class="lt2">
							<el-input
									placeholder="请输入活动信息进行活动查询"
									v-model="formInline.ACname"
									prefix-icon="el-icon-search"
									clearable>
							</el-input>
						</div>
						<div class="lt3">
							<el-button @click="query" type="primary">查询活动</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div class="leftMedium">
				<el-card class="box-card">
					<div class="lm">
						<div class="lm1">
							活动类型 :
						</div>
						<div class="lm2">
							<el-radio-group  size="small" v-model="acTypeValue" @change="acTypeSelect">
								<el-radio-button label="0">全部</el-radio-button>
								<el-radio-button label="1">促销</el-radio-button>
								<el-radio-button label="2">节日</el-radio-button>
								<el-radio-button label="3">其他</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lm">
						<div class="lm1">
							活动状态 :
						</div>
						<div class="lm2">
							<el-radio-group  size="small" v-model="acStateValue" @change="acStateSelect">
								<el-radio-button label="0">全部</el-radio-button>
								<el-radio-button label="1">预定中</el-radio-button>
								<el-radio-button label="2">进行中</el-radio-button>
								<el-radio-button label="3">已下架</el-radio-button>
							</el-radio-group>
						</div>
					</div>
					<div class="lm">
						<div class="lm1">
							活动时间 :
						</div>
						<div class="lm3">
							<el-radio-group size="small">
								<div style="-background-color: red;display: inline;display: flex">
									<div style="">
										<el-button size="small" @click="timeSelect">全部</el-button>
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
											unlink-panels
											:picker-options="pickerOptions"
											@change="changeTime">
									</el-date-picker>
								</div>
							</el-radio-group>
						</div>
					</div>
				</el-card>
			</div>
			<div class="foodManageBottom">
				<el-card class="box-card" style="height: 520px">
					<div class="fmbTop">
						<div class="fmt1">
							活动详细信息
						</div>
						<div class="fmt2">
							<el-button @click="batchDownAC" size="small" icon="el-icon-bottom" plain>批量下架</el-button>
							<el-button @click="changeFlagAdd" size="small" icon="el-icon-plus" plain>新增活动</el-button>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="fmbBottom">
						<el-table
								ref="ActivityTable"
								:data="ActivityData"
								tooltip-effect="dark"
								style="width: 100%; align-content: center;text-align: center"
								max-height="500"
								@selection-change="ACSelectionChange">
							<el-table-column
									type="selection"
									width="80"
									align="center"
									fixed>
							</el-table-column>
							<el-table-column
									prop="activityName"
									label="活动名称"
									width="150"
									align="center"
							>
							</el-table-column>
							<el-table-column
									prop="activityType"
									label="活动类型"
									align="center"
									width="80">
								<template slot-scope="scope">
									<span v-if="scope.row.activityType==1">促销</span>
									<span v-if="scope.row.activityType==2">节日</span>
									<span v-if="scope.row.activityType==3">其他</span>
								</template>
							</el-table-column>
							<el-table-column
									prop="activityStart"
									label="活动开始时间"
									align="center"
									width="130"
							>
							</el-table-column>
							<el-table-column
									prop="activityEnd"
									label="活动结束时间"
									align="center"
									width="130">
							</el-table-column>
							<el-table-column
									prop="activityState"
									label="活动状态"
									align="center"
									width="120">
								<template slot-scope="scope">
									<span v-if="scope.row.activityState==1"> <el-tag size="mini">预定中</el-tag></span>
									<span v-if="scope.row.activityState==2"> <el-tag type="success" size="mini">进行中</el-tag></span>
									<span v-if="scope.row.activityState==3"> <el-tag type="info" size="mini">已下架</el-tag></span>
								</template>
							</el-table-column>
							<el-table-column
									label="操作"
									align="center"
									width="280">
								<template slot-scope="scope">
									<el-button
											@click="selectEditRow(scope.$index, ActivityData)"
											type="text"
											size="small"
											class="el-icon-search">
										查询
									</el-button>
									<el-button
											@click="downEditRow(scope.$index, ActivityData)"
											type="text"
											size="small"
											class="el-icon-bottom">
										下架
									</el-button>
									<el-button
											@click="upEditRow(scope.$index, ActivityData)"
											type="text"
											size="small"
											class="el-icon-top">
										上架
									</el-button>
									<el-button
											@click="preEditRow(scope.$index, ActivityData)"
											type="text"
											size="small"
											class="el-icon-s-order">
										预定
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-card>
			</div>
		</div>

		<div class="orderSelectRight">
			<el-card v-show="flagEdit" class="box-card2">
				<div slot="header" class="clearfix">
					<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">活动详细信息</div>
				</div>
				<el-form ref="form" :model="editform" label-width="80px" size="small" >
					<el-form-item label="活动名称" style="padding-top: 20px;">
						<span style="margin-left: 10%; ">{{editform.activityName}}</span>
					</el-form-item>
					<el-form-item label="活动状态">
						<span style="margin-left: 10%; " v-if="editform.activityState==1">预定中</span>
						<span style="margin-left: 10%; " v-if="editform.activityState==2">进行中</span>
						<span style="margin-left: 10%; " v-if="editform.activityState==3">已下架</span>
					</el-form-item>
					<el-form-item label="活动类型">
						<span style="margin-left: 10%; " v-if="editform.activityType==1">促销</span>
						<span style="margin-left: 10%; " v-if="editform.activityType==2">节日</span>
						<span style="margin-left: 10%; " v-if="editform.activityType==3">其他</span>
					</el-form-item>
					<el-form-item label="活动时间" style="margin-bottom: 20px;">
						<el-date-picker
								style="display: flex; width: 100%;"
								v-model="editform.date"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								size='small'
								readonly
								value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>

					<el-table
							ref="multipleTable"
							:data="editform.items"
							tooltip-effect="dark"
							style="width: 100%;"
							@selection-change="addActivityItems"
							height="500"
							max-height="500">
						<el-table-column
								align="center"
								type="selection"
								width="80">
						</el-table-column>
						<el-table-column
								align="center"
								prop="activityItem.foodId"
								width="120"
								label="美食编号">
						</el-table-column>
						<el-table-column
								align="center"
								prop="food.foodName"
								width="200"
								label="美食名称"
								show-overflow-tooltip>
						</el-table-column>
						<el-table-column
								align="center"
								prop="activityItem.discount"
								label="美食折扣"
								width="120"
								show-overflow-tooltip>
						</el-table-column>
					</el-table>
				</el-form>
			</el-card>

			<el-card v-show="flagAdd" class="box-card2">
				<div slot="header" class="clearfix">
					<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">活动详细信息
					</div>
				</div>
				<el-button @click="refresh" style="float: right; padding: 3px " type="text">刷新</el-button>
				<el-button @click="addActivity" style="float: right; padding: 3px ;" type="text">新增</el-button>
				<el-form ref="form" :model="addform" label-width="80px" size="small" >
					<el-form-item label="活动名称" style="padding-top: 20px;">
						<el-input v-model="addform.activityName"></el-input>
					</el-form-item>
					<el-form-item label="活动状态">
						<el-select v-model="addform.activityState" placeholder="请选择活动状态">
							<el-option label="预定中" value="1"></el-option>
							<el-option label="已下架" value="3"></el-option>
							<el-option label="进行中" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="活动类型">
						<el-select v-model="addform.activityType" placeholder="请选择活动状态">
							<el-option label="促销" value="1"></el-option>
							<el-option label="节日" value="2"></el-option>
							<el-option label="其他" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="活动时间" style="margin-bottom: 20px;">
						<el-date-picker
								style="display: flex; width: 100%;"
								v-model="addform.date"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
								size='small'
								value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>

					<el-table
							ref="addformTable"
							:data="addform.items"
							tooltip-effect="dark"
							style="width: 100%;"
							@selection-change="addActivityItems"
							height="420"
							max-height="420">
						<el-table-column
								align="center"
								type="selection"
								width="80">
						</el-table-column>
						<el-table-column
								align="center"
								prop="food.foodId"
								width="120"
								label="美食编号">
						</el-table-column>
						<el-table-column
								align="center"
								prop="food.foodName"
								label="美食名称"
								width="200"
								show-overflow-tooltip>
						</el-table-column>
						<el-table-column
								align="center"
								prop="discount"
								label="美食折扣"
								width="120"
								show-overflow-tooltip>
							<template slot-scope="scope">
								<el-input size="mini" v-model="scope.row.discount"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'hello',
		created() {
			this.setTime();
			this.formInline.ACname='';
			this.acTypeValue=0;
			this.acStateValue=0;
			this.getActivity();
		},
		methods: {
			addActivity(){
				console.log("addActivity");
				console.log(this.ActivityItems);
				console.log(this.addform);
				let Data={
					activity_name:this.addform.activityName,
					activity_start:this.addform.date[0],
					activity_end:this.addform.date[1],
					activity_type:this.addform.activityType,
					activity_state:this.addform.activityState,
					food_id:[],
					discount:[]
				}
				for(let i=0;i<this.ActivityItems.length;i++){
					Data.food_id[i]=this.ActivityItems[i].food.foodId;
					Data.discount[i]=this.ActivityItems[i].discount;
				}
				console.log(Data);
				this.addNewActivity(Data);
			},
			changeFlagAdd(){
				this.flagEdit=false;
				this.flagAdd=true;
				this.getFoodAsActivityItems();
			},
			refresh(){
				this.addform.activityName='';
				this.addform.activityState='';
				this.addform.activityType='';
				this.addform.date=[];
				this.$refs.addformTable.clearSelection();
				for(let i =0;i<this.addform.items.length;i++){
					this.addform.items[i].discount=0;
				}
				console.log(this.addform);
			},
			addActivityItems(val) {
				this.ActivityItems = val;
			},
			timeSelect(){
				this.setTime();
				if(this.acStateValue==null || this.acStateValue==''){
					this.acStateValue=0;
				}
				if(this.acTypeValue==null || this.acTypeValue==''){
					this.acTypeValue=0;
				}
				if(this.formInline.ACname==null){
					this.formInline.ACname='';
				}

				this.getActivity();
			},
			changeTime(){
				if(this.timeValue==null || this.timeValue==''){
				}else{
					if(this.acStateValue==null || this.acStateValue==''){
						this.acStateValue=0;
					}
					if(this.acTypeValue==null || this.acTypeValue==''){
						this.acTypeValue=0;
					}
					if(this.formInline.ACname==null){
						this.formInline.ACname='';
					}

					this.getActivity();
				}
			},
			setTime(){
				//let nowDate=new Date();
				//let yy=nowDate.getFullYear();
				//let MM=(nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1);
				//let dd=nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate();
				//let formatNowDate=yy+'-'+MM+'-'+dd;
				this.timeValue=['1970-01-01','2170-01-01'];
			},
			query(){
				if(this.acStateValue==null || this.acStateValue==''){
					this.acStateValue=0;
				}
				if(this.acTypeValue==null || this.acTypeValue==''){
					this.acTypeValue=0;
				}
				if(this.formInline.ACname==null){
					this.formInline.ACname='';
				}
				if(this.timeValue==null || this.timeValue==''){
					this.setTime();
				}

				this.getActivity();
			},
			acStateSelect(label){
				if(label=='全部'){
					this.acStateValue=0;
				}else if(label=='预定中'){
					this.acStateValue=1;
				}else if(label=='进行中'){
					this.acStateValue=2;
				}else if(label=='已下架'){
					this.acStateValue=3
				}

				if(this.timeValue==null || this.timeValue==''){
					this.setTime();
				}
				if(this.acTypeValue==null || this.acTypeValue==''){
					this.acTypeValue=0;
				}
				if(this.formInline.ACname==null){
					this.formInline.ACname='';
				}

				this.getActivity();
			},
			acTypeSelect(label){
				if(label=='全部'){
					this.acTypeValue=0;
				}else if(label=='促销'){
					this.acTypeValue=1;
				}else if(label=='节日'){
					this.acTypeValue=2;
				}else if(label=='其他'){
					this.acTypeValue=3
				}

				if(this.timeValue==null || this.timeValue==''){
					this.setTime();
				}
				if(this.acStateValue==null || this.acStateValue==''){
					this.acStateValue=0;
				}
				if(this.formInline.ACname==null){
					this.formInline.ACname='';
				}

				this.getActivity();
			},
			ACSelectionChange(val){
				this.ActivityTable=val;
			},
			batchDownAC(){
				let Data={
					activity_ids:[]
				}
				for(let i =0;i<this.ActivityTable.length;i++){
					Data.activity_ids.push(this.ActivityTable[i].activityId);
				}
				this.changeActivitysState(Data);

			},
			selectEditRow(index, rows) {
				this.flagEdit=true;
				this.flagAdd=false;
				this.editform.activityName=this.ActivityData[index].activityName;
				this.editform.activityState=this.ActivityData[index].activityState;
				this.editform.activityType=this.ActivityData[index].activityType;
				this.editform.date=[this.ActivityData[index].activityStart,this.ActivityData[index].activityEnd]
				this.editform.activityId=this.ActivityData[index].activityId;
				this.editform.row=index;

				let Data={activity_id:this.editform.activityId};
				this.getActivityItems(Data);
			},
			downEditRow(index, rows) {
				let Data={
					activity_id:rows[index].activityId,
					activity_state:3
				};
				this.changeActivityState(Data,index);
			},
			upEditRow(index, rows) {
				let Data={
					activity_id:rows[index].activityId,
					activity_state:2
				};
				this.changeActivityState(Data,index);
			},
			preEditRow(index, rows) {
				let Data={
					activity_id:rows[index].activityId,
					activity_state:1
				};
				this.changeActivityState(Data,index);
			},
			getActivity(){
				let Data={
					activity_name:this.formInline.ACname,
					activity_start:this.timeValue[0],
					activity_end:this.timeValue[1],
					activity_type:this.acTypeValue,
					activity_state:this.acStateValue
				};
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/activity/selectByDetail',Data).then(r=>{
					this.ActivityData=[];
					for(let i=0;i<r.data.msg.activityList.length;i++){
						r.data.msg.activityList[i].activityStart=r.data.msg.activityList[i].activityStart.replace(/T/g," ").substring(0,11);
						r.data.msg.activityList[i].activityEnd=r.data.msg.activityList[i].activityEnd.replace(/T/g," ").substring(0,11);
						this.ActivityData.push(r.data.msg.activityList[i]);
					}
				});
			},
			getActivityItems(Data){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/activity/selectDetailById',Data).then(r=>{
					this.editform.items=[];
					for(let i=0;i<r.data.msg.activityItemList.length;i++){
						this.editform.items.push(r.data.msg.activityItemList[i]);
					}
					console.log(this.editform);
				});
			},
			getFoodAsActivityItems(){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/food/selectFoodAndDiscount').then(r=>{
					this.addform.items=[];
					for(let i=0;i<r.data.msg.foodAndDiscount.length;i++){
						this.addform.items.push(r.data.msg.foodAndDiscount[i]);
					}
				});
			},
			changeActivityState(Data,index){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/activity/updateState',Data).then(r=>{
					if(r.data.detail=='更新成功'){
						this.ActivityData[index].activityState=Data.activity_state;
					}else{
						this.$message.error('更新失败,请联系管理员');
					}
				});
			},
			changeActivitysState(Data){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/activity/deleteActivity',Data).then(r=>{
					if(r.data.detail=='下架成功'){
						this.getActivity();
					}else{
						this.$message.error('更新失败,请联系管理员');
					}
				});
			},
			addNewActivity(Data){
				this.axios.defaults.withCredentials=true;
				this.axios.post('http://localhost:8080/activity/addActivity',Data).then(r=>{
					console.log(r.data);
					this.getActivity();
				});
			}
		},
		data() {
			return {
				ActivityItems: [],
				ActivityTable:[],
				flagEdit:true,
				flagAdd:false,
				formInline: {
					ACname: '',
				},
				timeValue:'',
				acStateValue:'',
				acTypeValue:'',
				//新增活动信息
				addform: {
					activityId:'',
					activityName: '',
					activityState: '',
					activityType: '',
					date: [],
					items:[],
				},
				//查询活动信息
				editform: {
					row:'',
					activityId:'',
					activityName: '鱼香肉丝',
					activityState: '3',
					activityType: '2',
					date: ['2015-01-03 00:00','2015-02-02 00:00' ],
					items:[],
				},
				ActivityData: [],//活动表
				//日期选择内部选项
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		},


	}
</script>

<style scoped lang="less">
	.orderSelect{
		width:100%;
		height:100%;
		display: flex;
		-background-color: lightpink;
		.orderSelectLeft{
			flex:2;
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
					display: flex;
					-background-color: lightcoral;
				}
			}
		}
		.orderSelectRight{
			flex:1;
			-background-color: lightgreen;
			padding-top: 10px;
			padding-bottom: 10px;
			padding-left: 10px;
			padding-right: 10px;
			display: flex;
			.box-card2{
				width: 100%;
				height: 790px;
			}
		}
	}

</style>
