package org.cha2code.dango.dto;

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
                            LocalDateTime modifyDate) implements Serializable { }