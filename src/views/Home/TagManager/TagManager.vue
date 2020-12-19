<template>
	<div class="tag">
		<div class="tagLeft">
			<div class="tagLeftTop">
				<el-card class="box-card">
					<div class="fmt">
						<div class="fmt1">
							标签查找 :
						</div>
						<div class="fmt2">
							<el-input
									placeholder="请输入标签相关信息查询"
									v-model="tag_name"
									prefix-icon="el-icon-search"
									clearable>
							</el-input>
						</div>
						<div class="fmt3">
							<el-button @click="searchTags" type="primary">查询标签</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div class="tagLeftBottom">
				<el-card class="box-card" style="height: 650px">
					<div class="fmbTop">
						<div class="fmt1">
							标签管理详细列表
						</div>
						<div class="fmt2">
							<el-button @click="" size="small" icon="el-icon-delete" plain>批量删除</el-button>
							<el-button @click="addTags" size="small" icon="el-icon-plus" plain>新增标签</el-button>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="fmbBottom">
						<el-table
								ref="multipleTable"
								:data="tags"
								height="470"
								tooltip-effect="dark"
								style="width: 100%;align-content: center;text-align: center"
								v-loading="loading">
							<el-table-column
									type="selection"
									align="center"
									width="120">
							</el-table-column>
							<el-table-column
									label="标签编号"
									prop="ID"
									width="180"
									align="center">
							</el-table-column>
							<el-table-column
									label="标签名称"
									prop="name"
									align="center"
									width="300">
							</el-table-column>
							<el-table-column
									label="标签状态"
									align="center"
									width="200">
								<template slot-scope="scope">
									<el-tag
										v-if="scope.row.state==1"
										:key="scope.row.state"
										size="mini"
										type=""
										effect="plain">
										使用中
									</el-tag>
									<el-tag
										v-if="scope.row.state==2"
										:key="scope.row.state"
										size="mini"
										type="info"
										effect="plain">
										已作废
									</el-tag>
								</template>
							</el-table-column>
							<el-table-column
									align="center"
									label="操作"
									width="320"
									show-overflow-tooltip>
								<template slot-scope="scope">
									<el-button
											@click="updateTags(scope.row)"
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
					</div>
					<div style="margin-top: 10px;float:right">
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
		<div class="tagRight">
			<div class="tagRightTop">
				<el-card class="box-card" style="height: 320px;">
					<div slot="header" class="clearfix">
						<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">标签增加</div>
					</div>
					<div >
						<br /><br />
						<el-form  ref="form" label-width="100px">
							<el-form-item label="标签名称">
								<el-input  placeholder="请输入标签名称" v-model="add_tagName" style="width:90%;"></el-input>
							</el-form-item>
							<div style="text-align: center;padding-top: 20px;padding-bottom: 20px">
								<el-button @click="cancelAdd()">取 消</el-button>
								<el-button type="primary" @click="submitAdd()">确 定</el-button>
							</div>
							
						</el-form>
					</div>
				</el-card>
			</div>
			<div class="tagRightBottom">
				<el-card class="box-card" style="height: 400px;">
					<div slot="header" class="clearfix">
						<div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">标签编辑</div>
					</div>
					<div >
						<el-form  ref="form" label-width="100px">
							<br /><br />
							<el-form-item label="标签名称">
								<el-input  placeholder="请输入标签名称" v-model="update.tag_name" style="width:90%;"></el-input>
							</el-form-item>
							<el-form-item label="标签状态">
								<el-select v-model="update.state" style="width:90%;" placeholder="请选择活动区域">
									<el-option label="使用中" value="使用中"></el-option>
									<el-option label="已作废" value="已作废"></el-option>
								</el-select>
							</el-form-item>
							<div style="text-align: center;padding-top: 20px;padding-bottom: 20px">
								<el-button @click="cancelUpdate()">取 消</el-button>
								<el-button type="primary" @click="submitUpdate()">确 定</el-button>
							</div>

						</el-form>
					</div>
				</el-card>
			</div>

		</div>
		<div class="dialog">
			<el-dialog title="新增标签" :visible.sync="dialogFormVisible">
			  <el-form >
				<el-form-item label="标签名称" :label-width="formLabelWidth">
				  <el-input v-model="add_tagName" style="width:150px"autocomplete="off"></el-input>
				</el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
				<el-button @click="cancelAdd()">取 消</el-button>
				<el-button type="primary" @click="submitAdd()">确 定</el-button>
			  </div>
			  
			</el-dialog>
		</div>
		<div class="dialog1">
			<el-dialog title="修改标签" :visible.sync="update_dialogFormVisible">
			  <el-form >
				<el-form-item label="标签名称" :label-width="formLabelWidth">
				  <el-input v-model="update.tag_name" style="width:150px"autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态" :label-width="formLabelWidth">
				  <el-select v-model="update.state" style="width:45%;" placeholder="请选择活动区域">
				    <el-option label="使用中" value="使用中"></el-option>
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
			tag_name:'',
			tags:[
				{
					ID:'1',
					name:'川菜',
					state:'1',
				},
				{
					ID:'2',
					name:'江浙菜',
					state:'2',
				}
			],
			add_tagName:'',
			update:{
				tag_name:'',
				tag_id:'',
				state:'',
			},
			
			dialogFormVisible:false,
			update_dialogFormVisible:false,
			formLabelWidth: '120px',
	    }
	  },
		created(){
	  		//动态加载所有标签
			this.searchTags();
		},
	  methods:{
		searchTags(){
			//console.log(this.tag_name);
			this.currentpage=1;
			this.searchTagsPage();
		},
		searchTagsPage(){
			//console.log(this.tag_name);
			this.axios.default.withCredentials=true;
			this.axios.post('http://localhost:8080/tag/selectByDetailPage',{
				tag_name:this.tag_name,
				page:this.currentpage,
				rows:this.pagesize,
			}).then(r=>{
				console.log(r.data);
				let list = r.data.msg.pageInfo.list;
				this.tags=[];
				for(let i=0;i<list.length;i++){
					let item={ID:'',name:'',state:''};
					item.ID=list[i].tagId;
					item.name=list[i].tagName;
					item.state=list[i].tagState;
					
					this.tags.push(item);
				}
				this.loading=false;
				this.files_count=r.data.msg.pageInfo.total;
				
			});
		},
		addTags(){
			this.dialogFormVisible=true;
		},
		submitAdd(){
			console.log(this.add_tagName);
			let add_tag={tagName:'',tagState:'1'};
			add_tag.tagName=this.add_tagName;
			console.log(add_tag);
			this.axios.default.withCredentials=true;
			this.axios.post('http://localhost:8080/tag/addTag',add_tag).then(r=>{
				console.log(r.data);
				this.searchTags();
			});
			this.dialogFormVisible=false;
		},
		cancelAdd(){
			this.add_tagName="";
			this.dialogFormVisible=false;
		},
		updateTags(row){
			this.update.tag_name=row.name;
			this.update.tag_id=row.ID;
			if(row.state==1){
				this.update.state="使用中";
			}else{
				this.update.state="已作废";
			}
			this.update_dialogFormVisible=true;
		},
		cancelUpdate(){
			this.update.tag_name="";
			this.update_dialogFormVisible=false;
		},
		submitUpdate(){
			let update_manager={'tagId':'', 'tagName':'', 'tagState':''};
			if(this.update.state=='使用中')
				update_manager.tagState=1;
			else
				update_manager.tagState=2;
			update_manager.tagId=this.update.tag_id;
			update_manager.tagName=this.update.tag_name;
			
			 console.log(update_manager);
			this.axios.default.withCredentials=true;
			this.axios.post('http://localhost:8080/tag/updateTag',update_manager).then(r=>{
				console.log(r.data);
				this.searchTags();
			});
			
			this.update_dialogFormVisible=false;
		},
		del(row){
			this.axios.default.withCredentials=true;
			this.axios.post('http://localhost:8080/tag/deleteTag',{
				tag_id:row.ID
			}).then(r=>{
				console.log(r.data);
				//alert("删除成功");
				this.$message.error('删除成功');
			});
			console.log(row.ID);
		},
		formatDate(value){
			  if(value.state==1)
		        return "使用中";
			  else
			    return "已作废";
		},
		handleSizeChange:function(size){
			this.pagesize = size;
			this.searchTags();
		},
		// 控制页面的切换
		handleCurrentChange: function(currentpage) {
			this.currentpage = currentpage;
			// console.log(currentPage)
			this.searchTagsPage();
		},
	  }
	};
</script>

<style lang="less" scoped>
.tag{
	width:100%;
	height:100%;
	display: flex;
	-background-color: lightpink;
	.tagLeft{
		flex:2;
		flex-direction: column;
		-background-color: lightcoral;
		display: flex;
		.tagLeftTop{
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
		.tagLeftBottom{
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
	.tagRight{
		flex:1;
		-background-color: lightgreen;
		padding-top: 10px;
		padding-bottom: 10px;
		padding-left: 10px;
		padding-right: 10px;
		display: flex;
		flex-direction: column;
		.tagRightTop{
			flex: 2;

		}
		.tagRightBottom{
			flex: 3;
			padding-top: 15px;
		}
	}
}
</style>
