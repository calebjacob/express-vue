import { configure, defineRule } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import rules from '@vee-validate/rules';

export default function configureVeeValidate() {
  configure({
    generateMessage: localize({
      en
    })
  });

  configure({
    generateMessage: localize('en', {
      messages: {
        confirmed: 'This confirmation field does not match'
      }
    })
  });

  Object.keys(rules).forEach((rule) => {
    defineRule(rule, rules[rule]);
  });
}
