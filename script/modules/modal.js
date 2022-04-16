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
  modalTitle,
  modalSubmit,
  modalCategory,
  modalError,
} from './elements.js';
import fetchRequest from './fetchRequest.js';
import {renderGoods} from './render.js';

import {
  totalPrice,
} from './render.js';

const modalActions = (goods) => {
  addGoodBtn.addEventListener('click', () => {
    modalForm.reset(),
    modalTitle.textContent = 'Добавить товар';
    modalSubmit.textContent = 'Добавить товар';
    overlay.classList.add('active');
    vendorCodeId.textContent = Math.round(Math.random() * 1000000);
    modalTotalPrice.textContent = `$ 0`;

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

      const modalSend = (err, data) => {
        if (err) {
          const errorText = modalError.querySelector('.modal-error__text');
          errorText.textContent = err;
          overlay.append(modalError);
        } else {
          target.reset();
          overlay.classList.remove('active');
          fetchRequest('', {
            callback: renderGoods,
          });
          totalPrice();
        }
      };

      const newGood = Object.fromEntries(formData);
      newGood.title = newGood.name;
      delete newGood['name'];
      newGood.id = vendorCodeId.textContent;
      newGood.discount = modalInputDiscount.value;
      newGood.category = modalCategory.value;
      fetchRequest('', {
        method: 'POST',
        body: newGood,
        callback: modalSend,
      });
    });
  });
};

export default modalActions;
