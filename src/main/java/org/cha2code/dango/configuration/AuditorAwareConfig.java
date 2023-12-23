package org.cha2code.dango.configuration;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@SuppressWarnings("NullableProblems")
public class AuditorAwareConfig implements AuditorAware<String> {
	@Override
	public Optional<String> getCurrentAuditor() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || !authentication.isAuthenticated()) {
			return Optional.empty();
		}

		UserDetails principal = (UserDetails) authentication.getPrincipal();

		return Optional.of(principal.getUsername());
	}
}
