package org.cha2code.dango.service;

import lombok.RequiredArgsConstructor;
import org.cha2code.dango.entity.UserMaster;
import org.cha2code.dango.repository.UserMasterRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SecurityUserDetailService implements UserDetailsService {

	private final UserMasterRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserMaster userMaster = repository.findByUsername(username)
		                                  .orElseThrow(() -> new UsernameNotFoundException("Cannot found user"));

		List<GrantedAuthority> authorities = new ArrayList<>();

		String userRole = userMaster.getUserRole();

		if (userRole.contains(",")) {
			Arrays.stream(userRole.split(","))
			      .map(roleCode -> String.format("ROLE_%s", roleCode))
			      .forEach(codeStr -> authorities.add(new SimpleGrantedAuthority(codeStr)));
		} else {
			authorities.add(new SimpleGrantedAuthority(String.format("ROLE_%s", userRole)));
		}


		return new User(userMaster.getUsername(), userMaster.getUserPassword(), authorities);
	}
}