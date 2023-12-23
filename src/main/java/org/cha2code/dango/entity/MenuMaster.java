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
}