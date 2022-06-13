import React, {useState} from 'react';
import {Warning} from '../models/Warnings';

const styles: {[key: string]: React.CSSProperties} = {
  dropdown: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    width: '450px',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#C6C6C6',
    padding: '10px',
    marginTop: '220px',
    backgroundColor: '#FFFFFF',
    zIndex: 1,
  },
  menuItem: {
    padding: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'default',
  },
};

type DropdownProps = {
  warnings: Warning[];
  onSelect: (warning: Warning) => void;
};

const ChangeAdminConsoleDropdown = (props: DropdownProps) => {
  const [hoveredMenuItemKey, setHoveredMenuItemKey] = useState<string | null>(
    null
  );
  return (
    <div style={styles.dropdown}>
      {props.warnings.length > 0 ? (
        props.warnings.map((warning: Warning) => {
          return (
            <div
              key={warning.id}
              style={{
                ...styles.menuItem,
                backgroundColor:
                  hoveredMenuItemKey === warning.id ? '#EEEEEE' : '#FFFFFF',
              }}
              onClick={() => {
                props.onSelect(warning);
              }}
              onMouseEnter={() => setHoveredMenuItemKey(warning.id)}
              onMouseLeave={() => setHoveredMenuItemKey(null)}
            >
              {warning.type}
              <br></br>
              <small>{warning.label}</small>
            </div>
          );
        })
      ) : (
        <div style={styles.menuItem}>No Warnings Available</div>
      )}
    </div>
  );
};

export default ChangeAdminConsoleDropdown;
