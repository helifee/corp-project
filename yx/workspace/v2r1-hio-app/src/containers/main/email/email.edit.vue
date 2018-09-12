<template>
    <div class="emailedit" style="background: #ffffff;">
        <el-row class="emailrow">
            <el-col :span="24">
                <span class="emailLable">{{l('{emailLocale.content.sender}')}}</span>
                    <el-select class="emailinput" v-model="value9" multiple filterable remote allow-create default-first-option placeholder=" "
                                :remote-method="remoteMethod" :loading="loading">
                        <el-option  v-for="item in options4" :key="item.value" :label="item.label"  :value="item.value"> </el-option>
                    </el-select>
            </el-col>
        </el-row>
        <el-row class="emailrow">
            <el-col :span="24">
                <span class="emailLable">{{l('{emailLocale.edit.cc}')}}</span>
                <el-select class="emailinput" v-model="value9" multiple filterable remote allow-create default-first-option placeholder=" "
                           :remote-method="remoteMethod" :loading="loading">
                    <el-option  v-for="item in options4" :key="item.value" :label="item.label"  :value="item.value"> </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="emailrow">
            <el-col :span="24">
                <span class="emailLable">{{l('{emailLocale.edit.theme}')}}</span>
                <el-input v-model="input" class="emailinput" placeholder=" "></el-input>
            </el-col>
        </el-row>
        <el-upload class="upload-demo"  action="https://jsonplaceholder.typicode.com/posts/"
                   :on-change="handleChange" :file-list="fileList3">
            <el-button size="small" type="text">{{l('{emailLocale.edit.addAttachment}')}}</el-button>
            <span slot="tip" class="el-upload__tip">不超过50M</span>
        </el-upload>
        <div>
            <UEditor id="editor" defaultMsg="请输入内容" :config="UEconfig" ref="UEditor" v-model="projectForm.describe" style="line-height: 24px"></UEditor>
        </div>

    </div>
</template>

<script>
    import UEditor from '@/components/UEditor.vue'
    JZY.locale.add('emailLocale',require('./email.locale'));
    export default {
        name: "emailEdit",
        components:{
            UEditor
        },
        data() {
            return {
                options4: [],
                value9: [],
                list: [],
                loading: false,
                states: ["Alabama", "Alaska", "Arizona",
                    "Arkansas", "California", "Colorado",
                    "Connecticut", "Delaware", "Florida",
                    "Georgia", "Hawaii", "Idaho", "Illinois",
                    "Indiana", "Iowa", "Kansas", "Kentucky",
                    "Louisiana", "Maine", "Maryland",
                    "Massachusetts", "Michigan", "Minnesota",
                    "Mississippi", "Missouri", "Montana",
                    "Nebraska", "Nevada", "New Hampshire",
                    "New Jersey", "New Mexico", "New York",
                    "North Carolina", "North Dakota", "Ohio",
                    "Oklahoma", "Oregon", "Pennsylvania",
                    "Rhode Island", "South Carolina",
                    "South Dakota", "Tennessee", "Texas",
                    "Utah", "Vermont", "Virginia",
                    "Washington", "West Virginia", "Wisconsin",
                    "Wyoming"],
                input:"",
                fileList3: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                    status: 'finished'
                }],
                projectForm:{
                    describe:""
                },
                UEconfig:{
                    initialFrameWidth :null,//设置编辑器宽度
                    initialFrameHeight:350,//设置编辑器高度
                    // 设置不自动调整高度
                    scaleEnabled:false//不可以拉伸
                }
            }
        },
        mounted() {
            this.list = this.states.map(item => {
                return { value: item, label: item };
            });
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.options4 = this.list.filter(item => {
                            return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.options4 = [];
                }
            },
            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            }
        }
    }
</script>

<style lang="scss">
    .emailedit{
        background: #ffffff;
        .emailrow{
            border-bottom: 1px solid #ebeef5;
            padding-left: 10px;
        }
        .emailLable{
            display:inline-block;
            width: 50px;
        }
        .emailinput{
            width: calc(100% - 60px);
            .el-input__inner{
                border: 0;
            }
        }
        .upload-demo{
            width:30%;
            padding-left: 10px;
        }
        .el-upload__tip{
            margin-left:10px;
        }
    }

</style>