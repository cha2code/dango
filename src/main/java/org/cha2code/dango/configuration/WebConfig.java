package org.cha2code.dango.configuration;

import lombok.RequiredArgsConstructor;
import org.cha2code.dango.configuration.interceptor.ControllerInterceptor;
import org.cha2code.dango.service.MenuService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
	private final MenuService menuService;

	/**
	 * ControllerInterceptor를 위한 Bean 등록
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// application내에 Interceptor 등록
		registry.addInterceptor(new ControllerInterceptor(menuService))
				// Interceptor 적용 제외
				.excludePathPatterns("/js/**", "/plugins/**", "/common/**", "/dist/**",
				                     "/favicon.ico", "/error", "/login");
	}
}
