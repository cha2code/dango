package org.cha2code.dango.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
	@Bean
	public SecurityFilterChain webSecurityFilterChain(HttpSecurity http) throws Exception {
		http.cors(AbstractHttpConfigurer::disable)
		    .csrf(AbstractHttpConfigurer::disable);

		http.authorizeHttpRequests((req -> req.anyRequest().permitAll()))
		    .formLogin(Customizer.withDefaults())
		    .logout(Customizer.withDefaults());

		return http.build();
	}

	/*
	* 하단 코드는 테스트용으로, DB연동 성공시 반드시 삭제할 것
	*/
	@Bean
	public InMemoryUserDetailsManager userDetailsService() {
		UserDetails admin = User.withUsername("admin")
		                        .password("mQYqGpeEZwhPo0CvturXUoE/bno6Jq8o")
		                        .authorities("admin")
		                        .build();
		UserDetails user = User.withUsername("user")
		                       .password("$2a$10$tcuW33l.uYGHCNc5o6Gqc.LrQiGKHRx30/q.I6uTdXJNwx0juL4t.")
		                       .authorities("user")
		                       .build();

		return new InMemoryUserDetailsManager(admin, user);
	}
}
