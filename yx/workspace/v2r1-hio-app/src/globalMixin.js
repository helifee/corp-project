export default {
    beforeDestroy(){

        if(this.hasOwnProperty('routerReloadMethod')){
            console.log('mixin before destroy emitted:',this)
            // debugger
            // JZY.s.eventBus.$off('ROUTER_RELOAD')



            let pathWhenCurrentVMLoaded=JZY.s.getPathName()

            let pathName=(pathWhenCurrentVMLoaded.substring(1)),
                moduleName=JZY.s.getPathName().split('/')[1]

            JZY.s.eventBus.$off('ROUTER_RELOAD_'+(pathName.split('/').join('_')))
            if(moduleName!=pathName){
                JZY.s.eventBus.$off('ROUTER_RELOAD_'+moduleName)
            }

            JZY.s.eventBus.$off('ROUTER_RELOAD')
        }



    },
    mounted(){
        // if(JZY.CURRENT_VM!=undefined){
        //     delete JZY.CURRENT_VM
        // }

        // let pathName=JZY.s.getPathName(),
        //     menuItemNodeList=document.querySelectorAll('.el-menu-item[data-href]'),
        //     existMenuPathArr=[].map.call(menuItemNodeList,(item)=>item.getAttribute('data-href'))

        // console.log(this)
        // debugger
        if(this.hasOwnProperty('routerReloadMethod')){

            // JZY.s.eventBus.$off('ROUTER_RELOAD')

            !JZY.PROD_MODE && (JZY.CURRENT_VM=this)

            console.log('add an event for bus')
            // JZY.s.eventBus.$on('ROUTER_RELOAD',()=>{
            //     this.routerReloadMethod()
            // })
            let pathWhenCurrentVMLoaded=JZY.s.getPathName()
            JZY.s.eventBus.$on('ROUTER_RELOAD',JZY.u.debounce(()=>{
                console.log('router reload trigged')
                if(JZY.s.getPathName()==pathWhenCurrentVMLoaded){
                    JZY.s.showLoading()
                    this.routerReloadMethod()

                    let pathName=(pathWhenCurrentVMLoaded.substring(1)),
                        moduleName=JZY.s.getPathName().split('/')[1]

                    JZY.s.eventBus.$emit('ROUTER_RELOAD_'+(pathName.split('/').join('_')))
                    console.log('发射了一个事件：','ROUTER_RELOAD_'+(pathName.split('/').join('_')))
                    if(moduleName!=pathName){
                        console.log('又发射了一个事件：','ROUTER_RELOAD_'+moduleName)
                        JZY.s.eventBus.$emit('ROUTER_RELOAD_'+moduleName)
                    }
                }

            },300,true))
        }


        //
        // console.log('el class:',this.$el.getAttribute('class'))
        // console.log('this.$el.classList.contains(\'router-wrapper\')--:',this.$el.classList.contains('router-wrapper'),this)

      // console.log('mix in created vm--:',this)
    },
}