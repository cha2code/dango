package org.cha2code.dango;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableEncryptableProperties
public class DangoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DangoApplication.class, args);
    }

}
