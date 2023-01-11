import React from 'react';
import DefaultDropzone from 'src/components/common/stateless/default-dropzone/DefaultDropzone';
import { USSmallBox } from './UserSettingStyles';

const UserSettingsAvatar: React.FC = () => {
    return (
        <USSmallBox sx={{ mt: 1 }}>
            <DefaultDropzone />
        </USSmallBox>
    );
};

export default UserSettingsAvatar;
