import React from 'react';
import CONSTANTS from '../../constants';
import SelectInput from '../InputComponents/SelectInput/SelectInput';
import FormInput from '../InputComponents/FormInput/FormInput';
import styles from '../Forms/ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import BUTTON_GROUP_LIST from './ButtonGroupData';

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

const classesButtonGroup = {
  groupContainer: styles.selectInputContainer,
  groupHeader: styles.selectHeader,
};

const OptionalSelects = (props) => {
  if (props.isFetching) {
    return <Spinner />;
  }
  switch (props.contestType) {
    case CONSTANTS.CONTEST_TYPE.NAME: {
      return (
        <>
          <ButtonGroup
            name="nameMatchingDomain"
            header="Do you want a matching domain (.com URL) with your name?"
            buttons={BUTTON_GROUP_LIST}
            classes={classesButtonGroup}
          />
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
    case CONSTANTS.CONTEST_TYPE.LOGO: {
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
    case CONSTANTS.CONTEST_TYPE.TAGLINE: {
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
