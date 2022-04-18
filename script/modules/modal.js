import {
  tableBody,
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
  modalError,
  modalName,
  modalCategory,
  modalDescription,
  modalUnits,
} from './elements.js';
import fetchRequest from './fetchRequest.js';
import {renderGoods} from './render.js';
import {toBase64} from './toBase64.js';

import {
  totalPrice,
} from './render.js';

const closeModal = e => {
  if (e.target.closest('.modal__close') || !e.target.closest('.modal') &&
    !e.target.closest('.modal-error')) {
    overlay.classList.remove('active');
  }
  if (e.target.closest('.modal-error__close') ||
      !e.target.closest('modal-error')) {
    modalError.remove();
  }
};

const goodEdit = e => {
  e.preventDefault();
  const target = e.target;
  const formData = new FormData(target);

  const modalSend = (err, data) => {
    if (err) {
      const errorText = modalError.querySelector('.modal-error__text');
      errorText.textContent = err;
      overlay.append(modalError);
      // setTimeout(() => {
      //   modalError.remove();
      // }, 1000);
    } else {
      target.reset();
      overlay.classList.remove('active');
      fetchRequest('api/goods/', {
        callback: renderGoods,
      });
      totalPrice();
    }
  };

  const newGood = Object.fromEntries(formData);
  newGood.id = vendorCodeId.textContent;
  newGood.discount = modalInputDiscount.value;
  fetchRequest(`apid/goods/${newGood.id}`, {
    method: 'PATCH',
    body: {
      title: newGood.name,
      description: newGood.description,
      price: newGood.price,
      discount: +newGood.discount,
      count: newGood.count,
      units: newGood.units,
      category: newGood.category,
      image: newGood.image,
    },
    callback: modalSend,
  });
};

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

    modalForm.addEventListener('submit', async e => {
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
          fetchRequest('api/goods/', {
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

      newGood.image = await toBase64(newGood.image);

      fetchRequest('api/goods', {
        method: 'POST',
        body: newGood,
        callback: modalSend,
      });
    });
  });

  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_edit')) {
      modalForm.reset();
      modalCheckbox.removeAttribute('checked');
      overlay.classList.add('active');
      modalTitle.textContent = 'Изменить';
      modalSubmit.textContent = 'Изменить товар';
    }

    overlay.addEventListener('click', closeModal);

    fetch('http://localhost:3000/api/goods').then(data => {
      data.json().then(data => {
        data.forEach((item, index) => {
          if (target.closest('tr').querySelectorAll('.table__cell')[0]
              .textContent === `${item.id}`) {
            vendorCodeId.textContent = item.id;
            modalName.value = `${item.title}`;
            modalCategory.value = `${item.category}`;
            modalDescription.value = `${item.description}`;
            modalUnits.value = `${item.units}`;
            modalCount.value = `${item.count}`;
            if (item.discount) {
              modalCheckbox.setAttribute('checked', '');
              modalInputDiscount.removeAttribute('disabled');
              modalInputDiscount.value = `${item.discount}`;
            }
            modalPrice.value = `${item.price}`;
          }
        });
      });
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

    modalForm.addEventListener('submit', goodEdit);
  });
};

export default modalActions;
