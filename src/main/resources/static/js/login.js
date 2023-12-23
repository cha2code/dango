// ID 검증 (영문/_/- 가능)
const inputUserId = $("#username");

inputUserId.focusout(function() {
	if (RegExp(/^[A-Za-z0-9_\-]{1,20}$/).test(inputUserId.val())) {
		inputUserId.css("border", "1px solid #ced4da");
	} else {
		inputUserId.css("border", "1px solid #dc3545");
	}
});

// 비밀번호 검증 (4자리 이상)
const inputPasswd = $("#password");

inputPasswd.focusout(function() {
	if (inputPasswd.val().length >= 4) {
		inputPasswd.css("border", "1px solid #ced4da");
	} else {
		inputPasswd.css("border", "1px solid #dc3545");
	}
});