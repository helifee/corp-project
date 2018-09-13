package net;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;
import java.net.UnknownHostException;

public class HelloClient {

	public static void main(String[] args) throws UnknownHostException, IOException {
		Socket client = new Socket("localhost", 8888);
		BufferedReader buf = null;
		buf = new BufferedReader(new InputStreamReader(client.getInputStream()));
		System.out.println("收到内容：" + buf.readLine());
		client.close();
	}

}
