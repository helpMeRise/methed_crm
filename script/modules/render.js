import {
  tableBody,
  crmTotalPrice,
  overlay,
} from './elements.js';

import {createRow} from './createRow.js';

export const totalPrice = () => {
  let totalPrice = 0;
  tableBody.querySelectorAll('.table__cell_total-price').forEach(price => {
    totalPrice += +((price.textContent).slice(1));
  });
  crmTotalPrice.textContent = `$ ${totalPrice}`;
};

export const goodNumberChange = () => {
  const goods = tableBody.querySelectorAll('tr');
  goods.forEach((item, index) => {
    item.cells[0].textContent = `${index + 1}`;
  });
};

export const renderGoods = (goods) => {
  goods.forEach((item) => {
    createRow(item);
  });
  overlay.classList.remove('active');
  goodNumberChange();
  totalPrice();
};


