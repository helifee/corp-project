package com.xinleju.platform.univ.task.utils;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

import com.xinleju.platform.base.service.DataSourceBeanService;
import com.xinleju.platform.base.vo.TendDataSourceVo;

public class QuartzSpringContext implements ApplicationContextAware {
	private static Logger log = Logger.getLogger(QuartzSpringContext.class);
	
	public static final String SCHEDULER_NAME = "xlj_scheduler";
	
	public static ApplicationContext applicationContext;

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		QuartzSpringContext.applicationContext = applicationContext;
		
		// 初始化所有租户任务
		// initTaskSchedulersForEachTend();
		//initTaskSchedulers();
		// ((SchedulerFactoryBean) QuartzSpringContext.applicationContext.getBean(SCHEDULER_NAME)).start();;
		try {
			SchedulerFactoryBean s = QuartzSpringContext.applicationContext.getBean(SchedulerFactoryBean.class);
			s.start();
			
			// 自动注册已存在的任务调度
		} catch(Exception e){
			log.error(e.getMessage(), e);
			throw e;
		};
	}
	
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String beanName) {
		return (T) QuartzSpringContext.applicationContext.getBean(beanName);
	}
	
	public static <T> T getBean(Class<T> requiredType) {
		return QuartzSpringContext.applicationContext.getBean(requiredType);
	}
	
	/**
	 * 向 Spring Context 中添加 bean 实例
	 * @param classFullName 类名
	 * @param beanIdentify bean ID
	 */
	public static <T> T addBean(String classFullName, String beanIdentify) {
		
		if (QuartzSpringContext.applicationContext.containsBean(beanIdentify)){
			throw new BeanCreationException(beanIdentify, "向Spring中注册bean失败，bean "+ beanIdentify + "已经存在");
		}
		
		BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(classFullName);
		BeanDefinition beanDefinition = beanDefinitionBuilder.getBeanDefinition();

		DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();// 获取bean工厂

		// 将bean注册到bean工厂中，至此，我们就可以在需要的地方使用applicationContext的getBean方法获取此bean实例
		// beanIdentify是此实例的标识，我们使用时就使用applicatinoContext.getBean(beanIdentify)获取此实例
		defaultListableBeanFactory.registerBeanDefinition(beanIdentify, beanDefinition);
		
		return QuartzSpringContext.getBean(beanIdentify);
	}
	
	/**
	 * 向 Spring Context 中添加 bean 实例
	 * @param beanClass 类Class对象
	 * @param beanIdentify bean ID
	 */
	public static <T> T addBean(Class<T> beanClass, String beanIdentify) {

		if (QuartzSpringContext.applicationContext.containsBean(beanIdentify)){
			throw new BeanCreationException(beanIdentify, "向Spring中注册bean失败，bean "+ beanIdentify + "已经存在");
		}
		
		BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(beanClass);
		BeanDefinition beanDefinition = beanDefinitionBuilder.getBeanDefinition();

		DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();// 获取bean工厂

		defaultListableBeanFactory.registerBeanDefinition(beanIdentify, beanDefinition);
		
		return QuartzSpringContext.getBean(beanIdentify);
	}
	
	public static <T> T loadDubboCustomer(String classFullName,String refenceId) throws Exception{
    	/*ReferenceBean<T> referenceBean = new ReferenceBean<T>();  
	    
    	referenceBean.setApplicationContext(QuartzSpringContext.applicationContext);  
    	
    	referenceBean.setInterface(classFullName);
    	referenceBean.setRetries(0);
        try {
        	referenceBean.afterPropertiesSet();
        	referenceBean.setId(refenceId);
        	referenceBean.setCheck(false);
        	T ct = referenceBean.get();
        	return ct;
		} catch (Exception e) {
			log.error("动态加载dubbo消费者发生异常", e);
			throw e;
		}*/
		return null;
    }
	
	
	/**
	 * 从 Spring Context 删除Bean
	 * @param beanIdentify
	 */
	public static <T> void removeBean(String beanIdentify) {

		if (!QuartzSpringContext.applicationContext.containsBean(beanIdentify)){
			return;
		}
		DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();// 获取bean工厂
		defaultListableBeanFactory.removeBeanDefinition(beanIdentify);
		
	}
	
	private static void initTaskSchedulers() {
		DefaultListableBeanFactory defaultFactory  = (DefaultListableBeanFactory)QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();
		
		BeanDefinitionBuilder schedulerFactoryBuilder = BeanDefinitionBuilder.genericBeanDefinition(SchedulerFactoryBean.class);
		schedulerFactoryBuilder.getBeanDefinition().setAttribute("id", SCHEDULER_NAME);
		schedulerFactoryBuilder.addPropertyValue("configLocation", "classpath:quartz.properties");
		schedulerFactoryBuilder.addPropertyValue("applicationContextSchedulerContextKey", "applicationContext");
		//schedulerFactoryBuilder.addPropertyReference("dataSource", database.getTendCode());QuartzSpringContext.getBean("schedulerFactoryBean_test_test031");
		schedulerFactoryBuilder.addPropertyReference("taskExecutor", "taskExecutor");
		//schedulerFactoryBuilder.addPropertyReference("transactionManager", "transactionManager");
		schedulerFactoryBuilder.addPropertyValue("overwriteExistingJobs", "true");
		defaultFactory.registerBeanDefinition(SCHEDULER_NAME, schedulerFactoryBuilder.getBeanDefinition());
		
		// 查询对应的任务job，添加到任务调度中去
		
		log.debug("Register a new SchedulerFactoryBean bean definition :" + SCHEDULER_NAME);
		
			
	}
	
	
	/**
	 * 为每个租户（数据库）创建SchedulerFactory
	 */
	@SuppressWarnings("unused")
	private static void initTaskSchedulersForEachTend(SchedulerFactoryBean schfb) {
		DefaultListableBeanFactory defaultFactory  = (DefaultListableBeanFactory)QuartzSpringContext.applicationContext.getAutowireCapableBeanFactory();
		DataSourceBeanService dataService = defaultFactory.getBean(DataSourceBeanService.class);
		
		List<TendDataSourceVo> databaseList = dataService.getTendDataSourceVoList();
		
		for (TendDataSourceVo database : databaseList) {
			/*BeanDefinitionBuilder schedulerFactoryBuilder = BeanDefinitionBuilder.genericBeanDefinition(SchedulerFactoryBean.class);
			System.out.println( database.getTendCode());
			String schedulerFactoryBeanName = "schedulerFactoryBean_" + database.getTendCode();
			schedulerFactoryBuilder.getBeanDefinition().setAttribute("id", schedulerFactoryBeanName);
			schedulerFactoryBuilder.addPropertyValue("configLocation", "classpath:quartz.properties");
			schedulerFactoryBuilder.addPropertyValue("applicationContextSchedulerContextKey", "applicationContext");
			//schedulerFactoryBuilder.addPropertyReference("dataSource", database.getTendCode());QuartzSpringContext.getBean("schedulerFactoryBean_test_test031");
			schedulerFactoryBuilder.addPropertyReference("taskExecutor", "taskExecutor");
			//schedulerFactoryBuilder.addPropertyReference("transactionManager", "transactionManager");
			schedulerFactoryBuilder.addPropertyValue("overwriteExistingJobs", "true");
			defaultFactory.registerBeanDefinition(schedulerFactoryBeanName, schedulerFactoryBuilder.getBeanDefinition());
			*/
			
			/*log.debug("Register a new SchedulerFactoryBean bean definition :" + schedulerFactoryBeanName);*/

			// 查询对应的任务job，添加到任务调度中去
			
		}
			
			
	}

}
