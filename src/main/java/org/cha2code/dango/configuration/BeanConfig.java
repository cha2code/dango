package org.cha2code.dango.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * 프로젝트 전체에 걸쳐 사용되는 Bean을 정의하는 설정 클래스
 */
@Configuration
public class BeanConfig {
	/**
	 * 단방향 암호화 처리간 사용되는 passwordEncoder
	 * 객체 생성간 전달하는 숫자 값이 클수록 복잡도가 늘어나 보안에는 유리하나, 성능에 악영향을 미치므로 적절한 수정 필요
	 * @return BcryptPasswordEncoder
	 */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}
}
