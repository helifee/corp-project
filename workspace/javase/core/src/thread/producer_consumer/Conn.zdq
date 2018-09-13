package thread.producer_consumer;

/**
 * 线程通信类
 */
public class Conn {

	private int[] buf= new int[200];
	private int index = 0;
	
	public synchronized int read() {
		
		while(index==0) {
			try {
				wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		notifyAll();
		return buf[--index];
	}
	
	public synchronized void add(int num) {
		while(index == buf.length) {
			try {
				wait();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		buf[index++] = num;
		notify();
	}
}
