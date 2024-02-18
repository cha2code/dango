package org.cha2code.dango.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.cha2code.dango.entity.MenuMaster;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

/**
 * DTO for {@link org.cha2code.dango.entity.MenuMaster}
 */
public record MenuMasterDto(Long menuSeq,
                            String menuName,
                            String menuUrl,
                            Integer parentMenu,
                            Integer menuSort,
                            boolean used,
                            @JsonInclude(JsonInclude.Include.NON_EMPTY) @JsonProperty("_children") List<MenuMasterDto> children) implements
		Serializable {
	// 생성자
	public MenuMasterDto(Long menuSeq,
	                     String menuName,
	                     String menuUrl,
	                     Integer parentMenu,
	                     Integer menuSort,
	                     boolean used) {
		this(menuSeq, menuName, menuUrl, parentMenu, menuSort, used, Collections.emptyList());
	}

	public MenuMaster toEntity() {
		return MenuMaster.builder()
		                 .id(menuSeq)
		                 .menuName(menuName)
		                 .menuUrl(menuUrl)
		                 .parentMenu(parentMenu)
		                 .menuSort(menuSort)
		                 .used(used)
		                 .build();
	}
}