package org.cha2code.dango.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.dto.UserMasterDto;
import org.cha2code.dango.entity.UserMaster;
import org.cha2code.dango.repository.UserMasterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
	private final UserMasterRepository repo;

	public UserMasterDto getUserInfo(String userId) {
		return repo.findById(userId)
		           .map(UserMaster::toDTO)
		           .orElse(null);
	}

	public Page<UserMaster> searchUser(String keyword, Pageable paging) {
		return StringUtils.hasText(keyword)
				? repo.findAllWithKeyword(keyword, paging)
				: repo.findAll(paging);
	}
}
