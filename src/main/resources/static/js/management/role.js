const gridMgr = new DangoGridManager('/api/role', 'grid');

let grid;

$(document).ready(() => {
    gridMgr.columnList = [
        {
            header : '권한 코드',
            name : 'roleCode',
            editor : 'text',
            validation : {required : true}
        },
        {
            header : '권한 이름',
            name : 'roleName',
            editor : 'text',
            validation : {required : true},
        },
        {
            header : '비고',
            name : 'memo',
            editor: 'text'
        },
        {header : '생성자', name : 'createUser', hidden:false},
        {header : '생성일시', name : 'createDate', hidden:false, defaultValue : '', formatter : toDateFormatter},
        {header : '수정자', name : 'modifyUser', hidden:false},
        {header : '수정일시', name : 'modifyDate', hidden:false, defaultValue : '', formatter : toDateFormatter},
    ];

    // 권한 코드 수정 불가처리
    gridMgr.disableColumnList = 'roleCode';

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
            simpleSwalFire("warning", "데이터 확인 필요", "삭제할 권한을 선택하세요.");
        }
    });
});