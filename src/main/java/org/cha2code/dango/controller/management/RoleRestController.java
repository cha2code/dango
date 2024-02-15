package org.cha2code.dango.controller.management;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.domain.GridData;
import org.cha2code.dango.domain.GridPagination;
import org.cha2code.dango.domain.GridResult;
import org.cha2code.dango.dto.RoleMasterDto;
import org.cha2code.dango.entity.RoleMaster;
import org.cha2code.dango.service.RoleService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
public class RoleRestController {
	private final RoleService service;

	@GetMapping("{roleCode}")
	public GridResult getRole(@PathVariable String roleCode) {
		RoleMasterDto roleInfo = service.getRoleInfo(roleCode);
		return new GridResult(true, new GridData<>(List.of(roleInfo), 1, 1));
	}

	@GetMapping
	public GridResult searchRole(@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
	                             GridPagination paging) {
		log.info("find role, keyword : {}, page : {}, Page size : {}",
		         keyword,
		         paging.getPage(),
		         paging.getPerPage());

		Page<RoleMaster> roleDataList = service.searchRole(keyword, paging.toPageRequest());

		List<RoleMasterDto> list = roleDataList.getContent().stream().map(RoleMaster::toDTO).toList();
		GridData<RoleMasterDto> data = new GridData<>(list,
		                                              paging.getPage(),
		                                              (int) roleDataList.getTotalElements());
		return new GridResult(true, data);
	}
}
