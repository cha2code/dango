package org.cha2code.dango.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
	@Bean
	public SecurityFilterChain webSecurityFilterChain(HttpSecurity http) throws Exception {
		http.cors(AbstractHttpConfigurer::disable)
		    .csrf(AbstractHttpConfigurer::disable)
		    .headers((headers) -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));

		http.authorizeHttpRequests((request -> request
				    .requestMatchers(
							new AntPathRequestMatcher("/common/**"),
							new AntPathRequestMatcher("/dist/**"),
							new AntPathRequestMatcher("/js/**"),
							new AntPathRequestMatcher("/plugins"),
							new AntPathRequestMatcher("/common/**")
				    ).permitAll()
				    .requestMatchers(
						    new AntPathRequestMatcher("/")).hasAuthority("admin")
				    .anyRequest().authenticated()
		    ));


		 http.formLogin(form -> form
				 .loginPage("/login")
				 .successHandler((request, response, authentication) -> {
					 System.out.println("authentication : " + authentication.getName());
					 response.sendRedirect("/");
				 })
				 .failureHandler((request, response, exception) -> {
					 System.out.println("exception : " + exception.getMessage());
					 response.sendRedirect("/login");
				 })
				 .permitAll());

		        http.logout(Customizer.withDefaults());

		return http.build();
	}

	/*
	* 하단 코드는 테스트용으로, DB연동 성공시 반드시 삭제할 것
	*/

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
	}
}
