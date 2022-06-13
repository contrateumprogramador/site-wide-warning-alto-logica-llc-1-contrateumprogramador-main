import React, {useState} from 'react';
import {useQuery, gql} from '@apollo/client';
import {useSetRecoilState, useRecoilState} from 'recoil';
import ChangeAdminConsoleDropdown from './ChangeAdminConsoleDropdown';
import {
  currentAdminConsoleState,
  nextAdminConsoleState,
} from '../atoms/AdminConsoleState';
import {showDropdownACState} from '../atoms/ChangeAdminConsoleDropdownState';
import {showModalStateAC} from '../atoms/ChangeAdminConsoleModalState';
import {Warning, WarningGQLResponse} from '../models/Warnings';
import Logger from '../utils/Logger';
import {GoChevronDown, GoChevronUp} from 'react-icons/go';
import LoadingOverlay from './LoadingOverlay';
import ErrorOverlay from './ErrorOverlay';

interface WarningManyData {
  warningMany: WarningGQLResponse[];
}

interface WarningManyVars {
  limit: number;
}

export const GET_WARNINGS = gql`
  query GetWarning($limit: Int!) {
    warningMany(limit: $limit) {
      _id
      type
      label
    }
  }
`;

const styles: {[key: string]: React.CSSProperties} = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(8px)',
  },
  modal: {
    width: '500px',
    height: '300px',
    borderRadius: '10px',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#414141',
    boxShadow:
      '0px 6px 20px 0px rgba(176, 190, 197, 0.32), 0px 2px 4px 0px rgba(176, 190, 197, 0.32)',
  },
  dropdownButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#C6C6C6',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '450px',
    height: '60px',
  },
  rotate180: {
    transform: 'rotate(180deg)',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '450px',
    padding: '20px',
    fontWeight: 600,
  },
  cancelButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    marginRight: '15px',
    cursor: 'default',
  },
  changeAdminConsoleButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    cursor: 'default',
  },
  changeAdminConsoleButtonDisabled: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    opacity: 0.5,
    width: '140px',
    height: '50px',
    borderRadius: '5px',
    cursor: 'default',
  },
};

const ChangeAdminConsoleModal = () => {
  const {loading, error, data} = useQuery<WarningManyData, WarningManyVars>(
    GET_WARNINGS,
    {variables: {limit: 100}}
  );
  const setShowModal = useSetRecoilState(showModalStateAC);
  const [showDropdownAC, setShowDropdownAC] =
    useRecoilState(showDropdownACState);
  const [currentAdminConsole, setCurrentAdminConsole] = useRecoilState(
    currentAdminConsoleState
  );
  const [nextAdminConsole, setNextAdminConsole] = useRecoilState(
    nextAdminConsoleState
  );
  const [cancelButtonOpacity, setCancelButtonOpacity] = useState(1.0);
  const [changeAdminConsoleButtonOpacity, setChangeAdminConsoleButtonOpacity] =
    useState(1.0);
  const [iconColor, setIconColor] = useState('#414141');
  const ChevronIcon = showDropdownAC ? GoChevronUp : GoChevronDown;

  if (loading) return <LoadingOverlay data-testid="loading" />;
  if (error) return <ErrorOverlay data-testid="error" />;

  const onExitModal = () => {
    setShowModal(false);
    setShowDropdownAC(false);
    setNextAdminConsole(null);
  };

  return (
    <div
      style={styles.root}
      data-testid="change_adminconsole_modal"
      onClick={onExitModal}
    >
      <div
        style={styles.modal}
        onClick={event => {
          event.stopPropagation();
          setShowDropdownAC(false);
        }}
      >
        <h4>Admin Console</h4>
        <h6>Start a Site Wide Warning</h6>
        <div
          style={styles.dropdownButton}
          onClick={event => {
            event.stopPropagation();
            setShowDropdownAC(!showDropdownAC);
          }}
        >
          <div>{currentAdminConsole?.type}</div>
          <ChevronIcon
            size={30}
            color={iconColor}
            onMouseEnter={() => setIconColor('#525252')}
            onMouseLeave={() => setIconColor('#414141')}
            onClick={event => {
              event.stopPropagation();
              setShowDropdownAC(!showDropdownAC);
            }}
          />
        </div>
        {showDropdownAC ? (
          <ChangeAdminConsoleDropdown
            warnings={
              data
                ? data.warningMany.map(({_id, type, label}) => {
                    return {id: _id, type, label} as Warning;
                  })
                : []
            }
            onSelect={warning => {
              setShowDropdownAC(!showDropdownAC);
              setNextAdminConsole(warning);
            }}
          />
        ) : null}
        <div style={styles.footer}>
          <div
            style={{...styles.cancelButton, opacity: cancelButtonOpacity}}
            onClick={onExitModal}
            onMouseEnter={() => setCancelButtonOpacity(0.8)}
            onMouseLeave={() => setCancelButtonOpacity(1.0)}
          >
            Cancel
          </div>
          <div
            style={{...styles.cancelButton, opacity: cancelButtonOpacity}}
            onClick={event => {
              event.stopPropagation();
              setShowModal(false);
              setCurrentAdminConsole(null);
              Logger.info('End admin console');
              onExitModal();
            }}
            onMouseEnter={() => setCancelButtonOpacity(0.8)}
            onMouseLeave={() => setCancelButtonOpacity(1.0)}
          >
            End Warning
          </div>
          <div
            style={{
              ...styles.changeAdminConsoleButton,
              opacity:
                nextAdminConsole === null
                  ? 0.5
                  : changeAdminConsoleButtonOpacity,
            }}
            onMouseEnter={() =>
              nextAdminConsole !== null &&
              setChangeAdminConsoleButtonOpacity(0.8)
            }
            onMouseLeave={() =>
              nextAdminConsole !== null &&
              setChangeAdminConsoleButtonOpacity(1.0)
            }
            onClick={event => {
              event.stopPropagation();
              if (nextAdminConsole !== null) {
                setShowModal(false);
                setCurrentAdminConsole(nextAdminConsole);
                Logger.info(
                  'Switched Admin Console to ' + nextAdminConsole?.type
                );
                onExitModal();
              }
            }}
          >
            Start Warning
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAdminConsoleModal;
