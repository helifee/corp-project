package com.i18n;

import java.util.*;
import java.text.*;

public class Test3
{
	public static void main(String[] args)
	{
		Locale locale = Locale.US;
		
		ResourceBundle bundle = ResourceBundle.getBundle("hellofile",locale);
		
		String value = bundle.getString("hello");
		
		String result = MessageFormat.format(value,new Object[]{"±±¾©"});
		
		
		System.out.println(result);
	}
}
