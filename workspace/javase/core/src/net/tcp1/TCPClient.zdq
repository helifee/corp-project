package net.tcp1;

import java.net.*;
import java.io.*;

public class TCPClient {
	public static void main(String[] args) throws Exception {
		Socket s = new Socket("127.0.0.1", 6666);
		DataOutputStream dos = new DataOutputStream( s.getOutputStream());
		DataInputStream dis = new DataInputStream(s.getInputStream());
		dos.writeUTF("hello server!");
		System.out.println(dis.readUTF());
		dis.close();
		dos.flush();
		dos.close();
		s.close();
	}
}