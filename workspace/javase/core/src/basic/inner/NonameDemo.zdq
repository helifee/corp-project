package basic.inner;

interface A {
	public void fun();
}

class X {
	public void fun1(A a) {
		a.fun();
	}
	
	public void fun2() {
		this.fun1(new A() {
			public void fun() {
				System.out.println("Hello, world...");
			}});
	}
}

public class NonameDemo {

	public static void main(String[] args) {
		new X().fun2();
	}

}
