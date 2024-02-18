package org.cha2code.dango.controller.management;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.domain.GridResult;
import org.cha2code.dango.service.MenuService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/menu")
@RestController
@RequiredArgsConstructor
public class MenuRestController {
	private final MenuService service;

	@GetMapping
	public GridResult searchRole() {
		return new GridResult(service.findRootMenus());
	}
}
