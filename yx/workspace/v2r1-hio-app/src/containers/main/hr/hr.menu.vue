<template>
    <el-menu :unique-opened="true" :default-active="JZY.s.getPathName()" class="el-menu-vertical-hr" :router="true">
        <el-menu-item index="/hr" v-if="hrIndex">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>

        <el-menu-item index="/hr/zzrs" v-if="hrOrg">
            <i class="el-icon-sold-out"></i>
            <span slot="title">组织人事</span>
        </el-menu-item>

        <!-- 
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-date"></i>
                <span>考勤管理</span>
            </template>
            <el-menu-item index="/hr/qddd">考勤核算</el-menu-item>
            <el-menu-item index="/hr/njgl">年假管理</el-menu-item>
            <el-menu-item index="/hr/qjxx">请假信息</el-menu-item>
            <el-menu-item index="/hr/ccgl">出差管理</el-menu-item>
            <el-menu-item index="/hr/ccgc">市内公出</el-menu-item>
            <el-menu-item index="/hr/wdk">未打卡管理</el-menu-item>
        </el-submenu>
	    -->
        <el-menu-item index="/hr/qddd" v-if="hrAttendance">
            <i class="el-icon-date"></i>
            <span slot="title">考勤管理</span>
        </el-menu-item>

        <el-menu-item index="/hr/sbgjjjs" v-if="hrSocial">
            <i class="el-icon-news"></i>
            <span slot="title">社保管理</span>
        </el-menu-item>

        <el-menu-item index="/hr/xzjs" v-if="hrSalary">
            <i class="el-icon-picture"></i>
            <span slot="title">薪资管理</span>
        </el-menu-item>

        <el-menu-item index="/hr/px" v-if="hrTrain">
            <i class="el-icon-sold-out"></i>
            <span slot="title">培训管理</span>
        </el-menu-item>
        
        <el-submenu index="6" v-if="hrMyself">
            <template slot="title">
                <i class="el-icon-document"></i>
                <span>员工中心</span>
            </template>
            <el-menu-item index="/hr/wdxx" v-if="hrSelf">我的信息</el-menu-item>
            <el-menu-item index="/hr/wdkq" v-if="hrSelf">我的考勤</el-menu-item>
            <el-menu-item index="/hr/wdgz" v-if="hrSelf">我的工资</el-menu-item>
            <el-menu-item index="/hr/kck" v-if="hrSelf">培训中心</el-menu-item>
            <el-menu-item index="/hr/tdxx" v-if="hrUser">我的团队</el-menu-item>
            <el-menu-item index="/hr/tdkq" v-if="hrUser">团队考勤</el-menu-item>
	        <el-menu-item index="/hr/tdxc" v-if="hrUser">团队薪资</el-menu-item>
        </el-submenu>

        <el-submenu index="7" v-if="hrSys">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
            </template>
            <el-menu-item index="/hr/zbgl">指标管理</el-menu-item>
            <el-menu-item index="/hr/dmgl">代码管理</el-menu-item>
            <el-menu-item index="/hr/csgl">参数管理</el-menu-item>
        </el-submenu>

        <el-menu-item index="/hr/auth" v-if="hrAuth">
            <i class="el-icon-document"></i>
            <span slot="title">数据权限</span>
        </el-menu-item>

    </el-menu>
</template>
<script>
    export default {
    	name: "hr-menu",
        data() {
            return {
                hrIndex : false,
				hrOrg : false,
				hrAttendance : false,
				hrSocial : false,
				hrSalary : false,
				hrTrain : false,
				hrMyself : false,
				hrSelf : false,
				hrUser : false,       
				hrSys : false,
				hrAuth : false
            };
        },
        mounted(){
        	let roleMenus=this.$store.state.session.tenantInfo.roleMenus;
            if(roleMenus.length !==0){
                roleMenus.forEach((item) => {
                    // console.log(item.code);
                    if(item.code == "hr_index"){ //首页
                		this.hrIndex = true;
                    } else if(item.code == "hr_org"){ //组织人事
                        this.hrOrg = true;
                    } else if(item.code == "hr_attendance"){ //考勤管理
                        this.hrAttendance = true;
                    } else if(item.code == "hr_social"){ //社保管理
                        this.hrSocial = true;
                    } else if(item.code == "hr_salary"){ //薪资管理
                        this.hrSalary = true;
                    } else if(item.code == "hr_train"){ //培训管理
                        this.hrTrain = true;
                    } else if(item.code == "hr_self"){ //自助管理
                    	this.hrMyself = true;
                        this.hrSelf = true;
                    } else if(item.code == "hr_user"){ //员工管理
                    	this.hrMyself = true;
                        this.hrUser = true;
                    } else if(item.code == "hr_sys"){ //系统权限
                        this.hrSys = true;
                    } else if(item.code == "hr_auth"){ //数据权限
                        this.hrAuth = true;
                    }
                    
                });
            }else{
                this.hrIndex = true;
				this.hrOrg  = true;
				this.hrAttendance  = true;
				this.hrSocial  = true;
				this.hrSalary  = true;
				this.hrTrain  = true;
                this.hrMyself = true;
				this.hrSelf  = true;
				this.hrUser  = true;       
				this.hrSys  = true;
				this.hrAuth  = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    $iconColor: #3bb4f2;
    .el-menu-vertical-hr{
        height:100%;
        // overflow-y:scroll;
        /*overflow-x:hidden;*/
    }
</style>