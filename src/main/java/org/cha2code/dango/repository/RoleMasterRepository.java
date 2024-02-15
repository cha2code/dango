package org.cha2code.dango.repository;

import org.cha2code.dango.entity.RoleMaster;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoleMasterRepository extends JpaRepository<RoleMaster, String> {
	@Query(value = """
			select r
			from RoleMaster r
			where :keyword = ''
			or r.roleCode like CONCAT('%', CONCAT(:keyword, '%'))
			or r.roleName like CONCAT('%', CONCAT(:keyword, '%'))
			""")
	Page<RoleMaster> findAllWithKeyword(@Param("keyword") String keyword, Pageable paging);

	Optional<RoleMaster> findByRoleCode(String roleCode);
}