<template>
    <div class="m_ubd">
        <ul class="m_ulist">
            <li v-for="(item,index) in list" >
                <span class="m_uarrow" v-show="item[selectedKey.child] && item[selectedKey.child].length">
                    <x-icon type="ios-arrow-right" size="20"></x-icon>
                </span>
                <span class="m_uclose" v-if="resType">
                    <x-icon type="ios-close-empty" class="m_ucloseicon" size="25" @click="del(item,index)"></x-icon>
                </span>

                <span class="pic">
                    <span class="icon_bg" v-if="!resType">
                        
                        <!-- 不可选 -->
                        <span  v-if="(item[selectedKey['typeCode']] != selectedKey['type']) && selectedKey['typeCode']  "  >
                            <x-icon type="ios-checkmark" class="m_uiconNo" size="25" ></x-icon>
                        </span>
                        
                        <!-- 空 -->
                            <!-- 已选 或 未选 -->
                        <span v-else @click="setSelectedItem(item,index)">
                            <span v-if="(!reslutObj[item[selectedKey['key']]]) " >
                                <x-icon type="ios-circle-outline" class="m_uicon" size="25" ></x-icon>
                            </span>

                            <span  v-if="reslutObj[item[selectedKey['key']]]" >
                                <x-icon type="ios-checkmark" class="m_uiconYes" size="25"></x-icon>
                            </span>

                        </span>
                        
                        
                    </span>
                    
                    <img src="./pb_list_department@2x.png" v-if="item[selectedKey['typeCode']]=='dept' && !resType">
                    <img  src="./company@2x.png"  v-else-if="item[selectedKey['typeCode']]=='company' && !resType">
                    <img  src="./person@2x.png"  v-else-if="item[selectedKey['typeCode']]=='user' && !resType">
                    <img  src="./person@2x.png"  v-else-if="item[selectedKey['typeCode']]=='external' && !resType">
                    <img  src="./pb_list_department@2x.png" v-else-if=" !resType" >
                   
                    <img src="./pb_list_department@2x.png" v-else-if="item[selectedKey['typeCode']]=='dept' && resType">
                    <img  src="./company@2x.png"  v-else-if="item[selectedKey['typeCode']]=='company' && resType">
                    <img  src="./person@2x.png"  v-else-if="item[selectedKey['typeCode']]=='user' && resType">
                    <img  src="./person@2x.png"  v-else-if="item[selectedKey['typeCode']]=='external' && resType">
                    <img  src="./pb_list_department@2x.png" v-else-if=" resType" >
                    </span>
                <div class="ct" @click="selectItem(item,index)">
                    <!-- {{showItem.key}} -->
                    {{item[selectedKey['name']]}}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"selectListPage",
    components: {

    },
    data(){
        return {
           
        }
    },
    props:{
        reslutObj:{  //结果
            type : Object,
        },
        list:{
            type : Array
        },
        resType:{
            type : Boolean
        },
        //选择的唯一键值
        selectedKey:{
            type : Object
        }
        
    },
    methods:{
        selectItem(item,index){
            let showItem = this.selectedKey.child;
            if(item[showItem] && item[showItem].length){
                this.$emit("selectItem",item)
            }
        },
        getRes(data){
            let arr = [];
            this.$parent.resultList = {};
            if(data){
                for(let key in data){
                    if(key && data[key]){
                        let temp = data[key];
                        for(let index in temp){
                            if(index && temp[index]){
                                this.$parent.resultList[key] = this.$parent.resultList[key] ? this.$parent.resultList[key] :[];
                                this.$parent.resultList[key].push(temp[index]);
                                arr.push(temp[index])
                            }
                        }
                    }
                }
            }
            let sum = 0;
            let text = "";
            
            for(let key in this.$parent.resultList){
                let element = this.$parent.resultList[key];
                switch (key){
                    case "user":
                        text += "选择人员：" + element.length + ";";
                    break;
                    case "dept":
                        text += "选择部门：" + element.length + ";";
                    break;
                    case "role":
                        text += "选择角色" + element.length ;
                    break;
                }
                let tempSum = element.length;
                sum += tempSum;
            }
            this.$emit("total",sum,text,arr);
            // this.$parent.resultList = arr;
        },
        getsingle(){
            for(let key in this.reslutObj){
                
                delete this.reslutObj[key];
            }
        },
        setSelectedItem(item,index){
            

            if(this.reslutObj[item[this.selectedKey.key]]){
                delete this.reslutObj[item[this.selectedKey.key]];
            }else{
                if(!this.selectedKey.multi){
                    this.getsingle();
                }
                item["selectType"] = this.selectedKey.type;
                item["selectTypeCode"] = this.selectedKey.key;
                item["newname"] = item[this.selectedKey.name];
                item["newId"] = item[this.selectedKey.key];
                this.reslutObj[item[this.selectedKey.key]] = item;
            }
            let obj  = Object.assign({}, this.reslutObj, this.reslutObj);
            // this.reslutObj = Object.assign({}, this.reslutObj, this.reslutObj);
            
            this.$emit('update:reslutObj',obj);
            this.getRes(this.$parent.reslutObj);
        },
        del(item,index){
            this.list.splice(index,1);
            delete this.reslutObj[item["selectType"]][item[item["selectTypeCode"]]];
            let obj  = Object.assign({}, this.reslutObj, this.reslutObj);
            
            this.$emit('update:reslutObj',obj);

            // this.$emit('update:reslutObj',this.reslutObj);
            this.$emit("total",'','',this.list);            
        }
    }
    
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import './css.scss';
</style>
