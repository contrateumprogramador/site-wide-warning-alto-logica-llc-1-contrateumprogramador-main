import React from 'react';
import {useRecoilState} from 'recoil';
import {currentAdminConsoleState} from '../atoms/AdminConsoleState';
import Logger from '../utils/Logger';

const styles: {[key: string]: React.CSSProperties} = {
  WideWarningDiv: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'red',
  },
  cancelButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    color: '#FFFFFF',
    width: '100px',
    height: '30px',
    borderRadius: '5px',
    padding: '5px',
    margin: '15px',
    cursor: 'default',
  },
};

const WideWarning = () => {
  const [currentAdminConsole, setCurrentAdminConsole] = useRecoilState(
    currentAdminConsoleState
  );

  return (
    <div style={styles.WideWarningDiv}>
      <p>{currentAdminConsole && currentAdminConsole.label}</p>

      <div
        style={{...styles.cancelButton}}
        onClick={event => {
          event.stopPropagation();
          setCurrentAdminConsole(null);
          Logger.info('End admin console');
        }}
      >
        Dismiss
      </div>
    </div>
  );
};

export default WideWarning;
