import {atom} from 'recoil';

const showDropdownACState = atom<boolean>({
  key: 'showDropdownAC',
  default: false,
});

export {showDropdownACState};
