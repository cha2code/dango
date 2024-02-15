package org.cha2code.dango.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.dto.RoleMasterDto;
import org.cha2code.dango.entity.RoleMaster;
import org.cha2code.dango.repository.RoleMasterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoleService {
	private final RoleMasterRepository repo;

	public RoleMasterDto getRoleInfo(String roleCode) {
		return repo.findByRoleCode(roleCode)
		           .map(RoleMaster::toDTO)
		           .orElse(null);
	}

	public List<RoleMasterDto> findAll() {
		return repo.findAll()
		           .stream()
		           .map(RoleMaster::toDTO)
		           .toList();
	}

	public Page<RoleMaster> searchRole(String keyword, Pageable paging) {
		return StringUtils.hasText(keyword)
		       ? repo.findAllWithKeyword(keyword, paging)
		       : repo.findAll(paging);
	}
}
