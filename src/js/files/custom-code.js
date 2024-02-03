
document.addEventListener("DOMContentLoaded", () => {
	let data = {
		'title': 'АврорА',
		'cabinet': '',
		'first_name': "Денис",
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
	let actualHost = "https://avrora-web.fly.dev";
	let currentTemplateID = "home-page"; // Изначальное значение домашняя страница. Впоследствии перезаписывается при переходах между страницами
	let firstEnter = true;

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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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


	//  Названия шаблонов:

	//  Главная страница - home-page
	//  Страница "О нас" - about-company
	//  Страница "Выбрать направление" - directions-page
	//  Страница со списком офисных вакансий - office-jobs-list-page
	//  Страница со списком вакансий для магазина - shop-jobs-list-page
	//  Страница со списком вакансий для склада - stock-jobs-list-page
	//  Страница вакансии - vacancy-page
	

	// Вызов API USER
	const apiUserUrl = `${actualHost}/user/${data.telegram_id}/${data.password}`;
	// Выполняем GET-запрос к API
	fetch(apiUserUrl)
	.then(response => {
		if (!response.ok) { throw new Error(`Ошибка HTTP: ${response.status}`); }
		return response.json();
	})
	.then(data => {
	})
	.catch(error => { console.error('Ошибка при выполнении запроса:', error); });





	// Вызов API VACANCIES
	let globalVacancies; // Глобальная переменная для всех вакансий
	let officeVacancies = []; // Масив з офісними вакансіями
	let shopVacancies = []; // Масив з вакансіями для магазинів
	let stockVacancies = []; // Масив з вакансіями для складу
	let currentVacancyID = ""; // Актуальный id вакансии (последняя вакансия, на которую зашел человек). Записывается при клике на кнопку вакансии и используется для отправки POST запроса
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

	// Сбор данных с формы отправки заявки
	const nameFormInput = document.querySelector(".post-request-vacancy-form__name-input"); // Инпут формы для ввода имени
	const ageFormInput = document.querySelector(".post-request-vacancy-form__age-input"); // Инпут формы для ввода возраста
	const genderRadioInputs = document.querySelectorAll(".post-request-vacancy-form__gender-label"); // Радио кнопки для выбора пола (label)
	let actualGenderRadioInput = ""; // Актуальний вибранный инпут, который будет отправляться на бэк
	const aboutMeFormTextaea = document.querySelector(".post-request-vacancy-form__about-me-input"); // Текстареа для ввода информации о себе
	const wishFormTextarea = document.querySelector(".post-request-vacancy-form__wish-input"); // Текстареа для ввода пожеланий
	// const requestButton = document.querySelector(".post-request-vacancy-page__request-button"); // Кнопка для отправки данных на бэк

	const allFormInputs = document.querySelectorAll(".js-form-input"); // Все инпуты
	for ( let item of allFormInputs ) {
		item.addEventListener("change", ()=> {
			writeInputDataToRequestData(item);
		})
	}

	// Переменные для отправки данных на бэк
	let dataName = "";
	let dataAge = "";
	let dataAboutSelf = "";
	let dataGender = "неважливо";
	let dataWish = "";
	let dataKind = "склад";
	let dataTitle = "Назва вакансії";

	// Функция для записи данных в переменные, для отправки данных на бэк
	const writeInputDataToRequestData = (input) => {
		if ( input.getAttribute("type") === "text" ) {
			if ( input.classList.contains('post-request-vacancy-form__age-input') ) {
				validateAgeInput(input)
			} else {
				if ( input.classList.contains('post-request-vacancy-form__name-input') ) {
					dataName = validateTextInput(input);
				} else if ( input.classList.contains('post-request-vacancy-form__about-me-input') ) {
					dataAboutSelf = validateTextInput(input);
				} else if ( input.classList.contains('post-request-vacancy-form__wish-input') ) {
					dataWish = validateTextInput(input);
				}
			}
		} else if ( input.getAttribute("type" === "radio" ) ) {
			if ( input.classList.contains('post-request-vacancy-form__gender-radio') ) {
				dataGender = input.id;
			}
		}
	}

	// Функция для валидации инпута с возрастом
	const validateAgeInput = (input) => {
		let inputValue = input.value;
		let inputValueErrorsCounter = 0;
		for (let i = 0; i < inputValue.length; i++ ) {
			if ( !/\d/.test(inputValue[i]) ) {
				inputValueErrorsCounter++
			}
		}
		if ( inputValueErrorsCounter === 0 && inputValue < 100 && inputValue > 17 ) {
			makeBorderGreen(input);
			dataAge = inputValue;
		} else {
			makeBorderRed(input);
		}
	}

	// Функция для валидации текстового инпута
	const validateTextInput = (input) => {
		let inputValue = input.value;
		if ( inputValue.length > 9 && inputValue.length < 1000 ) {
			makeBorderGreen(input);
			return inputValue;
		} else {
			makeBorderRed(input);
		}
	}

	// Функция, которая делает обводку окна красной и убирает зеленую (при неправильно введенных данных)
	const makeBorderRed = (input) => {
		input.classList.remove("green-border");
		input.classList.add("red-border");
	}
	// Функция, которая делает обводку окна зеленой и убирает красную (при правильно введенных данных)
	const makeBorderGreen = (input) => {
		input.classList.remove("red-border");
		input.classList.add("green-border");
	}

	// requestButton.addEventListener("click", () => {
	// 	fetchPostData(dataName, dataAge, dataAboutSelf, dataGender, dataWish, dataKind, dataTitle, currentVacancyID);
	// })


	// Отправка заявки на вакансию с анкетой кандидата (вызывается при клике на кнопку)
	function fetchPostData(dataName, dataAge, dataAboutSelf, dataGender, dataWish, dataKind, dataTitle, currentVacancyID) {
	const apiPostDataURL = `${actualHost}/questionnaire/${currentTelegramID}/${currentPassword}/${currentVacancyID}`;
	const dataRequest = {
		'telegram_id': currentTelegramID,
		'name': dataName,
		'age': dataAge,
		'about_self': dataAboutSelf,
		'gender': dataGender,
		'wish': dataWish,
		'kind': dataKind,
		'title': dataTitle,
	};

	// Данные POST запроса
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(dataRequest) // Перетворюємо дані у JSON-рядок
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


})

