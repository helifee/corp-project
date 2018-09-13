package com.xinleju.platform.univ.task.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.TriggerKey;
import org.springframework.beans.factory.BeanDefinitionStoreException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
import org.springframework.scheduling.quartz.JobDetailFactoryBean;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
import org.springframework.scheduling.support.CronSequenceGenerator;

import com.xinleju.platform.base.utils.LoginUtils;
import com.xinleju.platform.tools.data.JacksonUtils;
import com.xinleju.platform.univ.task.dto.TaskInfoDto;
import com.xinleju.platform.univ.task.entity.TaskInfo;


public class QuartzManager {
	
	private static Logger log = Logger.getLogger(QuartzManager.class);
	
	/**
	 * 从SpringContext中取得scheduler对象
	 * @return
	 */
	public static Scheduler getScheduler() {
//		Scheduler scheduler = QuartzSpringContext.getBean(QuartzSpringContext.SCHEDULER_NAME);
		Scheduler scheduler = QuartzSpringContext.getBean(QuartzSpringContext.SCHEDULER_NAME);
		return scheduler;
	}
	/**
	 * 动态加载jobDetail实现
	 * 
	 * @param targetObjectRefName 定时任务调用的服务类bean名称
     * @param targetMethod 定时任务调用的方法名
     * @param jobIdentify jobDetail标识
	 */
    public static void loadJobDetailBean(String targetObjectRefName,String targetMethod,String jobIdentify, String[] parameters){
        // 创建定时任务执行对象
        // 创建一个BeanDefinitionBuilder用以标明需要实例化的类，同时将需要的参数赋值给实例化的类
        // 此处是实例化一个quartz JobDetail，通过spring-quartz集成中的MethodInvokingJobDetailFactoryBean来实例化
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(JobDetailFactoryBean.class);
        beanDefinitionBuilder.addPropertyValue("jobClass", MethodInvokeJob.class.getName());//标明一个jobDetail执行的bean名称，这个名称可以是任意一个在spring中注册过的类，比如一些service的实现
//        beanDefinitionBuilder.addPropertyValue("name", MethodInvokeJob.class.getName());
//        beanDefinitionBuilder.addPropertyValue("durability", true);
        Map<String, Object> jobDataMap = new HashMap<>();
        
        jobDataMap.put("targetBean", targetObjectRefName);
        jobDataMap.put("targetMethod", targetMethod);
        jobDataMap.put("arguments", parameters);
        
        beanDefinitionBuilder.addPropertyValue("jobDataAsMap", jobDataMap);
        
//        beanDefinitionBuilder.addPropertyValue("applicationContextJobDataKey", "ctx");
        
        BeanDefinition beanDefinition = beanDefinitionBuilder.getBeanDefinition();//创建一个BeanDefinition

        DefaultListableBeanFactory  defaultListableBeanFactory = 
                (DefaultListableBeanFactory) QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();//获取bean工厂

        // 将bean注册到bean工厂中，至此，我们就可以在需要的地方使用applicationContext的getBean方法获取此jobDetail实例
        // jobIdentify是此实例的标识，我们使用时就使用applicatinoContext.getBean(jobIdentify)获取此实例
        defaultListableBeanFactory.registerBeanDefinition(jobIdentify, beanDefinition);
    }

    /**
     * 动态加载 cronTrigger实现
     * 
     * @param jobDetailRefName jobDetail实现bean名称
     * @param cronExpression cron表达式
     * @param triggerName cronTrigger标识
     */
    public static void loadCronTriggerBean(String jobDetailRefName,String cronExpression,String triggerName){
        //创建定时任务
        //这是创建一个quartz中的cronTrigger，步骤同创建jobDetail实例相同，此处不再赘述
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(CronTriggerFactoryBean.class);
        beanDefinitionBuilder.addPropertyReference("jobDetail", jobDetailRefName);
        beanDefinitionBuilder.addPropertyValue("cronExpression", cronExpression);
        BeanDefinition beanDefinition1 = beanDefinitionBuilder.getBeanDefinition();

        DefaultListableBeanFactory  defaultListableBeanFactory = 
                (DefaultListableBeanFactory) QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();

        defaultListableBeanFactory.registerBeanDefinition(triggerName, beanDefinition1);
    }
    
    /**
     * 动态加载 SimpleTrigger实现
     * 
     * @param jobDetailRefName jobDetail实现bean名称
     * @param repeatInterval 执行时间间隔
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @param triggerName SimpleTrigger标识
     */
    public static void loadSimpleTriggerBean(String jobDetailRefName,long repeatInterval, Date startTime, Date endTime, String triggerName) {
        //创建定时任务
        //这是创建一个quartz中的SimpleTriggerFactoryBean，步骤同创建jobDetail实例相同，此处不再赘述
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(SimpleTriggerFactoryBean.class);
        beanDefinitionBuilder.addPropertyReference("jobDetail", jobDetailRefName);
        beanDefinitionBuilder.addPropertyValue("repeatInterval", repeatInterval);
        beanDefinitionBuilder.addPropertyValue("startTime", startTime);
        BeanDefinition beanDefinition1 = beanDefinitionBuilder.getBeanDefinition();

        DefaultListableBeanFactory  defaultListableBeanFactory = 
                (DefaultListableBeanFactory) QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();

        defaultListableBeanFactory.registerBeanDefinition(triggerName, beanDefinition1);
    }
    
    /**
     * 添加任务
     * @param task
     * @throws Exception 
     */
    public static void addTask(TaskInfo task, String tendCode) throws Exception {
    	
    	// 注册job类
    	Scheduler scheduler = getScheduler();
    	
    	// job类全限定名
    	String jobClassFullName = task.getFullyQualifiedName();
    	
    	// 任务编码 -- dubbo接口配置的id
    	
    	
    	// 方法名：根据erp系统，固定为executeTask
    	int lastDotIndex = jobClassFullName.lastIndexOf('.');
    	String firstLowerCaseLetter = jobClassFullName.substring(lastDotIndex + 1, lastDotIndex + 2).toLowerCase();
    	String targetJobName = firstLowerCaseLetter + jobClassFullName.substring(lastDotIndex + 2);
    	
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	String jobName = getJobName(targetJobRefName, task.getMethodName(), task.getCode());
    	
    	if (!QuartzSpringContext.applicationContext.containsBean(targetJobName)) {
    		QuartzSpringContext.loadDubboCustomer(jobClassFullName, targetJobName);
    	}
    	
    	// 如果 Quartz JobDetail 类在spring中不存在，则向spring注册
    	if (!QuartzSpringContext.applicationContext.containsBean(jobName)) {
    		loadJobDetailBean(targetJobName, task.getMethodName(), jobName, getJobParametersJson(task));
    	}
    	JobDetail jobDetail;
    	try {
			jobDetail = QuartzSpringContext.getBean(jobName);
		} catch (Exception e) {
			try {
				QuartzSpringContext.removeBean(jobName);
			} catch (Exception ex) {}
			throw e;
		}
    	
    	
    	String cronTriggerName = getTriggerName(jobName, task.getMethodName());
    	
    	Calendar startCal = Calendar.getInstance();
		startCal.add(Calendar.HOUR_OF_DAY, 1);
		startCal.set(Calendar.MINUTE, 0);
		startCal.set(Calendar.SECOND, 0);
		task.setStartTime(startCal.getTime());
		Trigger cronTrigger = null;
    	// 如果 Quartz Trigger 类在spring中不存在，则向spring注册
    	if (!QuartzSpringContext.applicationContext.containsBean(cronTriggerName)) {
    		
    		// 创建简单触发器
    		if (task.getSimpleTrigger()) {
    			loadSimpleTriggerBean(jobName, task.getTimeInterval() * 60 * 1000, startCal.getTime(), null, cronTriggerName);
    		}
    		// 创建表达式触发器
    		else {
    			loadCronTriggerBean(jobName, task.getTimeExpression(), cronTriggerName);
    		}
    		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    	} else {
    		throw new BeanDefinitionStoreException("该类、方法和任务编码定义的任务已存在！");
    	}
    	
    	try {
    		task.setJobObjectName(targetJobName);
    		task.setTriggerObjectName(cronTriggerName);
    		// cronTrigger.getJobDataMap().put("taskCode", task.getCode());
    		scheduler.scheduleJob(jobDetail, cronTrigger);
    		if (null != task.getActive() && !task.getActive()) {
    			scheduler.pauseJob(jobDetail.getKey());
    		}
    		
    		log.info("-----> cronTrigger.getStartTime() = " + cronTrigger.getStartTime());
    		log.info("-----> cronTrigger.getNextFireTime() = " + cronTrigger.getNextFireTime());
    		log.info("-----> cronTrigger.getClass() = " + cronTrigger.getClass());
    		log.info("-----> jobDetail.getKey() = " + jobDetail.getKey());
//    		scheduler.triggerJob(jobDetail.getKey());
    		log.info("-----> add quartz job successfully: " + cronTriggerName);
		} catch (SchedulerException e) {
			log.error("添加任务失败", e);
			throw e;
		}
    }
    
    public static void addTaskOld(TaskInfo task, String tendCode) throws Exception {
    	
    	// 注册job类
    	Scheduler scheduler = getScheduler();
    	
    	String jobClassFullName = task.getFullyQualifiedName();
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	String jobName = getJobName(targetJobRefName, task.getMethodName(), task.getCode());
    	
    	// 如果自定义 task job 类在Spring中不存在，则向spring注册
    	if (!QuartzSpringContext.applicationContext.containsBean(targetJobRefName)) {
    		QuartzSpringContext.addBean(jobClassFullName, targetJobRefName);
    	}
    	
    	// 如果 Quartz JobDetail 类在spring中不存在，则向spring注册
    	if (!QuartzSpringContext.applicationContext.containsBean(jobName)) {
    		loadJobDetailBean(targetJobRefName, task.getMethodName(), jobName, getJobParametersJson(task));
    	}
    	
    	JobDetail jobDetail = QuartzSpringContext.getBean(jobName);
    	
    	String cronTriggerName = getTriggerName(jobName, task.getMethodName());
    	
    	Calendar startCal = Calendar.getInstance();
		startCal.add(Calendar.HOUR_OF_DAY, 1);
		startCal.set(Calendar.MINUTE, 0);
		startCal.set(Calendar.SECOND, 0);
		
		Trigger cronTrigger = null;
    	// 如果 Quartz Trigger 类在spring中不存在，则向spring注册
    	if (!QuartzSpringContext.applicationContext.containsBean(cronTriggerName)) {
    		
    		// 创建简单触发器
    		if (task.getSimpleTrigger()) {
    			loadSimpleTriggerBean(jobName, task.getTimeInterval() * 60 * 1000, startCal.getTime(), null, cronTriggerName);
    		}
    		// 创建表达式触发器
    		else {
    			loadCronTriggerBean(jobName, task.getTimeExpression(), cronTriggerName);
    		}
    		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    	} else {
    		throw new BeanDefinitionStoreException("该类和方法所定义的任务已经存在！");
//    		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
//    		// 更新Trigger状态
//        	if (task.getSimpleTrigger() == false && cronTrigger instanceof CronTrigger) {
//    			CronTrigger newTrigger = (CronTrigger) cronTrigger;
//    			cronTrigger = newTrigger.getTriggerBuilder().forJob(jobDetail).withSchedule(CronScheduleBuilder.cronSchedule(task.getTimeExpression())).build();
//    		} else if (task.getSimpleTrigger() && cronTrigger instanceof SimpleTrigger) {
//    			SimpleTrigger newTrigger = (SimpleTrigger) cronTrigger;
//    			cronTrigger = newTrigger.getTriggerBuilder().forJob(jobDetail).withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInMinutes(task.getTimeInterval())).startAt(startCal.getTime()).build();
//    		} else {
//    			QuartzSpringContext.removeBean(cronTriggerName);
//    			// 创建简单触发器
//        		if (task.getSimpleTrigger()) {
//        			loadSimpleTriggerBean(jobName, task.getTimeInterval() * 60 * 1000, startCal.getTime(), null, cronTriggerName);
//        		}
//        		// 创建表达式触发器
//        		else {
//        			loadCronTriggerBean(jobName, task.getTimeExpression(), cronTriggerName);
//        		}
//        		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
//    		}
    	}
    	
    	try {
    		task.setJobObjectName(targetJobRefName);
    		task.setTriggerObjectName(cronTriggerName);
    		cronTrigger.getJobDataMap().put("taskCode", task.getCode());
    		scheduler.scheduleJob(jobDetail, cronTrigger);
    		if (null != task.getActive() && !task.getActive()) {
    			scheduler.pauseJob(jobDetail.getKey());
    		}
    		
//    		if (!scheduler.isShutdown() && scheduler.isInStandbyMode()) {
//    			scheduler.start();
//    			log.info("添加任务成功，启动完成：" + jobClassFullName + "." + task.getMethodName());
//    		}JobKey.jobKey(jobName, Scheduler.DEFAULT_GROUP)
    		
    		log.info("-----> cronTrigger.getStartTime() = " + cronTrigger.getStartTime());
    		log.info("-----> cronTrigger.getNextFireTime() = " + cronTrigger.getNextFireTime());
    		log.info("-----> cronTrigger.getClass() = " + cronTrigger.getClass());
    		log.info("-----> jobDetail.getKey() = " + jobDetail.getKey());
//    		scheduler.triggerJob(jobDetail.getKey());
    		log.info("-----> add quartz job successfully: " + cronTriggerName);
		} catch (SchedulerException e) {
			log.error("添加任务失败", e);
			throw e;
		}
    }
    
    /**
     * 更新任务
     * @param task
     * @throws SchedulerException 
     */
    public static void updateTask(TaskInfo task, String tendCode) throws Exception {
    	
    	// 注册job类
    	Scheduler scheduler = getScheduler();
    	
    	String jobClassFullName = task.getFullyQualifiedName();
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	String jobIdentify = getJobName(targetJobRefName, task.getMethodName(), task.getCode());
    	
    	int lastDotIndex = jobClassFullName.lastIndexOf('.');
    	String firstLowerCaseLetter = jobClassFullName.substring(lastDotIndex + 1, lastDotIndex + 2).toLowerCase();
    	String targetJobName = firstLowerCaseLetter + jobClassFullName.substring(lastDotIndex + 2);
    	
    	if (!QuartzSpringContext.applicationContext.containsBean(targetJobName)) {
    		QuartzSpringContext.loadDubboCustomer(jobClassFullName, targetJobName);
    	}
    	
    	if (!QuartzSpringContext.applicationContext.containsBean(jobIdentify)) {
			loadJobDetailBean(targetJobName, task.getMethodName(), jobIdentify, getJobParametersJson(task));
    	}
    	
    	JobDetail jobDetail;
    	try {
    		jobDetail = QuartzSpringContext.getBean(jobIdentify);
		} catch (Exception e) {
			try {
				QuartzSpringContext.removeBean(jobIdentify);
			} catch (Exception ex) {}
			throw e;
		}
    	
    	
    	String cronTriggerName = getTriggerName(jobIdentify, task.getMethodName());
    	
    	Calendar startCal = Calendar.getInstance();
		startCal.add(Calendar.HOUR_OF_DAY, 1);
		startCal.set(Calendar.MINUTE, 0);
		startCal.set(Calendar.SECOND, 0);
		
		Trigger cronTrigger = null;
    	// 如果 Quartz Trigger 类在spring中不存在，则向spring注册
    	if (!QuartzSpringContext.applicationContext.containsBean(cronTriggerName)) {
    		
    		// 创建简单触发器
    		if (task.getSimpleTrigger()) {
    			loadSimpleTriggerBean(jobIdentify, task.getTimeInterval() * 60 * 1000, startCal.getTime(), null, cronTriggerName);
    		}
    		// 创建表达式触发器
    		else {
    			loadCronTriggerBean(jobIdentify, task.getTimeExpression(), cronTriggerName);
    		}
    		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    	} else {
    		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    		// 更新Trigger状态
        	if (task.getSimpleTrigger() == false && cronTrigger instanceof CronTrigger) {
    			CronTrigger newTrigger = (CronTrigger) cronTrigger;
    			cronTrigger = newTrigger.getTriggerBuilder().forJob(jobDetail).withSchedule(CronScheduleBuilder.cronSchedule(task.getTimeExpression())).build();
    		} else if (task.getSimpleTrigger() && cronTrigger instanceof SimpleTrigger) {
    			SimpleTrigger newTrigger = (SimpleTrigger) cronTrigger;
    			cronTrigger = newTrigger.getTriggerBuilder().forJob(jobDetail).withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInMinutes(task.getTimeInterval())).startAt(startCal.getTime()).build();
    		} else {
    			QuartzSpringContext.removeBean(cronTriggerName);
    			// 创建简单触发器
        		if (task.getSimpleTrigger()) {
        			loadSimpleTriggerBean(jobIdentify, task.getTimeInterval() * 60 * 1000, startCal.getTime(), null, cronTriggerName);
        		}
        		// 创建表达式触发器
        		else {
        			loadCronTriggerBean(jobIdentify, task.getTimeExpression(), cronTriggerName);
        		}
        		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    		}
    	}
    	
    	try {
    		log.info("-----> " + cronTrigger.getJobKey().getName() + ": startTime is " + cronTrigger.getStartTime());
    		log.info("-----> " + cronTrigger.getJobKey().getName() + ": nextFireTime is " + cronTrigger.getNextFireTime());
    		task.setJobObjectName(targetJobName);
    		task.setTriggerObjectName(cronTriggerName);
    		scheduler.rescheduleJob(cronTrigger.getKey(), cronTrigger);
    		if (null != task.getActive() && !task.getActive()) {
    			scheduler.pauseJob(jobDetail.getKey());
    		}
    		// scheduler.triggerJob(jobDetail.getKey());
    		if (!scheduler.isShutdown() && scheduler.isInStandbyMode()) {
    			scheduler.start();
    		}
    		log.info("-----> update quartz job successfully: " + cronTriggerName);
		} catch (SchedulerException e) {
			log.error("更新任务失败", e);
			throw e;
		}
    }

    public static void updateTaskOld(TaskInfo task, String tendCode) throws SchedulerException {
    	
    	// 注册job类
    	Scheduler scheduler = getScheduler();
    	
    	String jobClassFullName = task.getFullyQualifiedName();
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	String jobIdentify = getJobName(targetJobRefName, task.getMethodName(), task.getCode());
    	
    	if (!QuartzSpringContext.applicationContext.containsBean(jobIdentify)) {
    		if (!QuartzSpringContext.applicationContext.containsBean(targetJobRefName)) {
    			QuartzSpringContext.addBean(jobClassFullName, targetJobRefName);
    		}
    		loadJobDetailBean(targetJobRefName, task.getMethodName(), jobIdentify, getJobParametersJson(task));
    	}
    	JobDetail jobDetail = QuartzSpringContext.getBean(jobIdentify);
    	
    	String cronTriggerName = getTriggerName(jobIdentify, task.getMethodName());
    	
//    	@SuppressWarnings("unused")
//		Trigger t = scheduler.getTrigger(TriggerKey.triggerKey(cronTriggerName, Scheduler.DEFAULT_GROUP));
    	
    	Calendar startCal = Calendar.getInstance();
		startCal.add(Calendar.HOUR_OF_DAY, 1);
		startCal.set(Calendar.MINUTE, 0);
		startCal.set(Calendar.SECOND, 0);
		
		Trigger cronTrigger = null;
    	// 如果 Quartz Trigger 类在spring中不存在，则向spring注册
    	if (!QuartzSpringContext.applicationContext.containsBean(cronTriggerName)) {
    		
    		// 创建简单触发器
    		if (task.getSimpleTrigger()) {
    			loadSimpleTriggerBean(jobIdentify, task.getTimeInterval() * 60 * 1000, startCal.getTime(), null, cronTriggerName);
    		}
    		// 创建表达式触发器
    		else {
    			loadCronTriggerBean(jobIdentify, task.getTimeExpression(), cronTriggerName);
    		}
    		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    	} else {
    		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    		// 更新Trigger状态
        	if (task.getSimpleTrigger() == false && cronTrigger instanceof CronTrigger) {
    			CronTrigger newTrigger = (CronTrigger) cronTrigger;
    			cronTrigger = newTrigger.getTriggerBuilder().forJob(jobDetail).withSchedule(CronScheduleBuilder.cronSchedule(task.getTimeExpression())).build();
    		} else if (task.getSimpleTrigger() && cronTrigger instanceof SimpleTrigger) {
    			SimpleTrigger newTrigger = (SimpleTrigger) cronTrigger;
    			cronTrigger = newTrigger.getTriggerBuilder().forJob(jobDetail).withSchedule(SimpleScheduleBuilder.simpleSchedule().withIntervalInMinutes(task.getTimeInterval())).startAt(startCal.getTime()).build();
    		} else {
    			QuartzSpringContext.removeBean(cronTriggerName);
    			// 创建简单触发器
        		if (task.getSimpleTrigger()) {
        			loadSimpleTriggerBean(jobIdentify, task.getTimeInterval() * 60 * 1000, startCal.getTime(), null, cronTriggerName);
        		}
        		// 创建表达式触发器
        		else {
        			loadCronTriggerBean(jobIdentify, task.getTimeExpression(), cronTriggerName);
        		}
        		cronTrigger = QuartzSpringContext.getBean(cronTriggerName);
    		}
    	}
    	
    	try {
    		log.info("-----> " + cronTrigger.getJobKey().getName() + ": startTime is " + cronTrigger.getStartTime());
    		log.info("-----> " + cronTrigger.getJobKey().getName() + ": nextFireTime is " + cronTrigger.getNextFireTime());
    		task.setJobObjectName(targetJobRefName);
    		task.setTriggerObjectName(cronTriggerName);
    		scheduler.rescheduleJob(cronTrigger.getKey(), cronTrigger);
    		if (null != task.getActive() && !task.getActive()) {
    			scheduler.pauseJob(jobDetail.getKey());
    		}
    		// scheduler.triggerJob(jobDetail.getKey());
    		if (!scheduler.isShutdown() && scheduler.isInStandbyMode()) {
    			scheduler.start();
    		}
    		log.info("-----> update quartz job successfully: " + cronTriggerName);
		} catch (SchedulerException e) {
			log.error("更新任务失败", e);
			throw e;
		}
    }

    
    /**
     * 暂停任务
     * @param task
     * @throws SchedulerException
     */
    public static void pauseTask(TaskInfo task, String tendCode) throws SchedulerException {
    	
    	String jobClassFullName = task.getFullyQualifiedName();
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	
    	JobKey jobKey = new JobKey(getJobName(targetJobRefName, task.getMethodName(), task.getCode()));
    	
    	try {
    		getScheduler().pauseJob(jobKey);
		} catch (SchedulerException e) {
			log.error("暂停任务失败", e);
			throw e;
		}
    }
    
    /**
     * 恢复任务
     * @param task
     * @throws SchedulerException
     */
    public static void resumeTask(TaskInfo task, String tendCode) throws SchedulerException {
    	
    	String jobClassFullName = task.getFullyQualifiedName();
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	
    	JobKey jobKey = new JobKey(getJobName(targetJobRefName, task.getMethodName(), task.getCode()));
    	
    	try {
    		getScheduler().resumeJob(jobKey);
		} catch (SchedulerException e) {
			log.error("恢复任务失败", e);
			throw e;
		}
    }
    
    /**
     * 立即执行任务
     * @param task
     * @throws SchedulerException
     */
    public static void triggerTask(TaskInfo task, String tendCode) throws SchedulerException {
    	
    	String jobClassFullName = task.getFullyQualifiedName();
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	
    	JobKey jobKey = new JobKey(getJobName(targetJobRefName, task.getMethodName(), task.getCode()));
    	
    	try {
    		getScheduler().triggerJob(jobKey);
		} catch (SchedulerException e) {
			log.error("立即执行任务失败", e);
			throw e;
		}
    }
    
    /**
     * 删除任务
     * @param task
     * @throws SchedulerException
     */
    public static void deleteTask(TaskInfo task, String tendCode) throws SchedulerException {
    	
    	String jobClassFullName = task.getFullyQualifiedName();
    	String targetJobRefName = getBeanNameByClassName(jobClassFullName, tendCode);
    	
    	String jobIdentify = getJobName(targetJobRefName, task.getMethodName(), task.getCode());
    	String cronTriggerName = getTriggerName(jobIdentify, task.getMethodName());
    	JobKey jobKey = new JobKey(jobIdentify, Scheduler.DEFAULT_GROUP);
    	
    	Scheduler scheduler = getScheduler();
    	try {
    		TriggerKey triggerKey = TriggerKey.triggerKey(cronTriggerName, Scheduler.DEFAULT_GROUP);
    		scheduler.pauseTrigger(triggerKey);
    		scheduler.unscheduleJob(triggerKey);
    		QuartzSpringContext.removeBean(cronTriggerName);
    		scheduler.deleteJob(jobKey);
    		QuartzSpringContext.removeBean(jobIdentify);
    		log.info("-----> delete quartz job successfully: " + cronTriggerName);
		} catch (SchedulerException e) {
			log.error("删除任务失败", e);
			throw e;
		}
    }

    public static void getBatchNextFireTime(List<TaskInfoDto> list) throws SchedulerException {
    	log.debug("\n\n------------------------------------");
		if (list != null && list.size() > 0) {
			Date now = new Date();
			CronSequenceGenerator csg;
			for (TaskInfoDto task : list) {
				if (task.getSimpleTrigger() == false) {
					csg = new CronSequenceGenerator(task.getTimeExpression());
					task.setNextFireTime(csg.next(now));
				} else {
					// 任务调度开始时间
					Date start = task.getStartTime();
					if (start == null) {
						log.error("简单定时任务的开始时间未定义，不能计算下次执行时间：" + JacksonUtils.toJson(task));
						continue;
					}
					
					// 当前时间和任务调度开始时间的时间差
					long ml = (now.getTime() - start.getTime());
					Calendar cal = Calendar.getInstance();
					if (ml > 0) {
						
						if (ml % (task.getTimeInterval() * 1000 * 60) == 0) {
							cal.setTime(now);
							cal.add(Calendar.MINUTE, task.getTimeInterval());
							task.setNextFireTime(cal.getTime());
						} else {
							cal.setTime(start);
							cal.add(Calendar.MINUTE, Long.valueOf(ml/(1000 * 60) + task.getTimeInterval()).intValue());
							task.setNextFireTime(cal.getTime());
						}
					} else {
						cal.setTime(start);
						cal.add(Calendar.MINUTE, task.getTimeInterval());
						task.setNextFireTime(cal.getTime());
					}
				}
			}
		}
		log.debug("\n------------------------------------\n\n");
		
	}
    
    private static String getTriggerName(String jobIdentify, String methodName) {
		String cronTriggerName = jobIdentify + "_" + methodName + "_Trigger";
		return cronTriggerName;
	}
    
	private static String getJobName(String targetJobRefName, String methodName, String taskCode) {
		String jobIdentify = targetJobRefName + "_" + methodName + "_" + taskCode + "_Job";
		return jobIdentify;
	}
	
    private static String getBeanNameByClassName(String jobClassFullName, String tendCode) {
    	// job实例ID，类名（首字母小写）
    	// int start = jobClassFullName.lastIndexOf('.') + 1;
    	// String targetJobRefName = jobClassFullName.substring(start, start + 1).toLowerCase() + jobClassFullName.substring(jobClassFullName.lastIndexOf('.') + 2);
    	return jobClassFullName + "_" + tendCode;
    }
    
    private static String[] getJobParametersJson(TaskInfo task) {
    	
    	Map<String, Object> param = new HashMap<>();
    	param.put("taskCode", task.getCode());
    	String jobParam = JacksonUtils.toJson(param);
    	if (task.getIsForPlatform()) {
    		String userInfo = JacksonUtils.toJson(LoginUtils.getSecurityUserBeanInfo());
    		return new String[]{userInfo, jobParam};
    	} else {
    		return new String[]{jobParam};
    	}
    	
    }
	
}
