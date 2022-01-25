
import {tableBody} from './elements.js';

export const createRow = (obj) => {
  const tr = document.createElement('tr');
  for (const item in obj) {
    if (item === 'id' || item === 'description' ||
      item === 'discount' || item === 'images') {
      continue;
    } else {
      const number = document.createElement('td');
      number.classList.add('table__cell');

      const title = document.createElement('td');
      title.classList.add('table__cell', 'table__cell_left',
          'table__cell_name');
      title.setAttribute('data-id', obj['id']);
      title.textContent = obj['title'];
      const spanId = document.createElement('span');
      spanId.classList.add('table__cell-id');
      spanId.textContent = `id: ${obj['id']}`;
      title.prepend(spanId);

      const category = document.createElement('td');
      category.classList.add('table__cell', 'table__cell_left');
      category.textContent = obj['category'];

      const units = document.createElement('td');
      units.classList.add('table__cell');
      units.textContent = obj['units'];

      const count = document.createElement('td');
      count.classList.add('table__cell');
      count.textContent = obj['count'];

      const price = document.createElement('td');
      price.classList.add('table__cell');
      price.textContent = `$${obj['price']}`;

      const totalPrice = document.createElement('td');
      totalPrice.classList.add('table__cell', 'table__cell_total-price');
      totalPrice.textContent = `$${obj['price'] * obj['count']}`;

      const buttons = document.createElement('td');
      buttons.classList.add('table__cell', 'table__cell_btn-wrapper');
      const btnPic = document.createElement('button');
      btnPic.classList.add('table__btn', 'table__btn_pic');
      const btnEdit = document.createElement('button');
      btnEdit.classList.add('table__btn', 'table__btn_edit');
      const btnDel = document.createElement('button');
      btnDel.classList.add('table__btn', 'table__btn_del');
      buttons.append(btnPic, btnEdit, btnDel);

      tr.append(number, title, category, units, count,
          price, totalPrice, buttons);
      break;
    }
  }

  tableBody.append(tr);
};
