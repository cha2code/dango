package org.cha2code.dango.controller.management;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequestMapping("management/user")
@RequiredArgsConstructor
public class UserManageController {

	@GetMapping
	public String userPage() {
		return "pages/management/user";
	}
}
