/*
 * @(#) BooklendinginfoDaoImpl.java
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 * Project: 远东公司内部网
 * SubSystem: 图书管理系统
 */
package com.yds.library.dao.impl;
import java.util.List;

import org.springframework.stereotype.Repository;
import com.yds.base.dao.AbstractBaseDao;
import com.yds.library.bean.Bookinfo;
import com.yds.library.dao.BooklendinginfoDao;
/**
 * 书籍借阅信息操作
 * @author LIYI
 * @version 1.0 2010/11/29
 */
@Repository("booklendinginfoDao")
public class BooklendinginfoDaoImpl extends AbstractBaseDao implements BooklendinginfoDao{

	/**
	 * 借阅信息取得
	 * 
	 * @param  
	 * @return List<Bookinfo> 书籍详细信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Bookinfo> getbooklendinginfo(Bookinfo bookinfosercth) {
		// TODO Auto-generated method stub
		List<Bookinfo> bookinfo = (List<Bookinfo>) super.queryForList("BooklendinginfoDao.getbooklendinginfo",bookinfosercth);
		return bookinfo;

	}
	/**
	 * 借阅信息的更新
	 * 
	 * @param  id
	 * @return 
	 */
	@Override
	public void updatebooklendinginfo(Bookinfo bookinfoupdate){
		super.update("BooklendinginfoDao.updatebooklendinginfo", bookinfoupdate);
	}
}
