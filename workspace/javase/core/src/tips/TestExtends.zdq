package tips;

abstract class A {
	public A() {
		this.print();
	}
	
	public abstract void print();
}

class B extends A {
	
	private int i = 100;
	
	public B(int i) {
		this.i = i;
	}

	@Override
	public void print() {
		System.out.println("i = " + i);
	}
	
}

public class TestExtends {

	public static void main(String[] args) {
		new B(10);
	}

}
