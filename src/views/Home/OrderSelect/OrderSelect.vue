<template>
    <div class="orderSelect">
        <div class="orderSelectLeft">

            <div class="leftTop">
                <el-card class="box-card">
               <div class="lt">
                   <div class="lt1">
                       订单查找 :
                   </div>
                   <div class="lt2">
                       <el-input
                               placeholder="请输入用户名信息进行订单查询"
                               v-model="orderSelectInput"
                               prefix-icon="el-icon-search"
                               clearable>
                       </el-input>
                   </div>
                   <div class="lt3">
                       <el-button @click="selectOrderBut" type="primary">查询订单</el-button>
                   </div>
               </div>
                </el-card>
            </div>

            <div class="leftMedium">
				<el-card class="box-card" style="height: 140px">
                <div class="lm">
                        <div class="lm1">
                            订单状态 :
                        </div>
                        <div class="lm2">
                            <el-radio-group  size="small" v-model="orderStateRadio" @change="getAllOrderList">
                                <el-radio-button label="0">全部</el-radio-button>
                                <el-radio-button label="1">未接单</el-radio-button>
                                <el-radio-button label="2">待送餐</el-radio-button>
                                <el-radio-button label="3">已出餐</el-radio-button>
                                <el-radio-button label="4">已退单</el-radio-button>
                                <el-radio-button label="5">索赔单</el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                <div class="lm">
                    <div class="lm1">
                        订单日期 :
                    </div>
                    <div class="lm3">
                        <el-radio-group size="small" v-model="orderDateRadio">
                            <div style="-background-color: red;display: inline;display: flex">
                            <div style="">
                                <el-radio-button @click="timeSelect" label="0">全部</el-radio-button>
                            </div>
                                <el-date-picker
                                        size="small"
                                        v-model="orderDate"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd"
                                        @change="getAllOrderList"
                                        :picker-options="pickerOptions">
                            </el-date-picker>
                           </div>
                        </el-radio-group>
                    </div>
                </div>

                </el-card>
            </div>

            <div class="leftBottom">
                <el-card class="box-card" style="height: 500px;">
                    <div slot="header" class="clearfix">
                        <span style="margin-left: 20px">订单列表</span>
                    </div>
                    <div style="overflow-y:scroll;">
                        <el-collapse v-model="activeName" accordion style="height: 400px;">
                            <el-collapse-item v-for="(item,index) in orderList" :key="item.orderID" >
                                <template slot="title">
                                    <span style="padding-left: 20px;width: 70px;">订单编号 </span>
                                    <span style="color: dodgerblue;width: 150px;"> {{item.orderNo}} </span>
                                    <span v-if="item.orderState==2" style="color: dodgerblue;font-size:12px;padding-left: 40px;width: 60px;"> 尽快送达 </span>
                                    <span v-else="item.orderState==2" style="color: gray;font-size:12px;padding-left: 40px;width: 60px;"> 时间失效 </span>
                                    <span style="font-size:12px;padding-right: 100px"> {{item.timeLimit}} 前出餐</span>
                                    <el-tag v-if="item.orderState==2" type="warning">待出餐</el-tag>
                                    <el-tag v-else-if="item.orderState==3" type="success">已出餐</el-tag>
                                    <el-tag v-else-if="item.orderState==1" type="">未接单</el-tag>
                                    <el-tag v-else-if="item.orderState==4" type="info">已退单</el-tag>
                                    <el-tag v-else-if="item.orderState==5" type="danger">索赔单</el-tag>
									<el-tag v-else-if="item.orderState==6" type="info" dark>已完成</el-tag>
                                </template>
                                <div class="order">
                                    <div class="user">
                                        <i class="el-icon-user-solid" style="padding-right: 10px"></i>
                                        <span  style="font-size: 14px"> {{item.userName}} （{{item.userSex}}） </span>
                                        <span style="font-weight: bold;font-size: 15px"> {{item.userPhone}} </span><br>
                                        <span  style="font-size: 12px;padding-left:30px;padding-top: 10px;padding-bottom: 10px "> {{item.userAddress}} </span>
                                    </div>
                                    <div class="foods">
                                        <i class="el-icon-shopping-cart-2" style="padding-right: 10px"></i>
                                        <span  style="font-size: 15px;font-weight: bold;"> {{item.foodNum}} </span>
                                        <span  style="font-size: 15px;font-weight: bold;"> 件美食 </span>
                                        <span style="color: dodgerblue;font-size:12px;font-weight: bold;padding-left: 40px"> 共计￥ </span>
                                        <span style="color: dodgerblue;font-size:12px;font-weight: bold;"> {{item.userBill}} </span>
                                        <span  style="font-size: 15px;font-size:12px;padding-left: 40px"> （美食:{{item.userPay}}元 + 配送费2元 + 包装费1元） </span>
                                        <el-button @click="orderDetails(item.orderID)" type="info" round style="float: right;margin-right: 10px" size="small">详细信息</el-button>
                                    </div>
                                    <div class="price">
                                        <i class="el-icon-shopping-bag-1" style="padding-right: 10px"></i>
                                        <span  style="font-size: 14px"> 顾客实付 </span>
                                        <span style="float: right;color: gray;font-size:12px;font-weight: bold;padding-right: 15px"> {{item.userPay}} </span>
                                        <span style="float: right;color: gray;font-size:12px;font-weight: bold;padding-left: 40px"> 已支付￥ </span>
                                        <br>
                                        <span  style="padding-left:30px;padding-top: 10px;padding-bottom: 10px;font-size: 13px"> 本单预计收入 </span>
                                        <span style="float: right;color: lightcoral;font-size:12px;font-weight: bold;padding-right: 15px"> ￥{{item.orderEarn}} </span>
                                    </div>
                                    <div class="info">
                                        <i class="el-icon-s-order" style="padding-right: 10px"></i>
                                        <span  style="font-size: 14px"> 下单时间 : </span>
                                        <span  style="font-size: 14px;padding-left:10px;"> {{item.orderTime}} </span>
                                        <br>
                                        <span  style="font-size: 14px;padding-left:30px;"> 订单编号 : </span>
                                        <span  style="font-size: 14px;padding-left:10px;"> {{item.orderNo}} </span>
                                        <el-button @click="printOrder(item.orderID)" v-if="item.orderState==2 || item.orderState==3" type="info" round style="float: right;margin-right: 10px" size="small">打印订单</el-button>
                                        <el-button @click="refuseOrder(item.orderID)" v-if="item.orderState==2 || item.orderState==3" type="info" round style="float: right;margin-right: 10px" size="small">取消订单</el-button>
                                        <el-button @click="printOrder(item.orderID)" v-if="item.orderState==1" type="info" round style="float: right;margin-right: 10px" size="small">打印订单</el-button>
                                        <el-button @click="receiveOrder(item.orderID)" v-if="item.orderState==1" type="info" round style="float: right;margin-right: 10px" size="small">接收订单</el-button>
                                        <el-button @click="payForOrder(item.orderID)" v-if="item.orderState==4" type="info" round style="float: right;margin-right: 10px" size="small">赔偿订单</el-button>
                                        <el-button @click="traceOrder(item.orderID)" v-if="item.orderState==4" type="info" round style="float: right;margin-right: 10px" size="small">追踪订单</el-button>
                                        <el-button @click="traceDetail(item.orderID)" v-if="item.orderState==5" type="info" round style="float: right;margin-right: 10px" size="small">索赔详情</el-button>
                                        <el-button @click="traceOrder(item.orderID)" v-if="item.orderState==5" type="info" round style="float: right;margin-right: 10px" size="small">追踪订单</el-button>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="orderSelectRight">
            <el-card class="box-card" style="height: 760px;">
                <div slot="header" class="clearfix">
                    <div style="text-align: center;background-color: lightskyblue;font-size: 25px;font-weight: bold;padding-bottom: 10px;padding-top: 10px;color: white">今日汇总</div>
                </div>
                <div class="bill">
                    <div style="color: lightcoral;padding-bottom: 10px;padding-top: 10px">
                        预计总收入 ￥ {{totalEarn}}
                    </div>
                    <div class="billMedium">
                       <div class="earn">
                           <div class="earnName"> · 已完成 : {{orderDoneNum}} 单 </div>
                           <div class="earnPrice"> 预计收入 ￥ {{orderDoneEarn}} </div>
                       </div>
                        <div class="earn">
                            <div class="earnName"> · 进行中 : {{orderDoingNum}} 单 </div>
                            <div class="earnPrice"> 预计收入 ￥ {{orderDoingEarn}} </div>
                        </div>
                        <div class="earn">
                            <div class="earnName"> · 已退单 : {{orderBackNum}} 单 </div>
                            <div class="earnPrice"> 预计收入 ￥ -{{orderBackEarn}} </div>
                        </div>
                        <div class="earn">
                            <div class="earnName"> · 索赔单 : {{orderPayForNum}} 单 </div>
                            <div class="earnPrice"> 预计收入 ￥ -{{orderPayForEarn}} </div>
                        </div>
                    </div>
                    <div class="billBottom">
                        <div style="color: lightcoral;padding-bottom: 10px;padding-top: 10px">
                           今日销量价高美食
                        </div>
                        <div class="highFood" v-for="hf in highFoods">
                            <div class="foodName"> {{hf.foodName}} </div>
                            <div class="foodNum"> ×{{hf.foodNum}} </div>
                        </div>
                        <br>
                    </div>

                </div>
            </el-card>
        </div>
        <div class="dialog">
            <el-dialog title="订单详情" style="overflow: auto;width: 1100px" :visible.sync="dialogOrderDetailVisible">
                <div class="orderConfirm">
                    <el-card class="box-card" style="width: 500px;height: 400px">
                        <div class="cartShow" >
                            <div class="cartItem"  v-for="foodItem in foodList">
                                <div class="itemPic">
                                    <img class="imgs" :src="foodItem.food.foodPicture" @click="foodDetail(foodItem.food.foodId)"/>
                                </div>
                                <div class="itemInfo">
                                    <div class="itemName">{{foodItem.food.foodName}}</div>
                                    <div class="itemPrice">
                                        <div v-if="foodItem.discount==1"><span style="font-size: 12px">￥</span> {{(foodItem.food.foodPrice).toFixed(2)}}</div>
                                        <div v-else>
                                            <span style="font-size: 12px">￥</span> {{(foodItem.foodDiscountPrice).toFixed(2)}}
                                            <span style="font-size: 10px;color: gray"> ￥</span><span style="color: gray;font-size: 12px;text-decoration: line-through;padding-right: 5px"> {{(foodItem.food.foodPrice).toFixed(2)}} </span>
                                            <el-tag :key="foodItem.discount" size="mini" type="danger" effect="plain" > {{foodItem.discount*10}}折</el-tag>
                                        </div>
                                    </div>
                                </div>
                                <div class="itemNum">
                                    <div v-if="foodItem.foodNum==0">
                                        <el-button size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                                    </div>
                                    <div v-else>
                                        <el-button size="mini" icon="el-icon-minus" circle></el-button>
                                        <input :min="1" :max="99" v-model.number="foodItem.foodNum" style="width:30px;text-align:center;font-size: 16px;color: #313334;font-weight: bolder;padding-left: 10px;padding-right: 10px"/>
                                        <el-button size="mini" type="primary" icon="el-icon-plus" circle></el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                    <br>
                    <div slot="footer" class="dialog-footer" style="text-align: right">
                        <el-button @click="dialogOrderDetailVisible = false">取 消</el-button>
                    </div>

                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script scoped>

    export default {
        name: "OrderSelect",
        data(){
           return{
               dialogOrderDetailVisible: false,
               info2: {
                   orderId:'',//订单编号
               },
               foodList:[],
               activeName:'1',//手风琴当前展开订单详细内容
               // orderTypeRadio:'',//订单类型按钮组
               orderSelectInput:'',//查询订单输入内容（根据用户名查找）
               orderStateRadio: 0,//订单状态按钮
               orderDateRadio: 0,//订单日期内容
               orderDate:'',//订单起始日期
               //查询单元
               selectData:{
                   customer_name:'',//查询订单输入内容（根据用户名查找）
                   order_state: 0,//订单状态按钮
                   order_time_start:'',//订单开始日期
                   order_time_end:'',//订单开始日期
               },//查询Data
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
               //订单单元
               order:{
                   orderID:'',//订单ID
                   orderNo:'',//订单编号
                   orderRequest:'尽快送达',//订单备注要求
                   timeLimit:'',//订单截至时间
                   orderState:'',//订单状态
                   userName:'',//用户姓名
                   userSex:'',//用户性别
                   userPhone:'',//用户电话
                   userAddress:'',//用户地址
                   foodNum:'',//食品数量
                   userBill:0,//共计金额
                   foodPrice:0,//食品价格
                   deliverPrice:2,//配送费
                   packingPrice:1,//包装费
                   userPay:0,//顾客实付
                   orderEarn:0,//订单收入
                   orderTime:'',//订单下单时间
               },
               //所有订单列表
               orderList:[{
                   orderID:'1',//订单ID
                   orderNo:'20200620',//订单编号
                   orderRequest:'尽快送达',//订单备注要求
                   timeLimit:'11:25',//订单截至时间
                   orderState:3,//订单状态
                   userName:'刘美丽',//用户姓名
                   userSex:'女士',//用户性别
                   userPhone:'12345678912',//用户电话
                   userAddress:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址
                   foodNum:'2',//食品数量
                   userBill:33,//共计金额
                   foodPrice:30,//食品价格
                   deliverPrice:2,//配送费
                   packingPrice:1,//包装费
                   userPay:30,//顾客实付
                   orderEarn:15,//订单收入
                   orderTime:'06-10-2020 23:21',//订单下单时间
               },{
                   orderID:'2',//订单ID
                   orderNo:'20200623',//订单编号
                   orderRequest:'尽快送达',//订单备注要求
                   timeLimit:'16:32',//订单截至时间
                   orderState:2,//订单状态
                   userName:'刘美丽',//用户姓名
                   userSex:'女士',//用户性别
                   userPhone:'12345678912',//用户电话
                   userAddress:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址
                   foodNum:'2',//食品数量
                   userBill:33,//共计金额
                   foodPrice:30,//食品价格
                   deliverPrice:2,//配送费
                   packingPrice:1,//包装费
                   userPay:30,//顾客实付
                   orderEarn:15,//订单收入
                   orderTime:'06-10-2020 23:21',//订单下单时间
               },{
                   orderID:'3',//订单ID
                   orderNo:'20200616',//订单编号
                   orderRequest:'尽快送达',//订单备注要求
                   timeLimit:'16:32',//订单截至时间
                   orderState:4,//订单状态
                   userName:'刘美丽',//用户姓名
                   userSex:'女士',//用户性别
                   userPhone:'12345678912',//用户电话
                   userAddress:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址
                   foodNum:'2',//食品数量
                   userBill:33,//共计金额
                   foodPrice:30,//食品价格
                   deliverPrice:2,//配送费
                   packingPrice:1,//包装费
                   userPay:30,//顾客实付
                   orderEarn:15,//订单收入
                   orderTime:'06-10-2020 23:21',//订单下单时间
               },{
                   orderID:'4',//订单ID
                   orderNo:'20200621',//订单编号
                   orderRequest:'尽快送达',//订单备注要求
                   timeLimit:'16:32',//订单截至时间
                   orderState:5,//订单状态
                   userName:'刘美丽',//用户姓名
                   userSex:'女士',//用户性别
                   userPhone:'12345678912',//用户电话
                   userAddress:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址
                   foodNum:'2',//食品数量
                   userBill:33,//共计金额
                   foodPrice:30,//食品价格
                   deliverPrice:2,//配送费
                   packingPrice:1,//包装费
                   userPay:30,//顾客实付
                   orderEarn:15,//订单收入
                   orderTime:'06-10-2020 23:21',//订单下单时间
               },{
                   orderID:'5',//订单ID
                   orderNo:'20200622',//订单编号
                   orderRequest:'尽快送达',//订单备注要求
                   timeLimit:'16:32',//订单截至时间
                   orderState:1,//订单状态
                   userName:'刘美丽',//用户姓名
                   userSex:'女士',//用户性别
                   userPhone:'12345678912',//用户电话
                   userAddress:'辽宁省沈阳市浑南区东北大学浑南校区',//用户地址
                   foodNum:'2',//食品数量
                   userBill:33,//共计金额
                   foodPrice:30,//食品价格
                   deliverPrice:2,//配送费
                   packingPrice:1,//包装费
                   userPay:30,//顾客实付
                   orderEarn:15,//订单收入
                   orderTime:'06-10-2020 23:21',//订单下单时间
               }],

               totalEarn:1000,//预计总收入
               orderDoneNum:12,//已完成订单数量
               orderDoneEarn:600,//已完成预计收入
               orderDoingNum:10,//正在进行订单数量
               orderDoingEarn:400,//正在进行预计收入
               orderBackNum:'00',//已退单数量
               orderBackEarn:0,//已退单预计收入
               orderPayForNum:'00',//已索赔订单数量
               orderPayForEarn:0,//已索赔订单收入

               //销量较高美食列表
               highFoods:[{
                   foodName:'水煮肉片+米饭',//热销菜品名称
                   foodNum:18,//热销菜品数量例子
               },{
                   foodName:'鱼香肉丝+米饭',//热销菜品名称
                   foodNum:16,//热销菜品数量例子
               },{
                   foodName:'大酱骨+米饭',//热销菜品名称
                   foodNum:12,//热销菜品数量例子
               },{
                   foodName:'汉堡套餐',//热销菜品名称
                   foodNum:10,//热销菜品数量例子
               },{
                   foodName:'珍珠奶茶',//热销菜品名称
                   foodNum:9,//热销菜品数量例子
               },{
                   foodName:'石锅盖饭',//热销菜品名称
                   foodNum:6,//热销菜品数量例子
               },{
                   foodName:'香辣爆炒鱿鱼',//热销菜品名称
                   foodNum:5,//热销菜品数量例子
               }],
               highFood:{foodName:'',foodNum:0},//销量较高美食单元
               refuseOrderData:{
                    orderID:'',
               },
               receiveOrderData:{
                   orderID:'',
               },
           };
        },
        created() {
            //动态获取所有的orderList信息
            this.getFirstAllOrderList();
            //动态加载销量最高美食
            this.getTopFoods();
            //动态加载今日汇总数据
            this.getOrderSum();
        },
        methods:{
            //获取订单方法内部单元
            getOrders:function() {
                this.axios.post(`http://localhost:8080/orders/selectByDetail`,this.selectData).then(r=>{
                    //console.log(r);
                    //console.log(r.data);
                    //console.log(r.data.msg);
                    let obj = r.data.msg;
                    let orderMsgList = obj.orderMsgList;
                    this.orderList= [];//清空原有订单列表
                    //遍历所有返回信息
                    for(let i=0;i<orderMsgList.length;i++){
                        this.order = [];
                        let orderList = orderMsgList[i];
                        //接收数据
                        let orderEntity = orderList.orders;
                        let addressEntity = orderList.address;
                        let customerEntity = orderList.customer;
                        let phoneEntity = orderList.phonenum;//还未添加
                        let orderItemPrice = orderEntity.orderPrice;
                        let orderItems = orderList.orderItemList;
                        let orderItemNumber = orderList.orderItemNumbers;
                        let orderTimePredict = orderList.orderTimePredict;
                        //赋值数据
                        this.order.orderID = orderEntity.orderId;
                        this.order.orderNo = orderEntity.orderCode;
                        this.order.timeLimit = orderTimePredict.substring(11,16);
                        this.order.orderState = orderEntity.orderState;
                        // if(orderEntity.orderState==1){
                        //     this.order.orderState = '未接单';
                        // }else if(orderEntity.orderState==2){
                        //     this.order.orderState = '待送餐';
                        // }else if(orderEntity.orderState==3){
                        //     this.order.orderState = '已出餐';
                        // }else if(orderEntity.orderState==4){
                        //     this.order.orderState = '已退单';
                        // }else if(orderEntity.orderState==5){
                        //     this.order.orderState = '索赔单';
                        // }
                        this.order.userName = customerEntity.customerName;
                        if(customerEntity.userSex='女'){
                            this.order.userSex = '女士';
                        }else if(orderEntity.orderState='男'){
                            this.order.userSex = '男士';
                        }
                        this.order.userPhone = phoneEntity.phonenumMes;
                        this.order.userAddress = addressEntity.addressDetail;
                        this.order.foodNum = orderItemNumber;
                        this.order.userBill = (orderEntity.orderPrice + 3).toFixed(2);
                        this.order.userPay = (orderEntity.orderPrice).toFixed(2);
                        this.order.orderEarn = (orderEntity.orderPrice * 0.4).toFixed(2);
                        this.order.orderTime = orderEntity.orderTimeMonth + '-' + orderEntity.orderTimeDay + '-' + orderEntity.orderTimeYear +
                            '  ' + orderEntity.orderTimeHour + ':' + orderEntity.orderTimeMinute;

                        //将order放入orderList
                        this.orderList.push(this.order);
                    }
                    console.log(this.orderList);
                });
            },

            //获取所有的订单详情列表OrderList
            getFirstAllOrderList:function() {
                //清空现有加载过的orderList
                this.orderList = [];
                //根据搜索情况获取初始化OrderList
                this.timeSelect();//首先更新存储的时间信息
                this.selectData.customer_name = this.orderSelectInput;
                this.selectData.order_state = this.orderStateRadio;
                this.selectData.order_time_start = this.orderDate[0];
                this.selectData.order_time_end = this.orderDate[1];
                this.getOrders();
            },

            //点击查询获取所有的订单详情列表OrderList
            getAllOrderList:function() {
                //清空现有加载过的orderList
                this.orderList = [];
                //根据搜索情况获取初始化OrderList
                // console.log(this.orderDate);
                this.selectData.customer_name = this.orderSelectInput;
                this.selectData.order_state = this.orderStateRadio;
                // console.log(this.orderStateRadio);
                if(this.orderDate==''){
                    this.timeSelect();
                    this.selectData.order_time_start = this.orderDate[0];
                    this.selectData.order_time_end = this.orderDate[1];
                }else{
                    this.selectData.order_time_start = this.orderDate[0];
                    this.selectData.order_time_end = this.orderDate[1];
                }
                // console.log(this.selectData);
                // console.log(this.selectData.order_time_start);
                // console.log(this.selectData.order_time_end);

               this.getOrders();
            },

            //动态加载今日汇总数据
            getOrderSum:function() {
                this.axios.defaults.withCredentials = true;
                this.axios.get(`http://localhost:8080/orders/getDailySum`).then(r=>{
                    // console.log(r);
                     console.log(r.data);
                    //console.log(r.data.msg);
                    if(r.data.msg){
                        //alert('动态获取今日汇总数据成功');
                        let obj = r.data.msg;
                        let state2 = r.data.msg.state2;
                        // console.log(state2);
                        let state3 = r.data.msg.state3;
						console.log(state3);
                        let state4 = r.data.msg.state4;
                        let state5 = r.data.msg.state5;
						let state6 = r.data.msg.state6;

                        this.orderDoneNum = state6.ORDER_NUM;//已完成订单数量(3)
                        this.orderDoneEarn = state6.ORDER_PRICE;//已完成预计收入
                        this.orderDoingNum = state2.ORDER_NUM;//正在进行订单数量(2)
                        this.orderDoingEarn = state2.ORDER_PRICE;//正在进行预计收入
                        this.orderBackNum =  state4.ORDER_NUM;//已退单数量(4)
                        this.orderBackEarn =  state4.ORDER_PRICE;//已退单预计收入
                        this.orderPayForNum = state5.ORDER_NUM;//已索赔订单数量(5)
                        this.orderPayForEarn = state5.ORDER_PRICE;//已索赔订单收入

                        this.totalEarn = r.data.msg.todayTotal;//今日销售总额
                    }else{
                        
						this.$message.error('动态获取今日汇总数据失败');
                        // this.erroMsg='对不起，登陆失败';
                    }
                });
            },

            //动态加载今日最高销量美食数据
            getTopFoods:function() {
                this.axios.defaults.withCredentials = true;
                this.axios.get(`http://localhost:8080/orders/getTopFoods`).then(r=>{
                    // console.log('getTopFoods');
                    // console.log(r);
                    if(r.data.msg){
                        //alert('动态获取今日最高销量美食数据成功');
                        this.highFoods = [];
                        for(let i=0;i<r.data.msg.foodName.length;i++){
                            let item = {foodName:'',foodNum:''};
                            item.foodName=r.data.msg.foodName[i];
                            item.foodNum=r.data.msg.foodNum[i];
                            this.highFoods.push(item);
                        }
                        // console.log(this.highFoods);
                        // this.highFoods = r.data.msg.highFoods;
                    }else{
                        //alert('动态获取今日最高销量美食数据失败');
						this.$message.error('动态获取今日最高销量美食数据失败');
                    }
                });
            },

            //查询订单按钮点击方法
            selectOrderBut:function () {
                this.getAllOrderList();
            },

            //初始化选择订单日期
            timeSelect(){
                //console.log("old:",this.orderDate);
                let nowDate=new Date();
                let yy=nowDate.getFullYear();
                let MM=(nowDate.getMonth()+1)<10?'0'+(nowDate.getMonth()+1):(nowDate.getMonth()+1);
                let dd=nowDate.getDate()<10?'0'+nowDate.getDate():nowDate.getDate();
                let formatNowDate=yy+'-'+MM+'-'+dd;
                this.orderDate=['1970-01-01',formatNowDate];
                //console.log("new:",this.orderDate);
            },

            //订单详情查看按钮方法
            orderDetails(orderId) {
                console.log(orderId);
                this.info2.orderId = orderId;
                console.log(this.info2);
                this.dialogOrderDetailVisible = true;
                this.axios.post(`http://localhost:8080/orders/selectOrderDetail`,this.info2).then(r=>{
                    console.log(r);
                    this.foodList = r.data.msg.foodList;
                    for(let i=0;i<this.foodList.length;i++){
                        this.foodList[i].food.foodPicture = 'http://localhost:8080/image/'+this.foodList[i].food.foodPicture;
                    }
                });
            },
            //打印订单
            printOrder:function () {
               
				this.$message({
				          message: '未完待续',
				          type: 'success'
				        });
            },
            //取消订单
            refuseOrder:function (refuseOrderID) {
                this.refuseOrderData.orderID = refuseOrderID;
                console.log(this.refuseOrderData);
                this.axios.post(`http://localhost:8080/orders/refuseOrder`,this.refuseOrderData).then(r=>{
                    console.log(r);
                    if(r.data.msg){
						this.$message({
						          message: '取消成功',
						          type: 'success'
						        });
                        this.getOrders();
                        this.getOrderSum();
                        this.getTopFoods();
                    }else{
						this.$message.error('取消失败');
                    }
                });
            },
            //接收订单
            receiveOrder:function (receiveOrderID) {
                this.receiveOrderData.orderID = receiveOrderID;
                console.log(this.receiveOrderData);
                this.axios.post(`http://localhost:8080/orders/receiveOrder`,this.receiveOrderData).then(r=>{
                    console.log(r);
                    if(r.data.msg){
						this.$message({
						          message: '接收成功',
						          type: 'success'
						        });
                        this.getOrders();
                        this.getOrderSum();
                        this.getTopFoods();
                    }else{
                        
						this.$message.error('接收失败');
                    }
                });
            },
            //追踪订单
            traceOrder:function () {
                this.$message({
                          message: '未完待续',
                          type: 'success'
                        });
            },
            //索赔详情
            traceDetail:function () {
                this.$message({
                          message: '未完待续',
                          type: 'success'
                        });
            },
            //赔偿订单
            payForOrder:function () {
                this.$message({
                          message: '未完待续',
                          type: 'success'
                        });
            },


        },
    }
</script>

<style lang="less" scoped>
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
            padding-top: 15px;
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
        .leftBottom{
            flex:7;
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
    .orderSelectRight{
        flex:1;
        -background-color: lightgreen;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;

        .bill{
            .billMedium{
                .earn{
                    display: flex;
                }
                .earnName{
                    flex:5;
                    font-size: 14px;
                    padding-left: 30px;
                    padding-top: 10px;
                    padding-bottom: 10px;
                }
                .earnPrice{
                    flex:2;
                    font-size: 13px;
                    padding-top: 12px;
                    padding-bottom: 10px;
                }
            }
            .billBottom{
                .highFood{
                    display: flex;
                    .foodName{
                        flex: 6;
                        font-size: 14px;
                        padding-left: 30px;
                        padding-top: 10px;
                        padding-bottom: 5px;
                    }
                    .foodNum{
                        flex: 1;
                        font-size: 13px;
                        padding-top: 14px;
                        padding-bottom: 5px;
                    }
                }
            }
        }
    }
    .orderConfirm{
        height: 100%;
        width: 100%;
        -background-color: #b02f36;
        display: flex;
        overflow: auto;
        flex-direction: column;
        .cartShow{
            height: 420px;
            -background-color: darkviolet;
            overflow: auto;
            .cartItem{
                height: 180px;
                -background-color: darkgoldenrod;
                display: flex;
                text-align: center;
                padding-top: 10px;
                .itemPic{
                    flex: 3;
                    -background-color: darkviolet;
                    .imgs{
                        height:80%;
                        width:80%;
                        border-radius: 50%;
                        box-shadow: 5px 5px 5px #888888;
                        cursor: pointer;
                    }
                }
                .itemInfo{
                    flex: 2;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    -background-color: dodgerblue;
                    .itemName{
                        line-height: 90px;
                        flex: 1;
                        font-size: 16px;
                        font-weight: bolder;
                    }
                    .itemPrice{
                        flex: 1;
                        font-size: 16px;
                        font-weight: bolder;
                        color: #ea4b35;
                    }
                }
                .itemNum{
                    flex: 2;
                    line-height: 140px;
                    -background-color: lightgreen;
                }

            }
            .itemLine {
                padding-left: 20%;
                padding-right: 20%;
                width: 60%;
                height: 1px;
                border-top: solid silver 1px;
            }

        }
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
}

</style>