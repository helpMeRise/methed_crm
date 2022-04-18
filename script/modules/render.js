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


export const renderGoods = (err, data) => {
  if (err) {
    console.warn(err);
    return;
  }
  tableBody.innerHTML = '';
  data.forEach((item) => {
    createRow(item);
  });
  overlay.classList.remove('active');
  totalPrice();
};


