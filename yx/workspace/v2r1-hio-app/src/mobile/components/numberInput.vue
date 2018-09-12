<template>
    
        <input  type='text' class="_numberInput" :placeholder="placeholder"  
          @input="handleInput" :value="value">
    
    
</template>
<script>
export default {
    props : {
        value : {
            type : String
        },
        placeholder : {
            type : String
        }
    },
    data(){
        // let value = this.value;
        return {
            // number : value
        }
    },
    methods : {
        handleInput (){
            let reg = /(^[0-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/

            let value = event.target.value;
    
            // value =  value.replace(/[^\d\.\d]/g, '');
            // value = value.replace(/^[0-9]{0,13}(\.[0-9]{0,2})$/,()=>{
            //     console.log(arguments)
            // });
            // console.log(value);
            // event.target.value = value;
            // this.$emit('input', event.target.value);
            // // console.log(value);
            // return 
            if(value === ""){

            }else{
                let str = reg.exec(value);
                if(str){
                    event.target.value = str[0];
                }else{
                    event.target.value = this.value || "";
                }
            }
            
            // this.value = event.target.value;
            this.$emit('input', event.target.value);
        }
    },
    mounted(){
        
    }
}
</script>
<style lang="scss" scoped>
    ._numberInput{
            width: 100%;
            border: 0;
            outline: 0;
            -webkit-appearance: none;
            background-color: transparent;
            font-size: inherit;
            color: inherit;
            height: 1.41176471em;
            line-height: 1.41176471;
            text-align: right
    }
</style>


