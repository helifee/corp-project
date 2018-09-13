package com.interceptor;

public class Client
{
	public static void main(String[] args)
	{
		TargetInterface target = new Target();
		
		MyProxy myProxy = new MyProxy();
		
		TargetInterface proxy = (TargetInterface)myProxy.getProxy(target);
		
		proxy.doSomething();
	}

}
