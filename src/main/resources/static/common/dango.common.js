class CommonUtil {
	constructor() {}

	/**
	 * 클래스 유형 상수
	 */
	static classType = {
		FUNCTION : "Function",
		OBJECT : "Object",
		ARRAY : "Array",
		NUMBER : "Number",
		BOOLEAN : "Boolean",
		STRING : "String",
	};

	static httpMethod = {
		GET : "GET",
		POST : "POST",
		PUT : "PUT",
		DELETE : "DELETE",
	};

	static defaultHeader = {
		"Content-type" : "application/json",
	};

	static deepCopy = (obj) => {
		if (obj === null || typeof obj !== "object") {
			return obj;
		}
		// 객체인지 배열인지 판단
		const copy = Array.isArray(obj) ? [] : {};

		for (let key of Object.keys(obj)) {
			copy[key] = CommonUtil.deepCopy(obj[key]);
		}

		return copy;
	};

	static getHeader = () => {
		let headerObj = CommonUtil.deepCopy(CommonUtil.defaultHeader);
		const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;
		// csrf 값 설정
		headerObj[`${csrfHeader}`] = document.querySelector("meta[name='_csrf']").content;

		return headerObj;
	};

	/**
	 * 파라미터로 전달받은 값의 자료형을 반환한다.
	 * @param obj 검사대상
	 */
	static getClassType = (obj) => {
		return Object.prototype.toString.call(obj).slice(8, -1);
	};

	static #callServer = async (method, path, body = {}, headers = {}) => {
		let targetUrl = path;
		let headerObj = Object.assign(CommonUtil.getHeader(), headers);
		let options = {
			method : method,
			header : headerObj,
		};

		if (CommonUtil.httpMethod.GET === method) {
			targetUrl += Object.entries(body).map(e => e.join('=')).join('&');
		} else {
			options.body = JSON.stringify(body);
		}

		const res = await fetch(`${targetUrl}`, options);
		const data = await res.json();

		if (res.ok) {
			return data;
		} else {
			throw Error(data);
		}
	};

	static get = (path, body = {}, headers = {}) => {
		return CommonUtil.#callServer(CommonUtil.httpMethod.GET, path, body, headers);
	};

	static post = (path, body = {}, headers = {}) => {
		return CommonUtil.#callServer(CommonUtil.httpMethod.POST, path, body, headers);
	};

	static put = (path, body = {}, headers = {}) => {
		return CommonUtil.#callServer(CommonUtil.httpMethod.PUT, path, body, headers);
	};

	static delete = (path, body = {}, headers = {}) => {
		return CommonUtil.#callServer(CommonUtil.httpMethod.DELETE, path, body, headers);
	};

	static deepFreeze = (obj) => {
		const propNames = Object.getOwnPropertyNames(obj);

		propNames.forEach(propName => {
			if (obj[propName] && typeof obj[propName] === "object") {
				CommonUtil.deepFreeze(obj[propName]);
			}
		});

		return Object.freeze(obj);
	};
}

CommonUtil.deepFreeze(CommonUtil);