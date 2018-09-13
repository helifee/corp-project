package thread.syndemo;

public class Ticket5 implements Runnable {

	private int ticket = 5;
	
	public void run() {	
		for(int i=0; i<50; i++) {
			this.sale();
		}
	}
	
	private synchronized void sale() {	//ͬ����̫��,��5
		
		if(this.ticket > 0) {
			try {
				Thread.sleep(200);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			System.out.println("ticket = " + this.ticket-- + " " + Thread.currentThread().getName());
		}
	}
}
