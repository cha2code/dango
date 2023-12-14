package org.cha2code.dango.configuration;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Jasypt 라이브러리를 활용해 데이터의 암/복호화 처리 Bean을 생성하는 설정 클래스
 *
 * @author cha2jini
 */
@Configuration
public class JasyptConfig {

    /** 환경변수에 대한 비밀번호 저장 */
    @Value("${jasypt.encryptor.password}")
    String password;

    /**
     * Jasypt 라이브러리로 문자열 암/복호화를 처리하는 StringEncryptor 객체를 반환한다.
     *
     * @return StringEncryptor
     */
    @Bean
    public StringEncryptor jasyptStringEncryptor() {

        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();

        config.setPassword(password);
        config.setAlgorithm("PBEWITHHMACSHA512ANDAES_256");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setProviderName("SunJCE");
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setIvGeneratorClassName("org.jasypt.iv.RandomIvGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        return encryptor;
    }
}
