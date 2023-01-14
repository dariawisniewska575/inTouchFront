import React, { useCallback } from 'react';
import { DdContainer } from './DefaultDropzoneStyles';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';
import { changeAvatarRequest } from 'src/api/accountApi';
import { handleApiError } from 'src/common/helpers/errorHelper';

const DefaultDropzone: React.FC = () => {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

    const files = acceptedFiles.map((file) => {
        return file;
    });

    const handleAdd = useCallback(async () => {
        try {
            await changeAvatarRequest({ avatar: files[0] });
            window.location.reload();
        } catch (ex) {
            handleApiError(ex);
        }
    }, [files]);
    return (
        <>
            <DdContainer {...getRootProps()}>
                <input {...getInputProps()} />

                <p style={{ cursor: 'pointer' }}>Dodaj plik</p>
            </DdContainer>
            <Button disabled={files.length === 0 ? true : false} onClick={() => handleAdd()}>
                Zmień
            </Button>
        </>
    );
};

export default DefaultDropzone;
