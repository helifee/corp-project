<style lang="scss">
    .jzy-search-input-wrapper{
        .el-input-group__append{
            padding-left:0;
            padding-right:0;
            span{
                cursor:pointer;
            }
        }
    }
    .net-disk-wrapper {
        .upload-list-wrapper {

            /*overflow-y:scroll;*/
            position: fixed;
            right: 0px;
            bottom: 0px;
            width: 850px;
            height: 326px;
            background: inherit;
            background-color: inherit;
            background-color: rgba(255, 255, 255, 1);
            border: none;
            border-radius: 5px;
            -moz-box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.698039215686274);
            -webkit-box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.698039215686274);
            box-shadow: 0px 0px 10px rgba(204, 204, 204, 0.698039215686274);
            font-family: 'PingFangSC-Medium', 'PingFang SC Medium', 'PingFang SC';
            font-weight: 500;
            font-style: normal;
            text-align: left;
            z-index: 10;
        }
    }
</style>
<template>
    <div class="net-disk-wrapper bx-module-wrapper" style="position:relative;height:100%;">
        <div v-if="isDiskInited">


            <!--<link type="text/css" rel="stylesheet" href="static/pdf-js/web/viewer.css">-->
            <preview-file ref="previewFile"></preview-file>

            <!--<el-dialog :visible="previewFileDialogVisible" :fullscreen="true" @close="previewFileDialogVisible=false;previewFileSrc=null">-->
                <!--<div style="    width: 100%;-->
    <!--height: 100%;-->
    <!--min-height: 500px;" v-loading="isLoadingPreview">-->

                    <!--<img style="display:block;margin:0 auto;margin-top:150px;" :src="previewFileSrc"-->
                         <!--v-if="previewFileSrc!=null && isPreviewImg==true"/>-->

                    <!--<iframe onload="JZY.setIframeHeight(this)" style="width: 100%;-->
    <!--height: 100%;-->
    <!--border: none;-->
    <!--padding: 0;-->
    <!--margin: 0;" v-if="previewFileSrc!=null && isPreviewImg==false" :src="previewFileSrc"></iframe>-->
                <!--</div>-->

            <!--</el-dialog>-->

            <!--<el-button @click="fileTransferManager.download({id:1})"></el-button>-->

            <div class="upload-list-wrapper" v-show="uploadFilesList.length>0"
                 :style="{bottom:(isUploadDialogMaxMode?'0':((-326+45))+'px')}">
                <div style=" padding-left:20px;
            padding-right:20px;height:45px;line-height:45px;border-bottom:solid 1px rgba(242, 242, 242, 1);">
                    <span style="">{{l('fileUpload')}}</span>
                    <span style="float:right;">
                    <i @click="isUploadDialogMaxMode=!isUploadDialogMaxMode"
                       :class="isUploadDialogMaxMode?'el-icon-minus':'el-icon-plus'"
                       class="icon20" style="cursor:pointer;"></i>
                        <i @click="handleUploadingWrapperClose()"
                           class="el-icon-close icon20"
                           style="cursor:pointer;"></i>
                        <!--<i class="el-icon-close icon20" style="cursor:pointer;"></i>-->
                </span>
                </div>
                <div :style="{height:(!isUploadDialogMaxMode?'0':((326-45))+'px'),overflowY:'scroll'}">
                    <!--<textarea id="sha_256_output"></textarea>-->



                    <div>
                        <el-table :data="uploadFilesList">
                            <el-table-column width="275" :label="l('file')" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    {{scope.row.file.name}}
                                </template>
                            </el-table-column>
                            <el-table-column :label="l('size')" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.isDir?'--':bytesToSize(scope.row.fileSize)}}
                                </template>
                            </el-table-column>
                            <el-table-column :label="l('progress')" width="350">
                                <template slot-scope="scope">

                                    <el-progress :percentage="scope.row.progress"
                                                 :status="scope.row.errorMsg!=''?'exception':(scope.row.progress>=100?'success':'')"></el-progress>

                                    <span>{{scope.row.errorMsg||scope.row.infoMsg}}</span>

                                </template>
                            </el-table-column>
                            <el-table-column label="">
                                <template slot-scope="scope">
                                    <i v-if="scope.row.progress<100" @click="removeFile(scope.row,scope.$index)"
                                       class="el-icon-circle-close icon20 hover-blue" style="cursor:pointer;"></i>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>


                    <!--<input type="file" name="file" class="webuploader-element-invisible" multiple="multiple">-->
                    <!--<button id="ctlBtn" class="btn btn-default">开始上传</button>-->
                    <!--<div id="StopBtn" style="float: left; margin-right: 10px" status="suspend">暂停上传</div>-->

                </div>



            </div>

            <right-slide-modal
                    @open="handleMkdirDialogOpen()"
                    :title="mkdirTitle" @close="mkdirVisible=false" :visible="mkdirVisible">
                <div slot="operateButtons" style="display:inline-block;float:right;">

                    <el-button @click="submitMkdir()" size="mini" type="primary">{{l('{g.buttons.confirm}')}}
                    </el-button>
                    <el-button @click="mkdirVisible=false" size="mini">{{l('{g.buttons.cancel}')}}</el-button>
                    <!--<div style="display:inline-block;float:right;">-->
                    <!--<el-button v-if="'DETAIL'!=scheduleDialogMode" @click="submitNewScheduleDialog()" size="small">{{l('{global.save}')}}</el-button>-->

                </div>
                <div class="record">


                    <el-form ref="mkdirForm" :model="mkdirForm" :rules="mkdirRules" label-width="120px">

                        <el-form-item :label="l('folderName')" prop="fileName">
                            <el-input v-model="mkdirForm.fileName"></el-input>
                        </el-form-item>

                        <!--<div v-if="!getDirId()">-->
                        <!--<el-form-item :label="l('folderRemark')" prop="remark">-->
                        <!--<el-input v-textarea-limiter :maxlength="100" type="textarea" v-model="mkdirForm.remark"></el-input>-->
                        <!--</el-form-item>-->

                        <!--&lt;!&ndash;{userId:this.$store.state.session.sid,orgType:1,authorizeList:[{authorizeId:1},{authorizeId:2},{authorizeId:3},{authorizeId:4}]}&ndash;&gt;-->
                        <!--<el-form-item :label="l('permissionSetting')">-->
                        <!--<el-table :data="mkdirForm.userAuthorizeList">-->
                        <!--<el-table-column :label="l('member')">-->
                        <!--<template slot-scope="scope">-->
                        <!--<span v-if="!scope.row.editable">-->
                        <!--{{scope.row.name}}-->
                        <!--</span>-->
                        <!--<span v-else>-->
                        <!--<group-tree-->
                        <!--ref="groupTree"-->
                        <!--:selectedDeptsToTree="[]"-->
                        <!--:selectedRolesToTree="[]"-->
                        <!--:selectedUsersToTree="[]"-->
                        <!--@getDataFromGroupTree = "getDataFromGroupTree"-->
                        <!--&gt;-->

                        <!--</group-tree>-->
                        <!--</span>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column :label="l('{g.view}')">-->
                        <!--<template slot-scope="scope">-->
                        <!--<el-checkbox v-model="scope.row.authorizeList[0].authorizeId"></el-checkbox>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column :label="l('{g.download}')">-->
                        <!--<template slot-scope="scope">-->
                        <!--<el-checkbox v-model="scope.row.authorizeList[1].authorizeId"></el-checkbox>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column :label="l('{g.edit}')">-->
                        <!--<template slot-scope="scope">-->
                        <!--<el-checkbox v-model="scope.row.authorizeList[2].authorizeId"></el-checkbox>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column :label="l('{g.manage}')">-->
                        <!--<template slot-scope="scope">-->
                        <!--<el-checkbox v-model="scope.row.authorizeList[3].authorizeId"></el-checkbox>-->
                        <!--</template>-->
                        <!--</el-table-column>-->


                        <!--<el-table-column label="+">-->
                        <!--<template slot-scope="scope">-->
                        <!--<i v-if="mkdirForm.userAuthorizeList.length>2 && (!scope.row.editable)" @click="deleteFolderPermission(scope)" class="el-icon-close" style="cursor:pointer"></i>-->
                        <!--</template>-->
                        <!--</el-table-column>-->

                        <!--</el-table>-->
                        <!--</el-form-item>-->
                        <!--</div>-->


                    </el-form>

                </div>
            </right-slide-modal>

            <!--<el-dialog :title="mkdirTitle" @close="mkdirVisible=false" :visible="mkdirVisible">-->

            <!--</el-dialog>-->


            <el-dialog @open="handleTreeOpen()" @close="moveDialogVisible=false" :title="moveDialogTitle"
                       :visible="moveDialogVisible">
                <smarter-tree
                        :remote="remoteLoadFun"
                        v-if="dirTree"
                        :enableFilter="false"
                        checked-key="selected"
                        @mounted="$refs.treeGrid.refreshTreeTable(dirTree);handleTreeOpen();"
                        ref="treeGrid"
                        :expand-all="false"
                        :enable-checked-multiple="false"
                        :enable-check="true"
                        tree-key="sid"
                        prop="name" label="选择网点"
                >

                </smarter-tree>
                <div style="margin-top:30px;">
                    <!--<el-button type="primary">{{l('addNewFolder')}}</el-button>-->
                    <div style="text-align:right;">
                        <el-button @click="handleTreeSubmit()" type="primary">
                            {{l('{g.buttons.confirm}')}}
                        </el-button>
                        <el-button @click="moveDialogVisible=false">
                            {{l('{g.buttons.cancel}')}}
                        </el-button>

                    </div>
                </div>
            </el-dialog>


            <!--<tree-picker-->
            <!--title="复制到"-->
            <!--checked-key="selected"-->
            <!--:enableCheckedMultiple="false"-->
            <!--:treeData="treeData"-->
            <!--ref="treeGrid"-->
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

            <div class="theme-font padd10" style="border-bottom:solid 1px rgba(204, 204, 204, 1);margin-top:10px;padding-bottom:20px;">
                <el-breadcrumb separator="/" v-if="searchContent.trim()==''">
                    <el-breadcrumb-item :key="index" v-for="(item,index) in breadMenuPathArr">
                        <i v-if="item.isLoading" class="el-icon-loading"></i>
                        <span @click="currentPage=1;$emit('openDir',item,breadMenuPathArr,index,1,'',()=>{currentDirRow=item.sid===null?null:item;})"
                              style="font-weight: bold;cursor:pointer;">{{item.fileName}}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <span v-else style="font-size: 14px;
    color: #606266;font-weight:bold;">
                    网盘检索结果
                </span>
            </div>
            <div class="padd10" style="">
                <el-form size="small" style="padding-top:10px;" :inline="true">
                    <span v-if="module=='MY_FILE'">
                        <el-form-item :label="l('searchContent')">
                        <el-input @keyup.enter.native.stop="searchContent=searchContentModel;handleSearchContentChange()" class="jzy-search-input-wrapper" v-model="searchContentModel" :placeholder="l('placeholders.pleaseInputToSearch')">
                            <span slot="append">
                                <span title="搜索" type="primary" @click="searchContent=searchContentModel;handleSearchContentChange()" style="width:28px;height:30px;line-height:30px;display:inline-block;text-align:center;">
                                    <svg style="position: relative;top:3px;" width="15px" height="15px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
                                        <!--<title>搜索@2x</title>-->
                                        <!--<desc>Created with Sketch.</desc>-->
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="云盘-01-根目录" transform="translate(-674.000000, -91.000000)" fill="#46A7FF">
                                                <g id="搜索" transform="translate(674.000000, 91.000000)">
                                                    <g id="search">
                                                        <path d="M6.5,13 C2.91014913,13 0,10.0898509 0,6.5 C0,2.91014913 2.91014913,0 6.5,0 C10.0898509,0 13,2.91014913 13,6.5 C13,10.0898509 10.0898509,13 6.5,13 Z M6.5,11.5 C9.26142375,11.5 11.5,9.26142375 11.5,6.5 C11.5,3.73857625 9.26142375,1.5 6.5,1.5 C3.73857625,1.5 1.5,3.73857625 1.5,6.5 C1.5,9.26142375 3.73857625,11.5 6.5,11.5 Z" id="Combined-Shape"></path>
                                                        <path d="M9.10993071,12.8662121 C9.08861176,12.3163168 9.52026821,11.8697707 10.0722661,11.8688267 L15.6080052,11.8593593 C16.1608073,11.8584138 16.6089419,12.3156 16.6089419,12.8680337 L16.6089419,12.8217601 C16.6089419,13.379781 16.1646013,13.8339176 15.6027979,13.8361571 L10.1546762,13.8578749 C9.59899813,13.86009 9.13139829,13.4199412 9.10993071,12.8662121 L9.10993071,12.8662121 Z" id="Rectangle" transform="translate(12.859058, 12.858621) rotate(45.000000) translate(-12.859058, -12.858621) "></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <!--<i title="搜索" type="primary" @click="handleSearchContentChange()" class="el-icon-search"></i>-->
                                </span>
                                <span title="重置" @click="searchContentModel='';searchContent='';handleSearchContentChange()" style="width:28px;height:30px;line-height:30px;display:inline-block;text-align:center;">
                                    <svg style="position: relative;top:3px;" width="15px" height="15px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
                                        <!--<title>重置@2x</title>-->
                                        <!--<desc>Created with Sketch.</desc>-->
                                        <defs></defs>
                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="云盘-01-根目录" transform="translate(-705.000000, -91.000000)" fill="#CCCCCC">
                                                <path d="M721.76734,98.4336428 L718.971265,101.273634 C718.819076,101.428252 718.611232,101.515275 718.394282,101.515275 C718.177331,101.515275 717.969487,101.428252 717.817298,101.273634 L715.021223,98.4336428 C714.707535,98.1150975 714.711583,97.6026727 715.030128,97.2887822 C715.348673,96.9750941 715.861098,96.9791416 716.174989,97.2978893 L717.737965,98.8851513 C717.535181,95.9470064 715.123627,93.6190356 712.186292,93.6190356 C709.1166,93.6190356 706.619036,96.1611239 706.619036,99.2856603 C706.619036,102.410399 709.1166,104.952285 712.186292,104.952285 C713.316176,104.952285 714.403561,104.610264 715.330459,103.962852 C715.697171,103.707044 716.201905,103.796698 716.457713,104.163207 C716.713723,104.529717 716.623866,105.034451 716.257357,105.290461 C715.057247,106.128312 713.649495,106.571321 712.186292,106.571321 C708.223905,106.571321 705,103.303095 705,99.2856603 C705,95.2684281 708.223905,92 712.186292,92 C715.917967,92 718.993325,94.8990856 719.338989,98.5923083 L720.613575,97.2978893 C720.927465,96.9791416 721.440092,96.9752964 721.758435,97.2887822 C722.076981,97.6026727 722.081028,98.1150975 721.76734,98.4336428" id="clockwise"></path>
                                            </g>
                                        </g>
                                    </svg>

                                    <!--<i title="重置" @click="searchContent='';handleSearchContentChange()" class="el-icon-close"></i>-->
                                </span>


                            </span>
                        </el-input>
                    </el-form-item>
                    <!--<el-button @click="handleSearchContentChange()" type="primary" size="small">{{l('{global.buttons.query}')}}</el-button>-->
                    <!--<el-button @click="searchContent='';handleSearchContentChange()" size="small">{{l('{global.buttons.reset}')}}</el-button>-->

                    </span>


                    <el-button style="margin-left:20px;float:right;" v-if=" module=='MY_FILE'" @click="mkdirVisible=true;mkdirViewType='ADD'"
                                type="primary" size="small">{{l('addNewFolder')}}
                    </el-button>
                    <!--<el-button v-if=" module=='DIR_MANAGE' ||('MY_FILE'==module && breadMenuPathArr.length>1)" @click="mkdirVisible=true;mkdirViewType='ADD'" style="float:right;" type="primary" size="small">{{l('addNewFolder')}}</el-button>-->
                    <el-button v-if=" module=='MY_FILE'" ref="uploadFileButton" @click="openOSFilePicker()"
                               style="float:right;" type="primary" size="small">{{l('uploadFile')}}
                    </el-button>

                    <span style="float:right;display:inline-block;line-height:40px;" v-if="spaceUsage">云盘容量:{{bytesToSize(spaceUsage.usedSpace)+'/'+bytesToSize(spaceUsage.space)}}</span>

                    <!--<el-button v-if="breadMenuPathArr.length>1" ref="uploadFileButton" @click="openOSFilePicker()" style="float:right;" type="primary" size="small">{{l('uploadFile')}}</el-button>-->
                </el-form>


                <!--<el-button v-if="module=='MY_FILE'" @click="deleteSelectedFiles()" size="mini"-->
                           <!--:disabled="selectedFileIds.length==0">{{l('deleteSelectedFiles')}}-->
                <!--</el-button>-->



                <span style="display:block;margin-bottom:15px;">
                    <el-button v-if="module=='MY_FILE'" @click="downloadSelectedFiles()" size="mini"
                               :disabled="selectedFileIds.length==0">{{l('downloadSelectedFiles')}}
                    </el-button>
                </span>




                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        @cell-mouse-enter="handleMouseEnter"
                        @cell-mouse-leave="handleMouseLeave"
                        style="width: 100%">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column label="" width="60">

                        <template slot-scope="scope">
                            <i v-if="scope.row.isLoading" class="el-icon-loading"></i>
                            <row-icon :row="scope.row"></row-icon>
                        </template>

                    </el-table-column>
                    <el-table-column
                            show-overflow-tooltip
                            :label="l('table.name')"
                            width="200">
                        <template slot-scope="scope">


                            <i v-if="scope.row.isLoading" class="el-icon-loading"></i>

                            <span @click="handleFileClick(scope.row)"
                                  :style="{cursor:scope.row.isHover?'pointer':'default'}"
                                  :class="{'theme-font':scope.row.isHover}" v-if="!scope.row.renameMode">
                            {{scope.row.fileFullName||scope.row.fileName}}
                                <!--{{scope.row.fileName}}-->
                        </span>
                            <span v-if="scope.row.renameMode">
                            <el-input @keyup.enter.native="rename(scope.row)" style="display:inline-block;width:90%;" size="mini" v-model="newFileName"></el-input>

                        </span>

                        </template>

                    </el-table-column>
                    <el-table-column
                            label=""
                            width="180">

                        <template slot-scope="scope">
                        <span v-if="scope.row.renameMode">
                            <i style="cursor:pointer;" class="el-icon-check theme-font icon20"
                               @click="rename(scope.row)"></i>
                            <i style="cursor:pointer;" class="el-icon-close theme-font icon20"
                               @click="newFileName='';scope.row.renameMode=false"></i>
                        </span>
                            <span v-if="selectedFileIds.includes(scope.row.sid)&&!scope.row.renameMode">

                            <!--<i v-if="!scope.row.isDir" :title="l('{global.download}')"-->
                                <!--class="el-icon-download theme-font icon20" style="margin-right:5px;cursor:pointer;"></i>-->
                            <i @click="deleteFile(scope.row,scope.$index)" :title="l('{global.delete}')"
                               class="el-icon-delete theme-font icon20"
                               style="margin-right:5px;cursor:pointer;"></i>
                            <i @click="showMoveDialog('MOVE',scope.row)" :title="l('{global.move}')"
                               class="el-icon-rank theme-font icon20" style="margin-right:5px;cursor:pointer;"></i>
                            <i @click="showMoveDialog('COPY',scope.row)" :title="l('{global.copy}')"
                               class="el-icon-tickets theme-font icon20" style="margin-right:5px;cursor:pointer;"></i>
                            <i @click="renameRow(scope.row)" :title="l('{global.rename}')"
                               class="el-icon-edit-outline theme-font icon20"
                               style="margin-right:5px;cursor:pointer;"></i>

                            <i @click="download(scope.row)" :title="l('{global.download}')"
                               class="el-icon-download theme-font icon20"
                               style="margin-right:5px;cursor:pointer;"></i>





                            <span @click="queryDirPermission(scope.row)" v-if="module=='DIR_MANAGE'"
                                  :title="l('{global.permission}')"
                                  class="theme-font svg20 scale09" style="margin-right:5px;cursor:pointer;">
                                <svg :fill="$store.state.GLOBAL_COLOR" t="1520321865568" class="svg100" style=""
                                     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     p-id="1076" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs></defs><path
                                        d="M17.077445 199.562105l646.88506 0c1.039679 0 2.051729-0.107447 3.040243-0.285502 7.791453 39.065737 42.263569 68.509327 83.620489 68.509327 41.256636 0 75.668377-29.29828 83.569324-68.222801l172.267459 0c9.419534 0 17.055444-7.635911 17.055444-17.055444s-7.635911-17.055444-17.055444-17.055444L834.193585 165.452239c-7.90197-38.924521-42.312688-68.222801-83.569324-68.222801-41.35692 0-75.829036 29.442566-83.620489 68.509327-0.98749-0.178055-2.000564-0.285502-3.040243-0.285502L17.077445 165.453263c-9.419534 0-17.055444 7.635911-17.055444 17.055444S7.657912 199.562105 17.077445 199.562105zM750.623237 131.338281c28.258601 0 51.167357 22.908756 51.167357 51.167357s-22.908756 51.167357-51.167357 51.167357c-28.258601 0-51.167357-22.908756-51.167357-51.167357S722.364637 131.338281 750.623237 131.338281z"
                                        p-id="1077"></path><path
                                        d="M1006.461043 540.677133 390.74282 540.677133c-7.90197-38.924521-42.312688-68.222801-83.569324-68.222801-41.256636 0-75.668377 29.29828-83.569324 68.222801L17.077445 540.677133c-9.419534 0-17.055444 7.635911-17.055444 17.055444 0 9.419534 7.635911 17.055444 17.055444 17.055444l206.525704 0c7.90197 38.924521 42.312688 68.222801 83.569324 68.222801 41.256636 0 75.667354-29.29828 83.569324-68.222801l615.718223 0c9.419534 0 17.055444-7.635911 17.055444-17.055444C1023.516488 548.314067 1015.880577 540.677133 1006.461043 540.677133zM307.173496 608.900957c-28.258601 0-51.167357-22.908756-51.167357-51.167357s22.908756-51.167357 51.167357-51.167357c28.258601 0 51.167357 22.908756 51.167357 51.167357S335.432097 608.900957 307.173496 608.900957z"
                                        p-id="1078"></path><path
                                        d="M1006.461043 881.793184 834.193585 881.793184c-7.90197-38.924521-42.312688-68.222801-83.569324-68.222801-41.256636 0-75.667354 29.29828-83.569324 68.222801L17.077445 881.793184c-9.419534 0-17.055444 7.635911-17.055444 17.055444 0 9.419534 7.635911 17.055444 17.055444 17.055444l649.976468 0c7.90197 38.924521 42.312688 68.222801 83.569324 68.222801 41.256636 0 75.668377-29.29828 83.569324-68.222801l172.267459 0c9.419534 0 17.055444-7.635911 17.055444-17.055444C1023.516488 889.430118 1015.880577 881.793184 1006.461043 881.793184zM750.623237 950.017008c-28.258601 0-51.167357-22.908756-51.167357-51.167357 0-28.258601 22.908756-51.167357 51.167357-51.167357 28.258601 0 51.167357 22.908756 51.167357 51.167357C801.790594 927.108253 778.882861 950.017008 750.623237 950.017008z"
                                        p-id="1079"></path></svg>



                            </span>
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            :label="l('table.updateTime')"
                            width="240">
                        <template slot-scope="scope">
                        <span>
                            {{JZY.u.formatTime(scope.row.updateDate)}}
                        </span>
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--:label="l('table.fileCount')"-->
                            <!--show-overflow-tooltip>-->
                        <!--<template slot-scope="scope">-->
                            <!--<span v-if="scope.row.isDir">{{scope.row.totalFileCount||scope.row.fileCount||0}}</span>-->

                        <!--</template>-->
                    <!--</el-table-column>-->
                    <el-table-column
                            width="130"
                            :label="l('table.space')"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span style="margin-right:20px;">{{scope.row.isDir?'--':bytesToSize((scope.row.fileSize||scope.row.totalFileSize||0))}}</span>

                        </template>
                    </el-table-column>
                    <el-table-column label="">
                        <template slot-scope="scope">
                            <i v-if="!scope.row.isDir" @click="addToMyFavorite(scope.row)"
                               class="el-icon-star-on icon20"
                               style="cursor:pointer;"
                               :title="l('addToMyFavorite')"
                               :style="{display:!scope.row.isHover&&!scope.row.isMyFavorite?'none':'inline-block',color:scope.row.isMyFavorite?$store.state.GLOBAL_COLOR:'#8182a2'}"></i>
                        </template>
                    </el-table-column>
                </el-table>


                <el-pagination
                        style="    display: inline-block;
    float: right;"

                        v-if="tableData.length>0"
                        layout="total, sizes, prev, pager, next, jumper"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-count="pageData.pageCount"
                        :total="pageData.total">
                </el-pagination>
            </div>
        </div>
        <div :id="wrapperId+'picker'" style="width:0.5px;height:0.5px;opacity:0;pointer-events: none;">选择大文件</div>
    </div>


</template>
<script>
    JZY.locale.add('netDiskLocale', require('../netDisk/netDisk.locale'))
    import CryptoJS from '@/components/Crypto.js'
    import rowIcon from '../netDisk/netDisk.rowIcon'
    // import netDiskCommon from '../netDisk/netDisk.common.vue'


    import previewFile from '../netDisk/previewFile.vue'

    console.log('CryptoJS--:', CryptoJS)


    // import service from './netDisk.service'
    import fileTransferManager from '@fileTransfer'

    let $t = JZY.locale.$t

    export default {
        components:{
            rowIcon,
            previewFile
        },
        // mixins:[netDiskCommon],
        beforeDestroy() {
            window.WebUploader.Uploader.unRegister('personalNetDisk')
            this.uploader.destroy()
        },
        props: {
            module: String,
            projectId: {
                type:[String, Number],
                default:null
            },
            breadMenuPath: {
                type: String,
                default: ''
            },
            pageData: Object
        },
        methods: {
            async handleUploadingWrapperClose(){

                JZY.s.isUploadingFiles && (await JZY.u.warningMsg('存在待传的文件，你确定要放弃上传吗?',true))

                this.uploader.reset();
                this.uploadFilesList=[];
                this.hasEverChoosedFile=false
            },
            handleSizeChange(count){

                this.pageCount=count
                this.currentPage=1;
                this.reloadCurrentList()
            },
            querySpace(){
                JZY.xhr.r({
                    tye: 'post',
                    url: '/disk/personalFile/queryDiskSpace'
                }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                    .then(([res]) => {
                        this.spaceUsage = res


                        this.isDiskInited = !isNaN(res.space - 0)
                        !this.isDiskInited && JZY.u.warningMsg(JZY.locale.$t('diskNotInited'))
                    })
                // /disk/personalFile/queryDiskSpace
            },
            windowOpen(url){

                if(JZY.IS_CC){
                    window.parent.JCC.p.webIframeDownload(url)
                }else{
                    window.open(url)
                }
            },
            handleSearchContentChange() {
                let str = this.searchContent.trim()

                if (str == '') {
                    this.reloadCurrentList()
                } else {
                    this.currentPage = 1;
                    this.reloadCurrentList(null, str)
                }

            },
            queryDirPermission(row) {

                this.mkdirViewType = 'DETAIL'
                this.mkdirVisible = true
                JZY.xhr.r({
                    url: '/disk/diskCompanyFileDirectory/viewDirectoryAuthorize/' + row.sid,
                    type: 'post'
                })
                    .then(([res]) => {


                        // projectId:this.projectId||null,
                        //     remark:'',
                        //     parentId:null,
                        //     fileName:'',
                        //     userAuthorizeList:[
                        //     {
                        //         editable:false,
                        //         userId:this.$store.state.session.sid,
                        //         name:this.$store.state.session.name,
                        //         orgType:1,
                        //         authorizeList:[{authorizeId:true},{authorizeId:true},{authorizeId:true},{authorizeId:true}]
                        //     }
                        // ]

                        res.projectId = this.projectId || null;

                        res.userAuthorizeList.forEach((item) => {

                            item.name = item.userName
                            item.editable = false
                            let authorizeList = item.authorizeList

                            authorizeList.forEach((authorizeItem) => {
                                authorizeItem.authorizeId = Number.isInteger(item.authorityGroupId)
                            })

                        })

                        this.mkdirForm = res


                    })
            },
            download(row) {


                let openedUrl =
                    JZY.xhr.transformUrl('/disk/personalFile/downLoadByFileId?fileId=' + row.sid + '&' + JZY.s.getAccessTokenByAuthorization()
                        , 'GLOBAL.GATEWAY.YI_FEI_HU', false)

                console.log('opened url--:', openedUrl)

                this.windowOpen(openedUrl)

                // JZY.xhr.r({
                //     type:'get',
                //     url:'/disk/diskCompanyFile/downLoadByFileId?fileId='+row.sid
                // },'GLOBAL.GATEWAY.YI_FEI_HU')

            },
            handleCurrentChange(page) {

                this.currentPage = page

                this.reloadCurrentList(null,this.searchContent.trim())


            },
            reloadCurrentList(page, str) {
                page = page || this.currentPage
                this.$emit('openDir', this.currentDirRow, this.breadMenuPathArr, this.breadMenuPathArr.length - 1, this.currentPage, str,()=>{
                    this.isSearchedResult=(str||'').trim()!=''
                    // console.log('reload current list was invoked finish')
                })
            },
            downloadSelectedFiles() {


                let openedUrl =
                    JZY.xhr.transformUrl('/disk/personalFile/downLoadByFileIds?fileIds='
                        + (this.selectedFileIds.toString()) + '&' + JZY.s.getAccessTokenByAuthorization()
                        , 'GLOBAL.GATEWAY.YI_FEI_HU', false)


                console.log('opened url--:', openedUrl)

                this.windowOpen(openedUrl)


                // JZY.u.infoMsg(JZY.locale.$t('confirmSelectedFiles'),true)
                //     .then(()=>{
                //         JZY.xhr.r({
                //             type:'post',
                //             url:'/disk/diskCompanyFile/deleteSelectFile',
                //             data:this.selectedFileIds
                //         })
                //             .then(([res])=>{
                //
                //
                //                 this.reloadCurrentList(1)
                //             })
                // })
            },
            deleteSelectedFiles() {

                JZY.u.infoMsg(JZY.locale.$t('confirmSelectedFiles'), true)
                    .then(() => {
                        JZY.xhr.r({
                            type: 'post',
                            url: '/disk/diskCompanyFile/deleteSelectFile',
                            // url: '/disk/diskCompanyFile/deleteSelectFile',
                            data: this.selectedFileIds
                        })
                            .then(([res]) => {


                                this.reloadCurrentList(1)
                                this.querySpace()
                            })
                    })


            },
            removeFile(row, index) {


                let removeAction = () => {
                    this.uploader.removeFile(row.file, true)
                    this.uploadFilesList.splice(index, 1)
                    console.log('remove file row and index:', row, index, this.uploadFilesList)
                }

                if (row.progress < 100 && row.errorMsg == '') {
                    JZY.u.infoMsg(JZY.locale.$t('confirmRemoveUploadingFile'), true)
                        .then(() => {
                            removeAction()
                        })
                } else {
                    removeAction()
                }


            },
            handleUploadError() {
                this.uploadFilesList.forEach((item) => {
                    if (item.progress < 100 && (item.isFlashUploadComplete)){
                        this.uploader.cancelFile(item.file);
                        item.errorMsg = JZY.locale.$t('{g.networkError}')
                    }
                })
            },
            bytesToSize(bytes) {
                var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return '0 KB';
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                var res=(bytes / Math.pow(1024, i))
                if(i==0){
                    res=(res/1024).toFixed(1);
                    if(res==0){
                        res=0
                    }
                    return res+'KB'
                }
                return res.toFixed(1) + sizes[i];
            },
            getFileInput() {
                return jQuery(document.querySelector('.webuploader-pick')).next().get(0).querySelector('[type=file]');
            },
            openOSFilePicker() {
                this.getFileInput().click()
            },
            addNewFolderPermissionRow() {

                this.mkdirForm.userAuthorizeList.push({
                    editable: true,
                    userId: null,
                    name: null,
                    orgType: 1,
                    authorizeList: [{authorizeId: true}, {authorizeId: true}, {authorizeId: false}, {authorizeId: false}]
                })


                // mkdirForm:{
                //     remark:'',
                //         fileName:'',
                //         userAuthorizeList:[
                //         {
                //             editable:false,
                //             userId:this.$store.state.session.sid,
                //             name:this.$store.state.session.name,
                //             orgType:1,
                //             authorizeList:[{authorizeId:true},{authorizeId:true},{authorizeId:true},{authorizeId:true}]
                //         }
                //     ]
                // },


            },
            getDirId() {
                return this.breadMenuPathArr[this.breadMenuPathArr.length - 1].sid
            },
            handleMkdirDialogOpen() {

                this.mkdirForm.fileName=''
                this.mkdirForm.parentId = this.getDirId()

                this.$nextTick(() => {
                    let wrapper = this.$refs.mkdirForm.$el,
                        objs = wrapper.querySelectorAll('th'),
                        index = objs.length - 2,
                        th = objs[index]


                    if (th) {
                        th.style.fontSize = '24px'
                        th.style.cursor = 'pointer'
                        th.removeEventListener('click', this.addNewFolderPermissionRow)
                        th.addEventListener('click', this.addNewFolderPermissionRow)
                    }


                })
            },
            deleteFolderPermission({$index, row}) {


                this.mkdirForm.userAuthorizeList.splice($index, 1)

                // let rowCount=this.mkdirForm.userAuthorizeList.length
                //   if(rowCount==1 && $index==0){
                //
                //   }
            },
            getDataFromGroupTree(selectedIds) {


                let d = JZY.u.computedMap({
                    selectedIds: selectedIds,
                    orgType: 'null dept role user'.split(' ').indexOf(this.$refs.groupTree.addButton),
                    authorizeList: this.mkdirForm.userAuthorizeList[this.mkdirForm.userAuthorizeList.length - 1].authorizeList,
                    userAuthorizeList: this.mkdirForm.userAuthorizeList,
                    selectedArr: (p) => selectedIds[Object.keys(selectedIds)[p.orgType - 1]]
                })


                console.log('d--:', d);


                if (!d.selectedArr.length) {
                    return false
                }


                this.mkdirForm.userAuthorizeList.splice(this.mkdirForm.userAuthorizeList.length - 1, 1)

                d.selectedArr.forEach((item) => {
                    console.log("item---:", item)
                    this.mkdirForm.userAuthorizeList.push({
                        editable: false,
                        userId: item.sid || item.roleId,
                        name: item.name || item.roleName,
                        orgType: d.orgType < 2 ? d.orgType : (2 + 3 - d.orgType),
                        // orgType:'dept user role'.split(' ').indexOf(d.orgType-1),
                        authorizeList: JZY.u.copy(d.authorizeList)
                    })
                })

                this.addNewFolderPermissionRow()


            },
            submitMkdir() {


                let d = JZY.u.copy(this.mkdirForm),
                    parentId = this.getDirId()


                let body = {
                    // parentId:parentId,
                    fileFullName: d.fileName
                }
                if (parentId) {
                    body.parentId = parentId
                }


                // if(parentId){
                //
                //
                //     d={
                //         parentId:parentId,
                //         fileName:d.fileName,
                //         projectId:this.projectId||null
                //     }
                //
                // }else{
                //     d.userAuthorizeList.forEach((list)=>{
                //         list.authorizeList.forEach((obj,index)=>{
                //             obj.authorizeId=obj.authorizeId==true?(index+1):''
                //         })
                //     })
                // }
                //
                //
                //
                //
                //
                // console.log('submit mkdir d---:',d)
                //
                //
                //
                //
                // if(this.mkdirForm.userAuthorizeList.length>0){
                //     if(this.mkdirForm.userAuthorizeList[this.mkdirForm.userAuthorizeList.length-1].editable){
                //         d.userAuthorizeList.splice(d.userAuthorizeList.length-1,1)
                //     }
                // }


                this.$refs.mkdirForm.validate((valid) => {
                    if (valid) {


                        // let url
                        // if(this.mkdirViewType=='ADD'){
                        //     url=parentId?'/disk/diskCompanyFile/createMyFolder':'/disk/diskCompanyFileDirectory/createCompanyFolder'
                        // }else{
                        //     url='/disk/disk/diskCompanyFileDirectory/editDirectoryAuthorize/'+d.fileId
                        // }


                        JZY.xhr.r({
                            type: 'post',
                            url: '/disk/personalFile/newDirectory',
                            // url:url,
                            data: body
                        }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                            .then(([res]) => {


                                this.mkdirVisible = false
                                JZY.u.successMsg(JZY.locale.$t('{g.operateSuccess}'))


                                this.reloadCurrentList()

                            })

                    }
                })
            },
            // preview file
            handleFileClick(row) {


                if (row.isDir) {
                    this.currentDirRow = row
                    this.$emit('openDir', row, this.breadMenuPathArr)
                } else {
                    this.$refs.previewFile.preview(row,'PERSONAL')

                    // let imgTypes = 'jpg jpeg png gif'.split(' '),
                    //     htmlTypes='xls xlsx txt'.split(' ');
                    // let supportedExts = "pdf doc ppt docx pptx".split(' ').concat(imgTypes).concat(htmlTypes),
                    //     extName=(row.fileFullName || row.fileName).split(".").reverse()[0],
                    //     // extName = row.fileExtendName,
                    //     isImg = imgTypes.includes(extName),
                    //     isHtml = htmlTypes.includes(extName)
                    //
                    // if (supportedExts.includes(extName)) {
                    //     let maxFileMB = 10
                    //     if (row.totalFileSize > maxFileMB * 1024 * 1024) {
                    //         JZY.u.warningMsg(JZY.locale.$t('previewFileTooLarge', maxFileMB))
                    //         return false
                    //     }
                    //
                    //     this.isPreviewImg = isImg
                    //
                    //
                    //     this.previewFileDialogVisible = true
                    //     this.isLoadingPreview = true
                    //
                    //     if (isImg) {
                    //         this.previewFileDialogVisible = true
                    //         this.isLoadingPreview = true
                    //     } else {
                    //         row.isLoading = true
                    //     }
                    //
                    //
                    //     // this.previewFileDialogVisible=true
                    //     // this.isLoadingPreview=true
                    //
                    //
                    //     let $ = jQuery
                    //
                    //     JZY.xhr.r([
                    //         // {
                    //         //     url:location.origin+'/static/pdf-js/build/pdf.js',
                    //         //     headers:{
                    //         //         'Content-Type':'application/javascript; charset=UTF-8'
                    //         //     }
                    //         // },
                    //         // {
                    //         //     url:location.origin+'/static/pdf-js/web/viewer.js',
                    //         //     headers:{
                    //         //         'Content-Type':'application/javascript; charset=UTF-8'
                    //         //     }
                    //         // },
                    //         {
                    //             type: 'post',
                    //             url: '/disk/personalFile/previewByFileId/' + row.sid,
                    //             // url:'/disk/diskCompanyFile/previewByFileId/'+row.sid,
                    //             settings: {
                    //                 timeout: '60*1000'
                    //             }
                    //
                    //         }
                    //     ], 'GLOBAL.GATEWAY.YI_FEI_HU')
                    //         .then(([res]) => {
                    //
                    //
                    //             console.log('preview pdf then')
                    //             this.isLoadingPreview = false
                    //
                    //             if (isImg) {
                    //
                    //
                    //                 this.previewFileSrc = res
                    //             } else {
                    //
                    //                 // this.previewFileSrc=res
                    //
                    //                 this.previewFileSrc = isHtml?res:('/static/pdf-js/viewer.html?url=' + window.encodeURIComponent(res) +
                    //                     // this.previewFileSrc='/static/pdf-js/viewer.html?url='+window.encodeURIComponent('http://192.168.3.94/group1/M00/00/00/wKgDXlrdjWCAaJJ5ABFHNegHDBM631.pdf')+
                    //                     '&name=' + row.fileName)
                    //                 row.isLoading = false
                    //
                    //                 // this.windowOpen(this.previewFileSrc)
                    //             }
                    //
                    //
                    //             // http://localhost:8084/static/pdf-js/viewer.html?url=http%3A%2F%2Flocalhost%3A8084%2Fstatic%2Fpdf-js%2Ftest.pdf&name=123
                    //             console.log('pdf res--:', res)
                    //
                    //         })
                    //         .catch(() => {
                    //             row.isLoading = false
                    //             this.isLoadingPreview = false
                    //         })
                    //
                    //
                    //     // jQuery.getScript('/static/pdf-js/build/pdf.js',cb)
                    //     // jQuery.getScript('/static/pdf-js/web/viewer.js',cb)
                    //
                    //
                    // }


                }
            },
            handleTreeOpen() {
                try {
                    this.$refs.treeGrid.clearCheckedNodes()
                    this.$refs.treeGrid.getRealData().forEach((item) => {
                        item.$extra.disabled = this.movingRowId == item.sid
                    })
                } catch (e) {
                }


            },
            handleTreeSubmit() {
                let tree = this.$refs.treeGrid,
                    checkedNode = tree.getCheckedNodes()[0],
                    sid = checkedNode.sid
                console.log("checked nodes-:", checkedNode)


                JZY.xhr.r({
                    type: 'post',
                    url: {
                        'COPY': '/disk/personalFile/copy',
                        'MOVE': '/disk/personalFile/move'
                        // 'MOVE': '/disk/diskCompanyFile/moveFile'
                    }[this.movingType],
                    data: {
                        // copyFileId:this.movingRowId,

                        [this.movingType == 'COPY' ? 'copyFileId' : 'fileId']: this.movingRowId,


                        [this.movingType == 'COPY' ? 'pasteDirectoryId' : 'directoryId']: sid
                        // [this.movingType.toLowerCase()+'DirectoryId']:sid
                        // pasteDirectoryId:
                        // fileId:this.movingRowId,
                        //目录id
                        // [this.movingType.toLowerCase()+'FileId']:sid
                    }
                }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                    .then(() => {

                        this.reloadCurrentList()
                        this.querySpace()

                        // if (this.movingType == 'MOVE' && (this.currentDirRow.sid!=sid)) {
                        //     this.tableData.splice(this.tableData.findIndex((item) => item.sid == this.movingRowId), 1)
                        // }

                        JZY.u.successMsg(JZY.locale.$t('{g.operateSuccess}'))


                        this.moveDialogVisible = false
                    })

            },
            remoteLoadFun(row, index) {


                console.log('row--:', row)

                return JZY.xhr.r({
                    type: 'post',
                    url: '/disk/personalFile/queryTree',
                    data: {
                        parentId: row.sid
                    }
                }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                    .then(([res]) => {
                        console.log('res--:', res)


                        this.$refs.treeGrid.insertChildRows(index, res)

                    })
            },
            showMoveDialog(type, row) {


                this.movingType = type;
                this.movingRowId = row.sid;
                this.moveDialogTitle = JZY.locale.$t(`{g.${type.toLowerCase()}}{g.to}`)

                this.moveDialogVisible = true
                JZY.xhr.r({
                    type: 'post',
                    url: '/disk/personalFile/queryTree',
                    data: {
                        parentId: ''
                    }
                }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                    .then(([res]) => {

                        this.dirTree = res

                    })
            },
            deleteFile(row, index) {


                this.$confirm(JZY.locale.$t('confirmDelete'), JZY.locale.$t('{g.dialogTitles.info}'), {
                    confirmButtonText: $t('{g.buttons.confirm}'),
                    cancelButtonText: $t('{g.buttons.cancel}'),
                    type: 'warning'
                }).then(() => {


                    JZY.xhr.r({
                        type: 'post',
                        url: '/disk/personalFile/delete',
                        data: {
                            sid: row.sid
                        }
                        // headers:{
                        //     'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                        // },
                        // url: !row.isDir?`/disk/diskCompanyFile/deleteFile/${row.sid}`:`/disk/diskCompanyFileDirectory/deleteDirectory/${row.sid}`
                    }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                        .then(([res]) => {

                            this.tableData.splice(index, 1)
                            console.log("delete res--:", res);
                            this.$message({
                                type: 'info',
                                message: $t('deleteSuccess') + '[' + (row.fileName) + ']'
                            });
                            this.querySpace()
                        })


                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            handleDirChooseSubmit(nodes) {
                this.JZY.u.infoMsg('你选择了' + nodes[0].orgName)
                this.$refs.treeGrid.closeDialog()
            },
            addToMyFavorite(row) {


                JZY.xhr.r({
                    type: 'post',
                    url: '/disk/personalFavorite/' + (row.isMyFavorite ? 'unCollectFile' : 'collectFile') + '/' + row.sid
                }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                    .then(() => {
                        row.isMyFavorite = !row.isMyFavorite
                    })


            },
            handleMouseEnter(row) {
                row.isHover = true
            },
            handleMouseLeave(row) {
                row.isHover = false
            },
            renameRow(row) {
                row.renameMode = true;
                this.newFileName = row.fileFullName || row.fileName;
                row.fileExtendName=(row.fileFullName || row.fileName).split(".").reverse()[0]
                // this.newFileName = row.fileName;
            },
            rename(row) {
                if(this.newFileName.length>100){
                    JZY.u.warningMsg('名称最长为100个字符')
                    return false
                }
                JZY.xhr.r({
                    type: 'post',
                    url: '/disk/personalFile/rename',
                    // url:JZY.u.computedMap({
                    //     'MY_FILE':'/disk/diskCompanyFile/renameFile',
                    //     'RECENTLY': (p) => p.MY_FILE,
                    //     'DIR_MANAGE':'/disk/diskCompanyFileDirectory/renameDirectory'
                    // })[this.module],
                    // url: row.isDir?'/disk/diskCompanyFile/renameDirectory':'/disk/diskCompanyFile/renameFile',
                    data: {
                        sid: row.sid,
                        // fileId: row.sid,
                        fileFullName: this.newFileName
                        // fileName: this.newFileName
                    }
                }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                    .then(([res]) => {

                        row.renameMode = false
                        if (row.isDir) {
                            row.fileName = this.newFileName;
                            row.fileFullName = this.newFileName;
                        } else {
                            row.fileFullName = this.newFileName;
                        }

                        this.newFileName = ''
                        this.$message({
                            type: 'info',
                            message: $t('renameSuccess')
                        });
                    })

                // row.fileName=this.newFileName;
                // this.newFileName=''
                //   row.renameMode=false
            },
            handleSelectionChange(val) {
                this.selectedFiles = val;
                this.selectedFileIds = val.map((item) => item.sid)

                console.log("this.selectedFiles--:", this.selectedFiles, this.selectedFileIds)


            },
            startUpload() {
                JZY.s.isUploadingFiles=true
                this.hasEverChoosedFile=true
                this.isUploadDialogMaxMode=true
                this.uploader.upload();
            }
        },
        updated() {

        },
        created() {
            this.querySpace()

        },
        async mounted() {


            await JZY.s.getScript('/static/web-uploader/webuploader.js')

            var self = this,
                chunkSize = 2 * 1024 * 1024,
                uploader,
                fileHashCode,
                guid

            WebUploader.Uploader.register(
            //     {
            //     'before-send-file': 'beforeSendFile',
            //     'before-send': 'beforeSend',
            //     'init': 'init'
            // },
                {

                    name:'personalNetDisk',



                    'before-send-file':
                    // JZY.u.debounce(
                        function (file) {
                            // beforeSendFile: JZY.u.debounce(function (file) {

                            var task = new jQuery.Deferred(), md5Defer;

                            // setTimeout(()=>{
                            console.log("file in before send file---:", file, self.uploadFilesList, self.uploadFilesList.length)

                            let row = self.uploadFilesList.find((item) => item.file === file)

                            try{
                                row.infoMsg = JZY.locale.$t('calculatingMd5')
                            }catch(e){
                                console.warn('before send file e---:',e)
                                // JZY.u.warningMsg(JZY.locale.$t('{g.sorryToMyBossWhenBugComes}'),false,6000)

                                return false
                            }



                            // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。



                            console.log('kcuf_u file--:',file)


                            // if(file.name.length>1){
                            //     JZY.u.warningMsg('文件名最长为100个字符')
                            //     // setTimeout(()=>{
                            //         uploader.skipFile(file);
                            //         uploader.removeFile(file);
                            //         task.reject()
                            //     // })
                            //
                            //     return false
                            // }

                            // 根据文件内容来查询MD5
                            md5Defer = uploader.md5File(file).progress(function (percentage) {
                                // console.log('md5 Percentage:', percentage);
                                row.md5Progress = Math.round(percentage * 100)
                                row.infoMsg = JZY.locale.$t('calculatingMd5') + '   (' + row.md5Progress + '%)'


                            })
                            md5Defer.then(function (val) { // 完成
                                console.log('md5 result:', val);
                                // document.getElementById('sha_256_output').value=CryptoJS.SHA256(val);
                                fileHashCode = CryptoJS.SHA256(val).toString()

                                console.log('fileHashCode-:', fileHashCode)


                                // console.log(fileHashCode);
                                // 模拟用户id
                                // file.uid = new Date().getTime() + "_" + Math.random() * 100;
                                guid = WebUploader.Base.guid();
                                row.infoMsg = ''

                                console.log('rucku rowww--:', row)


                                JZY.xhr.r({
                                    type: 'post',
                                    url: '/disk/personalFile/isFileHashCodeExist',
                                    // headers: {
                                    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                    // },
                                    data: {
                                        size: file.size,
                                        parentId: self.getDirId()-0==0?'root':(self.getDirId()) ,
                                        fileHashCode: fileHashCode,
                                        "name": file.name
                                    }
                                }, 'GLOBAL.GATEWAY.LV_JIE')
                                    .then(([data]) => {
                                        // row.tempPath=data.tempPath
                                        file.tempPath=data.tempPath

                                        if (data.ifFileHashCodeExist == true) {
                                            uploader.skipFile(file);
                                            uploader.removeFile(file);
                                            row.progress = 100
                                            row.infoMsg = '闪传完成'
                                            row.isFlashUploadComplete=true


                                            task.reject();
                                        }else{
                                            task.resolve()
                                        }




                                        console.log('flash upload data--:', data)
                                    })
                                    .catch((e) => {

                                        //没有可用空间
                                        if(e.status==1328){
                                            self.uploader.stop(true)
                                        }
                                        // console.warn('kcuf_u flash e---:',e)

                                        task.reject();
                                        self.handleUploadError()
                                    })

                                // jQuery.ajax({
                                //     type: 'POST',
                                //     url: "../../disk/disk/diskCompanyFile/isFileHashCodeExist" ,
                                //     dataType: "json",
                                //     data: {fileSize: file.size, fileHashCode: fileHashCode,"originalFilename": file.name}, //data: {key:value},
                                //     headers : {'Authorization':'Bearer 81f0a167-7d29-4eae-8272-8d582a41ce1d'},
                                //     success: function(data){
                                //         if (!data.result ||data.result.code == 'fileHashCodeExist') {
                                //             console.log("服务器上已经有同样的文件了，开始秒传！");
                                //             uploader.removeFile(file, true);
                                //             $('#' + file.id).find('p.state').text('已上传');
                                //             $('#' + file.id).find(".progress").find(".progress-bar").attr("class", "progress-bar progress-bar-success");
                                //             $('#' + file.id).find(".info").find('.btn').fadeOut('slow');//上传完后删除"删除"按钮
                                //             $("#StopBtn").fadeOut('slow');
                                //         } else if(data.result.code == 'upChunks'){
                                //             var upChunks = resData.result.chunks;
                                //             console.log("已存在分块：[" + upChunks +"]，开始续传");
                                //         }else{
                                //             console.log("服务器上没有同样的文件，秒传失败！");
                                //         }
                                //     },
                                // });


                                // task.resolve();

                            });
                            // })


                            return jQuery.when(task);
                        },


                // 'before-send-file': function (file) {
                // // beforeSendFile: function (file) {
                //
                //     var task = new jQuery.Deferred(), md5Defer;
                //
                //     // setTimeout(()=>{
                //         console.log("file in before send file---:", file, self.uploadFilesList, self.uploadFilesList.length)
                //
                //         let row = self.uploadFilesList.find((item) => item.file === file)
                //
                //         try{
                //             row.infoMsg = JZY.locale.$t('calculatingMd5')
                //         }catch(e){
                //             console.warn('before send file e---:',e)
                //             // JZY.u.warningMsg(JZY.locale.$t('{g.sorryToMyBossWhenBugComes}'),false,6000)
                //
                //             return false
                //         }
                //
                //         // Deferred对象在钩子回掉函数中经常要用到，用来处理需要等待的异步操作。
                //
                //         // 根据文件内容来查询MD5
                //         md5Defer = uploader.md5File(file).progress(function (percentage) {
                //             // console.log('md5 Percentage:', percentage);
                //             row.md5Progress = Math.round(percentage * 100)
                //             row.infoMsg = JZY.locale.$t('calculatingMd5') + '   (' + row.md5Progress + '%)'
                //
                //
                //         })
                //         md5Defer.then(function (val) { // 完成
                //             console.log('md5 result:', val);
                //             // document.getElementById('sha_256_output').value=CryptoJS.SHA256(val);
                //             fileHashCode = CryptoJS.SHA256(val).toString()
                //
                //             console.log('fileHashCode-:', fileHashCode)
                //
                //
                //             // console.log(fileHashCode);
                //             // 模拟用户id
                //             // file.uid = new Date().getTime() + "_" + Math.random() * 100;
                //             guid = WebUploader.Base.guid();
                //             row.infoMsg = ''
                //
                //             console.log('rucku rowww--:', row)
                //
                //
                //             JZY.xhr.r({
                //                 type: 'post',
                //                 url: '/disk/personalFile/isFileHashCodeExist',
                //                 // headers: {
                //                 //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                //                 // },
                //                 data: {
                //                     size: file.size,
                //                     parentId: self.getDirId() - 0,
                //                     fileHashCode: fileHashCode,
                //                     "name": file.name
                //                 }
                //             }, 'GLOBAL.GATEWAY.YI_FEI_HU')
                //                 .then(([data]) => {
                //
                //                     // row.tempPath=data.tempPath
                //                     file.tempPath=data.tempPath
                //                     if (data.ifFileHashCodeExist == true) {
                //                         uploader.skipFile(file);
                //                         uploader.removeFile(file);
                //                         row.progress = 100
                //                         row.infoMsg = '闪传完成'
                //                         row.isFlashUploadComplete=true
                //
                //                         task.reject();
                //                     }else{
                //                         task.resolve()
                //                     }
                //
                //
                //                     console.log('flash upload data--:', data)
                //                 })
                //                 .catch((e) => {
                //                     //没有可用空间
                //                     if(e.status==1328){
                //                         self.uploader.stop(true)
                //                     }
                //                     task.reject();
                //                     self.handleUploadError()
                //                 })
                //
                //             // jQuery.ajax({
                //             //     type: 'POST',
                //             //     url: "../../disk/disk/diskCompanyFile/isFileHashCodeExist" ,
                //             //     dataType: "json",
                //             //     data: {fileSize: file.size, fileHashCode: fileHashCode,"originalFilename": file.name}, //data: {key:value},
                //             //     headers : {'Authorization':'Bearer 81f0a167-7d29-4eae-8272-8d582a41ce1d'},
                //             //     success: function(data){
                //             //         if (!data.result ||data.result.code == 'fileHashCodeExist') {
                //             //             console.log("服务器上已经有同样的文件了，开始秒传！");
                //             //             uploader.removeFile(file, true);
                //             //             $('#' + file.id).find('p.state').text('已上传');
                //             //             $('#' + file.id).find(".progress").find(".progress-bar").attr("class", "progress-bar progress-bar-success");
                //             //             $('#' + file.id).find(".info").find('.btn').fadeOut('slow');//上传完后删除"删除"按钮
                //             //             $("#StopBtn").fadeOut('slow');
                //             //         } else if(data.result.code == 'upChunks'){
                //             //             var upChunks = resData.result.chunks;
                //             //             console.log("已存在分块：[" + upChunks +"]，开始续传");
                //             //         }else{
                //             //             console.log("服务器上没有同样的文件，秒传失败！");
                //             //         }
                //             //     },
                //             // });
                //
                //
                //             task.resolve();
                //
                //         });
                //     // })
                //
                //
                //     return jQuery.when(task);
                // },


                'before-send': function (block) {
                // beforeSend: function (block) {


                    console.log(block)
                    var task = new jQuery.Deferred();
                    var file = block.file;
                    var missChunks = file.missChunks;
                    var blockChunk = block.chunk;
                    console.log("当前分块：" + blockChunk);
                    console.log("missChunks:" + missChunks);


                    if (missChunks !== null && missChunks !== undefined && missChunks !== '') {
                        var flag = true;
                        for (var i = 0; i < missChunks.length; i++) {
                            if (blockChunk == missChunks[i]) {
                                console.log(file.name + ":" + blockChunk + ":还没上传，现在上传去吧。");
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            task.reject();
                        } else {
                            task.resolve();
                        }
                    } else {
                        task.resolve();
                    }
                    return jQuery.when(task);
                }
            });


            uploader = this.uploader = WebUploader.create({

                // 1592
                duplicate:true,
                pick: {
                    id: '#' + self.wrapperId + 'picker',
                    label: '选择文件'
                },
                maxSelectedFilesCount:5,
                formData: {
                    guid: 0,
                    fileHashCode: '',
                    chunkSize: chunkSize,
                    "Authorization": JZY.c.AUTO_LOGIN.headers.authorization,
                    // "access_token": JZY.c.AUTO_LOGIN.headers.authorization,

                },
                //dnd: '#dndArea',
                //paste: '#uploader',
                swf: '/static/web-uploader/Uploader.swf',
                chunked: true,
                chunkSize: chunkSize, // 字节 1M分块
                threads: 1,
                compress:false,
                resize: false,
                chunkRetry: 0,
                prepareNextFile: false,
                server: JZY.xhr.transformUrl('/disk/personalFile/chunkFileUp', 'GLOBAL.GATEWAY.YI_FEI_HU', false),
                // server: JZY.xhr.transformUrl('/disk/diskCompanyFile/chunkFileUp','GLOBAL.GATEWAY.LV_JIE',false),
                // server: JZY.xhr.transformUrl('/disk/diskCompanyFile/chunkFileUp', 'GLOBAL.GATEWAY.LV_JIE', false),
                auto: false,

                // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                disableGlobalDnd: true,
                // fileNumLimit: 1024,
                // fileSizeLimit: 100 * 1024 * 1024,    // 200 M
                fileSingleSizeLimit: 200 * 1024 * 1024    // 50 M

                // compress:false,
                // resize: false,
                // maxSelectedFilesCount:5,
                // duplicate:true,
                // pick: {
                //     id: '#' + self.wrapperId + 'picker',
                //     label: '选择文件'
                // },
                // formData: {
                //     guid: 0,
                //     fileHashCode: '',
                //     chunkSize: chunkSize,
                //     "Authorization": JZY.c.AUTO_LOGIN.headers.authorization,
                //     // "access_token": JZY.c.AUTO_LOGIN.headers.authorization,
                //
                // },
                // //dnd: '#dndArea',
                // //paste: '#uploader',
                // swf: '/static/web-uploader/Uploader.swf',
                // chunked: true,
                // chunkSize: chunkSize, // 字节 1M分块
                // threads: 1,
                // chunkRetry: 0,
                // prepareNextFile: false,
                //
                // // server: JZY.xhr.transformUrl('/disk/diskCompanyFile/chunkFileUp','GLOBAL.GATEWAY.YI_FEI_HU',false),
                // server: JZY.xhr.transformUrl('/disk/personalFile/chunkFileUp', 'GLOBAL.GATEWAY.YI_FEI_HU', false),
                // auto: false,
                //
                // // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                // disableGlobalDnd: true,
                // // fileNumLimit: 1024,
                // // fileSizeLimit: 100 * 1024 * 1024,    // 200 M
                // fileSingleSizeLimit: 200 * 1024 * 1024    // 50 M
            });


            //当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
            uploader.onUploadBeforeSend = function (obj, data, headers) {
                // setTimeout(()=>{
                    try{

                        console.log('before senddddddddddd--:', arguments)
                        // data.tempPath=self.uploadFilesList.find((item)=>item.file===obj.file).tempPath

                        // alert(obj.file.tempPath)
                        data.tempPath=obj.file.tempPath
                        headers.Authorization = JZY.c.AUTO_LOGIN.headers.authorization;
                        // //console.log("onUploadBeforeSend");
                        // var file = obj.file;
                        data.fileHashCode = fileHashCode || '';
                        data.guid = guid;
                        console.log('kcuf_u string data--:',JSON.stringify(data))

                        // data.parentId=self.getDirId()||''

                        data.parentId = self.getDirId()
                        if (!data.parentId) {
                            delete data.parentId
                        }


                        console.log('ni da yeeeeeeeee')

                        // if(JZY.DEBUG_MODE){
                        //     data.parentId=12
                        // }
                    }catch(e){
                        console.warn('on upload before send eeee---:',e)
                    }
                // })


            };


            uploader.on('uploadProgress', function (file, percentage) {
                // self.$nextTick(()=>{
                    try{
                        console.log('progress fikes len--:', self.uploadFilesList.length, file, percentage)


                        // try{

                        let row = self.uploadFilesList.find((item) => item.file === file)


                        console.log('progress error msg:', row.errorMsg)


                        // self.$nextTick(()=>{
                        if (row.errorMsg != '') {
                            self.handleUploadError()
                        } else {
                            row.progress = Math.max(1, Math.round(percentage * 100) - 1)
                        }
                        // })


                        // }catch(e){
                        //
                        // }
                    }catch(e){
                        console.warn('upload progress e---:',e)
                    }
                // })




            });

            uploader.on('uploadSuccess', function (file, response) {

                let row = self.uploadFilesList.find((item) => item.file === file)


                console.log('upload success--:', response, row)


                // if(self.uploadFilesList.find((item)=>item.file===file)){

                let successFun = () => {
                    row.errorMsg = ''
                    row.progress = 100
                }

                try {
                    if (JZY.xhr.http.settings.isCodeSuccess(response)) {
                        successFun()
                    } else {

                        row.errorMsg = response.msg || response.message
                    }
                } catch (e) {
                    successFun()
                }


                // }


                console.log('upload succcess --:', file, response)
            });
            uploader.on('uploadError', function (file, response) {

                self.handleUploadError()

                if(typeof(response)=='string' && response.trim()=='http'){
                    JZY.xhr.handle401()
                }

                // let row=self.uploadFilesList.find((item)=>item.file===file)
                // row.errorMsg=JZY.locale.$t('{g.networkError}')


                try{
                    console.log('upload error and res--:', file, response, typeof(response), response.toString());
                }catch(e){}



            });

            uploader.on('uploadFinished', function () {

                JZY.s.isUploadingFiles=false
                self.$nextTick(()=>{
                    self.reloadCurrentList()
                    self.querySpace()
                })


            })


            uploader.on('beforeFileQueued', function (file) {
                if (file.size == 0) {
                    JZY.u.warningMsg(JZY.locale.$t('noopSizeFileAdded'))
                }
                if (file.size > self.uploader.options.fileSingleSizeLimit) {
                    JZY.u.warningMsg(JZY.locale.$t('fileSizeTooLarge', self.uploader.options.fileSingleSizeLimit / 1024 / 1024))
                }
                // else {
                //     self.$nextTick(() => {
                //         // self.uploadFilesList.forEach((item)=>{
                //         //     console.log("eached item hash and file hash:",item.file.__hash,file.__hash)
                //         // })
                //
                //
                //         if (self.uploadFilesList.find((item) => ((item.file.__hash != null) && (item.file.__hash === file.__hash)))) {
                //             JZY.u.warningMsg(JZY.locale.$t('{g.upload.selectedFileExistedInList}'))
                //         }
                //     })
                // }
                console.log("before file queued:", arguments)
            })

            uploader.on('fileQueued', function (file) {

                if(file.name.length>100){
                    JZY.u.warningMsg('文件名最长为100个字符')

                    uploader.skipFile(file);
                    uploader.removeFile(file);


                    return false
                }

                self.uploadFilesList.push({
                    file: file,
                    fileSize: file.size,
                    errorMsg: '',
                    infoMsg: '',
                    md5Progress: 0,
                    isFlashUploadComplete:false,
                    progress: 0,
                    paused: false
                })
                self.$nextTick(() => {
                    // self.$nextTick(()=>{
                    //     let maxMB=250
                    //
                    //     if(file.size>maxMB*1024*1024){
                    //         JZY.u.warningMsg("单个文件大小不能超过"+maxMB+"MB");
                    //         return false;
                    //     }




                    self.startUpload()
                    //
                    // console.log('find index---:',self.uploadFilesList.findIndex((item)=>item.file===file))
                    //
                    //
                    // // return false;
                    //
                    //
                    // uploader.md5File(file)
                    // // .progress(function (percentage) {   // 及时显示进度
                    // //     console.log('计算md5进度:', percentage);
                    // //     // getProgressBar(file, percentage, "MD5", "MD5");
                    // // })
                    //     .then(function (val) { // 完成
                    //
                    //
                    //         console.log('md5 result again:', val);
                    //         return false
                    //
                    //
                    //
                    //
                    //
                    //
                    // });
                    // })

                })


            });

            // 文件上传
            // $btn.on('click', function () {
            //     console.log("上传...");
            //     uploader.upload();
            //     console.log("上传成功");
            // });


            // this.$nextTick(()=>{
            //
            // })


            this.JZY.call(this, 'setCurrentVM')


            if (JZY.DEBUG_MODE) {

                if (this.DEBUG_TYPE == 'MKDIR') {
                    try {
                        this.mkdirVisible = true
                        this.handleMkdirDialogOpen();
                        this.addNewFolderPermissionRow()

                        setTimeout(() => {
                            this.$refs.groupTree.openAddDialog('dept')
                        }, 200)

                    } catch (e) {
                        console.warn('e--:', e)
                    }
                } else if (this.DEBUG_TYPE == 'UPLOAD') {


                    try {
                        // this.uploadDialogVisible=true
                    } catch (e) {
                    }
                }


            }


        },
        computed: {
            isRootDir(){
                return this.currentDirRow==null && this.projectId===null
            },
            mkdirTitle() {
                return JZY.locale.$t('mkdir')
            },
            tableData() {

                let tableData = this.pageData.list || []


                // let tableData=[{
                //     id:1,
                //     name:'公共文件夹',
                //     updateTime:Date.now(),
                //     fileCount:2,
                //     isDir:true,
                //     space:'229M'
                // }, {
                //     id:2,
                //     name:'公共文件',
                //     updateTime:Date.now(),
                //     fileCount:null,
                //     isDir:false,
                //     space:'229M'
                // }]

                tableData.forEach((item) => {


                    // item.sid=item.sid
                    // item.fileName=item.fileName
                    // item.updateDate=JZY.u.formatTime(item.updateDate)


                    item.renameMode = false
                    item.isHover = false
                    item.isLoading = false
                    item.isMyFavorite = item.isFavorite

                    item.isDir = item.fileType == 0 || item.fileType == 3

                })

                console.log("tableData--:", tableData)

                // this.tableData =
                return JZY.u.copy(tableData)

            },
            // breadMenuArr(){
            //     let str=''
            //     // if(!this.breadMenuPathArr){
            //     //     return ''
            //     // }
            //     for(let i=0;i<this.breadMenuPathArr.length;i++){
            //         str+=this.breadMenuPathArr[i].name
            //         if(i<this.breadMenuPathArr.length-1){
            //             str+='/'
            //         }
            //     }
            //
            //     return str
            // }
        },
        data() {
            return {
                hasEverChoosedFile:false,
                pageCount:JZY.c.pageCount,
                isSearchedResult:false,
                searchContent: '',
                searchContentModel:'',
                wrapperId: JZY.u.uuid(),
                isDiskInited: false,
                spaceUsage: null,
                mkdirViewType: '',
                isPreviewImg: false,
                currentDirRow: null,
                previewFileSrc: null,
                uploader: null,
                previewFileDialogVisible: false,
                isLoadingPreview: false,
                uploadFilesList: [],
                isUploadDialogMaxMode: true,
                uploadDialogVisible: true,
                DEBUG_TYPE: 'null',
                // DEBUG_TYPE:'MKDIR',
                mkdirRules: {
                    fileName: [
                        {
                            type: 'string',
                            required: true,
                            message: this.l('{g.pleaseInput}{folderName}'),
                            trigger: 'blur'
                        }


                    ]
                },
                mkdirForm: {

                    projectId: this.projectId || null,
                    remark: '',
                    parentId: null,
                    fileName: '',
                    userAuthorizeList: [
                        {
                            editable: false,
                            userId: this.$store.state.session.sid,
                            name: this.$store.state.session.name,
                            orgType: 1,
                            authorizeList: [{authorizeId: true}, {authorizeId: true}, {authorizeId: true}, {authorizeId: true}]
                        }
                    ]
                },
                mkdirVisible: false,
                breadMenuPathArr: [{
                    sid: null,
                    fileName: JZY.locale.$t('rootPath')
                }],
                movingType: null,
                movingRowId: null,
                moveDialogTitle: '',
                dirTree: null,
                moveDialogVisible: false,
                currentPage: 1,
                fileTransferManager: fileTransferManager,
                // treeData: [{
                //     "permissionId": 118,
                //     "orgCode": "YWDY000000009",
                //     "orgName": "德邦物流",
                //
                //     "currentOrg": "0",
                //     "children": [{
                //         "permissionId": 119,
                //         "orgCode": "YWDY000000010",
                //         "orgName": "北京网点",
                //
                //         "currentOrg": "1",
                //         "children": [{
                //             selected:true,
                //             "permissionId": 120,
                //             "orgCode": "YWDY000000011",
                //             "orgName": "回龙观网点",
                //             "childOrgs": [],
                //             "currentOrg": "0"
                //         }, {selected:true,"permissionId": 121, "orgCode": "YWDY000000012", "orgName": "西二旗网点", "childOrgs": [], "currentOrg": "0"}],
                //         "selected": false
                //     }, {
                //         "permissionId": 130,
                //         "orgCode": "YWDY000000020",
                //         "orgName": "郑州网点",
                //
                //         "currentOrg": "0",
                //         "children": [{
                //             "permissionId": 131,
                //             "orgCode": "YWDY000000021",
                //             "orgName": "金明网点",
                //             "childOrgs": [],
                //             "currentOrg": "0"
                //         }, {"permissionId": 132, "orgCode": "YWDY000000022", "orgName": "龙湖网点", "childOrgs": [], "currentOrg": "0"}],
                //         "selected": false
                //     }],
                //     "selected": false
                // }],

                enableCheck: true,
                enableCheckedFolder: true,
                enableCheckedMultiple: false,
                autoExpandCheckedNodes: true,
                newFileName: '',
                selectedFiles: [],
                selectedFileIds: [],
                // tableData: [],
                multipleSelection: [],
                // breadMenuArr: service.getBreadMenuArr(this.breadMenuPath)
            }
        }
    }
</script>