package utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Test {
	public final static String MD5(String str) {        
		
	MessageDigest messageDigest = null;  
	  
    try {  
        messageDigest = MessageDigest.getInstance("MD5");  

        messageDigest.reset();  

        messageDigest.update(str.getBytes("UTF-8"));  
    } catch (NoSuchAlgorithmException e) {  
        System.out.println("NoSuchAlgorithmException caught!");  
        System.exit(-1);  
    } catch (UnsupportedEncodingException e) {  
        e.printStackTrace();  
    }  

    byte[] byteArray = messageDigest.digest();  

    StringBuffer md5StrBuff = new StringBuffer();  

    for (int i = 0; i < byteArray.length; i++) {              
        if (Integer.toHexString(0xFF & byteArray[i]).length() == 1)  
            md5StrBuff.append("0").append(Integer.toHexString(0xFF & byteArray[i]));  
        else  
            md5StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));  
    }  

    return md5StrBuff.toString();  }

	// 测试
	public static void main(String[] args) {
		System.out.println("caidao的MD5加密后：\n" + MD5Test.MD5("caidao"));
		System.out.println("http://www.baidu.com/的MD5加密后：\n"
				+ MD5Test.MD5("http://www.baidu.com/"));
	}
}
