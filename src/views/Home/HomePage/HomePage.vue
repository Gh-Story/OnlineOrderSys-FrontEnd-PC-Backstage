<template>
	<div class="homePage">
		<!-- <div :style="{width: '300px', height: '300px'}" ref="myChart"></div> -->
		<div class="homePageTop">
				<div class="hpt1">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span style="margin-left: 20px">订单状态</span>
						</div>
						<div class="hpp">
							<div class="hpp1">
								<div class="hppNum">{{waitOrder}}</div>
								<div class="hppTitle">待接单</div>
							</div>
							<div class="hpp1">
								<div class="hppNum">{{underwayOrder}}</div>
								<div class="hppTitle">进行中</div>
							</div>
							<div class="hpp2">
								<div class="hppNum">{{finishedOrder}}</div>
								<div class="hppTitle">已完成</div>
							</div>
						</div>
					</el-card>
				</div>
				<div class="hpt2">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span style="margin-left: 20px">评价状态</span>
						</div>
						<div class="hpp">
							<div class="hpp1">
								<div class="hppNum">{{waitComment}}</div>
								<div class="hppTitle">未回复</div>
							</div>
							<div class="hpp2">
								<div class="hppNum">{{finishedComment}}</div>
								<div class="hppTitle">已回复</div>
							</div>
						</div>
					</el-card>
				</div>

		</div>
		<div class="homePageMedium">
				<div class="hpm1">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span style="margin-left: 20px">今日总览</span>
						</div>
						<div class="hpp">
							<div class="hpp2">
								<div class="hppNum">{{turnover}}</div>
								<div class="hppTitle">今日营业额</div>
							</div>
						</div>
					</el-card>
				</div>
				<div class="hpm2">
					<el-card class="box-card" style="height: 210px;overflow: auto">
						<div slot="header" class="clearfix">
							<span style="margin-left: 20px">通告栏</span>
						</div>
						<div style="padding-left: 20px;padding-right: 20px">{{annunciate}}</div>
<!--						<el-input-->
<!--								type="textarea"-->
<!--								:rows="5"-->
<!--								placeholder=""-->
<!--								v-model="annunciate">-->
<!--						</el-input>-->
					</el-card>
				</div>
		</div>
		<div class="homePageBottom">
				<div class="hpb1">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span style="margin-left: 20px">店铺总览</span>
						</div>
						<div style="width:500px;height:300px;padding-left: 200px" ref="myChart1"></div>
					</el-card>
				</div>
				<div class="hpb2">
					<el-card class="box-card" style="height: 400px;">
						<div slot="header" class="clearfix">
							<span style="margin-left: 20px">今日活动</span>
						</div>
						<div style="padding-left: 20px;padding-right: 20px">{{activityContent}}</div>
<!--						<el-input-->
<!--								type="textarea"-->
<!--								:rows="14"-->
<!--								readonly-->
<!--								v-model="activityContent">-->
<!--						</el-input>-->
					</el-card>
				</div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'hello',
		data() {
			return {
				
				waitOrder: '20',
				underwayOrder: '21',
				finishedOrder: '50',
				waitComment: '200',
				finishedComment: '50',
				turnover: 1000.20,
				activityContent: '全场八折',
				annunciate: '本店今日引进新小吃',
				column:['会员收入', 
						'订单收入', 
						'会员费用', '火锅',
						 '家常菜', '汤',
						 '甜品','炸鸡','饮品',
					],
				// out_array:[
				// 	{value: 335, name: '会员收入', selected: true},
				// 	{value: 1548, name: '订单收入'}
				// ],
				in_array:[
					{value: 1, name: '会员费用'},
					{value: 1,name: '火锅'},
					{value: 1, name: '家常菜'},
					{value: 1, name: '汤'},
					{value: 1, name: '甜品'},
					{value: 1, name: '炸鸡'},
					{value: 1, name: '饮品'},
				]
			};
		},
		computed:{
			out_array:function(){
				let array=[];
				let obj={value:'',name:'会员收入'};
				obj.value=this.in_array[0].value;
				array[0]=obj;
				let obj1={value:'',name:'订单收入'};
				let value=0;
				for(let i=1;i<this.in_array.length;i++){
					value+=this.in_array[i].value;
				}
				obj1.value=value;
				array[1]=obj1;
				return array;
				
				
			}
		},
		mounted() {
			this.$nextTick(function() {
				this.drawLine();
			})

		},
		created(){
			this.axios.get('http://localhost:8080/orders/getDailySumSub1').then(r=>{
				console.log(r.data);
				//this.annunciate=r.data.msg.NewNotice.noticeContent;
				this.waitOrder=r.data.msg.state1.ORDER_NUM;
				this.underwayOrder=r.data.msg.state2.ORDER_NUM + r.data.msg.state3.ORDER_NUM;
				this.finishedOrder=r.data.msg.state4.ORDER_NUM + r.data.msg.state5.ORDER_NUM + r.data.msg.state6.ORDER_NUM;
			});
			
			this.axios.get('http://localhost:8080/evaluation/selectByDetailSub1').then(r=>{
				//console.log(r.data);
				this.waitComment=r.data.msg.state1.EVALUATION_NUM;
				this.finishedComment=r.data.msg.state2.EVALUATION_NUM;
			});
			
			this.axios.get('http://localhost:8080/orders/getDailySumSub2').then(r=>{
				console.log(r.data);
				this.turnover=r.data.msg.turnover.toFixed(2);
				
			});
			
			this.axios.get('http://localhost:8080/activity/getActivityMessage').then(r=>{
				console.log(r.data);
				this.activityContent=r.data.msg.message;
			});
			
			this.axios.get('http://localhost:8080/resturant/getNoticeInfo').then(r=>{
				//console.log(r.data);
				this.annunciate=r.data.msg.NewNotice.noticeContent;
			});
			this.axios.get('http://localhost:8080/orders/chart1').then(r=>{
				console.log(r.data);
				let list = r.data.msg;
				for(let i=0;i<7;i++){
					this.in_array[i].value=list[i];
					//console.log(this.in_array[i].value);
					//console.log(list[i]);
				}
				//console.log(this.in_array);
				this.drawLine();
			});
		},
		methods: {
			
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(this.$refs.myChart1)
				// 绘制图表
				myChart.setOption({
					 tooltip: {
					        trigger: 'item',
					        formatter: '{a} <br/>{b}: {c} ({d}%)'
					    },
					    legend: {
					        orient: 'vertical',
					        left: 10,
					        data: this.column,
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
					            data: this.out_array,
					        },
					        {
					            name: '访问来源',
					            type: 'pie',
					            radius: ['40%', '55%'],
					         
					            data: this.in_array
					        }
					    ]
				});
			},
			
		}
	}
</script>

<style scoped lang="less">
.homePage{
	width:100%;
	height:100%;
	display: flex;
	flex-direction: column;
	-background-color: lightpink;
	.homePageTop{
		flex: 2;
		display: flex;
		padding: 5px;
		-background-color: #409EFF;
		.hpt1{
			flex: 3;
			padding: 5px;

			-background-color: antiquewhite;
		}
		.hpt2{
			flex: 2;
			padding: 5px;
			-background-color: coral;
		}
	}
	.homePageMedium{
		flex: 2;
		display: flex;
		padding: 5px;
		padding-top: 0px;
		-background-color: #42b983;
		.hpm1{
			flex: 3;
			padding: 5px;
			-background-color: antiquewhite;
		}
		.hpm2{
			flex: 2;
			padding: 5px;
			-background-color: coral;
		}
	}
	.homePageBottom{
		flex: 4;
		display: flex;
		padding: 5px;
		padding-top: 0px;
		-background-color: darkgoldenrod;
		.hpb1{
			flex: 3;
			padding: 5px;
			-background-color: antiquewhite;
		}
		.hpb2{
			flex: 2;
			padding: 5px;
			-background-color: coral;
		}
	}
	.hpp{
		display: flex;
		-background-color: #8c939d;
		.hpp1{
			flex: 1;
			border-right-style:solid;
			display: flex;
			flex-direction: column;
			.hppNum{
				flex: 3;
				font-size: 70px;
				color: #409EFF;
				text-align: center;
				-background-color: lightcoral;
			}
			.hppTitle{
				flex: 1;
				-background-color: aqua;
				color: #585d5e;
				text-align: center;
			}
		}
		.hpp2{
			flex: 1;
			display: flex;
			flex-direction: column;
			.hppNum{
				flex: 3;
				font-size: 70px;
				color: #409EFF;
				text-align: center;
				-background-color: lightcoral;
			}
			.hppTitle{
				flex: 1;
				-background-color: aqua;
				color: #585d5e;
				text-align: center;
			}
		}
	}
}
</style>
