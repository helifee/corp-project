<template>
        <span style="position: relative;
    top: 5px;
    float:right;">


            <folder v-if="row.isDir"></folder>
            <span v-else>
                <word v-if="'doc docx'.split(' ').includes(ext)"></word>
                <image-icon v-if="'jpg jpeg png gif'.split(' ').includes(ext)"></image-icon>
                <ppt v-if="'ppt pptx'.split(' ').includes(ext)"></ppt>
                <excel v-if="'xls xlsx'.split(' ').includes(ext)"></excel>
                <pdf v-if="'pdf'.split(' ').includes(ext)"></pdf>
                <file v-if="cannotPerview"></file>
            </span>

        </span>
</template>
<style>

</style>
<script>


    import word from './svg/word'
    import folder from './svg/folder'
    import file from './svg/file'
    import imageIcon from './svg/image'
    import ppt from './svg/ppt'
    import excel from './svg/excel'
    import pdf from './svg/pdf'
    export default {
        computed: {
            ext(){
                return (this.row.fileFullName || this.row.fileName || this.row.file.name).split(".").reverse()[0]
            },
            cannotPerview(){

                let extName=(this.row.fileFullName || this.row.fileName || this.row.file.name).split('.').reverse()[0]
                let imgTypes = 'jpg jpeg png gif'.split(' ')
                let supportedExts = "pdf doc ppt xls docx pptx xlsx".split(' ').concat(imgTypes)

                this.row.cannotPerview=!this.row.isDir && (!supportedExts.includes(extName))

                return this.row.cannotPerview
            }
        },

        components:{
            imageIcon,
            ppt,
            excel,
            folder,
            file,
            pdf,
            word
        },
        methods: {

        },
        props: {


            row:Object
            // value: {
            //
            //     type: [Object],
            //     default: {}
            // }
        },
        beforeCreate() {

        },
        created(){

        },
        data() {



            return {

                data:[
                    {
                        // cannotPerview:
                        a:'sdfsdf',
                        isHover:false
                    }
                ]
            }
        },

        beforeDestroy(){

        },
        destroyed(){

        },
        mounted() {



        },

    }
</script>
