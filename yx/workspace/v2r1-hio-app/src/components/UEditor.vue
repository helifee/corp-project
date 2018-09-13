<template>
    <div>
        <div :id="id" type="text/plain"></div>
    </div>
</template>
        <script>
            // import '../../static/ueditor/ueditor.all.js'
            // import '../../static/ueditor/ueditor.config.js'
            // import '../../static/ueditor/ueditor.parse.min.js'

//            console.log('ueditor was imported')
//            console.trace()



            let uStore={

            }

        export default {
            data () {
                return {
                    editor: null
                }
            },
            props: {
                defaultMsg: {
                    type: String,
                    default:''
                },
                config: {
                    type: Object
                },
                id: {
                    type: String
                },
                appId:{
                    type:[String,Number],
                    default:'0'
                },
                businessId:{
                    type:[String,Number],
                    default:'0'
                },
                categoryId:{
                    type:[String,Number],
                    default:'0'
                }
            },
            async mounted() {
                if(JZY.DEBUG_MODE){
                    window.ueditorVM=this
                }
               console.log('ueditor vue mounted',this.id)

                if(this.id in uStore){
                   throw 'editor id已存在，请更换id'
                   return false
                }

                uStore[this.id]={
                    appId:this.appId,
                    businessId:this.businessId,
                    categoryId:this.categoryId
                }

                let locale=(await JZY.locale.getCurrentLanguage());
                let lowerLocale=locale.toLowerCase()
                // let underscoreLocale=locale.split('-').join('_')


                // window.UEDITOR_HOME_URL=JZY.c.xhrSetting.HOST.GLOBAL
                await JZY.s.getScript('ueditor.config'.split(' '),'/static/ueditor/')
                await JZY.s.getScript('ueditor.all.js'.split(' '),'/static/ueditor/')
                await JZY.s.getScript('ueditor.parse.min.js'.split(' '),'/static/ueditor/')
                // // await JZY.s.getScript('/static/utf8-php/ueditor.all.min.js')
                await JZY.s.getScript('/static/ueditor/lang/'+lowerLocale+'/'+lowerLocale+'.js')
                if(!UE.globalData){
                    UE.globalData={}
                }
                UE.globalData.uStore=uStore



               this.$nextTick(()=>{
                   const _this = this

                   window.UEDITOR_CONFIG.serverUrl=JZY.xhr.transformUrl(
                           '/attachment/univ/attachment/ueditor/exec?action=config&',
                           'GLOBAL.GATEWAY.YI_FEI_HU',false).replace(/\/disk/,'')+JZY.s.getAccessTokenByAuthorization()

                   //     JZY.c.xhrSetting.HOST.GLOBAL + "/attachment/univ/attachment/attachment/uploadRichTextPicture?"+JZY.s.getAccessTokenByAuthorization()


                       // /ueditor/exec?action=config&
                   // 初始化UE
                   // var serverPath =JZY.c.xhrSetting.HOST.GLOBAL
                       this.editor = UE.getEditor(this.id, JZY.u.deepExtend({
                           // imagePath:JZY.xhr.transformUrl(
                           //     '/attachment/univ/attachment/ueditor/uploadImage?',
                           //     'GLOBAL.GATEWAY.YI_FEI_HU',false).replace(/\/disk/,'')+JZY.s.getAccessTokenByAuthorization()
                           // imageUrl:serverPath + "/attachment/univ/attachment/attachment/uploadRichTextPicture",
                           // imagePath:'/ueditor/exec?action=config&'+JZY.s.getAccessTokenByAuthorization()
                       },this.config))
                   this.editor.addListener("contentChange",function(){
                       _this.$emit('contentChange', _this.editor.getContent())
                   })
                   this.editor.addListener("ready", function () {
                       // 确保UE加载完成后，放入内容。
//                    _this.editor.setContent(_this.defaultMsg)
                       _this.$emit('ready')


                       console.log('kcuf_u this editor--:',_this.editor)


                   })
               })




            },
            methods: {
                saveFiles(){
                    return new Promise((resolve,reject)=>{

                        if(typeof(UE.globalData.uStore[this.id].xhrResponse) == 'undefined'){
                            resolve()
                            return false
                        }else{
                            let sendKeys='appId businessId categoryId extendName fileSize fullName name path sid type url'.split(' '),
                                body=[];


                            console.log('UE.globalData.uStore[this.id].xhrResponse---:',UE.globalData.uStore[this.id].xhrResponse)
                                UE.globalData.uStore[this.id].xhrResponse.forEach((res)=>{

                                let map={}
                                sendKeys.forEach((key)=>{


                                    map[key]=(res[key])
                                })

                                body.push(map)


                                })


                            JZY.xhr.r({
                                type:'post',
                                data:body,
                                url:JZY.xhr.transformUrl('/disk/attachment/saveBatch','GLOBAL',false)
                            })
                                .then(()=>{
                                    resolve()
                                })
                                .catch(()=>{
                                    JZY.u.errorMsg('保存失败，请重试')
                                    reject()
                                })
                        }


                    })


                },
                // 获取内容方法
                getContent() {
                    return this.editor.getContent()
                },
                getContentTxt() {
                    return this.editor.getContentTxt()
                },
                // 获取内容方法
                setContent(msg) {
                    this.editor.setContent(msg)
                },
                execCommand(cb){
                    cb(this.editor)
                },
                // 设置编辑器可以编辑
                setEnabled() {
                    this.editor.setEnabled()
                },
                // 设置编辑器不可编辑
                setDisabled() {
                    this.editor.setDisabled()
                },

            },
            destroyed() {
                delete uStore[this.id]
                this.editor.destroy()
            }
        }
</script>
