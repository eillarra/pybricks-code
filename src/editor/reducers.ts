// SPDX-License-Identifier: MIT
// Copyright (c) 2020-2022 The Pybricks Authors

import { monaco } from 'react-monaco-editor';
import { Reducer, combineReducers } from 'redux';
import { didSetEditSession } from './actions';

const current: Reducer<monaco.editor.ICodeEditor | null> = (state = null, action) => {
    if (didSetEditSession.matches(action)) {
        return action.editSession || null;
    }

    return state;
};

export default combineReducers({ current });
