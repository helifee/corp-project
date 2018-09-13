package com.test.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;

public class MyInterceptor implements Interceptor
{

	private String hello;
	
	public String getHello()
	{
		return hello;
	}

	public void setHello(String hello)
	{
		this.hello = hello;
	}

	public void destroy()
	{
		System.out.println("destroy");
	}

	public void init()
	{
		System.out.println("init");
		System.out.println(hello);
	}

	public String intercept(ActionInvocation invocation) throws Exception
	{
		System.out.println("intercept");
		
		String result = invocation.invoke();
		
		System.out.println("finish");
		
		return result;
	}

}
