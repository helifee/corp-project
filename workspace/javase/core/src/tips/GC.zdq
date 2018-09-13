package tips;

class GcTest {
	private String name;
	
	public GcTest(String name) {
		this.name = name;
		System.out.println(name + "��b");
	}
	
	protected void finalize() {
		System.out.println(name + "����");
	}
}

public class GC {
	public static void main(String[] args) {
		System.out.println("Ctrl + C");
		
		GcTest obj1 = new GcTest("object1");
		GcTest obj2 = new GcTest("object2");
		GcTest obj3 = new GcTest("object3");
		
		obj1 = null;
		obj2 = null;
		obj3 = null;
		
		System.gc();  //�������
		
		//while(true);
	}
}
