// 그리드 객체
let roleInfoGrid;
let roleMenuGrid;

let roleCode = 'empty';
let deleteRoleInfoGridRoleCode = 'empty';

// reloadData를 컨트롤 하기위한 변수
let isNeedReloadData = false

// 메뉴 아이디 노출 값 설정
const getMenuName = function(info) {
	// noinspection EqualityComparisonWithCoercionJS
	let menuName = info.value ? info.value : info.row.menuId
	// roleMenuGrid 에 row 생성할 때는 ''을 반환한다.
	if (menuName === null) {
		return '선택';
	}
	return menuList.find(rowData => rowData.value == menuName).text;
}

const roleInfoGridSaveData = function (grid) {
	const {rowKey, columnName} = grid.getFocusedCell();
	console.log(grid.getModifiedRows({}));
	let updatedRows = grid.getModifiedRows({}).updatedRows;
	let createdRows = grid.getModifiedRows({}).createdRows;
	let deletedRows = grid.getModifiedRows({}).deletedRows;

	let needCheckRows = [];

	// 사용자 생성 시 검증
	for (let index = 0 ; index < createdRows.length ; index++) {

		// 권한 코드, 권한 명칭 검증
		if (createdRows[index].roleCode === null
		    || createdRows[index].roleCode === ''
		    || createdRows[index].roleName === null
		    || createdRows[index].roleName === ''
		) {
			needCheckRows.push(createdRows[index].rowKey);
		}
	}

	// 사용자 수정 시 검증
	for (let index = 0 ; index < updatedRows.length ; index++) {

		// 권한 코드, 권한 명칭 검증
		if (updatedRows[index].roleName === '') {
			needCheckRows.push(updatedRows[index].rowKey);
		}
	}

	// 모든 데이터가 정상일 경우 db 업데이트 실행,
	// needCheckRows가 배열이면서 값이 존재하는 경우 비정상적인 데이터가 있다고 판단, alert을 노출한 뒤 문제가 있는 row를 select한다.
	if (needCheckRows && Array.isArray(needCheckRows) && needCheckRows.length === 0) {
		// 변경이 일어난 row 객체
		let modifiedRows = grid.getModifiedRows();
		// 삭제된 row의 roleCode
		let deletedRowRoleCode = modifiedRows.deletedRows[0];
		// delete url path 에 입력할 데이터
		deleteRoleInfoGridRoleCode = deletedRowRoleCode === undefined ? 'empty' : deletedRowRoleCode.roleCode;
		// 그리드 데이터 업데이트 진행
		dataUpdate(grid, modifiedRows);
	} else {
		// 데이터 업데이트 실패
		dataUpdateFail(grid, needCheckRows);
	}
};

const roleMenuGridSaveData = function (grid) {
	const {rowKey, columnName} = grid.getFocusedCell();
	// 저장될 grid 데이터 임시 저장
	let currentData = grid.getData();
	// grid 내 전체 데이터 삭제
	grid.getData().forEach((obj) => grid.removeRow(obj.rowKey));
	// 저장될 grid 데이터를 grid에 추가하여 createdRow로 인식하게 함
	currentData.forEach((obj) => grid.appendRow({roleCode : obj.roleCode, menuId : obj.menuId}));

	let createdRows = grid.getModifiedRows({}).createdRows;

	let needCheckRows = [];

	// 권한 별 메뉴 설정 시 중복되는 메뉴가 없을 경우 데이터 변경 진행
	if (roleMenuGrid.validate().length === 0) {
		// 권한 별 메뉴 생성 시 검증
		for (let index = 0 ; index < createdRows.length ; index++) {
			// 메뉴 명칭 검증
			if (createdRows[index].menuId === null || createdRows[index].menuId === '') {
				needCheckRows.push(createdRows[index].rowKey);
			}
		}

		// 모든 데이터가 정상일 경우 db 업데이트 실행,
		// needCheckRows가 배열이면서 값이 존재하는 경우 비정상적인 데이터가 있다고 판단, alert을 노출한 뒤 문제가 있는 row를 select한다.
		if (needCheckRows && Array.isArray(needCheckRows) && needCheckRows.length === 0) {
			// 변경이 일어난 row 객체
			let modifiedRows = grid.getModifiedRows();
			// 그리드 데이터 업데이트 진행
			dataUpdate(grid, modifiedRows, false);
		} else {
			// 데이터 업데이트 실패
			dataUpdateFail(grid, needCheckRows);
		}
	} else {
		simpleSwalFire('warning', '중복 데이터 확인 필요', '중복된 데이터를 확인하세요.');
	}
};

// grid 사이즈 재조정
const gridRefreshLayout = function() {
	window.setTimeout(function () {
		roleInfoGrid.refreshLayout();
		roleMenuGrid.refreshLayout();
	}, 350);
}

// 권한 정보 데이터소스 정의
const roleInfoDataSource = {
	contentType : 'application/json',
	api : {
		readData : {
			url : '/api/auth/role/info',
			method : 'GET'
		},
		createData : {
			url : '/api/auth/role/info',
			method : 'POST'
		},
		updateData : {
			url : '/api/auth/role/info',
			method : 'PUT'
		},
		deleteData : {
			url : () => '/api/auth/role/info/' + deleteRoleInfoGridRoleCode,
			method : 'DELETE'
		}
	}
};

// 권한 별 메뉴 데이터소스 정의
const roleMenuDataSource = {
	contentType : 'application/json',
	api : {
		readData : {
			url : () => '/api/auth/role/menu/' + roleCode,
			method : 'GET'
		},
		createData : {
			url : '/api/auth/role/menu',
			method : 'POST'
		}
	}
};

const roleInfoGridOption = {
	el : document.getElementById('roleInfoGrid'),
	scrollY : true,
	bodyHeight : "fitToParent",
	data : roleInfoDataSource,
	contextMenu: null,
	columnOptions : {
		resizable : true
	},
	showDummyRows : true,
	copyOptions: {
		customValue: null
	},
	columns : [
		{
			header : '권한 코드',
			name : 'roleCode',
			editor : 'text'
		},
		{
			header : '권한 명칭',
			name : 'roleName',
			editor : 'text'
		},
		{
			header : '권한 사용 여부',
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

const roleMenuGridOption = {
	el : document.getElementById('roleMenuGrid'),
	scrollY : true,
	bodyHeight : "fitToParent",
	data : roleMenuDataSource,
	contextMenu: null,
	columnOptions : {
		resizable : true
	},
	showDummyRows : true,
	copyOptions: {
		customValue: null
	},
	columns : [
		{
			header : '권한 코드',
			name : 'roleCode',
			hidden : true,
			editor : 'text'
		},
		{
			header : '메뉴 아이디',
			name : 'menuId',
			formatter : getMenuName,
			editor : {
				type : 'select',
				options : {
					listItems : menuList
				}
			},
			validation : {
				unique: true
			}
		}
	]
};

// 데이터 저장 로직의 분기처리가 필요한 경우가 있어 핸들러를 통해 해당 메서드를 호출한다.
function saveDataHandler(grid, gridName) {
	if (gridName === 'roleInfoGrid') {
		roleInfoGridSaveData(grid);
	} else if (gridName === 'roleMenuGrid') {
		roleMenuGridSaveData(grid);
	}
}

// 기본적으로 비활성화된 버튼 활성화
function ableButton() {
	$("#readRoleMenuBtn").attr("disabled", false);
	$("#appendRoleMenuBtn").attr("disabled", false);
	$("#deleteRoleMenuBtn").attr("disabled", false);
	$("#updateRoleMenuBtn").attr("disabled", false);
}

// noinspection JSCheckFunctionSignatures
$("#readRoleInfoBtn").click(function () {
	roleInfoGrid.reloadData();
});

// noinspection JSCheckFunctionSignatures
$("#appendRoleInfoBtn").click(function () {
	roleInfoGrid.prependRow({useYn : true},{extendPrevRowSpan : true, focus : true});
	roleInfoGrid.enableCell(roleInfoGrid.getRowCount() - 1, 'roleCode');
});

// noinspection JSCheckFunctionSignatures
$("#deleteRoleInfoBtn").click(function () {
	roleInfoGrid.removeRow(roleInfoGrid.getFocusedCell().rowKey);
});

// noinspection JSCheckFunctionSignatures
$("#updateRoleInfoBtn").click(function () {
	roleInfoGrid.finishEditing();
	if (!onClickSaveBtn(roleInfoGrid, 'roleInfoGrid')) { return; }
	isNeedReloadData = true;
});

// noinspection JSCheckFunctionSignatures
$("#readRoleMenuBtn").click(function () {
	roleMenuGrid.reloadData();
});

// noinspection JSCheckFunctionSignatures
$("#appendRoleMenuBtn").click(function () {
	roleMenuGrid.prependRow({roleCode : roleCode},{extendPrevRowSpan : true, focus : true});
});

// noinspection JSCheckFunctionSignatures
$("#deleteRoleMenuBtn").click(function () {
	roleMenuGrid.removeRow(roleMenuGrid.getFocusedCell().rowKey);
});

// noinspection JSCheckFunctionSignatures
$("#updateRoleMenuBtn").click(function () {
	roleMenuGrid.finishEditing();
	if (!onClickSaveBtn(roleMenuGrid, 'roleMenuGrid')) { return; }
	isNeedReloadData = true;
});

$(document).ready(function () {
	// GRID 를 생성한다.
	roleInfoGrid = new tui.Grid(roleInfoGridOption);
	roleMenuGrid = new tui.Grid(roleMenuGridOption);

	// userId를 disable 한다.
	roleInfoGrid.disableColumn('roleCode');

	// 서버에서 응답을 받았을 경우
	// grid 데이터를 reload한다.
	roleInfoGrid.on('response', function (ev) {
		if (isNeedReloadData) {
			roleInfoGrid.reloadData();
		}
		isNeedReloadData = false;
	});

	roleInfoGrid.on('click', (ev) => {
		if (ev.rowKey !== null && ev.rowKey !== undefined && roleInfoGrid.getRow(ev.rowKey).roleCode) {
			roleCode = roleInfoGrid.getRow(ev.rowKey).roleCode;

			roleMenuGrid.dataProvider.readData(1, { 'roleCode' : roleCode });
			// roleMenuGrid 상단 버튼 활성화
			ableButton();
		}
	})

	roleMenuGrid.on('response', function (ev) {
		if (isNeedReloadData) {
			roleMenuGrid.reloadData();
		}
		isNeedReloadData = false;
	});
});