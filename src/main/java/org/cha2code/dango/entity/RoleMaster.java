package org.cha2code.dango.entity;

import jakarta.persistence.*;
import lombok.*;
import org.cha2code.dango.entity.BaseAuditorEntity;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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
}