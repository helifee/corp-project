package com.xinleju.platform.base.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.data.redis.core.RedisTemplate;

import com.xinleju.platform.base.utils.SecurityUserBeanInfo;
import com.xinleju.platform.base.utils.SecurityUserBeanRelationInfo;
import com.xinleju.platform.tools.data.JacksonUtils;

/**
 * 
 * 第三方请求验证
 * 
 * @author hao
 *
 */
public class ThirdParyRequestFilter implements Filter {
	private static Logger log = Logger.getLogger(ThirdParyRequestFilter.class);
	protected RedisTemplate<String, String> redisTemplate;
	
	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		redisTemplate = (RedisTemplate<String, String>) SpringContextUtil.getBean("redisTemplate");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
//		HttpServletResponse httpResponse = (HttpServletResponse)response;
//	    HttpSession session = httpRequest.getSession();
	    
//	    String token = httpRequest.getParameter("token");
//	    
//	    if (StringUtils.isEmpty(token)) {
//	    	Cookie[] cookies = httpRequest.getCookies();
//	    	if (null != cookies) {
//	    		for(Cookie cookie:cookies){
//	    			if ("token".equals(cookie.getName())) {
//	    				token = cookie.getValue();
//	    				break;
//	    			}
//	    		}
//	    	}
//	    }
	    
//	    if (StringUtils.isEmpty(token)) {
//	    	if (null != session) {
//	    		Object tobj = session.getAttribute("token");
//	    		if (null != tobj) {
//	    			token = tobj.toString();
//	    		}
//	    	}
//	    }
	    
	    // 含token参数，是第三方请求
//	    if (StringUtils.isNotEmpty(token)) {
//	    	
//	    	Boolean hasToken = redisTemplate.hasKey(SecurityUserBeanInfo.TOKEN_TEND_USER + token);
//	    	if (hasToken) {
//	    		
//	    		String loginInfoStr = redisTemplate.opsForValue().get(SecurityUserBeanInfo.TOKEN_TEND_USER + token);
//	    		String menuInfoStr = redisTemplate.opsForValue().get(SecurityUserBeanRelationInfo.TOKEN_TEND_USER_MENU + token);
//	    		SecurityUserBeanInfo securityUserBeanInfo = JacksonUtils.fromJson(loginInfoStr, SecurityUserBeanInfo.class);
//	    		Cookie[] cookies = httpRequest.getCookies();
//	    		if (cookies != null) {
//	    			StringBuffer sb = new StringBuffer();
//	    			for(Cookie cooki : cookies){
//	    				sb.append(cooki.getName()+"="+cooki.getValue()+";");
//	    			}
//	    			securityUserBeanInfo.setCookies(sb.toString());
//	    		}
//	    		//httpResponse.addCookie(cookie);
//	    		SecurityUserBeanRelationInfo securityUserBeanRelationInfo = JacksonUtils.fromJson(menuInfoStr, SecurityUserBeanRelationInfo.class);
//	    		session.setAttribute(SecurityUserBeanInfo.TOKEN_TEND_USER,securityUserBeanInfo);
//	    		session.setAttribute(SecurityUserBeanRelationInfo.TOKEN_TEND_USER_MENU,securityUserBeanRelationInfo);
//	    		
//	    		Cookie cookie = new Cookie("DTL_SESSION_ID",session.getId());
//		    	httpResponse.addCookie(cookie);
//	    		
//	    	}
//	    	
//	    } 
	    Cookie[] cookies = httpRequest.getCookies();
	    if (cookies != null) {
	    	log.info("\n\n--------------in cookies--------------");
	    	for (Cookie cookie : cookies) {
	    		log.info(cookie.getName() + ":" + cookie.getValue());
	    	}
	    	log.info("\n--------------in cookies--------------\n");
	    }
	    chain.doFilter(request, response);
	    
	    
	    cookies = httpRequest.getCookies();
	    if (cookies != null) {
	    	log.info("\n\n--------------out cookies--------------");
	    	for (Cookie cookie : cookies) {
	    		log.info(cookie.getName() + ":" + cookie.getValue());
	    	}
	    	log.info("\n--------------out cookies--------------\n");
	    }
	    
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

}
