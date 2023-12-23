package org.cha2code.dango.controller;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GridResult {
	@Builder.Default
	private boolean result = false;
	private GridData<?> data;

	public GridResult(boolean result, GridData<?> data) {
		this.result = result;
		this.data = data;
	}
}
