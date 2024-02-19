package org.cha2code.dango.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.cha2code.dango.dto.RoleMasterDto;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
@Getter
@Entity
@Table(name = "role_master")
public class RoleMaster extends BaseAuditorEntity {
	@Id
	@Column(name = "role_code", nullable = false, length = 40)
	private String roleCode;

	@Column(name = "role_name", nullable = false, length = 40)
	private String roleName;

	@Column(name = "memo", length = 200)
	private String memo;

	public RoleMaster updateData(String roleName, String memo) {
		if (StringUtils.hasText(roleName) && !this.roleName.equals(roleName)) {
			this.roleName = roleName;
		}

		if (StringUtils.hasText(memo) && !this.memo.equals(memo)) {
			this.memo = memo;
		}

		return this;
	}

	@Transient
	public RoleMasterDto toDTO() {
		return new RoleMasterDto(roleCode,
		                         roleName,
		                         memo,
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