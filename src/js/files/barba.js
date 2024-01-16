import barba from '@barba/core';
import { gsap } from "gsap";
    

// barba.init({
//   transitions: [{
//     name: 'opacity-transition',
// 		sync: true,
//     leave(data) {
//       return gsap.to(data.current.container, {
//         opacity: 0
//       });
//     },
//     enter(data) {
//       return gsap.from(data.next.container, {
//         opacity: 0
//       });
//     }
//   }]
// });

// barba.init({
//   transitions: [{
//     name: 'custom-transition',
//     sync: true,
//     leave(data) {
//       return gsap.to(data.current.container, {
//         opacity: 0,
//         duration: 0.5, // Продолжительность анимации
//         rotateY: 90,   // Поворот по оси Y на 90 градусов
//         ease: 'power2.inOut' // Эффект анимации
//       });
//     },
//     enter(data) {
//       return gsap.from(data.next.container, {
//         opacity: 0,
//         duration: 0.5,
//         rotateY: -90, // Поворот по оси Y на -90 градусов
//         ease: 'power2.inOut'
//       });
//     }
//   }]
// });

barba.init({
  transitions: [{
    name: 'slide-transition',
    sync: true,
    leave(data) {
      const currentPage = data.current.container;
      
      return gsap.to(currentPage, {
        opacity: 0,
        x: '-100%', // Перемещение влево на 100% ширины страницы
        duration: 0.5,
        ease: 'power2.inOut'
      });
    },
    enter(data) {
      const nextPage = data.next.container;

      return gsap.from(nextPage, {
        opacity: 0,
        x: '100%', // Перемещение справа на 100% ширины страницы
        duration: 0.5,
        ease: 'power2.inOut'
      });
    }
  }]
});

