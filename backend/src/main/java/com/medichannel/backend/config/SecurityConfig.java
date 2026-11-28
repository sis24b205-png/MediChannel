package com.medichannel.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.server.resource.authentication.*;
import org.springframework.http.HttpMethod;

import jakarta.servlet.DispatcherType;

import com.medichannel.backend.repository.UserRepository;
import com.medichannel.backend.security.AccountStatusFilter;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        UserRepository userRepository
        ) throws Exception  {

        var roles = new JwtGrantedAuthoritiesConverter();

        roles.setAuthoritiesClaimName("roles");
        roles.setAuthorityPrefix("ROLE_");

        var converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(roles);

        http.csrf(csrf -> csrf.disable())
            .sessionManagement(s -> s.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .dispatcherTypeMatchers(
                    DispatcherType.ERROR
                ).permitAll()
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/auth/register",
                    "/api/auth/login"
                ).permitAll()
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/auth/me"
                ).authenticated()
                .requestMatchers(
                    HttpMethod.POST,
                    "/api/auth/change-password"
                ).authenticated()
                .requestMatchers("/api/customer/**").hasRole("CUSTOMER")
                .requestMatchers("/api/doctor/**").hasRole("DOCTOR")
                .requestMatchers("/api/manager/**").hasRole("MANAGER")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().denyAll()
            )
            .oauth2ResourceServer(oauth -> oauth.jwt(jwt ->
                jwt.jwtAuthenticationConverter(converter)));
        http.addFilterAfter(
            new AccountStatusFilter(userRepository),
            BearerTokenAuthenticationFilter.class
        );

    return http.build();
    }
}
