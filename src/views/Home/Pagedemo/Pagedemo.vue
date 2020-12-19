<template>
    <el-main>
   
      <el-table :data="tableData"  v-loading="loading" border style="width: 100%">
		  <el-table-column label="编号" prop="BookId">
		  </el-table-column>
		  <el-table-column  label="标题"  prop="Title">
		  </el-table-column>
		  <el-table-column  label="出版社"  prop="PublishName">
		  </el-table-column>
		  
		  <el-table-column label="操作">
			<template slot-scope="scope">
			  <el-button
				@click="handleDelete(scope.$index, scope.row)"
				size="mini"
				type="danger">联系ta
			  </el-button>
			</template>
		  </el-table-column>
	  </el-table>
    <!-- 分页底部 -->
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
    </el-main>
</template>

<script>
	import Pagedemo from './Pagedemo';
	
	export default {
	    name: "phoneList",
	    data(){
	        return{
	            tableData:[],
	            // 是否加载数据
	            loading:true,
	            currentpage:1,
	            pagesize:10,
	            files_count:80,
				
	        };
	    },
		created(){
			this.hadleGetFilesListApi();
			Pagedemo.QueryAll({},res=>{
				this.files_count=res.length;
			});
		},
		methods:{
		//分页 初始页currentPage、初始每页数据数pagesize和数据testpage--->控制每页几条
			handleSizeChange:function(size){
				this.pagesize = size;
				this.hadleGetFilesListApi();
				console.log(this.pagesize)
				console.log(this.hadleGetFilesListApi())
			},
			// 控制页面的切换
			handleCurrentChange: function(currentpage) {
				this.currentpage = currentpage;
				// console.log(currentPage)
				this.hadleGetFilesListApi();
			},
			//对所有数据进行分页处理 发送请求
			hadleGetFilesListApi() {
				Pagedemo.QueryList({
					currentpage:this.currentpage,
					pagesize:this.pagesize,
				},res => {
					console.log(res);
					this.tableData = res.data;
					//this.files_count = res.size;
					//this.tableDateAll = res.data;
					this.loading = false;
				});
			  
			}
		}
	}
	
</script>

<style scoped>
</style>
