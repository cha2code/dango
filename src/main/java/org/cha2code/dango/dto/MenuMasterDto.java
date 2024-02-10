package org.cha2code.dango.dto;

import org.cha2code.dango.entity.MenuMaster;

import java.io.Serializable;

/**
 * DTO for {@link org.cha2code.dango.entity.MenuMaster}
 */
public record MenuMasterDto(Long id,
                            String menuName,
                            String menuUrl,
                            Integer parentMenu,
                            Integer menuSort) implements Serializable {
	public MenuMaster toEntity() {
		return MenuMaster.builder()
		                 .id(id)
		                 .menuName(menuName)
		                 .menuUrl(menuUrl)
		                 .parentMenu(parentMenu)
		                 .menuSort(menuSort)
		                 .build();
	}
}