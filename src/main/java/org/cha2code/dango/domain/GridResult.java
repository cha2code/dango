package org.cha2code.dango.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
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
	@JsonInclude(JsonInclude.Include.NON_EMPTY)
	private GridData<?> data;

	public GridResult(boolean result, GridData<?> data) {
		this.result = result;
		this.data = data;
	}

	public GridResult(boolean result) {
		this.result = result;
		this.data = null;
	}
}
