<template>
    <div class="wrap">
        <div class="content-title">
            <h3>我的客户</h3>
            <ul class="operation">
                <!-- <li><el-checkbox>显示共享给我的</el-checkbox></li> -->
                <li><el-button type="primary" size="small" v-if="funSet" @click="showAssignDialog">分配</el-button></li>
                <i style="margin-left:8px;">
                    <el-dropdown split-button type="primary" size="small" @click="showCustomerDialog" @command="handleImportUser">
                        <i class="el-icon-plus"></i>创建客户
                        <el-dropdown-menu slot="dropdown" :visible-arrow="false">
                            <el-dropdown-item :visible-arrow="false">导入</el-dropdown-item>
                            <!-- <el-dropdown-item>导出</el-dropdown-item> -->
                        </el-dropdown-menu>
                    </el-dropdown>
                </i>
            </ul>

        </div>
        <!--项目列表-->
        <div class="project-wrap">
            <div>
                <ul class="color-panle">
                    <li :key="index" v-for="(item,index) in customerClass" @click="tab(item.status)" :class="{cur:item.status == showIndex}"  :style="{  width: 20 +'%'}">{{item.statusName}}（{{item.count}}）</li>
                    <!-- <li v-for ="(item,index) in customerClassChange" @click="tab(index)" :class="{cur:index == showIndex}"  :style="{  width: item.width +'%', backgroundColor: item.color }">{{item.name}}（{{item.value}}）</li> -->
                </ul>
            </div>
            <!--查询条件-->
            <div class="project-search customerSearch">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                    <el-form-item label=" 客户名称：" prop="searchVal">
                        <el-input v-model="searchForm.searchVal" placeholder="客户名称" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 客户类型：" prop="searchVal1">
                         <el-select v-model="searchForm.searchVal1" placeholder="请选择客户类型" style="width: 200px">
                            <el-option label="-请选择客户类型-" value=""></el-option>
                            <!-- <el-option label="一般客户" value="0"></el-option> -->
                            <el-option label="潜在客户" value="1"></el-option>
                            <el-option label="普通客户" value="2"></el-option>
                            <el-option label="vip客户" value="3"></el-option>
                        </el-select>
                        <!-- <el-input v-model="searchForm.searchVal1" placeholder="请输入关键词进行检索" style="width: 240px"></el-input> -->
                    </el-form-item>
                    <span v-if="inputShow">
                    <el-form-item label=" 客户来源：" prop="searchVal2">
                        <el-select v-model="searchForm.searchVal2" placeholder="请选择客户来源" style="width: 200px">
                            <el-option label="-请选择客户来源-" value=""></el-option>
                            <el-option label="网站" value="0"></el-option>
                            <el-option label="百度推广" value="1"></el-option>
                            <el-option label="会销" value="2"></el-option>
                            <el-option label="微信" value="3"></el-option>
                            <el-option label="地推" value="4"></el-option>
                            <el-option label="其他" value="9"></el-option>
                        </el-select>
                        <!-- <el-input v-model="searchForm.searchVal2" placeholder="请输入关键词进行检索" style="width: 240px"></el-input> -->
                    </el-form-item>
                    <el-form-item label="跟进情况：" prop="searchVal3">
                        <el-select v-model="searchForm.searchVal3" placeholder="请选择跟进情况" style="width: 200px">
                            <el-option label="-请选择跟进情况-" value=""></el-option>
                            <el-option label="1天内未跟进" value="1"></el-option>
                            <el-option label="3天内未跟进" value="3"></el-option>
                            <el-option label="5天内未跟进" value="5"></el-option>
                            <el-option label="7天内未跟进" value="7"></el-option>
                            <el-option label="10天内未跟进" value="10"></el-option>
                            <el-option label="15天内未跟进" value="15"></el-option>
                        </el-select>
                        <!-- <el-input v-model="searchForm.searchVal3" placeholder="请输入关键词进行检索" style="width: 240px"></el-input> -->
                    </el-form-item>
                    <el-form-item label="分配状态：" prop="searchVal4">
                        <el-select v-model="searchForm.searchVal4" placeholder="请选择分配状态" style="width: 200px">
                            <el-option label="-请选择分配状态-" value=""></el-option>
                            <el-option label="未分配" value="0"></el-option>
                            <el-option label="已分配" value="1"></el-option>
                        </el-select>
                        <!-- <el-input v-model="searchForm.searchVal4" placeholder="请输入关键词进行检索" style="width: 240px"></el-input> -->
                    </el-form-item>
                    <el-form-item  label="签约订单：" prop="searchVal5">
                        <el-select v-model="searchForm.searchVal5" placeholder="请选择签约状态" style="width: 200px">
                            <el-option label="-请选择签约订单情况-" value=""></el-option>
                            <el-option label="有" value="1"></el-option>
                            <el-option label="无" value="0"></el-option>
                        </el-select>
                        <!-- <el-input v-model="searchForm.searchVal4" placeholder="请输入关键词进行检索" style="width: 240px"></el-input> -->
                    </el-form-item>
                    <el-form-item style="width:272px;" v-if="funSet"  label="负责人：" prop="searchVal6">
                    <!-- <i class="el-icon-share" @click="showUserTreeOnly = !showUserTreeOnly"></i>
                    <el-tag v-if="tagShow"
                    v-for="(item,index) in showUserOnly"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="deleteUserOnly(item.sid)">
                    {{item.name}}
                    </el-tag> -->

                     <!--全局组件的使用-->
                    <blend-tree
                        ref= "chargeTree"
                        :enable-checked-multiple = "enableCheckedMultiple"
                        :filterDataUrl = "filterDataUrl"
                        :tagButtons="tagButtons"
                        :activeTab = "activeTab"
                        :workStatus = "workStatus"
                        :readOnly = "readOnly"
                        :resultDataListShow = "resultDataListShow"
                        :selectedDataToTree = "selectedDataToTree"
                        @getDataFromTree = "getDataFromTree">
                        <!--添加按钮图标的插槽-->
                        <div slot="add_button">
                        <i class="el-icon-circle-plus" @click.stop = "$refs.chargeTree.blendTreeDialogShow()"></i>
                        </div>
                    </blend-tree>

                    <!--不用插槽的情况下，触发组件的方式-->
                    <!-- <el-button @click="$refs.chargeTree.blendTreeDialogShow()">{{this.treeName}}</el-button> -->

                    <!-- <user-tree
                        :selectUserDialogVisible="showUserTreeOnly"
                        :enable-checked-multiple="enableCheckedMultipleUser"
                        :show-inside-outside-tabs="showInsideOutsideTabs"
                        :selectedUsers = "showUserOnly"
                    
                        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
                        @getUserTree = "getUserTreeOnly">
                    </user-tree> -->
                        <!-- <el-input v-model="searchForm.searchVal6" placeholder="请输入关键词进行检索" style="width: 200px"></el-input> -->
                    </el-form-item>
                    </span>
                    <el-form-item class="button">
                        <el-button type="primary" size="small" @click="search">查询</el-button>
                        <el-button type="primary" size="small" @click="resetForm('searchForm')">重置</el-button>
                        <span class="spanDown" @click="inputCli">{{this.openName}}<i class="el-icon-arrow-down"></i></span>
                    </el-form-item>
                </el-form>

            </div>
            <!--表格-->
            <!-- @row-click='jump' -->
            <el-table
                class="cusTable"
                :row-class-name="getRowClass"
                @expand-change="cli"
                 @sort-change="orderList"
                :data="tableData5"
                @selection-change="handleSelectionChange"
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;text-align: center;"
                :cell-style="{'font-family': 'MicrosoftYaHei','height':'50px','font-size': '12px','color': '#505050','letter-spacing': 0,'text-align': 'center','line-height': '12px'}"
                :header-cell-style="{'font-family': 'MicrosoftYaHei','text-align':'center','height':'50px','background':' #F6F7F8','font-size':'12px','font-weight':'normal','color':'#505050','padding':'0px'}">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column> 
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-table :show-header='false' :data="scope.row.contactList">
                            <el-table-column label="">
                                <template slot-scope="scope">
                                    <span>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="" width="50">
                                <template slot-scope="scope">
                                    <span>{{scope.row.gendar}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="" width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.phoneNumber}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="" width="100">
                                <template slot-scope="scope">
                                    <span>{{scope.row.decisionRole}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label=""  width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.row.email}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label=""  width="240" align="left">
                                <template slot-scope="scope">
                                    <span>上次联系于{{scope.row.lastContactTime}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label=""  width="240">
                                <template slot-scope="scope">
                                    <span>{{scope.row.createPersonName}}创建于{{scope.row.createDate}}</span>
                                </template>
                            </el-table-column>
                            
                       
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    label="名称">
                    <template slot-scope="scope">
                        <a @click="customerJump(scope.row.customerId)">{{scope.row.customerName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    label="来源"
                    width="100"
                    prop="source">
                    <template slot-scope="scope">
                        <span>{{scope.row.source | sour}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="地址"
                    prop="address"
                    width="150">
                </el-table-column>
                <el-table-column label="客户类型" prop="type" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.type | cusType}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="负责人"
                    width="100"
                    prop="salesmanName">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    sortable
                    prop="createDate"
                    width="145">
                </el-table-column>
                
                <el-table-column
                    label="最后跟进时间"
                    sortable
                    prop="lastFollowTime"
                    width="145">
                </el-table-column>
                <el-table-column
                    label="操作" width="125">
                    <template slot-scope="scope">
                        <el-tooltip class="item" v-if="funSet" effect="dark" content="分配客户" placement="bottom">
                            <i style="margin-right:4px; font-size:14px; color:#46A7FF; transform:rotate(90deg); -ms-transform:rotate(90deg); -moz-transform:rotate(90deg); -webkit-transform:rotate(90deg); -o-transform:rotate(90deg);" class="el-icon-sort" @click="showAssignDialogSingle(scope.row.customerId,scope.row.salesmanId,scope.row.salesmanName)"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="跟进记录" placement="bottom">
                            <i style="margin-right:4px; font-size:14px; color:#46A7FF;" class="el-icon-tickets" @click="showRecordformDialog(scope.row.customerId)"></i>
                        </el-tooltip>
                        <!-- <span style="color: #409EFF">分配</span>
                        <span style="color: #409EFF">跟进</span> -->
                        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                            <i style="margin-right:4px; font-size:14px; color:#46A7FF;" class="el-icon-edit" @click="showCustomerDialogUpdate(scope.row.customerId)"></i>
                            <!-- <span style="color: #409EFF" @click="showCustomerDialogUpdate(100057)">编辑</span> -->
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="作废" placement="bottom">
                            <i style="font-size:14px;" @click="voidMethod(scope.row.customerId)">
                                <icon name="customer_void" scale="1.63" style=" color:#46A7FF;"></icon>
                            </i>
                            <!-- <i style="color:#46A7FF;" class="el-icon-delete" @click="voidMethod(scope.row.customerId)"></i> -->
                            <!-- <span style="color: #409EFF" @click="voidMethod(scope.row.sid)">作废</span> -->
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <el-pagination v-if="dataTotal==0?false:true"
            :current-page="pageNum"
                :page-size="pageCount"
                :page-sizes="[10,20,50,100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.dataTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
        </el-pagination>

        <!--右侧弹窗导入用户-->
        <import-user-customer :dialogVisible="importUserDialogVisible" v-if="importUserDialogVisible"
                          @closeCreateModal="closeImportUserDialog"></import-user-customer>

        <dialog-create-customer @contomerData="contomerData" v-if="customerDialogVisible" :dialogVisible="customerDialogVisible"  @closeCreateModal="closeCustomerDialog"></dialog-create-customer>
        <dialog-update-customer @contomerData="contomerData" v-if="customerDialogVisibleUpdate"  ref="reftest" :dialogVisible="customerDialogVisibleUpdate"  @closeCreateModal="closeCustomerDialogUpdate"></dialog-update-customer>
        <dialog-assign-users v-if="assignDialogVisible" ref="refdest" :queryData="queryData" :dialogVisible="assignDialogVisible"  @closeCreateModal="closeAssignDialog" @closeDist="closeDis"></dialog-assign-users>
        <dialog-assign-users-single v-if="assignDialogVisibleSingle" ref="refdestSingle"  :queryData="queryData" :dialogVisible="assignDialogVisibleSingle"  @closeCreateModal="closeAssignDialogSingle" @closeDist="closeDisSin"></dialog-assign-users-single>
        <dialog-follow-recordform-cu :dialogVisible="recordformDialogVisible" ref="recordformId"  v-if="recordformDialogVisible" @closeCreateModal="showRecordformDialogClo"></dialog-follow-recordform-cu>
    </div>
</template>

<script>
    import dialogFollowRecordformCu from '@Main/crm/components/dialog.follow.recordform_cu.vue'
    import importUserCustomer from '@Main/crm/components/importUsers_customer.vue'
    import dialogAssignUsers from '@Main/crm/components/dialog.assign.users.vue'
    import dialogAssignUsersSingle from '@Main/crm/components/dialog.assign.users.single.vue'
    import dialogCreateCustomer from '@Main/crm/components/dialog.create.customer.vue'
    import dialogUpdateCustomer from '@Main/crm/components/dialog.update.customer.vue'
    import {contomerList,modifyCustomer,voidCustomer,numSta,contactsAll,queryContactAll} from '@Main/crm/getData'
    
    export default{
        components: {
            dialogAssignUsers,
            dialogAssignUsersSingle,
            dialogCreateCustomer,
            dialogUpdateCustomer,
            importUserCustomer,
            dialogFollowRecordformCu
        },
        filters:{
            sour (value){
                switch (value) {
                    case 0:
                        return '网站';
                    case 1:
                        return '百度推广';
                    case 2:
                        return '会销';
                    case 3:
                        return '微信';
                    case 4:
                        return '地推';
                    case 9:
                        return '其他';
                }
            },
            cusType (value){
                switch (value) {
                    case 0:
                        return '一般客户';
                    case 1:
                        return '潜在客户';
                    case 2:
                        return '普通客户';
                    case 3:
                        return 'vip客户';
                }
            },
            
        },
        methods:{
            routerReloadMethod(){
                this.numStaData();
                let pageNum=1;
                let pageCount=10;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                });
            },
            //接收混合树组件的返回值
            getDataFromTree( obj = {} ){
                console.info(obj.userList)
                obj.userList.forEach((item)=>{
                    console.info(item.sid)
                    this.sid=item.sid;
                    console.info(item.name)
                    this.treeName=item.name;
                })
                
                console.info(JSON.stringify(obj))
                // debugger
            },
            getRowClass(row, rowIndex) {
                console.log('列表数据',row.row.conListLength);
                if (row.row.conListLength === 0) {
                    return 'row-expand-cover';
                } 
            },
            //关闭分配弹出框
            closeDis(){
                this.assignDialogVisible  = false;
            },
            closeDisSin(){
                this.assignDialogVisibleSingle  = false;
            },
            //后端排序
            orderList(obj){
                console.log(obj);
                if(obj.prop=="createDate"){
                    if(obj.order=="ascending"){
                        let customerName=this.searchForm.searchVal;//客户名称
                        console.log(this.searchForm.searchVal)

                        let type=this.searchForm.searchVal1;//客户类型
                        console.log(this.searchForm.searchVal1)

                        let source=this.searchForm.searchVal2;//客户来源
                        console.log(this.searchForm.searchVal2)

                        let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                        console.log(this.searchForm.searchVal3)

                        let allocationStatus=this.searchForm.searchVal4;//分配状态
                        console.log(this.searchForm.searchVal4)

                        let dealStatus=this.searchForm.searchVal5;//签约状态
                        console.log(this.searchForm.searchVal5);
                        console.log("负责人数据",this.showUserOnly);
                        this.showUserOnly.forEach((item)=>{
                                    this.sid=item.sid;
                                })
                        let pageNum=this.pageNum;
                        let pageCount=this.pageCount;

                        this.contomerData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerName':customerName,
                            'type':type,
                            'source':source,
                            'notfollowDay':notfollowDay,
                            'dealStatus':dealStatus,
                            'allocationStatus':allocationStatus,
                            'uid':this.sid,
                            'status':this.status,
                            'createDateSort':'asc',
                            'lastContactTimeSort':''
                        });
                        this.creaSort='asc';
                        this.lastSort='';
                    }else if(obj.order=="descending"){
                        let customerName=this.searchForm.searchVal;//客户名称
                        console.log(this.searchForm.searchVal)

                        let type=this.searchForm.searchVal1;//客户类型
                        console.log(this.searchForm.searchVal1)

                        let source=this.searchForm.searchVal2;//客户来源
                        console.log(this.searchForm.searchVal2)

                        let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                        console.log(this.searchForm.searchVal3)

                        let allocationStatus=this.searchForm.searchVal4;//分配状态
                        console.log(this.searchForm.searchVal4)

                        let dealStatus=this.searchForm.searchVal5;//签约状态
                        console.log(this.searchForm.searchVal5);
                        console.log("负责人数据",this.showUserOnly);
                        this.showUserOnly.forEach((item)=>{
                                    this.sid=item.sid;
                                })
                        let pageNum=this.pageNum;
                        let pageCount=this.pageCount;

                        this.contomerData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerName':customerName,
                            'type':type,
                            'source':source,
                            'notfollowDay':notfollowDay,
                            'dealStatus':dealStatus,
                            'allocationStatus':allocationStatus,
                            'uid':this.sid,
                            'status':this.status,
                            'createDateSort':'desc',
                            'lastContactTimeSort':''
                        });
                        this.creaSort='desc';
                        this.lastSort='';
                    }
                }else if(obj.prop=="lastFollowTime"){
                    if(obj.order=="ascending"){
                        let customerName=this.searchForm.searchVal;//客户名称
                        console.log(this.searchForm.searchVal)

                        let type=this.searchForm.searchVal1;//客户类型
                        console.log(this.searchForm.searchVal1)

                        let source=this.searchForm.searchVal2;//客户来源
                        console.log(this.searchForm.searchVal2)

                        let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                        console.log(this.searchForm.searchVal3)

                        let allocationStatus=this.searchForm.searchVal4;//分配状态
                        console.log(this.searchForm.searchVal4)

                        let dealStatus=this.searchForm.searchVal5;//签约状态
                        console.log(this.searchForm.searchVal5);
                        console.log("负责人数据",this.showUserOnly);
                        this.showUserOnly.forEach((item)=>{
                                    this.sid=item.sid;
                                })
                        let pageNum=this.pageNum;
                        let pageCount=this.pageCount;

                        this.contomerData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerName':customerName,
                            'type':type,
                            'source':source,
                            'notfollowDay':notfollowDay,
                            'dealStatus':dealStatus,
                            'allocationStatus':allocationStatus,
                            'uid':this.sid,
                            'status':this.status,
                            'createDateSort':'',
                            'lastContactTimeSort':'asc'
                        });
                        this.creaSort='';
                        this.lastSort='asc';
                    }else if(obj.order=="descending"){
                        let customerName=this.searchForm.searchVal;//客户名称
                        console.log(this.searchForm.searchVal)

                        let type=this.searchForm.searchVal1;//客户类型
                        console.log(this.searchForm.searchVal1)

                        let source=this.searchForm.searchVal2;//客户来源
                        console.log(this.searchForm.searchVal2)

                        let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                        console.log(this.searchForm.searchVal3)

                        let allocationStatus=this.searchForm.searchVal4;//分配状态
                        console.log(this.searchForm.searchVal4)

                        let dealStatus=this.searchForm.searchVal5;//签约状态
                        console.log(this.searchForm.searchVal5);
                        console.log("负责人数据",this.showUserOnly);
                        this.showUserOnly.forEach((item)=>{
                                    this.sid=item.sid;
                                })
                        let pageNum=this.pageNum;
                        let pageCount=this.pageCount;

                        this.contomerData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerName':customerName,
                            'type':type,
                            'source':source,
                            'notfollowDay':notfollowDay,
                            'dealStatus':dealStatus,
                            'allocationStatus':allocationStatus,
                            'uid':this.sid,
                            'status':this.status,
                            'createDateSort':'',
                            'lastContactTimeSort':'desc'
                        });
                        this.creaSort='';
                        this.lastSort='desc';
                    }
                }else if(obj.prop==null){
                    let customerName=this.searchForm.searchVal;//客户名称
                        console.log(this.searchForm.searchVal)

                        let type=this.searchForm.searchVal1;//客户类型
                        console.log(this.searchForm.searchVal1)

                        let source=this.searchForm.searchVal2;//客户来源
                        console.log(this.searchForm.searchVal2)

                        let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                        console.log(this.searchForm.searchVal3)

                        let allocationStatus=this.searchForm.searchVal4;//分配状态
                        console.log(this.searchForm.searchVal4)

                        let dealStatus=this.searchForm.searchVal5;//签约状态
                        console.log(this.searchForm.searchVal5);
                        console.log("负责人数据",this.showUserOnly);
                        this.showUserOnly.forEach((item)=>{
                                    this.sid=item.sid;
                                })
                        let pageNum=this.pageNum;
                        let pageCount=this.pageCount;

                        this.contomerData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerName':customerName,
                            'type':type,
                            'source':source,
                            'notfollowDay':notfollowDay,
                            'dealStatus':dealStatus,
                            'allocationStatus':allocationStatus,
                            'uid':this.sid,
                            'status':this.status,
                            'createDateSort':'',
                            'lastContactTimeSort':''
                        });
                        this.creaSort='';
                        this.lastSort='';
                }
            },
            showRecordformDialogClo(){
                this.numStaData();
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
                this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                if(this.$route.query.pageNum !==undefined){
                    pageNum=this.$route.query.pageNum;
                }
                let pageCount=this.pageCount;
                if(this.$route.query.pageCount !==undefined){
                    pageCount=this.$route.query.pageCount;
                }

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status
                });
                this.recordformDialogVisible = false;
            },
            cli(obj1,obj2){
                console.log(obj1);
                console.log(obj2);
                this.tableData6CusId=obj1.customerId
                let customerId=obj1.customerId;
                this.$nextTick(function(){                    
                    $(".el-table__expand-icon").children().removeClass("el-icon-minus").addClass("el-icon-plus");
                    $(".el-table__expand-icon--expanded").children().removeClass("el-icon-plus").addClass("el-icon-minus");
                    $(".el-table__expand-icon--expanded").children().css("transform","rotate(-90deg)");
                    $(".el-table__expand-icon--expanded").children().css("-ms-transform","rotate(-90deg)");
                    $(".el-table__expand-icon--expanded").children().css("-moz-transform","rotate(-90deg)");
                    $(".el-table__expand-icon--expanded").children().css("-webkit-transform","rotate(-90deg)");
                    $(".el-table__expand-icon--expanded").children().css("-o-transform","rotate(-90deg)");
                })
                // console.log('classname',$(this).children().children().length);
                this.queryContactAllData({'customerId':customerId});
            },
            showRecordformDialog (customerId){
                this.modifyCustomerData(customerId,"followRecord"); 
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection=[];
                val.forEach((item)=>{
                    this.multipleSelection.push(item.customerId);
                })
                console.log('客户列表',this.multipleSelection);
                
            },
            handleImportUser(){
                this.importUserDialogVisible=true;
            },
            closeImportUserDialog(){
                this.importUserDialogVisible=false;

            let customerName=this.searchForm.searchVal;//客户名称
            console.log(this.searchForm.searchVal)

            let type=this.searchForm.searchVal1;//客户类型
            console.log(this.searchForm.searchVal1)

            let source=this.searchForm.searchVal2;//客户来源
            console.log(this.searchForm.searchVal2)

            let notfollowDay=this.searchForm.searchVal3;//几天未跟进
            console.log(this.searchForm.searchVal3)

            let allocationStatus=this.searchForm.searchVal4;//分配状态
            console.log(this.searchForm.searchVal4)

            let dealStatus=this.searchForm.searchVal5;//签约状态
            console.log(this.searchForm.searchVal5);
            console.log("负责人数据",this.showUserOnly);
            this.showUserOnly.forEach((item)=>{
                        this.sid=item.sid;
                    })
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;

            this.contomerData({
                'pageNum':pageNum,
                'pageCount':pageCount,
                'customerName':customerName,
                'type':type,
                'source':source,
                'notfollowDay':notfollowDay,
                'dealStatus':dealStatus,
                'allocationStatus':allocationStatus,
                'uid':this.sid,
                'status':this.status
            });

            },
            refreshTable(){
                // console.log("updatauserlist")
                // this.getOrgUserListData();
            },
            inputCli(){
                this.inputShow=!this.inputShow;
                if(this.inputShow){
                    this.openName="收起";                    
                }else{
                    this.openName="展开";

                    this.searchForm.searchVal2='';//客户来源
                    this.searchForm.searchVal3='';//几天未跟进
                    this.searchForm.searchVal4='';//分配状态
                    this.searchForm.searchVal5='';//签约状态
                    this.showUserOnly=[];
                    this.sid='';
                }
            },
            //列表数据
            async contomerData( {
                pageNum = '' ,
                pageCount = '' ,
                customerName = '' ,
                type='' ,
                source = '',
                status='',
                notfollowDay = '' ,
                dealStatus = '' ,
                allocationStatus='' ,
                uid = '',
                createDateSort='',
                lastContactTimeSort=''
             } = {} ){
                let res = await contomerList(
                    pageNum,
                    pageCount,
                    customerName,
                    type,
                    source,
                    status,
                    notfollowDay,
                    dealStatus,
                    allocationStatus,
                    uid,
                    createDateSort,
                    lastContactTimeSort
                    )
                console.log("res客户列表数据",res[0]);
                JZY.s.hideLoading();
                res[0].list.forEach((item)=>{
                    if(item.lastFollowTime==null){
                        item.lastFollowTime="--";
                    };
                    if(item.address==""){
                        item.address="--";
                    };
                    if(item.salesmanName==null){
                        item.salesmanName="--";
                    }
                })
                this.tableData5=res[0].list;
                this.tableData5.forEach((item)=>{
                    this.queryContactAll({'customerId':item.customerId});
                })
                this.pageCount=res[0].pageCount;
                console.log(this.pageCount);//每页几个pageCount
                this.pageNum=res[0].pageNum;
                console.log(this.pageNum);//第几页pageNum
                this.pageTotal=res[0].pageTotal;
                console.log(this.pageTotal);//总页数pageTotal
                this.dataTotal=res[0].total;
                console.log(this.dataTotal);//总个数total
            },

            async queryContactAll({customerId = ''} = {}){
                let res = await queryContactAll(customerId);
                console.log('数据数据数据',res[0]);
                this.tableData6=res[0];
                this.tableData5.forEach((item)=>{
                    if(item.customerId==customerId){
                        this.$set(item,'contactList',this.tableData6)
                        this.$set(item,'conListLength',this.tableData6.length)
                    }
                });
                $(".el-table__row ").children(".el-table__expand-column").children().children().children().removeClass("el-icon-arrow-right").addClass("el-icon-plus");
                console.log('数据数据数据',this.tableData5); 
            },
            //点击列表
            async queryContactAllData( {
                customerId = ''
             } = {} ){
                let res = await queryContactAll(
                    customerId
                    )
                console.log("联系人数据",res[0]);
                res[0].forEach((item)=>{
                    if(item.gendar=="0"){
                        item.gendar="男"
                    }else if(item.gendar=="1"){
                        item.gendar="女"
                    };

                    if(item.decisionRole=="0"){
                        item.decisionRole="普通员工";
                    }else if(item.decisionRole=="1"){
                        item.decisionRole="采购决策人";
                    }else if(item.decisionRole=="2"){
                        item.decisionRole="项目决策人";
                    }else if(item.decisionRole=="3"){
                        item.decisionRole="人事决策人";
                    };

                    if(item.gendar=="-1" || item.gendar==null){
                        item.gendar="--";
                    }

                    if(item.email=="" || item.email==null){
                        item.email="--";
                    }
                });
                this.tableData6=res[0];
                if(this.tableData6.length==0){
                    return false;
                }else{
                    this.tableData5.forEach((item)=>{
                        if(item.customerId==this.tableData6CusId){
                            this.$set(item,'contactList',this.tableData6)
                            this.$set(item,'conListLength',this.tableData6.length)
                        }
                    });
                }
                console.log(this.tableData5);
            },

            //作废
            async voidCustomerData(customerId){
                let res = await voidCustomer(customerId);
                console.info(res[0]);
                JZY.u.successMsg('操作成功')
                this.numStaData();
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                if(this.$route.query.pageNum !==undefined){
                    pageNum=this.$route.query.pageNum;
                }
                let pageCount=this.pageCount;
                if(this.$route.query.pageCount !==undefined){
                    pageCount=this.$route.query.pageCount;
                }

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status
                });
            },
            //状态数量
            async numStaData(){
                let res = await numSta();
                console.info(res[0]);
                this.customerClass=res[0];
            },
            async voidMethod(customerId){
                this.modifyCustomerData(customerId,"void"); 
            },
            // 修改初始化
             async modifyCustomerData(customerId,title){
                let res = await modifyCustomer(customerId).catch((e)=>{
                    if(e.status !==200){
                        this.numStaData();

                        let customerName=this.searchForm.searchVal;//客户名称
                        console.log(this.searchForm.searchVal)

                        let type=this.searchForm.searchVal1;//客户类型
                        console.log(this.searchForm.searchVal1)

                        let source=this.searchForm.searchVal2;//客户来源
                        console.log(this.searchForm.searchVal2)

                        let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                        console.log(this.searchForm.searchVal3)

                        let allocationStatus=this.searchForm.searchVal4;//分配状态
                        console.log(this.searchForm.searchVal4)

                        let dealStatus=this.searchForm.searchVal5;//签约状态
                        console.log(this.searchForm.searchVal5);
                        console.log("负责人数据",this.showUserOnly);
                        this.showUserOnly.forEach((item)=>{
                                    this.sid=item.sid;
                                })
                        let pageNum=this.pageNum;
                        if(this.$route.query.pageNum !==undefined){
                            pageNum=this.$route.query.pageNum;
                        }
                        let pageCount=this.pageCount;
                        if(this.$route.query.pageCount !==undefined){
                            pageCount=this.$route.query.pageCount;
                        }

                        this.contomerData({
                            'pageNum':pageNum,
                            'pageCount':pageCount,
                            'customerName':customerName,
                            'type':type,
                            'source':source,
                            'notfollowDay':notfollowDay,
                            'dealStatus':dealStatus,
                            'allocationStatus':allocationStatus,
                            'uid':this.sid,
                            'status':this.status
                        });
                    }   
                })
                console.info(res[0])
                if(title=="edit"){
                    this.customerDialogVisibleUpdate  = true;
                    this.editData=res[0];
                    console.log('客户修改初始化',this.editData);
                    this.$nextTick(function(){
                        this.$refs.reftest.test(this.editData)
                    })
                }else if(title=="jump"){
                    let routeData = this.$router.push({
                    path: '/crm/customer/details',
                    query:{
                        customerId:customerId
                        }
                    });
                }else if(title=="followRecord"){
                    this.recordformDialogVisible = !this.recordformDialogVisible;
                    this.$nextTick(function(){
                        this.$refs.recordformId.test(customerId)
                    })
                }else if(title=="void"){
                    this.$confirm('您确认作废?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.voidCustomerData(customerId);
                        }).catch(() => {
                            this.$message({
                            type: 'info',
                            message: '已取消'
                            }); 
                    });
                }
            },
            tab(index){
                this.$router.push({
                    path: '/crm/customer',
                })
                this.pageNum=1;
                this.pageCount=10;
                this.searchForm.searchVal='';//客户名称
                this.searchForm.searchVal1='';//客户类型
                this.searchForm.searchVal2='';//客户来源
                this.searchForm.searchVal3='';//几天未跟进
                this.searchForm.searchVal4='';//分配状态
                this.searchForm.searchVal5='';//签约状态
                this.showUserOnly=[];
                this.sid='';
                if(this.showIndex == index){
                    this.showIndex = -1;
                    this.status='';
                    let status=this.status;
                    console.log('点击状态',status);//点击状态

                    let customerName=this.searchForm.searchVal;//客户名称
                    console.log(this.searchForm.searchVal)

                    let type=this.searchForm.searchVal1;//客户类型
                    console.log(this.searchForm.searchVal1)

                    let source=this.searchForm.searchVal2;//客户来源
                    console.log(this.searchForm.searchVal2)

                    let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                    console.log(this.searchForm.searchVal3)

                    let allocationStatus=this.searchForm.searchVal4;//分配状态
                    console.log(this.searchForm.searchVal4)

                    let dealStatus=this.searchForm.searchVal5;//签约状态
                    console.log(this.searchForm.searchVal5);
                    console.log("负责人数据",this.showUserOnly);
                this.showUserOnly.forEach((item)=>{
                                this.sid=item.sid;
                            })
                    let pageNum=this.pageNum;
                    let pageCount=this.pageCount;
                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'status':status,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid
                });   
                }else{
                    this.$router.push({
                        path: '/crm/customer',
                    })
                    this.pageNum=1;
                    this.pageCount=10;
                    this.showIndex = index;

                    this.status=String(index);

                    let status=this.status;
                    console.log('点击状态',status);//点击状态

                    let customerName=this.searchForm.searchVal;//客户名称
                    console.log(this.searchForm.searchVal)

                    let type=this.searchForm.searchVal1;//客户类型
                    console.log(this.searchForm.searchVal1)

                    let source=this.searchForm.searchVal2;//客户来源
                    console.log(this.searchForm.searchVal2)

                    let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                    console.log(this.searchForm.searchVal3)

                    let allocationStatus=this.searchForm.searchVal4;//分配状态
                    console.log(this.searchForm.searchVal4)

                    let dealStatus=this.searchForm.searchVal5;//签约状态
                    console.log(this.searchForm.searchVal5);
                    console.log("负责人数据",this.showUserOnly);
                this.showUserOnly.forEach((item)=>{
                                this.sid=item.sid;
                            })
                    let pageNum=this.pageNum;
                    let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'status':status,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid
                });   
                }

            },
            showAssignDialog(){
                this.assignDialogVisible=true;
                this.$nextTick(function(){
                    console.log(this.$refs.refdest);
                    this.$refs.refdest.dest(this.multipleSelection)
                })
            },
            closeAssignDialog(){
                this.assignDialogVisible  = false;
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status
                });
            },
            showAssignDialogSingle(customerId,salesmanId,salesmanName){
                this.assignDialogVisibleSingle=true;
                this.$nextTick(function(){
                    this.$refs.refdestSingle.destSingle(customerId,salesmanId,salesmanName)
                })
            },
            closeAssignDialogSingle(){
                this.assignDialogVisibleSingle  = false;
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status
                });
            },
            showCustomerDialog(){
                this.customerDialogVisible  = true;
                
            },
            closeCustomerDialog(){
                this.customerDialogVisible  = false;
                this.numStaData();
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status
                });
            },
            showCustomerDialogUpdate(sid){
                this.modifyId=sid;
                this.modifyCustomerData(sid,"edit"); 
                console.log(this.modifyId);
            },
            closeCustomerDialogUpdate(){
                this.customerDialogVisibleUpdate  = false;
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status
                });
            },
            submitForm(formName) {
                console.log(this[formName])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log(this.$refs)
                // this.tagShow=false;
                this.selectedDataToTree={};
                this.showUserOnly=[];
                this.sid='';
                this.$refs[formName].resetFields();

            let customerName=this.searchForm.searchVal;//客户名称
            console.log(this.searchForm.searchVal)

            let type=this.searchForm.searchVal1;//客户类型
            console.log(this.searchForm.searchVal1)

            let source=this.searchForm.searchVal2;//客户来源
            console.log(this.searchForm.searchVal2)

            let notfollowDay=this.searchForm.searchVal3;//几天未跟进
            console.log(this.searchForm.searchVal3)

            let allocationStatus=this.searchForm.searchVal4;//分配状态
            console.log(this.searchForm.searchVal4)

            let dealStatus=this.searchForm.searchVal5;//签约状态
            console.log(this.searchForm.searchVal5);
            console.log("负责人数据",this.showUserOnly);
            this.showUserOnly.forEach((item)=>{
                        this.sid=item.sid;
                    })
            this.pageNum=1;
            this.$router.push({
                path: '/crm/customer',
                query:{pageNum:this.pageNum,pageCount:this.pageCount}
            });
            let pageNum=this.pageNum;
            let pageCount=this.pageCount;

            this.contomerData({
                'pageNum':pageNum,
                'pageCount':pageCount,
                'customerName':customerName,
                'type':type,
                'source':source,
                'notfollowDay':notfollowDay,
                'dealStatus':dealStatus,
                'allocationStatus':allocationStatus,
                'uid':this.sid,
                'status':this.status,
                'createDateSort':this.creaSort,
                'lastContactTimeSort':this.lastSort
            });
            },
            search (){
                // this.$refs[formName].validate((valid) => {
                    
                // });
                // console.log(this.$refs)
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                this.pageNum=1;
                this.$router.push({
                    path: '/crm/customer',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status,
                    'createDateSort':this.creaSort,
                    'lastContactTimeSort':this.lastSort
                });

                this.queryData={
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status
                }
                console.log('分配查询',this.queryData);
                // this.$refs.queryData.query(this.queryData)
                   
            },
            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            },
            filterTag(value, row) {
                return row.source === value;
            },

            customerJump(customerId){
                this.modifyCustomerData(customerId,'jump');
            },
                //后端排序
            sortTableList(obj){
                // console.info(obj.prop)
                if (obj.prop) {//排序规则非空
                    let orderProp = obj.prop.replace(/([A-Z])/g,"_$1").toLowerCase();//驼峰命名和下划线转换
                    let orderby = orderProp + ',' + (obj.order == 'ascending' ? 'asc':'desc')
                    this.$emit('sortTaskList',orderby)
                }
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                console.info(typeof val)
                this.pageCount = val;
                console.log(this.$router);
                this.$router.push({
                    path: '/crm/customer',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });

                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status,
                    'createDateSort':this.creaSort,
                    'lastContactTimeSort':this.lastSort
                });
            },
            //分页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                console.info(typeof val)
                this.pageNum = val;
                console.log(this.$router);
                this.$router.push({
                    path: '/crm/customer',
                    query:{pageNum:this.pageNum,pageCount:this.pageCount}
                });
                let customerName=this.searchForm.searchVal;//客户名称
                console.log(this.searchForm.searchVal)

                let type=this.searchForm.searchVal1;//客户类型
                console.log(this.searchForm.searchVal1)

                let source=this.searchForm.searchVal2;//客户来源
                console.log(this.searchForm.searchVal2)

                let notfollowDay=this.searchForm.searchVal3;//几天未跟进
                console.log(this.searchForm.searchVal3)

                let allocationStatus=this.searchForm.searchVal4;//分配状态
                console.log(this.searchForm.searchVal4)

                let dealStatus=this.searchForm.searchVal5;//签约状态
                console.log(this.searchForm.searchVal5);
                console.log("负责人数据",this.showUserOnly);
               this.showUserOnly.forEach((item)=>{
                            this.sid=item.sid;
                        })
                let pageNum=this.pageNum;
                let pageCount=this.pageCount;

                this.contomerData({
                    'pageNum':pageNum,
                    'pageCount':pageCount,
                    'customerName':customerName,
                    'type':type,
                    'source':source,
                    'notfollowDay':notfollowDay,
                    'dealStatus':dealStatus,
                    'allocationStatus':allocationStatus,
                    'uid':this.sid,
                    'status':this.status,
                    'createDateSort':this.creaSort,
                    'lastContactTimeSort':this.lastSort
                });
            },
            //接收用户树组件的返回值
            getUserTreeOnly:function(obj){
                this.showUserOnly = [...obj]
                console.log(obj);
                // this.tagShow=true;
            },
            //删除用户tag的事件
            deleteUserOnly(sid) {
                this.showUserOnly = this.showUserOnly.filter(function(item) {
                return item.sid != sid;
                });
                this.sid="";
                console.log(this.showUserOnly);
            },
        },
        data(){
            return {
                enableCheckedMultiple:false,//人员树是否可以多选
                filterDataUrl:{host:'',type:'',url:''},//过滤数据源，获取新data的接口。通过watch此对象实现的动态加载树
                tagButtons:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
                activeTab:'user',//初始化激活的tab标签
                workStatus:5,//人员状态，默认值是1，0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;7、在职、离职 （包含删除人员）
                readOnly:false,//只读模式，默认false是可编辑模式；true：不允许添加和删除人员
                resultDataListShow:true,//组合树返回已选数据项，是否展示，默认true展示
                selectedDataToTree:{},
                treeName:'',

                creaSort:'',
                lastSort:'',
                signName:'',//登录人
                conOpen:true,
                tagShow:true,
                funSet:false,
                recordformDialogVisible : false,
                sid:'',
                multipleSelection:[],
                queryData:{},
                depData:{
                   depName:"",
                   depId:""
                },
                importUserDialogVisible:false,
                openName:'展开',
                inputShow:false,
                uid:'',
                showIndex:-1,
                assignDialogVisible:false,
                assignDialogVisibleSingle:false,
                customerDialogVisible:false,
                customerDialogVisibleUpdate:false,

                status:'',

                dialogVisible:false,
                searchForm:{
                    searchVal:'',
                    searchVal1:'',
                    searchVal2:'',
                    searchVal3:'',
                    searchVal4:'',
                    searchVal5:'',
                    searchVal6:'',
                },

                currentPage4: 4,
                content:"",
                modifyId:'',
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal1: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal2: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal3: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                tableData5: [],
                tableData6: [],
                tableData6CusId:'',
                UEconfig:{
                    initialFrameWidth :800,//设置编辑器宽度
                    initialFrameHeight:250,//设置编辑器高度
                    // 设置不自动调整高度
                    scaleEnabled:false//不可以拉伸
                },

                customerClassification:{
                    value1:66,
                    value2:23,
                    value3:48,
                    value4:25,
                    value5:28
                },
                colorArr:[{ color:'#eed3d7'},{color:'#5fe9ee'},{color:'#62ee3b'},{color:'#ee3535'},{color:'#aaa'}],
                customerClass:[
                // {
                //     name:'未联系',
                //     value:66,
                //     width:0,
                //     color:'#eed3d7'
                // },{
                //     name:'未联系',
                //     value:23,
                //     width:0,
                //     color:'#5fe9ee'
                // },{
                //     name:'未联系',
                //     value:48,
                //     width:0,
                //     color:'#62ee3b'
                // },{
                //     name:'未联系',
                //     value:25,
                //     width:0,
                //     color:'#ee3535'
                // },{
                //     name:'未联系',
                //     value:28,
                //     width:0,
                //     color:'#aaa'
                // }
                ],
                pageNum:1,
                pageCount:10,
                dataTotal:0,
                pageTotal:1,
                list:[],
                //用户树-开始
                //单选还是多选设置
                enableCheckedMultipleUser:false,//false单选，true多选（默认是多选，此种模式可不传递此参数）
                showInsideOutsideTabs:true,//显示内、外部，false:只显示‘人员’，其他逻辑无差异
                // filterDataUrl:{
                //     host:'GLOBAL.SHANG_BIN',
                //     type:'post',
                //     url:'/journal/journal/selectCondition',
                //     data:{
                //         journalDate:'2018-04-16'
                //     }
                // },
                showUserTreeOnly:false,
                showUserOnly:[],
            }
        },
        computed:{
            // customerClassChange: function () {
            //     let customerNumber = 0;
            //     for (let key in this.customerClassification){
            //         customerNumber +=  Number(this.customerClassification[key]);
            //     }
            //     return this.customerClass.map(function (item) {
            //         item.width = item.value/customerNumber*100;
            //         return item;
            //     })
            // }
        }, 
        created (){
            console.log(this.$route.query);
            console.log('session信息',this.$store.state.session);
            console.log('session信息',this.$store.state.session.tenantInfo.roleMenus);
            let signName=this.$store.state.session.name;
            this.signName=signName;
            console.log('登录人',signName);

            let roleMenus=this.$store.state.session.tenantInfo.roleMenus;
            if(roleMenus.length !==0){
                roleMenus.forEach((item) => {
                    console.log(item.code);
                    if(item.code=="crm_manage"){
                         this.funSet=true;
                    }
                });
            }else if(roleMenus.length==0){
                this.funSet=true;
            }

            this.numStaData();

            let customerName=this.searchForm.searchVal;//客户名称
            console.log(this.searchForm.searchVal)

            let type=this.searchForm.searchVal1;//客户类型
            console.log(this.searchForm.searchVal1)

            let source=this.searchForm.searchVal2;//客户来源
            console.log(this.searchForm.searchVal2)

            let notfollowDay=this.searchForm.searchVal3;//几天未跟进
            console.log(this.searchForm.searchVal3)

            let allocationStatus=this.searchForm.searchVal4;//分配状态
            console.log(this.searchForm.searchVal4)

            let dealStatus=this.searchForm.searchVal5;//签约状态
            console.log(this.searchForm.searchVal5);
            console.log("负责人数据",this.showUserOnly);
            this.showUserOnly.forEach((item)=>{
                        this.sid=item.sid;
                    })
            let pageNum=this.pageNum;
            if(this.$route.query.pageNum !==undefined){
                pageNum=this.$route.query.pageNum;
            }
            let pageCount=this.pageCount;
            if(this.$route.query.pageCount !==undefined){
                pageCount=this.$route.query.pageCount;
            }

            this.contomerData({
                'pageNum':pageNum,
                'pageCount':pageCount,
                'customerName':customerName,
                'type':type,
                'source':source,
                'notfollowDay':notfollowDay,
                'dealStatus':dealStatus,
                'allocationStatus':allocationStatus,
                'uid':this.sid,
                'status':this.status
            });
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.customerSearch{
    .el-form-item .el-form-item__label{
            font-family: MicrosoftYaHei;
            font-size: 12px;
            color: #505050;
            letter-spacing: 0;
        }
    .el-input__inner{width: 200px; height: 32px; line-height: 32px; background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 3px; font-family: MicrosoftYaHei; font-size: 12px; color: #505050; letter-spacing: 0;}
}
.cusTable .row-expand-cover .el-table__expand-column .el-icon{
    visibility:hidden;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        overflow: hidden;
        height: 100%;
        overflow-y: auto;
        background: #ffffff;
        .content-title{
            position: relative;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #eeeeee;
             h3{
                padding-left: 24px;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #191919;
                margin-top:0px;
                margin-bottom:0px;
             }
            .operation{
                position: absolute;
                right: 24px;
                top:0px;
                li{
                    float: left;
                    margin-left: 20px;
                }
            }

        }
        .project-wrap{
            padding: 24px 40px 20px 46px;
            .demo-table-expand {
                font-size: 0;
            }
            .el-table__body .el-table__row a{cursor: pointer;}
            // .demo-table-expand label {
            //     width: 90px;
            //     color: #99a9bf;
            // }
            
            .demo-table-expand .el-form-item {
                margin-right:35px;
                margin-bottom: 0;
                width: auto;
            }
            .button{float: right}
            .spanDown{
                    width: 29px;
                    height: 20px;
                    background: inherit;
                    background-color: rgba(255, 255, 255, 0);
                    border: none;
                    border-radius: 0px;
                    -moz-box-shadow: none;
                    -webkit-box-shadow: none;
                    box-shadow: none;
                    font-family: 'PingFangSC-Regular', 'PingFang SC';
                    font-weight: 400;
                    font-style: normal;
                    font-size: 14px;
                    color: #46A7FF;
                    margin-left:10px;
            }
        }
        
        .el-pagination{
            float: right;
            margin: 20px 12px;
        }
    }
    .slide-modal{
        .operation{
            position: fixed;
            top: 70px;
            right:0px;
            width: 82.333%;
            height: 36px;
            background: rgba(255,255,255,0.3);
            z-index: 1001;
            ul{
                float: right;
                li{
                    float: left;
                    margin-right: 16px;
                    .el-button{
                        padding: 6px 18px;
                        border-radius: 0px;
                        margin-top: 4px;
                        font-weight: normal;
                        color: #82848a;
                    }
                }
            }
        }
        .dia-content{
            margin-top: 60px;
            .information{
                position: relative;
                .add{
                    position: absolute;
                    right: 24px;
                    top:10px;
                    color: #409EFF;
                    font-size: 30px;
                    z-index: 5;
                    cursor: pointer;
                }
            }

        }
    }
    /*项目进度滑块位置调整*/
    .el-slider .el-slider__button-wrapper{
        top:-18px;
    }
    .color-panle{
        width: 100%;
        height: 48px;
        li:first-child{
            opacity: 0.8;
            background: #F8B850;
            border-radius: 36px 0px 0px 36px;
        }
        li:nth-child(2){
            opacity: 0.8;
            background: #6CB9FF;
        }
        li:nth-child(3){
            opacity: 0.8;
            background: #F99595;
        }
        li:nth-child(4){
            opacity: 0.8;
            background: #61D6B7;
        }
        li:last-child{
            opacity: 0.8;
            background: #D5B8FF;
            border-radius: 0px 36px 36px 0px;
        }
        li{
            float: left;
            height: 20px;
            line-height: 20px;
            vertical-align: middle;
            text-align: center;
            cursor: pointer;
        }
        li.cur{
            height: 24px;
            line-height: 24px;
            margin-top: -2px;
            margin-bottom: -2px;
        }
        li.cur:first-child{
            border-radius: 36px 0px 0px 36px;
        }
        li.cur:last-child{
            border-radius: 0px 36px 36px 0px;
        }
    }
</style>
