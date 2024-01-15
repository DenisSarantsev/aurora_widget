(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        const pageContainer = document.querySelector(".page-container");
        pageContainer.classList.remove("position-right");
        pageContainer.classList.add("position-center");
        const buttonsRouteArray = document.querySelectorAll(".route-button-main-style");
        for (let i = 0; i < buttonsRouteArray.length; i++) buttonsRouteArray[i].addEventListener("click", (() => {
            pageContainer.classList.remove("position-center");
            pageContainer.classList.add("position-left");
        }));
        function goBack() {
            window.history.back();
        }
        if (document.querySelector(".footer__button-back-link")) {
            const backButton = document.querySelector(".footer__button-back-link");
            backButton.addEventListener("click", (() => {
                goBack();
            }));
        }
    }));
    document.addEventListener("DOMContentLoaded", (() => {
        const pageContainer = document.querySelector(".page-container");
        const logoImage = document.querySelector(".header__logo-link");
        logoImage.addEventListener("click", (() => {
            pageContainer.innerHTML = `\n\t\t\t${mainPageModule}\n\t\t`;
        }));
        if (document.querySelector(".about-company-main-page-button")) {
            const aboutCompanyButton = document.querySelector(".about-company-main-page-button");
            aboutCompanyButton.addEventListener("click", (() => {
                pageContainer.innerHTML = `\n\t\t\t\t${aboutPageModule}\n\t\t\t`;
            }));
        }
    }));
    const mainPageModule = `\n\t<img src="../../img/main/logo-aurora.svg" alt="main image" class="home-page__main-image">\n\t<h1 class="home-page__title title-main-style">\n\t\tВітаємо, Денис!\n\t</h1>\n\t<div class="home-page__subtitle subtitle-main-style">\n\t\tЛаскаво просимо до нашого віртуального відділу кадрів! Ми раді, що ви завітали до нас.\n\t</div>\n\t<div class="home-page__buttons-block route-buttons-block">\n\t\t<a href="about-company.html" class="button route-button-main-style button-effect">\n\t\t\t<div id="circle"></div>\n\t\t\t<div>Про компанію</div>\n\t\t</a>\n\t\t<a href="search-type.html" class="button route-button-main-style button-effect">\n\t\t\t<div id="circle"></div>\n\t\t\t<div>Знайти вакансію</div>\n\t\t</a>\n\t</div>\n`;
    const aboutPageModule = `\n\t<h1 class="about-company__title title-main-style">\n\tКого ми шукаємо?\n\t</h1>\n\t<div class="about-company__subtitle subtitle-main-style">\n\t<img src="../../img/main/aurora-image.webp" alt="" class="about-company__image">\n\t<p>\n\t\tТе, чим ти займаєшся на роботі, має подобатися, приносити дохід та давати можливість розвиватися. Повір, ці складові для роботодавця такі ж важливі, як і для тебе. Адже коли все добре у тебе, то і бізнес почувається краще.\n\t</p>\n\t<br>\n\t<p>\n\t\tТому ми зацікавлені бачити у нашій команді людей, яким з нами буде добре працювати, розвиватися, відпочивати та робити світ трішечки кращим.\n\t</p>\n\t<br>\n\t<p>\n\t\tТобі з нами по дорозі, якщо ти:\n\t\t<ul class="about-company__list">\n\t\t\t<li>відповідально ставишся до роботи;</li>\n\t\t\t<li>з повагою відносишся до людей;</li>\n\t\t\t<li>щоб не було, горою стоїш за позитив та веселий настрій;</li>\n\t\t\t<li>старанно працюєш для досягнення мети;</li>\n\t\t\t<li>маєш бажання надати клієнтам найкраще.</li>\n\t\t</ul>\n\t</p>\n\t<br>\n\t<p>\n\t\tЯкщо тобі теж близькі вищевказані думки, то довго не роздумуй, почитай ще про переваги та плюшечки, і скоріш надсилай резюме.\n\t</p>\n\t</div>\n\t<div class="about-company__buttons-block route-buttons-block">\n\t<a href="search-type.html" class="button route-button-main-style button-effect">\n\t\t<div id="circle"></div>\n\t\t<div>Дізнатись більше на сайті</div>\n\t</a>\n\t<a href="search-type.html" class="button route-button-main-style button-effect">\n\t\t<div id="circle"></div>\n\t\t<div>Перейти до пошуку вакансій</div>\n\t</a>\n\t</div>\n`;
    window["FLS"] = true;
    isWebp();
})();