package org.cha2code.dango.repository;

import org.cha2code.dango.entity.MenuRole;
import org.cha2code.dango.entity.MenuRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRoleRepository extends JpaRepository<MenuRole, MenuRoleId> {
	List<MenuRole> findAllByRoleCodeIs(String roleCode);
}