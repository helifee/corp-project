package pattern.singleton;

/**
 * 懒汉式，同步方法
 */
class Singleton03 {
	private static Singleton03 instance = null;
	
	private Singleton03() {}
	
	public static synchronized Singleton03 getInstance() {
		
		//效率不高，只有第一次new时才锁住
		if(instance == null) {
			instance = new Singleton03();
		}
		return instance;
	}
}

public class SingletonDemo03 {
	public static void main(String[] args) {
		Singleton03 singleton = Singleton03.getInstance();
		Singleton03 singleton2 = Singleton03.getInstance();
		
		System.out.println(singleton == singleton2);
	}
}
