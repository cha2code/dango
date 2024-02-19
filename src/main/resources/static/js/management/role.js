const gridMgr = new DangoGridManager('/api/role/', 'grid');
const menuGridMgr = new DangoGridManager('/api/role/menu', 'menuGrid');

let grid;
let menuGrid;

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

$(document).ready(() => {
    gridMgr.columnList = [
        {
            header : '권한 코드',
            name : 'roleCode',
            editor : 'text',
            validation : {required : true}
        },
        {
            header : '권한 명칭',
            name : 'roleName',
            editor : 'text',
            validation : {required : true}
        },
        {
            header : '메모',
            name : 'memo',
            editor : 'text'
        },
        {header : '생성자', name : 'createUser', hidden:false},
        {header : '생성일시', name : 'createDate', hidden:false, defaultValue : '', formatter : toDateFormatter},
        {header : '수정자', name : 'modifyUser', hidden:false},
        {header : '수정일시', name : 'modifyDate', hidden:false, defaultValue : '', formatter : toDateFormatter}
    ];

    // 사용자 ID 수정 불가처리
    gridMgr.disableColumnList = "roleCode";

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

    menuGridMgr.columnList = [
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
                    listItems : []
                }
            },
            validation : {
                unique: true
            }
        }
    ];

    menuGridMgr.disableColumnList = "roleCode";

    menuGridMgr.isInitialRequest = false;

    menuGrid = menuGridMgr.initGrid();

    // noinspection JSCheckFunctionSignatures
    $('#readRoleInfoBtn').on('click', () => {
        gridMgr.refresh();
    });

    // noinspection JSCheckFunctionSignatures
    $('#appendRoleInfoBtn').on('click', () => {
        let rowData = gridMgr.addRow();

        grid.enableCell(rowData.rowKey, 'userName');
    });

    // noinspection JSCheckFunctionSignatures
    $('#updateRoleInfoBtn').on('click', () => {
        gridMgr.save();
    });

    // noinspection JSCheckFunctionSignatures
    $('#deleteRoleInfoBtn').on('click', () => {
        if (grid.getFocusedCell() && grid.getFocusedCell().rowKey >= 0) {
            grid.removeRow(grid.getFocusedCell().rowKey);
            gridMgr.save();
        } else {
            simpleSwalFire("warning", "데이터 확인 필요", "삭제할 권한을 선택하세요.");
        }
    });
});