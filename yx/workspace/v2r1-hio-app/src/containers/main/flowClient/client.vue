<template>
  <div class="container-fluid">
    <div>
        <!-- <button @click="save">保存</button> -->
    </div>  
    <div id="_designer"></div>
  </div>
  
</template>

<script>
import  s_flow  from "@/containers/main/flowClient/s_flow.js"

export default {
    props:{
        flowClientShow : {
            type: Number
        }
    },
  async mounted(){

    //   let containers = document.getElementById('_designer');
    //   let flowInit = s_flow;
    //   //初始化画板
    //   flowInit.initial(containers);
    //   //获取流程相关参数
    //   //单独页面时从route中获取
    //   //为单独组件时另外传入
    //   let flowParam = this.$route.params;
    //   flowParam = {
    //     ...this.$route.params,
    //     flId:flowParam.id,
    //     act:'edit'
    //   }
    //   //初始化画板
    //   //flowInit.initial(containers);
    //     // let flowParam = this.flowParams;
    //   //初始化模板相关数据
    //   flowInit.setGraph(flowParam);
    //   flowInit.flowId = flowParam.flId;
        // if(this.flowClientShow == 2){
            this.init();
        // }
      
  },
  methods:{
        save(isValidate,cb){

            let getAllCellData = s_flow.getAllCellData(this,{
                flId:this.$route.params.id},isValidate,cb);
            //{flId:this.$route.params.id} 此对象参数，许国平添加，不知对否，如有不妥，直接删除即可05.25
        },
        init(){
            let containers = document.getElementById('_designer');
            let flowInit = s_flow;
            //初始化画板
            flowInit.initial(containers);
            //获取流程相关参数
            //单独页面时从route中获取
            //为单独组件时另外传入
            let flowParam = this.$route.params;
            flowParam = {
                ...this.$route.params,
                flId:flowParam.id,
                act:'edit'
            }
            //初始化画板
            //flowInit.initial(containers);
                // let flowParam = this.flowParams;
            //初始化模板相关数据;

            
            flowInit.setGraph(flowParam,containers);
              flowInit.flowId = flowParam.flId;
        }   
  }
}
</script>
<style lang="scss">
.container-fluid {
     position: relative;
    .jzylogo {
        background-color: #50abfc;
        width: 31px;
        position: absolute;
        top: 0;
        height: 31px;
        left: 0;
        border-bottom: #0071c1;
        z-index: 2;
        overflow: hidden;
    }

    .shadow {
        box-shadow: -1px 5px 6px #2179c7;
    }
    .r0080 {
      border-radius: 0 0 8px 0;
    }
    .sidebar {
          position: absolute;
          overflow: hidden;
          text-align: center;
          padding: 0;
            left: 0px;
            top: 0px;
            bottom: 0px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-right:none;
          width: 104px;
          img {
            display: block;
            width: 56px;
            margin: 24px auto 0 auto;
          }
      }

      .toolbar {
          position: absolute;
          overflow: hidden;
          padding: 5px 0px 0px 7px;
          left: 5px;
          top: 1px;
          width: 100%;
          height: 31px;
          bottom: 1px;
          background-color: #ededed;
          box-shadow: 0px 2px 8px #9c9c9c;
          border-top: 1px solid #2599ff;
          .btn-toolbar {
              width: 21px;
              height: 22px;
              margin: 0px 2px;
          }
      }
}

</style>

<style lang="scss" scoped>

.container-fluid {
    padding: 0;
    margin: 0;
    overflow: hidden;
    .jzylogo {
        background-color: #50abfc;
        width: 31px;
        position: absolute;
        top: 0;
        height: 31px;
        left: 0;
        border-bottom: #0071c1;
        z-index: 2;
        overflow: hidden;
    }

    .shadow {
        box-shadow: -1px 5px 6px #2179c7;
    }
    .r0080 {
      border-radius: 0 0 8px 0;
    }
    .stage {
        overflow: auto;
        right: 0px;
        bottom: 0px;
        touch-action: none;
        height: 780px;
        margin-left: 104px;
        border: 1px solid #ccc;
    }
    
}


</style>