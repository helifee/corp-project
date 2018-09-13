<template>
        <ul>
            <li v-for="(n,i) in model.children" @click.stop="expend=!expend" :key="i">
                <i :class="{'checkStyle':true,'checked':n.checked}" @click.stop="select(i)"></i><span>{{n.contractType}}</span><i :class="{'arrow':true,'down':n.expend}" v-show="n.children ? true :false"></i>
                <ulTypeItem ref="ulTpye" v-if="n.children ? true :false" v-show="expend" :model="n"></ulTypeItem>
            </li>
        </ul>
</template>
<script>
    import service from '../../pages/m_contract/m_contract_service'
    import ulTypeItem from '../../components/m_contract/m_contract_ulTypeItem'
    import eventBus from '../../m_eventBus.js'
    export default {
        name:"ulTypeItem",
        props:["model"],
        components: {
            ulTypeItem
        },
        data () {
            return {
                id:"",
                list:[],
                expend:false,
                checked:false,
                num:"",
                isdisable:true
            }
        },
        created(){
            if(this.model.children){
                this.model.children.forEach((item)=>{
                    item.checked = false;
                    item.expend = false;
                });
            }
        },
        mounted(){
            eventBus.$on("setNoChecked",(val)=>{
                this.setNoChecked();
        });
        },
        methods: {
            clearValue (value) {
                this.dateValue = ''
            },
            arrHandler(arr){
                if(arr.length>0){
                    arr.forEach((n)=>{
                        n.checked = false;
                    if(n.children) this.arrHandler(n.children);
                });
                }
                return arr;
            },
            setNoChecked(){
                this.model.children = Object.assign([], this.arrHandler(this.model.children));
            },
            select(index){
                eventBus.$emit("setNoChecked");
                this.setNoChecked();
                this.model.children.forEach((n,i)=>{
                    if(i==index){
                        n.checked = !n.checked;
                        if(n.checked)  {eventBus.$emit("setDisable",false,n)} else eventBus.$emit("setDisable",true);
                    }else{
                        n.checked = false;
                    }
                 });

                this.model.children = Object.assign([], this.model.children);
            }
        }
    }
</script>