<template>
    <div>
        <div class="company" >
            <!--<el-row class="search">-->
                <!--<el-col :span="24" class="add-news">-->
                    <!--<el-button 　type="primary"  size="small" @click="handlerSave" :disabled="btnDisabled" >-->
                         <!--保存-->
                    <!--</el-button>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <div class="content-title">
                <h3>企业信息</h3>
                <el-button type="primary" class="add-news"  :disabled="btnDisabled"  size="small" @click="handlerSave">保存</el-button>
            </div>
            <el-form :model="companyData" :rules="rules" label-position="right" label-width="75px" ref="refForm">
                <el-form-item label="企业logo">
                    <el-upload class="avatar-uploader" ref="upload"
                               action=""
                               :show-file-list="false"
                               :limit="1"
                                name="file"
                               accept="image/jpg,image/png,image/bmp"
                               :on-success="handleAvatarSuccess"
                               :on-exceed="handleExceed"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon">上传图片</i>
                    </el-upload>
                    <span class="uploadDescribe ">最佳图片尺寸：288px*60px；支持格式：.jpg、.png、.bmp；图片大小：不超过1Mb</span>
                    <el-button  size="small" style="float: right" @click="handleBtnUpload">上传图片</el-button>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业名称" prop="name" class="inputLeftWidth">
                            <el-input v-model="companyData.name" maxlength="101"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="人员规模" >
                            <el-select v-model="companyData.personnelScale" placeholder="请选择" class="inputRightWidth">
                                <el-option
                                        v-for="item in persScale"
                                        :key="item.id"
                                        :label="item.sizeContent"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业类型">
                            <el-select v-model="companyData.type" placeholder="请选择" class="inputLeftWidth">
                                <el-option
                                        v-for="item in companyType"
                                        :key="item.sid"
                                        :label="item.name"
                                        :value="item.sid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属行业" >
                            <el-select v-model="companyData.industry" placeholder="请选择" @change="handlerIndustryChange" class="inputRightWidth">
                                <el-option
                                        v-for="item in industry"
                                        :key="item.sid"
                                        :label="item.name"
                                        :value="item.sid">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="所在地区" >
                                    <el-select v-model="companyData.province" placeholder="请选择" @change="handlerProvinceChange">
                                        <el-option
                                                v-for="item in regionProvince"
                                                :key="item.sid"
                                                :label="item.name"
                                                :value="item.sid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <!--<el-form-item  >-->
                                    <el-select v-model="companyData.city" placeholder="请选择"  class="inputLeftWidth">
                                        <el-option
                                                v-for="item in regionCity"
                                                :key="item.sid"
                                                :label="item.name"
                                                :value="item.sid">
                                        </el-option>
                                    </el-select>
                                <!--</el-form-item>-->
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="成立时间" >
                                    <el-select v-model="companyData.foundingYear" placeholder="请选择" class="inputRightWidth">
                                        <el-option
                                                v-for="item in years"
                                                :key="item.id"
                                                :label="item.id"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <!--<el-form-item  >-->
                                    <el-select v-model="companyData.foundingMonth" placeholder="请选择"
                                               style="margin-left: 20px;width: calc(100% - 20px)">
                                        <el-option
                                                v-for="item in months"
                                                :key="item.id"
                                                :label="item.id"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                <!--</el-form-item>-->
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业地址" >
                            <el-input v-model="companyData.address" maxlength="100"  class="inputLeftWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮政编码" >
                            <el-input v-model="companyData.postcode" class="inputRightWidth" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="企业网址" >
                            <el-input v-model="companyData.url"  :maxlength=100  class="inputLeftWidth"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="企业传真:" >
                            <el-input v-model="companyData.fax"  class="inputRightWidth"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "company",
        data(){
            return{
                companyData:{
                    name:"",
                    personnelScale:"",
                    type:"",
                    industry:"",
                    // industryChild:"",
                    province:"",
                    city:"",
                    address:"",
                    postcode:"",
                    fax:"",
                    url:"",
                    foundingYear:"",
                    foundingMonth:"",
                    id:""
                },
                rules:{
                    name:{ required: true, message: '企业名称不能为空', trigger: 'blur' }
                },
                imageUrl: '',
                persScale:[],
                industry:[],
                // industryChild:[],
                companyType:[],
                months:[{id:"1月"},{id:"2月"},{id:"3月"},{id:"4月"},{id:"5月"},{id:"6月"},{id:"7月"},
                    {id:"8月"},{id:"9月"},{id:"10月"},{id:"11月"},{id:"12月"}],
                regionProvince:[],   //省信息
                regionCity:[],   //市信息
                selectFile:"",
                btnDisabled:false
            }
        },
        mounted(){
               // this.getCompanyData();
            JZY.xhr.requestPromises([
                JZY.xhr.post('/platform/personnelSize/queryList',{},{alertSuccess:false}),
                this.getCompanyData(),
                this.getRegionProvinceData(),
            ]).then(async ([personnelSizeData])=>{
                this.persScale=personnelSizeData[0];
                // console.log(JSON.stringify(this.persScale))
            })
        },
        computed:{
            //计算出需要的年份
            years:function () {
                let currentYear = new Date().getFullYear();
                let arrYears=[];
                for(let i=currentYear;i>1980;i--){
                    arrYears.push({id:i})
                }
                arrYears.push({id:"早于1980"})
                return arrYears;
            }
        },
        methods: {
            handlerSave(){
                this.btnDisabled=true;
                this.$refs.refForm.validate((valid) => {
                    if (valid) {
                        try{
                            let pas={};
                            pas.sid=this.companyData.sid;
                            pas.name=this.companyData.name;
                            pas.industry=this.companyData.industry;
                            // pas.industryChild=this.companyData.industryChild;
                            pas.type=this.companyData.type;
                            pas.personnelScale=this.companyData.personnelScale;
                            pas.province=this.companyData.province;
                            pas.city=this.companyData.city;
                            pas.address=this.companyData.address;
                            pas.postcode=this.companyData.postcode;
                            pas.fax=this.companyData.fax;
                            pas.url=this.companyData.url;
                            pas.logo=this.imageUrl;
                            pas.foundingTime=this.companyData.foundingYear+"-"+this.companyData.foundingMonth;
                            this.commitAllData(pas,'/sys/organization/tendInfo/upload');
                        }catch (e){
                            this.btnDisabled=false;
                            this.$message("保存数据异常:"+e)
                        }
                    }else {
                        this.btnDisabled=false
                        return false;
                    }
                })
            },
            handleAvatarSuccess(res, file) {
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                let allowType="jpeg/png/bmp/jpg"
                let fileType = file.name.split('.')[1];
                const isLt2M = file.size / 1024 / 1024 < 1;
                if (!allowType.includes(fileType)) {
                    this.$message.error('上传企业logo图片只能是 jpg/png/bmp 格式!');
                    return;
                }
                if (!isLt2M) {
                    this.$message.error('上传企业logo图片大小不能超过 1MB!');
                    return;
                }
                // this.selectFile=file;
                let url=JZY.xhr.transformUrl('/platform/tenantInfo/uploadLogo','GLOBAL.ZHOU_QINLIN',false);
                JZY.xhr.request({
                    type:'POST',
                    url:url,
                    // multipart:true,
                    data:{
                        file:file
                    },
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((resultData)=>{
                    this.imageUrl=resultData[0];
                    // JZY.u.successMsg('操作成功')
                }).catch((e)=>{

                })
                return
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件`);
            },
            handlerIndustryChange(){
                // this.byIndustryfilerChild(true);
            },
            handlerProvinceChange(){
                // this.byPrivincefilerCity(true);
                this.getRegionCityData(this.companyData.province);
            },
            handleBtnUpload(){
                let fileValue = document.querySelector('.el-upload .el-upload__input');
                fileValue.click();
            },
            // byIndustryfilerChild(isClearIndustryChild){
            //     this.industry.forEach(item=>{
            //         if(item.sid==this.companyData.industry){
            //             if(item.children){
            //                 this.industryChild=item.children;
            //             }
            //         }
            //         if(isClearIndustryChild){
            //             this.companyData.industryChild=""
            //         }
            //     })
            // },
            // byPrivincefilerCity(isClearCity){
            //     this.regionProvince.forEach(item=>{
            //         if(item.sid==this.companyData.province){
            //             if(item.children){
            //                 this.regionCity=item.children;
            //             }
            //         }
            //         if(isClearCity){
            //             this.companyData.city=""
            //         }
            //     })
            // },
            async getCompanyData(){
                await JZY.xhr.post('/sys/organization/tendInfo/query',{},{alertSuccess:false}).then((resultData)=>{
                // await JZY.xhr.request({type:'get',url:'/sys/organization/tendInfo/query'},false,false).then((resultData)=>{
                    // console.log("getCompanyData:"+JSON.stringify(resultData))
                    this.getDictionaryData(2);
                    this.getDictionaryData(3);
                    // this.getRegionData();
                    this.companyData.sid=resultData[0].sid;
                    this.companyData.name=resultData[0].name;
                    this.companyData.personnelScale=resultData[0].personnelScale;
                    this.companyData.type=resultData[0].type;
                    this.companyData.industry=resultData[0].industry;
                    this.companyData.industryChild=resultData[0].industryChild;
                    this.companyData.province=resultData[0].province;
                    this.companyData.city=resultData[0].city;
                    this.companyData.address=resultData[0].address;
                    this.companyData.postcode=resultData[0].postcode;
                    this.companyData.fax=resultData[0].fax;
                    this.companyData.url=resultData[0].url;
                    let foundingTime=resultData[0].foundingTime.split("-")||[];
                    if(foundingTime.length>0){
                        this.companyData.foundingYear=foundingTime[0];
                    }
                    if(foundingTime.length>1){
                        this.companyData.foundingMonth=foundingTime[1];
                    }
                    this.imageUrl=resultData[0].logo;
                    this.getRegionCityData(this.companyData.province);
                    // JZY.u.successMsg('操作成功')
                }).catch((e)=>{

                })
            },
            async getDictionaryData(type){
                //type:2-行业；3-企业类型
                // let urlHead="http://10.17.8.207:9999/platform";
                await JZY.xhr.post('/platform/dictionary/queryNode',{type:type},{alertSuccess:false}).then((resultData)=>{
                    // console.log("getIndustryData:"+JSON.stringify(resultData))
                    try{
                       if(type==3){
                           this.companyType=resultData[0];
                       }else if(type==2){
                           this.industry=resultData[0];
                           // this.byIndustryfilerChild();
                       }
                    }catch (e){
                        this.$message("company.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
            async getRegionProvinceData(){
                //取省信息
                await JZY.xhr.post('/platform/region/queryNode',{},{alertSuccess:false}).then((resultData)=>{
                    // console.log("getRegionData:"+JSON.stringify(resultData))
                    try{
                        this.regionProvince=resultData[0];
                        // this.byPrivincefilerCity();
                    }catch (e){
                        this.$message("company.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
            async getRegionCityData(provinceCode){
                //取市信息
                await JZY.xhr.post('/platform/region/queryNode',{province:provinceCode},{alertSuccess:false}).then((resultData)=>{
                    // console.log("getRegionData:"+JSON.stringify(resultData))
                    try{
                        this.regionCity=resultData[0][0].children;
                        // this.byPrivincefilerCity();
                    }catch (e){
                        this.$message("company.vue-queryNode:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.loading=false;
                })
            },
            async commitAllData(pas,url){
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    try{
                        // this.roleData=resultData[0].list;
                        this.btnDisabled=false;
                        JZY.store.commit('UPDATE_USERINFO_COMPANYLOGO',pas.logo)
                    }catch (e){
                        this.btnDisabled=false;
                        this.$message("company.vue:"+e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
        }
    }
</script>

<style  lang="scss">
.company{
    /*background-color: #fff;*/
    padding: 24px;
    .content-title{
        position: relative;
        line-height: 32px;
        height: 64px;
        border-bottom: 1px solid $theme-grey-table-border;
        margin-bottom: 24px;
        h3{
            height: 64px;
            line-height: 64px;
            text-align: left;
            font-size: 14px;
            font-weight: normal;
            color: $theme-black-title;
        }
        .add-news{
            position: absolute;
            right: 0;
            top:16px;
        }
    }
    .avatar-uploader{
        float: left;
        margin-right: 27px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 167px;
        height: 40px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        color: $theme-blue;
        width: 144px;
        height: 30px;
        text-align: center;
    }
    .avatar {
        width: 144px;
        height: 30px;
        display: block;
        margin: 5px 11px;
    }
    .uploadDescribe{
        color: #A0A0A0;
    }
    .inputRightWidth{
        width: 100%;
    }
    .inputLeftWidth{
        width: calc(100% - 54px);
    }
}
</style>