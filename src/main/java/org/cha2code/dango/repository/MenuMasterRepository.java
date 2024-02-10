package org.cha2code.dango.repository;

import org.cha2code.dango.entity.MenuMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuMasterRepository extends JpaRepository<MenuMaster, Long> {

	@Query(nativeQuery = true, value = """
			SELECT *
			FROM menu_master a
			IN
			""")
	List<MenuMaster> findAlLByRoleCode(String roleCode);
}