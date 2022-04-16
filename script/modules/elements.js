export const modalTitle = document.querySelector('.modal__title');
export const modalForm = document.querySelector('.modal__form');
export const modalCheckbox = document.querySelector('.modal__checkbox');
export const modalInputDiscount =
    document.querySelector('.modal__input_discount');
export const tableBody = document.querySelector('.table__body');
export const addGoodBtn = document.querySelector('.panel__add-goods');
export const vendorCodeId = document.querySelector('.vendor-code__id');
export const modalCount = modalForm.querySelector('#count');
export const modalPrice = modalForm.querySelector('#price');
export const modalTotalPrice = modalForm.querySelector('.modal__total-price');
export const crmTotalPrice = document.querySelector('.crm__total-price');
export const overlay = document.querySelector('.overlay');
export const modalName = modalForm.querySelector('#name');
export const modalCategory = modalForm.querySelector('#category');
export const modalDescription = modalForm.querySelector('#description');
export const modalUnits = modalForm.querySelector('#units');
export const modalFile = document.querySelector('.modal__file');
export const modalSubmit = modalForm.querySelector('.modal__submit');
export const preview = new Image();
export const modalFieldset = document.querySelector('.modal__fieldset');
export const searchForm = document.querySelector('.panel__search');
export const searchInput = searchForm.querySelector('.panel__input');
export const text = document.createElement('p');
text.className = 'text';
text.style = `
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #D80101;
`;
modalFieldset.append(text);
export const modalError = document.createElement('div');
modalError.className = 'modal-error';
modalError.style = `
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 25px;
  width: 350px;
  height: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #F2F0F9;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
`;
modalError.innerHTML = `
  <button class="modal-error__close" style="
    border: none; 
    align-self: flex-end;
  ">
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" 
      stroke-width="3" stroke-linecap="round" /></svg>
  </button>
  <img src="../img/error.svg" style="max-width: 90px; align-self: center;">
  <p class="modal-error__text" style="
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
    color: #6E6893;
  "></p>
`;


