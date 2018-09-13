<template>
  <div>
    <el-button @click="xxxTree">动态切换输入条件1</el-button>


    <el-button @click="sharedTree">动态切换输入条件2</el-button>

    <!--混合树-->
    <!--

    一、入参说明如下：
    1、ref：Strng类型，组件的引用名称，必填且不重复；
    2、enable-checked-multiple：Boolean类型，开启多选模式，默认true，即可以多选
    3、filterDataUrl：Object类型，选人接口的切换，此对象三个属性都为空或者不添加此对象，默认调用后端固定人员接口；
    4、tagButtons：Array类型，['user','dept','role','userOutside']，可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）；
    5、activeTab：String类型，组件初始化进入的tab标签，默认进入user页面；
    6、workStatus：Number类型，查询人员范围，默认1，即只查在职人员。0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;
    7、selectedDataToTree：Object类型，已选数据对象，其属性包括“userList、deptList、roleList、userOutsideList”四项，每个数组中的对象，必须包含两个属性，sid和name传入，如下所示：
        selectedDataToTree = {//已选树节点
          userList:[{
            sid:'100207',
            name:'许国平'
          },{
            sid: '100676',
            name: '杜百兴'
          }],
          deptList:[{
            sid: '1004',
            name: '人事部'
          }],
          roleList:[{//建议角色入参统一为sid和name，但是也兼容之前的入参方式roleId、roleName。
            sid: '1001',
            name: '系统管理员'
          }],
          // roleList:[{//此方式也兼容
          //   roleId: '1001',
          //   roleName: '系统管理员'
          // }],
          userOutsideList:[]
        },

    二、插槽说明：
    1、目前唯一的插槽“add_button”是点击的图标，其中click方法是打开组件弹出窗的事件，写法固定（替换组件的引用名称即可）

    三、输出说明：
    1、getDataFromTree：该方法接收组件的返回值；方法的参数是Object类型，其属性包括“userList、deptList、roleList、userOutsideList”四项，每项是一个对象数组，必返回，可为空；如下所示：
        // obj样例数据如下：
            obj = {
                "userList":[
                    {
                        "nodeId":"100208",
                        "name":"对面的",
                        "realName":"对面的",
                        "email":"",
                        "sex":"男",
                        "workStatus":"job",
                        "organizationName":"pc牛逼团队",
                        "position":null,
                        "mobile":"17610178770",
                        "organizationId":"1001",
                        "imUserId":"3cc30cf2a2a143ae84bac17167c3174a",
                        "isLeader":null,
                        "isDefault":null,
                        "resourceImgUrl":null,
                        "pinyinFirst":"dmd",
                        "pinyinFull":"duimiande",
                        "sid":"100208",
                        "type":"user",
                        "state":true
                    },
                    {
                        "nodeId":"100345",
                        "name":"刘根斌",
                        "realName":"刘根斌",
                        "email":"",
                        "sex":"男",
                        "workStatus":"job",
                        "organizationName":"pc牛逼团队",
                        "position":null,
                        "mobile":"18610798015",
                        "organizationId":"1001",
                        "imUserId":"aaf7846718a04f5096b117b6f27eaa19",
                        "isLeader":null,
                        "isDefault":null,
                        "resourceImgUrl":null,
                        "pinyinFirst":"lgb",
                        "pinyinFull":"liugenbin",
                        "sid":"100345",
                        "type":"user",
                        "state":true
                    }
                ],
                "deptList":[
                    {
                        "parentId":"1001",
                        "nodeId":"9",
                        "children":[

                        ],
                        "name":"销售部",
                        "sort":1,
                        "code":"001001",
                        "prefixSort":"A00001-B00001",
                        "prefixId":"1001/1002",
                        "status":"1",
                        "prefixName":"pc牛逼团队/销售部",
                        "type":"dept",
                        "imUserId":null,
                        "sex":null,
                        "email":null,
                        "mobile":null,
                        "pinyinFirst":null,
                        "pinyinFull":"xiaoshoubu",
                        "userCount":"0",
                        "canSelected":false,
                        "default":false,
                        "sid":"1002",
                        "state":true
                    },
                    {
                        "parentId":"1001",
                        "nodeId":"11",
                        "children":[

                        ],
                        "name":"人事部",
                        "sort":3,
                        "code":"001003",
                        "prefixSort":"A00001-B00003",
                        "prefixId":"1001/1004",
                        "status":"1",
                        "prefixName":"pc牛逼团队/人事部",
                        "type":"dept",
                        "imUserId":null,
                        "sex":null,
                        "email":null,
                        "mobile":null,
                        "pinyinFirst":null,
                        "pinyinFull":"renshibu",
                        "userCount":"2",
                        "canSelected":false,
                        "default":false,
                        "sid":"1004",
                        "state":true
                    }
                ],
                "roleList":[
                    {
                        "roleId":"1002",
                        "roleName":"销售员",
                        "roleUserCount":"0",
                        "createTime":"2018-05-14 18:16:00",
                        "roleRemark":"销售员",
                        "sid":"1002",
                        "name":"销售员",
                        "type":"role",
                        "state":true
                    },
                    {
                        "roleId":"1001",
                        "roleName":"系统管理员",
                        "roleUserCount":"7",
                        "createTime":"2018-05-14 18:16:00",
                        "roleRemark":"超级管理员",
                        "sid":"1001",
                        "name":"系统管理员",
                        "type":"role",
                        "state":true
                    }
                ],
                "userOutsideList":[
                    {
                        "nodeId":"100107",
                        "name":"外部联系人",
                        "realName":"外部联系人",
                        "email":"",
                        "sex":"男",
                        "workStatus":"job",
                        "organizationName":"外部联系人",
                        "position":"哈哈哈",
                        "mobile":"18514476718",
                        "organizationId":"-1",
                        "imUserId":"b59cc32247b04102a59b68dd99868d82",
                        "isLeader":null,
                        "isDefault":null,
                        "resourceImgUrl":null,
                        "pinyinFirst":"wblxr",
                        "pinyinFull":"waibulianxiren",
                        "externalLabel":"",
                        "externalCompany":"外部公司哈哈哈哈",
                        "sid":"100107",
                        "type":"userOutside",
                        "state":true
                    }
                ]
            }
    -->

    <!--全局组件调用方式-->
    <blend-tree
        ref= "xxxTree"
        :enable-checked-multiple = "enableCheckedMultiple"
        :filterDataUrl = "filterDataUrl"
        :tagButtons="tagButtons"
        :activeTab = "activeTab"
        :workStatus = "workStatus"
        :selectedDataToTree = "selectedDataToTree"
        @getDataFromTree = "getDataFromTree">
        <!--添加按钮图标的插槽-->
        <div slot="add_button">
          <i class="el-icon-circle-plus" @click.stop = "$refs.xxxTree.blendTreeDialogShow()"></i>
        </div>
    </blend-tree>

    



    <el-button @click="$refs.concernTree2.blendTreeDialogShow()">混合树2</el-button>
    <!--混合树2-->
    <blend-tree
        ref= "concernTree2"
        :selectedDataToTree = "selectedDataToTree2"
        :enable-checked-multiple = "enableCheckedMultiple2"
        :tagButtons="tagButtons2"
        :activeTab = "activeTab2"
        @getDataFromTree = "getDataFromTree2">
    </blend-tree>

    <!-- <div class="smart_comment">
      <smart-comment 
      :businessId="businessId"
      :business_type="business_type">
      </smart-comment>
    </div> -->
    <!--加载更多demo-->
<my-scroll
    ref="myScroll"
    :noData='hasMoreData'
    @reflashData="reflashData">
    <div slot="contentScroll" class="my_scroll">
        <!--滚动内容区域 start-->
        <ul>
          <li v-for="(item,index) in dataList" :key="index">
            {{item.name}}
          </li>
        </ul>
        <!--滚动内容区域 end-->
    </div>
</my-scroll>


  </div>
</template>

<script>


    // import blendTree from '@/components/blendTree/blendTree'


    import myScroll from '@/components/infinite-scroll/scroll'
    export default{
        components: {
            // blendTree,
            myScroll,
        },
        data(){
            return {
              selectedDataToTree:{//已选树节点
                userList:[{
                  sid: '100676',
                  name: '杜百兴'
                }],
                deptList:[{
                  sid: '1004',
                  name: '人事部'
                }],
                roleList:[{//建议角色入参统一为sid和name，但是也兼容之前的入参方式roleId、roleName。
                  sid: '1001',
                  name: '系统管理员'
                }],
                // roleList:[{//此方式也兼容
                //   roleId: '1001',
                //   roleName: '系统管理员'
                // }],
                userOutsideList:[]
              },
              workStatus:1,//人员状态，默认值是1，0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;
              enableCheckedMultiple:true,//人员树是否可以多选
              tagButtons:['user','dept','role','userOutside'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
              activeTab:'userOutside',//初始化激活的tab标签


              filterDataUrl:{
                host:'',
                type:'',
                url:''
              },//过滤数据源，获取新data的接口。通过watch此对象实现的动态加载树


              selectedDataToTree2:{//已选树节点
                userList:[{
                  sid: '1001',
                  name: '裴银辉'
                }],
              },
              enableCheckedMultiple2:true,//人员树是否可以多选
              tagButtons2:['user'],//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）
              activeTab2:'user',//初始化激活的tab标签





              businessId:'ae2a8499cf26428aa8d7f5b1f4b719dd',//业务模块中的详情页id，即文章id
              business_type:'0',//业务类型 0：任务 1：新闻 2：计划 3：日志



              dataList:[],
              number:0,
              hasMoreData:false,//没有更多数据可加载的开关
            }
        },
        methods:{

          //接收混合树组件的返回值
          getDataFromTree( obj = {} ){
            console.info(JSON.stringify(obj))

            



            debugger



          },


          //接收混合树组件的返回值
          getDataFromTree2( obj = {} ){
            console.info(obj)
            debugger
          },

          //参与人
          xxxTree(){


            // this.selectedDataToTree = {//已选树节点
            //   userList:[{
            //       sid: '1001',
            //       name: '裴银辉'
            //     }],
            //   deptList:[],
            //   roleList:[],
            //   userOutsideList:[]
            // }
            this.enableCheckedMultiple = false//人员树不可以多选
            this.activeTab = 'user'//初始化激活的tab标签
            this.tagButtons = ['user','userOutside']//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人

            // this.filterDataUrl.url = '/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/2654406'
            this.filterDataUrl = {
                host:'GLOBAL.YANG_NING',
                type:'get',
                 url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectIdBak20180628/2654406'
                // url:'/project/projectTeamPerson/queryProjectTeamPersonByProjectId/2654406'
            },

            this.$refs.xxxTree.blendTreeDialogShow()
          },
          //共享人
          sharedTree(){
            this.selectedDataToTree = {//已选树节点
              userList:[{
                  sid: '100676',
                  name: '杜百兴'
                }],
              deptList:[{
                sid: 10,
                name: '三级 1-1-2 部门'
              }],
              roleList:[],
              userOutsideList:[]
            }
            this.enableCheckedMultiple = true//人员树是否可以多选
            this.activeTab = 'user'//初始化激活的tab标签
            this.tagButtons = ['user','userOutside']//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人


            this.filterDataUrl = {
              host:'',
              type:'',
              url:''
            }

            this.$refs.xxxTree.blendTreeDialogShow()
          },

          //加载更多数据
          reflashData(){
              
              if ( this.number > 50) {//没有更多数据可加载
                this.hasMoreData = true
              }else{//加载更多
                for (var i = 20; i > 0; i--) {
                  this.number ++
                  this.dataList.push({name:'测试数据??'+this.number})

                }
                this.$refs.myScroll.changeDom()//设置滚动加载的dom高
              }
              

          },
          
        },
        mounted(){

          for (var i = 10; i >= 0; i--) {
            this.dataList.push({name:'测试数据'+this.number})
            this.number++
          }

        },
    }
</script>
<style scoped lang="scss">
</style>