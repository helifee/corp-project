package com.xinleju.platform.univ.attachment.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

import org.apache.commons.io.IOUtils;

import redis.clients.jedis.Jedis;

public class RedisClient {
	public static void main(String[] args) {
		Jedis jedis = null;
		try {
			jedis = new Jedis("10.17.3.200", 6379);
			jedis.set("test1", "测试");
			System.out.println(jedis.get("test1"));

			jedis.del("test1");

//			String fileName = "D:\\xinju\\temp\\3.jpg";
			String fileName = "D:\\xinju\\doc\\LearnElasticSearch.pdf";
			File file = new File(fileName);
			FileEntity fe = new FileEntity();



			byte[] fc = IOUtils.toByteArray(String.valueOf(file.toURI()));
			fe.setFileContent(fc);
			fe.setFileName("1.jpg");
			fe.setFilePath(file.getAbsolutePath());
			fe.setFileExtName("jpg");
			fe.setFileSize(1000L);
//			for(int i =0; i < 1000; i++) {
//				FileEntity fe1 = new FileEntity();
//				fe1.setFileContent(fc);
//				fe1.setFileName("1.jpg");
//				fe1.setFilePath(file.getAbsolutePath());
//				fe1.setFileExtName("jpg");
//				fe1.setFileSize(1000L);
//				jedis.lpush("testfile:003",)
//			}


			jedis.set("testfile:002".getBytes(), SerializeUtil.serialize(fe));

			System.out.println("save pic file ok");

			byte[] rs = jedis.get("testfile:002".getBytes());
			FileEntity ff = (FileEntity) SerializeUtil.unserialize(rs);
			System.out.println(ff.toString());
			String saveFileName = "D:\\xinju\\doc\\001.pdf";
//			String saveFileName = "D:\\xinju\\temp\\LearnElasticSearch.pdf";
			FileOutputStream fos = new FileOutputStream(new File(saveFileName));
			IOUtils.write(ff.getFileContent(), fos);
			fos.close();
			System.out.println("endd");

		} catch(Exception e) {
			////e.printStackTrace();
		} finally {
			jedis.quit();
			jedis.close();
		}
	}
}

class FileEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	private byte[] fileContent;
	private String fileName;
	private String filePath;
	private String fileExtName;
	private Long fileSize;
	public byte[] getFileContent() {
		return fileContent;
	}
	public void setFileContent(byte[] fileContent) {
		this.fileContent = fileContent;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public String getFileExtName() {
		return fileExtName;
	}
	public void setFileExtName(String fileExtName) {
		this.fileExtName = fileExtName;
	}
	public Long getFileSize() {
		return fileSize;
	}
	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}
	@Override
	public String toString() {
		return "FileEntity [fileName=" + fileName + ", filePath=" + filePath + ", fileExtName=" + fileExtName
				+ ", fileSize=" + fileSize + "]";
	}
}

class SerializeUtil {
	public static byte[] serialize(Object object) {
		ObjectOutputStream oos = null;
		ByteArrayOutputStream baos = null;
		try {
			// 序列化
			baos = new ByteArrayOutputStream();
			oos = new ObjectOutputStream(baos);
			oos.writeObject(object);
			byte[] bytes = baos.toByteArray();
			return bytes;
		} catch (Exception e) {

		}
		return null;
	}

	public static Object unserialize(byte[] bytes) {
		ByteArrayInputStream bais = null;
		try {
			// 反序列化
			bais = new ByteArrayInputStream(bytes);
			ObjectInputStream ois = new ObjectInputStream(bais);
			return ois.readObject();
		} catch (Exception e) {

		}
		return null;
	}
}
