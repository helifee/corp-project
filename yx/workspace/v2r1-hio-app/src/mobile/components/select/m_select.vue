<template>
    <div class="mUserSelect">
        <div class="m_utab m_umb10">
            <ul class="m_utabTitle">
                <li v-for="(item,index) in tabList" :class="{'selected' : index == tabActive}" :style="item.width" @click="switchTabItem(item)" :key="index">
                    <span>{{item.title}}</span>
                </li>
            </ul>
            <!-- <tab  :animate="false" :line-width="1" v-model="tabActive" prevent-default>
                <tab-item v-for="(item,index) in tabList" :class="{'selected' : index == 0}" @on-item-click="switchTabItem(item)" active-class="active" :key="index">
                    {{item.title}}
                </tab-item>
            </tab> -->
        </div>
        <div class="m_uNav m_umb10" v-if="tabActive=='person'">
            <ul>
                <li v-for="(item,index) in allComponents" class="m_uNavTitle" 
                
                @click="showPage(item,index,'allComponents')"
                :class="{'on' : index==allComponents.length-1}">
                <span v-if="index == 0" style="vertical-align: middle;line-height: 0;display: inline-block;">
                    <icon name="house" scale = "3" class="m_uroot"></icon>
                </span>
                <span v-else>
                    {{( " > " + item.title)}}
                </span>
                
                </li>
            </ul>
            <!-- <tab>
                <tab-item  active-class="m_uactivescroll" v-for="(item,index) in nav" :key="item" :selected="index===1">{{item.title}}</tab-item>
            </tab> -->
        </div>
        <div class="m_uNav m_umb10" v-if="tabActive=='dept'">
            <ul>
                <li v-for="(item,index) in deptComponents" class="m_uNavTitle" 
                
                @click="showPage(item,index,'deptComponents')"
                :class="{'on' : index==deptComponents.length-1}">
                    <span v-if="index == 0" style="vertical-align: middle;line-height: 0;display: inline-block;">
                        <icon name="house" scale = "3" class="m_uroot"></icon>
                    </span>
                    <span v-else>
                        {{( " > " + item.title)}}
                    </span>
                </li>
            </ul>
            <!-- <tab>
                <tab-item  active-class="m_uactivescroll" v-for="(item,index) in nav" :key="item" :selected="index===1">{{item.title}}</tab-item>
            </tab> -->
        </div>
        <!-- 内部联系人 -->
        <div class="m_ucontent" v-if="tabActive=='person'">
            <selectListBd 
            v-show='item.show'
            :list.sync="item.list" 
            @total="getTotal"
            @selectItem="getItem" 
            :selectedKey='tabList[tabActive]'
            :reslutObj.sync='reslutObj[tabList[tabActive]["type"]]'
            :key="item.id"
            v-for="(item,index) in allComponents"></selectListBd>
        </div>
        <!-- 外部联系人 -->
        <div class="m_ucontent" v-if="tabActive=='external'">
            <selectListBd 
            @total="getTotal"
            :selectedKey='tabList[tabActive]'
            :list.sync="externalList"
            :reslutObj.sync='reslutObj[tabList["person"]["type"]]'></selectListBd>
        </div>
        <!-- 部门 -->
        <div class="m_ucontent" v-if="tabActive=='dept'">
            <!-- <selectListBd 
            :selectedKey='tabList[tabActive]'
            :multi="multi"
            :list.sync="deptList"
            :reslutObj.sync='reslutObj[tabList[tabActive]["type"]]'></selectListBd> -->
            
            <selectListBd 
            v-show='item.show'
            :list.sync="item.list" 
            @selectItem="getDept" 
            @total="getTotal"
            :selectedKey='tabList[tabActive]'
            :reslutObj.sync='reslutObj[tabList[tabActive]["type"]]'
            :key="index"
            v-for="(item,index) in deptComponents"></selectListBd>
        </div>
        <!-- 角色 -->
        <div class="m_ucontent"  v-if="tabActive=='role'">
            <selectListBd 
            @total="getTotal"
            :selectedKey='tabList[tabActive]'
            :list.sync="roleList"
            :reslutObj.sync='reslutObj[tabList[tabActive]["type"]]'></selectListBd>
        </div>

        <div class="m_ubottom">
            <div class="m_uleftbd" @click="saveUserList">
                <span class="m_uicon_yj"></span>
                已选择{{restArr.length}}个
            </div>
            <div class="m_urightbd" @click="save">确定</div>
            <div class="m_uclose" @click="closeSelect">关闭</div>
        </div>
        <div class="m_uresultwrap" v-if="resultWrap">
            <div class="m_select_topTitle">已选择({{restArr.length}})个</div>
            <selectListBd 
            res-type
            :selectedKey='resultWrapKey'
            v-if="resultWrap"
            :list="restArr" 
            class="m_uBd"
            @total="getTotal"
            :reslutObj.sync='reslutObj'
            >
            </selectListBd>
            <div class="m_ubottom">
                <!-- <div class="m_uleftbd">
                    <span></span>
                    已选择{{restArr.length}}
                </div> -->
                <div class="m_urightbd m_urightbd_w" @click="save">确定</div>
                <div class="m_uclose m_urightbd_w" @click="back">返回</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Tab, TabItem} from 'vux'
import selectListBd from './m_list.vue'
import ajaxService from './ajaxService.js'
const sTab = {
    person : {
        
        title : "内部人员",
        "typeCode" : "type",
        "multi" : false,
        type : "user",
        key : "sid",
        name : "name",
        child : "children"
    },
    external : {
        title : "外部人员",
        "typeCode" : "type",
        "multi" : false,
        type : "external",
        key : "sid",
        name : "name",
        child : "children"
    },
    dept : {
        title : "部门",
        "typeCode" : "type",
        "multi" : false,
        type : "dept",
        key : "sid",
        name : "name",
        child : "children"
    },
    role : {
        title : "角色",
        "typeCode" : false,
        "multi" : false,
        type : "role",
        key : "roleId",
        name : "roleName",
        child : ""
    }
} 
export default {
    components:{
        Tab,
        TabItem,
        selectListBd
    },
    props:{
        showType:{
            type : Array
        },
        selectedList:{
            type : Array
        },

        active:{
            type : String
        }


    },

    data(){

        return {
            //内部联系人
            allComponents : [ { list:[],show:true,title:'',id:Math.random() } ],
            deptComponents: [ { list:[], show:true, title : ''} ],
            tabActive: this.active,
            externalList:[],
            resultList : [],
            resultWrap : false,
            reslutObj : {},
            // deptList:[],
            roleList:[],
            total : 0,
            sumTotal : "",
            restArr : [],
            resultWrapKey:{
                name : 'newname',
                typeCode : 'type'
            }

        }
    },
    methods: {
        delItemFn(item){

        },
        getTotal(total,text,list){
            this.total = total;
            this.sumTotal = text;
            this.restArr = list;
        },
        closeSelect(){
            this.$emit('closeSelect');
        },
        showPage(item,index,text){
            if(index == this[text].length -1){
                return;
            }
            item.show = !item.show;
            if(index == 0){
                item.show = true;
            }
            
            let arr = [];
            
            this[text].forEach( (element,key) =>{
                if(key <= index){
                    arr.push(element);
                }
            })
            this[text] = arr;
            // data.forEach( (element,key) =>{
            //     if(key <= index){
            //         arr.push(element);
            //     }
            // })
            // data = arr;
        },
        getItem(item){
            let showItem = this.tabList[this.tabActive].child;
            if(item[showItem] && item[showItem].length){
                this.allComponents.forEach( element =>{
                    element.show = false;
                } )
                this.allComponents.push({ list: item[showItem], show:true, title: item.name,id:Math.random() });
            }
        },
        getDept(item){
            let showItem = this.tabList[this.tabActive].child;
            if(item[showItem] && item[showItem].length){
                this.deptComponents.forEach( element =>{
                    element.show = false;
                } )
                this.deptComponents.push({ list: item[showItem], show:true, title: item.name });
            }
        },
        switchTabItem (item) {

            this.tabActive = item.code;
            this.reslutObj[item["type"]] 
                = this.reslutObj[item["type"]] ? this.reslutObj[item["type"]] : {};

        },
        getInitList(data){

            if(data && data.length){
                data.forEach( element =>{
                    element["selectType"] = element['type'];
                    element["selectTypeCode"] = element['key'];
                    this.reslutObj[element.type] = this.reslutObj[element.type] ? this.reslutObj[element.type] : {};
                    this.reslutObj[element.type][element[element['key']]] = element;
                    // this.reslutObj[this.tabList[type].type][tempElement[this.tabList[type].key]] = tempElement;
                })
            }
            // this.getRes();
            this.restArr = data;
        },
        filterArr(data,externalArr,type,sign){
            if(data && data.length){
                data.forEach( (element,index) =>{
                    let tempElement = element;
                    
                    //选择外部联系人
                        if(element.type == 'external'){
                            externalArr.push(element);
                            // data.splice(index,1);
                        }
                    if(element[this.tabList[type].child] && element[this.tabList[type].child].length){
                        this.filterArr(element[this.tabList[type].child],externalArr,type,sign);
                    }
                })

            }
        },
        filterAllComponentsList(data,type){
           
            // return data.filter((ele)=>{
            //     if(ele[this.tabList[type].child] && ele[this.tabList[type].child].length){
            //         this.filterAllComponentsList(ele[this.tabList[type].child],type);
            //     }
            //     if(ele.type != 'external'){
            //         return ele;
            //     }
                
                
            // })
            if(data && data.length){
                let index = 0;
                for(index; index<data.length; index++){
                    let element = data[index];
                    if(element.type == "external"){
                        data.splice(index,1);
                        index --;
                    }
                    if(element[this.tabList[type].child] && element[this.tabList[type].child].length){
                        this.filterAllComponentsList(element[this.tabList[type].child],type);
                    }
                }
            }
        },
        getRes(){
            let data = this.reslutObj;
            this.restArr = [];
            for(let key in data){
                if(key && data[key]){
                    let temp = data[key];
                    for(let index in temp){
                        if(index && temp[index]){
                            this.restArr.push(temp[index])
                        }
                    }
                }
            }   
        },
        getExternalList(data,type){
            let arr = [];
            let inArr = [];
            if(type == "person"){
                let inArr = [];
            }
            // this.filterArr(data,arr,type);
            // this.getRes();
            this.externalList = arr;
        },
        async getList (type){
            let url , data;
            if(type.url){
                url = type.url;
                data = type.data;
            }else{
                url = '/organization/queryTreeWithUser';
                data = {
                    external : true
                };
            }
            
            data = data ? JSON.stringify(data) : null;
            let param = {
                url : url,
                data : data,
                type : type.ajaxType,
                serviceName: type.serviceName,
                contentType: type.ajaxType == "GET" ? null : 'application/json'
            }
            let res = await ajaxService.setAjaxFn(param);
            if(res.status == 200 && res.success == true){
                
                let arr = [];
                let tempRes = [];
                tempRes = jQuery.extend(tempRes,[res.result]);
                // this.allComponents[0].list = [res.result];
                this.filterArr([res.result],arr,'person' ,true);
                this.allComponents[0].list = tempRes;
                this.filterAllComponentsList(this.allComponents[0].list,'person');
                this.externalList = arr;
                // this.filterArr(this.allComponents[0].list,null,'person');
                // this.filterArr(this.externalList,null,'person');
                // this.getRes();
                // this.getExternalList([res.result],'person')
            }
        },
        back(){
            this.reslutObj[this.tabList[this.tabActive]["type"]] 
                = Object.assign({}, this.reslutObj[this.tabList[this.tabActive]["type"]], this.reslutObj[this.tabList[this.tabActive]["type"]]);
            this.saveUserList();
        },
        saveUserList(){
            this.resultWrap = !this.resultWrap;
        },
        save(){
            this.$emit("setResult",this.restArr);
            this.saveUserList();
            this.closeSelect();
        },
        closeAll(){
            this.saveUserList();
            this.closeSelect();
        },
        async getDeptList(){
            let url = '/organization/queryTree';
            let data = {
            };
            data = JSON.stringify(data);
            let param = {
                url : url,
                data : data,
                contentType:'application/json'
            }
            let res = await ajaxService.setAjaxFn(param);
            if(res.status == 200 && res.success == true){
                this.deptComponents[0].list = [res.result];
                
                // this.filterArr([res.result],null,'dept');
                // this.getRes();
            }
        },
        async getRoleList(){
            let url = '/role/queryRoles';
            let data = {
                name : "",
                pageNum : 1,
                pageCount: 500
            };
            data = JSON.stringify(data);
            let param = {
                url : url,
                data : data,
                contentType:'application/json' 
            }
            let res = await ajaxService.setAjaxFn(param);
            if(res.status == 200 && res.success == true){
                this.roleList = res.result.list;
                // this.filterArr(res.result.list,null,'role');
                // this.getRes();
            }
        },
        getData(type){
            
            switch (type.code){
                case "person":
                    this.getList(type);
                    break;
                case "external":
                    // this.getList();
                    break;
                case "dept":
                    this.getDeptList();
                    break;
                case "role":
                    this.getRoleList();
                    break;            
            }
        }
        
    },
    
    mounted(){
        //初始化当前面板
        this.reslutObj[this.tabList[this.tabActive]["type"]] 
                = this.reslutObj[this.tabList[this.tabActive]["type"]] ? this.reslutObj[this.tabList[this.tabActive]["type"]] : {};
        //初始化结果
        // console.log("999");
        this.getInitList(this.selectedList);
        
    },
    computed:{
        tabList (){
            // this.getInitList(this.selectedList);
            let temp = {};
            let len = this.showType.length;
            this.showType.forEach( element =>{
                let obj = {};
                
                if(typeof element == "string"){
                    obj  = Object.assign({}, sTab[element]);
                    obj.code = element;
                }else{
                    obj  = Object.assign({}, sTab[element.code]);
                    jQuery.extend(obj,element);
                }
                obj.getData = this.getData(obj);
                obj.width = "width:" + (1/len)*100 + "%";
                temp[obj.code] = obj;

            })
            
            return temp;
        }
    },
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import './css.scss';
</style>
