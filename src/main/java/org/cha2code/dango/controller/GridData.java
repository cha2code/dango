package org.cha2code.dango.controller;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@SuppressWarnings("unused")
public class GridData<T> {
	List<T> contents;
	PageInfo pagenation;

	public GridData(List<T> contents, int page, int totalCount) {
		this.contents = contents;
		this.pagenation = new PageInfo(page, totalCount);
	}

	public GridData(List<T> contents) {
		this.contents = contents;
	}
}


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
record PageInfo(int page, int totalCount) {}
