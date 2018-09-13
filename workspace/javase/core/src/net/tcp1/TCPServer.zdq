package net.tcp1;

import java.net.*;
import java.io.*;

public class TCPServer {
	public static void main(String[] args) throws Exception{
		ServerSocket ss = new ServerSocket(6666);
		while(true) {
			Socket s = ss.accept();
			DataOutputStream dos = new DataOutputStream( s.getOutputStream());
			DataInputStream dis = new DataInputStream(s.getInputStream());
			System.out.println(dis.readUTF());
			dos.writeUTF("hello!");
			dos.flush();
			dos.close();
			dis.close();
			s.close();
		}
	}
}