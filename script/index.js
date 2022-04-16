
import {renderGoods} from './modules/render.js';
import modalActions from './modules/modal.js';
import {removeRow} from './modules/removeRow.js';
import {events} from './modules/events.js';
import fetchRequest from './modules/fetchRequest.js';
import modalEdit from './modules/goodEdit.js';

const init = () => Promise.all([
  fetchRequest('', {
    callback: renderGoods,
  }),
  fetchRequest('', {
    callback: modalActions,
  })]);

init().then(() => {
  events();
});

let data = await fetch('http://localhost:3000/api/goods');
data = await data.json();
removeRow(data);
modalEdit();
