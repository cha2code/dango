package org.cha2code.dango.configuration;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.iv.RandomIvGenerator;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JasyptConfigTest {

    @Test
    void stringEncryptor() {

        StandardPBEStringEncryptor encryptor = new StandardPBEStringEncryptor();
        encryptor.setPassword("password");

        System.out.println("url : " + encryptor.encrypt("jdbc:mysql://localhost:3306/dango_db"));
        System.out.println("username : " + encryptor.encrypt("dango"));
        System.out.println("password : " + encryptor.encrypt("!dango2312"));

        System.out.println("");

        //System.out.println("url : " + encryptor.decrypt("8y4UBRJuzMv4uSx/YIvXIP+Tdp+HGDMgyZWXQxsuLZUu+Ivc+vmEnLn2rERTcqm8r5QcyhJMxvs="));
        //System.out.println("username : " + encryptor.decrypt("Bc8mL9zZyOJ9Q47EHaiY0Px9mpYn0xOj"));
        //System.out.println("password : " + encryptor.decrypt("NfAqAfurxNw7E2dOn2g7pMCLYm0+zXmS"));
    }

    }
}