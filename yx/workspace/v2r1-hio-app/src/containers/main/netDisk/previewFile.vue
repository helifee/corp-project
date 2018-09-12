<template>
    <el-dialog :modalAppendToBody="true" :appendToBody="true" :visible="previewFileDialogVisible" :fullscreen="true"
               @close="handleDialogClose">
        <div style="    width: 100%;
    height: 100%;text-align:center;" :style="{display:isPreviewImg?'table':'block'}" v-loading="isLoadingPreview">

            <span style="display:table-cell; vertical-align:middle;"><img style="" :src="previewFileSrc"
                       v-if="previewFileSrc!=null && isPreviewImg==true"/></span>


            <iframe onload="JZY.setIframeHeight(this)" style="width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;" v-if="previewFileSrc!=null && isPreviewImg==false" :src="previewFileSrc"></iframe>
        </div>


    </el-dialog>
</template>
<script>
    export default {
        mounted(){
          console.log('preview file mounted')
        },
        data(){
          return {
              previewFileDialogVisible:false,
              previewFileSrc:null,
              isLoadingPreview:false,
              isPreviewImg:false,
              currentPreviewRow:null
          }
        },
        methods:{
            handleDialogClose(){
                // console.log('this.currentPreviewRow')
                this.previewFileDialogVisible=false;
                this.previewFileSrc=null;
                this.currentPreviewRow.isLoading=false;
                this.isLoadingPreview=false
            },
            preview(row,TYPE='COMPANY'){
                if(row.preview!=true && TYPE=='COMPANY'){
                    return false
                }

                this.currentPreviewRow=row
                console.log('preview file vue has been invoked')


                let imgTypes = 'jpg jpeg png gif'.split(' '),
                    htmlTypes='xls xlsx txt'.split(' ');
                let supportedExts = "pdf doc ppt docx pptx".split(' ').concat(imgTypes).concat(htmlTypes),
                    extName=(row.fileFullName || row.fileName || row.file.name).split(".").reverse()[0],
                    // extName = row.fileExtendName,
                    isImg = imgTypes.includes(extName),
                    isHtml = htmlTypes.includes(extName)
                // isPreviewHtml
                if (supportedExts.includes(extName)) {


                    let maxFileMB = 10
                    if (row.totalFileSize > maxFileMB * 1024 * 1024) {
                        JZY.u.warningMsg(JZY.locale.$t('previewFileTooLarge', maxFileMB))
                        return false
                    }


                    this.isPreviewImg = isImg


                    this.previewFileDialogVisible = true
                    this.isLoadingPreview = true

                    if (isImg) {
                        this.previewFileDialogVisible = true
                        this.isLoadingPreview = true
                    } else {
                        row.isLoading = true
                    }


                    // this.previewFileDialogVisible=true
                    // this.isLoadingPreview=true


                    let $ = jQuery

                    JZY.xhr.r([
                        // {
                        //     url:location.origin+'/static/pdf-js/build/pdf.js',
                        //     headers:{
                        //         'Content-Type':'application/javascript; charset=UTF-8'
                        //     }
                        // },
                        // {
                        //     url:location.origin+'/static/pdf-js/web/viewer.js',
                        //     headers:{
                        //         'Content-Type':'application/javascript; charset=UTF-8'
                        //     }
                        // },
                        {
                            type: 'post',
                            url: {
                              'COMPANY':'/disk/diskCompanyFile/previewByFileId/' + row.sid,
                                'PERSONAL':'/disk/personalFile/previewByFileId/' + row.sid,
                              'ATTACH':'/disk/attachment/previewByFileId/' + (row.sid||row.xhrResponse.result.file.sid),
                            }[TYPE],
                            settings: {
                                timeout: '600*1000'
                            }

                        }
                    ], 'GLOBAL.GATEWAY.LV_JIE')
                        .then(([res]) => {


                            console.log('preview pdf then')
                            this.isLoadingPreview = false

                            if (isImg) {


                                this.previewFileSrc = res
                            } else {

                                // this.previewFileSrc=res

                                this.previewFileSrc = isHtml?res:('/static/pdf-js/viewer.html?url=' + window.encodeURIComponent(res) +
                                    // this.previewFileSrc='/static/pdf-js/viewer.html?url='+window.encodeURIComponent('http://192.168.3.94/group1/M00/00/00/wKgDXlrdjWCAaJJ5ABFHNegHDBM631.pdf')+
                                    '&name=' + (row.fileName || row.file.name))
                                row.isLoading = false

                                // this.windowOpen(this.previewFileSrc)
                            }


                            // http://localhost:8084/static/pdf-js/viewer.html?url=http%3A%2F%2Flocalhost%3A8084%2Fstatic%2Fpdf-js%2Ftest.pdf&name=123
                            console.log('pdf res--:', res)

                        })
                        .catch(() => {
                            row.isLoading = false
                            this.isLoadingPreview = false
                        })


                    // jQuery.getScript('/static/pdf-js/build/pdf.js',cb)
                    // jQuery.getScript('/static/pdf-js/web/viewer.js',cb)


                }
            }
        }
    }
</script>