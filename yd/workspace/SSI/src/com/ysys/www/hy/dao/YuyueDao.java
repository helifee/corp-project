/*
 * Copyright (c) 2009-2010 by DaLian YuDong Computer System CO.,LTD
 * All rights reserved.
 *      Project: SSH
 *    SubSystem: �����ҹ�����ϵͳ
 */

package com.ysys.www.hy.dao;

import java.util.List;

import com.ysys.www.hy.dao.condition.Hys;

/**
 * ԤԼ���޸Ļ������ݿ���ʴ���
 * 
 * @author zhangdaoqiang
 * @version 1.00 2009/09/22
 */
public interface YuyueDao {

	public abstract List<Hys> getHysAll();

}