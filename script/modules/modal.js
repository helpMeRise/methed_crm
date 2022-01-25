import {
  modalForm,
  modalCheckbox,
  modalInputDiscount,
  addGoodBtn,
  vendorCodeId,
  modalCount,
  modalPrice,
  modalTotalPrice,
  overlay,
} from './elements.js';

import {createRow} from './createRow.js';

import {
  totalPrice,
  goodNumberChange,
} from './render.js';

const modalActions = (goods) => {
  addGoodBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    vendorCodeId.textContent = Math.round(Math.random() * 1000000);
    modalTotalPrice.textContent = `$ 0`;
  });

  overlay.addEventListener('click', e => {
    if (e.target.closest('.modal__close') || !e.target.closest('.modal')) {
      overlay.classList.remove('active');
    }
  });
  modalCheckbox.addEventListener('change', () => {
    if (!modalCheckbox.checked) {
      modalInputDiscount.setAttribute('disabled', '');
      modalInputDiscount.value = '';
    } else {
      modalInputDiscount.removeAttribute('disabled');
    }
  });

  modalForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
      modalTotalPrice.textContent = `$ ${modalPrice.value *
          modalCount.value - modalInputDiscount.value}`;
    });
  });

  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);

    const newGood = Object.fromEntries(formData);
    newGood.title = newGood.name;
    delete newGood['name'];
    newGood.id = vendorCodeId.textContent;
    goods.push(newGood);
    createRow(newGood);

    target.reset();
    overlay.classList.remove('active');
    totalPrice();
    goodNumberChange();
  });
};

export default modalActions;
