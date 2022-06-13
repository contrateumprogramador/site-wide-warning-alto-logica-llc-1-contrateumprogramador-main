import {MockedProvider} from '@apollo/client/testing';
import {RecoilRoot} from 'recoil';
import {render, waitFor} from '@testing-library/react';
import React from 'react';

import {
  currentAdminConsoleState,
  nextAdminConsoleState,
} from '../atoms/AdminConsoleState';
import {RecoilObserver} from '../components/RecoilObserver';
import {showDropdownACState} from '../atoms/ChangeAdminConsoleDropdownState';
import {showModalStateAC} from '../atoms/ChangeAdminConsoleModalState';
import {showSettingsMenuState} from '../atoms/SettingsMenuState';
import ChangeAdminConsoleModal, {
  GET_WARNINGS,
} from '../components/ChangeAdminConsoleModal';

const mocks = [
  {
    request: {
      query: GET_WARNINGS,
      variables: {
        limit: 100,
      },
    },
    result: {
      data: {
        warningMany: [
          {
            _id: '1',
            type: 'bulldog',
            label: 'buck@bulldog.com',
          },
        ],
      },
    },
  },
];

it('renders without error', async () => {
  const onChange = jest.fn();
  const {queryByTestId} = render(
    <MockedProvider mocks={mocks}>
      <RecoilRoot>
        <RecoilObserver node={showModalStateAC} onChange={onChange} />
        <RecoilObserver node={showDropdownACState} onChange={onChange} />
        <RecoilObserver node={showSettingsMenuState} onChange={onChange} />
        <RecoilObserver node={currentAdminConsoleState} onChange={onChange} />
        <RecoilObserver node={nextAdminConsoleState} onChange={onChange} />
        <ChangeAdminConsoleModal />
      </RecoilRoot>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('change_adminconsole_modal')).toBeInTheDocument();
  });
});
