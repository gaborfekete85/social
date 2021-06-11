package com.booking.bookingservice.security;

import com.booking.bookingservice.config.AppProperties;
import com.booking.bookingservice.model.ERole;
import com.booking.bookingservice.model.Role;
import com.booking.bookingservice.model.User;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoField;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
    public static final String AUTHORITIES = "authorities";

    private final AppProperties appProperties;

    public TokenProvider(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public String createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        LocalDateTime expiryDate = LocalDateTime.now().plus(appProperties.getAuth().getTokenExpirationMsec(), ChronoField.MILLI_OF_DAY.getBaseUnit());
        String secret = appProperties.getAuth().getTokenSecret();

        return Jwts.builder()
                .setSubject(userPrincipal.getEmail())
                .claim(AUTHORITIES, authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .setIssuedAt(new Date())
                .setIssuer(userPrincipal.getUserId().toString())
                .setExpiration(Date.from(expiryDate.atZone( ZoneId.systemDefault()).toInstant()))
                .setAudience(userPrincipal.getName())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public User getUserFromToken(String token) {
        Claims claims = Jwts.parser()
                            .setSigningKey(appProperties.getAuth().getTokenSecret())
                            .parseClaimsJws(token)
                            .getBody();
        List<LinkedHashMap> authoritiesList = (List<LinkedHashMap>) claims.get("authorities");

        //Set<Role> roles = authoritiesList.stream().map(x -> x.get(0).get("authority").map(z -> new Role(ERole.valueOf(z))).collect(Collectors.toSet());
        Set<Role> roles = new HashSet<>();
        for(LinkedHashMap item : authoritiesList) {
            Role role = new Role(ERole.valueOf(item.get("authority").toString()));
            roles.add(role);
        }

        return User.builder()
                   .userId(UUID.randomUUID())
                   .email(claims.getIssuer())
                   .roles(roles)
                   .build();
    }


    public UUID getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return UUID.fromString(claims.getIssuer());
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }

}
