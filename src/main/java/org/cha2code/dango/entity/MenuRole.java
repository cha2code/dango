package org.cha2code.dango.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
@Getter
@Entity
@Table(name = "menu_role")
public class MenuRole extends BaseAuditorEntity {
	@EmbeddedId
	private MenuRoleId id;

	@MapsId("menuSeq")
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "menu_seq", nullable = false)
	private MenuMaster menuSeq;

	@MapsId("roleCode")
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "role_code", nullable = false)
	private RoleMaster roleCode;

}