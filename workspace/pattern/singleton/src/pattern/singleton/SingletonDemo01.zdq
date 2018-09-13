package pattern.singleton;

/**
 * 饿汉式
 */
class Singleton01 {
	private static Singleton01 instance = new Singleton01();
	
	private Singleton01() {}
	
	public static Singleton01 getInstance() {
		return instance;
	}
}

public class SingletonDemo01 {
	public static void main(String[] args) {
		Singleton01 singleton = Singleton01.getInstance();
		Singleton01 singleton2 = Singleton01.getInstance();
		
		System.out.println(singleton == singleton2);
	}
	
	
}
