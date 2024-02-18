const gridMgr = new DangoGridManager('/api/menu/', 'grid');
let grid;

$(document).ready(function () {
    let gridOption = gridMgr.getDefaultOption();

    gridOption.treeColumnOptions = {
        name: 'menuName',
        useIcon: true,
        useCascadingCheckbox: true
    };

    gridMgr.columnList = [
        {
            header: '메뉴 순번',
            name: 'menuSeq',
            editor: 'text',
            hidden: true
        },
        {
            header: '부모 메뉴 순번',
            name: 'parentMenu',
            editor: 'text',
            hidden: true
        },
        {
            header: '메뉴이름',
            name: 'menuName',
            editor: 'text',
            validation: {required: true}
        },
        {
            header: '경로',
            name: 'menuUrl',
            editor: 'text',
            validation: {required: true}
        },
        {
            header: '정렬순서',
            name: 'menuSort',
            editor: 'text'
        },
        {
            header: '메뉴 사용여부',
            name: 'used',
            editor: {
                type: 'select',
                options: {
                    listItems: [
                        {text: '사용', value: true},
                        {text: '미사용', value: false}
                    ]
                }
            },
            formatter: (rowData) => onChangeFlag("useYn", rowData.value)
        },
        {
            header: '생성자',
            name: 'createUserName'
        },
        {
            header: '생성일시',
            name: 'created',
            formatter: toDateFormatter
        },
        {
            header: '수정자',
            name: 'modifyUserName'
        },
        {
            header: '수정일시',
            name: 'modified',
            formatter: toDateFormatter
        }
    ];

    gridMgr.deleteDataUrl = () => {
        return gridMgr.commonUrl + grid.getModifiedRows().deletedRows[0].menuId;
    }

    gridMgr.isPaging = false;

    // GRID 를 생성한다.
    grid = gridMgr.initGrid(gridOption);


// noinspection JSCheckFunctionSignatures
    $("#updateBtn").click(function () {
        gridMgr.save();
    });

// noinspection JSCheckFunctionSignatures
    $("#readBtn").click(function () {
        gridMgr.refresh();
    });

// noinspection JSCheckFunctionSignatures
    $("#appendBtn").on("click", () => {
        // 현재 선택된 데이터의 값 조회
        const selectedRow = gridMgr.getSelectedRow();
        // 부모 메뉴의 순번
        let parentMenuData = null;

        // 선택된 데이터가 있는 경우 해당 데이터의 부모값 탐색하여 취득
        if (selectedRow?.parentMenu !== undefined) {
            parentMenuData = gridMgr.findRow({menuSeq: selectedRow.parentMenu});
        }

        // 부모 값이 존재하는 경우 처리
        if (parentMenuData !== undefined && parentMenuData !== null) {
            grid.expand(parentMenuData?.rowKey);
        }

        let parentRowKey = parentMenuData?.rowKey;

        if (parentRowKey === undefined) {
            parentRowKey = null;
        }

        grid.appendTreeRow(
            {parentMenu: parentMenuData?.menuSeq || '', used: true, created: '', modified: ''},
            {parentRowKey: parentRowKey, focus: true}
        );
    });

// noinspection JSCheckFunctionSignatures
    $("#deleteBtn").click(function () {
        if (grid.getRow(grid.getFocusedCell().rowKey)._children[0] === undefined) {
            grid.removeRow(grid.getFocusedCell().rowKey);
            gridMgr.save();
        } else {
            simpleSwalFire('warning', '삭제 실패', "모든 하위 메뉴를 삭제하세요.");
        }
    });
});