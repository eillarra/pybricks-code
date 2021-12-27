// SPDX-License-Identifier: MIT
// Copyright (c) 2021 The Pybricks Authors

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { BleConnectionState } from '../ble/reducers';
import StatusBar from './StatusBar';

it('should prevent browser context menu', () => {
    const store = {
        getState: jest.fn(() => ({
            ble: { connection: BleConnectionState.Disconnected, deviceName: '' },
        })),
        dispatch: jest.fn(),
        subscribe: jest.fn(),
    } as unknown as Store;
    render(
        <Provider store={store}>
            <StatusBar />
        </Provider>,
    );

    expect(fireEvent.contextMenu(screen.getByRole('status'))).toBe(false);
});
