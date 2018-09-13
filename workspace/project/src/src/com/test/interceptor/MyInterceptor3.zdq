package com.test.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;
import com.test.listener.MyListener;

public class MyInterceptor3 extends MethodFilterInterceptor
{

	@Override
	public void init()
	{
		System.out.println("init3");
	}
	
	@Override
	protected String doIntercept(ActionInvocation invocation) throws Exception
	{
		
		invocation.addPreResultListener(new MyListener());
		
		System.out.println("my interceptor3");

		String result = invocation.invoke();
		
		System.out.println("after my interceptor3 finished");

		return result;
	}

}
