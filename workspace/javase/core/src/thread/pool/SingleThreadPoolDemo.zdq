package thread.pool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 单任务大小线程池
 */
public class SingleThreadPoolDemo {
	
	public static void main(String[] args) {
		ExecutorService pool = Executors.newSingleThreadExecutor();
		
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		pool.execute(new MyThread());
		
		pool.shutdown();
	}

	
}
