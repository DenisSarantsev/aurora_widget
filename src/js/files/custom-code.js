
document.addEventListener("DOMContentLoaded", () => {

let data = {
	'title': 'АврорА',
	'cabinet':
	{
			"birthday": "21.02.2002",
			"check_gpt": null,
			"city": "фливолжафджиловаждол",
			"create_at": "2024-02-21 12:51:58",
			"feedback": false,
			"feedback_phone": "380931453791",
			"is_active": true,
			"kind": "офіс",
			"name": "арвилор",
			"qualities": null,
			"questionnaire": "Що для вас є ключовими цінностями в житті?: ифжвоаждолфиваждол\nЯк ви відповідаєте на виклики та труднощі в роботі?: двлоажфдиоваждлфоивад\nЯк ви володієте навичками управління часом?: фиждвлоажфдиоаждфиоваж\nЯк ви реагуєте на критику?: жфдивлоаджфоиваждлофиважд\nЯк ви вирішуєте складні завдання чи проблеми?: ифвждлоаижфлдоваждфиоваждф\n",
			"rating": null,
			"status": "Ваша заявка прийнята і буде розглянута менеджерами",
			"telegram_id": 210325718,
			"title": "Менеджер/ка з організаційного документообігу та комунікацій" 
	},
	'first_name': "Денис",
	'host': "https://fastapi-avrora-hr.fly.dev",
	'phone_number': '+380675478881',
	'telegram_id': 210325718,
	'password': "519d9a296dd5ccb730e1c3bac2255aae90ead3690c81c0b5a31b3f191c01c051696ede10d2f5d14b9edcb72b28844e1b34",
	'content': 'Хочеш стати частиною команди Аврори? Я маю для тебе кілька вакансій',
	'visit_website': false,
}

let cabinet = data.cabinet;
let globalCabinet = {cabinet};
let currentContent = data.content;
let currentUserName = data.first_name;
let currentTelegramID = data.telegram_id;
let currentPassword = data.password;
let currentUserPhone = data.phone_number;
let currentStatus = data.cabinet.status;
let actualHost = data.host;
let currentTemplateID = "home-page"; // Изначальное значение домашняя страница. Впоследствии перезаписывается при переходах между страницами
let firstEnter = true;
let currentVacancyID = ""; // Актуальный id вакансии (последняя вакансия, на которую зашел человек). Записывается при клике на кнопку вакансии и используется для отправки POST запроса
let currentVacancyTitle = "";
let vacancies = data.vacancies;
let globalVacancies = {vacancies}; // Глобальная переменная для всех вакансий
let currentVacancyKind; // Глобальная переменная, в которую записываем вид вакансии при клике на него
let reserveBranch = false; // Зашел ли пользователь на ветку оформления резерва. Если да, то true
let currentFile = {}; // Текущий выбранный файлы
let templatesRoad = ["home-page"]; // Путь, пройденный пользователем для работы кнопки "Назад"
let vacanciesFetch = false; // Проверяем, делался ли уже запрос по вакансиям

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
	if ( templatesRoad.length === 1 ) {
		footerElement.classList.add("animation-hidden-footer")
		setTimeout(function() {
			footerElement.classList.add("_hidden");
			footerElement.classList.remove("animation-hidden-footer")
		}, 490);
	} else if ( templatesRoad.length !== 1 && !footerElement.classList.contains("_hidden") ) {

	} else if ( templatesRoad.length !== 1 && footerElement.classList.contains("_hidden") ) {
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
// Функция удаления префикса из ID
function removeDigitsAndUnderscore(inputString) {
	let prefix = inputString.slice(0, 4);
	let rest = inputString.slice(4);
	let resultPrefix = prefix.replace(/[0-9_]/g, '');
	let resultString = resultPrefix+rest;
	return resultString;
}
// Функция для включения нужного шаблона (выполняется по клике кнопки роута)
const includeCurrentTemplate = (currentTemplateID) => {
// Находим все шаблоны
const allWidgetTemplates = document.querySelectorAll(".page-template");
	for ( let item of allWidgetTemplates ) {
		if ( item.id !== currentTemplateID && !firstEnter ) { 
			item.classList.add("position-left");
			setTimeout(function() {
				item.classList.add("_hidden-template");
				item.classList.remove("position-left");
			}, 290);
		} else if ( item.id === currentTemplateID && !firstEnter ) {
			setTimeout(function() {
				item.classList.remove("position-right");
				item.classList.remove("_hidden-template");
				item.classList.add("position-right");
				setTimeout(function() {
					item.classList.remove("position-right");
				}, 100);
			}, 600);
			
		} else {}
	}
}
includeCurrentTemplate(currentTemplateID);

// ---------------------------------------------------------------------- Отлавливаем вакансии через API и формируем шаблоны
const addVacanciesAndKindsToList = () => {
	if ( vacanciesFetch === false ) {
		vacanciesFetch = true;
		fetch(`${actualHost}/vacancies/${currentTelegramID}/${currentPassword}`)
		.then(response => {
			if (!response.ok) {throw new Error(`Network response was not ok: ${response.status}`);}
			return response.json();
		})
		.then(data => {
			let globalKinds = [] // Добавляем все виды вакансий в один массив
			globalVacancies = data;
			const findAllKindsOfVacancies = (vacancies) => {
				for ( let i = 0; i < vacancies.vacancies.length; i++ ) {
					let currentKind = vacancies.vacancies[i].kind;
					if ( !globalKinds.includes(currentKind) ) {
						globalKinds.push(currentKind)
					}
				} 
			}
			findAllKindsOfVacancies(globalVacancies)
	
			// Вставляем в страницу с направлениями нужное количество кнопок
			let directionsButtons = document.querySelector(".directions-page__buttons-block");
			for ( let i = 0; i < globalKinds.length; i++ ) {
				directionsButtons.insertAdjacentHTML("beforeend", 
					`
					<button id="${i}_jobs-list-page-${i}" class="route-button button route-button-main-style button-effect kind-vacancy-button opacity-null">
						<div id="circle"></div>
						<div>${globalKinds[i][0].toUpperCase() + globalKinds[i].slice(1)}</div>
					</button>
					`
				)
			}

			removePreloaderInKindsList();
			document.querySelector(".directions-page__image-container").classList.remove("opacity-null");
			document.querySelector(".directions-page__image-container").classList.add("kinds-transitions");
			let allKindsButtons = document.querySelectorAll(".kind-vacancy-button");
			for ( let item of allKindsButtons ) {
				item.classList.remove("opacity-null");
				item.classList.add("kinds-transitions");
			}
	
			// Вешаем прослушиватели на все кнопки выбора направления при выборе вакансии
			const addListenerToAllKindButtons = () => {
				const allKindButtons = document.querySelectorAll(".kind-vacancy-button");
				for ( let item of allKindButtons ) {
					item.addEventListener("click", () => {
						currentVacancyKind = item.lastElementChild.textContent;
						reserveBranch = false;
					})
				}
			}
			addListenerToAllKindButtons();
	
			// Создаем нужное количество шаблонов в зависимости от количества направлений
			for ( let i = 0; i < globalKinds.length; i++ ) {
				document.querySelector(".page").insertAdjacentHTML("beforeend", 
					`
						<section id="jobs-list-page-${i}" class="page-template page__jobs-list jobs-list-page-${i} jobs-list _hidden-template section-padding">
							<div class="jobs-list__container">
								<div class="jobs-list__buttons-block jobs-list__${i}">
								</div>
							</div>
						</section>
					`
				)
			}
	
			// Вставляем вакансии в сформированные шаблоны
			for ( let i = 0; i < globalKinds.length; i++ ) {
				let currentVacanciesTemplate = document.querySelector(`.jobs-list-page-${i}`);
				for ( let j = 0; j < globalVacancies.vacancies.length; j++ ) {
					if ( globalKinds[i] === globalVacancies.vacancies[j].kind ) {
						currentVacanciesTemplate.querySelector(".jobs-list__container").querySelector(`.jobs-list__${i}`).insertAdjacentHTML("beforeend", 
							`
								<button id="vacancy-page" data-vacancy-id="${globalVacancies.vacancies[j]._id}" class="route-button button button-effect jobs-list__item">
									<div id="circle"></div>
									<div>${globalVacancies.vacancies[j].title}</div>
								</button>
							`
						)
					}
				}
				currentVacanciesTemplate.querySelector(".jobs-list__container").querySelector(`.jobs-list__${i}`).insertAdjacentHTML("beforeend", 
					`
						<button id="005_reserve-directions-page" class="route-button button button-effect reserve-template-main-page-button">
							<div id="circle"></div>
							<div>Не знайшов вакансії для себе?</div>
						</button>
					`
				)
			}
	
			// Вставляем в страницу с направлениями нужное количество кнопок
			let reserveDirectionsButtons = document.querySelector(".reserve-directions-page__buttons-block");
			for ( let i = 0; i < globalKinds.length; i++ ) {
				reserveDirectionsButtons.insertAdjacentHTML("beforeend", 
					`
					<button id="10${i}_post-request-vacancy-page" class="route-button button route-button-main-style button-effect kind-reserve-button">
						<div id="circle"></div>
						<div>${globalKinds[i][0].toUpperCase() + globalKinds[i].slice(1)}</div>
					</button>
					`
				)
			}
	
			// Вешаем прослушиватели на все кнопки выбора направления при записи в резерв
			const addListenerToAllKindReserveButtons = () => {
				const allKindsReserveButtons = document.querySelectorAll(".kind-reserve-button");
				for ( let item of allKindsReserveButtons ) {
					item.addEventListener("click", (e) => {
						addQuestionsToChat();
						currentVacancyKind = item.lastElementChild.textContent;
						reserveBranch = true;
						addBackButtonMechanics(e.target);
						includeCurrentTemplate(removeDigitsAndUnderscore(e.target.id));
					})
				}
			}
			addListenerToAllKindReserveButtons();
	
			// Проходимся по всем кнопкам вакансий (вне зависимости от направления), и вешаем на них событие клика
			const allJobItemsButtons = document.querySelectorAll(".jobs-list__item");
			for ( let item of allJobItemsButtons ) {
				item.addEventListener("click", function(e){
					scrollToTop();
					let vacancyTitle = "";
					let vacancyContent = "";
					// Проходимя по массиву со всеми вакансиями и ищем в нем ту, у которой id такой же, как и у вакансии, по которой мы кликнули
					for ( let i = 0; i < globalVacancies.vacancies.length; i++ ) {
						if ( globalVacancies.vacancies[i]._id === +item.getAttribute(`data-vacancy-id`) ) {
							let titleObject = {text: `${globalVacancies.vacancies[i].title}`};
							let textObject = {text: `${globalVacancies.vacancies[i].description_html}`};
							vacancyTitle = cleanTagsStylesAndAttributes(titleObject);
							vacancyContent = cleanTagsStylesAndAttributes(textObject);
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
			
			addListenerToAllRouteButtons();
			
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
	} else {}
}
// Вешаем прослушиватель на кнопку вакансий на главной странице
document.querySelector(".find-vacancy-main-page-button").addEventListener("click", () => {
	// includeCurrentTemplate(currentTemplateID);
	if ( vacanciesFetch === false ) {
		addPreloaderInKindsList();
	}
	addVacanciesAndKindsToList();
})
// Добавляем прелоадер до момента, пока не подгрузились кнопки направлений
const addPreloaderInKindsList = () => {
	let preloaderContainer = document.querySelector(".preloader-in-widget");
	setTimeout(function() {
		preloaderContainer.classList.remove("preloader-hidden");
	}, 200)
}
// Удаляем прелоадер после момента, когда уже подгрузились вакансии
const removePreloaderInKindsList = () => {
	let preloaderContainer = document.querySelector(".preloader-in-widget");
	setTimeout(function() {
		preloaderContainer.classList.add("preloader-hidden");
	}, 250)
}
// Проходимся по всем кнопкам с роутами, чтобы повесить на них событие клика и при необходимости включить функцию переключения шаблона
const addListenerToAllRouteButtons = () => {
	if (document.querySelector(".route-button")) {
		// Функция для навешивания на прослушиватель
		const listenerFunctions = (e) => {
			if ( removeDigitsAndUnderscore(e.target.id) !== "post-request-vacancy-page" ) {
				currentTemplateID = removeDigitsAndUnderscore(e.target.id);
				addBackButtonMechanics(e.target);
				firstEnter = false;
				includeCurrentTemplate(currentTemplateID);
				// addWhiteBackground(item);
				hiddenOrShowFooter();
				scrollToTop();
			} else {
				addListenerToAllVacancyRequestButtons();
			}
		}
		// Находим все кнопки с роутами
		const allRouteButtons = document.querySelectorAll(".route-button");
		// Вешаем события на все кнопки с роутами в виджете
		for ( let item of allRouteButtons ) {
			// Удаляем прослушиватель, если он есть
			item.removeEventListener('click', listenerFunctions);
			// Отменяем всплытие и задаем событие при клике на дочерние элементы
			item.addEventListener("click", listenerFunctions);
			
		}
	}
}
addListenerToAllRouteButtons()
// Работа с data (вставляем актуальное имя)
const headerUserName = document.querySelector(".header__user-name-text");
headerUserName.insertAdjacentText("afterbegin", `${data.first_name}`);

// ------------------------------------------------------------------------------------------------------------ Работа с чатом

// При переходе на страницу с чатом обнуляем все переменные
// Переменные для отправки на бэк
let dataKind = currentVacancyKind;

let dataName = "";
let dataPhone = currentUserPhone;
let dataCity = "";
let dataBornDate = "";

// Массив с переменными, которым пользователь задает значения в чате:
let postVariablesArray = [dataName, dataPhone, dataCity, dataBornDate,]
// Список ключей обьекта
let objectKeys = ["name", "feedback_phone", "city", "birthday", "cv"]

// Формируем обьект для отправки на бэк
const postVacancyObject = {
	'kind': dataKind,
	'name': dataName,
	'feedback_phone': dataPhone,
	'city': dataCity,
	'birthday': dataBornDate,
	'cv': {},
}

// Счетчики вопросов и ответов
let fixedQuestionsCounter = 5;// Фиксированное количество вопросов (переменная не изменяется нигде в коде, а используется для понимания, когда переходить к формированию обьектов из ответов по дополнительным вопросам)
let allQuestionsCounter = 5; // Общее количество вопросов (изначально указываем количество фиксированных вопросов). Считаем именнок количество вопросов, на которые отвечает ппользователь, а не количество данных
let questionsCounter = -1; // Считаем количество заданных пользователю вопросов (по умолчанию -1, так как считаем по индексу)
let answersCounter = -1; // Количество написаннхы пользователем ответов. По счетчику определяем, когда задавать пользователю следующий вопрос

// Вешаем событие клика на кнопки "Откликнуться на вакансию" для того, чтобы запустить цепочку чата
const addListenerToAllVacancyRequestButtons = () => {
const requestButtonsArray = document.querySelectorAll(".vacancy-page__request-button");
for ( let button of requestButtonsArray ) {
	button.addEventListener("click", (event) => {
		if ( data.cabinet ) {
			showMainMessage(
				`
					<div class="main-message-template-style__message">
						У вас вже є створена заявка. У разі подачі повторної заявки попередня буде видалена
					</div>
					<button id="100_post-request-vacancy-page" class="route-button main-message-template-style__width route-button-main-style button-effect create-add">
						<div id="circle"></div>
						<div>Створити нову заявку</div>
					</button>
					<button class="route-button main-message-template-style__width route-button-main-style button-effect dont-create-add">
						<div id="circle"></div>
						<div>Не подавати заявку</div>
					</button>
				`);
				document.querySelector(".create-add").addEventListener("click", (e) => {
					let message = document.querySelector(".main-message-template-style");
					message.classList.add("_hidden-template");
					addQuestionsToChat();
					showTextInput();
					currentTemplateID = removeDigitsAndUnderscore(e.target.id);
					addBackButtonMechanics(e.target);
					firstEnter = false;
					includeCurrentTemplate(currentTemplateID);
					hiddenOrShowFooter();
					scrollToTop();
				})
				document.querySelector(".dont-create-add").addEventListener("click", () => {
					let message = document.querySelector(".main-message-template-style");
					message.classList.add("_hidden-template");
				})
		} else {
			addQuestionsToChat();
			showTextInput();
			currentTemplateID = removeDigitsAndUnderscore(event.target.id);
			addBackButtonMechanics(event.target);
			firstEnter = false;
			includeCurrentTemplate(currentTemplateID);
			hiddenOrShowFooter();
			scrollToTop();
		}
		
	})
}
}
addListenerToAllVacancyRequestButtons()

// Cписок основных вопросов
const questionsArray = [
	`Добрий день. Будь-ласка, вкажіть ваші ім'я та прізвище:`,
	`Вкажіть актуальний номер телефону для зв'язку:`,
	`Вкажіть місто проживання:`,
	`Вкажіть дату народження:`,
	`Додайте резюме у форматі .docx або .pdf:`
]

// Финальное сообщение после ответа на все вопросы
const finalMessage = "Дякуємо за відповіді! Перевір, будь ласка, правильність введених даних і можеш відправляти заявку :)"
// Отримуємо список додаткових питань
let additionalQuestionsWithAnswers; // Змінна, в яку ми записємо дані у новому формати (питання + відповіді) для подальшщої обробки
let additionalQuestions; // Змінна, в яку ми записуємо дані у старому форматі (тільки питання)
let withAnswers = true;  // Если вопросы с готовыми ответами, то далее по коду устанавливается true, если вариант с свободными ответами - false
function addQuestionsToChat() {
	fetch(`${actualHost}/forms/${currentTelegramID}/${data.password}`)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
	// 	data = {
	// 		"q1": {
	// 				"a": "Ігнорую і не втручаюся",
	// 				"b": "Критикую його при всіх за негативну поведінку",
	// 				"c": "У приватній розмові обоговорюю неприйнятну поведінку та допомагаю знайти шляхи рішення",
	// 				"point": "b",
	// 				"question": "Як реагуєш, якщо хтось у команді поводить себе безвідповідально або негативно?"
	// 		},
	// 		"q2": {
	// 				"a": "Приймаю самостійно всі рішення, не раджусь ні з ким",
	// 				"b": "Раджусь з командою, щоб знайти краще рішення",
	// 				"c": "Чекаю, що відповідальність візьме на себе хтось інший",
	// 				"point": "b",
	// 				"question": "У тебе спільний проєкт/завдання з колегами. Твої дії?"
	// 		},
	// 		"q3": {
	// 				"a": "Ігнорую ідеї інших",
	// 				"b": "Підтримую ініціативу, якщо вона співпадає з моїми власними ідеями",
	// 				"c": "Підтримую ініціативу і сприяю її втіленню, незалежно від відповідності моїм власним ідеям",
	// 				"point": "c",
	// 				"question": "Як ти сприймаєш ініціативу від інших членів команди?"
	// 		},
	// 		"q4": {
	// 				"a": "Шукати спільне рішення, яке влаштує всіх",
	// 				"b": "Я не приймаю участі в конфліктах",
	// 				"c": "Переконати інших у своїй правоті",
	// 				"point": "a",
	// 				"question": "Якщо погляди колег відрізняються від ваших, що ти робиш?"
	// 		},
	// 		"q5": {
	// 				"a": "Ігнорую, якщо вони відрізняються від моїх",
	// 				"b": "Враховую їх та використовую щоб знайти краще рішення",
	// 				"c": "Вислухаю, але зроблю так як вирішив до цього",
	// 				"point": "b",
	// 				"question": "Як ти ставишся до думок та ідей інших членів команди?"
	// 		}
	// };

	// Формируем вопросы в обьект в старом формате
	let dataKeys = Object.keys(data);
	let questionsObject = { forms: {} };
	for ( let i = 0; i < Object.keys(data).length; i++ ) {
		questionsObject.forms[`${dataKeys[i]}`] = data[`${dataKeys[i]}`]['question'];
	}
	additionalQuestions = questionsObject;

	// Записываем данные (вопросы с ответами) в глобальную переменную
	additionalQuestionsWithAnswers = data;

	// Добавляем нужное количество свойств в обьект, который отправляется на бэк
	addAdditionalQuestionsToMainPostObject(additionalQuestions, postVacancyObject);
	// Запись дополнительных вопросов в массив с вопросами для проверочной страницы
	addAdditionalQuestionsToMainCheckQuestionsArray(additionalQuestions, checkQuestionsArray);

	if ( data.q1.point === null ) {
		withAnswers = false;
	} else if ( data.q1.point !== null ) {
		withAnswers = true;
	} else {
		setTimeout(function() {
			addQuestionsToChat()
		}, 2000)
	}

	// Обработка данных, передача их в общий массив с вопросами
	return addAdditionalQuestionsToMainQuestionsArray(additionalQuestions, questionsArray);
	})
	.then (array => {
		// Активируем функционал последовательного добавления вопросов в чат по мере записи ответов для появления первого вопроса
		addMessagesAfterUserAnswers(array);
	})
	// .catch(error => { console.error('Fetch error:', error); });
}
// Функционал последовательного добавления вопросов в чат по мере записи ответов
const addMessagesAfterUserAnswers = (questionsArray) => {
	// console.log("questionsCounter", questionsCounter)
	// console.log("fixedQuestionsCounter", fixedQuestionsCounter)
	// console.log("answersCounter", answersCounter)
	// console.log("allQuestionsCounter", allQuestionsCounter)
	// console.log("questionsCounter+1", questionsCounter+1)
	// console.log("fixedQuestionsCounter", fixedQuestionsCounter)
	// console.log("questionsCounter+1 > fixedQuestionsCounter", questionsCounter+1 > fixedQuestionsCounter) 
	// console.log("questionsCounter-1 === answersCounter", questionsCounter-1 === answersCounter)
	// console.log("questionsArray[questionsCounter-1]", questionsArray[questionsCounter-1])
	// console.log("questionsArray[questionsCounter+1]", questionsArray[questionsCounter+1])
	// console.log("questionsArray[questionsCounter]", questionsArray[questionsCounter])

	if ( answersCounter === questionsCounter && questionsArray[questionsCounter+1] !== undefined ) {
		// Если мы не используем готовые варианты ответов, то тогда просто записываем вопрос в чат
		if ( withAnswers === false ) {
			addMessageToChat(questionsArray[questionsCounter+1]);
		// Если мы используем готовые варианты ответов, то вызываем функцию, которая добавляет в чат вопрос и варианты ответов
		} else if ( withAnswers === true ) {
			// Здесь будет функция добавления вопроса с вариантами ответов
			addMessageAndAnswersToChat(questionsArray[questionsCounter+1])
		}
	} else if ( questionsCounter === answersCounter && questionsArray[questionsCounter] !== undefined ) {
		addFinalMessageAfterAnswers(finalMessage)
	}
	questionsCounter++;
}

// console.log(questionsCounter)
// console.log(fixedQuestionsCounter)
// console.log(answersCounter)
// console.log(allQuestionsCounter)
// console.log("questionsCounter+1", questionsCounter+1)
// console.log("fixedQuestionsCounter", fixedQuestionsCounter)
// console.log( questionsCounter+1 > fixedQuestionsCounter ) 

// -------------------------------------------------------------------------------------------------- Функции валидации в чате

// Удаление всех сообщний об ошибке
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
// Сообщение при неправильной валидации имени
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
	if ( findAge(formattedDate) < 18 ) {
		hiddenCalendarInput();
		return findAge(formattedDate);
	} else {
		return "condition"
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
// Сообщение при ошибках валидации даты рождения (неправильный формат данных)
const errorValidateBirthdayFormat = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Неправильний формат даних</div>
		</div>
	`);
	scrollChatToBottom();
}
// Ошибка валидации даты рождения и предложение записи в резерв, если кандидату менне 18 лет
const errorValidateBirthdayAge = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="error-style-age">
				Привіт! 
				<strong>Цінуємо твоє бажання долучитись до команди Аврори!</strong>
				<br>
				<p>
				Та, на жаль, на цю вакансію ми не розглядаємо кандидатів молодше 18 років.
				Ми б хотіли зберегти твоє резюме у базі кандидатів на майбутнє 😉
				Якщо ти хочеш поділитись з нами своїм резюме, натисни «Потрапити в базу».
				Коли у нас зʼявляться вакансії для тебе - ми з тобою зв’яжемось!
				</p>
				<br>
				<p>
				Якщо у тебе лишились додаткові питання, телефонуй:
				+380675039118  Анастасія.
				</p>
				<br>
				Твоя Аврора мультимаркет 💛
			</div>
			<div class="error-message-age-button">
				Потрапити в базу
			</div>
		</div>
	`);
	scrollChatToBottom();
	addListenerToButtonGetIntoTheDatabase();
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
// Сообщение при неправаильном расширении файла
const errorValidateFileFormat = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Неправильний формат резюме. Розширення файлу має бути .docx або .pdf</div>
		</div>
	`);
	scrollChatToBottom();
}
// Сообщение, если вес файла превышает 5 мб
const errorValidateFileSize = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element main-error-style__container">
			<div class="main-error-style">Розмір файлу не повинен перевищувати 5 МБ</div>
		</div>
	`);
	scrollChatToBottom();
}

// -------------------------------------------------------------------------------------------------- Добавление вопросов в чат

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
	chatInput.blur();
	document.querySelector(".header").classList.toggle("red-header");
})
// При клике в любом месте кроме кнопки и инпута
document.addEventListener("click", (event) => {
	if ( event.target !== chatInput && event.target !== sendMessageButton ) {
		chatInput.blur();
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
		addUserMessageToChat(chatInput.value);
		addPhoneAnswerBlock();
		addBirthDateAnswerBlock();
		addResumeBlock();
	} else if ( questionsCounter+1 > fixedQuestionsCounter && answersCounter < allQuestionsCounter || questionsCounter+1 === fixedQuestionsCounter ){
		addUserAnswers(chatInput.value);
		addMessagesAfterUserAnswers(questionsArray)
		checkFinalAnswerMessage();
		addResumeBlock();
		
		// console.log("questionsCounter", questionsCounter)
		// console.log("fixedQuestionsCounter", fixedQuestionsCounter)
		// console.log("answersCounter", answersCounter)
		// console.log("allQuestionsCounter", allQuestionsCounter)
		// console.log("questionsCounter+1", questionsCounter+1)
		// console.log("fixedQuestionsCounter", fixedQuestionsCounter)
		// console.log("questionsCounter+1 > fixedQuestionsCounter", questionsCounter+1 > fixedQuestionsCounter) 
		// console.log("questionsCounter-1 === answersCounter", questionsCounter-1 === answersCounter)
		// console.log("questionsArray[questionsCounter-1]", questionsArray[questionsCounter-1])
		// console.log("questionsArray[questionsCounter+1]", questionsArray[questionsCounter+1])
		// console.log("questionsArray[questionsCounter]", questionsArray[questionsCounter]);
		// console.log("current quetion", questionsArray[questionsCounter+1]);
		// console.log("questionsArray", questionsArray)
		if ( withAnswers === false ) {
			if ( validateAdditionalAnswers(chatInput.value) )
			addUserMessageToChat(chatInput.value);
			writeAnswerToPostDataObject();
			addUserFreeAnswerToPostVacancyObject(questionsArray[questionsCounter-1], chatInput.value);
		} else {}
	}
	chatInput.value = "";
	deleteErrorMessagesInChat();
}
// Записываем ответ пользователя в случае свободного ответа
const addUserFreeAnswerToPostVacancyObject = (currentQuestion, inputValue) => {
	let currentQuestionKey = `q${(questionsCounter)-fixedQuestionsCounter}`; // Текущий ключ вопроса (Например q1)
	postVacancyObject[`${currentQuestionKey}`] = {
		[`${currentQuestion}`]: `${inputValue}`,
		point: null
	};
}
// Проверяем, когда появляется предложение добавить резюме
const addResumeBlock = () => {
	if ( objectKeys[questionsCounter] === "cv"  ) {
		function delayedFunction() {
			scrollChatToBottom();
			addResumeField();
		}
		setTimeout(delayedFunction, 900);
	}
}
// Добавляем поле для выбора файла
const addResumeField = () => {
	hiddenTextInput();
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="add-resume-container phone-buttons-show-animations">
			<input class="input-hidden add-resume-input" type="file" id="fileInput" accept=".pdf, .docx">
			<button class="add-resume-file-button">
				<span class="add-resume-choose-image"></span>
				<span class="hidden-file-buttons"></span>
				<div class="add-resume-choose-text">Вибрати файл</div>
			</button>
			<div class="save-delete-resume-buttons-container">
				<button class="delete-resume-button hidden-file-buttons">
					<span class="red-cross">×</span>
					Видалити
				</button>
				<button class="save-resume-button hidden-file-buttons">
					<span class="green-check-mark">✔</span>
					Зберегти
				</button>
			</div>
			<button class="skip-resume-button">Пропустити</button>
		</div>
	`);
	scrollChatToBottom();
	addUploadFileCode();
	document.querySelector(".save-resume-button").addEventListener("click", () => {
		addMessageInChatAfteraddedFile();
		saveFiledataAndContinueChat();
	})
	document.querySelector(".skip-resume-button").addEventListener("click", () => {
		continueFileButton();
	})
}
// Подключаем поля и кнопки для манипуляций и загрузки файла на сервер
const addUploadFileCode = () => {
	let fileInput = document.querySelector('.add-resume-input');
	let fileButton = document.querySelector('.add-resume-file-button');

	fileButton.addEventListener('click', function() {
		fileInput.click();
	});


	fileInput.addEventListener('change', function(event) {
			
		if ( event.target.files[0] ) {
			let file = event.target.files[0];
			let fileName = event.target.files[0].name;
			let fileExtension = fileName.split('.').pop().toLowerCase();
			const fileSizeInBytes = file.size;
			const fileSizeInKB = fileSizeInBytes / 1024;
			const formates = ["pdf", "docx"]; // Допустимые форматы для загрузки

			removeDeleteAndSaveButtons(document.querySelector(".delete-resume-button"), fileInput);
			if ( file && fileExtension === "docx" && fileSizeInKB <= 5000 || file && fileExtension === "pdf" && fileSizeInKB <= 5000 ) {
				addPreloaderInChat();
				addWhitePreloaderBackground();
				deleteErrorMessagesInChat();
				createBase64StringAndWriteFileDataToObject(fileName, file)
				.then(result => {
					removePreloaderInChat();
					removeWhitePreloaderBackground();
					postVacancyObject.cv = {file_name:`${result.fileName}`,file_data:`${result.fileInBase64String}`};
					addDeleteAndSaveButtons(fileName);
				})
				.catch(error => {
					console.error("Произошла ошибка:", error);
				});

			} else if ( formates.indexOf(fileExtension) === -1 ) {
				deleteErrorMessagesInChat();
				errorValidateFileFormat();
			} else if ( fileSizeInKB > 5000 ) {
				deleteErrorMessagesInChat();
				errorValidateFileSize();
			}
		}
	});
}

const createBase64StringAndWriteFileDataToObject = (nameData, file) => {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = function(e) {
            let fileInBase64String = e.target.result;
            let fileName = nameData;
            let result = { fileInBase64String, fileName };
            resolve(result);
        }
        reader.onerror = function(e) {
            reject(e);
        }
        reader.readAsDataURL(file); // Используем readAsDataURL для получения файла в формате base64
    });
}

// Добавляем прелоадер до момента, пока не подгрузились кнопки направлений
const addPreloaderInChat = () => {
	let preloaderContainer = document.querySelector(".preloader-in-widget");
	setTimeout(function() {
		preloaderContainer.classList.remove("preloader-hidden");
	}, 200)
}
// Удаляем прелоадер после момента, когда уже подгрузились вакансии
const removePreloaderInChat = () => {
	let preloaderContainer = document.querySelector(".preloader-in-widget");
	setTimeout(function() {
		preloaderContainer.classList.add("preloader-hidden");
	}, 250)
}
// Добавляем белую подкладку под прелоадер
const addWhitePreloaderBackground = () => {
	document.querySelector("body").insertAdjacentHTML("afterbegin", `<div class="preloader-opacity-background"></div>`);
}
// Удаляем белую подкладку под прелоадер
const removeWhitePreloaderBackground = () => {
	document.querySelector(".preloader-opacity-background").remove();
}

// Появление кнопок удаления и сохранения после добалвения файла. Скрываем кнопку "Пропустить"
const addDeleteAndSaveButtons = (fileName) => {
	if ( fileName ) {
		document.querySelector(".delete-resume-button").classList.remove("hidden-file-buttons");
		document.querySelector(".save-resume-button").classList.remove("hidden-file-buttons");
		document.querySelector(".skip-resume-button").classList.add("hidden-file-buttons");
		document.querySelector(".add-resume-choose-text").innerText = `${fileName}`;
		document.querySelector(".add-resume-choose-image").classList.add("hidden-file-buttons");
		// document.querySelector(".add-resume-file-image").classList.remove("hidden-file-buttons");
	} else {
		removeDeleteAndSaveButtons(document.querySelector(".delete-resume-button"));
	}
}
// Появление кнопки "Пропустить" и удаление кнопок "Удалить" и "Сохранить". Функционал удаления файла
const removeDeleteAndSaveButtons = (deleteButton, fileInput) => {
	deleteButton.addEventListener("click", () => {
		document.querySelector(".delete-resume-button").classList.add("hidden-file-buttons");
		document.querySelector(".save-resume-button").classList.add("hidden-file-buttons");
		document.querySelector(".skip-resume-button").classList.remove("hidden-file-buttons");
		document.querySelector(".add-resume-choose-text").innerText = "Вибрати файл";
		// document.querySelector(".add-resume-choose-image").classList.remove("hidden-file-buttons");
		// document.querySelector(".add-resume-file-image").classList.add("hidden-file-buttons");
		currentFile = {};
		fileInput.value = '';
	})
}
// Нажатие кнопки "Сохранить"
const saveFiledataAndContinueChat = () => {
	document.querySelector(".add-resume-container").classList.add("hidden-file-buttons");
	answersCounter++;
	addMessagesAfterUserAnswers(questionsArray);
	scrollChatToBottom();
}
// Нажатие кнопки "Пропустить"
const continueFileButton = () => {
	document.querySelector(".add-resume-container").classList.add("hidden-file-buttons");
	addMessageInChatAfterClickOnMissButton();
	answersCounter++;
	addMessagesAfterUserAnswers(questionsArray);
	scrollChatToBottom();
	currentFile = {};
}
// Добавление сообщения в чат после добавления файла
const addMessageInChatAfteraddedFile = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element user-message__container">
			<div class="main-message-style user-message">
				Файл з резюме додано до анкети
			</div>
		</div>
	`)
}
// Добавление сообщения в чат после нажатия кнопки "Пропустить" на шаге файла
const addMessageInChatAfterClickOnMissButton = () => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
	<div class="post-request-vacancy-page__message-element user-message__container">
		<div class="main-message-style user-message">
			Крок пропущено
		</div>
	</div>
	`)
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
	if ( validateBirthday(dateInput.value) === "condition" ) {
		deleteErrorMessagesInChat();
		writeActualBirthDate(dateInput.value);
		addUserMessageToChat(formateDate(dateInput.value));
		hiddenCalendarInput();
		answersCounter++;
		function delayedFunction() {
			addMessagesAfterUserAnswers(questionsArray);
			scrollChatToBottom();
			addResumeBlock();
		}
		setTimeout(delayedFunction, 300);
	} else if ( validateBirthday(dateInput.value) < 18 ) {
		errorValidateBirthdayAge();
	} else {}
})
dateInput.addEventListener("keyup", (event) => {
	if ( event.key === "Enter" ) {
		if ( validateBirthday(dateInput.value) === "condition" ) {
			deleteErrorMessagesInChat();
			writeActualBirthDate(dateInput.value);
			addUserMessageToChat(formateDate(dateInput.value));
			hiddenCalendarInput();
			answersCounter++;
			function delayedFunction() {
				addMessagesAfterUserAnswers(questionsArray);
				scrollChatToBottom();
				addResumeBlock();
			}
			setTimeout(delayedFunction, 300);
		} else if ( validateBirthday(dateInput.value) < 18 ) {
			errorValidateBirthdayAge();
		} else {}
	}
})
// Функционал при клике на кнопку "Потрапити в базу" если кандидату менее 18 лет
const addListenerToButtonGetIntoTheDatabase = () => {
	const button = document.querySelector(".error-message-age-button");
	button.addEventListener("click", () => {
		reserveBranch = true;
		deleteErrorMessagesInChat();
			writeActualBirthDate(dateInput.value);
			addUserMessageToChat(formateDate(dateInput.value));
			hiddenCalendarInput();
			answersCounter++;
			function delayedFunction() {
				addMessagesAfterUserAnswers(questionsArray);
				scrollChatToBottom();
				addResumeBlock();
			}
			setTimeout(delayedFunction, 300);
	})
}
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
					<button class="route-button route-button-main-style actual-number-button">
						<div id="circle"></div>
						<div>Так, ${dataPhone} - це актуальний номер</div>
					</button>
					<button class="route-button route-button-main-style no-actual-number-button">
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
	// document.querySelector(".post-request-vacancy-page__input").focus();
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
	const allVariansInChat = document.querySelectorAll(".question-variant");
	for ( let item of allVariansInChat ) {
		item.remove()
	}
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	hiddenTextInput();
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
		downloadPolitics();

		const addListenerToAllRouteButtonsFinalMessage = () => {
			if (document.querySelector(".final-message__button")) {
				const finalButton = document.querySelector(".final-message__button");
					// Отменяем всплытие и задаем событие при клике на дочерние элементы
					finalButton.addEventListener("click", (e) => {
						currentTemplateID = removeDigitsAndUnderscore(e.target.id);
						includeCurrentTemplate(currentTemplateID);
						hiddenOrShowFooter();
						scrollToTop();
						templatesRoad.push("check-request-vacancy-page");
					})

			}
		}
		addListenerToAllRouteButtonsFinalMessage();

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
	scrollChatToBottom();
	document.querySelector(".final-message__container").classList.add("show-final-message");
	document.querySelector(".final-message__container").classList.remove("input-hidden");
	document.querySelector(".final-message__container").classList.add("input-visible");
}
// Функционал обновления счетчика при добавлении ответа + вызов функции для добавления ответа в чат + вызов функции для деактивации инпута
const addUserAnswers = (userMessageText) => {
	inactiveInput();
	inactiveMessageButton();
	answersCounter++;
}
//Прокручиваем содержимое в самый низ
function scrollChatToBottom() {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.scrollTo(0, chatMessagesBlock.scrollHeight);
}
// Общая функция для добавления сообщения в чат. Текст сообщения передаем в качестве аргумента
function addUserMessageToChat(userMessage) {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element user-message__container">
			<div class="main-message-style user-message">${userMessage}</div>
		</div>
	`);
}
// Вставляем вопрос без вариантов ответа в чат и вызываем функцию активации инпута
function addMessageToChat(question) {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	function delayedFunction() {
		chatMessagesBlock.insertAdjacentHTML("beforeend", `
		<div class="post-request-vacancy-page__message-element app-message__container bot-message-animation">
			<div class="main-message-style app-message">${question}</div>
		</div>
	`);
	}
	showTextInput();
	setTimeout(delayedFunction, 1);
	function onInput() {
		activeInput();
		activeMesssageButton();
		scrollChatToBottom();
	}
	setTimeout(onInput, 800);
}
// Вставляем вопрос с вариантами ответа в чат и не вызываем функцию активации инпута, так как инпут не нужен
const addMessageAndAnswersToChat = (currentQuestion) => {
	const chatMessagesBlock = document.querySelector(".post-request-vacancy-page__messages-container");
	if ( questionsCounter+2 > fixedQuestionsCounter || questionsCounter+1 > fixedQuestionsCounter ) {
		let a = "";
		let b = "";
		let c = "";
		for ( let i = 0; i < Object.keys(additionalQuestionsWithAnswers).length; i++ ) {
			let currentQ = Object.keys(additionalQuestionsWithAnswers)[i];
			if ( additionalQuestionsWithAnswers[currentQ].question === currentQuestion ) {
				a = additionalQuestionsWithAnswers[currentQ].a;
				b = additionalQuestionsWithAnswers[currentQ].b;
				c = additionalQuestionsWithAnswers[currentQ].c;
			}
		}
		const allVariansInChat = document.querySelectorAll(".question-variant");
		for ( let item of allVariansInChat ) {
			item.remove()
		}
		const addQuestionWithAnswers = (currentQuestion, a, b, c) => {
			chatMessagesBlock.insertAdjacentHTML("beforeend", `
				<div class="post-request-vacancy-page__message-element app-message__container bot-questions-message-animation">
					<div class="answers-variants-container">
						<div class="variants-question main-message-style">${currentQuestion}</div>
						<div class="answers-to-quetion-container">
							<div variant="a" class="main-message-style question-variant"><span>Варіант 1:</span> ${a}</div>
							<div variant="b" class="main-message-style question-variant"><span>Варіант 2:</span> ${b}</div>
							<div variant="c" class="main-message-style question-variant"><span>Варіант 3:</span> ${c}</div>
						</div>
					</div>
				</div>
			`);
		}
		addQuestionWithAnswers(currentQuestion, a, b, c);
		addListenerToAnswers(currentQuestion);
	} else {
		addMessageToChat(currentQuestion)
	}
}
// Проходимся по всем варинатам ответа и навешиваем на каждый из них событие клика
const addListenerToAnswers = (currentQuestion) => {
	const allVariants = document.querySelectorAll(".question-variant");
	for ( let item of allVariants ) {
		item.addEventListener("click", (event) => {
			// Вызов функции для включения следующего вопроса
			// Вызов функции для получения балла и дальнейшей обработки
			let currentVariant = event.target.getAttribute("variant"); // Текущий вариант ответа (а, b, с)
			let currentAnswer = event.target.textContent.slice(11); // Актуальный ответ, на который кликнул пользователь (с вырезанным текстом "Вариант 1: ")
			let currentQuestionKey = `q${(questionsCounter+1)-fixedQuestionsCounter}`; // Текущий ключ вопроса (Например q1)
			// Вызываем функцию, в которую передаем 4 аргумента: номер вопроса (например q1), point (0 или 1), текущий вопрос и текущий ответ
			addUserMessageToChat(event.target.textContent);
			writeAnswerToPostDataObject(currentQuestionKey, getCurrentPointAfterClickToAnswer(currentVariant, currentQuestion), currentQuestion, currentAnswer);
		})
	}
}
// Получаем текущий балл при клике на конкретный вопрос
const getCurrentPointAfterClickToAnswer = (currentVariant, currentQuestion) => {
	let correctCurrentVariant;
	if ( withAnswers === true ) {
		for ( let i = 0; i < Object.keys(additionalQuestionsWithAnswers).length; i++ ) {
			let currentQ = Object.keys(additionalQuestionsWithAnswers)[i];
			if ( additionalQuestionsWithAnswers[currentQ].question === currentQuestion ) {
				correctCurrentVariant = additionalQuestionsWithAnswers[currentQ].point;
			}
		}
		addAnswersAndQuestionsToChat();
		// Если ответ совпадает с правильным вариантом, то
		if ( currentVariant === correctCurrentVariant ) {
			return 1
		// Если ответ не совпадает с правильным вариантом, то 
		} else {
			return 0
		}
	} else if ( withAnswers === false ) {
		return "null"
	}

}
// Записываем в финальный объект ответы на вопросы
const writeAnswerToPostDataObject = (currentQuestionKey, point, currentQuestion, currentAnswer) => {
	if ( withAnswers === true ) {
		postVacancyObject[`${currentQuestionKey}`] = {
			[currentQuestion]: `${currentAnswer}`,
			point: point
		};
	} else {
		
	}
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
// Добавляем в обьект для постинга нужное количество ключей
const addAdditionalQuestionsToMainPostObject = (questionsObject, objectToWrite) => {
	for (var key in questionsObject.forms) {
		allQuestionsCounter++; // Добавляем +1 в счетчик общего количество вопросов
		if (key.startsWith('q')) {
			objectToWrite[`${key}`] = "";
		}
	}
}
// Удаление дополнительных вопросов из массива questionsArray при выходе из чата или страницы проверки ответов
const deleteAdditionalQuestionsInQuestionsArray = () => {
	questionsArray.splice(-Object.keys(additionalQuestions.forms).length);
}

// ------------------------------------------------------------------------------------------------ Логика для страницы проверки введенных данных

// Список вопросов для проверочной страницы
let checkQuestionsArray = [
	`Ім'я та прізвище:`,
	`Номер телефону для зв'язку:`,
	`Місто проживання:`,
	`Дата народження:`,
	`fileName`
]

// Добавляем список дополнительных вопросов в основной спысок проверочных вопросов
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
	if ( reserveBranch === false ) {
		checkPageMainContainer.insertAdjacentHTML("beforeend", `
			<div class="check-request-vacancy-page__check-item">
				<div class="check-request-vacancy-page__question-input-container">
					<div class="check-request-vacancy-page__check-question vacancy-title-on-check-page"> Назва вакансії:</div>
					<div type="text" class="check-request-vacancy-page__check-input vacancy-check-title">${currentVacancyTitle}</div>
				</div>
			</div>
		`)
	} else if ( reserveBranch === true ) {
		checkPageMainContainer.insertAdjacentHTML("beforeend", `
			<div class="check-request-vacancy-page__check-item">
				<div class="check-request-vacancy-page__question-input-container">
					<div class="check-request-vacancy-page__check-question vacancy-title-on-check-page">Назва вакансії:</div>
					<div type="text" class="check-request-vacancy-page__check-input vacancy-check-title">Резерв</div>
				</div>
			</div>
		`)
	}
	for ( let i = 0; i < Object.keys(postVacancyObject).length-1; i++ ) {
		if ( i < fixedQuestionsCounter && checkQuestionsArray[i] !== "fileName" ) {
			checkPageMainContainer.insertAdjacentHTML("beforeend", `
				<div class="check-request-vacancy-page__check-item">
					<div data-key="${Object.keys(postVacancyObject)[i+1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">
						<div class="check-request-vacancy-page__check-question"> 
						<span class="green-check-mark">✔</span>
						<span class="red-cross _hidden-icon">×</span> ${checkQuestionsArray[i]}</div>
						<input disabled value="${postVacancyObject[Object.keys(postVacancyObject)[i+1]]}" type="text" class="check-request-vacancy-page__check-input">
					</div>
					<button class="check-request-vacancy-page__edit-button">
						<span class="check-request-vacancy-page__edit-button-image edit-icon">&#9998;</span>
					</button>
				</div>
			`)
		} else if ( checkQuestionsArray[i] === "fileName" ) {
		} else {
			// let objectElement = postVacancyObject[Object.keys(postVacancyObject)[i+1]];
			// let objectElementAnswer = objectElement[Object.keys(objectElement)[0]];
			// checkPageMainContainer.insertAdjacentHTML("beforeend", `
			// 	<div class="check-request-vacancy-page__check-item">
			// 		<div data-key="${Object.keys(postVacancyObject)[i+1]}" class="check-request-vacancy-page__question-input-container inactive-input-container-border">
			// 			<div class="check-request-vacancy-page__check-question"> <span class="icon-check green-check-mark"></span> <span class="icon-cross red-cross _hidden-icon"></span> ${checkQuestionsArray[i]}</div>
			// 			<textarea disabled type="text" class="check-request-vacancy-page__check-input check-textarea">${objectElementAnswer}</textarea>
			// 		</div>
			// 		<button class="check-request-vacancy-page__edit-button">
			// 			<span class="icon-edit check-request-vacancy-page__edit-button-image edit-icon"></span>
			// 		</button>
			// 	</div>
			// 	`
			// )
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
				//writeNewDataToPostVacancyObject(item);
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
/*
const writeNewDataToPostVacancyObject = (button) => {
	console.log("edit")
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
*/

// Перезаписываем данные в финальном обьекте уже на стадии отправки запроса
const writeNewDataToPostVacancyObject = () => {
	const allCheckFields = document.querySelectorAll(".check-request-vacancy-page__check-item");
	for ( let item of allCheckFields ) {
		if ( item.firstElementChild.hasAttribute("data-key") ) {
			for ( let elem of Object.keys(postVacancyObject) ) {
				if ( item.firstElementChild.getAttribute("data-key") === elem ) {
					const newValue = item.firstElementChild.lastElementChild.value;
					postVacancyObject[`${elem}`] = newValue;
				}
			}
		}
	}
}
// Проверяем, активен ли чекбокс
const checkActiveCheckbox = () => {
 let checkbox = document.querySelector(".check-request-vacancy-page__politics-input");
 if ( checkbox.checked ) {
	return true
 } else {}
}
// Показываем сообщение о том, что нужно поставить галочку
const noCheckActiveCheckboxMessage = () =>{
	let message = document.querySelector(".check-request-vacancy-page__politics-message");
	message.classList.remove("_hidden");
}
// Добавляем прослушиватель на чекбокс политики конфиденциальности
const addListenerToPoliticsCheckbox = () => {
	let checkbox = document.querySelector(".check-request-vacancy-page__politics-input");
	let message = document.querySelector(".check-request-vacancy-page__politics-message");
	checkbox.addEventListener("click", () => {
		if ( checkbox.checked ) {
			message.classList.add("_hidden");
		}
	})
}
addListenerToPoliticsCheckbox()
// Вешаем событие на кнопку отправки заявки
const sendObjectDataToServer = () => {
	const checkRequestVacancyButton = document.querySelector(".check-request-vacancy-page__request-button");
	checkRequestVacancyButton.addEventListener("click", () => {
		console.log(postVacancyObject)
		if ( checkActiveCheckbox() === true ) {
			writeNewDataToPostVacancyObject();
			fetchPostData(postVacancyObject, currentVacancyID)
		} else {
			noCheckActiveCheckboxMessage();
		}
	})
}
sendObjectDataToServer();
// Добавляем в обьект для отправки  на бэк поле, содержащее информацию о резюме
// const addCVObjectToMainObject = (cvObject) => {
// 	cvObject.cv = {};
// 	return cvObject
// }
// Отправка заявки на вакансию с анкетой кандидата (вызывается при клике на кнопку)
const validateAllFieldsOnCheckPage = (name, phone, city, birthday) => {
	if ( !validateBirthdayOnCheckPage(birthday) || !validatePhoneOnCheckPage(phone) || !validateCity(city) || !validateName(name) || findAgeOnCheckPage(birthday) < 18 ) { 
		return false 
	} else {
		return true
	}
}

function fetchPostData(objectData, vacancyID) {

	let apiPostDataURL = "";
	if ( reserveBranch === false ) {
		apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/${vacancyID}`;
	} else if ( reserveBranch === true ) {
		apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/reserve`;
		currentVacancyTitle = "Резерв";
	}
	// Данные POST запроса
	// const data = addCVObjectToMainObject(objectData);
	const data = objectData;
	objectData.kind = currentVacancyKind.toLowerCase();
	// objectData.cv = currentFile;
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data) // Перетворюємо дані у JSON-рядок
	};


	// Відправляємо POST-запит за допомогою Fetch API
	if ( validateAllFieldsOnCheckPage(data.name, data.feedback_phone, data.city, data.birthday) ) {
		addWhitePreloaderBackground();
		addPreloaderInChat();

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
				removePreloaderInChat();
				addWhitePreloaderBackground();
				showMainMessage(
				`
					<div class="main-message-template-style__message">
						Заявка успішно надіслана. Перевірити статус, свої анкетні дані, або відкликати заявку ви можете в особистому кабінеті
					</div>
					<button class="route-button main-message-template-style__home-button route-button-main-style button-effect">
						<div id="circle"></div>
						<div>Зрозуміло</div>
					</button>
				`);
		})
		.catch(error => {
			console.error('Помилка під час виконання POST-запиту:', error);
			showMainMessage(errorMessage);
		});
	} else {}


}
// Очищаем массив проверочных вопросов на странице проверки при выходе из чата или страницы проверки ответов
const clearCheckQuestionsArray = () => {
	checkQuestionsArray = [];
	checkQuestionsArray = [
		`Ім'я та прізвище:`,
		`Номер телефону для зв'язку:`,
		`Місто проживання:`,
		`Дата народження:`,
		`fileName`
	]
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
// Вызываем сообщение о том, указывая в нем нужный текст и добавляя кнопки
const showMainMessage = (messageText) => {
	let message = document.querySelector(".main-message-template-style");
	message.classList.remove("_hidden-template");
	document.querySelector(".main-message-template-style__wrapper").innerHTML = `${messageText}`;
	showMessageAnimation(); // Вызываем анимацию
	if ( document.querySelector(".main-message-template-style__home-button") ) {
		reloadPageAfterClickHomeButton() // Событие клика по кнопке
	}
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
		if ( data.cabinet.title === "Хочу бути номер 1" ) {
			cabinetWrapper.insertAdjacentHTML("beforeend", `
				<div class="cabinet-page__item">
					<div class="cabinet-page__item-name">Назва вакансії:</div>
					<div class="cabinet-page__item-value-vacancy" data-item="title">Резерв</div>
				</div>
			`)
		} else if ( data.cabinet.title !== "Хочу бути номер 1" ) {
			cabinetWrapper.insertAdjacentHTML("beforeend", `
				<div class="cabinet-page__item">
					<div class="cabinet-page__item-name">Назва вакансії:</div>
					<div class="cabinet-page__item-value-vacancy" data-item="title">${data.cabinet.title}</div>
				</div>
			`)
		}
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Ім'я та прізвище:</div>
				<div class="cabinet-page__item-value cabinet-page__item-value-name" data-item="name">${data.cabinet.name}</div>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Телефон:</div>
				<div class="cabinet-page__item-value cabinet-page__item-value-phone" data-item="phone">${data.cabinet.feedback_phone}</div>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Місто:</div>
				<div class="cabinet-page__item-value cabinet-page__item-value-city" data-item="city">${data.cabinet.city}</div>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
			<div class="cabinet-page__item">
				<div class="cabinet-page__item-name">Дата народження:</div>
				<div class="cabinet-page__item-value cabinet-page__item-value-birthday" data-item="birthday">${data.cabinet.birthday}</div>
			</div>
		`)
		cabinetWrapper.insertAdjacentHTML("beforeend",`
		<div class="cabinet-page__item">
			<div class="cabinet-page__item-name">Статус заявки:</div>
			<div class="cabinet-page__item-value cabinet-page__item-value-birthday" data-item="birthday">${currentStatus}</div>
		</div>
	`)
	}
}

writeDataToCabinet(globalCabinet);
currentVacancyID = data.cabinet._id;
searchButtonDeleteAddDelay();
// Удаление заявки
const deleteAddInCabinet = () => {
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
		if ( validateResponseAfterDeleteAdd(data) ) {
			showMainMessage(
				`
					<div class="main-message-template-style__message">
						Ваша заявка успішно видалена
					</div>
					<button class="route-button main-message-template-style__home-button route-button-main-style button-effect">
						<div id="circle"></div>
						<div>На головну</div>
					</button>
				`);
			
		} else {
			setTimeout(function() {
				deleteAddInCabinet();
			}, 2000)
		}
	})
	.catch(error => {
		// Обрабатываем ошибки
		console.error('Fetch error:', error);
	});
}
// Вывод сообщения об удаленной заявке
function searchButtonDeleteAddDelay() {
	if ( document.querySelector(".cabinet-page__delete-button") ) {
		document.querySelector(".cabinet-page__delete-button").addEventListener("click", () => {
			deleteAddInCabinet()
		})
	} else {}
}
// Функционал кнопки "Назад"
// Добавлем в массив весь путь, по которому шел пользователь
const addBackButtonMechanics = (targetButton) => {
	let currentId = removeDigitsAndUnderscore(targetButton.id);
	if ( currentId !== 'vacancy-page' && currentId !== 'post-request-vacancy-page' ) {
		templatesRoad.push(currentId);
	} else if ( currentId.includes('post-request-vacancy-page') && !templatesRoad[templatesRoad.length - 1].includes('post-request-vacancy-page') && !templatesRoad[templatesRoad.length - 2].includes('reserve-directions-page') ) {
		templatesRoad.push(currentId);
	} else if ( currentId.includes('post-request-vacancy-page') && !templatesRoad[templatesRoad.length - 1].includes('post-request-vacancy-page') && templatesRoad[templatesRoad.length - 2].includes('reserve-directions-page') ) {
		templatesRoad.pop();
		currentTemplateID = "reserve-directions-page";
		includeLastTemplate('reserve-directions-page');
		deleteAdditionalQuestionsInQuestionsArray();
		clearCheckQuestionsArray();
	} else if ( currentId === 'vacancy-page' ) {
		let vacancyTitle = targetButton.lastElementChild.textContent;
		let uniteName = currentId + ': ' + vacancyTitle;
		templatesRoad.push(uniteName);
	}
	if ( templatesRoad[templatesRoad.length-2] === templatesRoad[templatesRoad.length-1] ) {
		templatesRoad.pop();
	}
} 
// Включам предыдущий шаблон
const backToPreviousTemplate = () => {
	if ( templatesRoad[templatesRoad.length - 1] !== 'post-request-vacancy-page' && templatesRoad[templatesRoad.length - 2] !== 'reserve-directions-page' ) {
		templatesRoad.pop();
		let lastTemplate = templatesRoad[templatesRoad.length - 1];
		includeLastTemplate(lastTemplate);
		currentTemplateID = lastTemplate;
		deleteChatContent();
	} else if ( templatesRoad[templatesRoad.length - 1] === 'post-request-vacancy-page' && templatesRoad[templatesRoad.length - 2] !== 'reserve-directions-page' ) {
		templatesRoad.pop();
		let lastTemplate = templatesRoad[templatesRoad.length - 1];
		currentTemplateID = lastTemplate;
		includeLastTemplate('vacancy-page');
		includeLastVacancyContent();
		deleteAdditionalQuestionsInQuestionsArray();
		clearCheckQuestionsArray();
		document.querySelector(".check-request-vacancy-page__items-container").innerHTML = "";
	} else if ( templatesRoad[templatesRoad.length - 1] === 'post-request-vacancy-page' && templatesRoad[templatesRoad.length - 2] === 'reserve-directions-page' ) {
		templatesRoad.pop();
		currentTemplateID = "reserve-directions-page";
		includeLastTemplate('reserve-directions-page');
		deleteAdditionalQuestionsInQuestionsArray();
		clearCheckQuestionsArray();
		document.querySelector(".check-request-vacancy-page__items-container").innerHTML = "";
	} else if ( templatesRoad[templatesRoad.length - 1] === 'check-request-vacancy-page' ) {
		clearCheckQuestionsArray();
		document.querySelector(".check-request-vacancy-page__items-container").innerHTML = "";
	}
}
// Обнуляем данные и стили чата
const deleteChatContent = () => {
	fixedQuestionsCounter = 5;
	allQuestionsCounter = 5;
	questionsCounter = -1;
	answersCounter = -1;
	document.querySelector(".post-request-vacancy-page__messages-container").innerHTML = "";
	document.querySelector(".post-request-vacancy-page__messages-container").classList.remove("padding-message-container-final");
	document.querySelector(".post-request-vacancy-page__messages-container").classList.add("padding-message-container-chat");
}
// Вешаем прослушиватель на кнопку "Назад" в чате и на странице проверки данных
const addListenerToBackButton = () => {
	const backButton = document.querySelector('.footer__button-back-link');
	backButton.addEventListener("click", () => {
		if ( currentTemplateID === 'post-request-vacancy-page' || currentTemplateID === 'check-request-vacancy-page' ) {
			showMainMessage(
			`
				<div class="main-message-template-style__message">
					Після виходу з чату ваші відповіді будуть видалені
				</div>
				<button class="route-button main-message-template-style__width route-button-main-style button-effect stay-in-chat-button">
					<div id="circle"></div>
					<div>Залишитись</div>
				</button>
				<button class="route-button main-message-template-style__width route-button-main-style button-effect back-out-chat-button">
					<div id="circle"></div>
					<div>Вийти</div>
				</button>
			`);
				document.querySelector(".stay-in-chat-button").addEventListener("click", () => {
					document.querySelector(".main-message-template-style").classList.add("_hidden-template");
				})
				document.querySelector(".back-out-chat-button").addEventListener("click", () => {
					deleteChatContent();
					document.querySelector(".main-message-template-style").classList.add("_hidden-template");
					if ( templatesRoad[templatesRoad.length - 2] === "reserve-directions-page" ) {
						includeLastTemplate("reserve-directions-page");
						templatesRoad.pop();
						currentTemplateID = templatesRoad[templatesRoad.length - 1];
					} else if ( templatesRoad[templatesRoad.length - 1] === "check-request-vacancy-page" ) {
						templatesRoad.pop();
						backToPreviousTemplate();
					} else {
						backToPreviousTemplate();
					}
				})
		} else if ( currentTemplateID === 'vacancy-page' ) {
			document.querySelector(".vacancy-page__content").innerHTML = "";
			backToPreviousTemplate();
		} else {
			backToPreviousTemplate();
		}
		hiddenOrShowFooter();
	})
}
addListenerToBackButton();

// Вешаем прослушиватель на кнопку "На головну" в чате и на странице проверки данных
// const addListenerToMainPageButton = () => {
// 	const mainButton = document.querySelector('.footer__button-main-link');
// 	mainButton.addEventListener("click", () => {
// 		if ( currentTemplateID === 'post-request-vacancy-page' || currentTemplateID === 'check-request-vacancy-page' ) {
// 			console.log("main click")
// 			showMainMessage(
// 			`
// 				<div class="main-message-template-style__message">
// 					Після виходу з чату ваші відповіді будуть видалені
// 				</div>
// 				<button class="route-button main-message-template-style__width route-button-main-style button-effect stay-in-chat-button">
// 					<div id="circle"></div>
// 					<div>Залишитись</div>
// 				</button>
// 				<button class="route-button main-message-template-style__width route-button-main-style button-effect back-out-chat-button">
// 					<div id="circle"></div>
// 					<div>Вийти</div>
// 				</button>
// 			`);
// 				document.querySelector(".stay-in-chat-button").addEventListener("click", () => {
// 					document.querySelector(".main-message-template-style").classList.add("_hidden-template");
// 				})
// 				document.querySelector(".back-out-chat-button").addEventListener("click", () => {
// 					deleteChatContent();
// 					document.querySelector(".main-message-template-style").classList.add("_hidden-template");
// 					if ( templatesRoad[templatesRoad.length - 2] === "reserve-directions-page" ) {
// 						includeLastTemplate("reserve-directions-page");
// 						templatesRoad.pop();
// 						currentTemplateID = templatesRoad[templatesRoad.length - 1];
// 					} else if ( templatesRoad[templatesRoad.length - 1] === "check-request-vacancy-page" ) {
// 						templatesRoad.pop();
// 						backToPreviousTemplate();
// 					} else {
// 						backToPreviousTemplate();
// 					}
// 				})
// 		} else {
// 			backToPreviousTemplate();
// 		}
// 		hiddenOrShowFooter();
// 	})
// }
// addListenerToMainPageButton();

// Функционал включения предыдущего шаблона
const includeLastTemplate = (currentTemplateID) => {
	// Находим все шаблоны
const allWidgetTemplates = document.querySelectorAll(".page-template");
	for ( let item of allWidgetTemplates ) {
		if ( item.id !== currentTemplateID && !firstEnter ) {
			item.classList.add("position-left-reverse");
			setTimeout(function() {
				item.classList.add("_hidden-template");
				item.classList.remove("position-left-reverse");
			}, 300);
		} else if ( item.id === currentTemplateID && !firstEnter ) {
			setTimeout(function() {
				item.classList.add("position-right-reverse");
				item.classList.remove("_hidden-template");
				setTimeout(function() {
					item.classList.remove("position-right-reverse");
				}, 100);
			}, 300);
		} else {}
	}
}
// Функционал включения шаблона вакансии с нужным контентом при клике по кнопке "Назад"
const includeLastVacancyContent = () => {
	let lastVacancyTitle = "";
	let lastVacancyContent = "";
	// Находим по id заголовок и контент текущей вакансии
	for ( let i = 0; i < globalVacancies.vacancies.length; i++ ) {
		if ( globalVacancies.vacancies[i]._id === +currentVacancyID ) {
			lastVacancyTitle = globalVacancies.vacancies[i].title;
			lastVacancyContent = globalVacancies.vacancies[i].description_html;
		}
	}
	// Вставляем контент в шаблон вакансии
	const vacancyPageTitle = document.querySelector(".vacancy-page__title");
	const vacancyPageDescription = document.querySelector(".vacancy-page__content");
	vacancyPageTitle.innerHTML = lastVacancyTitle;
	vacancyPageDescription.innerHTML = lastVacancyContent;
}

// -------------------------------------------------------------------------------------------------------------- Валидация полученных по API данных 
// Валидация данных API для POST запроса вакансии
const validateAPIPostDataVacancy = (data) => {
	if ( data.first_name || data.telegram_id ) {
		return true
	} else {}
}
// Валидация получения дополнительных вопросов по API
const validateAdditionalAPIQuestions = (data) => {
	if ( Object.keys(data.forms).length > 0 ) {
		return true
	} else {}
}
// Валидация удаления заявки
const validateResponseAfterDeleteAdd = (data) => {
	if ( data.response === "the application has been withdrawn" ) {
		return true
	} else {
	}
}

// Необходимо добавить еще счетчик попыток в учловие else и если счетчик достигает скажем 5 попыток, то выводить еще одно сообщение для пользоваателя о том
// что произошшла ошибка

// Также необходимо повесить функцию добавления счетчика и повторного вызова на catch

// -------------------------------------------------------------------------------------------------------------- Подкладка желтого фона при перезагрузке
const addYellowBGAfterClickOnReloadButton = () => {
	let reloadButton = document.querySelector(".footer__button-main-link");
	reloadButton.addEventListener("click", () => {
		reloadButton.classList.remove('_hidden-yellow-bg');
	})
}
addYellowBGAfterClickOnReloadButton();

// -------------------------------------------------------------------------------------------------------------- Подтягиваем политику конфиденциальности
// Делаем запрос и вставляем текст
const downloadPolitics = () => {
	const politicsContainer = document.querySelector(".politics-page__wrapper")

	fetch(`${actualHost}/politika-konfidencijnosti/${currentTelegramID}/${currentPassword}`)
	.then(response => {
		if (!response.ok) {throw new Error(`Network response was not ok: ${response.status}`);}
		return response.json();
	})
	.then(data => {
		let resultText = cleanTagsStylesAndAttributes(data);
		politicsContainer.insertAdjacentHTML("afterbegin", `${resultText}`)
	})
	.catch(error => {
		console.error('Fetch error:', error);
	});
}
// Проходимся по всем тегам содержимого и убираем все стили
const cleanTagsStylesAndAttributes = (data) => {
	let doc = new DOMParser().parseFromString(data.text, 'text/html');
	// Удаляем все теги "style"
	let styleTags = doc.querySelectorAll('style');
	styleTags.forEach(function(styleTag) {
			styleTag.parentNode.removeChild(styleTag);
	});
	// Удаляем атрибут "style" и "font-family" у всех элементов
	let elements = doc.querySelectorAll('*');
	elements.forEach(function(element) {
			element.removeAttribute('style');
			element.style.fontFamily = '';
	});
	// Добавляем отступ сверху в 15 пикселей для каждого тега <p>
	let pTags = doc.querySelectorAll('p');
	pTags.forEach(function(pTag) {
			pTag.style.marginTop = '15px';
	});
	// Получаем обновленный HTML-код
	let cleanedHtml = new XMLSerializer().serializeToString(doc);
	return cleanedHtml;
}

// -------------------------------------------------------------------------------------------------------------- Заполняем контент "О компании"
const downloadInformationAboutCompany = () => {
	let aboutAurora = document.querySelector(".about-aurora__container");
	let corporateCulture = document.querySelector(".corporate-culture__container");
	let auroraSport = document.querySelector(".aurora-sport__container");
	let socialResponsibility = document.querySelector(".social-responsibility__container");
	let aboutAuroraMainButton = document.querySelector(".about-company-main-page-button");

	aboutAuroraMainButton.addEventListener("click", () => {
		fetch(`${actualHost}/about_avrora/${currentTelegramID}/${currentPassword}`)
		.then(response => {
			if (!response.ok) {throw new Error(`Network response was not ok: ${response.status}`);}
			return response.json();
		})
		.then(data => {
			aboutAurora.innerHTML = "";
			corporateCulture.innerHTML = "";
			auroraSport.innerHTML = "";
			socialResponsibility.innerHTML = "";
			aboutAurora.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data['Що ти знаєш про Аврору?']}<div>`);
			corporateCulture.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data['Корпоративна культура']}<div>`);
			auroraSport.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data['Аврора спорт']}<div>`);
			socialResponsibility.insertAdjacentHTML("beforeend", `<div class="about-company-content">${data['Соціальна відповідальність']}<div>`);
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
	})
}
downloadInformationAboutCompany()

})
