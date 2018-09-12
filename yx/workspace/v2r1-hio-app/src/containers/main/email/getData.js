let post = (url = "", data = {}, alertSuccess) => {
  return JZY.xhr
    .post(url, data, { alertSuccess: alertSuccess })
    .then(resultData => {
      try {
        console.info("post方法");
        return resultData;
      } catch (e) {
        this.$message("role.list.vue:" + e);
        return false;
      }
    })
    .catch(e => {
      //接口失败
      console.log("接口失败", e);
      throw new Error(e);
    });
};

let get = (url = "", alertMsg) => {
  return JZY.xhr
    .request(url, false, alertMsg)
    .then(([resultData]) => {
      try {
        console.info("get方法");
        return resultData;
      } catch (e) {
        this.$message("role.list.vue:" + e);
        return false;
      }
    })
    .catch(e => {
      //接口失败
      throw new Error(e);
    });
};

export const fetchEmailBoxList = (queryData) => {
  return post("/platform/mailboxAccount/getMailboxList", queryData, false);
};
