package org.cha2code.dango.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.dto.RoleMasterDto;
import org.cha2code.dango.entity.RoleMaster;
import org.cha2code.dango.repository.RoleMasterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoleService {
	private final RoleMasterRepository repo;

	public List<RoleMasterDto> findAll() {
		return repo.findAll()
		           .stream()
		           .map(RoleMaster::toDTO)
		           .toList();
	}
}
