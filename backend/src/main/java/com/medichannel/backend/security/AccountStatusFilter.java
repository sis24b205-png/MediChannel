package com.medichannel.backend.security;

import com.medichannel.backend.entity.User;
import com.medichannel.backend.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.OffsetDateTime;

public class AccountStatusFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    public AccountStatusFilter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        Authentication authentication =
                SecurityContextHolder.getContext()
                        .getAuthentication();

        if (authentication instanceof JwtAuthenticationToken jwt) {

            Long userId;

            try {
                userId = Long.valueOf(jwt.getToken().getSubject());
            } catch (NumberFormatException ex) {
                reject(response);
                return;
            }

            User user = userRepository.findById(userId)
                    .orElse(null);

            if (user == null || !user.isActive()) {
                reject(response);
                return;
            }

            if (user.getLockedUntil() != null
                    && user.getLockedUntil()
                    .isAfter(OffsetDateTime.now())) {
                reject(response);
                return;
            }

            if (!jwt.getAuthorities().stream().anyMatch(
                    authority -> authority.getAuthority()
                            .equals("ROLE_" + user.getRole()))) {
                reject(response);
                return;
            }
        if (user.isMustChangePassword()) {

    String path = request.getServletPath();
    String method = request.getMethod();

    boolean passwordChangeRequest =
            "POST".equals(method)
            && "/api/auth/change-password".equals(path);

    boolean profileRequest =
            "GET".equals(method)
            && "/api/auth/me".equals(path);

    if (!passwordChangeRequest && !profileRequest) {

        response.setStatus(
                HttpServletResponse.SC_FORBIDDEN);

        response.setContentType("application/json");

        response.getWriter().write(
                "{\"message\":\"Password change required\"}");

        return;
        }
    }
        }
        filterChain.doFilter(request, response);
    }

    private void reject(HttpServletResponse response)
            throws IOException {

        SecurityContextHolder.clearContext();

        response.setStatus(
                HttpServletResponse.SC_UNAUTHORIZED);

        response.setContentType("application/json");

        response.getWriter().write(
                "{\"message\":\"Account access denied\"}");
    }
}
