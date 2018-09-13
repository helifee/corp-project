package com.xinleju.platform.base.utils;

import java.util.Hashtable;

import javax.naming.AuthenticationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.DirContext;
import javax.naming.directory.ModificationItem;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

import org.apache.log4j.Logger;

public class AdAuthenticationUtil {
	
	private static Logger logger = Logger.getLogger(AdAuthenticationUtil.class);
	public static void main(String[] args) {
//		MessageResult messageResult = authenticate("adtest001","adtest002");
//		MessageResult messageResult = authenticateIsExist("adtest001");
//		MessageResult messageResult = adminChangePassword("adtest001","adtest002");
//		System.out.println(messageResult.isSuccess());
//		System.out.println(messageResult.getMsg());
		
//		AdAuthenticationUtil.Authentication();
//		AdAuthenticationUtil.UpdateAuthenticationPwd();
//		AdAuthenticationUtil.queryUserList();
		
	}
	
	/**
	 * 功能：校验用户登录
	 * @param user
	 * @param pwd
	 * @return 
	 * 
	 */
	
	
	public static MessageResult authenticate(String userName, String password){
		MessageResult messageResult = new MessageResult();
//		String userName = "jzyad";//AD域认证，用户的登录UserName
//      String password = "JZYad9200";//AD域认证，用户的登录PassWord
//      String userName = "shiyong";//AD域认证，用户的登录UserName
//      String password = "xy2016!";//AD域认证，用户的登录PassWord
//      String userName = "adtest001";//AD域认证，用户的登录UserName
//      String password = "adtest001";//AD域认证，用户的登录PassWord
      String host = ConfigurationUtil.getValue("ad.host");//AD域IP
      String domain = ConfigurationUtil.getValue("ad.domain");//域名后缀
      String port = ConfigurationUtil.getValue("ad.post"); //端口，一般默认389
      String url = new String("ldap://" + host + ":" + port);//固定写法
      String user = userName.indexOf(domain) > 0 ? userName : userName
              + domain;
      Hashtable env = new Hashtable();//实例化一个Env
      DirContext ctx = null;
      env.put(Context.SECURITY_AUTHENTICATION, "simple");//LDAP访问安全级别(none,simple,strong),一种模式
      env.put(Context.SECURITY_PRINCIPAL, user); //用户名
      env.put(Context.SECURITY_CREDENTIALS, password);//密码
      env.put(Context.INITIAL_CONTEXT_FACTORY,
              "com.sun.jndi.ldap.LdapCtxFactory");// LDAP工厂类
      env.put(Context.PROVIDER_URL, url);//Url
      try {
          ctx = new InitialLdapContext(env,null);// 初始化上下文
          messageResult.setSuccess(true);
          messageResult.setMsg("身份验证成功!");
          System.out.println("身份验证成功!");
      } catch (AuthenticationException e) {
    	  messageResult.setSuccess(false);
          messageResult.setMsg("身份验证失败!");
          System.out.println("身份验证失败!");
          e.printStackTrace();
      } catch (javax.naming.CommunicationException e) {
    	  messageResult.setSuccess(false);
          messageResult.setMsg("AD域连接失败!");
          System.out.println("AD域连接失败!");
          e.printStackTrace();
      } catch (Exception e) {
    	  messageResult.setSuccess(false);
          messageResult.setMsg("身份验证未知异常!");
          System.out.println("身份验证未知异常!");
          e.printStackTrace();
      } finally{
          if(null!=ctx){
              try {
                  ctx.close();
                  ctx=null;
              } catch (Exception e) {
                  e.printStackTrace();
              }
          }
      }
      return messageResult;
  }
	
	
	/** 
     * 功能：管理员更改用户密码 
     * @param sUserName 
     * @return 
     * 
     */  
	public static MessageResult adminChangePassword(String sUserName,String sUserPassword){
		MessageResult messageResult = new MessageResult();
		String userName = ConfigurationUtil.getValue("ad.adminUser");//AD域认证，用户的登录UserName
        String password = ConfigurationUtil.getValue("ad.adminPassword");//AD域认证，用户的登录PassWord
        String host = ConfigurationUtil.getValue("ad.host");//AD域IP
        String domain = ConfigurationUtil.getValue("ad.domain");//域名后缀
//        String port = "389"; //端口，一般默认389
        String port = ConfigurationUtil.getValue("ad.sslpost"); //端口，一般默认389
        String url = new String("ldap://" + host + ":" + port);//固定写法
        String user = userName.indexOf(domain) > 0 ? userName : userName
                + domain;
//        String keystore = "D:/Users/shiyong/AppData/Local/MyEclipse 2017/binary/com.sun.java.jdk8.win32.x86_64_1.8.0.v112/jre/lib/security/cacerts";  
        String keystore = ConfigurationUtil.getValue("ad.keystore");  
        System.setProperty("javax.net.ssl.trustStore", keystore);
        
        Hashtable env = new Hashtable();//实例化一个Env
        LdapContext ctx = null;
        env.put(Context.SECURITY_AUTHENTICATION, "simple");//LDAP访问安全级别(none,simple,strong),一种模式，这么写就行
        env.put(Context.SECURITY_PRINCIPAL, user); //用户名
        env.put(Context.SECURITY_CREDENTIALS, password);//密码
        env.put(Context.INITIAL_CONTEXT_FACTORY,
                "com.sun.jndi.ldap.LdapCtxFactory");// LDAP工厂类
        env.put(Context.SECURITY_PROTOCOL, "ssl");
        env.put(Context.PROVIDER_URL, url);//Url
        try {
            ctx = new InitialLdapContext(env,null);// 初始化上下文
            
            String updateUserName = getUser(ctx,sUserName)+ "," + "OU=xyre,DC=xyre,DC=com";
            
    		String newPassword = sUserPassword;   //用户新密码
            
            ModificationItem[] mods = new ModificationItem[1];

			String newQuotedPassword = "\"" + newPassword + "\"";

			byte[] newUnicodePassword = newQuotedPassword.getBytes("UTF-16LE");

			mods[0] = new ModificationItem(DirContext.REPLACE_ATTRIBUTE,

					new BasicAttribute("unicodePwd", newUnicodePassword));

			// 修改密码

			ctx.modifyAttributes(updateUserName, mods);
			messageResult.setSuccess(true);
	        messageResult.setMsg("更改密码成功");
        } catch (AuthenticationException e) {
        	e.printStackTrace();
        	messageResult.setSuccess(false);
	        messageResult.setMsg("身份认证失败"+e.toString());
        } catch (javax.naming.CommunicationException e) {
        	e.printStackTrace();
        	messageResult.setSuccess(false);
	        messageResult.setMsg("AD域连接失败!"+e.toString());
        } catch (Exception e) {
        	e.printStackTrace();
        	messageResult.setSuccess(false);
	        messageResult.setMsg("更改密码失败!"+e.toString());
        } finally{
            if(null!=ctx){
                try {
                    ctx.close();
                    ctx=null;
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return messageResult;
    }
	/** 
	 * 功能：管理员验证用户是否存在
	 * @param sUserName 
	 * @return 
	 * 
	 */  
	public static MessageResult authenticateIsExist(String sUserName){
		MessageResult messageResult = new MessageResult();
		String userName = ConfigurationUtil.getValue("ad.adminUser");//AD域认证，用户的登录UserName
		String password = ConfigurationUtil.getValue("ad.adminPassword");//AD域认证，用户的登录PassWord
		String host = ConfigurationUtil.getValue("ad.host");//AD域IP
		String domain = ConfigurationUtil.getValue("ad.domain");//域名后缀
//        String port = "389"; //端口，一般默认389
		String port = ConfigurationUtil.getValue("ad.sslpost"); //端口，一般默认389
		String url = new String("ldap://" + host + ":" + port);//固定写法
		String user = userName.indexOf(domain) > 0 ? userName : userName
				+ domain;
//        String keystore = "D:/Users/shiyong/AppData/Local/MyEclipse 2017/binary/com.sun.java.jdk8.win32.x86_64_1.8.0.v112/jre/lib/security/cacerts";  
		String keystore = ConfigurationUtil.getValue("ad.keystore");  
		System.setProperty("javax.net.ssl.trustStore", keystore);
		
		Hashtable env = new Hashtable();//实例化一个Env
		LdapContext ctx = null;
		env.put(Context.SECURITY_AUTHENTICATION, "simple");//LDAP访问安全级别(none,simple,strong),一种模式，这么写就行
		env.put(Context.SECURITY_PRINCIPAL, user); //用户名
		env.put(Context.SECURITY_CREDENTIALS, password);//密码
		env.put(Context.INITIAL_CONTEXT_FACTORY,
				"com.sun.jndi.ldap.LdapCtxFactory");// LDAP工厂类
		env.put(Context.SECURITY_PROTOCOL, "ssl");
		env.put(Context.PROVIDER_URL, url);//Url
		try {
			ctx = new InitialLdapContext(env,null);// 初始化上下文
			
			String updateUserName = getUser(ctx,sUserName);
			
			if("".equals(updateUserName)){
				messageResult.setSuccess(false);
				messageResult.setMsg("人员不存在");
			}else{
				messageResult.setSuccess(true);
				messageResult.setMsg(updateUserName);
			}
			
		} catch (AuthenticationException e) {
			e.printStackTrace();
			messageResult.setSuccess(false);
			messageResult.setMsg("身份认证失败"+e.toString());
		} catch (javax.naming.CommunicationException e) {
			e.printStackTrace();
			messageResult.setSuccess(false);
			messageResult.setMsg("AD域连接失败!"+e.toString());
		} catch (Exception e) {
			e.printStackTrace();
			messageResult.setSuccess(false);
			messageResult.setMsg("更改密码失败!"+e.toString());
		} finally{
			if(null!=ctx){
				try {
					ctx.close();
					ctx=null;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return messageResult;
	}
	
	
	private static String getUser(LdapContext ctx,String usr){  
	      String userName = "";  
	      String filter = "sAMAccountName="+usr;  
	      SearchResult si = getSearchResult(ctx,filter);  
	      if(si!=null)   
	          userName = si.getName();  
	      return userName;  
	  }  
	    
		private static SearchResult getSearchResult(LdapContext ctx,String filter){  
			SearchResult si = null;  
			try {  
			    SearchControls constraints = new SearchControls();  
			    constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);  
			NamingEnumeration en = ctx.search("OU=xyre,DC=xyre,DC=com", filter , constraints); // 查询所有用户  
			     
			    while(en!= null&&en.hasMoreElements()){  
			        Object obj = en.nextElement();  
			        if (obj instanceof SearchResult) {  
			            si = (SearchResult)obj;  
			            break;  
			        }  
			    }  
			}catch (NamingException ex) {  
			    ex.printStackTrace();  
			}  
			return si;  
		}
	
	

}
