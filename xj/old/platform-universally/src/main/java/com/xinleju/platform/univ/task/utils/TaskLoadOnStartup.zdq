package com.xinleju.platform.univ.task.utils;

import java.util.List;

import org.apache.log4j.Logger;

import com.xinleju.platform.base.utils.LoginUtils;
import com.xinleju.platform.univ.task.entity.TaskInfo;
import com.xinleju.platform.univ.task.service.TaskInfoService;

/**
 * 
 * 初始化加载任务调度
 * 
 * @author haoqipeng
 *
 */
public class TaskLoadOnStartup {
	
	private static Logger log = Logger.getLogger(TaskLoadOnStartup.class);
	
	public void initExistJob() {
		TaskInfoService taskInfoService = QuartzSpringContext.getBean(TaskInfoService.class);
		String tendCode = LoginUtils.getSecurityUserBeanInfo().getTendCode();
		try {
			List<TaskInfo> taskInfoList = taskInfoService.queryList(null);
			
			for (TaskInfo taskInfo : taskInfoList) {
				QuartzManager.addTask(taskInfo, tendCode);
			}
				
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}

}
