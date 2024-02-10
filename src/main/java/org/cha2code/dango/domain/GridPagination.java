package org.cha2code.dango.domain;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;

@Slf4j
@Data
public class GridPagination {
	private int page;
	private int perPage;

	public PageRequest toPageRequest() {
		return PageRequest.of(page - 1, perPage);
	}
}
