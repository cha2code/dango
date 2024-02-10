package org.cha2code.dango.configuration.interceptor;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.dto.MenuMasterDto;
import org.cha2code.dango.service.MenuService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * controller에 관한 요청을 intercept 후
 * 공통으로 해야 하는 일을 처리하는 class
 */
@Slf4j
@RequiredArgsConstructor
public class ControllerInterceptor implements HandlerInterceptor {
	private final MenuService menuService;

	// 사용자 요청 처리 전(Controller 타기 전)
	@Override
	public boolean preHandle(HttpServletRequest request,
	                         HttpServletResponse response,
	                         Object handler) throws Exception {
		String requestURI = request.getRequestURI();
		log.info("{} 호출", requestURI);

		// security session에 있는 user 정보 저장
		Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();

		// 로그인 안 한 사용자는 로그인 페이지로 이동
		if (ObjectUtils.isEmpty(userAuth)) {
			response.sendRedirect("/login");
		}


		// 로그인 한 사용자 처리
		request.setAttribute("parentMenuPath", "");

		// 로그인 한 사용자는 반드시 권한을 가지고 있으므로, 별도 검증 없이 권한 객체 취득
		@SuppressWarnings("OptionalGetWithoutIsPresent")
		GrantedAuthority grantedAuthority = userAuth.getAuthorities().stream().findFirst().get();

		List<MenuMasterDto> menuList = menuService.findAllByRoleCode(grantedAuthority.getAuthority()
		                                                                             .replace("ROLE_", ""));

		request.setAttribute("menuInfoList", menuList);

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
