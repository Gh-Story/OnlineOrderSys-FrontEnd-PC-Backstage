<template>
	<div class="DataView">
		<el-card class="MyCard" style="margin-bottom: 30px;">
			<el-tabs v-model="activeName" @tab-click="handleClick" >
				<el-tab-pane label="订单量" name="first" >
					<el-col :span="12" >
						<div>
							<h3>订单量总趋势图</h3>
						</div>
						<div class="Page1" style="height: 700px;">
							<div style="width: 100%;height:100%;" ref="first_chart1"></div>
						</div>
					</el-col>
					<el-col :span="12" style="height: 350px;">
						<div class="chart2">
							<div style="margin-bottom: 10px;">
								<h3 style="display: inline;margin-right: 10px;">时段订单量变化图</h3>
								<el-date-picker value-format="yyyy-MM-dd" :clearable="false" type="date" @change="page1_queryDay()" placeholder="选择日期" v-model="firstPage.chart2.date" style="width: 200px;"></el-date-picker>
							</div>
							<div class="Page1" style="height: 300px;">
								<div style="padding-left: 10px; width:500px;height:100%;" ref="first_chart2"></div>
							</div>
						</div>
						
						<div class="chart3" style="margin-top: 10px;">
							<div style="margin-bottom: 10px;">
								<h3 style="display: inline;margin-right: 10px;">周订单量变化图</h3>
								<el-date-picker value-format="yyyy-MM-dd" :clearable="false" type="date" @change="page1_queryWeek()" placeholder="选择日期" v-model="firstPage.chart3.date" style="width: 200px;"></el-date-picker>
							</div>
							<div class="Page1" style="height: 300px;">
								<div style="padding-left: 10px; width:500px;height:100%;" ref="first_chart3"></div>
							</div>
						</div>
					</el-col>
				</el-tab-pane>
				<el-tab-pane label="销售总额" name="second">
					<el-col :span="12" >
						<div style="margin-bottom: 10px;">
							<h3 style="display: inline;margin-right: 10px;">{{this.secondPage.chart1.selectMonth}}年{{this.secondPage.chart1.selectYear}}月销售总额统计图</h3>
							<el-date-picker 
							value-format="yyyy-MM"
							:clearable="false"  
							type="month" 
							@change="page2_queryMonth()" 
							placeholder="选择月份" 
							v-model="secondPage.chart1.selectDate" 
							style="width: 150px;">
							</el-date-picker>
						</div>
						<div class="Page2" style="height: 700px;">
							<div style="height: 700px;width:450px;" ref="second_chart1"></div>
						</div>
					</el-col>
					<el-col :span="12" >
						<div style="margin-bottom: 10px;">
							<h3>销售额总趋势图</h3>
						</div>
						<div class="Page2" style="height: 700px;">
							<div style="width: 450px;height:700px;" ref="second_chart2"></div>
						</div>
					</el-col>
				</el-tab-pane>
				<el-tab-pane label="销售额成分分析" name="third">
					<div class="Page3">
						<div style="margin-bottom: 10px;">
							<h3 style="display: inline;margin-right: 100px;">{{thirdPage.chart2.year}}年销售总额统计图</h3>
							<el-date-picker 
							value-format="yyyy" 
							:clearable="false"  
							type="year" 
							@change="page3_queryYear()" 
							placeholder="选择年份" 
							v-model="thirdPage.chart2.year" 
							style="width: 150px;">
							</el-date-picker>
						</div>
						<div>
							<div class="left">
								<div style="width: 420px;height:480px;" ref="third_chart1"></div>
							</div>
							<div class="right">
								<div v-for="he in hei" >
									<div v-for="item in wid">
										<div class="month" @click="openSelectedMonth(he*3+item)">
											{{he*3+item}}月
											
											<div style="width:150px;height:110px;" :id="`third_chart2_${he*3+item}`"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="活动效果分析" name="fourth">
					<el-col :span="20" :offset="2">
						<div style="width:900px;height:700px;" ref="forth_chart1"></div>
					</el-col>
				</el-tab-pane>
					
			</el-tabs>
		</el-card>
		<el-dialog
		  :title="`${selectedMonth}月销售额成分表`"
		  :visible.sync="dialogVisible"
		  width="50%"
		  >
		  
			<div style="width: 700px;height:480px;" :id="`third_chart2_open_${this.selectedMonth}`"></div>
		  
		</el-dialog>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		
		data() {
		  return {
			selectedMonth:1,
			dialogVisible:false,
			activeName: 'first',
			wid:[1,2,3],
			hei:[0,1,2,3],
			firstPage:{
				chart1:{
					data:'',
					date:''
				},
				chart2:{
					category:['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00',
							'16:00','17:00','18:00','19:00','20:00','21:00','22:00'],
					barData:[60,47,140,86,103,46,62,81,53,106,70,70,100,70,70],
					date:'',
				},
				chart3:{
					date:'',
					label:['周一','周二','周三','周四','周五','周六','周日'],
					data:[200,130,150,250,200,300,400],
					index:0,
					month:0,
					year:0,
				}
			},
			secondPage:{
				chart1:{
					selectDate:'',
					selectMonth:'',
					selectYear:'',
					category:["2000/2/1","2000/2/2", "2000/2/3", "2000/2/4", "2000/2/5",
					  "2000/2/6", "2000/2/7", "2000/2/8", "2000/2/9",
				      "2000/2/10", "2000/2/11", "2000/2/12", "2000/2/13",
					  "2000/2/14", "2000/2/15", "2000/2/16", "2000/2/17",
					  "2000/2/18", "2000/2/19", "2000/2/20", "2000/2/21",
					  "2000/2/22", "2000/2/23", "2000/2/24", "2000/2/25", 
					  "2000/2/26", "2000/2/27", "2000/2/28", "2000/2/29",],
					barData:[60,47,140,86,103,46,62,81,53,106,70,70,100,70,
					70,60,47,140,86,103,46,62,81,53,106,70,70,100,70,70],

				},
				chart2:{
					date:["2020/1","2020/2","2020/3","2020/4"],
					totalSales:[6000.10, 4710.85, 4009, 8607],
				}
			},
			thirdPage:{
				chart1:{
					column:['菜品收入',
							'酒水收入', 
							 '火锅','家常菜', '汤','甜品','炸鸡',
							 '饮品'
					],
					in_array:[
						{value: 1,name: '火锅'},
						{value: 1, name: '家常菜'},
						{value: 1, name: '汤'},
						{value: 1, name: '甜品'},
						{value: 1, name: '炸鸡'},
						{value: 1, name: '饮品'},
					]
				},
				chart2:{
					year:'',
					column:['菜品收入',
							'酒水收入', 
							 '火锅','家常菜', '汤','甜品','炸鸡',
							 '饮品'
					],
					list:[
						{month:1,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:2,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:3,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:4,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:5,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:6,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:7,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:8,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:9,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:10,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:11,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						},
						{month:12,sales:[
							{value: 1,name: '火锅'},
							{value: 1, name: '家常菜'},
							{value: 1, name: '汤'},
							{value: 1, name: '甜品'},
							{value: 1, name: '炸鸡'},
							{value: 1, name: '饮品'}],
						}
					],
					
				}
			},
			forthPage:{
				chart1:{
					label:['活动1','活动2','活动3','活动4','活动5','活动1','活动2','活动3','活动4','活动5'],
					order:[50,60,70,150,80,50,60,70,150,80],
					sales:[150.50,200.10,199.5,500,188,150.50,200.10,199.5,500,188],
					orderPrice:[15.8,16.2,19.5,20.1,22.8,15.8,16.2,19.5,20.1,22.8],
				}
			}
			
		  };
		},
		computed:{
			page1_chart3_data1(){
				let list=[];
				let pre=0;
				for(let i=0;i<this.firstPage.chart3.data.length;i++){
					if((this.firstPage.chart3.data[i]-pre)>0){
						list.push(pre);
					}else{
						list.push(this.firstPage.chart3.data[i]);
					}
					pre=this.firstPage.chart3.data[i]
				}
				return list;
			},
			page1_chart3_data2(){
				let list=[];
				let pre=0;
				for(let i=0;i<this.firstPage.chart3.data.length;i++){
					if((this.firstPage.chart3.data[i]-pre)>0){
						list.push(this.firstPage.chart3.data[i]-pre);
					}else{
						list.push('-');
					}
					pre=this.firstPage.chart3.data[i]
				}
				return list;
			},
			page1_chart3_data3(){
				let list=[];
				let pre=0;
				for(let i=0;i<this.firstPage.chart3.data.length;i++){
					if((this.firstPage.chart3.data[i]-pre)<=0){
						list.push(pre-this.firstPage.chart3.data[i]);
					}else{
						list.push('-');
					}
					pre=this.firstPage.chart3.data[i];
				}
				return list;
			},
			page3_chart1_out_array(){
				let array=[];
				let obj={value:'',name:'酒水收入'};
				let len=this.thirdPage.chart1.in_array.length;
				obj.value=this.thirdPage.chart1.in_array[len-1].value;
				array[1]=obj;
				let obj1={value:'',name:'菜品收入'};
				let value=0;
				for(let i=0;i<this.thirdPage.chart1.in_array.length-1;i++){
					value+=this.thirdPage.chart1.in_array[i].value;
				}
				obj1.value=value;
				array[0]=obj1;
				return array;
			},
			page3_chart2_out_array(){
				let list=this.thirdPage.chart2.list;
				let out_array=[];
				for(let i=0;i<list.length;i++){
					let array=[];
					let obj={value:'',name:'酒水收入'};
					let len=list[i].sales.length;
					obj.value=list[i].sales[len-1].value;
					array[1]=obj;
					let obj1={value:'',name:'菜品收入'};
					let value=0;
					for(let j=0;j<list[i].sales.length-1;j++){
						value+=list[i].sales[j].value;
					}
					obj1.value=value;
					array[0]=obj1;
					out_array.push(array);
				}
				return out_array;
			}
		},
		created(){
			//加载第一页左侧图片
			this.axios.get('http://localhost:8080/orders/chart2').then(r=>{
				//console.log(r.data);
				this.firstPage.chart1.data = r.data.msg.data;
				this.firstPage.chart1.date = r.data.msg.date;
				this.First_Chart1();
			});
			//加载第一页右侧上半部分图片
			let myDate = new Date();
			let time = myDate.toLocaleDateString().split('/').join('-');
			//console.log(time);
			this.axios.post('http://localhost:8080/dataVision/selectOrdersInDayByHour',{
				date:time
			}).then(r=>{
				this.firstPage.chart2.barData=r.data.msg.orders;
				this.First_Chart2();
			});
			//加载第一页右侧下半部分图片
			this.page1_queryWeek();
			
			//加载第二页左侧图片
			this.page2_queryMonth();
			
			//加载第二页右侧图片
			this.axios.post('http://localhost:8080/dataVision/selectOrdersSaleByYearAndMonth',{
			}).then(r=>{
				//console.log("2-1");
				//console.log(r.data);
				this.secondPage.chart2.date=r.data.msg.date;
				this.secondPage.chart2.totalSales=r.data.msg.totalSales;
				this.Second_Chart2();
			});
			
			//加载第三页图片
			this.page3_queryYear();
			
			//加载第四页图片
			this.axios.post('http://localhost:8080/dataVision/selectSaleAverageByActivity',{
			}).then(r=>{
				//console.log("4-1");
				//console.log(r.data);
				this.forthPage.chart1.label=r.data.msg.activityNames;
				this.forthPage.chart1.order=r.data.msg.activityOrderNum;
				this.forthPage.chart1.sales=r.data.msg.activityOrderSales;
				this.forthPage.chart1.orderPrice=r.data.msg.activitySaleAvg;
				this.Forth_Chart1();
			});
		},
		mounted() {
			this.$nextTick(function() {
				this.First_Chart1();
				this.First_Chart2();
				this.First_Chart3();
				this.Second_Chart1();
				this.Second_Chart2();
				this.Third_Chart1();
				//console.log(this.page3_chart2_out_array);
				for(let i=1;i<=12;i++){
					this.Third_Chart2(i);
				}
				this.Forth_Chart1();
			})
		},
		methods: {
			openSelectedMonth(index){
				this.selectedMonth = index;
				this.dialogVisible = true;
				this.$nextTick(() => {
				    this.Third_Chart3(index);
				})
			},
			page1_queryDay(){
				//console.log(this.firstPage.chart2.date);
				this.axios.post('http://localhost:8080/dataVision/selectOrdersInDayByHour',{
					date:this.firstPage.chart2.date
				}).then(r=>{
					console.log(r.data);
					this.firstPage.chart2.barData=r.data.msg.orders;
					this.First_Chart2();
				});
			},
			//获取当前日期的周一日期和是本月的第几周
			page1_queryWeek(){
				
				if(this.firstPage.chart3.date==''){
					let myDate = new Date();
					let time = myDate.toLocaleDateString().split('/').join('-');
					this.firstPage.chart3.date=time;
				}
					
				let currentDay = new Date(this.firstPage.chart3.date);
				let theSaturday = currentDay.getDate() + (6 - currentDay.getDay()); 
				let theMonday = currentDay.getDate()+(1-currentDay.getDay())
				let date=currentDay.getFullYear()+'-'+(currentDay.getMonth()+1)+'-'+theMonday;
				//console.log(theMonday); // 11
				let item={index:0,Monday:''};
				item.index=Math.ceil(theSaturday / 7);
				item.Monday=date;
				this.firstPage.chart3.index=item.index;
				this.firstPage.chart3.month=currentDay.getMonth()+1;
				this.firstPage.chart3.year=currentDay.getFullYear();
				console.log(item);
				
				this.axios.post('http://localhost:8080/dataVision/selectOrdersInDayChange',{
					date:date
				}).then(r=>{
					
					//this.firstPage.chart3.label=r.data.msg.date;
					this.firstPage.chart3.data=r.data.msg.orders;
					this.First_Chart3();
				});
				
				//this.First_Chart3();
				
			},
			page2_queryMonth(){
				console.log(this.secondPage.chart1.selectDate);
				if(this.secondPage.chart1.selectDate==''){
					let myDate = new Date();
					let time = myDate.toLocaleDateString().split('/').join('-');
					this.secondPage.chart1.selectDate=time;
				}
				let str=this.secondPage.chart1.selectDate.split('-');
				this.secondPage.chart1.selectMonth=str[0];
				this.secondPage.chart1.selectYear=str[1];
				let date=str[0]+'-'+str[1];
				this.axios.post('http://localhost:8080/dataVision/selectOrdersSaleInMonth',{
					date:date
				}).then(r=>{
					console.log("???!");
					console.log(r.data);
					this.secondPage.chart1.category=r.data.msg.date;
					this.secondPage.chart1.barData=r.data.msg.totalSales;
					
					//this.firstPage.chart3.label=r.data.msg.date;
					// this.firstPage.chart3.data=r.data.msg.orders;
					this.Second_Chart1();
				});
				
			},
			page3_queryYear(){
				console.log(this.thirdPage.chart2.year);
				if(this.thirdPage.chart2.year==''){
					let myDate = new Date();
					let time = myDate.toLocaleDateString().split('/').join('-');
					let str=time.split('-');
					this.thirdPage.chart2.year=str[0];
				}
				this.axios.post('http://localhost:8080/dataVision/selectSaleByTypeAndTime',{
					year:this.thirdPage.chart2.year
				}).then(r=>{
					console.log("3-1");
					console.log(r.data);
					this.thirdPage.chart2.list=[];
					let list=r.data.msg.list;
					let in_array=[{value: 0,name: '火锅'},{value: 0, name: '家常菜'},{value: 0, name: '汤'},
								  {value: 0, name: '甜品'},{value: 0, name: '炸鸡'},{value: 0, name: '饮品'},];
					
					for(let i=0;i<list.length;i++){
						let list_item={month:1,sales:[{value: 1,name: '火锅'},{value: 1, name: '家常菜'},{value: 1, name: '汤'},
										{value: 1, name: '甜品'},{value: 1, name: '炸鸡'},{value: 1, name: '饮品'}]};
						let item=list[i];
						list_item.month=item.month;
						for(let j=0;j<item.sales.length;j++){
							in_array[j].value+=item.sales[j];
							list_item.sales[j].value=item.sales[j];
						}
						this.thirdPage.chart2.list.push(list_item);
					}
					console.log(in_array);
					console.log(this.thirdPage.chart2.list);
					this.thirdPage.chart1.in_array=in_array;
				
					this.Third_Chart1();
					//console.log(this.page3_chart2_out_array);
					for(let i=1;i<=12;i++){
						this.Third_Chart2(i);
					}
				

				});
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			
			//总趋势图，绘制
			First_Chart1() {
			 	// 基于准备好的dom，初始化echarts实例
			 	let myChart = echarts.init(this.$refs.first_chart1)
			 	// 绘制图表
			 	myChart.setOption({
			 		tooltip: {
			 			trigger: 'axis',
			 			position: function(pt) {
			 				return [pt[0], '10%'];
			 			}
			 		},
			 		title: {
			 			left: 'center',
			 			text: '日订单数量变化',
			 		},
			 		toolbox: {
			 			feature: {
			 				dataZoom: {
			 					yAxisIndex: 'none'
			 				},
			 				restore: {},
			 				saveAsImage: {}
			 			}
			 		},
			 		xAxis: {
			 			type: 'category',
			 			boundaryGap: false,
			 			data: this.firstPage.chart1.date,
			 		},
			 		yAxis: {
			 			type: 'value',
			 			boundaryGap: [0, '100%']
			 		},
			 		dataZoom: [{
			 			type: 'inside',
			 			start: 0,
			 			end: 50
			 		}, {
			 			start: 0,
			 			end: 10,
			 			handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			 			handleSize: '80%',
			 			handleStyle: {
			 				color: '#fff',
			 				shadowBlur: 3,
			 				shadowColor: 'rgba(0, 0, 0, 0.6)',
			 				shadowOffsetX: 2,
			 				shadowOffsetY: 2
			 			}
			 		}],
			 		series: [{
			 			name: '订单量：',
			 			type: 'line',
			 			smooth: true,
			 			symbol: 'none',
			 			sampling: 'average',
			 			itemStyle: {
			 				color: 'rgb(255, 70, 131)'
			 			},
			 			areaStyle: {
			 				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			 					offset: 0,
			 					color: 'rgb(255, 158, 68)'
			 				}, {
			 					offset: 1,
			 					color: 'rgb(255, 70, 131)'
			 				}])
			 			},
			 			data: this.firstPage.chart1.data
			 		}]
			 	});
			},
			First_Chart2() {
			 	// 基于准备好的dom，初始化echarts实例
			 	let myChart = echarts.init(this.$refs.first_chart2);
			 	// 绘制图表
			 	myChart.setOption({
			 		backgroundColor: '#0f375f',
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['趋势', '总量'],
						textStyle: {
							color: '#ccc'
						}
					},
					xAxis: {
						data: this.firstPage.chart2.category,
						axisLine: {
							lineStyle: {
								color: '#ccc'
							}
						}
					},
					yAxis: {
						splitLine: {show: false},
						axisLine: {
							lineStyle: {
								color: '#ccc',
								
							}
						}
					},
					series: [{
						name: '趋势',
						type: 'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 15,
						data: this.firstPage.chart2.barData
					}, {
						name: '总量',
						type: 'bar',
						barWidth: 10,
						itemStyle: {
							barBorderRadius: 5,
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1,
								[
									{offset: 0, color: '#14c8d4'},
									{offset: 1, color: '#dbee5b'}
								]
							)
						},
						data: this.firstPage.chart2.barData
					}]
			 	});
			},
			First_Chart3(){
				let myChart = echarts.init(this.$refs.first_chart3);
				myChart.setOption({
					title: {
						text:this.firstPage.chart3.year+"年"+this.firstPage.chart3.month+"月第"+this.firstPage.chart3.index+"周",
						
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function (params) {
							var tar;
							if (params[1].value !== '-') {
								tar = params[1];
							}
							else {
								tar = params[0];
							}
							return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
						}
					},
					legend: {
						data: ['增加', '减少']
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						splitLine: {show: false},
						data: this.firstPage.chart3.label
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '辅助',
							type: 'bar',
							stack: '总量',
							itemStyle: {
								barBorderColor: 'rgba(0,0,0,0)',
								color: 'rgba(0,0,0,0)'
							},
							emphasis: {
								itemStyle: {
									barBorderColor: 'rgba(0,0,0,0)',
									color: 'rgba(0,0,0,0)'
								}
							},
							data: this.page1_chart3_data1
						},
						{
							name: '增加',
							type: 'bar',
							stack: '总量',
							label: {
								show: true,
								position: 'top'
							},
							data: this.page1_chart3_data2
						},
						{
							name: '减少',
							type: 'bar',
							stack: '总量',
							label: {
								show: true,
								position: 'bottom'
							},
							data: this.page1_chart3_data3
						}
					]
				});
			},
			Second_Chart1() {
			 	// 基于准备好的dom，初始化echarts实例
			 	let myChart = echarts.init(this.$refs.second_chart1);
			 	// 绘制图表
			 	myChart.setOption({
			 		backgroundColor: '#d7f6f8',
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						data: ['趋势', '总量'],
						textStyle: {
							color: '#232323'
						}
					},
					xAxis: {
						data: this.secondPage.chart1.category,
						axisLine: {
							lineStyle: {
								color: '#232323'
							}
						}
					},
					yAxis: {
						splitLine: {show: false},
						axisLine: {
							lineStyle: {
								color: '#232323'
							}
						}
					},
					series: [{
						name: '趋势',
						type: 'line',
						smooth: true,
						showAllSymbol: true,
						symbol: 'emptyCircle',
						symbolSize: 15,
						data: this.secondPage.chart1.barData
					}, {
						name: '总量',
						type: 'bar',
						barWidth: 10,
						itemStyle: {
							barBorderRadius: 5,
							color: new echarts.graphic.LinearGradient(
								0, 0, 0, 1,
								[
									{offset: 0, color: '#a87a93'},
									{offset: 1, color: '#714a2f'}
								]
							)
						},
						data: this.secondPage.chart1.barData
					}]
			 	});
			},
			Second_Chart2() {
			 	// 基于准备好的dom，初始化echarts实例
			 	let myChart = echarts.init(this.$refs.second_chart2)
			 	// 绘制图表
			 	myChart.setOption({
			 		tooltip: {
			 			trigger: 'axis',
			 			position: function(pt) {
			 				return [pt[0], '10%'];
			 			}
			 		},
			 		title: {
			 			left: 'center',
			 			text: '月销售额',
			 		},
			 		toolbox: {
			 			feature: {
			 				dataZoom: {
			 					yAxisIndex: 'none'
			 				},
			 				restore: {},
			 				saveAsImage: {}
			 			}
			 		},
			 		xAxis: {
			 			type: 'category',
			 			boundaryGap: false,
			 			data: this.secondPage.chart2.date,
			 		},
			 		yAxis: {
			 			type: 'value',
			 			boundaryGap: [0, '100%']
			 		},
			 		dataZoom: [{
			 			type: 'inside',
			 			start: 0,
			 			end: 50
			 		}, {
			 			start: 0,
			 			end: 10,
			 			handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
			 			handleSize: '80%',
			 			handleStyle: {
			 				color: '#fff',
			 				shadowBlur: 3,
			 				shadowColor: 'rgba(0, 0, 0, 0.6)',
			 				shadowOffsetX: 2,
			 				shadowOffsetY: 2
			 			}
			 		}],
			 		series: [{
			 			name: '订单量：',
			 			type: 'line',
			 			smooth: true,
			 			symbol: 'none',
			 			sampling: 'average',
			 			itemStyle: {
			 				color: 'rgb(189, 255, 35)'
			 			},
			 			areaStyle: {
			 				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
			 					offset: 0,
			 					color: 'rgb(133, 255, 124)'
			 				}, {
			 					offset: 1,
			 					color: 'rgb(220, 255, 64)'
			 				}])
			 			},
			 			data: this.secondPage.chart2.totalSales
			 		}]
			 	});
			},
			Third_Chart1(){
				let myChart = echarts.init(this.$refs.third_chart1);
				// 绘制图表
				myChart.setOption({
					 tooltip: {
					        trigger: 'item',
					        formatter: '{a} <br/>{b}: {c} ({d}%)'
					    },
					    legend: {
					        orient: 'vertical',
					        left: 0,
					        data: this.thirdPage.chart1.column,
					    },
					    series: [
					        {
					            name: '访问来源',
					            type: 'pie',
					            selectedMode: 'single',
					            radius: [0, '30%'],
							
					            label: {
					                position: 'inner'
					            },
					            labelLine: {
					                show: true
					            },
					            data: this.page3_chart1_out_array,
					        },
					        {
					            name: '访问来源',
					            type: 'pie',
					            radius: ['40%', '55%'],
					         
					            data: this.thirdPage.chart1.in_array
					        }
					    ]
				});
			},
			Third_Chart2(index){
				let str='third_chart2_'+index;
				//console.log(str);
				let myChart = echarts.init(document.getElementById(str));
				// 绘制图表
				myChart.setOption({
					 tooltip: {
					        trigger: 'item',
					        formatter: '{a} <br/>{b}: {c} ({d}%)'
					    },
					    
					    series: [
					        {
					            name: '访问来源',
					            type: 'pie',
					            //selectedMode: 'single',
					            radius: [0, '80%'],
							
					            label: {
					                position: 'inner'
					            },
					            labelLine: {
					                show: true
					            },
					            data: this.page3_chart2_out_array[index-1],
					        }
					    ]
				});
			},
			Third_Chart3(index){
				let str='third_chart2_open_'+index;
				//console.log(str);
				let myChart = echarts.init(document.getElementById(str));
				myChart.setOption({
					 tooltip: {
					        trigger: 'item',
					        formatter: '{a} <br/>{b}: {c} ({d}%)'
					    },
					    legend: {
					        orient: 'vertical',
					        left: 0,
					        data: this.thirdPage.chart1.column,
					    },
					    series: [
					        {
					            name: '访问来源',
					            type: 'pie',
					            selectedMode: 'single',
					            radius: [0, '30%'],
							
					            label: {
					                position: 'inner'
					            },
					            labelLine: {
					                show: true
					            },
					            data: this.page3_chart2_out_array[index-1],
					        },
					        {
					            name: '访问来源',
					            type: 'pie',
					            radius: ['40%', '55%'],
					         
					            data: this.thirdPage.chart2.list[index-1].sales,
					        }
					    ]
				});
			},
			Forth_Chart1(){
				let colors = ['#5793f3', '#d14a61', '#675bba'];
				let myChart = echarts.init(this.$refs.forth_chart1);
				// 绘制图表
				myChart.setOption({
					color: colors,
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					grid: {
						right: '10%'
					},
					toolbox: {
						feature: {
							dataView: {show: true, readOnly: false},
							restore: {show: true},
							saveAsImage: {show: true}
						}
					},
					legend: {
						data: ['订单量', '销售额', '订单均价']
					},
					xAxis: [
						{
							type: 'category',
							axisTick: {
								alignWithLabel: true
							},
							data: this.forthPage.chart1.label
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '订单量',
							position: 'right',
							axisLine: {
								lineStyle: {
									color: colors[0]
								}
							},
							axisLabel: {
								formatter: '{value}'
							}
						},
						{
							type: 'value',
							name: '销售额',
							position: 'right',
							offset: 50,
							axisLine: {
								lineStyle: {
									color: colors[1]
								}
							},
							axisLabel: {
								formatter: '{value} 元'
							}
						},
						{
							type: 'value',
							name: '订单均价',
							position: 'left',
							axisLine: {
								lineStyle: {
									color: colors[2]
								}
							},
							axisLabel: {
								formatter: '{value}元'
							}
						}
					],
					series: [
						{
							name: '订单量',
							type: 'bar',
							data: this.forthPage.chart1.order
						},
						{
							name: '销售额',
							type: 'bar',
							yAxisIndex: 1,
							data: this.forthPage.chart1.sales
						},
						{
							name: '订单均价',
							type: 'line',
							yAxisIndex: 2,
							data: this.forthPage.chart1.orderPrice
						}
					]
				});
			}
		},

	};
</script>

<style lang="less" scoped>
	.DataView{
		.MyCard{
			margin-left: 5%;
			width: 90%;
			margin-top: 20px;
			height: 90%;
			border-radius: 10px;
			.Page3{
				margin-top:30px;
				margin-left: 30px;
				height: 500px;
				width:90%;
				//background-color: greenyellow;
				.left{
					width:39%;
					height: 500px;
					//background-color: yellow;
					float: left;
					border: black solid 1px;
				}
				.right{
					float: right;
					width:60%;
					height: 500px;
					//background-color: black;
					.month{
						width: 33%;
						height:123px;
						float: left;
						border: black solid 1px;
					}
				}
			}
		}
	}
</style>
