// iframe第三方数据源
const getListByIframeType = (ifmType, formMode='design') => {
  if (ifmType == 'HR') {
    const HR_TYPES = {
      'YGZZ': '员工转正', 
      'RYLZ': '人员离职', 
      'RYDD': '人员调动', 
      'TDX': '调定新', 
      'KQBDK':'补打卡', 
      'KQQJ': '考勤请假', 
      'KQCC': '出差', 
      'KQGC': '市内公出'
    };
    let lists = [];
    for (let k in HR_TYPES) {
      let urlJumper = `/static/hr/hr_jump.html?formMode=${formMode}&bizType=${k}&personId=0&businessId=0`;
      let list = {
        value: urlJumper,
        text: HR_TYPES[k],
      };
      lists.push(list);
    }
    return lists;

  } else if (ifmType == 'CONTRACT') {
    const CONTRACT_TYPES = {
      'OA_CONTRACT_INFO': '合同', 
      'OA_CONTRACT_CHANGE': '合同变更', 
      'OA_CONTRACT_PAYMENT': '合同付款', 
    };
    let lists = [];
    for (let k in CONTRACT_TYPES) {
      let list = {
        value: k,
        text: CONTRACT_TYPES[k],
      };
      lists.push(list);
    }
    return lists;
  }
};

const getDataSrcByContentType = (ifmType, formMode='design') => {
  return getListByIframeType(ifmType, formMode);
}

export default {
  getListByIframeType,
  getDataSrcByContentType,
};
