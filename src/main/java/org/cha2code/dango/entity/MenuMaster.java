package org.cha2code.dango.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.cha2code.dango.dto.MenuMasterDto;
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
@Table(name = "menu_master")
public class MenuMaster extends BaseAuditorEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "menu_seq", columnDefinition = "int UNSIGNED not null")
	private Long id;

	@Column(name = "menu_name", nullable = false, length = 200)
	private String menuName;

	@Column(name = "menu_url", nullable = false)
	private String menuUrl;

	@Column(name = "parent_menu", nullable = false)
	private Integer parentMenu;

	@Column(name = "menu_sort", nullable = false)
	private Integer menuSort;

	@Transient
	public MenuMasterDto toDTO() {
		return new MenuMasterDto(id, menuName, menuUrl, parentMenu, menuSort);
	}
}