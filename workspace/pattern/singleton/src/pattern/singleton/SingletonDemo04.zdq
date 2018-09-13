package pattern.singleton;

/**
 * 双重检查
 */
class Singleton04 {
	private static Singleton04 instance = null;
	
	private Singleton04() {}
	
	/**
		对于JVM而言，它执行的是一个个Java指令。在Java指令中创建对象和赋值操作是分开进行的，
		也就是说instance = new Singleton();语句是分两步执行的。但是JVM并不保证这两个操作的先后顺序，
		也就是说有可能JVM会为新的Singleton实例分配空间，然后直接赋值给instance成员，然后再去初始化这个Singleton实例。
		这样就使出错成为了可能，我们仍然以A、B两个线程为例：
		1.A、B线程同时进入了第一个if判断
		2.A首先进入synchronized块，由于instance为null，所以它执行instance = new Singleton();
		3.由于JVM内部的优化机制，JVM先画出了一些分配给Singleton实例的空白内存，并赋值给instance成员（注意此时JVM没有开始初始化这个实例），然后A离开了synchronized块。
		4.B进入synchronized块，由于instance此时不是null，因此它马上离开了synchronized块并将结果返回给调用该方法的程序。
		5.此时B线程打算使用Singleton实例，却发现它没有被初始化，于是错误发生了。
	 */
	public static Singleton04 getInstance() {
		
		if(instance == null) {
			synchronized(Singleton04.class) {	//同步代码块
				if(instance == null) {
					instance = new Singleton04();
				}
			}
		}
		return instance;
	}
}

public class SingletonDemo04 {
	public static void main(String[] args) {
		Singleton04 singleton = Singleton04.getInstance();
		Singleton04 singleton2 = Singleton04.getInstance();
		
		System.out.println(singleton == singleton2);
	}
}
