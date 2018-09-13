package thread.pool;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * 线程时间可调度的线程池
 */
public class ScheduledThreadPoolDemo {
	
	public static void main(String[] args) {
		ScheduledExecutorService pool = Executors.newScheduledThreadPool(2);
		
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		
		pool.schedule(new MyThread(), 10, TimeUnit.SECONDS);
		
		pool.scheduleAtFixedRate(new MyThread(), 1, 2, TimeUnit.SECONDS);
		pool.scheduleWithFixedDelay(new MyThread(), 1, 2, TimeUnit.SECONDS);
		
	}

	
}
