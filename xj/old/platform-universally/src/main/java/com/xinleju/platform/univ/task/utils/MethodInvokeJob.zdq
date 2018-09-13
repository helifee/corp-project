package com.xinleju.platform.univ.task.utils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.xinleju.platform.tools.data.JacksonUtils;
import org.apache.log4j.Logger;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.PersistJobDataAfterExecution;
import org.quartz.SchedulerException;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.quartz.QuartzJobBean;

/**
 * 自动任务Job调用共通入口
 * @author haoqipeng 
 *
 */
@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class MethodInvokeJob extends QuartzJobBean {
	private static Logger log = Logger.getLogger(MethodInvokeJob.class);
	
	/** 用户定义任务类bean id */
	private String targetBean;
	
	/** 用户定义任务类方法名称 */
	private String targetMethod;
	
	/** 用户定义任务类方法参数 */
	private Object[] arguments;
	
	/**
	 * 获取用户定义任务类bean id
	 * @return
	 */
	public String getTargetBean() {
		return targetBean;
	}

	/**
	 * 设置 用户定义任务类bean id
	 * @param targetBean
	 */
	public void setTargetBean(String targetBean) {
		this.targetBean = targetBean;
	}

	/**
	 * 获取 用户定义任务类方法名称
	 * @return
	 */
	public String getTargetMethod() {
		return targetMethod;
	}

	/**
	 * 设置 用户定义任务类方法名称
	 * @param targetMethod
	 */
	public void setTargetMethod(String targetMethod) {
		this.targetMethod = targetMethod;
	}

	/**
	 * 获取 用户定义任务类方法参数
	 * @return
	 */
	public Object[] getArguments() {
		return arguments;
	}

	/**
	 * 设置 用户定义任务类方法参数
	 * @param arguments
	 */
	public void setArguments(Object[] arguments) {
		this.arguments = arguments;
	}

	/**
	 * 执行自动任务
	 */
	@Override
	protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
		try {
			
			log.info(">>>>>>>>>>>>>>>定时任务执行 task invoking: targetBean=" + targetBean + ", targetMethod=" + targetMethod);
		
			ApplicationContext app = (ApplicationContext) context.getScheduler().getContext().get("applicationContext");
			
			// 从spring中取得自动任务实例
			Object targetObject = app.getBean(targetBean);
			log.info(">>>>>>>>>>>>>>>定时任务执行 task invoking: targetObject=" + JacksonUtils.toJson (targetObject));

			Class<?>[] classes = new Class[arguments.length];
			for(int i = 0; i < arguments.length; i++) {
				classes[i] = String.class;
			}
			log.info(">>>>>>>>>>>>>>>定时任务执行 task invoking: arguments=" + JacksonUtils.toJson (arguments));
			// 根据方法名取得方法对象
			Method method = targetObject.getClass().getMethod(targetMethod, classes);
			
			// 调用自动任务方法
			method.invoke(targetObject, arguments);
			
			log.info(">>>>>>>>>>>>>>>定时任务执行完成 task invoked: targetBean=" + targetBean + ", targetMethod=" + targetMethod);
		} catch (SchedulerException e) {
			e.printStackTrace();
			log.error(e);
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			log.error(e);
		} catch (SecurityException e) {
			e.printStackTrace();
			log.error(e);
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			log.error(e);
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
			log.error(e);
		} catch (InvocationTargetException e) {
			e.printStackTrace();
			log.error(e);
		}
	}

}
