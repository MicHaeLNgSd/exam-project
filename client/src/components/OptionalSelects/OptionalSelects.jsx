import React from 'react';
import CONSTANTS from '../../constants';
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import styles from '../ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';

const classesFormInput = {
  container: styles.componentInputContainer,
  input: styles.input,
  warning: styles.warning,
};

const classesSelectInput = {
  inputContainer: styles.selectInputContainer,
  inputHeader: styles.selectHeader,
  selectInput: styles.select,
  warning: styles.warning,
};

const OptionalSelects = (props) => {
  if (props.isFetching) {
    return <Spinner />;
  }
  switch (props.contestType) {
    case CONSTANTS.NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name="typeOfName"
            header="type of company"
            optionsArray={props.dataForContest.data.typeOfName}
            classes={classesSelectInput}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            optionsArray={props.dataForContest.data.nameStyle}
            classes={classesSelectInput}
          />
        </>
      );
    }
    case CONSTANTS.LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={classesFormInput}
            />
          </div>
          <SelectInput
            name="brandStyle"
            header="Brand Style"
            optionsArray={props.dataForContest.data.brandStyle}
            classes={classesSelectInput}
          />
        </>
      );
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={classesFormInput}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            header="Type tagline"
            optionsArray={props.dataForContest.data.typeOfTagline}
            classes={classesSelectInput}
          />
        </>
      );
    }
    default:
      return;
  }
};

export default OptionalSelects;
