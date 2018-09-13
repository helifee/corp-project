package thread.ticket;

public class Ticket2 implements Runnable {

	private int ticket = 5;
	
	public void run() {
		for(int i=0; i<50; i++) {
			if(this.ticket > 0) {
				System.out.println("ticket = " + this.ticket--);
			}
		}
	}
}
