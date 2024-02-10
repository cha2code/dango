package org.cha2code.dango.domain;

import lombok.Data;

import java.util.List;

@Data
public class GridRequest<T> {
	private List<T> createdRows;
	private List<T> updatedRows;
	private List<T> deletedRows;
}
