package org.cha2code.dango.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.dto.MenuMasterDto;
import org.cha2code.dango.entity.MenuMaster;
import org.cha2code.dango.entity.MenuRole;
import org.cha2code.dango.repository.MenuMasterRepository;
import org.cha2code.dango.repository.MenuRoleRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuService {
	private final MenuMasterRepository repo;
	private final MenuRoleRepository menuRoleRepo;

	public List<MenuMasterDto> findAll() {
		return repo.findAll()
		           .stream()
		           .map(MenuMaster::toDTO)
		           .toList();
	}

	public List<MenuMasterDto> findRootMenus() {
		List<MenuMaster> rootMenuList = repo.findAllByUsedIsTrueAndParentMenuIs(1);

		List<MenuMasterDto> resultList = new ArrayList<>();

		if (!CollectionUtils.isEmpty(rootMenuList)) {
			for (MenuMaster parent : rootMenuList) {
				List<MenuMasterDto> children = repo.findAllByUsedIsTrueAndParentMenuIs(parent.getId().intValue())
				                                   .stream()
				                                   .map(MenuMaster::toDTO)
				                                   .toList();

				MenuMasterDto dto = parent.toDTO(children);

				resultList.add(dto);
			}
		}

		return resultList;
	}

	public List<MenuMasterDto> findRootMenuByRoleCode(String roleCode) {
		var accessibleMenus = menuRoleRepo.findAllByRoleCodeIs(roleCode)
		                                  .stream()
		                                  .map(MenuRole::getMenuSeq)
		                                  .toList();

		List<MenuMaster> rootMenuList = repo.findAllByUsedIsTrueAndParentMenuIs(1);

		List<MenuMasterDto> resultList = new ArrayList<>();

		if (!CollectionUtils.isEmpty(rootMenuList)) {
			for (MenuMaster parent : rootMenuList) {
				List<MenuMasterDto> children = repo.findAllByUsedIsTrueAndParentMenuIs(parent.getId().intValue())
				                                   .stream()
				                                   .map(MenuMaster::toDTO)
				                                   .filter(dto -> accessibleMenus.contains(dto.menuSeq()))
				                                   .toList();

				if (!children.isEmpty()) {
					resultList.add(parent.toDTO(children));
				}
			}
		}

		return resultList;
	}

	public List<MenuMasterDto> findAllByRoleCode(String roleCode) {
		return menuRoleRepo.findAllByRoleCodeIs(roleCode)
		                   .stream()
		                   .map(MenuRole::getMenuInfo)
		                   .filter(menuInfo -> !menuInfo.getMenuUrl().equals("/"))
		                   .map(MenuMaster::toDTO)
		                   .toList();
	}
}
