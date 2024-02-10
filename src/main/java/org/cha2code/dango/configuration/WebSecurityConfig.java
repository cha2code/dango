package org.cha2code.dango.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Slf4j
@EnableWebSecurity
@Configuration
public class WebSecurityConfig {

	private final UserDetailsService userDetailsService;
	private final BCryptPasswordEncoder passwordEncoder;

	public WebSecurityConfig(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
		this.userDetailsService = userDetailsService;
		this.passwordEncoder = passwordEncoder;
	}

	@Bean
	public SecurityFilterChain webSecurityFilterChain(HttpSecurity http) throws Exception {
		return http.authorizeRequests()
		           // 정적 리소스 및 로그인 페이지는 인증 없이 허용
		           .antMatchers("/common/**", "/dist/**", "/js/**", "/plugins/**", "/login").permitAll()
		           // 모든 페이지는 관리자 권한을 가진 경우에만 접근 가능
		           .antMatchers("/**").hasRole("admin")
		           // 모든 페이지 접근시 로그인 필요
		           .anyRequest().authenticated()
		           .and()
		           // 로그인 설정
		           .formLogin()
		           // 로그인 페이지 URL
		           .loginPage("/login")
		           // 로그인 페이지에서 전달하는 ID 파라미터의 명칭
		           .usernameParameter("userName")
		           // 로그인 페이지에서 전달하는 비밀번호 파라미터의 명칭
		           .passwordParameter("userPassword")
		           // 로그인 성공시
		           .successHandler((request, response, authentication) -> {
			           request.getSession().setAttribute("userInfo", authentication.getPrincipal());

			           log.info("authentication : " + authentication.getName());
			           response.sendRedirect("/");
		           })
		           // 로그인 실패시
		           .failureHandler((request, response, exception) -> {
			           log.info("exception : " + exception.getMessage());
			           response.sendRedirect("/login");
		           })
		           .and()
		           // 로그아웃 설정
		           .logout()
		           .logoutSuccessUrl("/")
		           .and()
		           // CORS 및 CSRF 비활성화
		           .cors().disable()
		           .csrf().disable()
		           .build();
	}


	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(passwordEncoder);
		return authenticationProvider;
	}

	/*
	 * 하단 코드는 테스트용으로, DB연동 성공시 반드시 삭제할 것
	 */

	/*
	@Bean
	public InMemoryUserDetailsManager userDetailsService() {
		UserDetails admin = User.withUsername("admin")
		                        .password("$2a$10$tcuW33l.uYGHCNc5o6Gqc.LrQiGKHRx30/q.I6uTdXJNwx0juL4t.")
		                        .authorities("admin")
		                        .build();
		UserDetails user = User.withUsername("user")
		                       .password("$2a$10$tcuW33l.uYGHCNc5o6Gqc.LrQiGKHRx30/q.I6uTdXJNwx0juL4t.")
		                       .authorities("user")
		                       .build();

		return new InMemoryUserDetailsManager(admin, user);
	}*/
}
