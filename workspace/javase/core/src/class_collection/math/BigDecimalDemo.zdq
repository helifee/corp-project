package class_collection.math;

import java.math.BigDecimal;

class MyMath {
	public static double add(String num1, String num2) {
		BigDecimal bg1 = new BigDecimal(num1);
		BigDecimal bg2 = new BigDecimal(num2);
		return bg1.add(bg2).doubleValue();
	}
	
	public static double sub(String num1, String num2) {
		BigDecimal bg1 = new BigDecimal(num1);
		BigDecimal bg2 = new BigDecimal(num2);
		return bg1.subtract(bg2).doubleValue();
	}
	
	public static double mul(String num1, String num2) {
		BigDecimal bg1 = new BigDecimal(num1);
		BigDecimal bg2 = new BigDecimal(num2);
		return bg1.multiply(bg2).doubleValue();
	}
	
	public static double div(String num1, String num2) {
		BigDecimal bg1 = new BigDecimal(num1);
		BigDecimal bg2 = new BigDecimal(num2);
		return bg1.divide(bg2).doubleValue();
	}
	
	public static double round(double num, int scale) {
		BigDecimal bg1 = new BigDecimal(num);
		BigDecimal bg2 = new BigDecimal(1);
		return bg1.divide(bg2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}
}

public class BigDecimalDemo {

	public static void main(String[] args) {
		String num1 = "12345.07891";
		String num2 = "5000.0000";
		
		System.out.println("+ " + MyMath.add(num1, num2));
		System.out.println("+ " + MyMath.round(MyMath.add(num1, num2), 2));
		System.out.println("- " + MyMath.round(MyMath.sub(num1, num2), 2));
		System.out.println("* " + MyMath.round(MyMath.mul(num1, num2), 2));
		System.out.println("/ " + MyMath.div(num1, num2));
		System.out.println("/ " + MyMath.round(MyMath.div(num1, num2), 2));
		
	}

}
