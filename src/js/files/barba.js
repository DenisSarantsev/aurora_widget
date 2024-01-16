import barba from '@barba/core';
import { gsap } from "gsap";
    

barba.init({
	views: [{
    namespace: 'home',
    beforeEnter() {
      // update the menu based on user navigation
      menu.update();
    },
    afterEnter() {
			function goBack() {
				window.history.back();
			}
			if ( document.querySelector(".footer__button-back-link") ) {
				const backButton = document.querySelector(".footer__button-back-link");
				backButton.addEventListener("click", ()=> {
					goBack();
				})
			}
      parallax.refresh();
    }
  }],
  transitions: [{
    name: 'opacity-transition',
		sync: true,
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});


