import {atom} from 'recoil';

const showModalStateAC = atom<boolean>({
  key: 'showModalAC',
  default: false,
});

export {showModalStateAC};
