package basic.inner;

class Outer5 {
	private static String name = "zhangsan!";
	
	public void fun(final/*����*/ int i) {
		class Inner {
			public void print() {
				System.out.println("Name = " + name + ", i = " + i);
			}
		}
		
		new Inner().print();
	}
}

public class Demo5 {

	public static void main(String[] args) {
		new Outer5().fun(30);
	}

}
