import { transition } from './page';

const pageElem = document.querySelector('.page-error');
const messageElem = pageElem.querySelector('.message');
const buttonElem = pageElem.querySelector('button');
const show = message => {
  messageElem.innerHTML = message;
  buttonElem.focus();
  transition('in-modal', 'error');
};

export { show };
