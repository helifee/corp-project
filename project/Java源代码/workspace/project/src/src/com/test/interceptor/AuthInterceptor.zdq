package com.test.interceptor;

import java.util.Map;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

public class AuthInterceptor extends AbstractInterceptor
{
	@Override
	@SuppressWarnings("unchecked")
	public String intercept(ActionInvocation invocation) throws Exception
	{
		Map map = invocation.getInvocationContext().getSession();
		
		if(map.get("user") == null)
		{
			return Action.LOGIN;
		}
		else
		{
			return invocation.invoke();
		}
	}

}
