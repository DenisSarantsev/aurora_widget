// Скрипты переключения модулей страниц

// Скрипт переключения на главную страницу
document.addEventListener("DOMContentLoaded", ()=> {
	// Контейнер в котором меняется контент
	const pageContainer = document.querySelector(".page-container");
	// При клике на логотип
	const logoImage = document.querySelector(".header__logo-link");
	logoImage.addEventListener("click", ()=> {
		pageContainer.innerHTML = `
			${mainPageModule}
		`;
	})

	// При клике на кнопку "О компании"
	if ( document.querySelector(".about-company-main-page-button") ) {
		const aboutCompanyButton = document.querySelector(".about-company-main-page-button");
		aboutCompanyButton.addEventListener("click", ()=> {
			pageContainer.innerHTML = `
				${aboutPageModule}
			`;
		})
	}
})

// ---------- Модули главной страницы ----------

// Модуль страницы "Главная страница"
const mainPageModule = `
	<img src="../../img/main/logo-aurora.svg" alt="main image" class="home-page__main-image">
	<h1 class="home-page__title title-main-style">
		Вітаємо, Денис!
	</h1>
	<div class="home-page__subtitle subtitle-main-style">
		Ласкаво просимо до нашого віртуального відділу кадрів! Ми раді, що ви завітали до нас.
	</div>
	<div class="home-page__buttons-block route-buttons-block">
		<a href="about-company.html" class="button route-button-main-style button-effect">
			<div id="circle"></div>
			<div>Про компанію</div>
		</a>
		<a href="search-type.html" class="button route-button-main-style button-effect">
			<div id="circle"></div>
			<div>Знайти вакансію</div>
		</a>
	</div>
`;

// Модуль страницы "О компании"
const aboutPageModule = `
	<h1 class="about-company__title title-main-style">
	Кого ми шукаємо?
	</h1>
	<div class="about-company__subtitle subtitle-main-style">
	<img src="../../img/main/aurora-image.webp" alt="" class="about-company__image">
	<p>
		Те, чим ти займаєшся на роботі, має подобатися, приносити дохід та давати можливість розвиватися. Повір, ці складові для роботодавця такі ж важливі, як і для тебе. Адже коли все добре у тебе, то і бізнес почувається краще.
	</p>
	<br>
	<p>
		Тому ми зацікавлені бачити у нашій команді людей, яким з нами буде добре працювати, розвиватися, відпочивати та робити світ трішечки кращим.
	</p>
	<br>
	<p>
		Тобі з нами по дорозі, якщо ти:
		<ul class="about-company__list">
			<li>відповідально ставишся до роботи;</li>
			<li>з повагою відносишся до людей;</li>
			<li>щоб не було, горою стоїш за позитив та веселий настрій;</li>
			<li>старанно працюєш для досягнення мети;</li>
			<li>маєш бажання надати клієнтам найкраще.</li>
		</ul>
	</p>
	<br>
	<p>
		Якщо тобі теж близькі вищевказані думки, то довго не роздумуй, почитай ще про переваги та плюшечки, і скоріш надсилай резюме.
	</p>
	</div>
	<div class="about-company__buttons-block route-buttons-block">
	<a href="search-type.html" class="button route-button-main-style button-effect">
		<div id="circle"></div>
		<div>Дізнатись більше на сайті</div>
	</a>
	<a href="search-type.html" class="button route-button-main-style button-effect">
		<div id="circle"></div>
		<div>Перейти до пошуку вакансій</div>
	</a>
	</div>
`






