package org.cha2code.dango.configuration;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import nz.net.ultraq.thymeleaf.LayoutDialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

/**
 * 프로젝트 전체에 걸쳐 사용되는 Bean을 정의하는 설정 클래스
 */
@Configuration
public class BeanConfig {
	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();

		// LocalDateTime 처리를 위한 모듈 등록
		objectMapper.registerModule(new JavaTimeModule());

		SimpleModule module = new SimpleModule();

		module.addSerializer(LocalDate.class, new JsonSerializer<>() {
			@Override
			public void serialize(
					LocalDate localDate, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
					throws IOException {
				jsonGenerator.writeString(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(localDate));
			}
		});
		module.addSerializer(LocalTime.class, new JsonSerializer<>() {
			@Override
			public void serialize(
					LocalTime localTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
					throws IOException {
				jsonGenerator.writeString(DateTimeFormatter.ofPattern("HH:mm:ss").format(localTime));
			}
		});
		module.addSerializer(LocalDateTime.class, new JsonSerializer<>() {
			@Override
			public void serialize(
					LocalDateTime localDateTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider)
					throws IOException {
				jsonGenerator.writeString(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").format(localDateTime));
			}
		});

		objectMapper.registerModule(module);

		return objectMapper;
	}


	/**
	 * 단방향 암호화 처리간 사용되는 passwordEncoder
	 * 객체 생성간 전달하는 숫자 값이 클수록 복잡도가 늘어나 보안에는 유리하나, 성능에 악영향을 미치므로 적절한 수정 필요
	 *
	 * @return BcryptPasswordEncoder
	 */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}

	/**
	 * Thymeleaf Layout 라이브러리 사용을 위한 Bean 클래스 추가
	 * @return LayoutDialect
	 */
	@Bean
	public LayoutDialect layoutDialect() {
		return new LayoutDialect();
	}
}
