package pattern.singleton;

/**
 * 懒汉式（存在多线程问题）
 */
class Singleton02 {
	private static Singleton02 instance = null;
	
	private Singleton02() {}
	
	public static Singleton02 getInstance() {
		if(instance == null) {
			instance = new Singleton02();
		}
		return instance;
	}
}

public class SingletonDemo02 {
	public static void main(String[] args) {
		Singleton02 singleton = Singleton02.getInstance();
		Singleton02 singleton2 = Singleton02.getInstance();
		
		System.out.println(singleton == singleton2);
	}
}
