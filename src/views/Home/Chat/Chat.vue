<template>
	<div class="Chat">
		<div class="Panel">
			<el-card class="Mycard">
			  <div class="head" slot="header" style="text-align: center;">
			    <span >聊天框</span>
			  </div>
			  <div class="body">
				<div ref="main" class="middle">
					<div ref="content">
						<div v-for="item in Selectmessages">
							<div :class="{left:item.customerId>0,right:item.customerId<0}" style="width: 60%;">
								<div class="name">
									<span>{{name(item)}}</span>
								</div>
								<div class="chartBox">
								  <span v-text="item.message"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<el-row>
						<el-col :span="8">
							<span style="padding-left:4%; font-size: 10px;">发送至：</span>
							<el-select v-model="value"
									   size="mini"
									   style="padding-left: 3%;padding-top: 3px;width:60%" 
									   placeholder="客户名"
									   @change="refresh">
								<el-option
								  v-for="item in baseCustomers"
								  :value="item.index"
								  :label="item.name">
								</el-option>
							</el-select>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="20">
							<el-input
							  style="padding-left: 2%;padding-top: 5px;"
							  type="textarea"
							  :autosize="{minRows:2,maxRows:3}"
							  placeholder="请输入内容"
							  v-model="message">
							</el-input>
						</el-col>
						<el-col :span="4">
							 <el-button @click="sendMessage" style=" float:right; margin-right:15px;margin-top: 15px;" type="warning" size="small">发送</el-button>
						</el-col>
					</el-row>
				</div>
			  </div>
			  
			</el-card>
		</div>
	</div>
	
</template>

<script>
	export default {
		data(){
			return{
				//如果id>0,则将customerName显示在左侧，为用户所发消息
				//如果id=-1,则将customerName显示在右侧，为管理员所回复的消息
				messages:[],
				Selectmessages:[],
				baseCustomers:[],
				value:'',
				message:'',
				ws:''
			}
			
		},
		computed:{
			
			name(){
				return(item)=>{
					if(item.customerId>0)return item.customerName;
					else return '回复:'+item.customerName;
				}
				
			}
		},
		methods:{
			sendMessage(){
				let customerName='';
				for(let i=0;i<this.baseCustomers.length;i++){
					if(this.value==this.baseCustomers[i].index){
						customerName=this.baseCustomers[i].name;
						break;
					}
				}
				let message_item={customerId:-1,customerName:'',toId:0,message:''};
				message_item.customerName=customerName;
				message_item.message=this.message;
				message_item.toId=this.value;
				this.messages.push(message_item);
				this.Selectmessages.push(message_item);
				
				let msg={from:0,to:0,message:''};
				msg.from=-1;
				msg.to=this.value;
				msg.message=message_item.message;
				let res=msg.message+'_'+msg.from+'_'+msg.to;
				console.log(res);
				this.ws.send(res);
				this.message='';
				this.$nextTick(() => {
				       this.$refs.main.scrollTop = this.$refs.content.scrollHeight;
				});
			},
			wsMessage(event) {
                console.log(event.data);//返回数据的内容
				let data=JSON.parse(event.data);
				console.log(data.messageType);
                if(data.messageType==1){
					let message_item={customerId:-1,customerName:'',toId:-1,message:''};
					message_item.customerId=data.clientId;
					message_item.customerName=data.clientName;
					message_item.message=data.message;
					this.messages.push(message_item);
					this.refresh(data.clientId);
					this.$nextTick(() => {
					       this.$refs.main.scrollTop = this.$refs.content.scrollHeight;
					});
				}else if(data.messageType==2){
					this.baseCustomers=[];
					let list=data.onlineUsers;
					for(let i=0;i<list.length;i++){
						if(list[i].customerId>0){
							let item={name:'',index:''};
							item.name = list[i].customerName+'('+list[i].customerId+')';
							item.index = list[i].customerId;
							console.log(item);
							this.baseCustomers.push(item);
						}
						
					}
					
					
				}
				

            },
            wsOpen() {
                console.log('websocket-连接已经建立');
            },
            wsClose() {
                console.log('websocket-连接已经关闭');
            },
            wsError() {
                console.log('websocket-出现错误');
            },
			refresh(val){
				this.Selectmessages=[];
				for(let i=0;i<this.messages.length;i++){
					if(this.messages[i].customerId==val||this.messages[i].toId==val){
						this.Selectmessages.push(this.messages[i]);
					}
				}
			}
            
		},
		created(){
			this.ws = new WebSocket(`ws://localhost:8080/wss/客服小饱/-1`);
			this.ws.onopen = this.wsOpen;
			this.ws.onclose = this.wsClose;
			this.ws.onerror = this.wsError;
			this.ws.onmessage = this.wsMessage;
		}
	}
</script>

<style lang="less" scoped>

	.Chat{
		width: 100%;
		.Panel{
			//background-color: blue;
			height:580px;
			width:70%;
			margin-top: 30px;
			margin-left: 10%;
			margin-right: 100px;
			.Mycard{
				height: 100%;
				/deep/ .el-card__header{
					background-color:#f6f6f6 ;
				}
				.head{
					//background-color: #f6f6f6;
				}
				.body{
					
					.middle{
						padding-left: 5px;
						padding-right: 5px;
						height: 405px;
						overflow: auto;
						//background-color: #eaeaea;
						.left{
							padding-top: 5px;
							float:left;
							text-align: left;
							.chartBox{
								padding-left: 15px;
							}
							
						}
						.right{
							float:right;
							text-align: right;
							.chartBox{
								padding-right: 15px;
								span{
									padding:5px;
									//background-color: #e2f5fa;
									
								}
								
							}
						}
						.name{
							font-size: 12px;
						}
						.chartBox{
							padding: 6px;
							font-size: 16px;
							span{
								background-color: #e2f5fa;
								border: 1px solid #e5e8f0;
								padding: 3px;
								border-radius: 5px;
								padding:5px;
								word-break:break-all;
								display:inline-block;
								//display:block; 
								//word-wrap : break-word ;
							}
							
						}
					}
					.bottom{
						height: 90px;
						//background-color: #e5e8f0;
						border-top:1px solid #e5e8f0;
						/deep/ .el-button{
							background-color: #e2f5fa;
							border-color:  #c6f5fa;
							color: black;
						}
					}
				}
				/deep/.el-card__body{
					padding: 0px !important;
					
				}
				
			}
		}
	}
	
</style>