package generics;

public class GenericDemo03 {

	public static void main(String[] args) {
		Point3<String> p = new Point3<String>("10", "20");
		Point3<Object> p2 = new Point3<Object>(14.0f, 23.0f);
		
		fun(p);
		fun(p2);
		
	}
	
	//����,ֻ�ܽ��ձ��?Object
	public static void fun(Point3<? super String> p) {
		
		System.out.println(p.getX());
		System.out.println(p.getY());
	}

}
