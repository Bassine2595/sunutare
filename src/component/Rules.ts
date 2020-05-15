import _ from "lodash";

export const MeasureRule: [{}] = [
  {
    type: "float",
  },
];

export const RequiredRule = [
  {
    required: true,
  },
];

export const PriceRule = () => ({
  validator(rule, value) {
    const price = _.toNumber(value);
    if (_.isNaN(price) || price < 0) {
      return Promise.reject("Prix non valide!");
    }
    return Promise.resolve();
  },
});

export const MailRule = _.concat<{}>(RequiredRule, [
  {
    type: "email",
  },
]);

export const PasswordRule = _.concat<{}>(RequiredRule, [
  {
    min: 2,
  },
]);

export const ConfirmPasswordRule = _.concat(PasswordRule, [
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("Les deux mots de passe doivent correspondre !");
    },
  }),
]);

export const PhoneRule = _.concat<{}>(RequiredRule, [
  {
    min: 8,
  },
]);
