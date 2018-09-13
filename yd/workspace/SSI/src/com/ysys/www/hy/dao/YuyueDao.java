/*
 * Copyright (c) 2009-2010 by DaLian YuDong Computer System CO.,LTD
 * All rights reserved.
 *      Project: SSH
 *    SubSystem: 会议室管理子系统
 */

package com.ysys.www.hy.dao;

import java.util.List;

import com.ysys.www.hy.dao.condition.Hys;

/**
 * 预约或修改会议数据库访问处理
 * 
 * @author zhangdaoqiang
 * @version 1.00 2009/09/22
 */
public interface YuyueDao {

	public abstract List<Hys> getHysAll();

}