<style lang="scss">
    .pop-over-with-tree{
        width:400px;
    }
    .smarter-tree{
        position: relative;
        .el-input{
            width: calc(100% + 2px);
            input{
                border-radius:3px 3px 0 0;
            }
        }
        .el-table::before{
            height:0;
            td{
                border-bottom:none;
                &:hover{
                    background-color:#EAF5FF;
                    cursor:pointer;
                }
            }
        }
    }
    .smarter-tree .el-table__body-wrapper{
        overflow-y:auto;
    }
    .smarter-tree .el-table__body,.smarter-tree .el-table__header{
        width:100%!important;
    }
    .smarter-tree td{
        border-bottom:none;
    }
    .smarter-tree-search-wrapper .el-select{
        display:block;
    }
    .smarter-tree-path-option{
        color:chocolate;
    }

</style>
<template>

    <div ref="smarterTreeWrapper" class="smarter-tree"
         v-bind:class="{'tree-table-parent-with-data':$refs.smarterTree&&($refs.smarterTree.store.states.data.length!=0)}">

        <!--<el-checkbox v-if="enableChangeCheckedAllChildsWhenParentChecked" style="margin-top:10px;margin-bottom:10px;" v-model="dCheckedAllChildsWhenParentChecked">勾选节点后是否同步父,子节点</el-checkbox>-->
        <!--<smarter-input-select-->
            <!--v-if="enableFilter&&enablePath"-->
            <!--class="smarter-tree-search-wrapper"-->
            <!--style="width:100%"-->


            <!--@inputChange="handleSearchChange"-->
            <!--title="test title"-->
            <!--:enable-create="true"-->
            <!--placeholder="输入文字搜索"-->
            <!--:data="searchInputDropdownData"-->
            <!--:loading="isLoadingDestination"-->
            <!--:value="searchStr"-->
            <!--labelKey="path"-->
            <!--isShowKey="isShow"-->
        <!--&gt;-->
            <!--<template slot-scope="scope">-->
                <!--<span v-html="scope.row.path"></span>-->
            <!--</template>-->

        <!--</smarter-input-select>-->



        <el-input style="margin-bottom:10px;left:-1px;" :style="{position:absoluteTop =='0px' ? 'static':'absolute',top:absoluteTop}" v-if="enableFilter&&!enablePath" placeholder="输入用户名称/手机号码" v-model="searchStr"  @change="handleSearchChange"></el-input>


        <el-table :row-class-name="rowClassName" ref="smarterTree" :data="data" :row-style="showThisRow" :show-header="false" :height="maxHight">

            <tree-tpl :vm="_self">
                <template slot-scope="scope">
                    <slot :row="scope.row">

                    </slot>
                </template>
            </tree-tpl>







        </el-table>
        <!--<div>-->
        <!--aa-->
        <!--</div>-->
    </div>


</template>






<script>

    import util from '../../treeGrid/src/util'
    import treeGrid from '../../treeGrid/src/treeGrid'




    import treeTpl from '../../treeGrid/src/treeCommonTemplate'


export default{
        components:{treeGrid,treeTpl},

    mixins:[treeGrid],
    props:{
        enablePath:{
          type:Boolean,
          default:false
        },
        data:Array,
        enableFilter:{
            type:Boolean,
            default:true
        },

        maxHight:{
            type:String,
            default:'350px'
        },
        absoluteTop:{
            type:String,
            default:'0px'
        }
    },
    data(){
            return {
                searchInputDropdownData:[],
                isLoadingDestination:false,
                searchStr:'',
                searchStr:'',
                foo:'bar'
            }
    },
    watch:{
        searchStr(){
            this.handleSearchChange()
        }
    },
    methods:{
        showThisRow:function({row, rowIndex}){//table行style
            if (row.hasOwnProperty('isInside')) {
                if(row.isInside === this.isInside){
                    return 'display:table-row'
                }else{
                    return 'display:none'
                }
            }
        },
        // destinationRemoteMethod(query){
        //     console.log('remote method query:',query)
        //     query=query.trim()
        //     if(!query){
        //         return false
        //     }
        //
        //     // if(this.isLoadingDestination==false){
        //     //
        //     // }
        //
        //     this.isLoadingDestination=true
        //
        //     // this.BX.s.requestTMS('api/testTimeout')
        //
        //
        //
        //     setTimeout(()=>{
        //
        //         this.searchInputDropdownData=[
        //             {
        //                 label:'label1',
        //                 value:'value1',
        //                 isShow:false
        //             },{
        //                 label:'label2',
        //                 value:'value2'
        //             },{
        //                 label:'label3',
        //                 value:'value3'
        //             }
        //         ]
        //
        //         this.isLoadingDestination=false
        //     },1000)
        // },
        handleSearchChange(val){
            val=val||this.searchStr
            console.log("handle search change")

            this.searchStr=val

            // if(this.searchStr.trim()==''){
            //     this.searchInputDropdownData=[]
            // }else{
            //     this.searchInputDropdownData=this.memoryTree.filter((item)=>{
            //         return this.filterMethod(item,this.searchStr)
            //     })
            // }
            let searchInputDropdownData=[]
            this.searchInputDropdownData=this.memoryTree.filter((item)=>{
                if(this.filterMethod(item,this.searchStr)){
                    searchInputDropdownData.push({
                        path:item.$extra.path.toLowerCase().trim()
                            .replace(new RegExp(this.searchStr.toLowerCase().trim(),'g'),(str)=>{
                                return '<span class="smarter-tree-path-option">'+str+'</span>'
                            })
                    })
                }
            })
            this.searchInputDropdownData=searchInputDropdownData


            this.filterRows((row)=>{
                return this.filterMethod(row,this.searchStr)
            })
        }
    },
    updated(){
            // setTimeout(()=>{
                this.$nextTick(()=>{

                    let popOver=util.closest(this.$refs.smarterTreeWrapper,'.el-popover')
                    // util.clog('ref.smarterTreeWrapper',popOver)
                    if(popOver){
                        popOver.classList.add('pop-over-with-tree')
                    }
                })
            // },2000)


    }

    // props:{
    //     ...treeGrid.props,
    //     data:Array
    // },
    // methods:{
    //     ...treeGrid.methods
    // },
    // data(){
    //   let baseData=treeGrid.data.call(this)
    //         return {
    //             ...baseData
    //         }
    // },
    // mounted(){
    //     treeGrid.mounted.apply(this)
    //     console.log('smarter tree mounted:',this)
    // }
}

</script>
