import * as yup from 'yup';
import valid from 'card-validator';

const Schems = {
  LoginSchem: yup.object().shape({
    email: yup.string().email('check email').required('required'),
    password: yup
      .string()
      .test(
        'test-password',
        'min 6 symbols',
        (value) => value && value.trim().length >= 6
      )
      .required('required'),
  }),
  RegistrationSchem: yup.object().shape({
    email: yup.string().email('check email').required('Email is required'),
    password: yup
      .string()
      .test(
        'test-password',
        'min 6 symbols',
        (value) => value && value.trim().length >= 6
      )
      .required('required'),
    confirmPassword: yup
      .string()
      .required('confirm password is required')
      .oneOf([yup.ref('password')], 'confirmation pass must match password'),
    firstName: yup
      .string()
      .test(
        'test-firstName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(30, 'Maximum 30 characters')
      .required('First Name is required'),
    lastName: yup
      .string()
      .test(
        'test-lastName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(30, 'Maximum 30 characters')
      .required('Last Name is required'),
    displayName: yup
      .string()
      .test(
        'test-displayName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(30, 'Maximum 30 characters')
      .required('Display Name is required'),
    role: yup
      .string()
      .matches(/(customer|creator)/)
      .required('Role is required'),
    agreeOfTerms: yup
      .boolean()
      .oneOf([true], 'Must Accept Terms and Conditions')
      .required('Must Accept Terms and Conditions'),
  }),
  ContestSchem: yup.object({
    contestType: yup
      .string()
      .matches(/(name|tagline|logo)/)
      .required(),
    title: yup
      .string()
      .test(
        'test-title',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(255)
      .required('title of contest required'),
    industry: yup.string().required('industry required'),
    focusOfWork: yup
      .string()
      .test(
        'test-focusOfWork',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('focus of work required'),
    targetCustomer: yup
      .string()
      .test(
        'test-targetCustomer',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('target customers required'),
    nameVenture: yup
      .string()
      .min(3)
      .when('contestType', {
        is: (val) => /(tagline|logo)/.test(val),
        then: yup.string().required('name of venture required'),
      }),
    styleName: yup.string().min(1),
    typeOfName: yup.string().min(1),
    typeOfTagline: yup.string().min(1),
    brandStyle: yup.string().min(1),
    file: yup.mixed(),
  }),
  filterSchem: yup.object().shape({
    typeIndex: yup.number().oneOf[(1, 2, 3, 4, 5, 6, 7)],
    contestId: yup.string(),
    awardSort: yup.string().matches(/(desc|asc)/),
    industry: yup.string(),
  }),
  LogoOfferSchema: yup.object().shape({
    offerData: yup.mixed().required('required'),
  }),
  TextOfferSchema: yup.object().shape({
    offerData: yup
      .string()
      .test(
        'test-offerData',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('suggestion is required'),
  }),
  PaymentSchema: yup.object().shape({
    number: yup
      .string()
      .test(
        'test-cardNumber',
        'Credit Card number is invalid',
        (value) => valid.number(value).isValid
      )
      .required('required'),
    name: yup
      .string()
      .min(1, 'required atleast one symbol')
      .required('required'),
    cvc: yup
      .string()
      .test('test-cvc', 'cvc is invalid', (value) => valid.cvv(value).isValid)
      .required('required'),
    expiry: yup
      .string()
      .test(
        'test-expiry',
        'expiry is invalid',
        (value) => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  CashoutSchema: yup.object().shape({
    sum: yup.number().min(5, 'min sum is 5$').required('required'),
    number: yup
      .string()
      .test(
        'test-cardNumber',
        'Credit Card number is invalid',
        (value) => valid.number(value).isValid
      )
      .required('required'),
    name: yup.string().min(1).required('required'),
    cvc: yup
      .string()
      .test('test-cvc', 'cvc is invalid', (value) => valid.cvv(value).isValid)
      .required('required'),
    expiry: yup
      .string()
      .test(
        'test-expiry',
        'expiry is invalid',
        (value) => valid.expirationDate(value).isValid
      )
      .required('required'),
  }),
  UpdateUserSchema: yup.object().shape({
    firstName: yup
      .string()
      .test(
        'test-firstName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(30, 'Maximum 30 characters')
      .required('required'),
    lastName: yup
      .string()
      .test(
        'test-lastName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(30, 'Maximum 30 characters')
      .required('required'),
    displayName: yup
      .string()
      .test(
        'test-displayName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(30, 'Maximum 30 characters')
      .required('required'),
    file: yup.mixed(),
  }),
  MessageSchema: yup.object({
    message: yup
      .string()
      .test(
        'test-message',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .required('required'),
  }),
  CatalogSchema: yup.object({
    catalogName: yup
      .string()
      .test(
        'test-catalogName',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .max(60, '60 chars top')
      .required('required'),
  }),
  EventCreationSchema: yup.object({
    text: yup
      .string()
      .test(
        'test-text',
        'required',
        (value) => value && value.trim().length >= 1
      )
      .min(3, 'Minimum 3 characters')
      .max(80, 'Maximum 80 characters')
      .required('required'),
    endTime: yup
      .date()
      .test('test-endTime', 'Select date from the future', function (value) {
        return value > new Date();
      })
      .required('required'),
    reminderTime: yup
      .date()
      .test(
        'test-reminderTime',
        'Select date from the future',
        function (value) {
          return value > new Date();
        }
      )
      .max(yup.ref('endTime'), 'Select date between now and end of event')
      .required('required'),
  }),
};

export default Schems;
