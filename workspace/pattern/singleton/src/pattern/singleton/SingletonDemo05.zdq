package pattern.singleton;

/**
 * 通过内部类实现多线程环境中的单例模式
 * 
 * JVM内部的机制能够保证当一个类被加载的时候，这个类的加载过程是线程互斥的。
 * 这样当我们第一次调用getInstance的时候，JVM能够帮我们保证instance只被创建一次，
 * 并且会保证把赋值给instance的内存初始化完毕, 最后instance是在第一次加载SingletonContainer类时被创建的，
 * 而SingletonContainer类则在调用getInstance方法的时候才会被加载，因此也实现了惰性加载。
 */
class Singleton {
	
	private Singleton() {}
	
	private static class SingletonContainer {
		private static Singleton instance = new Singleton();
	}
	
	public static Singleton getInstance() {
		return SingletonContainer.instance;
	}
}

public class SingletonDemo05 {
	public static void main(String[] args) {
		Singleton singleton = Singleton.getInstance();
		Singleton singleton2 = Singleton.getInstance();
		
		System.out.println(singleton == singleton2);
	}
	
	
}
