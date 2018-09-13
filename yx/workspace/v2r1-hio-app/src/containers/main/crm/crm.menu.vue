<template>
    <el-menu :default-active="JZY.s.getPathName()" class="el-menu-vertical-ehr" :router="true">
        <el-menu-item index="/crm" data-router-href="/crm" v-if="board">
                <i class="el-icon-menu"></i>
                <span>我的CRM</span>
        </el-menu-item>
        <el-menu-item index="/crm/customer" data-router-href="/crm/customer" v-if="customer">
                <i class="el-icon-date"></i>
                <span>客户</span>
        </el-menu-item>
        <el-menu-item index="/crm/contacts" data-router-href="/crm/contacts" v-if="link">
                <i class="el-icon-picture"></i>
                <span>联系人</span>
        </el-menu-item>
        <el-menu-item index="/crm/business" data-router-href="/crm/business" v-if="business">
                <i class="el-icon-goods"></i>
                <span>商机</span>
        </el-menu-item>
        <el-menu-item index="/crm/order" data-router-href="/crm/order" v-if="order">
                <i class="el-icon-document"></i>
                <span>订单</span>
        </el-menu-item>
        <el-submenu index="/crm/settings" data-router-href="/crm/settings" v-if="funSet">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>功能设置</span>
            </template>
            <el-menu-item index="/crm/settings">产品设置</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>

      export default {
        data() {
          return {
              funSet:false,
              board:false,
              customer:false,
              link:false,
              business:false,
              order:false,
          };
        },
        methods: {
            // SelectFn(index,indexPath){
            //     this.$root.$eventCRMSELECT.$emit('CRM_MENU_SELECT', index,indexPath);
            // },
            handleSelect(key, keyPath) {
            console.log(key, keyPath);

            var routerNext = keyPath[1].replace('./', '')
            console.info(routerNext)
            this.JZY.s.changeRouter('demo')
            // return this.$route.path.replace('/', '');
            }
        },
        created(){
            console.log('session信息',this.$store.state.session);
            console.log('session信息',this.$store.state.session.tenantInfo.roleMenus);
            let roleMenus=this.$store.state.session.tenantInfo.roleMenus;

            if(roleMenus.length !==0){
                roleMenus.forEach((item) => {
                    console.log(item.code);
                    if(item.code=="crm_board"){
                        this.board=true;
                    }else if(item.code=="crm_customer"){
                        this.customer=true;
                    }else if(item.code=="crm_link"){
                        this.link=true;
                    }else if(item.code=="crm_bussiness"){
                        this.business=true;
                    }else if(item.code=="crm_order"){
                        this.order=true;
                    }else if(item.code=="crm_manage"){
                         this.funSet=true;
                    }
                });
            }else if(roleMenus.length==0){
                this.board=true;
                this.customer=true;
                this.link=true;
                this.business=true;
                this.order=true;
                this.funSet=true;
            }
        },
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
