import {atom} from 'recoil';
import {Warning} from '../models/Warnings';

const currentAdminConsoleState = atom<Warning | null>({
  key: 'currentWarning',
  default: null,
});

const nextAdminConsoleState = atom<Warning | null>({
  key: 'nextWarning',
  default: null,
});

export {currentAdminConsoleState, nextAdminConsoleState};
