package tips;

public class TestYield {
	public static void main(String[] args) {
		Myt t1 = new Myt("aaaa");
		Myt t2 = new Myt("bbbb");
		t1.start();
		t2.start();
	}
}
class Myt extends Thread {
	Myt(String s) {
		super(s);
	}
	public void run() {
		for(int i=0; i<100; i++) {
			System.out.println(getName() + i);
			if(i % 10 ==0) {
				yield(); //TODO
			}
		}
	}
}