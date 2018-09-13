package net.udp1;

import java.net.*;
import java.io.*;

public class UDPClient {
	public static void main(String[] args) throws Exception {
		//byte[] buf = (new String("hello")).getBytes();
		long n = 88888888L;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		DataOutputStream dos = new DataOutputStream(baos);
		dos.writeLong(n);
		dos.close();
		
		byte[] buf = baos.toByteArray();
		DatagramPacket dp = new DatagramPacket(buf, buf.length, new InetSocketAddress("127.0.0.1",5555));
		DatagramSocket ds = new DatagramSocket(6666);
		ds.send(dp);
		ds.close();
	}
}