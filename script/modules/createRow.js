
import {tableBody} from './elements.js';
import {toBase64} from './toBase64.js';

export const createRow = (obj) => {
  const tr = document.createElement('tr');
  for (const item in obj) {
    if (item === 'id' || item === 'description' ||
      item === 'discount' || item === 'images') {
      continue;
    } else {
      const id = document.createElement('td');
      id.classList.add('table__cell');
      id.setAttribute('data-id', obj['id']);
      id.textContent = obj['id'];

      const title = document.createElement('td');
      title.classList.add('table__cell', 'table__cell_left',
          'table__cell_name');
      title.textContent = obj['title'];

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
      btnPic.dataset.pic = toBase64(`${obj['image']}`);
      btnPic.title = 'Добавить изображение';
      const btnEdit = document.createElement('button');
      btnEdit.classList.add('table__btn', 'table__btn_edit');
      btnEdit.title = 'Изменить товар';
      const btnDel = document.createElement('button');
      btnDel.classList.add('table__btn', 'table__btn_del');
      btnDel.title = 'Удалить товар';
      buttons.append(btnPic, btnEdit, btnDel);

      tr.append(id, title, category, units, count,
          price, totalPrice, buttons);
      break;
    }
  }

  tableBody.append(tr);
};
