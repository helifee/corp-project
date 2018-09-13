import bService from '@mobile/pages/m_crm/m_business/b_service.js'


let detailservice = {
    
    getDetail(param){
        let url =  '/oa/project/projectInfo/mobile/query';
        let params = {
            url:url,
            data:param,
            contentType:'application/json' 
        }
        return bService.setAjaxFn(params);
    },
    getMeetSummary(param){
        let url = '/oa/meeting/meetingSummary/get/' + param;
        let params = {
            url : url,
            type : 'GET'
        }
        return bService.setAjaxFn(params);
    }

}
export default detailservice;