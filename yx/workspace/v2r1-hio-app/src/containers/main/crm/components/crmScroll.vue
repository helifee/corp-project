<template>

    <div class="scrollCrmWrap">
        <slot name="content"></slot>
    </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    methods:{
        removeScroll(){
            if(this.$bd ){
                this.$bd.off();
            }
        },
        setScroll($bd,cb){
            let my = this;
            $bd.scroll(function(){
                let scrollBd = $bd;
                my.bottomFlag = false;
                let scrollTop = scrollBd[0].scrollTop;
                let scrollHeight = scrollBd[0].scrollHeight;
                let clientHeight = scrollBd[0].clientHeight;
                
            　　if(scrollHeight - scrollTop  <= clientHeight){
                    my.bottomFlag = true;   
            　　}
            })
            
        }
    },
    props:{
        status:{
            type:Boolean
        },
        scrollBd:{  //需要滚动的元素
            type:String
        }
       
    },
    data(){
        
        return {
            bottomFlag:false,
            $bd: ""
        }
    },
    watch:{
        status(nVal,oVal){
            if(nVal === true){
                // if(!this.$bd.length){
                    this.$bd = this.scrollBd ? jQuery(this.scrollBd) : jQuery(".scrollCrmWrap");
                    this.setScroll(this.$bd);
                // }
            }else{
                this.removeScroll();
            }
        },
        bottomFlag(nVal){
            if(nVal){
                this.$emit("scoll",this.bottomFlag);
            }
        }
    },
    mounted(){
            if(this.status){
                this.$bd = this.scrollBd ? jQuery(this.scrollBd) : jQuery(".scrollCrmWrap");
                this.setScroll(this.$bd);
            }else{
                this.removeScroll();
            }
    }
}
</script>

