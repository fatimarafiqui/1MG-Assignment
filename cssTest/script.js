const validateForm = () => {
	let email = document.forms["loginForm"]["email"];
	let password = document.forms["loginForm"]["password"];
	let emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
	let errorFound = false;

	if (emailRegex.test(email.value) == false) {
		email.parentNode.classList.add("error");
		errorFound = true;
	} else {
		email.parentNode.classList.remove("error");
	}

	if (passwordRegex.test(password.value) == false) {
		password.parentNode.classList.add("error");
		errorFound = true;
	} else {
		password.parentNode.classList.remove("error");
	}

	if (errorFound) {
		return false;
	}
	return true;
}