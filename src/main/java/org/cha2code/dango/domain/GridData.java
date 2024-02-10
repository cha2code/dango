package org.cha2code.dango.domain;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@SuppressWarnings("unused")
public class GridData<T> {
	List<T> contents;
	PageInfo pagination;

	public GridData(List<T> contents, int page, int totalCount) {
		this.contents = contents;
		this.pagination = new PageInfo(page, totalCount);
	}

	public GridData(List<T> contents) {
		this.contents = contents;
	}
}

record PageInfo(int page, int totalCount) {}
