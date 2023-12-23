// noinspection JSUnusedGlobalSymbols
class StringUtil {
	static isEmpty(source) {
		return source === null || source === undefined || source === "" || source.replaceAll(' ', '').length === 0;
	}

	static isNotEmpty(source) {
		return !StringUtil.isEmpty(source);
	}

	static trim(source) {
		if (StringUtil.isNotEmpty(source)) {
			return source.toString().trim();
		}
	}

	static innerTrim(source) {
		if (StringUtil.isNotEmpty(source)) {
			return source.toString().replaceAll(" ", "");
		}
	}

	static getOrDefault(source, defaultValue) {
		return StringUtil.isEmpty(source ) ? defaultValue : source;
	}

	static camelToUnder(source) {
		if (StringUtil.isNotEmpty(source)) {
			return source.toString().replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
		}
	}

	static underToCamel(source) {
		if (StringUtil.isNotEmpty(source)) {
			return source.toString().replace(/(_[a-z])/g, function($1){return $1.toUpperCase().replace('_','');});
		}
	}

	static isString(source) {
		return StringUtil.isNotEmpty(source) && (typeof source).toLowerCase() === 'string';
	}

	static appendString(source, append, splitter) {
		return StringUtil.isEmpty(source) ? append : source + StringUtil.getOrDefault(splitter, ",") + append;
	}
	static isBoolean(source) {
		try {
			return StringUtil.isNotEmpty(source) && (JSON.parse(source.toString().toLowerCase()) || ['true', 'false'].indexOf(source.toString().toLowerCase()) >= 0);
		} finally {}

		return false;
	}
}

CommonUtil.deepFreeze(StringUtil);