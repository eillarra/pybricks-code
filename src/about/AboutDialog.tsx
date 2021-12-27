// SPDX-License-Identifier: MIT
// Copyright (c) 2021 The Pybricks Authors

// The about dialog

import { AnchorButton, Button, Classes, Dialog } from '@blueprintjs/core';
import { firmwareVersion } from '@pybricks/firmware';
import { useI18n } from '@shopify/react-i18n';
import React, { useState } from 'react';
import {
    appName,
    appVersion,
    changelogUrl,
    legoDisclaimer,
    pybricksCopyright,
    pybricksWebsiteUrl,
} from '../app/constants';
import LicenseDialog from '../licenses/LicenseDialog';
import ExternalLinkIcon from '../utils/ExternalLinkIcon';
import { AboutStringId } from './i18n';
import en from './i18n.en.json';

import './about.scss';

type AboutDialogProps = { isOpen: boolean; onClose: () => void };

const AboutDialog: React.FunctionComponent<AboutDialogProps> = (props) => {
    const [isLicenseDialogOpen, setIsLicenseDialogOpen] = useState(false);

    const [i18n] = useI18n({ id: 'about', translations: { en }, fallback: en });

    return (
        <Dialog
            title={`Pybricks v${firmwareVersion} (${appName} v${appVersion})`}
            isOpen={props.isOpen}
            onClose={() => props.onClose()}
        >
            <div className={Classes.DIALOG_BODY}>
                <div className="pb-about-icon">
                    <img src="favicon.ico" />
                </div>
                <p>
                    <strong>{i18n.translate(AboutStringId.Description)}</strong>
                </p>
                <p>{pybricksCopyright}</p>
            </div>
            <div className={Classes.DIALOG_FOOTER}>
                <p>
                    <small>{legoDisclaimer}</small>
                </p>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                    <Button onClick={() => setIsLicenseDialogOpen(true)}>
                        {i18n.translate(AboutStringId.LicenseButtonLabel)}
                    </Button>
                    <AnchorButton href={changelogUrl} target="blank_">
                        {i18n.translate(AboutStringId.ChangelogButtonLabel)}
                        <ExternalLinkIcon />
                    </AnchorButton>
                    <AnchorButton href={pybricksWebsiteUrl} target="blank_">
                        {i18n.translate(AboutStringId.WebsiteButtonLabel)}
                        <ExternalLinkIcon />
                    </AnchorButton>
                </div>
            </div>
            <LicenseDialog
                isOpen={isLicenseDialogOpen}
                onClose={() => setIsLicenseDialogOpen(false)}
            />
        </Dialog>
    );
};

export default AboutDialog;
