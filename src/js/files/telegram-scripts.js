document.addEventListener("DOMContentLoaded", () => {
	let tg = window.Telegram.WebApp;
	document.addEventListener("click", () => {
		tg.expand(); // метод позволяет растянуть окно на всю высоту.
	})
	chatInput.addEventListener("keyup", (event) => {
		if ( event.key === "Enter" ) {
			tg.expand(); // метод позволяет растянуть окно на всю высоту.
		}
	})
})