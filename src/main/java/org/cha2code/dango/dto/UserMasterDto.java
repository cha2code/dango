package org.cha2code.dango.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link org.cha2code.dango.entity.UserMaster}
 */

public record UserMasterDto(String userId,
                            String userPassword,
                            String nickname,
                            String email,
                            String userRole,
                            LocalDateTime passwordModifiedAt,
                            String createUser,
                            LocalDateTime createDate,
                            String modifyUser,
                            LocalDateTime modifyDate) implements Serializable {
}