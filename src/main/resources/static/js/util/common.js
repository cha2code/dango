$(document).on('shown.lte.pushmenu', () => {
	try {
		if (gridMgr) {
			gridMgr.refreshLayout();
		} else if (grid) {
			window.setTimeout(function () {
				grid.refreshLayout();
			}, 350);
		}
	} catch(ex) {
		gridRefreshLayout();
	}
});

$(document).on('collapsed.lte.pushmenu', () => {
	try {
		if (gridMgr) {
			gridMgr.refreshLayout();
		} else if (grid) {
			window.setTimeout(function () {
				grid.refreshLayout();
			}, 350);
		}
	} catch(ex) {
		gridRefreshLayout();
	}
});

// 화면 크기 변동 시 grid 사이즈 재조정
window.onresize = () => {
	try {
		if (gridMgr) {
			gridMgr.refreshLayout();
		} else if (grid) {
			window.setTimeout(function () {
				grid.refreshLayout();
			}, 350);
		}
	} catch(ex) {
		gridRefreshLayout();
	}
};

// 기본 SwalFire Alert 생성
const simpleSwalFire = (icon, title, text) => {
	Swal.fire({
		icon : icon,
		title : title,
		text : text,
	});
};

const COMMON_FLAG = {
	'password' : {target : 'row.loginType', trueValue : '미사용', falseValue : '●●●●●●●●●●●'},
	'useYn' : {trueValue : '사용', falseValue : '미사용'},
	'isComplete' : {trueValue : '완료', falseValue : '미완료'},
};

Object.freeze(COMMON_FLAG);

const onChangeFlag = (type, value) => {
	if (StringUtil.isNotEmpty(type)) {
		return customFormatter(JSON.parse(value), COMMON_FLAG[type].trueValue, COMMON_FLAG[type].falseValue);
	}

	throw 'Flag 처리 오류.';
};

const customFormatter = (value, trueValue, falseValue) => {
	try {
		return value === true ? trueValue : falseValue;
	} catch (ex) {
		console.error('data 가 정상적이지 않습니다.');
		return '-';
	}
};

// noinspection JSUnusedGlobalSymbols
const toDateFormatter = (objData) => {
	if (StringUtil.isNotEmpty(objData.value)) {
		return toDateTimeFormatter(objData).split(' ')[0];
	} else {
		return '';
	}
};

// noinspection JSUnusedGlobalSymbols
const toTimeFormatter = (objData) => {
	if (StringUtil.isNotEmpty(objData.value)) {
		return toDateTimeFormatter(objData).split(' ')[1];
	} else {
		return '';
	}
};

// noinspection JSUnusedGlobalSymbols
const toDateTimeFormatter = (objData) => {
	if (StringUtil.isNotEmpty(objData.value)) {
		return objData.value.replace('T', ' ');
	} else {
		return '';
	}
};

const onClickSaveBtn = function(grid, gridName) {
	let gridData = grid.getModifiedRows();

	let saveTypeMsg = '';

	if (gridData.createdRows && gridData.createdRows.length > 0) {
		saveTypeMsg += '추가';
	}
	if (gridData.updatedRows && gridData.updatedRows.length > 0) {
		saveTypeMsg += (saveTypeMsg ? ', ' : '') + '수정';
	}
	if (gridData.deletedRows && gridData.deletedRows.length > 0) {
		saveTypeMsg += (saveTypeMsg ? ', ' : '') + '삭제';
	}

	if (saveTypeMsg !== '') {
		Swal.fire({
			title : '데이터 변경',
			text : saveTypeMsg + '된 데이터가 존재합니다. 저장하시겠습니까?',
			icon : 'warning',
			showCancelButton : true,
			confirmButtonColor : '#3085d6',
			cancelButtonColor : '#d33',
			confirmButtonText : '저장',
		}).then((result) => {
			if (result.isConfirmed) {
				simpleSwalFire('success', '저장!', '성공적으로 저장하였습니다.');
				saveDataHandler(grid, gridName);
			}
		});
		return true;
	} else {
		simpleSwalFire('warning', '데이터 확인 필요', '변경된 데이터가 없습니다.');
		return false;
	}
};

// 해당 그리드 row 생성, 수정, 삭제를 처리하는 로직
const dataUpdate = (grid, modifiedRows, deleteFlag = true) => {
	if (modifiedRows.createdRows && modifiedRows.createdRows.length > 0) {
		grid.request('createData', {
			showConfirm : false,
		});
	}

	if (modifiedRows.updatedRows && modifiedRows.updatedRows.length > 0) {
		grid.request('updateData', {
			modifiedOnly : true,
			showConfirm : false,
		});
	}

	if (modifiedRows.deletedRows && modifiedRows.deletedRows.length > 0 && deleteFlag) {
		// 삭제할 권한코드를 취득하여 deleteData 에 넘긴다.
		grid.clearModifiedData('DELETE');
		grid.request('deleteData', {
			showConfirm : false,
		});
	}
};

// modifyData 를 사용하여 api 하나에서 create, update, delete 작업을 모두 한다.
const dataUpdateAllInOne = (grid) => {
	grid.request('modifyData', {
		showConfirm : false,
	});
};

// 데이터 입력을 다시 해야하는 row 중 가장 위에 있는 row 데이터를 반환한다.
const getNeedCheckRow = (grid, checkRow) => {
	let rowIndexList = [];

	checkRow.forEach((rowKey) => {
		rowIndexList.push(grid.getIndexOfRow(rowKey));
	});
	// rowKey 정렬
	rowIndexList = rowIndexList.sort((a, b) => {
		return a > b ? 1 : (a === b ? 0 : -1);
	});
	// 가장 먼저 생성된 데이터부터 선택한다.
	return rowIndexList[0];
};

// 데이터 업데이트 실패 시 처리할 로직
const dataUpdateFail = (grid, needCheckRows, msg = '입력하신 데이터를 확인하세요.') => {
	simpleSwalFire('warning', '데이터 확인 필요', msg);

	let targetIndex = getNeedCheckRow(grid, needCheckRows);

	grid.setSelectionRange({
		'start' : [targetIndex, grid.getColumns().length - 1],
		'end' : [targetIndex, 0],
	});
};
