<template>
    <div>



        <test-demo :list="zhiyuanData"></test-demo>

        <!--<vm-data-viewer :keys="'testData1'.split(' ')" :vm="_self">-->

        <!--</vm-data-viewer>-->
        <el-tabs v-model="tabWrapperModel" type="border-card">

            <el-tab-pane name="非业务组件" label="非业务组件">

                <el-tabs v-model="activeDemo" type="border-card">
                    <el-tab-pane name="jsganttt" label="jsganttt">

                        <js-gantt></js-gantt>


                    </el-tab-pane>
                    <el-tab-pane name="ganttt" label="ganttt">

                        <div id="gantt-1">

                        </div>

                    </el-tab-pane>


                    <el-tab-pane name="tree grid" label="tree grid">
                        <tree-grid-demo></tree-grid-demo>
                    </el-tab-pane>

                    <el-tab-pane name="smarter tree" label="smarter tree">

                        <smarter-tree-demo></smarter-tree-demo>
                    </el-tab-pane>
                    <el-tab-pane name="transfer tree" label="transfer tree">
                        <transfer-tree-demo></transfer-tree-demo>
                    </el-tab-pane>

                    <el-tab-pane name="评论组件" label="评论组件">
                        <!--评论组件-->
                        <h1 style="color:red">1、暂时有1条默认数据，测试用的，可以忽略</h1>
                        <h1 style="color:red">
                            2、入参两个：
                            <ol>
                                <li>business_type：业务类型，0：任务 1：新闻 2：计划 3：日志</li>
                                <li>businessId：业务id，即文章id，任务id，审批id等等</li>
                                <li>startComment：是否开启评论及其回复的功能，默认是true开启的，false是关闭评论</li>
                            </ol>
                        </h1>
                        <h1 style="color:red">3、任务的评论demo，见http://localhost:8084/#/smartComment</h1>
                        <smart-comment 
                        :businessId="businessId"
                        :startComment = "true"
                        :business_type="business_type">
                        </smart-comment>
                    </el-tab-pane>
                    <!--<el-tab-pane name="upload" label="upload">-->
                        <!--<pl-upload></pl-upload>-->
                    <!--</el-tab-pane>-->


                    <el-tab-pane name="多语言" label="多语言">
                        <!--定界符为{},调用l方法并只需要传递一个string型参数-->
                        {{l('{demoLocale.foo}和{demoLocale.test}至少选择一项')}}--------
                        <el-button @click="JZY.locale.switchLanguage('en')">switch to english</el-button>
                        <el-button @click="JZY.locale.switchLanguage('zh-CN')">switch to chinese</el-button>
                    </el-tab-pane>
                    <!--<el-tab-pane name="多彩日历" label="多彩日历">-->
                        <!--<div class="block">-->
                            <!--&lt;!&ndash;<span class="demonstration">默认</span>&ndash;&gt;-->
                            <!--<el-button @click="updateHighlightDays()">测试高亮日期更新</el-button>-->
                            <!--<colorful-date-picker-->
                                    <!--@pick="handlePickChange"-->
                                    <!--:highlight-days="highlightDays"-->
                                    <!--v-model="value1"-->
                                    <!--type="date"-->
                                    <!--placeholder="选择日期">-->

                            <!--</colorful-date-picker>-->
                        <!--</div>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane name="tree picker" label="tree picker">-->
                        <!--<el-button @click="$refs.treePicker.showDialog()">点击打开tree picker</el-button>-->
                        <!--<tree-picker-->
                                <!--title="复制到"-->
                                <!--checked-key="selected"-->
                                <!--:enableCheckedMultiple="false"-->
                                <!--:treeData="treeData"-->
                                <!--ref="treePicker"-->
                                <!--:expand-all="true"-->
                                <!--:enable-check="enableCheck"-->
                                <!--:enableCheckedFolder="enableCheckedFolder"-->
                                <!--tree-key="permissionId"-->
                                <!--@submit="handleDirChooseSubmit"-->
                                <!--prop="orgName" label="选择网点"-->
                        <!--&gt;-->
                            <!--&lt;!&ndash;<span slot="footer-left">&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button type="primary" @click="dialogVisible = false">新建文件夹</el-button>&ndash;&gt;-->
                            <!--&lt;!&ndash;</span>&ndash;&gt;-->

                        <!--</tree-picker>-->
                    <!--</el-tab-pane>-->
                    <el-tab-pane name="右滑modal" label="右滑modal">

                        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
                        <right-slide-modal

                                title="提示"
                                :visible.sync="dialogVisible1">
                            <div slot="operateButtons" class="operate_buttons">
                                <ul>

                                    <li>
                                        <el-button @click="dialogVisible1=false" size="mini">{{l('{g.buttons.cancel}')}}</el-button>
                                    </li>
                                </ul>


                                <!--<div style="display:inline-block;float:right;">-->
                                <!--<el-button v-if="'DETAIL'!=scheduleDialogMode" @click="submitNewScheduleDialog()" size="small">{{l('{global.save}')}}</el-button>-->

                            </div>

                            dialog1
                            asdfsfsdf
                        </right-slide-modal>

                        <right-slide-modal
                                title="提示"
                                @save="handleDialogSave()"
                                :visible.sync="dialogVisible">


                            <div slot="operateButtons" class="operate_buttons">
                                <ul>
                                    <li>
                                        <el-button size="mini" type="primary">{{l('{g.buttons.confirm}')}}</el-button>
                                    </li>
                                    <li>
                                        <el-button @click="dialogVisible=false" size="mini">{{l('{g.buttons.cancel}')}}</el-button>
                                    </li>
                                </ul>


                                <!--<div style="display:inline-block;float:right;">-->
                                <!--<el-button v-if="'DETAIL'!=scheduleDialogMode" @click="submitNewScheduleDialog()" size="small">{{l('{global.save}')}}</el-button>-->

                            </div>



                            <el-button type="text" @click="dialogVisible1 = true">点击打开 Dialog1</el-button>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <span>这是一段信息</span><br>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                            </div>

                        </right-slide-modal>
                    </el-tab-pane>



                    <el-tab-pane name="textarea limter" label="textarea limter">


                        <el-input v-model="textareaModel" v-textarea-limiter type="textarea" :maxlength="100"></el-input>







                    </el-tab-pane>
                    <el-tab-pane name="svg" label="系统全局svg图标">

                        <h1 style="color:red">务必将svg文件放到"/src/svg/"目录中，文件的名称（如home_user.svg）就是调用此icon的名称</h1>
                        <h1 style="color:red">不能在svg目录中建子文件夹，所有svg图标文件必须放在此svg根目录中，文件名起名规则，加模块名称，如approve_user，task_user</h1>
                        <h3>可在icon标签内的style中添加css样式（font-size不生效，scale可控制icon的大小）</h3>
                        <h3>调用方式<span v-text='`<icon name="home_user" scale="2" style="color:blue"></icon>`'></span></h3>


                        <!--icon图标的demo，可以类似写css样式-->
                        <icon name="home_user" scale="2" style="color:blue"></icon>

                        <icon name="approve_user" scale="3.4" style="border:1px solid #000;margin-bottom:20px;"></icon>

                        <icon name="task_user" scale="4.8" spin></icon>

                        <icon name="0001" scale="5" style="color:red"></icon>
                        <icon name="0002" scale="5" style="color:red"></icon>
                    </el-tab-pane>


                    <!--<el-tab-pane name="ueditor" label="ueditor">-->


                        <!--<UEditor id="editor" defaultMsg="请输入内容" :config="UEconfig" ref="UEditor" style="line-height: 24px"></UEditor>-->







                    <!--</el-tab-pane>-->


                </el-tabs>
            </el-tab-pane>
            <el-tab-pane name="业务组件" label="业务组件">

                <el-tabs type="border-card">
                    <el-tab-pane name="富文本" label="富文本">
                        <el-alert title="1" description="实例化时候设置设置id categoryId businessId appId四个字段，
                            其中id表示组件前端用的id，后三个通附件上传逻辑中的id一样。config根据个人需要设定，和官网示例的UEConfig一致"></el-alert>
                        <el-alert title="2" description="请给标签设置ref属性，例如叫myeditor，编辑器所在表单提交按钮点击时请首先执行await refs.myeditor.saveFiles（按照后端附件架构设计，
                            所有的附件有关东西都得改成这样，只不过附件那个vue文件里暂时没有这个方法，以后大家都有时间了再改）">

                        </el-alert>
                    </el-tab-pane>
                    <el-tab-pane name="xhr" label="xhr">
                        <el-tabs>

                            <el-tab-pane name="普通的请求手段" label="普通的请求手段">
                                <el-button @click="JZY.xhr.request('/test')">单独url字符串</el-button>

                                <el-button @click="JZY.xhr.request({type:'post',url:'/test_post'})">对象格式的请求(写法1)</el-button>
                                <el-button @click="JZY.xhr.post('/test_post',{foo:'bar'})">对象格式的请求(写法2)(.post方法只适用于单个请求)</el-button>

                                <el-button @click="
                                            JZY.xhr.request(['/test',{type:'post',url:'/test_post'}])
                                    ">数组格式的请求，字符串对象混用</el-button>

                                <el-button @click="
                                     JZY.xhr.request('/test_fail')
                                ">xhr.request一个失败的请求</el-button>

                                <el-button @click="request404()">404的请求</el-button>
                                <el-button @click="JZY.xhr.request(['/test_fail_get',{type:'post',url:'/test_fail_post'}])">并发请求超过2个请求，全部失败的默认情况</el-button>
                                <el-button @click="
                                JZY.xhr.requestPromises([JZY.xhr.request(['/test_fail_get']),
                                JZY.xhr.request([{type:'post',url:'/test_fail_post'}])])">
                                    并发请求超过2个请求（promise arr），全部失败的默认情况</el-button>
                                <el-button @click="custormRequestArrError()">模拟一批失败的请求，不让它报错，自己定义错误(2中写法)</el-button>




                            </el-tab-pane>
                            <el-tab-pane name="使用绝对路径url" label="使用绝对路径url">


                                <el-button @click="JZY.xhr.request('404')">url不加/直接请求本host（反模式，项目中请不要这样）</el-button>
                                <el-button @click="request404()">使用http://开头即视为绝对路径（反模式，项目中请不要这样）</el-button>
                            </el-tab-pane>

                            <el-tab-pane name="请求和赋值一体" label="请求和赋值一体">
                                <el-button @click="testCallInterFaceAndSetData()">请求一批数据，并设定数据到vm上某个属性</el-button>
                                <el-button @click="testCallInterFaceAndSetDataWithCache()">请求一批数据，并设定数据到vm上某个属性（带缓存）</el-button>
                            </el-tab-pane>
                            <el-tab-pane name="缓存和节流" label="缓存和节流">
                                <el-button @click="JZY.xhr.request('/test',true)">带缓存的请求(内存缓存)</el-button>
                                <el-button @click="JZY.xhr.request('/test',true);JZY.xhr.request('/test',true)">同一个需要缓存的接口请求两次，network只显示一个（节流）</el-button>
                            </el-tab-pane>
                            <el-tab-pane name="url转换过程的理解之自定义host" label="url转换过程的理解之自定义host">
                                <el-button @click="request404()">默认host</el-button>
                                <el-button @click="JZY.xhr.hostRequest('/test','GLOBAL_TEST')">自定义host(推荐写法，也可通过调用request方法；此方法也支持缓存和错误控制)</el-button>
                            </el-tab-pane>
                            <!--<el-tab-pane name="自定义请求接口host" label="自定义请求接口host">-->
                                <!--<el-button @click="test()">自定义一个get请求(推荐写法)</el-button>-->
                            <!--</el-tab-pane>-->
                            <el-tab-pane name="向数据库post数据" label="向数据库post或者put数据">
                                <el-button @click="JZY.xhr.post('/test_post',{foo:'bar'})">发起一个成功请求默认情况</el-button>

                                <el-button @click="JZY.xhr.post('/test_fail',{foo:'bar'})">发起一个失败请求默认情况</el-button>
                                <el-button @click="testFailPost()">发起一个失败请求，并不让它报错，自己定义错误警告</el-button>
                            </el-tab-pane>
                            <el-tab-pane name="put和delete请求" label="put和delete请求">

                                <el-button @click="JZY.xhr.put('/test_put')">put请求</el-button>
                                <el-button @click="JZY.xhr.drop('/test_delete')">delete请求</el-button>
                            </el-tab-pane>

                        </el-tabs>

                    </el-tab-pane>
                    <el-tab-pane name="混合树组件2.0" label="混合树组件2.0">

<div style="width:80%;margin:30px auto;border:1px solid #ccc;padding:30px;">
    <!--混合树组件-->
    <!--

    一、入参说明如下：
    1、ref：Strng类型，组件的引用名称，必填且不重复；
    2、enable-checked-multiple：Boolean类型，开启多选模式，默认true，即可以多选
    3、filterDataUrl：Object类型，选人接口的切换，此对象三个属性都为空或者不添加此对象，默认调用后端固定人员接口；
    4、tagButtons：Array类型，['user','dept','role','userOutside']，可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人）；
    5、activeTab：String类型，组件初始化进入的tab标签，默认进入user页面；
    6、workStatus：Number类型，查询人员范围，默认1，即只查在职人员。0-查询未确认人员；1-只查在职人员；2-查询离职人员；3-查询未邀请人员；4-包含未确认和在职人员；5-包含离职和在职人员;6-包含未确认、在职、离职;7、在职、离职 （包含删除人员）
    7、readOnly:Boolean类型，只读模式，默认false是可编辑模式；true：不允许添加和删除人员；
    8、resultDataListShow: Boolean类型，结果列表是否显示，默认true展示，组合树返回已选数据项，是否展示；
    9、fromMoudle：String类型，默认为空''，如果是日程的共享人选择，此参数为'schedule'即可，其他人无视此属性；
    10、selectedDataToTree：Object类型，已选数据对象，其属性包括“userList、deptList、roleList、userOutsideList”四项，每个数组中的对象，必须包含两个属性，sid和name传入，如下所示：
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
    四、注意事项：
    1、同一页面同时使用两棵以上的混合树组件，建议独立多次引入此组件，不掺和的原则；
    2、入参selectedDataToTree：千万不要在组件树输出的方法中动态修改此入参，正确用法是在mounted中copy一个此入参，在输出方法中将组件的返回值深拷贝给copy变量，在表单提交的时候，用copy变量即可；
    3、其他待续。。。

    -->

    <!--全局组件的使用-->
    <blend-tree
        ref= "xxxTree"
        :enable-checked-multiple = "enableCheckedMultiple"
        :filterDataUrl = "filterDataUrl"
        :tagButtons="tagButtons"
        :activeTab = "activeTab"
        :workStatus = "workStatus"
        :readOnly = "readOnly"
        :resultDataListShow = "resultDataListShow"
        :fromMoudle="fromMoudle"
        :selectedDataToTree = "selectedDataToTree"
        @getDataFromTree = "getDataFromTree">
        <!--添加按钮图标的插槽-->
        <div slot="add_button">
          <i class="el-icon-circle-plus" @click.stop = "$refs.xxxTree.blendTreeDialogShow()"></i>
        </div>
        <!--日程共享人专用-->
        <template slot-scope="user">
            <span class="tmpl">
              <el-checkbox v-if="user.data.hasOwnProperty('scheduleTitleShow')" v-model="user.data.scheduleTitleShow"></el-checkbox>
            </span>
        </template>
    </blend-tree>

    <!--不用插槽的情况下，触发组件的方式-->
    <el-button @click="$refs.xxxTree.blendTreeDialogShow()">open混合树(触发方式2)</el-button>

<p>--------------------------------------------------------我是分界线，参数说明见页面注释----------------------------------------------------------</p>
    <!--同一页面同时使用第二棵混合树组件-->
    <!--混合树2-->
    <blend-tree
        ref= "xxxTree2"
        :selectedDataToTree = "selectedDataToTree2"
        :enable-checked-multiple = "enableCheckedMultiple2"
        :tagButtons="tagButtons2"
        :activeTab = "activeTab2"
        @getDataFromTree = "getDataFromTree2">
    </blend-tree>
    <el-button @click="$refs.xxxTree2.blendTreeDialogShow()">open混合树2(点击打开)</el-button>

<p>--------------------------------------------------------我是分界线，参数说明见页面注释----------------------------------------------------------</p>

    <h1>以下为高级用法，前期可不用或少用，有坑</h1>

    <!-- 以下为高级用法，前期可不用或少用，有坑 -->
    <el-button @click="xxxTreeChange">动态切换xxxTree的入参</el-button>
    <el-button @click="xxxTreeChange2">动态切换xxxTree的入参2</el-button>


</div>

                    </el-tab-pane>
                    <el-tab-pane name="userTree" label="userTree(有外部人员)--作废1.0">
                        <el-tabs>
                            <el-tab-pane name="oneTree" label="oneTree">
<!--用户树demo 同一组件页面只调用1棵用户树-->
<h1 style="color:red">用户树demo 同一组件页面只调用1棵用户树</h1>
<h3>如果选择用户，是radio，非多选，只需要设置:enable-checked-multiple = "false" 即可</h3>
<h3>如果选择用户，不区分内、外部来源（此时都是内部人员），只需要设置:show-inside-outside-tabs = "false" 即可；默认值是true，即区分内外部，可不设置</h3>
<h3>需要过滤数据源的时候，变化如下三个字段中的任何一个，都会触发请求后端接口<b style='color:red'>（详见-任务task的创建任务模块，选择项目对负责人可选范围的过滤）</b>注：如果不需要切换数据源，不要给user-tree组件配置filterDataUrl参数</h3>
<el-input v-model = "filterDataUrl.host">过滤数据源的host</el-input>
<el-input v-model = "filterDataUrl.type">过滤数据源的type</el-input>
<el-input v-model = "filterDataUrl.url">过滤数据源的url</el-input>
<el-input v-for="(item,index) in filterDataUrl.data" :key="index" v-model = "filterDataUrl.data[index]">psot的data{{item}}</el-input>
<br />


<el-button type="success" @click="enableCheckedMultipleUser = !enableCheckedMultipleUser">设置选择模式，单选or多选</el-button>
<br />
<el-button type="primary" @click="showInsideOutsideTabs = !showInsideOutsideTabs">设置是否显示内、外部</el-button>
<br />
<el-button @click="showUserTreeOnly = !showUserTreeOnly">显示唯一的用户树</el-button>
<el-tag
v-for="(item,index) in showUserOnly"
:key="index"
closable
:disable-transitions="false"
@close="deleteUserOnly(item.sid)">
{{item.name}}
</el-tag>

<user-tree
    :selectUserDialogVisible="showUserTreeOnly"
    :enable-checked-multiple="enableCheckedMultipleUser"
    :show-inside-outside-tabs="showInsideOutsideTabs"
    :selectedUsers = "showUserOnly"
    :filterDataUrl = "filterDataUrl"
    @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
    @getUserTree = "getUserTreeOnly">
</user-tree>


                            </el-tab-pane>
                            <el-tab-pane name="twoTree" label="twoTree">
<h1 style="color:red">用户树demo 同一组件页面中同时调用1棵以上的用户树，如添加抄送人、共享人等</h1>
<h3>如果选择用户，是radio，非多选，只需要设置:enable-checked-multiple = "false" 即可</h3>
<h3>如果选择用户，不区分内、外部来源（此时都是内部人员），只需要设置:show-inside-outside-tabs = "false" 即可；默认值是true，即区分内外部，可不设置</h3>

<el-button type="success" @click="enableCheckedMultipleUser = !enableCheckedMultipleUser">设置选择模式，单选or多选</el-button>
<br />
<el-button type="primary" @click="showInsideOutsideTabs = !showInsideOutsideTabs">设置是否显示内、外部</el-button>
<br />

<!--用户树demo1-->
    <el-button @click="showClick('user1')">显示用户树1</el-button>
    <el-tag
    v-for="(item,index) in showUser1"
    :key="index"
    closable
    :disable-transitions="false"
    @close="deleteUser(item.sid,'user1')">
    {{item.name}}
    </el-tag>

<br />
<!--用户树demo2-->
    <el-button @click="showClick('user2')">显示用户树2</el-button>
    <el-tag
    v-for="(item,index) in showUser2"
    :key="item.sid"
    closable
    :disable-transitions="false"
    @close="deleteUser(item.sid,'user2')">
    {{item.name}}
    </el-tag>

    <user-tree :selectUserDialogVisible="showUserTree" @closeCreateModal ="showUserTree = !showUserTree" 
    :show-inside-outside-tabs="showInsideOutsideTabs" :selectedUsers = "userData" @getUserTree = "getUserTree" :enable-checked-multiple="enableCheckedMultipleUser"></user-tree>

                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane name="deptTree" label="deptTree--作废1.0">
<!--部门树demo 同一组件页面只调用1棵部门树-->
<h1 style="color:red">部门树demo 同一组件页面只调用1棵部门树</h1>
<h3>如果选择部门，是radio，非多选，只需要设置:enable-checked-multiple = "false" 即可</h3>
<el-button type="success" @click="enableCheckedMultipleDept = !enableCheckedMultipleDept">设置选择模式，单选or多选</el-button>
<br />
<el-button @click="showDeptTreeOnly = !showDeptTreeOnly">显示唯一的部门树</el-button>
<el-tag
v-for="(item,index) in showDeptOnly"
:key="index"
closable
:disable-transitions="false"
@close="deleteDeptOnly(item.sid)">
{{item.name}}
</el-tag>

<dept-tree :selectDeptDialogVisible="showDeptTreeOnly" @closeCreateModal ="showDeptTreeOnly = !showDeptTreeOnly" :selectedDepts = "showDeptOnly" @getDeptTree = "getDeptTreeOnly" :enable-checked-multiple="enableCheckedMultipleDept"></dept-tree>

                    </el-tab-pane>
                    <el-tab-pane name="roleTree" label="roleTree--作废1.0">
<!--角色树demo 同一组件页面只调用1棵角色树-->
<h1 style="color:red">角色树demo 同一组件页面只调用1棵角色树</h1>
<h3>如果选择角色，是radio，非多选，只需要设置:enable-checked-multiple = "false" 即可</h3>
<el-button type="success" @click="enableCheckedMultipleRole = !enableCheckedMultipleRole">设置选择模式，单选or多选</el-button>
<br />
<el-button @click="showRoleTreeOnly = !showRoleTreeOnly">显示唯一的角色树</el-button>
<el-tag
v-for="(item,index) in showRoleOnly"
:key="index"
closable
:disable-transitions="false"
@close="deleteRoleOnly(item.roleId)">
{{item.roleName}}
</el-tag>

<role-tree :selectRoleDialogVisible="showRoleTreeOnly" @closeCreateModal ="showRoleTreeOnly = !showRoleTreeOnly" :selectedRoles = "showRoleOnly" :enableCheckedMultiple="enableCheckedMultipleRole" @getRoleTree = "getRoleTreeOnly"></role-tree>
                    </el-tab-pane>
                    <el-tab-pane name="roleDeptTree" label="roleDeptTree">
<!--角色+部门树demo 同一组件页面只调用1棵角色+部门树-->
<h1 style="color:red">角色+部门树demo 同一组件页面只调用1棵角色+部门树；只能单选</h1>                     
<!--显示角色+部门树-->
<el-button @click="selectRoleDeptDialogVisible = !selectRoleDeptDialogVisible">显示唯一角色+部门树</el-button>

<el-tag v-if="Object.keys(approverRoleDept.role).length > 0"
  closable
  :disable-transitions="false"
  @close="deleteRoleDept">
  {{approverRoleDept.role.roleName + " + " + approverRoleDept.dept.name}}
</el-tag>

<role-dept-tree :selectRoleDeptDialogVisible="selectRoleDeptDialogVisible"  @closeCreateModal ="selectRoleDeptDialogVisible = !selectRoleDeptDialogVisible" @getRoleDepts="getRoleDepts" :selectedRoleDepts="approverRoleDept"></role-dept-tree>
                    </el-tab-pane>
                    <el-tab-pane name="sharedTree" label="groupTree(组合树)--作废1.0">
                        <h1 style="color:red">组合树demo中，三棵对应树的属性，暂时不支持配置，后期可根据需求设置相关自定义属性</h1>
                        <br>
                        <h1>默认不显示外部联系人，即userTreeShowInsideOutsideTabs的值是false（可不传此值）；如果需要显示外部联系人，设置userTreeShowInsideOutsideTabs的值为ture即可</h1>
                        <group-tree
                          :selectedDeptsToTree="groupTreeData.deptList"
                          :selectedRolesToTree="groupTreeData.roleList"
                          :selectedUsersToTree="groupTreeData.userList"
                          :tagButtons="groupTreeData.tagButtons"
                          :userTreeShowInsideOutsideTabs="groupTreeData.userTreeShowInsideOutsideTabs"
                          @getDataFromGroupTree = "getDataFromGroupTree"
                        >
                        </group-tree>
                    </el-tab-pane>


                    <el-tab-pane name="附件上传" label="附件上传">
                        <!--<debug-log>使用方法：将appId,businessId,categoryId(这三个参数管各自的后端要)传递给该组件；-->
                            <!--事件uploadFinished表示所有文件成功上传并写入数据库成功(回调只有一个参数，就是附件上传成功接口返回的信息)，-->
                            <!--事件uploadError表示上传出错,没有参数-->
                            <!--事件fileQueued表示文件加入队列中（回调仅一个参数，为file对象，你可能永远也用不到该参数吧）-->
                            <!--</debug-log><br>-->
                            <!--required属性表示是否必须上传文件，默认true，若你的附件文件不是必选项，设为false即可-->
                        <!--<debug-log>如果发现控制台有什么什么.infoMsg undefined  刷新页面重试下（此问题可能是uploader的一个bug，极少复现）</debug-log>-->
                        <attach-upload
                                :multiple="allowMultiple"
                                :readonly="attachReadOnly"
                                @fileQueued="handleAttachQueued"
                                :required="attachUploadRequired"
                                ref="attachUpload"
                                @uploadError="handleAttachError"
                                @uploadFinished="handleAttachUploadSuccess"
                                :appId="attachAppId"
                                businessId="100001"
                                categoryId="2"></attach-upload>
                        <el-button @click="attachUploadRequired=!attachUploadRequired">toggle required(当前：{{attachUploadRequired}})</el-button>
                        <el-button @click="attachReadOnly=!attachReadOnly">toggle readonly(当前：{{attachReadOnly}})</el-button>
                        <el-button @click="attachAppId=3-attachAppId">change attachAppId</el-button>
                        <el-button @click="allowMultiple=!allowMultiple">toggle allowMultiple(当前:{{allowMultiple}})(个人测试用，实际情况不允许改这个值)</el-button>

                        <el-button @click="$refs.attachUpload.saveFiles()">保存附件</el-button>

                        <!--isAttachUploadFinished-->

                        <el-button type="primary"

                                   v-if="$refs.attachUpload"
                                   :disabled="$refs.attachUpload && !$refs.attachUpload.allowSubmit"
                                   @click="handleAttachSubmit()"
                                   >提交</el-button>
                        <span>请注意该按钮disabled状态，如果上传在进行中，或者配置required但是无文件,该按钮就是disabled</span>

                        <a style="background:red;" href="http://192.168.3.57:4000/archives/" target="_blank">点我看文档</a>

                        <el-alert type="error" title="1" description='注意事项1：表单提交按钮disabled状态控制(:disabled="$refs.attachUpload && !$refs.attachUpload.allowSubmit")'></el-alert>
                        <el-alert type="error" style="margin-top:10px;" title="2" description="注意事项2：同一表单中若存在多个附件示例，
                        任何一个的ref appId businessId categoryId等4个属性不能重复，此处没有程序检查重复的错误，暂时靠自觉"></el-alert>
                        <el-alert type="error" style="margin-top:10px;" title="3" description="在程序运行时更改appId等3个id可能会导致意想不到的错误，请避免这么做"></el-alert>
                        <el-alert type="error" style="margin-top:10px;" title="4" description="如需在某一个时刻更新附件列表数据，请调用$refs.attachUpload.getFilesList方法（无参数）"></el-alert>
                        <!--<el-alert type="error" style="margin-top:10px;" title="3" description="详情的表单里请配置readonly=true"></el-alert>-->
                        <!--<el-alert type="error" style="margin-top:10px;" title="3" description="详情的表单里请配置readonly=true"></el-alert>-->



                        <!--<attach-upload-->
                                <!--:multiple="allowMultiple"-->
                                <!--:readonly="attachReadOnly"-->
                                <!--@fileQueued="handleAttachQueued"-->
                                <!--:required="attachUploadRequired"-->
                                <!--ref="attachUpload1"-->
                                <!--@uploadError="handleAttachError"-->
                                <!--@uploadFinished="handleAttachUploadSuccess"-->
                                <!--:appId="attachAppId"-->
                                <!--businessId="100002"-->
                                <!--categoryId="22"></attach-upload>-->


                        <!--<iframe style="display: block;-->
    <!--width: 100%;-->
    <!--min-height: 800px;" src="http://192.168.3.57:4000/archives/"></iframe>-->


                    </el-tab-pane>


                </el-tabs>
            </el-tab-pane>
        </el-tabs>



        <!--<div id="uploader" class="wu-example">-->
            <!--<div style="width:100%;height:200px;background:chocolate;" id="thelist" class="uploader-list"></div>-->
            <!--<div class="btns">-->
                <!--<button id="picker">选择文件</button>-->
                <!--&lt;!&ndash;<div id="picker">选择文件</div>&ndash;&gt;-->
                <!--<button id="ctlBtn" class="btn btn-default">开始上传</button>-->
            <!--</div>-->
        <!--</div>-->




        <!--<el-upload-->
            <!--class="upload-demo"-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--:on-preview="handlePreview"-->
            <!--:on-remove="handleRemove"-->
            <!--:before-remove="beforeRemove"-->
            <!--multiple-->
            <!--:limit="3"-->
            <!--:on-exceed="handleExceed"-->
            <!--:file-list="fileList">-->
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        <!--</el-upload>-->


        <!--<ueditor id="dbx"></ueditor>-->












        <!--<el-button @click="testAsync()" type="primary" icon="el-icon-search">test async</el-button>-->


    </div>
</template>
<style lang="scss" scoped>
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
    }
    }
        .el-col {
            border-radius: 4px;
    }
        .bg-purple-dark {
            background: #99a9bf;
    }
        .bg-purple {
            background: #d3dce6;
    }
        .bg-purple-light {
            background: #e5e9f2;
    }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
    }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
    }









    .webuploader-container {
        position: relative;
    }
    .webuploader-element-invisible {
        position: absolute !important;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px,1px,1px,1px);
    }
    .webuploader-pick {
        position: relative;
        display: inline-block;
        cursor: pointer;
        background: #00b7ee;
        padding: 10px 15px;
        color: #fff;
        text-align: center;
        border-radius: 3px;
        overflow: hidden;
    }
    .webuploader-pick-hover {
        background: #00a2d4;
    }

    .webuploader-pick-disable {
        opacity: 0.6;
        pointer-events:none;
    }




    #picker {
        display: inline-block;
        line-height: 1.428571429;
        vertical-align: middle;
        margin: 0 12px 0 0;
    }
    #picker .webuploader-pick {
        padding: 6px 12px;
        display: block;
    }


    #uploader-demo .thumbnail {
        width: 110px;
        height: 110px;
    }
    #uploader-demo .thumbnail img {
        width: 100%;
    }
    .uploader-list {
        width: 100%;
        overflow: hidden;
    }
    .file-item {
        float: left;
        position: relative;
        margin: 0 20px 20px 0;
        padding: 4px;
    }
    .file-item .error {
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        background: red;
        color: white;
        text-align: center;
        height: 20px;
        font-size: 14px;
        line-height: 23px;
    }
    .file-item .info {
        position: absolute;
        left: 4px;
        bottom: 4px;
        right: 4px;
        height: 20px;
        line-height: 20px;
        text-indent: 5px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        overflow: hidden;
        white-space: nowrap;
        text-overflow : ellipsis;
        font-size: 12px;
        z-index: 10;
    }
    .upload-state-done:after {
        content:"\f00c";
        font-family: FontAwesome;
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 32px;
        position: absolute;
        bottom: 0;
        right: 4px;
        color: #4cae4c;
        z-index: 99;
    }
    .file-item .progress {
        position: absolute;
        right: 4px;
        bottom: 4px;
        height: 3px;
        left: 4px;
        height: 4px;
        overflow: hidden;
        z-index: 15;
        margin:0;
        padding: 0;
        border-radius: 0;
        background: transparent;
    }
    .file-item .progress span {
        display: block;
        overflow: hidden;
        width: 0;
        height: 100%;
        background: pink;
        -webit-transition: width 200ms linear;
        -moz-transition: width 200ms linear;
        -o-transition: width 200ms linear;
        -ms-transition: width 200ms linear;
        transition: width 200ms linear;
        -webkit-animation: progressmove 2s linear infinite;
        -moz-animation: progressmove 2s linear infinite;
        -o-animation: progressmove 2s linear infinite;
        -ms-animation: progressmove 2s linear infinite;
        animation: progressmove 2s linear infinite;
        -webkit-transform: translateZ(0);
    }
    @-webkit-keyframes progressmove {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 17px 0;
        }
    }
    @-moz-keyframes progressmove {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 17px 0;
        }
    }
    @keyframes progressmove {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 17px 0;
        }
    }

    a.travis {
        position: relative;
        top: -4px;
        right: 15px;
    }


</style>

<script>
    // import locale from './demo.locale'
    JZY.locale.add('demoLocale',require('./demo.locale'))
    import config from '@/config/index.js'
    import mockData from '@MockData'
    import jsGantt from '@/components/jsgantt/jsgantt.vue'

    // import userTreeDemo from '@/components/userTree/userTree.vue'
    // import deptTreeDemo from '@/components/deptTree/deptTree.vue'
    // import roleTreeDemo from '@/components/roleTree/roleTree.vue'


    import smarterTreeDemo from '@/components/smarterTree/examples/demo-smarterTree.vue'
    import treeGridDemo from '@/components/treeGrid/examples/demo-treeGrid.vue'
    import transferTreeDemo from '@/components/transferTree/examples/demo-transferTree.vue'


    import testDemo from './testDemo'

    import Gantt from '@/components/gantt/index.js'

    let demoEvents = [
        {
            title    : 'Sunny 725-727',
            start    : '2018-02-25',
            end      : '2018-02-27',
            cssClass : 'family'
        },
        {
            title : '726-727',
            start : '2018-02-26',
            end : '2018-02-27',
            cssClass : ['home', 'work']
        },
        {
            title : '2/27-2/28',
            start : '2018-02-27',
            end : '2018-02-28'
        },
        {
            title : '2/27-2/28',
            start : '2018-02-27',
            end : '2018-02-28'
        },
        {
            title : '2/27-2/28',
            start : '2018-02-27',
            end : '2018-02-28'
        },
        {
            title : '2/26-3/05',
            start : '2018-02-26',
            end : '2018-03-05'
        },
        {
            title : '1/27-1/28',
            start : '2018-01-27',
            end : '2018-01-28'
        },
        {
            title : '1/21-1/22',

            start : '2018-01-21',
            end : '2018-01-22'
        },
        {
            title : '1/27-2/2',
            start : '2018-01-27',
            end : '2018-02-02'
        },
        {
            title : '3/27-3/28',
            start : '2018-03-27',
            end : '2018-03-28'
        },
    ];
    export default{
        components:{
            jsGantt,
            testDemo,
            smarterTreeDemo,
            treeGridDemo,
            transferTreeDemo,
            // userTreeDemo,
            // deptTreeDemo,
            // roleTreeDemo,
        },
        methods:{
            async handleAttachSubmit(){


                // await Promise.all("attachUpload1,attachUpload2".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                // await this.$refs.attachUpload.saveFiles()

                JZY.u.infoMsg('附件保存成功')
            },
            handleAttachError(){
              alert('附件上传出错啦')
            },
            handleAttachQueued(){
                // alert('add one new attach file')
              this.isAttachUploadFinished=false
            },
            handleAttachUploadSuccess(res){
                this.isAttachUploadFinished=true
              alert('全部上传成功,返回信息请查看控制台显示')
              console.log('附件上传成功返回信息：',res)
            },
//用户树-开始
/*1棵树*/

//接收用户树组件的返回值
getUserTreeOnly:function(obj){
  this.showUserOnly = [...obj]
},
//删除用户tag的事件
deleteUserOnly(sid) {
    this.showUserOnly = this.showUserOnly.filter(function(item) {
      return item.sid != sid;
    });
},

/*多棵树*/
showClick:function(type){
  this.showUserTree = !this.showUserTree
  this.showType = type

  if (type === 'user1') {//用户树1
    this.userData = [...this.showUser1]
  }else if(type === 'user2'){//用户树2
    this.userData = [...this.showUser2]
  }
},
//接收用户树组件的返回值
getUserTree:function(arr){
  console.info(arr)
  if(this.showType === 'user1'){
    this.showUser1 = [...arr]
  }else if(this.showType === 'user2'){
    this.showUser2 = [...arr]
  }
},
//删除用户tag的事件
deleteUser(sid,type) {
  if(type === 'user1'){
    this.showUser1 = this.showUser1.filter(function(item) {
      return item.sid != sid;
    });
  }else if(type === 'user2'){
    this.showUser2 = this.showUser2.filter(function(item) {
      return item.sid != sid;
    });
  }
},
//用户树-结束


//部门树-开始
/*1棵树*/

//接收部门树组件的返回值
getDeptTreeOnly:function(arr){
  this.showDeptOnly = [...arr]
},
//删除部门tag的事件
deleteDeptOnly(sid) {
    this.showDeptOnly = this.showDeptOnly.filter(function(item) {
      return item.sid != sid;
    });
},
//部门树-结束

//角色树-开始
//接收角色组件的返回值
getRoleTreeOnly:function(arr){
  this.showRoleOnly = [...arr]
  console.info("接收到的值")
  console.info(this.showRoleOnly)
},
//删除角色tag的事件
deleteRoleOnly(roleId) {
    this.showRoleOnly = this.showRoleOnly.filter(function(item) {
      return item.roleId != roleId;
    });
},
//角色树-结束

//角色+部门树组件-开始
//接收从角色部门tree中返回的已选择角色部门对象
getRoleDepts:function(obj){
  this.approverRoleDept = JZY.u.deepExtend({}, obj);
},
////删除角色+部门tag的事件
deleteRoleDept:function(){
  this.approverRoleDept.role = {}
  this.approverRoleDept.dept = {}
  this.approverRoleDept.resultNames.splice(0,this.approverRoleDept.resultNames.length)
},
//角色+部门树组件-结束

//组合树-开始
//接收组合树组件的返回值
getDataFromGroupTree:function(obj){
    console.info("getDataFromGroupTree")
    console.info(obj)
},
//组合树-结束



//混合树blendTree组件2.0-开始

//接收混合树组件1的返回值
getDataFromTree( obj = {} ){
    console.info(obj)
    console.info(JSON.stringify(obj))
    // debugger
},
//接收混合树组件2的返回值
getDataFromTree2( obj = {} ){
    console.info(obj)
    console.info(JSON.stringify(obj))
    // debugger
},

//以下为高级用法，前期可不用或少用，有坑

//动态切换xxxTree的入参
xxxTreeChange(){
    this.enableCheckedMultiple = false//人员树不可以多选
    this.activeTab = 'userOutside'//初始化激活的tab标签
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

//动态切换xxxTree的入参2
xxxTreeChange2(){
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
    this.tagButtons = ['user']//可选择的tab标签，不传此属性，即为全部tab标签（用户、部门、角色、外部联系人
    this.filterDataUrl = {
      host:'',
      type:'',
      url:''
    }
    this.$refs.xxxTree.blendTreeDialogShow()
},

//混合树blendTree组件2.0-结束


            testCallInterFaceAndSetDataWithCache(){
                JZY.xhr.callInterfaceAndSetData({type:'post',url:'/test_post'},this.testData1,'outerFoo.innerFoo',true)
                    .then((res)=>{
                        JZY.s.clog('res--:',res,this.testData1)
                    })
            },
            testCallInterFaceAndSetData(){

                // JZY.xhr.callInterfaceAndSetData({type:'post',url:'/test_post'},testData1,'outerFoo',true)"

                JZY.xhr.callInterfaceAndSetData('/test',this.testData1,'outerFoo.innerFoo')
                    .then((res)=>{
                        JZY.s.clog('res--:',res)
                    })
            },
            custormRequestArrError(){
                JZY.xhr.requestPromises([JZY.xhr.request(['/test_fail_get'],false,false),
                    JZY.xhr.request([{type:'post',url:'/test_fail_post'}],false,false)],false)

                    .catch((e)=>{
                        alert("this is my custom error1")
                    })


                JZY.xhr.request(['/test_fail_get',{type:'post',url:'/test_fail_post'}],false,false)
                    .catch((e)=>{
                        alert("this is my custom error2")
                    })

            },
            request404(){

                JZY.xhr.request({type:'post',url:location.origin+'/404'})
            },
            testFailPost(){



                this.JZY.xhr.post('/test_fail',{foo:'bar'},{alertError:false}).then((e)=>{
                        alert('成功')
                    }).catch((e)=>{
                            alert("fail")
                        })

                this.JZY.xhr.post('/test_post',{foo:'bar'},{alertError:false}).then((e)=>{
                    alert('成功')
                }).catch((e)=>{
                    alert("fail")
                })
            },
            handleDirChooseSubmit(nodes){
                this.JZY.u.infoMsg('你选择了'+nodes[0].orgName)
                this.$refs.treePicker.closeDialog()
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            updateHighlightDays(){

                this.highlightDays=[
                    {

                        title:'hello world',

                        date:'2018-01-19'
                    },
                    {
                        title:'hello world',
                        date:'2018-03-17'
                    },{
                        title:'hello world',
                        date:'2017-01-17'
                    }

                ]
            },
            handlePickChange(date,event){
              console.log('handle pick change argssdfsdfsdsssdfsdfs--:',date,event)
            },
            open() {
                this.$message('这是一条消息提示');
            },

            openVn() {
                const h = this.$createElement;
                this.$message({
                    message: h('p' , null, [
                        h('span', null, '内容可以是aaaaaaaa '),
                        h('i', { style: 'color: teal' }, 'VNode')
                    ])
                });
            },
            handleDialogSave(){
              alert('你点击了dialog的保存按钮')
            },
            'changeMonth' (start, end, current) {
                console.log('changeMonth', start.format(), end.format(), current.format())
            },
            'eventClick' (event, jsEvent, pos) {
                console.log('eventClick', event, jsEvent, pos)
            },
            'dayClick' (day, jsEvent) {
                console.log('dayClick', day, jsEvent)
            },
            'moreClick' (day, events, jsEvent) {
                console.log('moreCLick', day, events, jsEvent)
            },
            test(){

            },
            test1:function(){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve({foo:'barrrrrrr'})
                    },100)
                })
            },
            async testAsync(){
                let obj=await this.test1()

                alert(obj.foo)
            }
        },
        data(){
            return {
                allowMultiple:true,
                attachAppId:1,
                attachReadOnly:true,
                // isDetailAttachUpload:true,
                // allowUploadWhenDetailMode:true,
                attachUploadRequired:true,
                isAttachUploadFinished:false,
                UEconfig:{
                    initialFrameWidth :800,//设置编辑器宽度
                    initialFrameHeight:250,//设置编辑器高度
                    // 设置不自动调整高度
                    scaleEnabled:false,//不可以拉伸
                    maximumWords:5000
                },
                textareaModel:'this is textarea model',

                zhiyuanData:'aa bb cc dd ee ff'.split(' '),
//评论组件-开始
businessId:'',//业务模块中的详情页id，即文章id
business_type:'0',//业务类型 0：任务 1：新闻 2：计划 3：日志
//评论组件-结束

//用户树-开始
//单选还是多选设置
enableCheckedMultipleUser:true,//false单选，true多选（默认是多选，此种模式可不传递此参数）
showInsideOutsideTabs:true,//显示内、外部，false:只显示‘人员’，其他逻辑无差异
filterDataUrl:{
    host:'GLOBAL.SHANG_BIN',
    type:'post',
    url:'/journal/journal/selectCondition',
    data:{
        journalDate:'2018-04-16'
    }
},//过滤数据源，获取data的接口

/*1棵树*/
showUserTreeOnly:false,
showUserOnly:[{//审批人：用户tree
            // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
            sid:'1000',
            name:'创建者'

        }],

/*多棵树*/
showUserTree:false,
userData :[],
showType:'',
showUser1:[{//审批人：用户tree
            // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
            sid:'1000',
            name:'创建者'
        }],
showUser2:[{//审批人：用户tree
            // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
            sid:'1000',
            name:'创建者'
        }],
//用户树-结束

//部门树-开始
//单选还是多选设置
enableCheckedMultipleDept:true,//false单选，true多选（默认是多选，此种模式可不传递此参数）
/*1棵树*/
showDeptTreeOnly:false,
showDeptOnly:[{//审批人：用户tree
            // nodeId:'59a38485081e98b66d2de232a73ecec9',
            sid:'1002',
            name:'市场部'
        }],
//部门树-结束

//角色树-开始
showRoleTreeOnly:false,
enableCheckedMultipleRole:true,//多选true，单选false
showRoleOnly:[{//已选择的角色
                    roleId:'1003',
                    roleName:'销售经理'
                }],
//角色树-结束


//角色+部门树-开始
selectRoleDeptDialogVisible:false,//选择角色+部门弹出窗
approverRoleDept:{//审批人：角色+部门tree
    role:{roleId:'1005',roleName:'普通职员'},
    dept:{sid:'1003',name:'人事部'},
    resultNames:[{
      sid:'1000',
      name:'创建者'
    },{
      sid:'10105',
      name:'公司顶部人测试'
    }]
  },
//角色+部门树-结束



//组合树-开始
groupTreeData:{
    tagButtons:['dept','role','user'],//部门、角色、用户，默认三个，可不传值
    userTreeShowInsideOutsideTabs:false,//默认false不显示外部联系人
    deptList:[{//已选择的部门
        sid:'1002',
        name:'市场部'
    },{
        sid:'1003',
        name:'人事部'
    }],
    roleList:[{//已选择的角色
      roleId:'1003',
      roleName:'销售经理'
    }],
    userList:[{//已选择的用户
        // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
        sid:'1000',
        name:'创建者'
    }],
},

//组合树-结束


//混合树blendTree组件2.0-开始

selectedDataToTree:{//已选树节点
userList:[{
  sid: '100676',
  name: '杜百兴',
  scheduleTitleShow:true  //是否显示标题的参数，固定属性名称
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
activeTab:'dept',//初始化激活的tab标签
readOnly:false,//只读模式，默认false是可编辑模式；true：不允许添加和删除人员
resultDataListShow:true,//组合树返回已选数据项，是否展示，默认true展示
fromMoudle:'schedule',//日程共享人专用

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

//混合树blendTree组件2.0-结束



                testData1:{
                    outerFoo:{
                        innerFoo:null
                    }
                },

                tabWrapperModel:'非业务组件',
                treeData: [{
                    "permissionId": 118,
                    "orgCode": "YWDY000000009",
                    "orgName": "德邦物流",

                    "currentOrg": "0",
                    "children": [{
                        "permissionId": 119,
                        "orgCode": "YWDY000000010",
                        "orgName": "北京网点",

                        "currentOrg": "1",
                        "children": [{
                            selected:false,
                            "permissionId": 120,
                            "orgCode": "YWDY000000011",
                            "orgName": "回龙观网点",
                            "childOrgs": [],
                            "currentOrg": "0"
                        }, {selected:false,"permissionId": 121, "orgCode": "YWDY000000012", "orgName": "西二旗网点", "childOrgs": [], "currentOrg": "0"}],
                        "selected": false
                    }, {
                        "permissionId": 130,
                        "orgCode": "YWDY000000020",
                        "orgName": "郑州网点",

                        "currentOrg": "0",
                        "children": [{
                            "permissionId": 131,
                            "orgCode": "YWDY000000021",
                            "orgName": "金明网点",
                            "childOrgs": [],
                            "currentOrg": "0"
                        }, {"permissionId": 132, "orgCode": "YWDY000000022", "orgName": "龙湖网点", "childOrgs": [], "currentOrg": "0"}],
                        "selected": false
                    }],
                    "selected": false
                }],
                enableCheck:true,
                enableCheckedFolder:true,
                enableCheckedMultiple:false,
                autoExpandCheckedNodes:true,

                activeDemo:'tree grid',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

                highlightDays:[
                    {
                        title:'hello world',
                        date:'2018-01-17'
                    },
                    {
                        title:'hello world',
                        date:'2018-02-17'
                    },{
                        title:'hello world',
                        date:'2019-01-17'
                    }

                ],
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                dialogVisible:false,

                dialogVisible1:false,
                name:'Sunny!',

                fcEvents : demoEvents
                // menus:[
                //     {
                //         moduleName:'通讯录1',
                //         name:'contact1',
                //         children:[
                //             {
                //                 moduleName:'通讯录1-儿子1',
                //                 url:'/home',
                //             }
                //         ]
                //     },{
                //         moduleName:'通讯录2',
                //         name:'contact2',
                //         url:'/home',
                //     }
                // ]
            }
        },
        mounted(){

            setTimeout(()=>{

                //更多代码参考
                // https://frappe.github.io/gantt/
                // https://frappe.github.io/gantt/index.js
                var names = [
                    ["Redesign website", [0, 7]],
                    ["Write new content", [1, 4]],
                    ["Apply new styles", [3, 6]],
                    ["Review", [7, 7]],
                    ["Deploy", [8, 9]],
                    ["Go Live!", [10, 10]]
                ];

                var tasks = names.map(function(name, i) {
                    var today = new Date();
                    var start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    var end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    start.setDate(today.getDate() + name[1][0]);
                    end.setDate(today.getDate() + name[1][1]);
                    return {
                        start: start,
                        end: end,
                        name: name[0],
                        id: "Task " + i,
                        progress: parseInt(Math.random() * 100, 10)
                    }
                });
                tasks[1].dependencies = "Task 0"
                tasks[2].dependencies = "Task 1"
                tasks[3].dependencies = "Task 2"
                tasks[5].dependencies = "Task 4"


                console.log('kcuf_u tasks---',tasks)

                var gantt_chart = new Gantt("#gantt-1", tasks);
            },500)

            this.JZY.call(this, 'setCurrentVM')



        }
    }
</script>
