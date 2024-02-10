package org.cha2code.dango.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Builder
@Getter
@Entity
@Table(name = "menu_role")
@IdClass(MenuRoleId.class)
public class MenuRole extends BaseAuditorEntity {
	@Id
	@Column(name = "menu_seq", columnDefinition = "int UNSIGNED not null")
	private Long menuSeq;

	@Id
	@Column(name = "role_code", nullable = false, length = 40)
	private String roleCode;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "menu_seq", nullable = false, insertable = false, updatable = false)
	private MenuMaster menuInfo;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "role_code", nullable = false, insertable = false, updatable = false)
	private RoleMaster roleInfo;
}