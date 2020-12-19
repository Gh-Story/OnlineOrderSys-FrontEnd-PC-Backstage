<template>
	<div class="foodlabels">
	  <el-row>
		  <el-col :span="18" :offset="3">
			<el-card class="box-card">
				<div class="add">
					<el-form :inline="true" :model="formInline" >
					  <el-form-item>
						菜品选择:
						<el-select v-model="formInline.user" placeholder="辣子鸡">
						  <el-option label="辣子鸡" value=""></el-option>
						  <el-option label="涮毛肚" value=""></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item >
						标签选择:
						<el-select v-model="formInline.region" placeholder="川菜">
						  <el-option label="川菜" value=""></el-option>
						  <el-option label="徽菜" value=""></el-option>
						</el-select>
					  </el-form-item>
					  <el-form-item>
						<el-button type="primary" plain @click="onSubmit">增加</el-button>
					  </el-form-item>
					</el-form>
				</div><br />
				<div class="search">
					
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
					  <el-form-item label>
						<el-input v-model="formInline.user" placeholder="请输入标签关键字"></el-input>
					  </el-form-item>
					  <el-form-item>
						<el-button type="primary" plain @click="onSubmit">查询</el-button>
					  </el-form-item>
					</el-form>
				</div>
			</el-card>
		  </el-col>
	  </el-row>
	  <el-row>
		<el-col :span="18" :offset="3">
			<el-card class="box-card">
				<div class="table_part">
					<div class='left'></div>
					<div class='middle'>
					  <el-table
						:data="tableData"
						style="width: 100%"
						>
						<el-table-column
						  prop="id"
						  label="ID"
						  width="180"
						  >
						</el-table-column>
						<el-table-column
						  prop="foodName"
						  label="食物名称"
						  width="180">
						</el-table-column>
						<el-table-column
						  prop="labelName"
						  label="标签名称">
						</el-table-column>
						<el-table-column
						  fixed="right"
						  label="操作"
						  width="100">
						  <template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
							
						  </template>
						</el-table-column>
					  </el-table>
					 
					</div>
					<div class='right'></div>
				</div>
			</el-card>
		  </el-col>
	  </el-row>
	</div>
</template>

<script>
	export default {
	    data() {
	      return {
			
	        formInline: {
	          user: '',
	          region: ''
	        },
			tableData: [{
			  id: '1',
			  foodName: '辣子鸡',
			  labelName: '川菜'
			}, {
			  id: '2',
			  foodName: '毛血旺',
			  labelName: '川菜'
			},{
			  id: '2',
			  foodName: '毛血旺',
			  labelName: '川菜'
			},{
			  id: '2',
			  foodName: '毛血旺',
			  labelName: '川菜'
			},
			]
			
	      }
	    },
		
	    methods: {
	      onSubmit() {
	        console.log('submit!');
	      },
		  handleClick(row) {
		      console.log(row);
		    },
			
		}

		
	  }
</script>

<style lang="less" scoped>
	
	
	
	.foodlabels{
		padding-top: 20px;
		
		.add{
			display:flex;
			justify-content: center;
			font-style: 'normal';
			color: black;
		}
		.search{
			display:flex;
			justify-content: center;
		}
		.table_part{
			display:flex;
			justify-content: center;
			margin:auto;
			.left{
				flex:1;
			}
			.middle{
				
				flex:5;
			}
			.right{
				flex:1;
			}
		}
	}
	
</style>
