import {useRecoilValue, useRecoilState} from 'recoil';

import './App.css';
import {showModalState} from './atoms/ChangeUserModalState';
import {showModalStateAC} from './atoms/ChangeAdminConsoleModalState';
import {currentAdminConsoleState} from './atoms/AdminConsoleState';
import {showSettingsMenuState} from './atoms/SettingsMenuState';
import ChangeUserModal from './components/ChangeUserModal';
import ChangeAdminConsoleModal from './components/ChangeAdminConsoleModal';
import SettingsMenu from './components/SettingsMenu';
import HomeScreen from './containers/HomeScreen';
import WideWarning from './components/WideWarning';

const App = () => {
  const showChangeUserModal = useRecoilValue(showModalState);
  const showChangeAdminConsoleModal = useRecoilValue(showModalStateAC);
  const showSettingsMenu = useRecoilValue(showSettingsMenuState);
  const [currentAdminConsole] = useRecoilState(currentAdminConsoleState);

  return (
    <div className="App">
      {currentAdminConsole ? <WideWarning /> : null}
      <HomeScreen />
      {showChangeUserModal ? <ChangeUserModal /> : null}
      {showChangeAdminConsoleModal ? <ChangeAdminConsoleModal /> : null}
      {showSettingsMenu ? <SettingsMenu /> : null}
    </div>
  );
};

export default App;
