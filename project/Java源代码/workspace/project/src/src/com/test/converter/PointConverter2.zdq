package com.test.converter;

import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;

import com.test.bean.Point;

public class PointConverter2 extends StrutsTypeConverter
{

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass)
	{
		Point point = new Point();
		
		String[] paramValues = values[0].split(",");
		
		int x = Integer.parseInt(paramValues[0]);
		int y = Integer.parseInt(paramValues[1]);
		
		point.setX(x);
		point.setY(y);
		
		return point;
	}

	@Override
	public String convertToString(Map context, Object o)
	{
		Point point = (Point)o;
		
		int x = point.getX();
		int y = point.getY();
		
		String result = "[ x = " + x + " , y = " + y + " ]";
		
		return result;
	}

}
