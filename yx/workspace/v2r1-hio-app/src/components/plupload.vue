
<template>
        <div v-if="supportCurrentBrowser">





          <div ref="container">
            <a ref="pickfiles" href="javascript:;">选择文件</a>
            <!--<a ref="uploadfiles" href="javascript:;">开始上传</a>-->
          </div>

          <!-- <br /> -->

          <div ref="filelist">
            <div :id="file.id" v-for="(file,index) in files" :key="file.id">
              {{file.name}}({{formatSize(file.size)}})<b></b>
              <el-button size="small" @click="deleteFile(file,index)">删除</el-button>
            </div>

            <!--'<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';-->

          </div>

        </div>
</template>
<style>

</style>
<script>

  let $=jQuery

  export default {
    computed: {

    },

    methods: {
      deleteFile(file,index){

        this.files.splice(index,1)
        this.uploader.removeFile(file)

      },
      formatSize(){
        return plupload.formatSize.apply(plupload,arguments)
      }
    },
    props: {



      // value: {
      //
      //     type: [Object],
      //     default: {}
      // }
    },
    beforeCreate() {

    },
    data() {

      return {
          // filesList:{
          //     type:Array,
          //     default:[]
          // },
        uploader:null,
        supportCurrentBrowser:true,
        files:[]
        // files:this.filesList
      }
    },

    mounted() {

      let {u,c}=this.JZY,self=this
      if(u.isIE9()&&(!u.getFlashVersion()==0)){
        this.supportCurrentBrowser=false
        return false
      }





      var uploader=self.uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : self.$refs.pickfiles, // you can pass an id...
        container: self.$refs.container, // ... or DOM Element itself
        url : c.uploadPath,
        flash_swf_url : '/static/plupload/js/Moxie.swf',
        silverlight_xap_url : '/static/plupload/js/Moxie.xap',

          headers:{
              ...JZY.c.AUTO_LOGIN.headers,
              // 'Content-Type': 'application/vnd.google-earth.kml+xml; charset=utf-8'
              // 'Content-Type':"multipart/form-data; boundary=----WebKitFormBoundaryGSBylvUce0o7gM86"
          },
        filters : {
          max_file_size : '10mb',
          // mime_types: [
          //   {title : "Image files", extensions : "jpg,gif,png"},
          //   {title : "Zip files", extensions : "zip"}
          // ]
        },

        init: {
          PostInit: function() {
            // document.getElementById('filelist').innerHTML = '';

            // self.$refs.uploadfiles.onclick = function() {
            //   uploader.start();
            //   return false;
            // };
          },

          FilesAdded: function(up, files) {

            plupload.each(files, function(file) {

              console.log('added file--:',file)



              self.files.push(file)

              // self.$refs.filelist.innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
            });
            uploader.start();
          },

          UploadProgress: function(up, file) {



            self.$nextTick(()=>{
              document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
            })


          },

          Error: function(up, err) {
            u.warningMsg("Error #" + err.code + ": " + err.message)

            // document.getElementById('console').appendChild(document.createTextNode("\nError #" + err.code + ": " + err.message));
          },
          FileUploaded:function(uploader,file,result){
            let resObj
            try{
              resObj=JSON.parse(result.response)
            }catch(e){
              resObj=result.response
            }
            result.response=resObj
            console.log('file uploaded args:',arguments,result)
            self.$emit('fileUploaded',uploader,file,result)
          },
          UploadComplete:function(uploader,files){
            console.log('files completed args:',arguments)
            self.$emit('uploadComplete',uploader,files)
          }
        }
      });

      uploader.init();


      console.log('uploader---:',uploader)


    },

  }
</script>
