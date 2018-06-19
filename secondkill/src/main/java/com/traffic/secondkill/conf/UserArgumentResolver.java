package com.traffic.secondkill.conf;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.traffic.secondkill.controller.MiaoshaUser;
import com.traffic.secondkill.controller.MiaoshaUserService;

public class UserArgumentResolver implements HandlerMethodArgumentResolver{

	@Autowired
	MiaoshaUserService userService;
	
	@Override
	public Object resolveArgument(MethodParameter arg0, ModelAndViewContainer arg1, NativeWebRequest webRequest,
			WebDataBinderFactory arg3) throws Exception {
		HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
		HttpServletResponse response = webRequest.getNativeResponse(HttpServletResponse.class);
		
		String paramToken = request.getParameter(MiaoshaUserService.COOKI_NAME_TOKEN);
		String cookieToken = getCookieValue(request, MiaoshaUserService.COOKI_NAME_TOKEN);
		if(StringUtils.isEmpty(cookieToken) && StringUtils.isEmpty(paramToken)) {
			return null;
		}
		String token = StringUtils.isEmpty(paramToken)?cookieToken:paramToken;
		return userService.getByToken(response, token);
	}

	@Override
	public boolean supportsParameter(MethodParameter arg0) {
		Class<?> clazz = arg0.getParameterType();
		return clazz==MiaoshaUser.class;
	}
	
	private String getCookieValue(HttpServletRequest request, String cookiName) {
		Cookie[]  cookies = request.getCookies();
		for(Cookie cookie : cookies) {
			if(cookie.getName().equals(cookiName)) {
				return cookie.getValue();
			}
		}
		return null;
	}

}
