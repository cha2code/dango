package org.cha2code.dango.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.cha2code.dango.entity.UserMaster;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link org.cha2code.dango.entity.UserMaster}
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserMasterDto(String userName,
                            String userPassword,
                            String nickname,
                            String email,
                            String userRole,
                            @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime passwordModifiedAt,
                            String createUser,
                            @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime createDate,
                            String modifyUser,
                            @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime modifyDate) implements
		Serializable {
	public UserMaster toEntity() {
		return UserMaster.builder()
		                 .username(userName)
		                 .userPassword(userPassword)
		                 .nickname(nickname)
		                 .email(email)
		                 .userRole(userRole)
		                 .build();
	}
}