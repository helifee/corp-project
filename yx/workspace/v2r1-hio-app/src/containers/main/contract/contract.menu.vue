<template>
    <el-menu :default-active="JZY.s.getPathName()" class="el-menu-vertical-ehr"  :router="true" >
        <el-menu-item index="/contract" v-if="contractManagerRole">
            <i class="el-icon-menu"></i>
            <span>付款类合同</span>
        </el-menu-item>
        <el-menu-item index="/contract/contractPaymentAll" v-if="contractManagerRole">
            <i class="el-icon-date"></i>
            <span>付款台账</span>
        </el-menu-item>
        <el-submenu index="/contract/settings" v-if="contractSetRole">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>基础设置</span>
            </template>
            <el-menu-item index="/contract/settingType">合同类型</el-menu-item>
            <el-menu-item index="/contract/settingChange">变更类型</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "contract-menu",
        data(){
            return{
                contractSetRole:false,
                contractManagerRole:false,
            }
        },
        mounted(){
            let roleMenus=this.$store.state.session.tenantInfo.roleMenus;
            if(roleMenus.length !==0){
                roleMenus.forEach((item) => {
                    // console.log(item.code);
                    if(item.code=="agreement_setting"){
                        this.contractSetRole=true;
                    }else if(item.code=="agreement_manage"){
                        this.contractManagerRole=true;
                    }
                });
            }else{
                this.contractSetRole=true;
                this.contractManagerRole=true;
            }
        }
    }
</script>

<style scoped lang="scss" scoped>
    $iconColor: #3bb4f2;
    .el-menu-vertical-ehr{
        height:100%;
        // overflow-y:scroll;
        /*overflow-x:hidden;*/
    }
</style>