<template>
	<div>
		<!-- <div :style="{width: '300px', height: '300px'}" ref="myChart"></div> -->
		<el-row type="flex" justify="space-around" class="fm_div">
			<el-col :span="16">
				<div>
					<el-container>
						<el-header height="80px">
							<el-container direction="horizontal">
								<h2>营业统计：</h2>
								<div class="block">

									<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
									 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
									</el-date-picker>
								</div>
							</el-container>
						</el-header>
						<h1 class="footerdiv"></h1>
						<el-header height="120px">
							<el-row :gutter="20" class="fm_div">
								<el-col :span="8">
									<el-container direction="horizontal">

										<h1>营业额：</h1>
										<h1>{{value3}}</h1>

									</el-container>
								</el-col>
								<el-col :span="8">
									<el-container direction="horizontal">

										<h1>成本：</h1>
										<h1>{{value4}}</h1>

									</el-container>
								</el-col>
								<el-col :span="8">
									<el-container direction="horizontal">

										<h1>预计收入：</h1>
										<h1>{{value5}}</h1>

									</el-container>
								</el-col>
							</el-row>
						</el-header>
						<h1 class="footerdiv">订单数据：</h1>
						<el-footer height="320px" class="el-footer1">
							<el-container>
								<el-aside width="240px">

									<el-row>
										<el-container direction="vertical">
											<el-col :span="24">
												<el-container direction="horizontal">

													<h1>有效订单数量：</h1>
													<h1>{{value6}}</h1>

												</el-container>
											</el-col>
											<el-col :span="24">
												<el-container direction="horizontal">

													<h1>平均订单价：</h1>
													<h1>{{value7}}</h1>

												</el-container>
											</el-col>
											<el-col :span="24">
												<el-container direction="horizontal">

													<h1>无效订单数：</h1>
													<h1>{{value8}}</h1>

												</el-container>
											</el-col>
											<el-col :span="24">
												<el-container direction="horizontal">

													<h1>预计损失：</h1>
													<h1>{{value9}}</h1>

												</el-container>
											</el-col>
										</el-container>
									</el-row>

								</el-aside>
								<el-container>

									<el-footer height="320px">
										<div :style="{width: '560px', height: '320px'}" ref="myChart1"></div>
									</el-footer>
								</el-container>
							</el-container>

						</el-footer>
					</el-container>
				</div>
			</el-col>

			<el-col :span="7">
				<div class="grid-content bg-purple">
					<h1 class="footerdiv">各时段营收情况：</h1>
					<div :style="{width: '360px', height: '520px'}" ref="myChart2"></div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'hello',
		data() {
			return {
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
				value1: '',
				value2: '',
				value3: '￥10000.90',
				value4: '￥4800.90',
				value5: '￥5200.00',
				value6: '200',
				value7: '50',
				value8: '6',
				value9: '52.00'
			};
		},
		mounted() {
			this.$nextTick(function() {
				this.drawLine();
				this.drawline2();
			})

		},
		methods: {
			drawLine() {
				var base = +new Date(1968, 9, 3);
				var oneDay = 24 * 3600 * 1000;
				var date = [];

				var data = [Math.random() * 300];

				for (var i = 1; i < 20000; i++) {
					var now = new Date(base += oneDay);
					date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
					data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
				}
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(this.$refs.myChart1)
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
						text: '日订单数量',
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
						data: date
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%']
					},
					dataZoom: [{
						type: 'inside',
						start: 0,
						end: 10
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
						name: '模拟数据',
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
						data: data
					}]
				});
			},
			drawline2() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(this.$refs.myChart2)
				// 绘制图表
				myChart.setOption({
					// title: {
					// 	text: '各时段营收情况',
					// 	subtext: '纯属虚构',
						
					// },
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#283b56'
							}
						}
					},
					legend: {
						data: ['实时利润', '成交订单']
					},
					toolbox: {
						show: true,
						feature: {
							dataView: {
								readOnly: false
							},
							restore: {},
							saveAsImage: {}
						}
					},
					dataZoom: {
						show: false,
						start: 0,
						end: 100
					},
					xAxis: [{
							type: 'category',
							boundaryGap: true,
							data: (function() {
								var now = new Date();
								var res = [];
								var len = 10;
								while (len--) {
									res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
									now = new Date(now - 2000);
								}
								return res;
							})()
						},
						{
							type: 'category',
							boundaryGap: true,
							data: (function() {
								var res = [];
								var len = 10;
								while (len--) {
									res.push(10 - len - 1);
								}
								return res;
							})()
						}
					],
					yAxis: [{
							type: 'value',
							scale: true,
							name: '订单',
							max: 30,
							min: 0,
							boundaryGap: [0.2, 0.2]
						},
						{
							type: 'value',
							scale: true,
							name: '利润',
							max: 1200,
							min: 0,
							boundaryGap: [0.2, 0.2]
						}
					],
					series: [{
							name: '实时利润',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: (function() {
								var res = [];
								var len = 10;
								while (len--) {
									res.push(Math.round(Math.random() * 1000));
								}
								return res;
							})()
						},
						{
							name: '成交订单',
							type: 'line',
							data: (function() {
								var res = [];
								var len = 0;
								while (len < 10) {
									res.push((Math.random() * 10 + 5).toFixed(1) - 0);
									len++;
								}
								return res;
							})()
						}
					]
				});
				
			}
		}
	}
</script>

<style scoped>
	.el-container {
		border-radius: 40px;
	}

	.el-aside {
		background-color: #antiquewhite;
		color: #333;
		text-align: center;

	}


	.el-header {
		background-color: white;
		color: #333;
		text-align: center;
		line-height: 80px;
		border-radius: 12px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}

	.el-footer1 {
		background-color: antiquewhite;
		color: #333;

		line-height: 60px;
		border-radius: 12px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

	}

	.el-row {
		margin-bottom: 20px;


		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;

	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 40px;
		min-height: 36px;

	}

	.fm_div {
		margin-top: 20px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.footerdiv {
		margin-top: 6px;
		margin-left: 20px;
		margin-bottom: 6px;
	}

	.rowmargin {
		margin-top: 30px;
	}

	.chart1 {
		width: '350px';
		height: '300px';
		margin-top: 30px;
	}

	.spanfloat {
		float: left;
		margin: 10px;
	}
</style>
