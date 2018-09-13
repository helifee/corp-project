<template>

    <div v-html="express" @input="changeText"  class="_text_area"  tabindex = "0">
    </div>
</template>
<script>
export default {
    props: ['data','type'],
    data(){
         
        return {
            
        }
    },   
    methods:{
        getStr (){
            let temp = "";
            if(this.data && this.data instanceof Array){
                this.data.forEach((element,index) => {
                    let tempName = (this.type == 1 || this.type == 3) ? element.field.name : element.field.code;
                    
                    temp += ( index == 0 ? "" : element.condition ) + 
                        '(' +( tempName ? '[' : '' ) + 
                        (tempName || '') + 
                        ( tempName ? ']' : '' ) + 
                        element.operator ;
                    if((this.type == 3 || this.type == 4 ) && (element.field.valueType =="str" || element.field.valueType =="date")){
                        temp += 
                        ( (element.shreshold ) ? "'\"" : '' )  + 
                        element.shreshold +
                        ( (element.shreshold ) ? "\"'" : ""  )  ;

                    }else{
                        temp += 
                        ( (element.shreshold ) ? "'" : '' )  + 
                        element.shreshold +
                        ( (element.shreshold ) ? "'" : ""  )  ;
                    }
                        temp += ")" ;
                });
            };
            return temp;
        },
        changeText (){
            this.$emit('change',this.express());
        }
    },
    computed:{
        express(){
            this.$emit('focus',this.getStr());
            this.$emit('input',this.getStr());

            return this.getStr();
        }
    }
}
</script>
<style scoped lang="scss">
._text_area{
  height:80px;
  border:1px solid #E1E1E1;
  border-radius: 3px;
  padding:10px ;
      line-height: 20px;
}
</style>

