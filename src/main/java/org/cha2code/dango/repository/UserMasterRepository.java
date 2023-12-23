package org.cha2code.dango.repository;

import org.cha2code.dango.entity.UserMaster;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserMasterRepository extends JpaRepository<UserMaster, String> {
	@Query(value = "select u from UserMaster u where :keyword = '' or u.userId like '%keyword%' or u.nickname like '%keyword%'")
	Page<UserMaster> findAllWithKeyword(String keyword, Pageable paging);
}