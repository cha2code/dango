package org.cha2code.dango.controller.management;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.service.RoleService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("management/user")
@RequiredArgsConstructor
public class UserManageController {
	private final RoleService roleService;

	@GetMapping
	public String userPage(Model model) {
		model.addAttribute("roleList", roleService.findAll());

		return "pages/management/user";
	}
}
