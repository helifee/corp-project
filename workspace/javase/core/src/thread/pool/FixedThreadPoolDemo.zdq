package thread.pool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 固定大小线程池
 */
public class FixedThreadPoolDemo {
	
	public static void main(String[] args) {
		ExecutorService pool = Executors.newFixedThreadPool(3);
		
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.submit(new MyThread());
		
		
		
		pool.shutdown();
	}

	
}
