package jvm;

class B {

	static B b;

	public void finalize() {
		System.out.println("method B.finalize");
		b = this;
	}
}

/**
 * 对象再生及finalize只能执行一次 
 * 第一次finalize运行过后，该对象的finalizable置为false了所,
 * 以该对象即使以后被gc运行，也不会执行finalize方法了
 */
public class FinalizeDemo {

	public static void main(String[] args) {
		@SuppressWarnings("unused")
		B b = new B();
		b = null;
		System.gc();
		B.b = null;
		System.gc();

	}

}
