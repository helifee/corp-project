package com.test.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class MyInterceptor2 extends AbstractInterceptor
{

	@Override
	public String intercept(ActionInvocation invocation) throws Exception
	{
		System.out.println("intercept2");
		
		String result = invocation.invoke();
		
		System.out.println("finish2");
		
		return result;
	}

}
