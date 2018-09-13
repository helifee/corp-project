<template>
    <el-form ref="form"  :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="l('{officeLocale.goods.detail.theCategory}')+':'" prop="category">
            <el-select v-model="form.category" placeholder="请选择活动区域">
                <el-option label="办公用品1" value="office1"></el-option>
                <el-option label="办公用品2" value="office2"></el-option>
            </el-select>
        </el-form-item>


        <el-form-item label="活动时间">
            <!--<el-col :span="11">-->
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            <!--</el-col>-->
            <!--<el-col class="line" :span="2">-</el-col>-->
            <!--<el-col :span="11">-->
                <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
            <!--</el-col>-->
        </el-form-item>


        <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>


        <el-form-item :label="l('{officeLocale.goods.detail.theCategory}')+':'" prop="category">
            <el-select v-model="stepFourForm.permissionType" :placeholder="l('{approveLocale.set.flowDesign.createApproveType.step_4.permission.permissionTypeSelects}')[0]" @change="permissionTypeSelected">
                <el-option v-for="(item,index) in l('{approveLocale.set.flowDesign.createApproveType.step_4.permission.permissionTypeSelects}')" :key="index" :label="item" :value="index"></el-option>
            </el-select>
        </el-form-item>


        <el-form-item :label="l('{approveLocale.set.flowDesign.createApproveType.step_1.skipRepeatUser.label}')" prop="repeatUser">
            <el-radio-group v-model="stepOneForm.repeatUser">
                radio
                <el-radio v-for="(item,index) in l('{approveLocale.set.flowDesign.createApproveType.step_1.skipRepeatUser.radio}')" :key="index" :label="item"></el-radio>
            </el-radio-group>
        </el-form-item>



        <el-form-item :label="l('{officeLocale.goods.detail.name}')+':'" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
            <el-input autocomplete="off" type="password" placeholder="请输入新密码" v-model="firstLoginFormData.password"></el-input>
        </el-form-item>

    </el-form>
</template>

<script>
    export default {
        rules: {
            name: [
                { required: true, message: '请输入审批环节名称', trigger: 'blur' },
                { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
            ],
            approveType: [
                { required: true, message: '请选择审批类型', trigger: 'change' }
            ],
            approver: [
                { required: true, message: '请选择审批人', trigger: 'change' }
            ],
        },
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>