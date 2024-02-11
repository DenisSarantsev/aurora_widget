// Вешаем событие на кнопку редактирования заявки в личном кабинете
// const addListenerToEditButtonInUserCabinet = () => {
// 	document.querySelector(".cabinet-page__edit-button").addEventListener("click", () => {
// 		document.querySelector(".cabinet-page__edit-button").classList.toggle("blocked");
// 		blockOrUnblockFieldsInUserCabinet();
// 		changeImageAndTextOnEditButton();
// 	})
// }

// Блокировка/разблокировка полей при клике на кнопку "Редактировать" в личном кабинете
// const blockOrUnblockFieldsInUserCabinet = () => {
// 	const allCabinetFields = document.querySelectorAll(".cabinet-page__item-value");
// 	if ( document.querySelector(".cabinet-page__edit-button").classList.contains("blocked") ) {
// 		for ( let item of allCabinetFields ) {
// 			item.disabled = true;
// 			item.classList.remove("cabinet-page__yellow-input-border");
// 		}
// 		changeImageAndTextOnEditButton();
// 		writeNewDataToMainObjectWhenUserEditFieldsInCabinet();
// 	} else {
// 		for ( let item of allCabinetFields ) {
// 			item.disabled = false;
// 			item.classList.add("cabinet-page__yellow-input-border");
// 		}
// 		changeImageAndTextOnEditButton();
// 	}
// }

// Замена картинки и надписи на кнопке редактирования
// const changeImageAndTextOnEditButton = () => {
// 	if ( document.querySelector(".cabinet-page__edit-button").classList.contains("blocked") ) {
// 		document.querySelector(".edit-button-text").innerHTML = "Редагувати";
// 		document.querySelector(".save-image").classList.remove("_hidden-edit-or-save-button");
// 		document.querySelector(".edit-image").classList.remove("_hidden-edit-or-save-button");
// 		document.querySelector(".save-image").classList.add("_hidden-edit-or-save-button");
// 	} else {
// 		document.querySelector(".edit-button-text").innerHTML = "Зберегти";
// 		document.querySelector(".save-image").classList.remove("_hidden-edit-or-save-button");
// 		document.querySelector(".edit-image").classList.remove("_hidden-edit-or-save-button");
// 		document.querySelector(".edit-image").classList.add("_hidden-edit-or-save-button");
// 	}
// }

// Перезапись заявки в случае изменений контента в полях на странице кабинета
// const writeNewDataToMainObjectWhenUserEditFieldsInCabinet = () => {
// 	document.querySelector(".cabinet-page__edit-button").addEventListener("click", () => {
// 		if ( document.querySelector(".cabinet-page__edit-button").classList.contains("blocked") ) {
// 			console.log(currentVacancyID);
// 			fetchPostData(postVacancyObject, currentVacancyID);
// 		}
// 	})
// }

// Сбор актуальных (записанных на сервере) вопросов и ответов пользователя и добавление их в главный обьект
// Нужно сделать сбор записанных на сервере вопросов и написать функцию для перезаписи ответов при редактровании в кабинете
// const searchAdditionalQuestionsAndAnswers = (data) => {
// 	const allObjectKeys = Object.keys(data.cabinet);
// 	const allAdditionalQuestionsNames = [];
// 	for ( let i = 0; i < Object.keys(data.cabinet).length; i++ ) {
// 		let currentObjectName = allObjectKeys[i];
// 		if ( currentObjectName[0] === "q" && currentObjectName.length === 2 ) {
// 			allAdditionalQuestionsNames.push(currentObjectName);
// 		}
// 	}
// 	for ( let i = 0; i < allAdditionalQuestionsNames.length; i++ ) {
// 		let questionName = allAdditionalQuestionsNames[i];
// 		postVacancyObject[questionName] = data.cabinet[questionName];
// 	}
// }

// const writeNewDataToAdditionalQuestionsInMainObject = () => {
// 		const allAdditionalFields = document.querySelectorAll(".cabinet-page__item-value");
// 		for ( let item of allAdditionalFields ) {
// 			item.addEventListener("keyup", () => {
// 				postVacancyObject.name = document.querySelector(".cabinet-page__item-value-name").value;
// 				postVacancyObject.feedback_phone = document.querySelector(".cabinet-page__item-value-phone").value;
// 				postVacancyObject.city = document.querySelector(".cabinet-page__item-value-city").value;
// 				postVacancyObject.birthday = document.querySelector(".cabinet-page__item-value-birthday").value;
// 			})
// 		}
// }