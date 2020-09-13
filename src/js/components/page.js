import auth from './auth';
import activities from '../pages/activities';
import add from '../pages/add';
import login from '../pages/login';
import signup from '../pages/signup';
import splash from '../pages/splash';
const pages = {
  activities,
  add,
  login,
  signup,
  splash,
};
const transition = (anim, page) => {
  const elem = document.querySelector(`.page-${page}`);
  [...elem.classList]
    .filter(className => className.includes('page-anim'))
    .forEach(className => elem.classList.remove(className));
  elem.classList.add(`page-anim-${anim}`);
};
[...document.querySelectorAll('[pagetransition]')].forEach(
  pageTransitionElem => {
    pageTransitionElem.addEventListener('click', e => {
      e.preventDefault();
      const attr = e.target.getAttribute('pagetransition');
      const transitions = attr.split('|');
      transitions.forEach(str => {
        const array = str.split(',');
        const anim = array[0];
        const page = array[1];
        transition(anim, page);
      });
    });
  },
);

const onWindowLoad = async () => {
  Object.keys(pages).forEach(page => {
    if ('addEventListeners' in pages[page]) pages[page].addEventListeners();
  });
  auth.verifyJWT();
};

export { onWindowLoad, pages, transition };
