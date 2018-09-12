import Vue from 'vue'
import vmDataViewer from '@/components/vmDataViewer.vue'
Vue.component('vm-data-viewer',vmDataViewer)
import 'element-ui/lib/theme-chalk/index.css'

//引入全局自定义变量文件，vue文件可无需再次引入，直接使用其中的变量和方法
import '@styles/element.scss'


// 按需引入
import {
    Row ,
    Col,
    Icon,
    Button,
    ButtonGroup,
    Radio,
    RadioButton,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    InputNumber,
    Upload,
    Select,
    Option,
    Switch,
    OptionGroup,
    TimePicker,
    TimeSelect,
    DatePicker,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tree,
    Progress,
    Pagination,
    Alert,
    Loading,
    Message,
    MessageBox,
    Notification,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Dialog,
    Tabs,
    TabPane,
    Badge,
    Popover,
    Tooltip,
    Transfer,
    Collapse,
    CollapseItem,
    Tag,
    Steps,
    Step,
    Card,
    Autocomplete,
    Cascader,
    Slider
} from 'element-ui'

const elementComponents = {
    Row,
    Col,
    Icon,
    Button,
    RadioButton,
    ButtonGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Input,
    InputNumber,
    Upload,
    Select,
    Option,
    OptionGroup,
    TimePicker,
    TimeSelect,
    DatePicker,
    Form,
    FormItem,
    Table,
    TableColumn,
    Tree,
    Progress,
    Pagination,
    Alert,
    Loading,
    Message,
    MessageBox,
    Notification,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    Dialog,
    Tabs,
    TabPane,
    Badge,
    Popover,
    Tooltip,
    Transfer,
    Collapse,
    CollapseItem,
    Tag,
    Steps,
    Step,
    Card,
    Autocomplete,
    Cascader,
    Slider
}
//因为Switch是js关键字只能单独注册
Vue.use(Switch);
Vue.use(Loading.directive);

import '@/locale/elementUI.locale.js'


// import quillEditor from 'vue-quill-editor'
// Vue.use(quillEditor)


Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message


Object.keys(elementComponents).forEach((key) => {
    Vue.component(key, elementComponents[key])
    Vue.component(`el${key}`, elementComponents[key])
})

//项目中所有拥有 size 属性的组件的默认尺寸均为 'small'
// Vue.prototype.$ELEMENT = { size: 'small' }


// import '@/plugins/jquery-ui-custom/jquery-ui.css'
// import '@/plugins/jquery-ui-custom/jquery-ui.js'


import rightSlideModal from '@/components/rightSlideModal.vue'
Vue.component('right-slide-modal',rightSlideModal)

// import colorfulDatePicker from '@/components/colorfulDatePicker.js'
// Vue.component('colorful-date-picker',colorfulDatePicker)

import smartComment from '@/components/smartComment/smartComment.vue'
Vue.component('smart-comment',smartComment)



// import groupTreeLocale from './groupTree.locale'



import treeGrid from '@/components/treeGrid/src/treeGrid.vue'
Vue.component('tree-grid',treeGrid)

import smarterTree from '@/components/smarterTree/src/smarterTree.vue'
Vue.component('smarter-tree',smarterTree)

import transferTree from '@/components/transferTree/src/transferTree.vue'
Vue.component('transfer-tree',transferTree)

import userTree from '@/components/userTree/userTree.vue'
Vue.component('user-tree',userTree)

import deptTree from '@/components/deptTree/deptTree.vue'
Vue.component('dept-tree',deptTree)

import roleTree from '@/components/roleTree/roleTree.vue'
Vue.component('role-tree',roleTree)


import roleDeptTree from '@/components/roleDeptTree/roleDeptTree.vue'
Vue.component('role-dept-tree',roleDeptTree)

import groupTree from '@/components/groupTree/groupTree.vue'
Vue.component('group-tree',groupTree)
// import roleTable from '@/components/roleTable/roleTable.vue'
// Vue.component('role-table',roleTable)

// import treePicker from '@/components/treePicker.vue'
// Vue.component('tree-picker',treePicker)

// import smarterTree from '@/components/smartComment/smartComment.vue'
// Vue.component('smart-comment',smartComment)

import debugLog from '@/components/debugLog.vue'
Vue.component('debug-log',debugLog)

import attachUpload from '@/components/attachUpload.vue'
Vue.component('attach-upload',attachUpload)


// import ueditor from '@/components/UEditor.vue'
// Vue.component('ueditor',ueditor)

// import plupload from '@/components/plupload.vue'
// Vue.component('pl-upload',plupload)


// import smarterDialog from '@/components/smarterDialog.js'
// Vue.component('smarter-dialog',smarterDialog)


//选人组件2.0
import blendTree from '@/components/blendTree/blendTree.vue'
Vue.component('blend-tree',blendTree)


//全局图标icon的svg解决方案
import vueSvgIcon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', vueSvgIcon);