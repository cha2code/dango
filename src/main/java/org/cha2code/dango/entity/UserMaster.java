package org.cha2code.dango.entity;

import jakarta.persistence.*;
import lombok.*;
import org.cha2code.dango.dto.UserMasterDto;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
@Getter
@Entity
@Table(name = "user_master")
public class UserMaster extends BaseAuditorEntity {
	@Id
	@Column(name = "user_id", nullable = false, length = 40)
	private String userId;

	@Column(name = "user_password", nullable = false)
	private String userPassword;

	@Column(name = "nickname", nullable = false, length = 20)
	private String nickname;

	@Column(name = "email", nullable = false, length = 256)
	private String email;

	@Column(name = "user_role", nullable = false, length = 400)
	private String userRole;

	@Column(name = "password_modified_at")
	private LocalDateTime passwordModifiedAt;

	public UserMasterDto toDTO() {
		return new UserMasterDto(userId,
		                         "",
		                         nickname,
		                         email,
		                         userRole,
								 passwordModifiedAt,
		                         getCreateUser(),
								 getCreateDate(),
								 getModifyUser(),
		                         getModifyDate());
	}
}