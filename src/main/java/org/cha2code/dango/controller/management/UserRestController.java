package org.cha2code.dango.controller.management;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.domain.GridData;
import org.cha2code.dango.domain.GridPagination;
import org.cha2code.dango.domain.GridRequest;
import org.cha2code.dango.domain.GridResult;
import org.cha2code.dango.dto.UserMasterDto;
import org.cha2code.dango.entity.UserMaster;
import org.cha2code.dango.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/user/")
@RequiredArgsConstructor
public class UserRestController {
	private final UserService service;

	@GetMapping("{userId}") // /api/user/tester_admin
	public GridResult getUser(@PathVariable String userId) {
		UserMasterDto userInfo = service.getUserInfo(userId);
		return new GridResult(true, new GridData<>(List.of(userInfo), 1, 1));
	}

	@GetMapping // /api/user?keyword=asdf
	public GridResult searchUser(@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
	                             GridPagination paging) {
		log.info("find user, keyword : {}, page : {}, Page size : {}",
		         keyword,
		         paging.getPage(),
		         paging.getPerPage());

		Page<UserMaster> userDataList = service.searchUser(keyword, paging.toPageRequest());

		List<UserMasterDto> list = userDataList.getContent().stream().map(UserMaster::toDTO).toList();
		GridData<UserMasterDto> data = new GridData<>(list,
		                                              paging.getPage(),
		                                              (int) userDataList.getTotalElements());
		return new GridResult(true, data);
	}

	@PutMapping
	public GridResult updateData(@RequestBody GridRequest<UserMasterDto> requestData) {
		boolean result = false;

		if (!CollectionUtils.isEmpty(requestData.getCreatedRows())) {
			result = service.createData(requestData.getCreatedRows());
		}

		if (!CollectionUtils.isEmpty(requestData.getUpdatedRows())) {
			service.updateData(requestData.getUpdatedRows());

			result = true;
		}

		if (!CollectionUtils.isEmpty(requestData.getDeletedRows())) {
			service.deleteData(requestData.getDeletedRows());

			result = true;
		}

		return new GridResult(result);
	}
}
