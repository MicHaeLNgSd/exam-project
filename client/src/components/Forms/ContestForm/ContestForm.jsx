import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import { getDataForContest } from '../../../store/slices/dataForContestSlice';
import styles from './ContestForm.module.sass';
import Spinner from '../../Spinner/Spinner';
import FormInput from '../../InputComponents/FormInput/FormInput';
import SelectInput from '../../InputComponents/SelectInput/SelectInput';
import FieldFileInput from '../../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../../TryAgain/TryAgain';
import Schems from '../../../utils/validators/validationSchems';
import OptionalSelects from '../../OptionalSelects/OptionalSelects';
import BUTTON_GROUP_LIST from '../../OptionalSelects/ButtonGroupData';

const variableOptions = {
  [CONSTANTS.CONTEST_TYPE.NAME]: {
    styleName: '',
    typeOfName: '',
    nameMatchingDomain: BUTTON_GROUP_LIST[0].value,
  },
  [CONSTANTS.CONTEST_TYPE.LOGO]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.CONTEST_TYPE.TAGLINE]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

const classesFormInput = {
  container: styles.componentInputContainer,
  input: styles.input,
  warning: styles.warning,
};

const classesFormTextArea = {
  container: styles.componentInputContainer,
  inputStyle: styles.textArea,
  warning: styles.warning,
};

const classesSelectInput = {
  inputContainer: styles.selectInputContainer,
  inputHeader: styles.selectHeader,
  selectInput: styles.select,
  warning: styles.warning,
};

const classesFieldFileInput = {
  fileUploadContainer: styles.fileUploadContainer,
  labelClass: styles.label,
  fileNameClass: styles.fileName,
  fileInput: styles.fileInput,
  warning: styles.warning,
  closeIcon: styles.closeIcon,
};

class ContestForm extends React.Component {
  getPreference = () => {
    const { contestType } = this.props;
    switch (contestType) {
      case CONSTANTS.CONTEST_TYPE.NAME: {
        this.props.getData({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.CONTEST_TYPE.TAGLINE: {
        this.props.getData({ characteristic1: 'typeOfTagline' });
        break;
      }
      case CONSTANTS.CONTEST_TYPE.LOGO: {
        this.props.getData({ characteristic1: 'brandStyle' });
        break;
      }
      default:
        break;
    }
  };

  componentDidMount() {
    this.getPreference();
  }

  render() {
    const { isFetching, error } = this.props.dataForContest;
    if (error) {
      return <TryAgain getData={this.getPreference} />;
    }
    if (isFetching) {
      return <Spinner />;
    }
    return (
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            title: '',
            industry: '',
            focusOfWork: '',
            targetCustomer: '',
            file: '',
            ...variableOptions[this.props.contestType],
            ...this.props.initialValues,
          }}
          onSubmit={this.props.handleSubmit}
          validationSchema={Schems.ContestSchem}
          innerRef={this.props.formRef}
          enableReinitialize
        >
          <Form>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Title of contest</span>
              <FormInput
                name="title"
                type="text"
                label="Title"
                classes={classesFormInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <SelectInput
                name="industry"
                header="Describe industry associated with your venture"
                optionsArray={this.props.dataForContest.data.industry}
                classes={classesSelectInput}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                What does your company / business do?
              </span>
              <FormTextArea
                name="focusOfWork"
                type="text"
                label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                classes={classesFormTextArea}
              />
            </div>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                Tell us about your customers
              </span>
              <FormTextArea
                name="targetCustomer"
                type="text"
                label="customers"
                classes={classesFormTextArea}
              />
            </div>
            <OptionalSelects {...this.props} />
            <FieldFileInput
              name="file"
              type="file"
              classes={classesFieldFileInput}
            />
            {this.props.isEditContest ?? (
              <button type="submit" className={styles.changeData}>
                Set Data
              </button>
            )}
          </Form>
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { isEditContest } = state.contestByIdStore;
  return {
    isEditContest,
    contestCreationStore: state.contestCreationStore,
    dataForContest: state.dataForContest,
    initialValues: ownProps.defaultData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(getDataForContest(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContestForm)
);
