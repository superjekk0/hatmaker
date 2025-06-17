package com.hat.maker;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class TestConfig {
    @TestConfiguration
    public class TestCorsConfig {

        @Bean
        public CorsConfigurationSource testCorsConfigurationSource() {
            return new UrlBasedCorsConfigurationSource();
        }
    }
}
