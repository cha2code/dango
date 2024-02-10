package org.cha2code.dango.repository;

import org.cha2code.dango.entity.UserMaster;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserMasterRepository extends JpaRepository<UserMaster, String> {
	@Query(value = """
			select u
			from UserMaster u
			where :keyword = ''
			or u.username like CONCAT('%', CONCAT(:keyword, '%'))
			or u.nickname like CONCAT('%', CONCAT(:keyword, '%'))
			""")
	Page<UserMaster> findAllWithKeyword(@Param("keyword") String keyword, Pageable paging);

	Optional<UserMaster> findByUsername(String username);
}