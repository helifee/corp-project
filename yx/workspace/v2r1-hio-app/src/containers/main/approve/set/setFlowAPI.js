import Vue from 'vue'
import createApprove from './createApprove.vue'

let api = {
    _createApprove:{},//缓存createApprove.vue组件的实例this
    setCreateApproveThis(self){//设置this
        // console.info(self.saveDialog())
        this._createApprove = self;
    },
    //获取节点信息
    acProperties(obj){
        console.info(obj);
        // this._createApprove.setCurrentCell(obj);
        this._createApprove.setFlowInfo('newNode',obj)//调用createApprove.vue组件中的新增节点方法
    },
    //连接线基本信息
    stepProperties(obj){
        // this._createApprove.setCurrentCell(obj);
        this._createApprove.setFlowInfo('conditionExpression',obj)
    },
    //条件网关基本信息
    forkProperties(obj){
        // this._createApprove.setCurrentCell(obj);
        this._createApprove.setFlowInfo('conditionGateway',obj)
    },
}
export default api;