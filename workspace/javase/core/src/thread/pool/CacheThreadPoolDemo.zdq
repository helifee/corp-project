package thread.pool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 可变大小线程池
 */
public class CacheThreadPoolDemo {
	
	public static void main(String[] args) throws InterruptedException {
		
		 //创建一个可根据需要创建新线程的线程池，但是在以前构造的线程可用时将重用它们。 
		ExecutorService pool = Executors.newCachedThreadPool();
		
		for(int i=0; i<200; i++) {
			pool.execute(new MyThread2());			
		}
		
		System.out.println("-----------------------------------");
		Thread.sleep(3000);
		
		for(int i=0; i<200; i++) {
			pool.execute(new MyThread2());			
		}
		
		pool.shutdown();
	}

	
}
