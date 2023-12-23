package org.cha2code.dango.repository;

import org.cha2code.dango.entity.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMasterRepository extends JpaRepository<UserMaster, String> {
}