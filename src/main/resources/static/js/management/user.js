const gridMgr = new DangoGridManager('/api/user/', 'grid');

let grid;

$(document).ready(() => {
	gridMgr.columnList = [
		{header : '아이디', name : 'userName', editor : 'text', validation : {required : true}},
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
		{header : '이메일', name : 'email', editor : 'text', validation : {required : true}},
		{
			header : '권한',
			name : 'userRole',
			formatter: 'listItemText',
			align : "center",
			editor: {
				type: 'select',
				options: {
					listItems: authList
				}
			},
			validation : {required : true}},
		{header : '비밀번호 변경일시', name : 'passwordModifiedAt', defaultValue : '', formatter : toDateFormatter},
		{header : '생성자', name : 'createUser', hidden:false},
		{header : '생성일시', name : 'createDate', hidden:false, defaultValue : '', formatter : toDateFormatter},
		{header : '수정자', name : 'modifyUser', hidden:false},
		{header : '수정일시', name : 'modifyDate', hidden:false, defaultValue : '', formatter : toDateFormatter},
	];

	// 사용자 ID 수정 불가처리
	gridMgr.disableColumnList = 'userName';

	gridMgr.readDataUrl = () => {
		let searchUrl = gridMgr.commonUrl;

		let searchValue = $("#searchKeyword").val();

		if (searchValue !== null && searchValue !== undefined && searchValue !== "") {
			searchUrl += "?keyword=" + searchValue;
		}

		return searchUrl;
	};

	gridMgr.isPaging = true;

	// GRID 를 생성한다.
	grid = gridMgr.initGrid();

	// noinspection JSCheckFunctionSignatures
	$('#readBtn').on('click', () => {
		gridMgr.refresh();
	});

	// noinspection JSCheckFunctionSignatures
	$('#appendBtn').on('click', () => {
		let rowData = gridMgr.addRow();

		grid.enableCell(rowData.rowKey, 'userName');
	});

	// noinspection JSCheckFunctionSignatures
	$('#updateBtn').on('click', () => {
		gridMgr.save();
	});

	// noinspection JSCheckFunctionSignatures
	$('#deleteBtn').on('click', () => {
		if (grid.getFocusedCell() && grid.getFocusedCell().rowKey >= 0) {
			grid.removeRow(grid.getFocusedCell().rowKey);
			gridMgr.save();
		} else {
			simpleSwalFire("warning", "데이터 확인 필요", "삭제할 사용자를 선택하세요.");
		}
	});
});