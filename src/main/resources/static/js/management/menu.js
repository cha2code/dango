let grid;

// reloadData를 컨트롤 하기위한 변수
let isNeedReloadData = false

let deleteMenuId = 'empty';

const saveData = function (grid) {

	const {rowKey, columnName} = grid.getFocusedCell();
	console.log(grid.getModifiedRows({}));
	let updatedRows = grid.getModifiedRows({}).updatedRows;
	let createdRows = grid.getModifiedRows({}).createdRows;
	let deletedRows = grid.getModifiedRows({}).deletedRows;

	let needCheckRows = [];

	// 사용자 생성 시 검증
	for (let index = 0 ; index < createdRows.length ; index++) {

		// 아이디, 이름, 접근 가능 IP 검증
		if (createdRows[index].menuName === null
		    || createdRows[index].menuName === ''
		    || createdRows[index].path === null
		    || createdRows[index].path === ''
		) {
			needCheckRows.push(createdRows[index].rowKey);
		}
	}

	// 사용자 수정 시 검증
	for (let index = 0 ; index < updatedRows.length ; index++) {

		// 이름, 접근 가능 IP 검증
		if (updatedRows[index].menuName === '' || updatedRows[index].path === '') {
			needCheckRows.push(updatedRows[index].rowKey);
		}
	}

	// 모든 데이터가 정상일 경우 db 업데이트 실행,
	// needCheckRows가 배열이면서 값이 존재하는 경우 비정상적인 데이터가 있다고 판단, alert을 노출한 뒤 문제가 있는 row를 select한다.
	if (needCheckRows && Array.isArray(needCheckRows) && needCheckRows.length === 0) {
		// 변경이 일어난 row 객체
		let modifiedRows = grid.getModifiedRows();
		// 삭제된 row의 roleCode
		let deletedRowMenuId = modifiedRows.deletedRows[0];
		// delete url path 에 입력할 데이터
		deleteMenuId = deletedRowMenuId === undefined ? 'empty' : deletedRowMenuId.menuId;
		// 그리드 데이터 업데이트 진행
		dataUpdate(grid, modifiedRows);
	} else {
		dataUpdateFail(grid, needCheckRows);
	}
};

// grid 사이즈 재조정
const gridRefreshLayout = function() {
	window.setTimeout(function () {
		grid.refreshLayout();
	}, 350);
}

const dataSource = {
	contentType : 'application/json',
	api : {
		readData : {
			url : '/api/menu',
			method : 'GET'
		},
		createData : {
			url : '/api/menu',
			method : 'POST'
		},
		updateData : {
			url : '/api/menu',
			method : 'PUT'
		},
		deleteData : {
			url : () => '/api/menu/' + deleteMenuId,
			method : 'DELETE'
		}
	}
};

const gridOption = {
	el : document.getElementById('grid'),
	scrollY : true,
	bodyHeight : "fitToParent",
	data : dataSource,
	contextMenu: null,
	treeColumnOptions: {
		name: 'menuName',
		useIcon: true,
		useCascadingCheckbox: true
	},
	columnOptions : {
		resizable : true
	},
	showDummyRows : true,
	copyOptions: {
		customValue: null
	},
	columns : [
		{
			header : '메뉴이름',
			name : 'menuName',
			editor : 'text',
			renderer: 'afdasf'
		},
		{
			header : '경로',
			name : 'menuPath',
			editor : 'text'
		},
		{
			header : '아이콘',
			name : 'icon',
			editor : 'text'
		},
		{
			header : '메뉴 사용여부',
			name : 'useYn',
			editor : {
				type : 'select',
				options : {
					listItems : [
						{text : '사용', value : true},
						{text : '미사용', value : false}
					]
				}
			},
			formatter : (rowData) => onChangeFlag("useYn", rowData.value)
		},
		{
			header : '생성자',
			name : 'createUserName'
		},
		{
			header : '생성일시',
			name : 'created',
			formatter : toDateFormatter
		},
		{
			header : '수정자',
			name : 'modifyUserName'
		},
		{
			header : '수정일시',
			name : 'modified',
			formatter : toDateFormatter
		}
	]
};

function saveDataHandler(grid, gridName) {
	saveData(grid);
}

// noinspection JSCheckFunctionSignatures
$("#updateBtn").click(function () {
	grid.finishEditing();
	if (!onClickSaveBtn(grid)) { return; }
	isNeedReloadData = true;
});

// noinspection JSCheckFunctionSignatures
$("#readBtn").click(function () {
	grid.reloadData();
	console.log(dataSource);
});

// noinspection JSCheckFunctionSignatures
$("#appendBtn").click(function () {
	// 선택한 Cell 정보 취득
	const focusedCell = grid.getFocusedCell();
	// 1번 케이스
	// 선택한 Row 정보 취득 임시 저장
	const selectedRowTemp = grid.getRow(focusedCell.rowKey);
	// Cell 선택 유무(선택하면 true, 아니면 false)
	const isSelectedRow = focusedCell !== null
	                      && focusedCell !== undefined
	                      && focusedCell.rowKey !== null
	                      && focusedCell.rowKey !== undefined;
	// 선택한 메뉴의 menuId
	let selectedMenuId = isSelectedRow ? selectedRowTemp.menuId : '';
	// 현재 그리드 기준 부모 RowKey
	let parentMenuRowKey = null;

	// 2번 케이스
	// 선택된 메뉴가 저장되지 않아 MenuId가 존재하지 않는 경우, 해당 Row의 부모 값을 기준으로 처리한다.
	if (selectedRowTemp != null && !selectedMenuId) {
		selectedMenuId = selectedRowTemp.parentId;
	}

	// 선택한 Row 정보 취득(1번 케이스는 selectedRowTemp 데이터 그대로, 2번 케이스는 부모 Row 데이터로)
	const selectedRow = grid.findRows({menuId : selectedMenuId});

	if (selectedRow.length === 0) {
		// 선택한 데이터가 없을 경우
		// 부모메뉴 ID가 0인 경우 1depth 메뉴 하위에 추가하는 것으로 취급, 그 외의 경우 1depth로 추가
		if (selectedMenuId === 0) {
			// 현재 선택된 Row가 대메뉴인 경우
			parentMenuRowKey = selectedRow.rowKey;
			selectedMenuId = grid.getRow(parentMenuRowKey).menuId;
		}
	} else {
		// 부모메뉴 정보가 존재하는 경우
		// 부모메뉴의 depth를 체크하여 부모메뉴가 1depth가 아닌 경우 부모의 부모메뉴 하단에 추가한다.
		parentMenuRowKey = (selectedRow[0].parentId !== 0
		                    ? grid.findRows({menuId : selectedRow[0].parentId})[0]
		                    : selectedRow[0]).rowKey;
		selectedMenuId = grid.getRow(parentMenuRowKey).menuId;
	}

	grid.appendTreeRow(
			{ parentId : selectedMenuId, useYn : true, created : '', modified : '' },
			{ parentRowKey : parentMenuRowKey, focus : true }
	);
});

// noinspection JSCheckFunctionSignatures
$("#deleteBtn").click(function () {
	if (grid.getRow(grid.getFocusedCell().rowKey)._children[0] === undefined) {
		grid.removeRow(grid.getFocusedCell().rowKey);
	} else {
		simpleSwalFire('warning', '삭제 실패', "모든 하위 메뉴를 삭제하세요.");
	}
});

$(document).ready(function () {
	// GRID 를 생성한다.
	grid = new tui.Grid(gridOption);

	// 서버에서 응답을 받았을 경우
	// grid 데이터를 reload한다.
	grid.on('response', function (ev) {
		if (isNeedReloadData) {
			grid.reloadData();
		}
		isNeedReloadData = false;
	});

});