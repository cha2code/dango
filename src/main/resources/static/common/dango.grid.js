/**
 * NHN Tui 그리드를 초기화 하기 위해 사용하는 라이브러리
 * @since 2023.08.14.
 * @author hys
 */
// noinspection JSUnusedGlobalSymbols,SpellCheckingInspection,JSUnusedLocalSymbols
class DangoGridManager {
    get perPageSize() {
        return this.#perPageSize;
    }

    set perPageSize(value) {
        this.#perPageSize = value;
    }

    get isPaging() {
        return this.#isPaging;
    }

    set isPaging(value) {
        this.#isPaging = value;
    }

    get columnHeaderSize() {
        return this.#columnHeaderSize;
    }

    set columnHeaderSize(value) {
        if (CommonUtil.getClassType(value) === CommonUtil.classType.NUMBER) {
            this.#columnHeaderSize = value;
        } else {
            console.error("허용되지 않은 유형의 파라미터입니다.");
        }
    }

    get complexColumnList() {
        return this.#complexColumnList;
    }

    set complexColumnList(value) {
        if (CommonUtil.getClassType(value) === CommonUtil.classType.ARRAY) {
            this.#complexColumnList = value;
        } else if (CommonUtil.getClassType(value) === CommonUtil.classType.OBJECT) {
            this.#complexColumnList.push(value);
        } else {
            console.error("허용되지 않은 유형의 파라미터입니다.");
        }
    }

    get isInitialRequest() {
        return this.#isInitialRequest;
    }

    set isInitialRequest(value) {
        this.#isInitialRequest = value;
    }

    get onRequestHandler() {
        return this.#onRequestHandler;
    }

    set onRequestHandler(value) {
        this.#onRequestHandler = value;
    }

    get disableColumnList() {
        return this.#disableColumnList;
    }

    set disableColumnList(value) {
        if (StringUtil.isString(value)) {
            this.#disableColumnList.push(value);
        } else if (value instanceof Array) {
            this.#disableColumnList = value;
        }
    }

    get onBeforeRequestHandler() {
        return this.isFunction(this.#onBeforeRequestHandler) ? this.#onBeforeRequestHandler : this.#defaultValidator;
    }

    set onBeforeRequestHandler(value) {
        this.#onBeforeRequestHandler = value;
    }

    get onCommonResponseHandler() {
        return this.#onCommonResponseHandler;
    }

    set onCommonResponseHandler(value) {
        this.#onCommonResponseHandler = value;
    }

    get onSuccessHandler() {
        return this.isFunction(this.#onSuccessHandler) ? this.#onSuccessHandler : this.#defaultSuccessHandler;
    }

    set onSuccessHandler(value) {
        this.#onSuccessHandler = value;
    }

    get onFailHandler() {
        return this.isFunction(this.#onFailHandler) ? this.#onFailHandler : this.#defaultFailHandler;
    }

    set onFailHandler(value) {
        this.#onFailHandler = value;
    }

    get onErrorHandler() {
        return this.isFunction(this.#onFailHandler) ? this.#onErrorHandler : this.#defaultFailHandler;
    }

    set onErrorHandler(value) {
        this.#onErrorHandler = value;
    }

    get onUncheckHandler() {
        return this.#onUncheckHandler;
    }

    set onUncheckHandler(value) {
        this.#onUncheckHandler = value;
    }

    get onCheckHandler() {
        return this.#onCheckHandler;
    }

    set onCheckHandler(value) {
        this.#onCheckHandler = value;
    }

    get isDebug() {
        return this.#isDebug;
    }

    set isDebug(value) {
        this.#isDebug = value;
    }

    get onDblClickHandler() {
        return this.#onDblClickHandler;
    }

    set onDblClickHandler(value) {
        this.#onDblClickHandler = value;
    }

    get onSingleClickHandler() {
        return this.#onSingleClickHandler;
    }

    set onSingleClickHandler(value) {
        this.#onSingleClickHandler = value;
    }

    get columnList() {
        return this.#columnList;
    }

    set columnList(value) {
        if (value instanceof Array) {
            this.#columnList = value;
        } else if (StringUtil.isString(value)) {
            try {
                this.#columnList = JSON.parse(value);
            } catch (e) {
                console.error(e);
                throw "컬럼 리스트 설정간 에러가 발생하였습니다.";
            }
        } else {
            throw "컬럼 리스트에는 배열값만 설정할 수 있습니다.";
        }
    }

    get isInit() {
        return this.#isInit;
    }

    set isInit(value) {
        throw "초기화 여부는 직접 설정할 수 없습니다.";
    }

    get dataSource() {
        return this.#dataSource;
    }

    set dataSource(value) {
        throw "DataSource는 직접 설정할 수 없습니다.";
    }

    get domId() {
        return this.#domId;
    }

    set domId(id) {
        if (this.isInit) {
            throw "Grid가 생성된 경우 DOM ID를 교체할 수 없습니다.";
        } else {
            this.#domId = id;
        }
    }

    get commonUrl() {
        return this.#commonUrl;
    }

    set commonUrl(value) {
        if (StringUtil.isString(value)) {
            this.#commonUrl = value;
        } else {
            throw "URL은 문자열만 설정할 수 있습니다.";
        }
    }

    set readDataUrl(source) {
        this.#readDataUrl = source;
    };

    set createDataUrl(url) {
        this.#createDataUrl = url;
    };

    set modifyDataUrl(url) {
        this.#modifyDataUrl = url;
    }

    set updateDataUrl(url) {
        this.#updateDataUrl = url;
    };

    set deleteDataUrl(url) {
        this.#deleteDataUrl = url;
    };

    get readDataUrl() {
        if (this.isFunction(this.#readDataUrl)) {
            return this.#readDataUrl();
        } else {
            return StringUtil.getOrDefault(this.#readDataUrl, this.#commonUrl);
        }
    };

    get createDataUrl() {
        if (this.isFunction(this.#createDataUrl)) {
            return this.#createDataUrl();
        } else {
            return StringUtil.getOrDefault(this.#createDataUrl, this.#commonUrl);
        }
    };

    get modifyDataUrl() {
        if (this.isFunction(this.#modifyDataUrl)) {
            return this.#modifyDataUrl();
        } else {
            return StringUtil.getOrDefault(this.#modifyDataUrl, this.#commonUrl);
        }
    }

    get updateDataUrl() {
        if (this.isFunction(this.#updateDataUrl)) {
            return this.#updateDataUrl();
        } else {
            return StringUtil.getOrDefault(this.#updateDataUrl, this.#commonUrl);
        }
    };

    get deleteDataUrl() {
        if (this.isFunction(this.#deleteDataUrl)) {
            return this.#deleteDataUrl();
        } else {
            return StringUtil.getOrDefault(this.#deleteDataUrl, this.#commonUrl);
        }
    };

    get deleteRowIds() {
        return this.#deleteRowIds.filter(Boolean).join(this.#deleteIdSplitter);
    }

    get deleteRowIdsOrigin() {
        return this.#deleteRowIds;
    }

    set deleteRowIds(value) {
        if (Array.isArray(value)) {
            this.#deleteRowIds = value;
        } else {
            this.#deleteRowIds.push(value);
        }
    }

    get option() {
        return this.#option;
    }

    set option(value) {
        this.#option = value;
    }

    get grid() {
        return this.#grid;
    }

    set grid(value) {
        this.#grid = value;
    }

    get deleteIdSplitter() {
        return this.#deleteIdSplitter;
    }

    set deleteIdSplitter(value) {
        if (StringUtil.isNotEmpty(value)) {
            this.#deleteIdSplitter = value;
        }
    }

    /** TUI Grid Object*/
    #grid;

    /** 그리드가 생성될 DOM의 ID, 필수값 */
    #domId;
    /** TUI Grid Option, 필수값 */
    #option;

    /** TUI Grid에 노출할 Column List, 필수값 */
    #columnList = [];

    #complexColumnList = [];

    #disableColumnList = [];

    #columnHeaderSize = 40;

    /** CRUD가 진행될 Endpoint URL, 필수값 */
    #commonUrl;
    /** 데이터 조회시 사용되는 Endpoint URL, Optional */
    #readDataUrl;
    /** 데이터 생성시 사용되는 Endpoint URL, Optional */
    #createDataUrl;
    /** 데이터 생성, 수정, 삭제를 동시에 처리할 때 사용되는 Endpoint URL, Optional */
    #modifyDataUrl;
    /** 데이터 수정시 사용되는 Endpoint URL, Optional */
    #updateDataUrl;
    /** 데이터 삭제시 사용되는 Endpoint URL, Optional */
    #deleteDataUrl;

    /** 삭제할 데이터 id 리스트 */
    #deleteRowIds = [""];
    /** 삭제할 데이터 id를 구분하는 spliiter, 기본값은 콤마(,)*/
    #deleteIdSplitter = ",";

    /** TUI GRID 초기화 여부 */
    #isInit = false;
    /** Debug 출력 여부 */
    #isDebug = false;
    /** Data Pagination 처리 여부*/
    #isPaging = false;
    /** Pagination 처리시 한 페이지에서 노출할 사이즈값 */
    #perPageSize = 10;

    /** Grid 초기화 직후 데이터 조회 여부, 기본값 : true */
    #isInitialRequest = true;

    /** Row를 클릭했을때 실행시킬 Function */
    #onSingleClickHandler = null;
    /** Row를 더블클릭했을때 실행시킬 Function */
    #onDblClickHandler = null;

    /** Row의 checkbox(Tui grid 자체 checkbox)를 체크했을때 실행할 Function */
    #onCheckHandler = null;
    /** Row의 checkbox(Tui grid 자체 checkbox)를 체크해제했을때 실행할 Function */
    #onUncheckHandler = null;

    /**
     * 서버로 요청을 보내기 전 실행할 Function
     */
    #onBeforeRequestHandler = null;
    /** 서버로 요청을 발송하기 위해 실행하는 Function */
    #onRequestHandler = null;
    /** 서버에서 받은 응답값의 성공/실패에 관계 없이 응답을 받은경우 실행할 Function */
    #onCommonResponseHandler = null;
    /** 서버에서 받은 응답값중 response.result가 true인 경우 실행할 Function */
    #onSuccessHandler = null;
    /** 서버에서 받은 응답값중 response.result가 fail인 경우 실행할 Function */
    #onFailHandler = null;
    /** 서버에서 받은 응답이 오류인 경우 실행할 Function */
    #onErrorHandler = null;

    /** Grid Datasource 이용시 사용되는 옵션값 */
    #dataSource = {
        contentType: "application/json",
        initialRequest: true,
        api: {
            readData: {
                url: () => this.readDataUrl,
                method: "GET",
            },
            createData: {
                url: () => this.createDataUrl,
                method: "POST",
                showConfirm: false,
            },
            modifyData: {
                url: () => this.modifyDataUrl,
                method: "PUT",
                showConfirm: false,
            },
            updateData: {
                url: () => this.updateDataUrl,
                method: "PATCH",
                showConfirm: false,
            },
            deleteData: {
                url: () => this.deleteDataUrl,
                method: "DELETE",
                showConfirm: false,
            },
        },
    };

    constructor(endpointUrl, domId) {
        if (StringUtil.isEmpty(endpointUrl)) {
            throw "CRUD를 진행할 Endpoint url을 입력해주세요.";
        } else {
            let dataUrl = endpointUrl.toString();

            if (dataUrl.lastIndexOf("/") !== (dataUrl.length - 1)) {
                dataUrl += "/";
            }

            this.commonUrl = dataUrl;
        }

        if (StringUtil.isNotEmpty(domId)) {
            this.domId = domId;
        }

        CommonUtil.deepFreeze(this);
    }

    #defaultValidator = (ev) => {
        let gridData = this.grid.getModifiedRows();
        // noinspection JSUnresolvedReference
        if (gridData.createdRows.length || gridData.updatedRows.length || gridData.deletedRows.length) {
            let invalidRows = this.grid.validate();

            if (invalidRows.length) {
                ev.stop();

                invalidRows = invalidRows.sort((a, b) => {
                    return a.rowKey > b.rowKey ? 1 : (a.rowKey === b.rowKey ? 0 : -1);
                });

                let rowIndex = this.grid.getIndexOfRow(invalidRows[0].rowKey);
                let colIndex = this.grid.getIndexOfColumn(invalidRows[0].errors[0].columnName);

                this.grid.setSelectionRange({
                    "start": [rowIndex, colIndex],
                    "end": [rowIndex, colIndex],
                });
                this.grid.focusAt(rowIndex, colIndex);

                simpleSwalFire("warning", "데이터 확인 필요", "데이터 검증에 실패하였습니다.");
            }
        }
    };

    #defaultSuccessHandler = (ev) => {

        if (ev && ev.xhr && ev.xhr.response) {
            try {
                let result = JSON.parse(ev.xhr.response);

                // 데이터 조회의 경우, event.xhr.response.data에 데이터가 존재하므로 해당 경우가 아니면 데이터 저장으로 보고 alert 생성
                if (!result.data) {
                    simpleSwalFire("success", "저장!", "성공적으로 저장하였습니다.");
                    this.refresh();
                }
            } catch (ex) {
            }
        }
    };

    #defaultFailHandler = (ev) => {
        simpleSwalFire("error", "통신 실패", "작업이 정상적으로 실행되지 않았습니다.");
    };

    #defaultLoggingHandler = (ev) => {
        console.log(this.grid.getRow(ev.rowKey));
    };

    getDefaultOption() {
        return {
            scrollY: true,
            bodyHeight: "fitToParent",
            minBodyHeight: 200,
            contextMenu: null,
            columnOptions: {
                resizable: true,
            },
            showDummyRows: true,
            copyOptions: {
                customValue: null,
            },
        };
    }

    initGrid(initOption) {
        if (StringUtil.isEmpty(this.domId)) {
            throw "Grid가 생성될 DOM의 ID값이 설정되지 않았습니다.";
        } else if (!document.getElementById(this.domId)) {
            throw "Grid가 생성될 DOM이 존재하지 않습니다.";
        } else if (this.columnList.length < 1) {
            throw "컬럼정보가 설정되지 않았습니다.";
        } else {
            if (initOption === null || initOption === undefined) {
                initOption = this.getDefaultOption();

                initOption.data = this.dataSource;
                initOption.el = document.getElementById(this.domId);
                initOption.columns = this.columnList;

                if (Array.isArray(this.complexColumnList) && this.complexColumnList.length > 0) {
                    initOption.header = {
                        height: this.columnHeaderSize,
                        complexColumns: this.complexColumnList,
                    };
                }

                if (this.isPaging) {
                    initOption.pageOptions = {useClient: false, perPage: this.perPageSize};
                }

            } else {
                if (!initOption.hasOwnProperty("el") && this.domId) {
                    initOption.el = document.getElementById(this.domId);
                }
                if (!initOption.hasOwnProperty("data")) {
                    initOption.data = this.dataSource;
                }

                initOption.columns = this.columnList;
            }

            initOption.data.initialRequest = this.isInitialRequest;

            if (initOption.hasOwnProperty("data")
                && initOption.hasOwnProperty("el")
                && initOption.hasOwnProperty("columns")) {
                this.grid = new tui.Grid(initOption);

                this.option = initOption;
                this.#isInit = true;

                // disable 한다.

                if (this.disableColumnList.length > 0) {
                    this.disableColumnList.forEach((key) => {
                        this.grid.disableColumn(key);
                    });
                }

                this.#setHandlerEvent();
            } else {
                throw "Grid 생성간 필요한 필수값들이 설정되지 않았습니다.";
            }
        }

        return this.grid;
    }

    refreshLayout(delay) {
        window.setTimeout(() => this.grid.refreshLayout(), delay || 350);
    }

    refresh(isSetKeepEnable = false) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        this.grid.clearModifiedData(undefined);
        this.grid.reloadData();

        if (!isSetKeepEnable) {
            this.refreshDisableColumns();
        }
    }

    enableColumn(columnName, rowKey) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        } else if (StringUtil.isEmpty(columnName)) {
            throw "활성화할 컬럼 명칭이 입력되지 않았습니다.";
        }

        if (StringUtil.isEmpty(rowKey)) {
            this.grid.enableColumn(columnName);
        } else {
            this.grid.enableCell(rowKey, columnName);
        }
    }

    disableColumn(columnName, rowKey) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        } else if (StringUtil.isEmpty(columnName)) {
            throw "비활성화할 컬럼 명칭이 입력되지 않았습니다.";
        }

        if (StringUtil.isEmpty(rowKey)) {
            this.grid.disableColumn(columnName);
        } else {
            this.grid.disableCell(rowKey, columnName);
        }
    }

    refreshDisableColumns() {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        this.disableColumnList.forEach((key) => {
            for (let index = 0; index < this.grid.getRowCount(); index++) {
                this.grid.disableCell(index, key);
            }
        });
    }

    /**
     * Grid에 Event별 callback 함수를 바인딩한다.
     * @param eventName Grid에서 발생시키는 이벤트
     * @param func 이벤트 발생시 실행할 함수
     * @returns {boolean} 바인딩 여부
     */
    setGridEventHandler(eventName, func) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        if (StringUtil.isNotEmpty(eventName) && func instanceof Function) {
            this.grid.on(eventName, func);

            return true;
        }

        return false;
    }

    /**
     * Grid가 초기화된 뒤 사전에 설정된 Event별 Function을 바인딩한다.
     */
    #setHandlerEvent() {
        this.setGridEventHandler("beforeRequest", this.onBeforeRequestHandler);
        this.setGridEventHandler("response", this.onCommonResponseHandler);
        this.setGridEventHandler("successResponse", (ev) => {
            if (this.deleteRowIds.length > 0) {
                this.deleteRowIds = [];
            }

            this.onSuccessHandler(ev);
        });
        this.setGridEventHandler("failResponse", this.onFailHandler);
        this.setGridEventHandler("errorResponse", this.onErrorHandler);

        if (this.isFunction(this.onSingleClickHandler)) {
            this.grid.on("click", this.onSingleClickHandler);
        } else {
            if (this.isDebug) {
                this.grid.on("click", this.#defaultLoggingHandler);
            }
        }

        if (this.isFunction(this.onDblClickHandler)) {
            this.grid.on("dblclick", this.onDblClickHandler);
        } else {
            if (this.isDebug) {
                this.grid.on("dblclick", this.#defaultLoggingHandler);
            }
        }

        if (this.isFunction(this.onCheckHandler)) {
            this.grid.on("check", this.onCheckHandler);
        } else {
            if (this.isDebug) {
                this.grid.on("check", this.#defaultLoggingHandler);
            }
        }

        if (this.isFunction(this.onUncheckHandler)) {
            this.grid.on("uncheck", this.onUncheckHandler);
        } else {
            if (this.isDebug) {
                this.grid.on("uncheck", this.#defaultLoggingHandler);
            }
        }
    }

    isFunction(value) {
        return (value instanceof Function);
    }

    clear() {
        this.grid.clearModifiedData(undefined);
    }

    findRow(condition) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        let findResults = this.grid.findRows(condition);

        return findResults.length > 1 ? findResults : findResults[0];
    }

    getTotalRow() {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        return this.grid.getData();
    }

    getRow(rowKey) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        return this.grid.getRow(rowKey);
    }

    getSelectedRow() {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        return grid.getRow(grid.getFocusedCell().rowKey);
    }

    getRowByIndex(index) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        return this.grid.getRowAt(index);
    }

    getRowCount() {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        return this.grid.getRowCount();
    }

    addRow(isPrepend = true, option = {focus: true, extendPrevRowSpan: true}) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        }

        let newRowIndex;

        if (isPrepend) {
            this.grid.prependRow({}, option);
            newRowIndex = 0;

            return this.getRowByIndex(newRowIndex);
        } else {
            this.grid.appendRow({}, option);
            newRowIndex = this.grid.getRowCount() - 1;

            if (newRowIndex >= 0) {
                return this.getRowByIndex(newRowIndex);
            } else {
                return undefined;
            }
        }
    }

    removeRow(row) {
        if (!this.isInit) {
            throw "Grid가 초기화되지 않았습니다.";
        } else if (row === null || row === undefined) {
            throw "삭제할 Row 데이터가 입력되지 않았습니다.";
        } else {
            let targetKey = "";
            let deletedRow;

            if (StringUtil.isString(row) || (typeof row).toLowerCase() === "number") {
                targetKey = row;
                deletedRow = this.getRow(row.rowKey);
            } else {
                if (StringUtil.isEmpty(row.rowKey)) {
                    throw "삭제할 Row Key값을 찾을 수 없습니다. 데이터를 확인해주세요.";
                }

                targetKey = row.rowKey;
                deletedRow = row;
            }

            this.deleteRowIds = targetKey;
            this.grid.removeRow(targetKey);

            return deletedRow;
        }
    }

    save() {
        this.grid.finishEditing();

        let gridData = this.grid.getModifiedRows();

        let saveTypeMsg = "";

        // noinspection JSUnresolvedReference
        if (gridData.createdRows.length) {
            saveTypeMsg = StringUtil.appendString(saveTypeMsg, "추가", ", ");
        }

        // noinspection JSUnresolvedReference
        if (gridData.updatedRows.length) {
            saveTypeMsg = StringUtil.appendString(saveTypeMsg, "수정", ", ");
        }

        // noinspection JSUnresolvedReference
        if (gridData.deletedRows.length) {
            saveTypeMsg = StringUtil.appendString(saveTypeMsg, "삭제", ", ");
        }

        if (StringUtil.isNotEmpty(saveTypeMsg)) {
            Swal.fire({
                title: "데이터 변경",
                text: saveTypeMsg + "된 데이터가 존재합니다. 저장하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonText: "취소",
                cancelButtonColor: "#d33",
                confirmButtonText: "저장",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.grid.request("modifyData", {showConfirm: false});
                }
            });
        } else {
            simpleSwalFire("warning", "데이터 확인 필요", "변경된 데이터가 없습니다.");
        }
    }
}