
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


	// Запрос на получение текущей заявки (заполненной и отправленной пользователемм)
	fetch(`${actualHost}/cabinet/${currentTelegramID}/${data.password}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // преобразование ответа в формат JSON
  })
  .then(data => {
    // Обработка данных
    console.log(data);
  })
  .catch(error => {
    // Обработка ошибок
    console.error('Fetch error:', error);
  });

	


	// Работа с data (вставляем актуальное имя)
	const headerUserName = document.querySelector(".header__user-name-text");
	headerUserName.insertAdjacentText("afterbegin", `${data.first_name}`);


	// ------------------------------------------------------------------------------------------------------------ Работа с чатом
	document.addEventListener("click", () => {
		if ( currentTemplateID === "post-request-vacancy-page" ) {
			document.querySelector(".page").classList.add("page-chat-height");
		} else {
			document.querySelector(".page").classList.remove("page-chat-height");
		}
	})

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

	// Получаем инпут для ввода текста, и записываем значение при отправке сообщения и вызываем функция для вывода нового вопроса в чате
	const chatInput = document.querySelector(".post-request-vacancy-page__input");
	// При нажатии кнопки Enter
	chatInput.addEventListener("keyup", (event) => {
		if ( event.key === "Enter" ) {
			addAnswersAndQuestionsToChat();
		}
	})
	// При клике на стрелочку
	const sendMessageButton = document.querySelector(".post-request-vacancy-page__send-message");
	sendMessageButton.addEventListener("click", () => {
		addAnswersAndQuestionsToChat();
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
		writeActualBirthDate(dateInput.value);
		addUserMessageToChat(dateInput.value);
		hiddenCalendarInput();
		answersCounter++;
		function delayedFunction() {
			addMessagesAfterUserAnswers(questionsArray);
			scrollChatToBottom();
			showTextInput();
		}
		setTimeout(delayedFunction, 300);
	})
	dateInput.addEventListener("keyup", (event) => {
		if ( event.key === "Enter" ) {
			writeActualBirthDate(dateInput.value);
			addUserMessageToChat(dateInput.value);
			hiddenCalendarInput();
			answersCounter++;
			function delayedFunction() {
				addMessagesAfterUserAnswers(questionsArray);
				scrollChatToBottom();
				showTextInput();
			}
			setTimeout(delayedFunction, 300);
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
	})
	
	// Вешаем событие на нажатие Enter на инпуте номера телефона
	sendNumberAsMessageInput.addEventListener("keyup", (event) => {
		if ( event.key === "Enter" ) {
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

	// Функция для записи текущего актуального номера в обьект для отправки на бэк и продолжения алгоритма
	const writeCurrentNumber = (number) => {
		dataPhone = number;
		postVacancyObject.feedback_phone = number;
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

	// ---------------------------------------------------------------------------------------------------- Логика для страницы проверки введенных данных

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
							<div class="check-request-vacancy-page__check-question">Назва вакансії:</div>
							<div type="text" class="check-request-vacancy-page__check-input vacancy-check-title">${currentVacancyTitle}</div>
						</div>
					</div>
				`)
		for ( let i = 0; i < Object.keys(postVacancyObject).length-1; i++ ) {
			if ( i < fixedQuestionsCounter ) {
				checkPageMainContainer.insertAdjacentHTML("beforeend", `
					<div class="check-request-vacancy-page__check-item">
						<div data-key="${Object.keys(postVacancyObject)[i+1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">
							<div class="check-request-vacancy-page__check-question">${checkQuestionsArray[i]}</div>
							<input disabled value="${postVacancyObject[Object.keys(postVacancyObject)[i+1]]}" type="text" class="check-request-vacancy-page__check-input">
						</div>
						<button class="check-request-vacancy-page__edit-button">
							<img src="../../src/img/icons/edit.png" alt="edit icon" class="check-request-vacancy-page__edit-button-image edit-icon">
							<img src="../../src/img/icons/save.png" alt="save icon" class="check-request-vacancy-page__edit-button-image save-icon _hidden-icon">
						</button>
					</div>
				`)
			} else {
				let objectElement = postVacancyObject[Object.keys(postVacancyObject)[i+1]];
				let objectElementAnswer = objectElement[Object.keys(objectElement)[0]];
				checkPageMainContainer.insertAdjacentHTML("beforeend", `
					<div class="check-request-vacancy-page__check-item">
						<div data-key="${Object.keys(postVacancyObject)[i+1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">
							<div class="check-request-vacancy-page__check-question">${checkQuestionsArray[i]}</div>
							<textarea disabled type="text" class="check-request-vacancy-page__check-input check-textarea">${objectElementAnswer}</textarea>
						</div>
						<button class="check-request-vacancy-page__edit-button">
							<img src="../../src/img/icons/edit.png" alt="edit icon" class="check-request-vacancy-page__edit-button-image edit-icon">
							<img src="../../src/img/icons/save.png" alt="save icon" class="check-request-vacancy-page__edit-button-image save-icon _hidden-icon">
						</button>
					</div>
				`)
			}
		}
		addListenerOnEditButtons();
	}

	// Вешаем событие клика на все кнопки "редактировать" для каждого инпута
	const addListenerOnEditButtons = () => {
		const allEditButtons = document.querySelectorAll(".check-request-vacancy-page__edit-button");
		for ( let item of allEditButtons ) {
			item.addEventListener("click", () => {
				changeButtonImage(item);
				if ( item.previousElementSibling.lastElementChild.hasAttribute("disabled") ) {
					activeCheckInput(item);
				} else {
					inactiveCheckInput(item);
					writeNewDataToPostVacancyObject(item);
				}
			})
		}
	}

	// Разблокируем текущий инпут для редактирования при клике на кнопку редактирования
	const activeCheckInput = (button) => {
		let inputContainer = button.previousElementSibling;
		inputContainer.lastElementChild.disabled = false;
		inputContainer.lastElementChild.focus();
		inputContainer.parentElement.classList.remove("inactive-input-container-border");
		inputContainer.parentElement.classList.add("active-input-container-border");
	}
	// Блокируем текущий инпут для редактирования при клике на дискету
	const inactiveCheckInput = (button) => {
		let inputContainer = button.previousElementSibling;
		inputContainer.lastElementChild.disabled = true;
		inputContainer.lastElementChild.blur();
		inputContainer.parentElement.classList.remove("active-input-container-border");
		inputContainer.parentElement.classList.add("inactive-input-container-border");
	}

	// Заменяем картинку на кнопке на дискету
	const changeButtonImage = (button) => {
		button.lastElementChild.classList.toggle("_hidden-icon");
		button.firstElementChild.classList.toggle("_hidden-icon");
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
		const apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/${vacancyID}`;
		// Данные POST запроса
		const data = addCVObjectToMainObject(objectData);
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
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json(); // Перетворюємо отриману відповідь у JSON
			})
			.then(data => {
				console.log('Отримано дані від сервера:', data);
			})
			.catch(error => {
				console.error('Помилка під час виконання POST-запиту:', error);
			});
		}
})

// Вызываем сообщение о том, что заяка отправлена (с кнопкой на главную страницу)
const showMessageAfterRequest = () => {

}

// События после отправки заявки на сервер
