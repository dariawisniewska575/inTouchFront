import React, { useCallback } from 'react';

import { DdContainer } from './DefaultDropzoneStyles';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';

const DefaultDropzone: React.FC = () => {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

    const files = acceptedFiles.map((file) => {
        return file;
    });

    const handleAdd = useCallback(async () => {
        //  console.log('a');
    }, []);
    return (
        <>
            <DdContainer {...getRootProps()}>
                <input {...getInputProps()} />

                <p style={{ cursor: 'pointer' }}>Dodaj plik</p>
            </DdContainer>
            {files.map((file) => (
                <div key={file.name}>
                    <aside key={file.name}>{file.name}</aside>
                    <img src={URL.createObjectURL(file)} />
                </div>
            ))}
            <Button disabled={files.length === 0 ? true : false} onClick={() => handleAdd()}>
                Zmień
            </Button>
        </>
    );
};

export default DefaultDropzone;
