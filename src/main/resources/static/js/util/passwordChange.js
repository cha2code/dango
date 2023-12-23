// 비밀번호 변경 팝업 html
const pwdChangeHtml =
    `<div>
			<table>
				<tbody>
					<tr>
						<td style="vertical-align: bottom;text-align: end;">
							<label for="currentPw">현재 비밀번호</label>
						</td>
						<td>
							<input id="currentPw" class="swal2-input" type="password" onfocusout="validateInput(this.id)">
						</td>
					</tr>
					<tr>
						<td style="vertical-align: bottom;text-align: end;">
							<label for="newPw">새 비밀번호</label>
						</td>
						<td>
							<input id="newPw" class="swal2-input" type="password" onfocusout="validateInput(this.id)">
						</td>
					</tr>
					<tr>
						<td style="vertical-align: bottom;text-align: end;">
							<label for="newPwCheck">새 비밀번호 확인</label>
						</td>
						<td>
							<input id="newPwCheck" class="swal2-input" type="password" onfocusout="validateInput(this.id)">
						</td>
					</tr>
				</tbody>
			</table>
		</div>`;

const pwdChangePopupInfo = {
    title: "비밀번호 변경",
    html: pwdChangeHtml,
    focusConfirm: false,
    allowOutsideClick: false,
    showCancelButton: true,
    preConfirm: () => {
        const currentPw = document.getElementById("currentPw").value;
        const newPw = document.getElementById("newPw").value;
        const newPwCheck = document.getElementById("newPwCheck").value;

        if (currentPw.length < 4 || newPw.length < 4 || newPwCheck.length < 4) {
            Swal.showValidationMessage(`비밀번호는 4자리 이상이어야 합니다.`);
        } else {
            return passwordValidation(currentPw, newPw, newPwCheck);
        }
    },
};

// 비밀번호 정규식에 부합하지 않을 경우 input 창에 error를 표시해준다.
const validateInput = (id) => {
    const targetDom = document.getElementById(id);
    const targetClass = "swal2-inputerror";

    if (targetDom.value.length < 4) {
        targetDom.classList.add(targetClass);
    } else {
        targetDom.classList.remove(targetClass);
    }
};

const passwordValidation = (currentPw, newPw, newPwCheck) => {
    const headerObj = {"Content-type": "application/json"};

    // csrf 토큰 설정
    /*
        const csrfHeader = document.querySelector('meta[name="_csrf_header"]').content;
        headerObj[csrfHeader] = document.querySelector('meta[name="_csrf"]').content;
    */
    let returnValue = false;

    CommonUtil.put("/api/user/password", {"newPw": newPw}, headerObj)
        .then((res) => {
            if (res.result === true && res.code === "7000") {
                returnValue = res.message;
            } else {
                Swal.showValidationMessage(res.message);
            }
        })
        .catch(() => {
            Swal.fire({icon: "error", title: "통신 실패", text: "작업이 정상적으로 실행되지 않았습니다."});
            console.log("통신 실패");
        });

    return returnValue;
};

// 비밀번호 변경 팝업 실행
const executePwChange = async () => {
    const {value: formValues} = await Swal.fire(pwdChangePopupInfo);

    if (formValues !== undefined) {
        Swal.fire({
            icon: "success",
            title: "성공",
            text: formValues,
        });
    }
};