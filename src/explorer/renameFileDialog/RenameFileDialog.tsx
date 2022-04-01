// SPDX-License-Identifier: MIT
// Copyright (c) 2022 The Pybricks Authors

import { Button, Classes, Dialog } from '@blueprintjs/core';
import { useI18n } from '@shopify/react-i18n';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    FileNameValidationResult,
    validateFileName,
} from '../../pybricksMicropython/lib';
import { useSelector } from '../../reducers';
import FileNameFormGroup from '../fileNameFormGroup/FileNameFormGroup';
import { renameFileDialogDidAccept, renameFileDialogDidCancel } from './actions';
import { I18nId } from './i18n';

const RenameFileDialog: React.VFC = () => {
    // istanbul ignore next: babel-loader rewrites this line
    const [i18n] = useI18n();
    const dispatch = useDispatch();
    const isOpen = useSelector((s) => s.explorer.renameFileDialog.isOpen);
    const oldName = useSelector((s) => s.explorer.renameFileDialog.fileName);

    const [baseName, extension] = oldName.split(/(\.\w+)$/);

    const [newName, setNewName] = useState(baseName);
    const fileNames = useSelector((s) => s.fileStorage.fileNames);
    const result = validateFileName(newName, extension, fileNames);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = useCallback<React.FormEventHandler>(
        (e) => {
            e.preventDefault();
            dispatch(renameFileDialogDidAccept(oldName, `${newName}${extension}`));
        },
        [dispatch, oldName, newName, extension],
    );

    const handleClose = useCallback(() => {
        dispatch(renameFileDialogDidCancel());
    }, [dispatch]);

    return (
        <Dialog
            title={i18n.translate(I18nId.Title, {
                fileName: oldName,
            })}
            isOpen={isOpen}
            onOpening={() => setNewName(baseName)}
            onOpened={() => {
                inputRef.current?.select();
                inputRef.current?.focus();
            }}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit}>
                <div className={Classes.DIALOG_BODY}>
                    <FileNameFormGroup
                        fileName={newName}
                        fileExtension={extension}
                        validationResult={result}
                        inputRef={inputRef}
                        onChange={setNewName}
                    />
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            intent="primary"
                            disabled={result !== FileNameValidationResult.IsOk}
                            type="submit"
                        >
                            {i18n.translate(I18nId.ActionRename)}
                        </Button>
                    </div>
                </div>
            </form>
        </Dialog>
    );
};

export default RenameFileDialog;