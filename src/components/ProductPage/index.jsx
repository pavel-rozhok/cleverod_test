import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//@material-ui
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//components
import Form from '../../components/Form';

//actions
import { alertOpen } from '../../redux/actions/alert';

//utils
import uploadImage from '../../utils/uploadImage';

//hooks
import { useFormBuilder } from '../../hooks/useFormBuilder';

import formParam from './formParam';
import './style.scss';

const ProductPage = (props) => {
  const {
    propAlertOpen,
    pageData = {},
    imageUrl = '',
    isLoading,
    sendData,
  } = props;

  const {
    form,
    getFormData,
    onChange,
    onBlur,
  } = useFormBuilder(formParam, pageData);

  const fileInput = useRef(null);

  // for celar fileInput value
  const [inputFileKey, setInputFileKey] = useState(null);

  const [[imageFile, imageBase64], setImage] = useState([null, imageUrl]);

  const onFileLoad = async (e) => {
    setInputFileKey(Date.now());
    try {
      const image = await uploadImage(e);
      setImage(image);
    } catch ({message}) {
      propAlertOpen({ message });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = getFormData();
    if (formData && imageBase64) {
      sendData(formData, imageFile);
    } else if (!imageBase64) {
      propAlertOpen({ message: 'Необходимо добавить фотографию' });
    }
  };

  const loader = isLoading && <CircularProgress className="g-spiner" />;

  return (
    <>
      { loader }
      <div className="create-product">
        <div className="create-product__form-wrapper">
          <Form
            form={form}
            onSubmit={onSubmit}
            onChange={onChange}
            onBlur={onBlur}
          >
            <input
              className="create-product__file-input"
              type="file"
              onChange={onFileLoad}
              accept="image/*"
              ref={fileInput}
              key={inputFileKey}
            />
            {
              imageBase64 && (
                <img
                  alt="candidate"
                  className="create-product__image"
                  src={imageBase64}
                />
              )
            }
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={() => fileInput.current.click()}
              startIcon={<PhotoCamera />}
            >
              {imageBase64 ? 'Изменить фотографию' : 'Добавить фотографию'}
            </Button>
            <div className="create-product__footer">
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Сохранить
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    propAlertOpen: (payload) => dispatch(alertOpen(payload)),
  };
};

ProductPage.propTypes = {
  propAlertOpen: PropTypes.func,
  sendData: PropTypes.func,
  pageData: PropTypes.object,
  imageUrl: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default connect(null, mapDispatchToProps)(ProductPage);
