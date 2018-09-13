package com.test.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;

import com.test.bean.Point;

public class PointConverter3 extends StrutsTypeConverter
{

	@Override
	public Object convertFromString(Map context, String[] values, Class toClass)
	{
		List<Point> list = new ArrayList<Point>();
		
		for(String value : values)
		{
			Point point = new Point();
			
			String[] paramValues = value.split(",");
			
			int x = Integer.parseInt(paramValues[0]);
			int y = Integer.parseInt(paramValues[1]);
			
			point.setX(x);
			point.setY(y);
			
			list.add(point);
		}
		
		return list;
	}

	@Override
	public String convertToString(Map context, Object o)
	{
		List<Point> list = (List<Point>)o;
		
		StringBuilder sb = new StringBuilder();
		
		sb.append("[ ");
		
		int number = 0 ;
		
		for(Point point : list)
		{
			++number;
			
			int x = point.getX();
			int y = point.getY();
			
			sb.append(number).append(" x = ").append(x).append(" , y = ").append(y).append("  ");
		}
		
		sb.append("]");
		
		return sb.toString();
	}

}
