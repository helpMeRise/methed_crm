import {tableBody} from './elements.js';

import {
  totalPrice,
  goodNumberChange,
} from './render.js';

export const removeRow = (goods) => {
  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      goods.forEach((item, index) => {
        if (target.closest('tr').querySelector('.table__cell-id')
            .textContent === `id: ${item.id}`) {
          goods.splice(index, 1);
        }
      });
      target.closest('tr').remove();
      totalPrice();
      goodNumberChange();
    }
    console.log(goods);
  });
};
