package org.cha2code.dango.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class MenuRoleId implements Serializable {
	private static final long serialVersionUID = -6169434822932528951L;
	@Column(name = "menu_seq", columnDefinition = "int UNSIGNED not null")
	private Long menuSeq;

	@Column(name = "role_code", nullable = false, length = 40)
	private String roleCode;

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) {
			return false;
		}
		MenuRoleId entity = (MenuRoleId) o;
		return Objects.equals(this.menuSeq, entity.menuSeq) &&
				Objects.equals(this.roleCode, entity.roleCode);
	}

	@Override
	public int hashCode() {
		return Objects.hash(menuSeq, roleCode);
	}

}