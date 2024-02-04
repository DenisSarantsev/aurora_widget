	// // Сбор данных с формы отправки заявки
	// const nameFormInput = document.querySelector(".post-request-vacancy-form__name-input"); // Инпут формы для ввода имени
	// const ageFormInput = document.querySelector(".post-request-vacancy-form__age-input"); // Инпут формы для ввода возраста
	// const genderRadioInputs = document.querySelectorAll(".post-request-vacancy-form__gender-label"); // Радио кнопки для выбора пола (label)
	// let actualGenderRadioInput = ""; // Актуальний вибранный инпут, который будет отправляться на бэк
	// const aboutMeFormTextaea = document.querySelector(".post-request-vacancy-form__about-me-input"); // Текстареа для ввода информации о себе
	// const wishFormTextarea = document.querySelector(".post-request-vacancy-form__wish-input"); // Текстареа для ввода пожеланий
	// // const requestButton = document.querySelector(".post-request-vacancy-page__request-button"); // Кнопка для отправки данных на бэк

	// const allFormInputs = document.querySelectorAll(".js-form-input"); // Все инпуты
	// for ( let item of allFormInputs ) {
	// 	item.addEventListener("change", ()=> {
	// 		writeInputDataToRequestData(item);
	// 	})
	// }

	// // Переменные для отправки данных на бэк
	// let dataName = "";
	// let dataAge = "";
	// let dataAboutSelf = "";
	// let dataGender = "неважливо";
	// let dataWish = "";
	// let dataKind = "склад";
	// let dataTitle = "Назва вакансії";

	// // Функция для записи данных в переменные, для отправки данных на бэк
	// const writeInputDataToRequestData = (input) => {
	// 	if ( input.getAttribute("type") === "text" ) {
	// 		if ( input.classList.contains('post-request-vacancy-form__age-input') ) {
	// 			validateAgeInput(input)
	// 		} else {
	// 			if ( input.classList.contains('post-request-vacancy-form__name-input') ) {
	// 				dataName = validateTextInput(input);
	// 			} else if ( input.classList.contains('post-request-vacancy-form__about-me-input') ) {
	// 				dataAboutSelf = validateTextInput(input);
	// 			} else if ( input.classList.contains('post-request-vacancy-form__wish-input') ) {
	// 				dataWish = validateTextInput(input);
	// 			}
	// 		}
	// 	} else if ( input.getAttribute("type" === "radio" ) ) {
	// 		if ( input.classList.contains('post-request-vacancy-form__gender-radio') ) {
	// 			dataGender = input.id;
	// 		}
	// 	}
	// }

	// // Функция для валидации инпута с возрастом
	// const validateAgeInput = (input) => {
	// 	let inputValue = input.value;
	// 	let inputValueErrorsCounter = 0;
	// 	for (let i = 0; i < inputValue.length; i++ ) {
	// 		if ( !/\d/.test(inputValue[i]) ) {
	// 			inputValueErrorsCounter++
	// 		}
	// 	}
	// 	if ( inputValueErrorsCounter === 0 && inputValue < 100 && inputValue > 17 ) {
	// 		makeBorderGreen(input);
	// 		dataAge = inputValue;
	// 	} else {
	// 		makeBorderRed(input);
	// 	}
	// }

	// // Функция для валидации текстового инпута
	// const validateTextInput = (input) => {
	// 	let inputValue = input.value;
	// 	if ( inputValue.length > 9 && inputValue.length < 1000 ) {
	// 		makeBorderGreen(input);
	// 		return inputValue;
	// 	} else {
	// 		makeBorderRed(input);
	// 	}
	// }

	// // Функция, которая делает обводку окна красной и убирает зеленую (при неправильно введенных данных)
	// const makeBorderRed = (input) => {
	// 	input.classList.remove("green-border");
	// 	input.classList.add("red-border");
	// }
	// // Функция, которая делает обводку окна зеленой и убирает красную (при правильно введенных данных)
	// const makeBorderGreen = (input) => {
	// 	input.classList.remove("red-border");
	// 	input.classList.add("green-border");
	// }

	// requestButton.addEventListener("click", () => {
	// 	fetchPostData(dataName, dataAge, dataAboutSelf, dataGender, dataWish, dataKind, dataTitle, currentVacancyID);
	// })


	// // Отправка заявки на вакансию с анкетой кандидата (вызывается при клике на кнопку)
	// function fetchPostData(dataName, dataAge, dataAboutSelf, dataGender, dataWish, dataKind, dataTitle, currentVacancyID) {
	// const apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/${currentVacancyID}`;
	// const dataRequest = {
	// 	'telegram_id': currentTelegramID,
	// 	'name': dataName,
	// 	'age': dataAge,
	// 	'about_self': dataAboutSelf,
	// 	'gender': dataGender,
	// 	'wish': dataWish,
	// 	'kind': dataKind,
	// 	'title': dataTitle,
	// };

	// // Данные POST запроса
	// const requestOptions = {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	},
	// 	body: JSON.stringify(dataRequest) // Перетворюємо дані у JSON-рядок
	// };

	// // Відправляємо POST-запит за допомогою Fetch API
	// fetch(apiPostDataURL, requestOptions)
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}
	// 		return response.json(); // Перетворюємо отриману відповідь у JSON
	// 	})
	// 	.then(data => {
	// 		console.log('Отримано дані від сервера:', data);
	// 	})
	// 	.catch(error => {
	// 		console.error('Помилка під час виконання POST-запиту:', error);
	// 	});
	// }