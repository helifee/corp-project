<template>
    <div class="home_left_menu">
        <div class="userImg">
            <div class="img">
                <img class="img-circle" :src="JZY.s.getOssThumbSrc($store.state.session.userInfo.resourceImgUrl)" alt="image" />
                <!--<img class="img-circle" :src="_self.JZY.c.imgPath+'/logo.png'" alt="image" />-->
            </div>
            <div class="name" v-text="userInfo.name"></div>
            <div class="dept">
                <span v-text="userInfo.dept"></span>
                <span v-text="userInfo.postName || ''"></span>
            </div>
        </div>
        <el-menu :default-active="JZY.s.getPathName()" class="el-menu-vertical-home" :router="true">
            <el-menu-item index="/">
                <i class="el-icon-mobile-phone"></i>
                <span slot="title">我的工作</span>
            </el-menu-item>
            <el-menu-item index="/phoneList">
                <i class="el-icon-tickets"></i>
                <span slot="title">通讯录</span>
            </el-menu-item>
            <!-- <el-menu-item index="/email/inbox/id">
                <i class="el-icon-message"></i>
                <span slot="title">邮箱</span>
            </el-menu-item>
            <el-menu-item index="/docment">
                <i class="el-icon-sold-out"></i>
                <span slot="title">我的文档</span>
            </el-menu-item>
            <el-menu-item index="/notebook">
                <i class="el-icon-upload"></i>
                <span slot="title">云笔记</span>
            </el-menu-item> -->
        </el-menu>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        userInfo:{
            name:'',
            imgUrl:'',
            dept:'',
            role:'',//角色
            postName:'',//职务
        },
        
      };
    },
    methods: {
        async getUserInfo(){
            // let res = await getUserInfo()
            console.info("this.$store.state.session",this.$store.state.session)
            this.userInfo = JZY.u.deepExtend({},this.userInfo,this.$store.state.session)
            //职务
            this.userInfo.tenantInfo.jobs.forEach((item)=>{
                if (item.isDefault == 'true') {
                    this.userInfo.postName = item.postName
                }
            });
            console.info("this.userInfo",this.userInfo)

            if (this.userInfo.name =='' || this.userInfo.dept =='' || this.userInfo.role =='') {//登陆信息异常
                  this.$confirm('登陆异常，请重新登陆?', '提示', {
                    confirmButtonText: '确定',
                    // cancelButtonText: '取消',
                    showCancelButton:false,
                    closeOnClickModal:false,
                    showClose:false,
                    type: 'warning'
                  }).then(() => {
                    JZY.s.logout()
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                  });
            }
        }
    },
    mounted(){
        this.getUserInfo()
    },
    watch:{
        '$store.state.session':{
            handler(newValue, oldValue) {
                console.info("newValue");
                console.info(newValue);
                this.getUserInfo()
            },
            deep: true
        },
    }
  }
</script>

<style scoped lang="scss">
$imgWH: 64px;
.home_left_menu{
    height:100%;
    @include font(14px,40px);
    // background-color:$theme-blue;
    // border-right:1px solid $theme-grey-table-border;
    .el-menu-vertical-home{
        border-right:none
    }
    .userImg{
        width: 100%;
        height: 195px;
        .img{
            width: $imgWH;
            height: $imgWH;
            margin: 0px auto 10px;
            padding-top: 45px;
            .img-circle{
                // border:1px solid #ccc;
                width: $imgWH;
                height: $imgWH;
                border-radius: 50%;
                background-color:$theme-grey-input-border;
            }
        }
        .name{
            text-align: center;
            @include font(14px,32px);
            color: $theme-black-title;
        }
        .dept{
            text-align: center;
            @include sc(12px,$theme-black-other);
            line-height: 14px;
        }
    }
    .el-menu-item{
        @include sc(14px,$theme-black);
    }
}
</style>