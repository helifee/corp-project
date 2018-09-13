/**
 * timeUnit:
 * 1:分钟
 * 2:小时
 * 3:工作日
 * 4:自然日
 * 5:周
 * 
 * voteType
 * 1:一个同意
 * 2:全部同意
 * 3:同意数量
 * 4:同意比例
 * 
 * freeType
 * 1:直接后继活动
 * 2:所有后继活动
 * 
 * paticitpantSelect
 * 1:自动
 * 2:让用户从预定义中选择
 * 3:让用户任意选择
 *  
 * backStartType
 * 1:直接运行
 * 2:待激活
 * 3:运行时指定(N/A)
 * 
 * backStartPaticipant
 * 1:目标活动实际执行者
 * 2:目标活动定义参与人
 * 3:退回时指定
 * 
 * 
 * forkType
 * 1:单一分支(XOR)
 * 2:条件分支(OR)
 * 3:全部分支(AND)
 * 
 * joinType
 * 1:单一聚合(XOR)
 * 2:条件聚合(OR
 * 3:全部聚合(AND)
 * 
 */

var TF = {
	TIME_NUIT_DEFAUTL : 4,
	AC_PRIORITY_DEFAUTL:0,
	AC_FREE_TYPE_DEFAUTL : 1,
	AC_PATICIPANT_SELECT_DEFAUTL : 2,
	AC_BACK_START_TYPE_DEFAUTL : 1,
	AC_BACK_START_PATICIPANT_DEFAUTL : 1,
	AC_FINISH_CTRL_DEFAULT : 'com.telehot.flow.service.impl.XorFinishTypeService',
	PSS_DEFAULT:2
};
function iframeChangeSize(iframe,extHeight) {
	if(extHeight==null){
		extHeight = 0;
	}
	var pTar = null; 
	if (document.getElementById){ 
		pTar = document.getElementById(iframe); 
	} 
	else{ 
		eval('pTar = ' + iframe + ';'); 
	} 
	if (pTar && !window.opera){ 
		pTar.style.display="block" 
		if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){ 
			//ns6 syntax 
			pTar.height = pTar.contentDocument.body.offsetHeight +extHeight; 
		} 
		else if (pTar.Document && pTar.Document.body.scrollHeight){ 
			//ie5+ syntax 
			pTar.height = pTar.Document.body.scrollHeight +extHeight; 
		}
	}   
}