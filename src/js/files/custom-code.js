
document.addEventListener("DOMContentLoaded", () => {
let data = {
	'title': 'АврорА',
	'cabinet': '',
	'first_name': "Денис",
	'phone_number': '+380675478881',
	'telegram_id': 210325718,
	'password': "5777ef8c7a3f5c32bf2a85814352bc763d063712287a142087225d8a8367f7784b5eb193814fc801eb68",
	'content': 'Хочеш стати частиною команди Аврори? Я маю для тебе кілька вакансій',
	'visit_website': false,
}

let currentOrder = data.cabinet;
let currentContent = data.content;
let currentUserName = data.first_name;
let currentTelegramID = data.telegram_id;
let currentPassword = data.password;
let currentUserPhone = data.phone_number;
let actualHost = "https://avrora-web.fly.dev";
let currentTemplateID = "home-page"; // Изначальное значение домашняя страница. Впоследствии перезаписывается при переходах между страницами
let firstEnter = true;
let currentVacancyID = ""; // Актуальный id вакансии (последняя вакансия, на которую зашел человек). Записывается при клике на кнопку вакансии и используется для отправки POST запроса
let currentVacancyTitle = "";
let globalVacancies; // Глобальная переменная для всех вакансий
let currentVacancyKind; // Глобальная переменная, в которую записываем вид вакансии при клике на него
const successfullMessage = "Ваша заявка успішно надіслана. Ми зв'яжемося з вами, як тільки наші спеціалісти її розглянуть. Перевірити статус заявки, відредагувати або видалити її ви можете у вашому профілі";
const errorMessage = "Нажаль сталась помилка під час відправки заявки. Спробуйте ще раз, або зв'яжіться з нами по телефону";

// Добавляем текст на главную страницу:
// Заголовок:
const homePageTitleElement = document.querySelector(".home-page__title");
const homePageTitleText = `Привіт, ${currentUserName}! `;
homePageTitleElement.insertAdjacentText("afterbegin", `${homePageTitleText}`);
// Подзаголовок:
const homePageSubtitleElement = document.querySelector(".home-page__subtitle");
homePageSubtitleElement.insertAdjacentHTML("beforeend", `${currentContent}`);

// Скрываем футер на главной странице
const allButtons = document.querySelectorAll(".button");
const footerElement = document.querySelector(".footer");
function hiddenOrShowFooter() {
	if ( currentTemplateID === "home-page" ) {
		footerElement.classList.add("animation-hidden-footer")
		setTimeout(function() {
			footerElement.classList.add("_hidden");
			footerElement.classList.remove("animation-hidden-footer")
		}, 490);
	} else {
		setTimeout(function() {
			footerElement.classList.remove("_hidden");
			footerElement.classList.add("animation-show-footer");
			setTimeout(function() {
				footerElement.classList.remove("animation-show-footer");
			}, 490);
		}, 300);
		
	}
}
hiddenOrShowFooter();

// При клике на кнопку "На головну" перезагружаем весь сайт
const footerButtonToHome = document.querySelector(".footer__button-main-link");
footerButtonToHome.addEventListener("click", () => {
	window.location.reload();
	firstEnter = true;
	currentTemplateID = "home-page";
})

// Прокрутка страницы в самый верх
function scrollToTop() {
	function delayedFunction() {
		document.querySelector(".page").classList.add("overflow-y-scroll");
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // Плавная анимация (поддерживается не всеми браузерами)
		});
		document.querySelector(".page").classList.remove("overflow-y-scroll");
	}
	setTimeout(delayedFunction, 300);
}

// Добавляем полупрозрачный белый фон на блок page при открытии шаблона chat\
const mainPageContainer = document.querySelector(".page");
function addWhiteBackground(button) {
	let itemID = removeDigitsAndUnderscore(button.id);
	if ( itemID === "post-request-vacancy-page" ) {
		mainPageContainer.classList.add("white-background");
	} else {
		mainPageContainer.classList.remove("white-background");
	}
}

// Проходимся по всем кнопкам с роутами, чтобы повесить на них событие клика и при необходимости включить функцию переключения шаблона
const addListenerToAllRouteButtons = () => {
	if (document.querySelector(".route-button")) {
		// Находим все кнопки с роутами
		const allRouteButtons = document.querySelectorAll(".route-button");
		// Вешаем события на все кнопки с роутами в виджете
		for ( let item of allRouteButtons ) {
			// Отменяем всплытие и задаем событие при клике на дочерние элементы
			item.addEventListener("click", (e) => {
				currentTemplateID = removeDigitsAndUnderscore(e.target.id);
				firstEnter = false;
				includeCurrentTemplate(currentTemplateID);
				addWhiteBackground(item);
				hiddenOrShowFooter();
				scrollToTop();
			})
		}
	}
}
addListenerToAllRouteButtons();


// Функция удаления префикса из ID
function removeDigitsAndUnderscore(inputString) {
	var resultString = inputString.replace(/[0-9_]/g, '');
	return resultString;
}

// Находим все шаблоны
const allWidgetTemplates = document.querySelectorAll(".page-template");
// Функция для включения нужного шаблона (выполняется по клике кнопки роута)
const includeCurrentTemplate = (currentTemplateID) => {
	for ( let item of allWidgetTemplates ) {
		if ( item.id !== currentTemplateID && !firstEnter ) { 
			item.classList.add("position-left");
			setTimeout(function() {
				item.classList.add("_hidden-template");
				item.classList.remove("position-left");
			}, 290);
		} else if ( item.id === currentTemplateID && !firstEnter ) {
			setTimeout(function() {
				item.classList.add("position-right");
				item.classList.remove("_hidden-template");
				setTimeout(function() {
					item.classList.remove("position-right");
				}, 100);
			}, 290);
			
		} else {}
	}
}
includeCurrentTemplate(currentTemplateID);

// Вызов API VACANCIES
let officeVacancies = []; // Масив з офісними вакансіями
let shopVacancies = []; // Масив з вакансіями для магазинів
let stockVacancies = []; // Масив з вакансіями для складу

const officeVacanciesElement = document.querySelector(".jobs-list__office");
const shopVacanciesElement = document.querySelector(".jobs-list__shop");
const stockVacanciesElement = document.querySelector(".jobs-list__stock");

// Запрос для получения всех вакансий
const apiVacanciesUrl = `${actualHost}/vacancies/${data.telegram_id}/${data.password}`;
fetch(apiVacanciesUrl)
.then(response => {
	if (!response.ok) { throw new Error(`Ошибка HTTP: ${response.status}`); }
	return response.json();
})
.then(data => {
	globalVacancies = data; // Добавляем все вакансии в переменную
	// Сортируем вакансии по направлениям (в три разных массива, созданных выше перед вызовом fetch)
	for ( let i = 0; i < globalVacancies.vacancies.length; i++ ) {
		let currentVacancy = globalVacancies.vacancies[i];
		if ( currentVacancy.kind === "офіс" ) {
			officeVacancies.push(currentVacancy);
		} else if ( currentVacancy.kind === "магазин" ) {
			shopVacancies.push(currentVacancy);
		} else if ( currentVacancy.kind === "склад" ) {
			stockVacancies.push(currentVacancy);
		}
	}

	//Вставляем вакансии в соответствующие шаблоны при помощи циклов
	for ( let i = 0; i < officeVacancies.length; i++ ) {
		officeVacanciesElement.insertAdjacentHTML(
			"beforeend", 
			`
				<button id="${i}0_vacancy-page" data-vacancy-id="${officeVacancies[i]._id}" class="button button-effect jobs-list__item">
					<div id="circle"></div>
					<div>${officeVacancies[i].title}</div>
				</button>
			`
		)
	}

	for ( let i = 0; i < shopVacancies.length; i++ ) {
		shopVacanciesElement.insertAdjacentHTML(
			"beforeend", 
			`
				<button id="${i}1_vacancy-page" data-vacancy-id="${shopVacancies[i]._id}" class="button button-effect jobs-list__item">
					<div id="circle"></div>
					<div>${shopVacancies[i].title}</div>
				</button>
			`
		)
	}

	for ( let i = 0; i < stockVacancies.length; i++ ) {
		stockVacanciesElement.insertAdjacentHTML(
			"beforeend", 
			`
				<button id="${i}2_vacancy-page" data-vacancy-id="${stockVacancies[i]._id}" class="button button-effect jobs-list__item">
					<div id="circle"></div>
					<div>${stockVacancies[i].title}</div>
				</button>
			`
		)
	}

	// Проходимся по всем кнопкам вакансий (вне зависимости от направления), и вешаем на них событие клика
	const allJobItemsButtons = document.querySelectorAll(".jobs-list__item");
	for ( let item of allJobItemsButtons ) {
		item.addEventListener("click", function(){
			scrollToTop();
			let vacancyTitle = "";
			let vacancyContent = "";
			// Проходимя по массиву со всеми вакансиями и ищем в нем ту, у которой id такой же, как и у вакансии, по которой мы кликнули
			for ( let i = 0; i < globalVacancies.vacancies.length; i++ ) {
				if ( globalVacancies.vacancies[i]._id === item.getAttribute(`data-vacancy-id`) ) {
					vacancyTitle = globalVacancies.vacancies[i].title;
					vacancyContent = globalVacancies.vacancies[i].description_html;
				}
			}
			// Запускаем функцию включения нужного шаблона по id из кнопки ( предварительно очищаем id от префикса при помощи функции removeDigitsAndUnderscore() )
			includeCurrentTemplate(removeDigitsAndUnderscore(item.id));
			currentVacancyID = item.getAttribute(`data-vacancy-id`);
			console.log(currentVacancyID)
			currentVacancyTitle = item.lastElementChild.textContent;
			// Очищаем шаблон вакансии от предыдущего контента
			document.querySelector(".vacancy-page__title").innerHTML = "";
			document.querySelector(".vacancy-page__content").innerHTML = "";
			// Записываем в шабон вакансии актуальный заголовок и контент
			document.querySelector(".vacancy-page__title").insertAdjacentHTML("afterbegin", `${vacancyTitle}`);
			document.querySelector(".vacancy-page__content").insertAdjacentHTML("afterbegin", `${vacancyContent}`);
			
		})
	}
})
.catch(error => { console.error('Ошибка при выполнении запроса:', error); });

// Работа с data (вставляем актуальное имя)
const headerUserName = document.querySelector(".header__user-name-text");
headerUserName.insertAdjacentText("afterbegin", `${data.first_name}`);


// ------------------------------------------------------------------------------------------------------------ Работа с чатом

// При переходе на страницу с чатом обнуляем все переменные
// Переменные для отправки на бэк
let dataKind = "склад";

let dataName = "";
let dataPhone = currentUserPhone;
let dataCity = "";
let dataBornDate = "";

// Массив с переменными, которым пользователь задает значения в чате:
let postVariablesArray = [dataName, dataPhone, dataCity, dataBornDate,]
// Список ключей обьекта
let objectKeys = ["name", "feedback_phone", "city", "birthday",]

// Формируем обьект для отправки на бэк
const postVacancyObject = {
	'kind': dataKind,
	'name': dataName,
	'feedback_phone': dataPhone,
	'city': dataCity,
	'birthday': dataBornDate,
}


// Счетчики вопросов и ответов
let fixedQuestionsCounter = 4// Фиксированное количество вопросов (переменная не изменяется нигде в коде, а используется для понимания, когда переходить к формированию обьектов из ответов по дополнительным вопросам)
let allQuestionsCounter = 4; // Общее количество вопросов (изначально указываем количество фиксированных вопросов). Считаем именнок количество вопросов, на которые отвечает ппользователь, а не количество данных
let questionsCounter = -1; // Считаем количество заданных пользователю вопросов (по умолчанию -1, так как считаем по индексу)
let answersCounter = -1; // Количество написаннхы пользователем ответов. По счетчику определяем, когда задавать пользователю следующий вопрос

// Вешаем событие клика на кнопки "Откликнуться на вакансию" для того, чтобы запустить цепочку чата
const requestButtonsArray = document.querySelectorAll(".vacancy-page__request-button");
for ( let button of requestButtonsArray ) {
	button.addEventListener("click", () => {
		addQuestionsToChat()
	})
}

// Cписок основных вопросов
const questionsArray = [
	`Добрий день. Будь-ласка, вкажіть ваші ім'я та прізвище:`,
	`Вкажіть актуальний номер телефону для зв'язку:`,
	`Вкажіть місто проживання:`,
	`Вкажіть дату народження:`,
]

// Финальное сообщение после ответа на все вопросы
const finalMessage = "Дякуємо за терпіння! Залишилось перевірити правильність введених даних і можна надсилати заявку)"

// Отримуємо список додаткових питань
let additionalQuestions;
function addQuestionsToChat() {
	fetch(`${actualHost}/forms/${currentTelegramID}/${data.password}`)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		additionalQuestions = data;
		// Добавляем нужное количество свойств в обьект, который отправляется на бэк
		addAdditionalQuestionsToMainPostObject(additionalQuestions, postVacancyObject);
		// Запись дополнительных вопросов в массив с вопросами для проверочной страницы
		addAdditionalQuestionsToMainCheckQuestionsArray(additionalQuestions, checkQuestionsArray);
		// Обработка данных, передача их в общий массив с вопросами
		return addAdditionalQuestionsToMainQuestionsArray(additionalQuestions, questionsArray);
	})
	.then (array => {
		// Активируем функционал последовательного добавления вопросов в чат по мере записи ответов для появления первого вопроса
		addMessagesAfterUserAnswers(array);
	})
	.catch(error => { console.error('Fetch error:', error); });
}

// Функционал последовательного добавления вопросов в чат по мере записи ответов
const addMessagesAfterUserAnswers = (questionsArray) => {
	if ( answersCounter === questionsCounter && questionsArray[questionsCounter+1] !== undefined ) {
		addMessageToChat(questionsArray[questionsCounter+1]);
		questionsCounter++;
	}
}

// -------------------------------------------------------------------------------------------------- Функции валидации в чате

// Удаление всех сообщния об ошибке
const deleteErrorMessagesInChat = () => {
	const allErrorMessages = document.querySelectorAll(".main-error-style__container");
	for ( let item of allErrorMessages ) {
		item.classList.add("_hidden-error-messages");
	}
}


// Валидация имени
const validateName = (value) => {
	if ( value.length <= 3 || value.length > 100 ) {
		return false
	} else {
		return true
	}
}

// Сообщение при неправильно валидации имени
const errorValidateNameMessage = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Неправильно введені дані. Ім'я та прізвище мають містити від 4 до 100 символів</div>
		</div>
	`);
	scrollChatToBottom();
}

// Валидация телефона
const validatePhone = (phone) => {
	let phoneNumber = phone.replaceAll(" ", "");
	let errorsCounter = 0
	let includeSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	includeSymbols.forEach(function(element){
		for ( let i = 0; i < phoneNumber.length; i++ ) {
			if ( phoneNumber[i] === element ) {
				errorsCounter++
			}
		}
	})
	if ( phoneNumber.length < 10 || phoneNumber.length > 30 || errorsCounter !== 10 ) {
		return false
	} else {
		return true
	}
}

// Сообщение при неправильной валидации телефона
const errorValidatePhoneMessage = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Неправильно введені дані. Телефон має містити лише цифри, та мати довжину 10 символів.</div>
		</div>
	`);
	scrollChatToBottom();
}

// Валидация города
const validateCity = (city) => {
	if ( city.length < 2 || city.length > 100 ) {
		return false
	} else {
		return true
	}
}

// Сообщение при неправилной валидации города
const errorValidateCityMessage = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Неправильно введені дані. Назва населеного пункту має містити від 2 до 100 символів</div>
		</div>
	`);
	scrollChatToBottom();
}

// Валидация дня рождения
const validateBirthday = (date) => {
	let formattedDate = formateDate(date);
	if ( formattedDate.length !== 10 || findAge(formattedDate) < 18  || findAge(formattedDate) > 70 ) {
		return false
	} else {
		return true
	}
}
// Форматируем дату рождения
const formateDate = (date) => {
	let parts = date.split("-");
	let formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
	return formattedDate
}
// Рассчитываем возраст
const findAge = (birthdate) => {
	const [day, month, year] = birthdate.split('.');
	const birthDateObj = new Date(`${year}-${month}-${day}`);
	const currentDate = new Date();
	const ageInMillis = currentDate - birthDateObj;
	const ageInYears = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));
	return ageInYears
}

// Сообщение при ошибках валидации даты рождения
const errorValidateBirthday = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Для того, щоб подати заявку вам має бути не менше 18 і не більше 70 років</div>
		</div>
	`);
	scrollChatToBottom();
}

// Валидация ответов на дополнительные вопросы
const validateAdditionalAnswers = (data) => {
	if ( data.length < 10 || data.length > 500 ) {
		return false
	} else {
		return true
	}
}

// Сообщение при ошибках валидации ответов по дополнительным вопросам
const errorValidateAdditionalAnswersMessage = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Неправильно введені дані. Довжина відповіді має бути від 10 до 500 символів</div>
		</div>
	`);
	scrollChatToBottom();
}

// -------------------------------------------------------------------------------------------------- Конец функций валидации в чате

// Получаем инпут для ввода текста, и записываем значение при отправке сообщения и вызываем функцию для вывода нового вопроса в чате
const chatInput = document.querySelector(".post-request-vacancy-page__input");
// При нажатии кнопки Enter текствого инпута
chatInput.addEventListener("keyup", (event) => {
	if ( event.key === "Enter" ) {
		if ( answersCounter === -1 ) {
			validateName(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateNameMessage();
		} else if ( answersCounter === 1 ) {
			validateCity(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateCityMessage();
		} else if ( answersCounter > 2 ) {
			validateAdditionalAnswers(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateAdditionalAnswersMessage();
		}
	}
})
// При клике на стрелочку текстового инпута
const sendMessageButton = document.querySelector(".post-request-vacancy-page__send-message");
sendMessageButton.addEventListener("click", () => {
	if ( answersCounter === -1 ) {
		validateName(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateNameMessage();
	} else if ( answersCounter === 1 ) {
		validateCity(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateCityMessage();
	} else if ( answersCounter > 2 ) {
		validateAdditionalAnswers(chatInput.value) ? addAnswersAndQuestionsToChat() : errorValidateAdditionalAnswersMessage();
	}
})

// Данная функция отвечает за добавление вопросов и ответов в чат, записывает данные в обьект для отправки на бэк и вызывает функицю для перехода к следующей странице после ответа не все вопросы
const addAnswersAndQuestionsToChat = () => {
	if ( questionsCounter+1 <= fixedQuestionsCounter ) {
		postVariablesArray[questionsCounter] = chatInput.value;
		postVacancyObject[objectKeys[questionsCounter]] = postVariablesArray[questionsCounter];
		addUserAnswers(postVariablesArray[questionsCounter]);
		scrollChatToBottom();
		addMessagesAfterUserAnswers(questionsArray);
		addPhoneAnswerBlock();
		addBirthDateAnswerBlock();
	} else if ( questionsCounter+1 > fixedQuestionsCounter && answersCounter < allQuestionsCounter ){
		let currentQuestionKey = `q${(questionsCounter+1)-fixedQuestionsCounter}`;
		let currentAdditionalQuestion = additionalQuestions.forms[`${currentQuestionKey}`];
		postVacancyObject[`${currentQuestionKey}`] = {[currentAdditionalQuestion]: `${chatInput.value}`}
		addUserAnswers(chatInput.value);
		addMessagesAfterUserAnswers(questionsArray)
		checkFinalAnswerMessage();
	}
	chatInput.value = "";
	deleteErrorMessagesInChat();
}

// Проверяем, когда появится вопрос про дату рождения
const addBirthDateAnswerBlock = () => {
	if ( objectKeys[questionsCounter] === "birthday" ) {
		hiddenTextInput()
		function delayedFunction() {
			showCalendarInput()
		}
		setTimeout(delayedFunction, 300);
	} else {}
}

// Вешаем события на инпут даты и кнопку отправки даты
const dateInput = document.querySelector(".post-request-vacancy-page__date-input");
const dateSendButton =  document.querySelector(".post-request-vacancy-page__send-date");
dateSendButton.addEventListener("click", () => {
	if ( validateBirthday(dateInput.value) ) {
		deleteErrorMessagesInChat();
		writeActualBirthDate(dateInput.value);
		addUserMessageToChat(formateDate(dateInput.value));
		hiddenCalendarInput();
		answersCounter++;
		function delayedFunction() {
			addMessagesAfterUserAnswers(questionsArray);
			scrollChatToBottom();
			showTextInput();
		}
		setTimeout(delayedFunction, 300);
	} else {
		errorValidateBirthday();
	}
})
dateInput.addEventListener("keyup", (event) => {
	if ( event.key === "Enter" ) {
		if ( validateBirthday(dateInput.value) ) {
			deleteErrorMessagesInChat();
			writeActualBirthDate(dateInput.value);
			addUserMessageToChat(formateDate(dateInput.value));
			hiddenCalendarInput();
			answersCounter++;
			function delayedFunction() {
				addMessagesAfterUserAnswers(questionsArray);
				scrollChatToBottom();
				showTextInput();
			}
			setTimeout(delayedFunction, 300);
		} else {
			errorValidateBirthday();
		}
	}
})

// Показываем календарь
const showCalendarInput = () => {
	document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-hidden-animation");
	document.querySelector(".post-request-vacancy-page__date-input-container").classList.add("input-show-animation");
	function delayedFunction() {
		document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-hidden");
	}
	setTimeout(delayedFunction, 300);
}
// Скрываем календарь
const hiddenCalendarInput = () => {
	document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-show-animation");
	document.querySelector(".post-request-vacancy-page__date-input-container").classList.add("input-hidden-animation");
	function delayedFunction() {
		document.querySelector(".post-request-vacancy-page__date-input-container").classList.remove("input-visible");
		document.querySelector(".post-request-vacancy-page__date-input-container").classList.add("input-hidden");
	}
	setTimeout(delayedFunction, 300);
}

// Записываем актуальную дату рождения в переменную и в обьект + обрабатываем данные перед записью
const writeActualBirthDate = (date) => {
	let parts = date.split("-");
	let formattedDate = parts[2] + "." + parts[1] + "." + parts[0];
	dataBornDate = formattedDate;
	postVacancyObject.birthday = formattedDate;
}

// Делаем проверку номера телефона и даем пользователю две кнопки на выбор
const addPhoneAnswerBlock = () => {
	if ( objectKeys[questionsCounter] === "feedback_phone" ) {
		hiddenTextInput();
		const promise = new Promise(function(resolve, reject){
			function showButtons() {
				const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
				chatMessagesBlock.insertAdjacentHTML("beforeend", `
				<div class="change-number-container phone-buttons-show-animations">
					<button class="route-button route-button-main-style button-effect actual-number-button">
						<div id="circle"></div>
						<div>Так, ${dataPhone} - це актуальный номер</div>
					</button>
					<button class="route-button route-button-main-style button-effect no-actual-number-button">
						<div id="circle"></div>
						<div>Ні, хочу вказати інший номер</div>
					</button>
				</div>
				`);

				const actualNumberButton = document.querySelector(".actual-number-button");
				const noActualNumberButton = document.querySelector(".no-actual-number-button");
				const numberButtonsArray = [actualNumberButton, noActualNumberButton]
				resolve (numberButtonsArray);
			}
			setTimeout(showButtons, 1000)
		})
		.then (buttons => {
			buttons[0].addEventListener("click", () => {
				writeCurrentNumber(currentUserPhone);
				hiddenPhoneNumberInput();
				deleteNumbersButtons();
				deleteErrorMessagesInChat();
				answersCounter++;
				function delayedFunction() {
					addUserMessageToChat(currentUserPhone);
					addMessagesAfterUserAnswers(questionsArray);
					scrollChatToBottom();
					showTextInput();
				}
				setTimeout(delayedFunction, 300);
			})
			buttons[1].addEventListener("click", () => {
				showPhoneNumberInput();
			})
		})
	}
}

// Вешаем событие клика на кнопку отправку телефона (инпут с номером)
const sendNumberAsMessageInput = document.querySelector(".post-request-vacancy-page__phone-input");
const sendNumberAsMessageButton = document.querySelector(".post-request-vacancy-page__send-phone");
sendNumberAsMessageButton.addEventListener("click", () => {
	if ( validatePhone(sendNumberAsMessageInput.value) ) {
		writeCurrentNumber(sendNumberAsMessageInput.value);
		hiddenPhoneNumberInput();
		deleteNumbersButtons();
		answersCounter++;
		function delayedFunction() {
			addUserMessageToChat(sendNumberAsMessageInput.value);
			addMessagesAfterUserAnswers(questionsArray);
			scrollChatToBottom();
			showTextInput();
		}
		setTimeout(delayedFunction, 300);
		deleteErrorMessagesInChat();
	} else {
		errorValidatePhoneMessage();
		scrollChatToBottom();
	}
	
})

// Вешаем событие на нажатие Enter на инпуте номера телефона
sendNumberAsMessageInput.addEventListener("keyup", (event) => {
	if ( event.key === "Enter" && validatePhone(sendNumberAsMessageInput.value) ) {
		writeCurrentNumber(sendNumberAsMessageInput.value);
		hiddenPhoneNumberInput();
		deleteNumbersButtons();
		answersCounter++;
		function delayedFunction() {
			addUserMessageToChat(sendNumberAsMessageInput.value);
			addMessagesAfterUserAnswers(questionsArray);
			scrollChatToBottom();
			showTextInput();
		}
		setTimeout(delayedFunction, 300);
		deleteErrorMessagesInChat();
	} else if ( event.key === "Enter" && !validatePhone(sendNumberAsMessageInput.value) ) {
		errorValidatePhoneMessage();
		scrollChatToBottom();
	}
})

// Функция для удаления кнопок подтвержения номера телефона
const deleteNumbersButtons = () => {
	document.querySelector(".change-number-container").classList.remove("phone-buttons-show-animations");
	document.querySelector(".change-number-container").classList.add("phone-buttons-hidden-animations");
	function delayedFunction() {
		document.querySelector(".change-number-container").classList.remove("phone-buttons-hidden-animations");
		document.querySelector(".change-number-container").innerHTML = "";
	}
	setTimeout(delayedFunction, 300);
}

// Функция для включения поля ввода телефона
const showPhoneNumberInput = () => {
	document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-hidden-animation");
	document.querySelector(".post-request-vacancy-page__phone-input-container").classList.add("input-show-animation");
function delayedFunction() {
	document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-hidden");
	document.querySelector(".post-request-vacancy-page__phone-input").focus();
}
setTimeout(delayedFunction, 300);
}

// Функция для выключения поля ввода телефона
const hiddenPhoneNumberInput = () => {
	document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-show-animation");
	document.querySelector(".post-request-vacancy-page__phone-input-container").classList.add("input-hidden-animation");
function delayedFunction() {
	document.querySelector(".post-request-vacancy-page__phone-input-container").classList.add("input-hidden");
	document.querySelector(".post-request-vacancy-page__phone-input-container").classList.remove("input-visible");
}
setTimeout(delayedFunction, 300);
}

// Функция обработки номера телефона и приведения его в нужный формат, 380951234567
const adaptPhoneNumber = (data) => {
	const cleanSpace = data.replaceAll(" ", "").replaceAll("+", "").replaceAll(")", "").replaceAll("(", "");
	const startPhone = "38";
	let finalPhone = cleanSpace;
	if ( cleanSpace[0] === "0" ) {
		finalPhone = startPhone + cleanSpace;
	}
	if ( finalPhone[0] === "3" && finalPhone[1] === "8" && finalPhone.length === 12 ) {
		return finalPhone
	} else {
		return false
	}
}


// Функция для записи текущего актуального номера в обьект для отправки на бэк и продолжения алгоритма
const writeCurrentNumber = (number) => {
	dataPhone = adaptPhoneNumber(number);
	postVacancyObject.feedback_phone = dataPhone;
}

// Делаем кнопку отправки сообщения неактивной
const inactiveMessageButton = () => {
	document.querySelector(".post-request-vacancy-page__send-message").disabled = true;
}
// Делаем кнопку отправки сообщения активной
const activeMesssageButton = () => {
	document.querySelector(".post-request-vacancy-page__send-message").disabled = false;
}

// Делаем инпут неактивным
const inactiveInput = () => {
	document.querySelector(".post-request-vacancy-page__input").disabled = true;
}
// Делаем инпут активным
const activeInput = () => {
	document.querySelector(".post-request-vacancy-page__input").disabled = false;
	document.querySelector(".post-request-vacancy-page__input").focus();
}

// Скрываем контейнер с инпутом
const hiddenTextInput = () => {
		document.querySelector(".post-request-vacancy-page__input-container").classList.remove("input-visible");
		document.querySelector(".post-request-vacancy-page__input-container").classList.add("input-hidden-animation");
	function delayedFunction() {
		document.querySelector(".post-request-vacancy-page__input-container").classList.add("input-hidden");
	}
	setTimeout(delayedFunction, 300);
}

// Возвращаем контейнер с инпутом
const showTextInput = () => {
	document.querySelector(".post-request-vacancy-page__input-container").classList.remove("input-hidden-animation");
	document.querySelector(".post-request-vacancy-page__input-container").classList.add("input-show-animation");
function delayedFunction() {
	document.querySelector(".post-request-vacancy-page__input-container").classList.remove("input-hidden");
}
setTimeout(delayedFunction, 300);
}

// Ждем ответ на финальный вопрос и выводим финальное сообщение
const checkFinalAnswerMessage = () => {
	scrollChatToBottom()
	let keys = Object.keys(postVacancyObject);
	// Получаем самый последний ключ
	let lastKey = keys[keys.length - 1];
	// Проверяем, есть ли у последнего ключа значение
	if (postVacancyObject[lastKey] !== undefined && postVacancyObject[lastKey] !== null && postVacancyObject[lastKey] !== "") {
		addFinalMessageAfterAnswers(finalMessage)
		scrollChatToBottom()
		hiddenTextInput();
	} else {}
}

// Функционал вывода финального сообщения после ответа на все вопросы
const addFinalMessageAfterAnswers = (message) => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	function delayedFunction() {
		chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element final-message__container input-hidden">
			<div class="main-message-style final-message">${message}</div>
			<button id="001_check-request-vacancy-page" class="route-button final-message__button route-button-main-style button-effect">
				<div id="circle"></div>
				<div>Продовжити</div>
			</button>
		</div>
		`);
		changeMessageContainerPadding();
		showFinalBlock();
		addListenerToAllRouteButtons();
		addInputFieldsToCheckPage();
	}
	setTimeout(delayedFunction, 300);
}

// Уменьшаем отступ внизу чата после появления финального сообщения
const changeMessageContainerPadding = () => {
	document.querySelector(".post-request-vacancy-page__messages-container").classList.remove("padding-message-container-chat");
	document.querySelector(".post-request-vacancy-page__messages-container").classList.add("padding-message-container-final");
}

// Анимация появления блока с финальным сообщением и кнопкой Продолжить
const showFinalBlock = () => {
	document.querySelector(".final-message__container").classList.add("show-final-message");
	function delayedFunction() {
		document.querySelector(".final-message__container").classList.remove("input-hidden");
		document.querySelector(".final-message__container").classList.add("input-visible");
		scrollChatToBottom();
	}
	setTimeout(delayedFunction, 300);
}


// Функционал обновления счетчика при добавлении ответа + вызов функции для добавления ответа в чат + вызов функции для деактивации инпута
const addUserAnswers = (userMessageText) => {
	inactiveInput();
	inactiveMessageButton();
	addUserMessageToChat(userMessageText);
	answersCounter++;
}

//Прокручиваем содержимое в самый низ
function scrollChatToBottom() {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight);
}

function addUserMessageToChat(userMessage) {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element user-message__container">
			<div class="main-message-style user-message">${userMessage}</div>
		</div>
	`);
}

// Вставляем вопрос в чат и вызываем функцию активации инпута
function addMessageToChat(question) {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	function delayedFunction() {
		chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element app-message__container bot-message-animation">
			<div class="main-message-style app-message">${question}</div>
		</div>
	`);
	}
	setTimeout(delayedFunction, 1);
	function onInput() {
		activeInput();
		activeMesssageButton();
	}
	setTimeout(onInput, 800);
}

// Проходимся по всем второстепенным вопросам и добавляем их в массив со всеми вопросами questionsArray
const addAdditionalQuestionsToMainQuestionsArray = (questionsObject, arrayToWrite) => {
	for (var key in questionsObject.forms) {
		if (key.startsWith('q')) {
				arrayToWrite.push(questionsObject.forms[key]);
		}
	}
	return arrayToWrite;
}

const addAdditionalQuestionsToMainPostObject = (questionsObject, objectToWrite) => {
	for (var key in questionsObject.forms) {
		allQuestionsCounter++; // Добавляем +1 в счетчик общего количество вопросов
		if (key.startsWith('q')) {
			objectToWrite[`${key}`] = "";
		}
	}
}

// ------------------------------------------------------------------------------------------------ Логика для страницы проверки введенных данных

// Список вопросов для проверочной страницы
const checkQuestionsArray = [
	`Ім'я та прізвище:`,
	`Номер телефону для зв'язку:`,
	`Місто проживання:`,
	`Дата народження:`,
]

const addAdditionalQuestionsToMainCheckQuestionsArray = (questionsObject, arrayToWrite) => {
	for (var key in questionsObject.forms) {
		if (key.startsWith('q')) {
				arrayToWrite.push(questionsObject.forms[key]);
		}
	}
}

// Получаем объект и выводим данные на странице в инпутах
const addInputFieldsToCheckPage = () => {
	const checkPageMainContainer = document.querySelector(".check-request-vacancy-page__items-container");
	checkPageMainContainer.insertAdjacentHTML("beforeend", `
				<div class="check-request-vacancy-page__check-item">
					<div class="check-request-vacancy-page__question-input-container">
						<div class="check-request-vacancy-page__check-question vacancy-title-on-check-page"> <img src="../../img/icons/vacancy-icon.png" alt="vacancy icon" class="vacancy-mark"> Назва вакансії:</div>
						<div type="text" class="check-request-vacancy-page__check-input vacancy-check-title">${currentVacancyTitle}</div>
					</div>
				</div>
			`)
	for ( let i = 0; i < Object.keys(postVacancyObject).length-1; i++ ) {
		if ( i < fixedQuestionsCounter ) {
			checkPageMainContainer.insertAdjacentHTML("beforeend", `
				<div class="check-request-vacancy-page__check-item">
					<div data-key="${Object.keys(postVacancyObject)[i+1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">
						<div class="check-request-vacancy-page__check-question"> <img src="../../img/icons/check.png" alt="check icon" class="green-check-mark"> <img src="../../img/icons/cross.png" alt="check icon" class="red-cross _hidden-icon"> ${checkQuestionsArray[i]}</div>
						<input disabled value="${postVacancyObject[Object.keys(postVacancyObject)[i+1]]}" type="text" class="check-request-vacancy-page__check-input">
					</div>
					<button class="check-request-vacancy-page__edit-button">
						<img src="../../img/icons/edit.png" alt="edit icon" class="check-request-vacancy-page__edit-button-image edit-icon">
					</button>
				</div>
			`)
		} else {
			let objectElement = postVacancyObject[Object.keys(postVacancyObject)[i+1]];
			let objectElementAnswer = objectElement[Object.keys(objectElement)[0]];
			checkPageMainContainer.insertAdjacentHTML("beforeend", `
				<div class="check-request-vacancy-page__check-item">
					<div data-key="${Object.keys(postVacancyObject)[i+1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">
						<div class="check-request-vacancy-page__check-question"> <img src="../../img/icons/check.png" alt="check icon" class="green-check-mark"> <img src="../../img/icons/cross.png" alt="check icon" class="red-cross _hidden-icon"> ${checkQuestionsArray[i]}</div>
						<textarea disabled type="text" class="check-request-vacancy-page__check-input check-textarea">${objectElementAnswer}</textarea>
					</div>
					<button class="check-request-vacancy-page__edit-button">
						<img src="../../img/icons/edit.png" alt="edit icon" class="check-request-vacancy-page__edit-button-image edit-icon">
					</button>
				</div>
			`)
		}
	}
	addListenerOnEditButtons();
	inactiveCheckInputs();
	addAllInputsValidateListeners();
}

// Вешаем событие клика на все кнопки "редактировать" для каждого инпута
const addListenerOnEditButtons = () => {
	const allEditButtons = document.querySelectorAll(".check-request-vacancy-page__edit-button");
	for ( let item of allEditButtons ) {
		item.addEventListener("click", () => {
			// changeButtonImage(item);
			if ( item.previousElementSibling.lastElementChild.hasAttribute("disabled") ) {
				activeCheckInput(item);
			} else {
				writeNewDataToPostVacancyObject(item);
			}
		})
	}
}

// Разблокируем текущий инпут для редактирования при клике на кнопку редактирования
const activeCheckInput = (button) => {
	if ( button.classList.contains("check-request-vacancy-page__edit-button") ) {
		const allCheckItems = document.querySelectorAll(".check-request-vacancy-page__question-input-container");
		for ( let item of allCheckItems ) {
			item.lastElementChild.disabled = true;
			item.lastElementChild.blur();
			item.parentElement.classList.add("inactive-input-container-border");
			item.parentElement.classList.remove("active-input-container-border");
			if ( item.nextElementSibling !== null ) {
				item.nextElementSibling.children[0].classList.remove("_hidden-icon");
			} 
		}
		let inputContainer = button.previousElementSibling;
		inputContainer.lastElementChild.disabled = false;
		inputContainer.lastElementChild.focus();
		inputContainer.parentElement.classList.remove("inactive-input-container-border");
		inputContainer.parentElement.classList.add("active-input-container-border");
		inputContainer.nextElementSibling.children[0].classList.add("_hidden-icon");
	}
}

// Блокируем все инпуты при клике вне кнопок и вне активного инпута
const inactiveCheckInputs = () => {
	const allCheckInputs = document.querySelectorAll(".check-request-vacancy-page__check-input");
	const allCheckEditButtonsImages = document.querySelectorAll(".check-request-vacancy-page__edit-button-image");
	document.addEventListener("click", (event) => {
		if ( event.target ) {
			if ( 
				!event.target.classList.contains("check-request-vacancy-page__edit-button") &&
				!event.target.classList.contains("check-request-vacancy-page__edit-button-image") &&
				!event.target.classList.contains("check-request-vacancy-page__check-input") ||
				event.target.classList.contains("check-request-vacancy-page__check-input") &&
				!event.target.parentElement.parentElement.classList.contains("active-input-container-border")
			) {
				for ( let item of allCheckInputs ) {
					item.parentElement.parentElement.classList.add("inactive-input-container-border");
					item.parentElement.parentElement.classList.remove("active-input-container-border");
					item.blur();
					item.disabled = true;
				}
				for ( let item of allCheckEditButtonsImages ) {
					item.classList.remove("_hidden-icon");
				}
			}
		}
	})
}

// Перезапись новых данных в обьекте для отправки
const writeNewDataToPostVacancyObject = (button) => {
	let inputElement = button.previousElementSibling.lastElementChild;
	let currentObjectKey = button.previousElementSibling.dataset.key;
	if ( currentObjectKey[0] === "q" && currentObjectKey.length === 2 ) {
		let objectElement = postVacancyObject[currentObjectKey];
		let currentQuestion = Object.keys(objectElement)[0];
		objectElement[currentQuestion] = inputElement.value;
	} else {
		postVacancyObject[currentObjectKey] = inputElement.value;
	}
}

// Вешаем событие на кнопку отправки заявки
const sendObjectDataToServer = () => {
	const checkRequestVacancyButton = document.querySelector(".check-request-vacancy-page__request-button");
	checkRequestVacancyButton.addEventListener("click", () => {
		fetchPostData(postVacancyObject, currentVacancyID);
	})
}
sendObjectDataToServer();

// Добавляем в обьект для отправки  на бэк поле, содержащее информацию о резюме
const addCVObjectToMainObject = (cvObject) => {
	cvObject.cv = {};
	return cvObject
}

// Отправка заявки на вакансию с анкетой кандидата (вызывается при клике на кнопку)
function fetchPostData(objectData, vacancyID) {
	const apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/65a569ea42f8319f053cb630`;
	// Данные POST запроса
	const data = addCVObjectToMainObject(objectData);
	console.log(data)
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data) // Перетворюємо дані у JSON-рядок
	};

	// Відправляємо POST-запит за допомогою Fetch API
	fetch(apiPostDataURL, requestOptions)
		.then(response => {
			if (!response.ok) {
				 // Вызов сообщения с текстом об ошибке
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			 // Вызов сообщения с текстом об успешной отправке
			return response.json(); // Перетворюємо отриману відповідь у JSON
		})
		.then(data => {
			console.log('Отримано дані від сервера:', data);
			showMainMessage(successfullMessage);
		})
		.catch(error => {
			console.error('Помилка під час виконання POST-запиту:', error);
			showMainMessage(errorMessage);
		});
	}

// -------------------------------------------------------------------------------- Валидация полей на странице проверки данных


const addAllInputsValidateListeners = () => {
	const allCheckInputs = document.querySelectorAll(".check-request-vacancy-page__check-input");
	for ( let i = 0; i < allCheckInputs.length; i++ ) {
		allCheckInputs[i].setAttribute("check-item-number", `${i}`);
	}
	for ( let item of allCheckInputs ) {
		item.addEventListener("keyup", (event) => {
			if ( +event.target.getAttribute("check-item-number") === 1 ) {
				validateName(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 0);
			} else if ( +event.target.getAttribute("check-item-number") === 2 ) {
				validatePhoneOnCheckPage(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 1);
			} else if ( +event.target.getAttribute("check-item-number") === 3 ) {
				validateCity(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 2);
			} else if ( +event.target.getAttribute("check-item-number") === 4 ) {
				validateBirthdayOnCheckPage(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 3);
			} else if ( +event.target.getAttribute("check-item-number") > 4 ) {
				validateAdditionalAnswers(event.target.value) ? addGreenCheck(event.target) : addRedCross(event.target, 4);
			}
		})
	}
}

// Валидация даты рождения
const validateBirthdayOnCheckPage = (date) => {
	let errorsCounter = 0;
	let includeSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for ( let i = 0; i < 10; i++ ) {
		for ( let j = 0; j < includeSymbols.length; j++ ) {
			if ( date[i] === includeSymbols[j] ) {
				errorsCounter++
			}
		}
	} 
	if ( date.length !== 10 || findAgeOnCheckPage(date) < 18  || findAgeOnCheckPage(date) > 70 || date[2] !== "." || date[5] !== "." || errorsCounter !== 8 ) {
		return false
	} else {
		return true
	}
}

// Рассчитываем возраст
const findAgeOnCheckPage = (birthdate) => {
	const [day, month, year] = birthdate.split('.');
	const birthDateObj = new Date(`${year}-${month}-${day}`);
	const currentDate = new Date();
	const ageInMillis = currentDate - birthDateObj;
	const ageInYears = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));
	return ageInYears
}

// Валидация телефона на странице проверки данных
const validatePhoneOnCheckPage = (phone) => {
	let phoneToString = phone.toString();
	let phoneNumber = phoneToString.replaceAll(" ", "");
	let errorsCounter = 0
	let includeSymbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	includeSymbols.forEach(function(element){
		for ( let i = 0; i < phoneNumber.length; i++ ) {
			if ( phoneNumber[i] === element ) {
				errorsCounter++
			}
		}
	})
	if ( phoneNumber.length !== 12 || errorsCounter !== 12 || phoneNumber[0] !== "3" || phoneNumber[1] !== "8" || phoneNumber[2] !== "0" ) {
		return false
	} else {
		return true
	}
}

// Добавляем красный крестик
const addRedCross = (item, messageNumber) => {
	// Сообщения об ошибках
	const errorMessages = [
		"Поле має містити від 4 до 100 символів",
		"Введіть номер телефону у форматі: 380930000000 (без знаків +,),(, та пробілів)",
		"Поле має містити від 2 до 100 символів",
		"Введіть дату народження у форматі: 25.06.1997. Для заповнення заявки кандидату має виповнитись 18 років",
		"Поле має містити від 10 до 500 символів"
	];
	item.previousElementSibling.querySelector(".red-cross").classList.remove("_hidden-icon");
	item.previousElementSibling.querySelector(".green-check-mark").classList.add("_hidden-icon");
	addErrorMessageOnCheckPage(errorMessages[messageNumber]);
}
// Добавляем зеленую галочку
const addGreenCheck = (item) => {
	item.previousElementSibling.querySelector(".green-check-mark").classList.remove("_hidden-icon");
	item.previousElementSibling.querySelector(".red-cross").classList.add("_hidden-icon");
	deleteErrorMessageOnCheckPage();
}

// Добавляем сообщение сверху об неправильной валидации
const addErrorMessageOnCheckPage = (message) => {
	const errorMessageElement = document.querySelector(".error-message-check-input");
	if ( errorMessageElement.classList.contains("_hidden-error-message") ) {
		errorMessageElement.innerText = `${message}`;
		errorMessageElement.classList.remove("_hidden-error-message");
	}
}

// Удаляем сообщение сверху
const deleteErrorMessageOnCheckPage = () => {
	const errorMessageElement = document.querySelector(".error-message-check-input");
	if ( !errorMessageElement.classList.contains("_hidden-error-message") ) {
		errorMessageElement.classList.add("error-message-check-input-hidden");
		function delay() {
			errorMessageElement.classList.add("_hidden-error-message");
			errorMessageElement.classList.remove("error-message-check-input-hidden");
		}
		setTimeout(delay, 500);
	}
}

// ---------------------------------------------------------------------------------------------------- Логика показа сообщения

// Вызываем сообщение о том, что заяка отправлена (с кнопкой на главную страницу)
const showMainMessage = (messageText) => {
	let message = document.querySelector(".main-message-template-style");
	message.classList.remove("_hidden-template");
	document.querySelector(".main-message-template-style__message").innerHTML = `${messageText}`;
	showMessageAnimation(); // Вызываем анимацию
	reloadPageAfterClickHomeButton() // Событие клика по кнопке
}

// Вызываем анимацию появления сообщения
const showMessageAnimation = () => {
	document.querySelector(".main-message-template-style__wrapper").classList.add("position-message-animation");
	document.querySelector(".main-message-template-style__wrapper").classList.remove("hidden-message");
	let message = document.querySelector(".main-message-template-style");
	message.classList.add("yellow-bg-color-animation");
	function delay() {
		message.classList.add("bg-yellow-color");
		document.querySelector(".main-message-template-style__wrapper").classList.remove("margin-top");
	}
	setTimeout(delay, 990);
}

// Вешаем событие на шаблон с сообщением для перехода на главную страницу и скрытия сообщения
const reloadPageAfterClickHomeButton = () => {
	document.querySelector(".main-message-template-style__home-button").addEventListener("click", () => {
		window.location.reload();
		let message = document.querySelector(".main-message-template-style");
		message.classList.add("_hidden-template");
	})
}
	
// ---------------------------------------------------------------------------------------------------- Логика личного кабинета и проверки заявки
	
	// Вызываем данные клиента при каждой загрузке
fetch(`${actualHost}/cabinet/${currentTelegramID}/${currentPassword}`)
	.then(response => {
		// Проверяем успешность ответа
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.status}`);
		}
		
		// Преобразуем ответ в JSON
		return response.json();
	})
	.then(data => {
		writeDataToCabinet(data);
		currentVacancyID = data.cabinet._id;
	})
	.catch(error => {
		// Обрабатываем ошибки
		console.error('Fetch error:', error);
	});

// Запись данных клиента на страницу кабинета
const writeDataToCabinet = (data) => {
	const cabinetWrapper = document.querySelector(".cabinet-page__wrapper");
	const cabinetMainButton = document.querySelector(".user-cabinet-main-page-button");
	if ( data.cabinet === "" ) {
		cabinetMainButton.classList.add("_hidden-cabinet-button");
		cabinetWrapper.insertAdjacentHTML("beforeend", `
			<div class="cabinet-page__item">
				Заявки відсутні
			</div>
		`)
	} else {
		cabinetMainButton.classList.remove("_hidden-cabinet-button");
		cabinetWrapper.insertAdjacentHTML("beforeend", `
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Назва вакансії:</div>
				<textarea class="cabinet-page__item-value-vacancy" data-item="title">${data.cabinet.title}</textarea>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Ім'я та прізвище:</div>
				<textarea class="cabinet-page__item-value cabinet-page__item-value-name" data-item="name">${data.cabinet.name}</textarea>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Телефон:</div>
				<textarea class="cabinet-page__item-value cabinet-page__item-value-phone" data-item="phone">${data.cabinet.feedback_phone}</textarea>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Місто:</div>
				<textarea class="cabinet-page__item-value cabinet-page__item-value-city" data-item="city">${data.cabinet.city}</textarea>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Дата народження:</div>
				<textarea class="cabinet-page__item-value cabinet-page__item-value-birthday" data-item="birthday">${data.cabinet.birthday}</textarea>
			</div>
		`)
		const additionalQuestionsArray = [];
		for ( let i = 0; i < Object.keys(data.cabinet).length; i++ ) {
			let objectItem = Object.keys(data.cabinet)[i];
			if ( objectItem[0] === "q" && objectItem.length === 2 ) {
				additionalQuestionsArray.push(objectItem);
				addAdditionalQuestionsToUserCabinet(objectItem, cabinetWrapper, data);
			}
		}
	}
}

// Добавление списка дополнительных вопросов и ответов в личном кабинете
const addAdditionalQuestionsToUserCabinet = (object, element, data) => {
	let questionObject = data.cabinet[object];
	for (const key in questionObject) {
		const value = questionObject[key];
		element.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">${key}</div>
				<textarea class="cabinet-page__item-value additional-cabinet-value" data-item="${object}">${value}</textarea>
			</div>
		`)
	}
}

// Удаление заявки
document.querySelector(".cabinet-page__delete-button").addEventListener("click", () => {
	fetch(`${actualHost}/del_order/${currentTelegramID}/${currentPassword}`)
	.then(response => {
		// Проверяем успешность ответа
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.status}`);
		}
		
		// Преобразуем ответ в JSON
		return response.json();
	})
	.then(data => {
		console.log(data);
		console.log("Данные удалены")
	})
	.catch(error => {
		// Обрабатываем ошибки
		console.error('Fetch error:', error);
	});
})


// Вывод сообщения об удаленной заявке

})


// ------------------------------------------------------------------------------------------ Валидация полей на всех страницах

// // Валидация имени
// const validateName = (name) => {
// 	if ( name.length <= 3 || name.length > 100 ) {
// 		console.log("Допустима кількість символів - від 4 до 100")
// 	}
// }

// // Валидация телефона
// const validatePhone = (phone) => {
// 	let phoneNumber = phone.replace(" ", "");
// 	let phoneNumberInt = +phoneNumber;
// 	let noNumbersCounter = 0;
// 	for ( let i = 0; i < phoneNumberInt.length; i++ ) {
// 		if ( typeof phoneNumberInt[i] !== "number" ) {
// 			noNumbersCounter++
// 		}
// 	}
// 	if ( phoneNumber.length < 10 || phoneNumber.length > 30 || noNumbersCounter > 0 ) {
// 		console.log("Телефон має містити не менше 10 і не більше 30 символів");
// 	} else {
// 		console.log("phone ok");
// 	}
// }

// // Валидация города
// const validateCity = (city) => {
// 	if ( city.length < 2 || city.length > 100 ) {
// 		console.log("Допустима кількість символів - від 2 до 100")
// 	}
// }

// // Валидация дня рождения
// const validateBirthday = (birthday) => {
// 	if ( birthday.length !== 10 ) {
// 		console.log("Введіть номер телефону у форматі дд.мм.рррр")
// 	} else {
// 		console.log("date ok")
// 	}
// }



