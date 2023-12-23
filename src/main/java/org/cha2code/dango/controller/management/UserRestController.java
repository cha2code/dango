package org.cha2code.dango.controller.management;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.controller.GridData;
import org.cha2code.dango.controller.GridResult;
import org.cha2code.dango.dto.UserMasterDto;
import org.cha2code.dango.entity.UserMaster;
import org.cha2code.dango.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/user/")
@RequiredArgsConstructor
public class UserRestController {
	private final ObjectMapper objectMapper;
	private final UserService service;

	@GetMapping("{userId}")
	public GridResult getUser(@PathVariable String userId) {
		UserMasterDto userInfo = service.getUserInfo(userId);
		return new GridResult(true, new GridData<>(List.of(userInfo), 1, 1));
	}

	@GetMapping
	public GridResult searchUser(@RequestParam(name = "keyword", required = false, defaultValue = "") String keyword,
	                             Pageable paging) throws JsonProcessingException {
		log.info("find user, keyword : {}, page : {}, total Page : {}",
		         keyword,
		         paging.getPageNumber(),
		         paging.getPageSize());

		Page<UserMaster> userDataList = service.searchUser(keyword,
		                                                   PageRequest.of(paging.getPageNumber() - 1,
		                                                                  paging.getPageSize()));

		return new GridResult(true,
		                      new GridData<>(userDataList.getContent()
		                                                 .stream()
		                                                 .map(UserMaster::toDTO)
		                                                 .toList(),
		                                     paging.getPageNumber(),
		                                     (int) userDataList.getTotalElements()));
	}
}
