package generics;

public class GenericDemo02 {

	public static void main(String[] args) {
		Point<Integer> p = new Point<Integer>(10, 20);
		Point<Float> p2 = new Point<Float>(14.0f, 23.0f);
		
		//p2 = p;
		//Point<String> p3;
		
		fun(p);
		fun(p2);
		
	}
	
	public static void fun(Point<? extends Number/*����ʱ����*/> p) {
		
		//p.setX(20);	//?ֻ�������ʾ
		
		System.out.println(p.getX());
		System.out.println(p.getY());
	}

}
