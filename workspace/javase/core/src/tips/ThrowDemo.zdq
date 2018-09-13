package tips;

public class ThrowDemo {
	public static void main(String[] args) {
		try {
			double data = 100 /0.0;
			System.out.println("������equals������: " + data);
			if(String.valueOf(data).equals("Infinity")) { 
				throw new ArithmeticException("�����쳣");
			}
		} catch(ArithmeticException e) {
			System.out.println(e);
		}
	}
}