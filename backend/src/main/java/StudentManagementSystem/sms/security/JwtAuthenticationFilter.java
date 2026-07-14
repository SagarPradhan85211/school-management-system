package StudentManagementSystem.sms.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // Authorization header nahi hai ya Bearer nahi hai
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Bearer remove karke sirf token nikalo
        jwt = authHeader.substring(7);

        // Token se username nikalo
        username = jwtService.extractUsername(jwt);

        // Agar username mil gaya aur user already authenticate nahi hai
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Database se user lao
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Token verify karo
            if (jwtService.isTokenValid(jwt, userDetails)) {

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                // User ko authenticated mark karo
                SecurityContextHolder.getContext().setAuthentication(authToken);
                // System.out.println("Username : " + username);
                // System.out.println("Authorities : " + userDetails.getAuthorities());
                // System.out.println("Authentication : " +
                // SecurityContextHolder.getContext().getAuthentication());
            }
        }

        // Request ko aage bhejo
        filterChain.doFilter(request, response);
    }
}