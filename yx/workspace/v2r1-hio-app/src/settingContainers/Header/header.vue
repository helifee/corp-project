<template>
    <div class="header-container">
        <header>
            <el-row>
                <el-col class="logo-wrapper" :span="4">
                    <img :src="JZY.store.state.session.tenantInfo.logo || _self.JZY.c.imgPath+'/hiologo@2x.png'">
                    <!--<div>这里是图片</div>-->
                </el-col>
                <el-col :span="16">
                    <div :class="{active:activeMenuId==item.id}" v-for="item in menuData" class="menu-item" @click="handleMenuItemClick(item)">
                        <span>{{item.name}}</span>
                    </div>
                </el-col>
                <el-col :span="4" style="text-align: right;padding-right: 24px">
                     <!--<el-button @click="handleColse" size="mini">关闭</el-button>-->
                    <span @click="handleColse" title="关闭"><icon name="header_shutdown" scale = "2" style="color:#46A7FF;cursor: pointer;"></icon></span>
                </el-col>
            </el-row>
        </header>
    </div>
</template>

<script>
    export default {
        name: "systemheader",
        methods:{
            handleMenuItemClick(item){
                this.activeMenuId=item.id;
                this.$router.push(item.url);
            },
            handleColse(){
                window.close();
            }
        },
        data() {
            return{
                menuData:[
                    {url:'/system/organization',name:"组织机构",id:1},
                    {url:'/system/role',name:'角色权限',id:2},
                    {url:'/system/application',name:'应用管理',id:3},
                    {url:'/system/company',name:'企业信息',id:4}
                ],
                activeMenuId:1
            }
        },
        created(){
            let currentUrl='/system/'+(this.JZY.s.getPathName().split('/')[2]||'');
            let activeMenuObj=this.menuData.find((item)=>{
                // console.log('current and item url:',currentUrl,item.url)
                if(item.url.startsWith(currentUrl)){
                    return item.url
                }
            })
            // console.log("activeMenuObj:"+JSON.stringify(activeMenuObj.id))
            if(activeMenuObj){
                this.activeMenuId=activeMenuObj.id
            }
        }
    }
</script>

<style scoped lang="scss">
    $headerHeight: 50px;
    .header-container {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1999;
        header{
            z-index:10;
            min-width:1366px;
            width: 100%;
            .menu-item{
                cursor:pointer;
                float:left;
                display:block;
                width:140px;
                height:$headerHeight - 5px;
                line-height: $headerHeight - 5px;
                /*color:#666666;*/
                font-size:16px;
                text-align:center;
                span{
                    display:inline-block;
                    @include font(14px,($headerHeight - 2px))
                }
                &.active{
                    span{
                        color:$theme-blue;
                        font-weight:600;
                        border-bottom:solid 2px $theme-blue;
                    }
                }
                &:hover{
                    color:$theme-blue;
                    background-color:$theme-blue-header-active;
                    font-weight:500;
                    border-bottom:solid 2px $theme-blue-header-active;
                    span{
                        border-bottom:none;
                    }
                }
            }
            .logo-wrapper{
                height:$headerHeight;
                width:176px;
                line-height:$headerHeight - 10px;
                float: left;
                img{
                    display:inline-block;
                    width:144px;
                    height: 30px;
                    position: relative;
                    left:10px;
                    top: 10px;
                }
            }
            /*background:#fff;*/
            height:$headerHeight;
            line-height:$headerHeight;
            position:fixed;
            top:0;
            left:0;
            /*box-shadow: 0px 3px 5px rgba(153, 153, 153, 0.349019607843137);*/
        }
    }
</style>