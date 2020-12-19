<template>
    <div class="foodManage">

        <div class="foodMangeLeft">

            <div class="foodManageTop">
                <el-card class="box-card">
                    <div class="fmt">
                        <div class="fmt1">
                            美食查找 :
                        </div>
                        <div class="fmt2">
                            <el-input
                                    placeholder="请输入美食相关信息查询"
                                    v-model="foodSearchInput"
                                    prefix-icon="el-icon-search"
                                    clearable>
                            </el-input>
                        </div>
                        <div class="fmt3">
                            <el-button @click="searchFoods" type="primary">查询美食</el-button>
                        </div>
                    </div>
                </el-card>
            </div>

            <div class="foodManageMedium">
                <el-card class="box-card">
                    <div class="fmm">
                        <div class="mm1">
                            美食状态 :
                        </div>
                        <div class="mm2">
                            <el-radio-group  size="small" v-model="foodStateRadio" @change="searchFoods">
                                <el-radio-button label="0">全部</el-radio-button>
                                <el-radio-button label="1">已上架</el-radio-button>
                                <el-radio-button label="2">已下架</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </el-card>
            </div>

            <div class="foodManageBottom">
                <el-card class="box-card" style="height: 560px">
                    <div class="fmbTop">
                        <div class="fmt1">
                            美食管理详细列表
                        </div>
                        <div class="fmt2">
                            <el-button @click="deleteFoods" size="small" icon="el-icon-delete" plain>批量删除</el-button>
                            <el-button @click="downFoods" size="small" icon="el-icon-bottom" plain>批量下架</el-button>
                            <el-button @click="upFoods" size="small" icon="el-icon-top" plain>批量上架</el-button>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="fmbBottom">
                        <el-tabs  v-model="FoodTypeValue" :tab-position="tabPosition" style="height: 100%;" @change="changeTabPane">
                            <el-tab-pane
                                    :key="item.name"
                                    v-for="(item, index) in foodTypeList"
                                    :label="item.title"
                                    :name="item.name"

                                    icon="el-icon-star-off">
                                <!--                                        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">-->
                                <el-table
                                        ref="multipleTable"
                                        :data="item.foodList"
                                        height="405"
										width="100%"
                                        tooltip-effect="dark"
                                        style="width: 100%;align-content: center;text-align: center"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column
                                            type="selection"
                                            align="center"
                                            width="80">
                                    </el-table-column>
                                    <el-table-column
                                            label="美食编号"
                                            prop="foodId"
                                            align="center"
                                            v-if="false"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                            label="美食名称"
                                            prop="foodName"
                                            align="center"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            label="美食图片"
                                            align="center"
                                            width="200">
                                        　<template slot-scope="scope">
                                        　　　　<img style="border-radius: 20%;" :src="scope.row.foodPicture" width="80" height="60"/>
                                        　　</template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="foodPrice"
                                            label="美食价格(￥)"
                                            align="center"
                                            width="80"
                                            show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                            label="美食标签"
                                            align="center"
                                            width="150"
                                            show-overflow-tooltip>
                                        　<template slot-scope="scope">
                                        <div class="tag-group" v-if="scope.row.foodTags!=[]">
                                            <el-tag
                                                    v-for="tag in scope.row.foodTags"
                                                    :key="tag.tagId"
                                                    :value='item.value'
                                                    size="mini"
                                                    type="info"
                                                    effect="plain">
                                                {{ tag.tagName }}
                                            </el-tag>
                                        </div>
                                        　</template>
                                    </el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="操作"
                                            width="220"
                                            show-overflow-tooltip>
                                        　<template slot-scope="scope">
                                        <el-button
                                                @click="EditRow(scope.$index, item.foodList, item.title)"
                                                type="text"
                                                size="small"
                                                class="el-icon-edit-outline">
                                            编辑
                                        </el-button>
                                        <el-button
                                                v-if="scope.row.foodState==1"
                                                @click="DownRow(scope.$index, item.foodList, scope.row.foodId)"
                                                type="text"
                                                size="small"
                                                class="el-icon-bottom">
                                            下架
                                        </el-button>
                                        <el-button
                                                v-else-if="scope.row.foodState==2"
                                                @click="UpRow(scope.$index, item.foodList, scope.row.foodId)"
                                                type="text"
                                                size="small"
                                                class="el-icon-top">
                                            上架
                                        </el-button>
                                        <el-button
                                                @click="DeleteRow(scope.$index, item.foodList, scope.row.foodId)"
                                                type="text"
                                                size="small"
                                                class="el-icon-delete">
                                            删除
                                        </el-button>
                                        <!--                                                        <el-button size="mini" type="success" icon="el-icon-edit-outline" round>编辑</el-button>-->
                                        <!--                                                        <el-button size="mini" type="warning" icon="el-icon-download" round>下架</el-button>-->
                                        <!--                                                        <el-button size="mini" type="danger" icon="el-icon-delete" round>删除</el-button>-->
                                        <!--                                                            <el-button size="mini" type="success" round>编辑</el-button>-->
                                        <!--                                                            <el-button size="mini" type="warning" round>下架</el-button>-->
                                        <!--                                                            <el-button size="mini" type="danger" round>删除</el-button>-->
                                        　</template>
                                    </el-table-column>
                                </el-table>
                                <!--                                        </ul>-->
                            </el-tab-pane>
                        </el-tabs>
                    </div>

                </el-card>
            </div>

        </div>

        <div class="foodMangeRight">
            <el-card class="box-card" style="height: 750px;">
                <div slot="header" class="clearfix">
                    <div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">美食操作</div>
                </div>
                <div>
                    <span style="float: right"><i class="el-icon-refresh" @click="refreshFood" style="color: lightcoral;"></i></span>
                </div>
                <br>
                <div class="foodOperate">
                    <el-form  ref="form" :model="form" label-width="100px">
                        <el-form-item label="美食名称">
                            <el-input  placeholder="请输入美食名称" v-model="form.addName" style="width:90%;"></el-input>
                        </el-form-item>
                        <el-form-item label="美食图片">
                            <div @click="uploadFoodImg">
                                <img style="border-radius:10%; width:150px; height:150px;" :src="form.addImageUrl" fit="cover">
                                <input  hidden="hidden" type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                            </div>
                        </el-form-item>
                        <el-form-item label="美食介绍">
                            <el-input  placeholder="请输入美食介绍" v-model="form.addIntro" style="width:90%;"></el-input>
                        </el-form-item>
                        <el-form-item label="美食价格">
                            <el-input  placeholder="请输入美食价格（单位：元）" v-model="form.addPrice" style="width:90%;"></el-input>
                        </el-form-item>
                        <el-form-item label="美食标签">
                            <el-select v-model="form.showTag" multiple clearable filterable placeholder="请选择标签" style="width:70%;">
                                <el-option
                                        v-for="item in tagOptions"
                                        :key="item.tagId"
                                        :label="item.tagName"
                                        :value="item.tagId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="美食类别">
                            <el-select v-model="form.addType" clearable filterable placeholder="请选择类别" style="width:70%;">
                                <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <br>
                        <el-form-item label-width="0px" style="text-align: center">
                            <el-button @click="addFood" type="primary" plain>新建</el-button>
                            <el-button @click="updateFood" type="success" plain>修改</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FoodManage",
        data(){
            return{
                tabPosition:'left',//标签页位置
                FoodTypeValue:'1',//美食分类标签
                foodSearchInput:'',//美食查找输入内容
                foodStateRadio:0,//美食状态选择按钮库
                selectData:{//查询单元
                    food_name:'',
                    food_state:0,
                },
                //分类好的美食信息
                foodTypeList:[{
                    title: '火锅',
                    name: '1',
                    foodList:[{
                        foodId:1,
                        foodName:'娃娃菜',
                        foodPicture:'蒜蓉粉丝娃娃菜.jpg',
                        foodPrice:5,
                        foodState:1,
                        foodTags:[{tagId:1,tagName:'蔬菜'},{tagId:3,tagName:'营养'}],
                    },{
                        foodId:2,
                        foodName:'午餐肉',
                        foodPicture:'',
                        // foodPicture:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=547821474,4237688352&fm=26&gp=0.jpg',
                        foodPrice:6,
                        foodState:1,
                        foodTags:[{tagId:4,tagName:'肉类'},{tagId:5,tagName:'营养'}],
                    },{
                        foodId:3,
                        foodName:'肥牛卷',
                        foodPicture:'',
                        // foodPicture:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3065354095,3544446718&fm=26&gp=0.jpg',
                        foodPrice:12,
                        foodState:1,
                        foodTags:[{tagId:2,tagName:'肉类'},{tagId:3,tagName:'营养'}],
                    },{
                        foodId:4,
                        foodName:'土豆片',
                        foodPicture:'',
                        // foodPicture:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3782499358,4065490872&fm=26&gp=0.jpg',
                        foodPrice:3,
                        foodState:2,
                        foodTags:[{tagId:1,tagName:'蔬菜'},{tagId:3,tagName:'营养'}],
                    }],
                },{
                    title: '家常菜',
                    name: '2',
                    foodList:[],
                },{
                    title: '汤',
                    name: '3',
                    foodList:[],
                },{
                    title: '甜品',
                    name: '4',
                    foodList:[],
                },{
                    title: '炸鸡',
                    name: '5',
                    foodList:[],
                },{
                    title: '饮品',
                    name: '6',
                    foodList:[],
                }],
                foodList:[],
                fileList:[],
                disabled: false,
                //提交新建/申请单元
                form: {
                    addId:'',
                    addName: '',
                    addImageUrl: require('../../../../static/图片上传.png'),
                    addIntro:'',
                    addPrice: '',
                    showTag:[],
                    addTag:[],
                    addType: '',
                    delivery: false,
                },
                //美食单元
                food:{
                    foodId:'',//美食ID
                    foodName:'',//美食名称
                    foodPrice:'',//美食价格
                    foodPicture:'',//美食图片
                    foodIntroduction:'',//美食介绍
                    foodState:1,//美食状态
                    foodTags:[],//美食标签类别
                    foodType:'',//美食类别
                },
                //标签单元
                tag:{
                    tagId:0,//标签ID
                    tagName:'',//标签名
                    tagState:'1',//标签状态
                },
                //挑选美食标签
                tagOptions: [],
                //挑选美食类别
                typeOptions: [{
                    value: 1,
                    label: '火锅'
                }, {
                    value: 2,
                    label: '家常菜'
                }, {
                    value: 3,
                    label: '汤'
                }, {
                    value: 4,
                    label: '甜品'
                }, {
                    value: 5,
                    label: '炸鸡'
                }, {
                    value: 6,
                    label: '饮品'
                }],
                value: '',
                selectFoodIds:{
                    foodIDs:[],//多选美食列表
                },

            }
        },
        created() {
            //动态获取美食列表
            this.searchFoods();
            this.getAllTags();
        },
        methods: {
            uploadFoodImg: function () {
                this.$el.querySelector('.hiddenInput').click();
            },
            handleFile: function (e) {
                let $target = e.target || e.srcElement;
                let formData = new FormData();
                formData.append('pic', $target.files[0]);
                console.log($target.files[0]);
                console.log(formData);
                this.axios.post(`http://localhost:8080/food/up`,formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(r=>{
                    //console.log(r.data);
                    //console.log("http://localhost:8080/image/"+r.data.saveFileName);
                    this.form.addImageUrl="http://localhost:8080/image/"+r.data.saveFileName;

                });
            },
            //获取美食所有标签
            getAllTags() {

                this.axios.post(`http://localhost:8080/tag/getAllTags`).then(r=>{
                    console.log(r);
                    let obj = r.data;
                    if(obj){
                        this.tagOptions = r.data.msg.tagOptions;
                    }else{
                        
						this.$message.error('获取美食标签失败');
                    }
                });
            },
            itemSelectHandler(index,indexPath){
                console.log(index);
                console.log(indexPath);
            },
            // handleRemove(file) {
            //     console.log(file);
            // },
            //切换美食类别
            changeTabPane() {
                this.multipleSelection = [];
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            showPic(file){
                this.form.addImageUrl = file.raw;
            },
            //移除
            handleRemove(file, fileList) {
                this.fileList = [];
                // return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //监控上传文件列表
            handleChange(file, fileList) {
                this.fileList = [];
                this.fileList = fileList;
                // this.form.addImageUrl = file.raw;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
                this.selectFoodIds.foodIDs = [];
                for(let num in this.multipleSelection){
                    console.log(this.multipleSelection[num]);
                    this.selectFoodIds.foodIDs.push(this.multipleSelection[num].foodId);
                }
                console.log(this.selectFoodIds.foodIDs);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            //图片上传要求
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            //编辑行
            EditRow(index, rows, foodType) {
                console.log(index);
                console.log(rows);
                let editFoodData = rows[index];
                console.log(editFoodData);
                this.form.addId = editFoodData.foodId;
                this.form.addName = editFoodData.foodName;
                this.form.addIntro = editFoodData.foodIntroduction;
                this.form.addPrice = editFoodData.foodPrice;
                this.form.addImageUrl = editFoodData.foodPicture;
                console.log(this.form);
                //console.log(editFoodData.foodTags);
                let foodtagsData = editFoodData.foodTags;
                this.form.showTag = [];
                if(foodtagsData!=[]){
                    this.form.addTag = [];
                    for(let i=0;i<foodtagsData.length;i++){
                        this.tag = {};
                        this.tag.tagId = foodtagsData[i].tagId;
                        this.tag.tagName = foodtagsData[i].tagName;
                        this.form.addTag.push(this.tag);
                        this.form.showTag.push(this.tag.tagName);
                        console.log(this.form.addTag);
                    }
                    console.log("addTag");
                    console.log(this.form.addTag);
                }
                // this.form.addTag = editFoodData.foodtags;
                this.form.addType = editFoodData.foodType;
            },
            //下架行
            DownRow(index, rows, foodId) {
                console.log(index);
                console.log(rows);
                rows.splice(index, 1);
                this.selectFoodIds.foodIDs = [];
                this.selectFoodIds.foodIDs.push(foodId);
                console.log(this.foodIDs);
                this.axios.post(`http://localhost:8080/food/downFoods`,this.selectFoodIds).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    console.log(r.data.msg);
                    this.searchFoods();
                    // let obj = r.data.msg;
                    // let orderMsgList = obj.orderMsgList;
                    // this.orderList= [];//清空原有订单列表
                    //遍历所有返回信息

                    // console.log(this.foodTypeList);
                });
            },
            //上架行
            UpRow(index, rows, foodId) {
                console.log(index);
                console.log(rows);
                rows.splice(index, 1);
                this.selectFoodIds.foodIDs = [];
                this.selectFoodIds.foodIDs.push(foodId);
                console.log(this.foodIDs);
                this.axios.post(`http://localhost:8080/food/upFoods`,this.selectFoodIds).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    console.log(r.data.msg);
                    this.searchFoods();
                    // let obj = r.data.msg;
                    // let orderMsgList = obj.orderMsgList;
                    // this.orderList= [];//清空原有订单列表
                    //遍历所有返回信息

                    // console.log(this.foodTypeList);
                });
            },
            //删除行
            DeleteRow(index,rows,foodId) {
                console.log(index);
                console.log(rows);
                rows.splice(index, 1);
                this.selectFoodIds.foodIDs = [];
                this.selectFoodIds.foodIDs.push(foodId);
                console.log(this.foodIDs);
                this.axios.post(`http://localhost:8080/food/deleteFoods`,this.selectFoodIds).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    console.log(r.data.msg);
                    this.searchFoods();
                    // let obj = r.data.msg;
                    // let orderMsgList = obj.orderMsgList;
                    // this.orderList= [];//清空原有订单列表
                    //遍历所有返回信息

                    // console.log(this.foodTypeList);
                });
            },
            //搜索美食
            searchFoods:function () {
                this.axios.defaults.withCredentials = true;
                //清空现有加载过的foodTypeList
                // this.foodTypeList = [];
                //根据搜索情况获取初始化foodTypeList
                this.selectData.food_name = this.foodSearchInput;
                this.selectData.food_state = this.foodStateRadio;
                console.log(this.selectData);
                this.axios.post(`http://localhost:8080/food/selectByDetail`,this.selectData).then(r=>{
                    console.log(r);
                    // console.log(r.data);
                    // console.log(r.data.msg);
                    let foodLists = r.data.msg.foodList;
                    for(let i=1;i<=6;i++){
                        let foodListDemo = foodLists[i];
                        this.foodList = [];
                        for(let j=0;j<foodListDemo.length;j++){
                            let f = foodListDemo[j];
                            // console.log(f);
                            this.food = {};
                            this.food.foodId = f.food.foodId;
                            this.food.foodName = f.food.foodName;
                            this.food.foodPrice = f.food.foodPrice;
                            this.food.foodPicture = 'http://localhost:8080/image/'+ f.food.foodPicture;
                            this.food.foodIntroduction = f.food.foodIntroduction;
                            this.food.foodState = f.food.foodState;
                            this.food.foodType = f.food.foodType;
                            this.food.foodTags = f.foodTags;
                            // console.log('food');
                            // console.log(this.food);
                            this.foodList.push(this.food);
                            // this.orderFoodIntoEntity(foodListDemo[j]);
                            // this.addFoodToFoodlist(this.food, this.foodList);
                        }
                        this.foodTypeList[i-1].foodList = this.foodList;
                        // console.log('foodTypeList');
                        // console.log(this.foodTypeList);
                    }

                });
            },
            //批量删除美食
            deleteFoods:function () {
                this.axios.post(`http://localhost:8080/food/deleteFoods`,this.selectFoodIds).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    console.log(r.data.msg);
                    this.searchFoods();
                    // let obj = r.data.msg;
                    // let orderMsgList = obj.orderMsgList;
                    // this.orderList= [];//清空原有订单列表
                    //遍历所有返回信息

                    // console.log(this.foodTypeList);
                });
            },
            //批量下架美食
            downFoods:function () {
                this.axios.post(`http://localhost:8080/food/downFoods`,this.selectFoodIds).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    console.log(r.data.msg);
                    this.searchFoods();
                    // let obj = r.data.msg;
                    // let orderMsgList = obj.orderMsgList;
                    // this.orderList= [];//清空原有订单列表
                    //遍历所有返回信息

                    // console.log(this.foodTypeList);
                });
            },
            //批量上架美食
            upFoods:function () {
                this.axios.post(`http://localhost:8080/food/upFoods`,this.selectFoodIds).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    console.log(r.data.msg);
                    this.searchFoods();
                    // let obj = r.data.msg;
                    // let orderMsgList = obj.orderMsgList;
                    // this.orderList= [];//清空原有订单列表
                    //遍历所有返回信息

                    // console.log(this.foodTypeList);
                });
            },
            //测试Tag
            test:function () {
                this.food.foodId = this.form.addId;
                this.food.foodName = this.form.addName;
                this.food.foodPrice = this.form.addPrice;
                // this.food.foodPicture = r.data.saveFileName;
                this.food.foodType = this.form.addType;
                console.log(this.form.showTag);
                for(let k=0;k<this.form.showTag.length;k++){
                    this.tag = {};
                    let tagIdDemo = this.form.showTag[k];
                    for(let m=0;m<this.tagOptions.length;m++){
                        if(this.tagOptions[m].tagId==tagIdDemo)
                            this.tag = this.tagOptions[m];
                    }
                    console.log(this.tag);
                    this.food.foodTags.push(this.tag);
                }
                console.log(this.food.foodTags);
                this.food.foodIntroduction = this.form.addIntro;
                console.log(this.food);
            },
            //清空美食
            refreshFood() {
                let newForm = {
                    addId:'',
                    addName: '',
                    addImageUrl: require('../../../../static/图片上传.png'),
                    addIntro:'',
                    addPrice: '',
                    showTag:[],
                    addTag:[],
                    addType: '',
                    delivery: false,
                };
                this.form = newForm;
            },
            //添加美食
            addFood:function () {
                this.axios.defaults.withCredentials = true;

                this.food.foodId = this.form.addId;
                this.food.foodName = this.form.addName;
                this.food.foodPrice = this.form.addPrice;
                this.food.foodPicture = this.form.addImageUrl.substring(28);
                this.food.foodType = this.form.addType;
                console.log(this.form.showTag);
                this.food.foodTags = [];
                if(this.form.showTag == []){
                    this.food.foodTags = [];
                }else{
                    for(let k=0;k<this.form.showTag.length;k++){
                        this.tag = {};
                        let tagIdDemo = this.form.showTag[k];
                        for(let m=0;m<this.tagOptions.length;m++){
                            if(this.tagOptions[m].tagId==tagIdDemo)
                                this.tag = this.tagOptions[m];
                        }
                        console.log(this.tag);
                        this.food.foodTags.push(this.tag);
                    }
                }

                console.log(this.food.foodTags);
                this.food.foodIntroduction = this.form.addIntro;

                console.log(this.food);
                this.axios.post(`http://localhost:8080/food/addFood`,this.food).then(r=>{
                    console.log(r);
                    let obj = r.data;
                    if(obj){
                        
						this.$message({
						          message: '新增美食成功',
						          type: 'success'
						        });
                        let newForm = {
                            addId:'',
                            addName: '',
                            addImageUrl: require('../../../../static/图片上传.png'),
                            addIntro:'',
                            addPrice: '',
                            showTag:[],
                            addTag:[],
                            addType: '',
                            delivery: false,
                        };
                        this.form = newForm;
                        this.searchFoods();
                        // this.resDetail.resQrcode = 'http://localhost:8080/image/'+resD.resQrcode;

                    }else{
						this.$message.error('新增美食失败');
                    }
                });
            },
            //编辑美食
            updateFood:function () {
                this.axios.defaults.withCredentials = true;

                this.food.foodId = this.form.addId;
                this.food.foodName = this.form.addName;
                this.food.foodPrice = this.form.addPrice;
                this.food.foodPicture = this.form.addImageUrl.substring(28);
                this.food.foodType = this.form.addType;
                console.log(this.form.showTag);
                if(this.form.showTag==[]){
                    this.food.foodTags = [];
                }else{
                    console.log(this.form.showTag);
                    for(let k=0;k<this.form.showTag.length;k++){
                        this.tag = {};
                        let tagIdDemo = this.form.showTag[k];
                        console.log(tagIdDemo);
                        for(let m=0;m<this.tagOptions.length;m++){
                            if(this.tagOptions[m].tagId==tagIdDemo)
                                this.tag = this.tagOptions[m];
                        }
                        console.log(this.tag);
                        this.food.foodTags.push(this.tag);
                    }
                }

                console.log(this.food.foodTags);
                this.food.foodIntroduction = this.form.addIntro;
                console.log(this.food);
                this.axios.post(`http://localhost:8080/food/updateFood`,this.food).then(r=>{
                    console.log(r);
                    let obj = r.data;
                    if(obj){
						this.$message({
						          message: '更新美食成功',
						          type: 'success'
						        });
                        let newForm = {
                            addId:'',
                            addName: '',
                            addImageUrl: require('../../../../static/图片上传.png'),
                            addIntro:'',
                            addPrice: '',
                            showTag:[],
                            addTag:[],
                            addType: '',
                            delivery: false,
                        };
                        this.form = newForm;
                        this.searchFoods();
                        // this.resDetail.resQrcode = 'http://localhost:8080/image/'+resD.resQrcode;

                    }else{
                       
						this.$message.error('更新美食失败');
                    }
                });
            },

        }
    }
</script>

<style lang="less" scoped>
    .foodManage{
        width:100%;
        height:100%;
        display: flex;
        -background-color: lightpink;
        .foodMangeLeft{
            flex:2;
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
                    display: flex;
                    -background-color: lightcoral;
                }


            }

        }
        .foodMangeRight{
            flex:1;
            -background-color: lightgreen;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            padding-right: 10px;

            .foodOperate{

            }
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            -border: 2px red;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 16px;
            color: #8c939d;
            width: 160px;
            height: 160px;
            line-height: 160px;
            text-align: center;
        }
        .avatar {
            width: 160px;
            height: 160px;
            display: block;
        }
    }
</style>