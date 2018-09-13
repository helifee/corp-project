package com.interceptor;

import java.lang.reflect.Proxy;

public class MyProxy
{
	public Object getProxy(Object object)
	{
		MyHandler myHandler = new MyHandler();

		myHandler.setObject(object);

		return Proxy.newProxyInstance(Target.class.getClassLoader(), object
				.getClass().getInterfaces(), myHandler);
	}
}
