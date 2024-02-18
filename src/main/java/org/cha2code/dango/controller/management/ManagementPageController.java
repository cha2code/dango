package org.cha2code.dango.controller.management;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.service.MenuService;
import org.cha2code.dango.service.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collections;

@Slf4j
@Controller
@RequiredArgsConstructor
@RequestMapping("/management")
public class ManagementPageController {
	private final RoleService roleService;
	private final MenuService menuService;

	@GetMapping("/user")
	public String userPage(Model model) {
		model.addAttribute("roleList", roleService.findAll());

		return "pages/management/user";
	}

	@GetMapping("/auth")
	public String authPage(Model model) {
		model.addAttribute("menuList", Collections.emptyList());

		return "pages/management/auth";
	}

	@GetMapping("/menu")
	public String menuPage() {
		return "pages/management/menu";
	}
}
