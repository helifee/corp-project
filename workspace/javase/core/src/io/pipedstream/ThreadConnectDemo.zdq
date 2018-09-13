package io.pipedstream;

import java.io.IOException;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

class Send implements Runnable {

	private PipedOutputStream output;
	
	public Send() {
		this.output = new PipedOutputStream();
	}
	
	public PipedOutputStream getPipedOutputStream() {
		return this.output;
	}
	
	public void run() {
		String msg = "Hello";
		try {
			output.write(msg.getBytes());
			output.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}

class Recieve implements Runnable {
	
	private PipedInputStream input;

	public Recieve() {
		this.input = new PipedInputStream();
	}
	
	public PipedInputStream getPipedInputStream() {
		return this.input;
	}
	
	public void run() {
		byte[] b = new byte[1024];
		int len = 0;
		try {
			len = this.input.read(b);
			this.input.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		System.out.println(new String(b, 0, len));
	}
	
}

public class ThreadConnectDemo {

	public static void main(String[] args) throws IOException {
		Send send = new Send();
		Recieve recieve = new Recieve();
		send.getPipedOutputStream().connect(recieve.getPipedInputStream());
		new Thread(send).start();
		new Thread(recieve).start();
		
	}

}
