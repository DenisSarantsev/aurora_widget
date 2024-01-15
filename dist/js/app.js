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
    window["FLS"] = true;
    isWebp();
})();