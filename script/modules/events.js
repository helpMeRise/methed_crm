import {tableBody, modalFile,
  preview, modalFieldset, text, searchInput} from './elements.js';
import fetchRequest from './fetchRequest.js';
import {renderGoods} from './render.js';


export const events = () => {
  tableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.table__btn_pic')) {
      open(target.dataset.pic, '',
          `width=800,height=600,top=${screen.height / 2 - 300},
          left=${screen.width / 2 - 400}`);
    }
  });

  modalFile.addEventListener('change', () => {
    if (modalFile.files.length > 0) {
      const src = URL.createObjectURL(modalFile.files[0]);
      if (modalFile.files[0].size > 1000000) {
        modalFieldset.append(text);
        text.textContent = 'Изображение не должно превышать размер 1 Мб';
        preview.remove();
      } else {
        preview.src = src;
        preview.style.gridArea = 'file-add';
        preview.style.maxWidth = '100%';
        text.remove();
        modalFieldset.append(preview);
      }
    }
  });

  searchInput.addEventListener('input', e => {
    const search = () => Promise.all([
      fetchRequest(`?search=${searchInput.value}`, {
        callback: renderGoods,
      })]);

    setTimeout(() => {
      tableBody.innerHTML = '';
      search().then();
    }, 300);
  });
};
