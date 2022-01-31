import {tableBody} from './elements.js';

export const events = () => {
  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_pic')) {
      open(target.dataset.pic, '',
          `width=800,height=600,top=${screen.height / 2 - 300},
          left=${screen.width / 2 - 400}`);
    }
  });
};
