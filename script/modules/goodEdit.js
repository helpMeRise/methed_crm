import {
  tableBody,
  modalTitle,
  modalName,
  modalCategory,
  modalDescription,
  modalUnits,
  modalForm,
  modalCheckbox,
  modalInputDiscount,
  vendorCodeId,
  modalCount,
  modalPrice,
  modalTotalPrice,
  overlay,
  modalSubmit,
  modalError,
} from './elements.js';
import fetchRequest from './fetchRequest.js';
import {renderGoods} from './render.js';
import {
  totalPrice,
} from './render.js';


const closeModal = e => {
  if (e.target.closest('.modal__close') || !e.target.closest('.modal')) {
    overlay.classList.remove('active');
  }
};

const modalEdit = (goods) => {
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

    modalForm.addEventListener('submit', e => {
      e.preventDefault();
      const target = e.target;
      const formData = new FormData(target);

      const modalSend = (err, data) => {
        if (err) {
          const errorText = modalError.querySelector('.modal-error__text');
          errorText.textContent = err;
          overlay.append(modalError);
          setTimeout(() => {
            modalError.remove();
          }, 1000);
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
      newGood.id = vendorCodeId.textContent;
      newGood.discount = modalInputDiscount.value;
      fetchRequest(`/${newGood.id}`, {
        method: 'PATCH',
        body: {
          title: newGood.name,
          description: newGood.description,
          price: newGood.price,
          discount: +newGood.discount,
          count: newGood.count,
          units: newGood.units,
          category: newGood.category,
        },
        callback: modalSend,
      });
    });
  });
};

export default modalEdit;
