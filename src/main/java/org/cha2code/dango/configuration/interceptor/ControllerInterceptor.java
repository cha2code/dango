package org.cha2code.dango.configuration.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
public class ControllerInterceptor implements HandlerInterceptor {
	// 사용자 요청 처리 전(Controller 타기 전)
	@Override
	public boolean preHandle(HttpServletRequest request,
	                         HttpServletResponse response,
	                         Object handler) throws Exception {
		String requestURI = request.getRequestURI();
		log.info("{} 호출", requestURI);

		Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();

		// 로그인한 사용자 처리
		if (userAuth != null) {

		}

		return true;
	}
	// 사용자 요청 처리 후(Controller 처리 완료 후)
	@Override
	public void postHandle(HttpServletRequest request,
	                       HttpServletResponse response,
	                       Object handler,
	                       ModelAndView modelAndView) throws Exception {
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}
}
