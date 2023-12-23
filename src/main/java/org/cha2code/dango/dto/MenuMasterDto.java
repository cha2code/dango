package org.cha2code.dango.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link org.cha2code.dango.entity.MenuMaster}
 */
public record MenuMasterDto(Long id,
                            String menuName,
                            String menuUrl,
                            Integer parentMenu,
                            Integer menuSort,
                            String createUser,
                            LocalDateTime createDate,
                            String modifyUser,
                            LocalDateTime modifyDate) implements Serializable { }