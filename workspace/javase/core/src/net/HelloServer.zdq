package net;

import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;

public class HelloServer {

	public static void main(String[] args) throws Exception {
		ServerSocket server = new ServerSocket(8888);
		Socket client = null;
		boolean flag = true;
		while(flag) {
			System.out.println("等待客户连接");
			client = server.accept();
			PrintStream printer = new PrintStream(client.getOutputStream());
			printer.print("Hello, client");
			printer.close();
			client.close();			
		}
		server.close();
	}

}
