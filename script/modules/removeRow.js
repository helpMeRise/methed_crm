import {tableBody} from './elements.js';
import fetchRequest from './fetchRequest.js';

import {
  totalPrice,
} from './render.js';

export const removeRow = (goods) => {
  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_del')) {
      const deleteGood = confirm('Дейставительно удалить товар?');
      if (deleteGood) {
        goods.forEach((item, index) => {
          if (target.closest('tr').querySelectorAll('.table__cell')[0]
              .textContent === `${item.id}`) {
            goods.splice(index, 1);
            fetchRequest(`/${item.id}`, {
              method: 'DELETE',
            });
          }
        });
        target.closest('tr').remove();
        totalPrice();
      }
      console.log(goods);
    }
  });
};
