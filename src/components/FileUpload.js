import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from 'redux';

import { DropzoneArea } from 'material-ui-dropzone';
import { useHistory } from 'react-router-dom';

import './FileUpload.scss';
import { useUser } from '../utils/user';
import Loader from './Loader';
import { actionCreators } from '../redux';

const FileUpload = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useUser()
    const { uploadCat } = bindActionCreators(actionCreators, dispatch);
    const { isUploading } = useSelector((state) => state.cats);

    const [files, setFiles] = useState();
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(isUploading);

    useEffect(() => {
        setIsLoading(isUploading);
        setDisabled(true)
    }, [isUploading, dispatch])

    const onSubmit = async () => {
        if (disabled) return;
        setIsLoading(true);
        await uploadCat(files[0], history, user);
        setIsLoading(false);
    }

    if (isLoading) return <Loader />

    return <div className="uploadconatiner">
        <DropzoneArea acceptedFiles={['image/png', 'image/jpeg']} filesLimit={1} onDrop={() => { setDisabled(false) }} onChange={(files) => { setFiles(files); }} />
        <br />
        <button className="uploadbutton button" onClick={() => history.push('/')}>Go back to Gallery</button>
        <button className={disabled === true ? 'uploadbutton button-submit-disabled' : 'uploadbutton button-submit'} onClick={onSubmit} disabled={disabled}>Upload</button>
    </div>
}
export default FileUpload;
