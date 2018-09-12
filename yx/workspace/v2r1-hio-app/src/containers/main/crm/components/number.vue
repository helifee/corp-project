<template>
    <div>
        <el-input :size="size" type="text" v-model="number" :placeholder="placeholder"
            :maxlength="maxlength"
            v-on:keyup.native="updataValue($event)" v-on:paste.native="updataValue($event)" 
         >
         <!-- -->
         <template :slot="solt" >{{soltCont}}</template>
         </el-input>
    </div>
</template>
<script>
export default {
    props:{
        size : {
            type : String
        },
        mysolt : {
            type : String
        },
        placeholder : {
            type : String
        },
        value : { 
            type : [String,Number]
        },
        type : {   //类型 integer正整数 
            type : String
        },
        maxlength:{
            type : Number
        },

        intMax : {  //整数长度
            type : Number,
            default (){
                return 12
            }
        },
        decimalMax : {  //小数长度
            type : Number,
            default (){
                return 2
            }
        }
    },
    data (){
        let solt ;
        solt = this.mysolt ? this.mysolt.split("-")[0] : "";
        let soltCont = this.mysolt ? this.mysolt.split("-")[1] : "";
        return {
            solt: solt,
            soltCont: soltCont,
            number: this.value,
            result : "",
            oldResult : ""
        }
    },
    methods:{
        
        formatNumber(value){ 
            
            // let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/;
            let  reg ; 
            switch(this.type){
                case "blend":  //混合类型（整数及小数）
                    // reg =new RegExp("(^[0-9]([0-9]{0," + dd +"})?$)|(^[0-9]([0-9]{0," + dd +"})(\.[0-9]{0," + kk + "})?$)")
                    reg = /(^[0-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/
                break;
                case "hundred" :  //百位数包括0
                    reg = new RegExp("^(?:0|[1-9][0-9]?|100)$");
                break;
                case "init":  //整数（包括小数）
                    reg =new RegExp("^[0-9]{0," + this.intMax +"}$")
                break;
                default:
                    reg =  /^[A-Za-z0-9]+/g;
                break;
            
            }
            let str = reg.exec(value);
            let temp = "";
            if(str == null){
                temp = this.value;
            }else{
                temp = str[0];
                // console.log(str[0])
            }
            return temp;

        },

        updataValue (){

            let value = this.number;
                 value = value ? value.trim() : "";
            if(value){
                value = this.formatNumber(value);  
            }
            this.number = value;
            
            this.$emit('input', value||"");
        }
    },
    watch:{
        number(){

        },
        value (nval){
            let value = this.value;
            value = value || value===0 ? value.toString() : "";
            value = value || value===0 ? value.trim() : "";
            if(value){
                value = this.formatNumber(value);  
            }
            this.number = value;

            this.$emit('input', value||"");
        }
    }
}
</script>


