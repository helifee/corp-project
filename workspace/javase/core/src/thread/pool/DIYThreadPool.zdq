package thread.pool;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class DIYThreadPool {

	/**
	 * 自定义线程池
	 */
	public static void main(String[] args) {
		BlockingQueue<Runnable> bqueue = new ArrayBlockingQueue<Runnable>(20);
		ThreadPoolExecutor pool = new ThreadPoolExecutor(2, 3, 2, TimeUnit.SECONDS, bqueue);
		
		pool.submit(new MyThread());
		pool.submit(new MyThread());
		pool.submit(new MyThread());
		pool.submit(new MyThread());
		
		//可取得线程更细节的信息
		pool.getPoolSize();
		
		pool.shutdown();
	}

}
