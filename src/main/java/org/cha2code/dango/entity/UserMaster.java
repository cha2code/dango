package org.cha2code.dango.entity;

import lombok.*;
import org.cha2code.dango.dto.UserMasterDto;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.persistence.*;
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
	private String username;

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

	public UserMaster encodePassword(PasswordEncoder encoder) {
		if (StringUtils.hasText(this.userPassword)) {
			this.userPassword = encoder.encode(this.userPassword);
		}

		return this;
	}

	public UserMaster updateData(PasswordEncoder encoder, String userPassword, String nickname, String email, String userRole) {
		if (StringUtils.hasText(userPassword) && !encoder.matches(userPassword, this.userPassword)) {
			this.userPassword = userPassword;
			this.passwordModifiedAt = LocalDateTime.now();
		}

		if (StringUtils.hasText(nickname) && !this.nickname.equals(nickname)) {
			this.nickname = nickname;
		}

		if (StringUtils.hasText(email) && !this.email.equals(email)) {
			this.email = email;
		}
		if (StringUtils.hasText(userRole) && !this.userRole.equals(userRole)) {
			this.userRole = userRole;
		}

		return this;
	}

	@Transient
	public UserMasterDto toDTO() {
		return new UserMasterDto(username,
		                         userPassword,
		                         nickname,
		                         email,
		                         userRole,
								 passwordModifiedAt,
		                         getCreateUser(),
								 getCreateDate(),
								 getModifyUser(),
		                         getModifyDate());
	}

	@Transient
	public boolean isCreated() {
		return StringUtils.hasText(getCreateUser()) && !ObjectUtils.isEmpty(getCreateDate());
	}
}