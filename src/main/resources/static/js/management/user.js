const gridMgr = new DangoGridManager('/api/user/', 'grid');
let grid;

$(document).ready(() => {
	const ipValidationRegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|\*)|localhost$/;

	gridMgr.columnList = [
		{header : '아이디', name : 'userId', editor : 'text', validation : {required : true}},
		{
			header : '비밀번호',
			name : 'userPassword',
			editor : 'password',
			formatter : () => '●●●●●●●●●●●',
			validation : {
				validatorFn : (value) => {
					return StringUtil.isNotEmpty(value) && value.length >= 4;
				},
			},
		},
		{
			header : '닉네임',
			name : 'nickname',
			editor : 'text',
			filter : {type : 'text', showApplyBtn : true, showClearBtn : true, operator : 'OR'},
			validation : {required : true},
		},
		{header : '권한', name : 'email', editor : 'text', validation : {required : true}},
		{header : '권한', name : 'userRole', editor : 'text', validation : {required : true}},
		{header : '비밀번호 변경일시', name : 'passwordModifiedAt', defaultValue : '', formatter : toDateFormatter},
		{header : '생성자', name : 'createUser'},
		{header : '생성일시', name : 'createDate', defaultValue : '', formatter : toDateFormatter},
		{header : '수정자', name : 'modifyUser'},
		{header : '수정일시', name : 'modifyDate', defaultValue : '', formatter : toDateFormatter},
	];

	// 사용자 ID 수정 불가처리
	gridMgr.disableColumnList = 'userId';

	// GRID 를 생성한다.
	grid = gridMgr.initGrid();

	// Grid의 모든 데이터가 변경되고 Grid가 DOM에 렌더링 된 후
	// 'loginType'이 'LDAP'인 row는 'password' cell을 disable 한다.
	gridMgr.setGridEventHandler('onGridUpdated', () => {
		for (let index = 0 ; index < grid.getRowCount() ; index++) {
			if (grid.getData()[index].loginType) { gridMgr.disableColumn('password', index); }
		}
	});

	// noinspection JSCheckFunctionSignatures
	$('#readBtn').on('click', () => {
		gridMgr.refresh();
	});

	// noinspection JSCheckFunctionSignatures
	$('#appendBtn').on('click', () => {
		let rowData = gridMgr.addRow();

		grid.enableCell(rowData.rowKey, 'userId');
	});

	// noinspection JSCheckFunctionSignatures
	$('#updateBtn').on('click', () => {
		gridMgr.save();
	});

	// noinspection JSCheckFunctionSignatures
	$('#deleteBtn').on('click', () => {
		if (grid.getFocusedCell() && grid.getFocusedCell().rowKey) {
			grid.removeRow(grid.getFocusedCell().rowKey);
			gridMgr.save();
		} else {
			simpleSwalFire("warning", "데이터 확인 필요", "삭제할 사용자를 선택하세요.");
		}
	});
});