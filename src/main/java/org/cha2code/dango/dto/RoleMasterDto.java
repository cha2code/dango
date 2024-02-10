package org.cha2code.dango.dto;

import org.cha2code.dango.entity.RoleMaster;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link org.cha2code.dango.entity.RoleMaster}
 */
public record RoleMasterDto(String roleCode,
                            String roleName,
                            String memo,
                            String createUser,
                            LocalDateTime createDate,
                            String modifyUser,
                            LocalDateTime modifyDate) implements Serializable {
	public RoleMaster toEntity() {
		return RoleMaster.builder()
		                 .roleCode(roleCode)
		                 .roleName(roleName)
		                 .memo(memo)
		                 .build();
	}

	public RoleMasterDto(String roleCode, String roleName, String memo) {
		this(roleCode, roleName, memo, null, null, null, null);
	}
}