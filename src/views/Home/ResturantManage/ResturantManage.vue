<template>
    <div class="resturantManage">

        <div class="resturantManageLeft">

            <el-card class="box-card" style="height: 720px;">
                <div slot="header" class="clearfix" >
                    <span style="font-size:18px;font-weight: bold;padding-bottom: 15px"> 店铺管理 </span>
                    <el-button @click="applyResturantEdit" size="medium" style="float: right;padding-bottom: 8px" type="warning">申请修改</el-button>
                </div>
<!--                <el-form ref="form" :model="form" :disabled="isDisabled" label-width="100px" style="font-size:16px">-->
<!--                    <div class="line">-->
<!--                        <el-form-item label="商家店名">-->
<!--                            <el-input  :label="form.resturantName" placeholder="请输入商家店名" v-model="form.addName" style="width:90%;"></el-input>-->
<!--                        </el-form-item>-->
<!--                    </div>-->
<!--                </el-form>-->
                <div class="line">
                    <div class="l">
                        <div class="l1"> 商家店名 : </div>
                        <div class="l2"> {{resDetail.resName}} </div>
                        <br>
                    </div>
                    <div class="l">
                        <div class="l1"> 营业时间 : </div>
                        <div class="l2"> {{resDetail.onTime}} - {{resDetail.offTime}} </div>
                        <br>
                    </div>
                    <div class="l">
                        <div class="l1"> 营业资质 : </div>
                        <div class="l2"> {{resDetail.businessQualification}} </div>
                        <br>
                    </div>
                    <div class="l">
                        <div class="l1"> 商家地址 : </div>
                        <div class="l2"> {{resDetail.resAddress}} </div>
                        <br>
                    </div>
                    <div class="l">
                        <div class="l1"> 商家电话 : </div>
                        <div class="l2"> {{resDetail.resTelephoneNumber}} </div>
                        <br>
                    </div>
                    <div class="l">
                        <div class="l1"> 店二维码 : </div>
                        <div class="l2">
                            <img :src="resDetail.resQrcode" padding-left="30px" width="100" height="100"/>
                        </div>
                        <br>
                    </div>
                    <div class="l">
                        <div class="l1"> 店铺头像 : </div>
                        <div class="l2">
                            <img :src="resDetail.resPhoto" padding-left="30px" width="260" height="150"/>
                        </div>
                        <br>
                    </div>
                    <br>
                    <br>
<!--                    <div class="l" style="display: inline">-->
<!--                        <el-button type="danger" plain>清空</el-button>-->
<!--                        <el-button type="success" plain>确定</el-button>-->
<!--                    </div>-->
                </div>
            </el-card>
        </div>
        <div class="resturantManageRight">
            <el-card class="box-card" style="height: 720px">
                <div slot="header" class="clearfix" >
                    <span style="font-size:18px;font-weight: bold;padding-bottom: 15px"> 通告管理 </span>
                    <el-button @click="applyInfoEdit" size="medium" style="float: right;padding-bottom: 8px" type="warning">申请修改</el-button>
                </div>
               <div class="line">
                   <div class="l">
                       <div class="l1"> 通告内容 : </div>
                       <el-input
                               type="textarea"
                               :autosize="{ minRows: 20, maxRows: 30}"
                               placeholder="请输入通告内容"
                               v-model="notice.noticeContent"
                               disabled
                               class="l2">
                       </el-input>
                       <br>
                   </div>
                   <br>
                   <br>
<!--                   <div class="l" style="display: inline">-->
<!--                       <el-button type="danger" plain>清空</el-button>-->
<!--                       <el-button type="success" plain>确定</el-button>-->
<!--                   </div>-->
               </div>
            </el-card>
        </div>

        <div class="dialog">
            <el-dialog title="店铺信息修改" :visible.sync="dialogResturantFormVisible">
            <el-form :model="form" size="small">
                <el-form-item label="商家店名" :label-width="formLabelWidth">
                    <el-input v-model="form.resName" placeholder="请输入商家店名" style="width:150px"autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="营业时间" :label-width="formLabelWidth">
                    <el-time-select
                            placeholder="起始时间"
                            v-model="form.onTime"
                            style="width:150px"
                            :picker-options="{
                              start: '08:30',
                              step: '00:15',
                              end: '18:30'
                            }">
                    </el-time-select>
                    <el-time-select
                            placeholder="结束时间"
                            v-model="form.offTime"
                            style="width:150px"
                            :picker-options="{
                              start: '08:30',
                              step: '00:15',
                              end: '18:30',
                              minTime: form.onTime
                            }">
                    </el-time-select>
                </el-form-item>
                <el-form-item label="营业资质" :label-width="formLabelWidth">
                    <el-input v-model="form.businessQualification" placeholder="请输入营业资质" style="width:150px"autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商家地址" :label-width="formLabelWidth">
                    <el-input v-model="form.resAddress" placeholder="请输入商家地址" style="width:150px"autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商家电话" :label-width="formLabelWidth">
                    <el-input v-model="form.resTelephoneNumber" placeholder="请输入商家电话" style="width:150px"autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="店二维码" :label-width="formLabelWidth">
                    <div @click="uploadResturantQrcodeImg">
                        <img style="border-radius:10%; width:150px; height:150px;" :src="form.resQrcode" fit="cover">
                        <input  hidden="hidden" type="file" accept="image/*" @change="handleQrcodeFile" class="hiddenInputQrcode"/>
                    </div>
                </el-form-item>
                <el-form-item label="店铺头像" :label-width="formLabelWidth">
                    <div @click="uploadResturantPhotoImg">
                        <img style="border-radius:10%; width:150px; height:150px;" :src="form.resPhoto" fit="cover">
                        <input  hidden="hidden" type="file" accept="image/*" @change="handlePhotoFile" class="hiddenInputPhoto"/>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogResturantFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="resturantInfoSubmit">确 定</el-button>
            </div>
        </el-dialog>
        </div>
        <div class="dialog">
        <el-dialog title="通告信息修改" :visible.sync="dialogInfoFormVisible">
            <el-form size="small">
                <el-form-item label="通告内容" :label-width="formLabelWidth">
                    <el-input
                            type="textarea"
                            :autosize="{ minRows: 20, maxRows: 30}"
                            placeholder="请输入通告内容"
                            v-model="newNotice.noticeContent"
                            class="l2">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogInfoFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogInfoSubmit">确 定</el-button>
            </div>
        </el-dialog>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ResturantManage",
        data(){
          return{
              isDisabled:true,
              resDetail:{
                  resDetailId:2,//ID
                  resName:'饱了么',//商家名称
                  // onTime:'08:00',//商家开始时间
                  // offTime:'21:00',//商家结束时间
                  onTime:'',//商家开始时间
                  offTime:'',//商家结束时间
                  businessQualification:'食品加工与销售',//商家营业资质
                  resAddress:'辽宁省沈阳市浑南区闯新路195号',//商家地址
                  resTelephoneNumber:'18888888888',//商家电话
                  // resQrcode:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=810988444,1648289218&fm=11&gp=0.jpg',
                  resQrcode:require('../../../../static/图片上传.png'),
                  resPhoto:require('../../../../static/图片上传.png'),
              },
              formLabelWidth:'120px',
              form:{
                  resDetailId:2,//ID
                  resName:'',//商家名称
                  onTime:'',//商家开始时间
                  offTime:'',//商家结束时间
                  businessQualification:'',//商家营业资质
                  resAddress:'',//商家地址
                  resTelephoneNumber:'',//商家电话
                  resQrcode:'',//店铺二维码图片
                  resPhoto:'',//店铺照片
              },
              notice:{
                  noticeId:2,//通告ID
                  noticeContent:'  本店新开张，所有菜品均享有七折优惠，办理会员更有机会免费抽取万元大奖，马上加入我们吧！' +
                      '\n  新研发菜品，味道鲜美，价格实惠!',//通告内容
                  noticeState:0,//通告状态
                  noticeStart:'',//通告开始时间
                  noticeEnd:'',//通告结束时间
              },
              newNotice:{
                  noticeId:2,//通告ID
                  noticeContent:'',//通告内容
                  noticeState:0,//通告状态
                  noticeStart:'',//通告开始时间
                  noticeEnd:'',//通告结束时间
              },
              infoContent:'  本店新开张，所有菜品均享有七折优惠，办理会员更有机会免费抽取万元大奖，马上加入我们吧！' +
                          '\n  新研发菜品，味道鲜美，价格实惠!',
              dialogResturantFormVisible:false,
              dialogInfoFormVisible:false,
              dialogImageUrl: '',
              dialogVisible: false,
              disabled: false,
              fileList1:[],
              fileList2:[],
              formData:'',
          }
        },
        created() {
            //获取店铺信息
            this.getResDetail();
            //获取通告信息
            this.getResInfo();
        },
        methods:{
            uploadResturantQrcodeImg: function () {
                this.$el.querySelector('.hiddenInputQrcode').click();
            },
            uploadResturantPhotoImg: function () {
                this.$el.querySelector('.hiddenInputPhoto').click();
            },
            handleQrcodeFile: function (e) {
                let $target = e.target || e.srcElement;
                let formData = new FormData();
                formData.append('pic', $target.files[0]);
                console.log($target.files[0]);
                console.log(formData);
                this.axios.post(`http://localhost:8080/resturant/up`,formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(r=>{
                    //console.log(r.data);
                    //console.log("http://localhost:8080/image/"+r.data.saveFileName);
                    this.form.resQrcode="http://localhost:8080/image/"+r.data.saveFileName;

                });
            },
            handlePhotoFile: function (e) {
                let $target = e.target || e.srcElement;
                let formData = new FormData();
                formData.append('pic', $target.files[0]);
                console.log($target.files[0]);
                console.log(formData);
                this.axios.post(`http://localhost:8080/resturant/up`,formData,{
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(r=>{
                    //console.log(r.data);
                    //console.log("http://localhost:8080/image/"+r.data.saveFileName);
                    this.form.resPhoto="http://localhost:8080/image/"+r.data.saveFileName;

                });
            },
            //移除
            handleRemove1(file, fileList) {
                this.fileList1=[];
                // return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //监控上传文件列表
            handleChange1(file, fileList) {
                this.fileList1=[];
                this.fileList1 = fileList;
            },
            //移除
            handleRemove2(file, fileList) {
                this.fileList2=[];
                // return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //监控上传文件列表
            handleChange2(file, fileList) {
                this.fileList2=[];
                this.fileList2 = fileList;
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                // this.dialogVisible = true;
            },
            handleDownload(file) {
                console.log(file);
            },
            //展示图片
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            //图片上传限制
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
            //获取店铺信息
            getResDetail() {
                this.axios.defaults.withCredentials = true;
                this.axios.get(`http://localhost:8080/resturant/getResInfo`).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    let resD = r.data.msg.ResD;
                    this.resDetail = resD;
                    this.resDetail.onTime = resD.onTime.substring(12,16);
                    this.resDetail.offTime = resD.offTime.substring(12,16);
                    this.resDetail.resQrcode = 'http://localhost:8080/image/'+resD.resQrcode;
                    this.resDetail.resPhoto = 'http://localhost:8080/image/'+resD.resPhoto;
                });
            },
            //店铺管理修改申请
            applyResturantEdit:function () {
                this.dialogResturantFormVisible = true;
                this.form = this.resDetail;
                //将显示的店铺信息图片放在弹出框中（问题是，无法传递文件信息，前后端交互的都是图片地址，只有选择之后才会有文件file）
                // elements.getElementById("resQRId").setAttribute("src",this.resDetail.resQrcode);
            },
            //店铺修改信息提交
            resturantInfoSubmit:function () {
                this.axios.defaults.withCredentials = true;
                this.form.resQrcode = this.resDetail.resQrcode.substring(28);
                this.form.resPhoto = this.resDetail.resPhoto.substring(28);
                this.axios.post(`http://localhost:8080/resturant/changeResInfo`,this.form).then(r=>{
                    console.log(r);
                    let obj = r.data.detail;
                    if(obj){
                        let resD = r.data.msg.ResD;
                        //console.log('获取到的resD:');
                        //console.log(resD);
                        //alert('店铺修改信息提交成功');
						this.$message({
						          message: '店铺修改信息提交成功',
						          type: 'success'
						        });
                        this.dialogResturantFormVisible = false;//关闭该窗口
                        this.resDetail.resQrcode = 'http://localhost:8080/image/'+resD.resQrcode;
                        this.resDetail.resPhoto = 'http://localhost:8080/image/'+resD.resPhoto;
                        console.log('上传结束后，resDetail:');
                        console.log(this.resDetail);

                    }else{
                        //alert('店铺修改信息提交失败');
						this.$message.error('店铺修改信息提交失败');
                    }
                });

            },
            //获取通告信息
            getResInfo() {
                this.axios.defaults.withCredentials = true;
                this.axios.get(`http://localhost:8080/resturant/getNoticeInfo`).then(r=>{
                    console.log(r);
                    console.log(r.data);
                    console.log(r.data.msg.NewNotice);
                    this.notice = r.data.msg.NewNotice;
                });
            },
            //通告管理修改申请
            applyInfoEdit:function () {
                this.dialogInfoFormVisible = true;
                this.newNotice = this.notice;
            },
            //通告管理修改提交
            dialogInfoSubmit:function() {
                this.axios.defaults.withCredentials = true;
                this.axios.post(`http://localhost:8080/resturant/addNoticeInfo`,this.newNotice).then(r=>{
                    console.log(r);
                    let obj = r.data;
                    if(obj){
                        
						this.$message({
						          message: '通告信息修改成功',
						          type: 'success'
						        });
                        this.dialogInfoFormVisible = false;//关闭该窗口
                    }else{
                        
						this.$message.error('通告信息修改失败');
                    }
                });
            },
        },
    }
</script>

<style lang="less" scoped>
.resturantManage{
    flex:3;
    display: flex;
    -flex-direction: column;
    -background-color: bisque;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    .resturantManageLeft{
        flex:1;
        -background-color: coral;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .resturantManageRight{
        flex:1;
        -background-color: lightcoral;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .line{
        flex:1;
        -background-color: lightskyblue;
        padding-top: 10px;
        padding-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        flex-direction: column;
        text-align: center;
        .l {
            display: flex;
            text-align: center;
            -background-color: lightcoral;
            .l1 {
                flex: 1;
                -background-color: #42b983;
                padding-top: 10px;
                text-align: center;
            }
            .l2 {
                flex: 3;
                -background-color: coral;
                padding-top: 10px;
                text-align: left;
            }
            .l3 {
                flex: 4;
                -background-color: azure;
                padding-top: 0px;
                text-align: right;
            }
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
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 80px;
        height: 80px;
        display: block;
    }
}
</style>