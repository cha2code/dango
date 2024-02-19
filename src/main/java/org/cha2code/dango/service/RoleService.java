package org.cha2code.dango.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.dto.RoleMasterDto;
import org.cha2code.dango.entity.RoleMaster;
import org.cha2code.dango.repository.RoleMasterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

	@Transactional
	public boolean createData(List<RoleMasterDto> dataList) {
		List<RoleMaster> list = dataList.stream()
		                                .map(RoleMasterDto::toEntity)
		                                .toList();

		List<RoleMaster> resultList = repo.saveAll(list);

		return resultList.stream().allMatch(RoleMaster::isCreated);
	}

	@Transactional
	public void updateData(List<RoleMasterDto> dataList) {
		List<String> roleList = dataList.stream()
		                              .map(RoleMasterDto::roleCode)
		                              .toList();

		List<RoleMaster> targetList = repo.findAllById(roleList);

		for (RoleMaster target : targetList) {
			for (RoleMasterDto source : dataList) {
				if (target.getRoleCode().equals(source.roleCode())) {
					target.updateData(source.roleName(),
					                  source.memo());
				}
			}
		}

		repo.saveAll(targetList);
	}

	@Transactional
	public void deleteData(List<RoleMasterDto> dataList) {
		repo.deleteAllByIdInBatch(dataList.stream()
		                                  .map(RoleMasterDto::roleCode)
		                                  .toList());
	}
}
