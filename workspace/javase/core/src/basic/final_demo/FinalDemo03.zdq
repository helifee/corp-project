package basic.final_demo;

public class FinalDemo03 {
	
	//方法中的内部类在用到方法中的参变量时，此参变也必须声明为final才可使用
	public static void print(final String msg) {
		class Inner {
			Inner() {
				System.out.println(msg);
			}
			
		}
		
		@SuppressWarnings("unused")
		Inner inner = new Inner();
	}

	public static void main(String[] args) {
		print("Hello,world");
	}

}
