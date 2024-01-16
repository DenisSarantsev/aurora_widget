document.addEventListener("DOMContentLoaded", () => {


	// Анимация заезда/выезда блока при переключении страницы
	// const pageContainer = document.querySelector(".page-container");
	// pageContainer.classList.remove("position-right");
	// pageContainer.classList.add("position-center");

	// const buttonsRouteArray = document.querySelectorAll(".route-button-main-style");
	// for ( let i = 0; i < buttonsRouteArray.length; i++ ) {
	// 	buttonsRouteArray[i].addEventListener("click", () => {
	// 		pageContainer.classList.remove("position-center");
	// 		pageContainer.classList.add("position-left");
	// 	})
	// }

	// Функция перехода на предыдущую страницу
	function goBack() {
		window.history.back();
	}
	if ( document.querySelector(".footer__button-back-link") ) {
		const backButton = document.querySelector(".footer__button-back-link");
		backButton.addEventListener("click", ()=> {
			goBack();
		})
	}
})
