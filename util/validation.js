/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SARL (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SARL (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 */
import Construct from 'can-construct';
import XRegExp from 'xregexp';

/**
 * @parent Mad.core_api
 * @inherits can.Construct
 *
 * The aim of the object Validation is to offer to developers a way to validate their
 * data. This utility is massively used by the mad.Form component.
 */
const Validation = Construct.extend('mad.Validation', /** @static */ {

  /**
   * Validate a value following a given rule. This model helper is used by the
   * model to validate their attributes.
   *
   * @param {string} rule The rule name
   * @param {mixed} value The value to validate
   * @param {array} options Optional parameters
   */
  validate: function(rule, value, values, options) {
    if (typeof rule == 'object') {
      options = rule;

      // The target rule has not been defined.
      if (typeof rule.rule == 'undefined') {
        throw mad.Exception.get(mad.error.WRONG_PARAMETER, 'rule.rule');
      }
      // The rule is a regex (based on the cakephp structure).
      if (rule.rule.indexOf('/') == '0') {
        rule = 'regex';
      } else if ($.isArray(rule.rule)) {
        // The rule is an array as defined by CakePHP ex: rule => array(between, 3, 64)
        options.params = rule.rule.slice(1);
        rule = rule.rule[0];
      } else {
        rule = rule.rule;
      }
    }

    if (typeof Validation[rule] == 'undefined') {
      throw mad.Exception.get(mad.error.WRONG_PARAMETER, 'rule');
    }

    return Validation[rule](value, values, options);
  },

  // get alpha condition
  _getAlphaRegExp: function(type) {
    let returnValue = '\\p{L}'; // by default every UTF8 language is allowed

    /*
     * @todo allowed options type => exception
     * check http://xregexp.com/addons/unicode/unicode-scripts.js allowed alphabet
     * An options type has been defined
     */
    if (type) {
      switch (type) {
        case 'ASCII':
          returnValue = 'a-zA-Z';
          break;
        default:
          returnValue = `\\p{${type}}`;
      }
    }

    return returnValue;
  },

  /**
   * Validate regex.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  regex: function(value, values, options) {
    options = options || {};
    let returnValue = true;
    let regexp = options.rule;
    const not = options.not || false;

    /*
     * XRegExp expects an expresion without starting/ending slashes.
     * It's a little dirty now because we don't take care of flags.
     */
    if (regexp.indexOf('/') == 0) {
      regexp = regexp.substr(1, regexp.length - (regexp.length - regexp.lastIndexOf('/') + 1));
    }
    const xregexp = new XRegExp(regexp);
    const match = xregexp.test(value);

    if ((not && match) || (!not && !match)) {
      returnValue = options.message || __('The regex is not validated');
    }
    return returnValue;
  },

  /**
   * Validate not empty.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  notEmpty: function(value, values, options) {
    options = options || {};
    if (typeof value == 'undefined'
            || value == null
            || ($.isArray(value) && !value.length)
            || $.trim(value) == '') {
      return options.message || __('Should not be empty');
    }
    return true;
  },

  /**
   * Validate not blank (notEmpty alias).
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   */
  notBlank: function(value, values, options) {
    return this.notEmpty(value, values, options);
  },

  /**
   * Validate uuid.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  uuid: function(value, values, options) {
    options = options || {};
    const regexp = "^[abcdef0-9]{8}-[abcdef0-9]{4}-[abcdef0-9]{4}-[abcdef0-9]{4}-[abcdef0-9]{12}$";
    const xregexp = new XRegExp(regexp);

    if (!xregexp.test(value)) {
      return options.message || __('Not valid uuid');
    }
    return true;
  },

  /**
   * Validate alphanumeric.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  alphaNumeric: function(value, values, options) {
    options = options || {};
    const alphaRegExp = Validation._getAlphaRegExp(options.type);
    const xregexp = new XRegExp(`^[${alphaRegExp} \'0-9]*$`);

    if (!xregexp.test(value)) {
      return __('Only alpha-numeric characters allowed');
    }
    return true;
  },

  /**
   * Validate alpha.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  alpha: function(value, values, options) {
    options = options || {};
    const alphaRegExp = Validation._getAlphaRegExp(options.type);
    const xregexp = XRegExp(`^[${alphaRegExp} \']*$`);
    if (!xregexp.test(value)) {
      return __(`Only ${options.type} characters allowed`);
    }
    return true;
  },

  /**
   * Check that the input value is a utf8 string.
   * This method will reject all non-string values.
   *
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  utf8Extended: function(value, values, options) {
    options = options || {};
    const message = options.message || __('Only utf8 characters allowed.');

    if (typeof value !== 'string') {
      return message;
    }

    return true;
  },

  /**
   * Check that the input value is a utf8 string.
   * This method will reject all non-string values.
   *
   * Disallow bytes higher within the basic multilingual plane (Code up to U+FFFF).
   * (emoticons + $ € £ ^ ...)
   * MySQL's older utf8 encoding type does not allow characters above the basic multilingual plane.
   *
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  utf8: function(value, values, options) {
    options = options || {};
    const message = options.message || __('Only utf8 characters allowed (except emoticons).');

    if (typeof value !== 'string') {
      return message;
    }

    // Check that there is no character from the extended range \u10000 to \u10FFFF
    if (/[\u{10000}-\u{10FFFF}]/u.test(value)) {
      return message;
    }

    return true;
  },

  /**
   * Validate numeric.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  num: function(value) {
    const xregexp = XRegExp("^-?[0-9]+\.?[0-9]*$");
    if (!xregexp.test(value)) {
      return __('Only numeric characters allowed');
    }
    return true;
  },

  /**
   * Validate required.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  required: function(value, values, options) {
    options = options || {};
    const xregexp = XRegExp("^[\s\n\t ]*$");
    if (typeof value == 'undefined' || value === null || xregexp.test(value)) {
      return options.message || __('This information is required');
    }
    return true;
  },

  /**
   * Validate text.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  text: function(value) {
    const xregexp = XRegExp("<(.|\n)*?>");
    if (xregexp.test(value)) {
      return __('No HTML tags allowed');
    }
    return true;
  },

  /**
   * Validate url.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  url: function(value) {
    const regex = "^\
				([a-z0-9+.-]+):\
					(?:\
						(?:((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*)@)?\
						((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*)\
						(?::(\d*))?\
						(/(?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?\
					|\
						(/?(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?\
				)\
				(?:\
					\((?:[a-z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*)\
				)?\
				(?:\
					#((?:[a-z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*)\
				)?\
			$";

    const xregexp = XRegExp(regex);
    if (xregexp.test(value)) {
      return __('Not valid url.');
    }
    return true;
  },

  /**
   * Validate no space.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  nospace: function(value) {
    const xregexp = XRegExp("[ ]+");
    if (xregexp.test(value)) {
      return __('No space are allowed');
    }
    return true;
  },

  /**
   * Validate email.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  email: function(value, values, options) {
    options = options || {};

    // Regular expression for hostname.
    const hostnameRegexp = "(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[a-z]{2,})";
    const emailRegexp = `^[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&'*+\/=?^_\`{|}~-]+)*@${hostnameRegexp}$`;
    const xregexp = XRegExp(emailRegexp);
    if (!xregexp.test(value)) {
      return options.message || __('Only email format is allowed');
    }
    return true;
  },

  /**
   * Validate date.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  date: function(value, values, options) {
    value = value || '';
    options = options || {};
    const format = options.format || 'dd/mm/yyyy';
    let yearPos = null;
    let monthPos = null;
    let dayPos = null;
    const days = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let dateRegExp = '';
    let  returnValue = true;

    switch (format) {
      case 'm/d/y':
        dateRegExp = /^(\d{1,2})[./-](\d{1,2})[./-](\d{2}|\d{4})$/;
        monthPos = 1;
        dayPos = 2;
        yearPos = 3;
        break;

      case 'mm/dd/yy':
        dateRegExp = /^(\d{1,2})[./-](\d{1,2})[./-](\d{2})$/;
        monthPos = 1;
        dayPos = 2;
        yearPos = 3;
        break;

      case 'mm/dd/yyyy':
        dateRegExp = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/;
        monthPos = 1;
        dayPos = 2;
        yearPos = 3;
        break;

      case 'dd/mm/yyyy':
        dateRegExp = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/;
        monthPos = 2;
        dayPos = 1;
        yearPos = 3;
        break;

      case 'd/m/yy':
        dateRegExp = /^(\d{1,2})[./-](\d{1,2})[./-](\d{2}|\d{4})$/;
        monthPos = 2;
        dayPos = 1;
        yearPos = 3;
        break;

      case 'y/m/d':
        dateRegExp = /^(\d{2}|\d{4})[./-](\d{1,2})[./-](\d{1,2})$/;
        monthPos = 2;
        dayPos = 3;
        yearPos = 1;
        break;

      case 'yy/mm/dd':
        dateRegExp = /^(\d{4}|\d{1,2})[./-](\d{1,2})[./-](\d{1,2})$/;
        monthPos = 2;
        dayPos = 3;
        yearPos = 1;
        break;

      case 'yyyy/mm/dd':
        dateRegExp = /^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/;
        monthPos = 2;
        dayPos = 3;
        yearPos = 1;
        break;
    }

    const dateParts = value.match(dateRegExp);
    if (!dateParts) {
      returnValue = __('The date format is incorect, expected : ') + format;
    } else {
      const year = Number(dateParts[yearPos]);
      const month = Number(dateParts[monthPos]);
      const day = Number(dateParts[dayPos]);

      // check date numbers
      if (day < 1 || day > days[month] ||
                month < 1 || month > 12) {
        returnValue = __('The date format is incorect, expected : ') + format;
      }

      // check leap year
      if (month == 2 && day == 29) {
        const isLeapYear = (year % 4 != 0 ? false :
          (year % 100 != 0 ? true :
            (year % 1000 != 0 ? false : true)));

        if (!isLeapYear) {
          returnValue = __('The year %s is not a leap year', year);
        }
      }
    }
    return returnValue;
  },

  /**
   * Validate length between.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  lengthBetween: function(value, values, options) {
    value = value || '';
    options = options || [];
    let returnValue = true;
    const min = options.params[0] || null;
    const max = options.params[1] || null;

    if ((min != null && value.length < min) || (max != null && value.length > max)) {
      returnValue = options.message ? __(options.message, min, max) : __('Must be between %s and %s characters long', min, max);
    }

    return returnValue;
  },

  /**
   * Validate max length.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  maxLength: function(value, values, options) {
    value = value || '';
    options = options || [];
    let returnValue = true;
    const max = options.params[0] || null;

    if (value.length > max) {
      returnValue = options.message ? __(options.message, max) : __('The length should be maximum %s characters long', max);
    }

    return returnValue;
  },

  /**
   * Validate foreign rule.
   * @param {mixed} value The value to validate
   * @param {array} values The contextual values
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  foreignRule: function(value, options) {
    let returnValue = true;
    if (options.model && options.model.validateRules && options.attribute) {
      for (const i in options.model.validateRules[options.attribute]) {
        const rule = options.model.validateRules[options.attribute][i];
        const foreignReturnValue = Validation.validate(rule, value);
        if (foreignReturnValue !== true) {
          returnValue = foreignReturnValue;
          break;
        }
      }
    }
    return returnValue;
  },

  /**
   * Validate choice
   * @param {mixed} value The value to validate
   * @param {array} options Optional parameters
   * @return {boolean|string} True if success, the error message if it failed
   */
  choice: function(value, options) {
    let returnValue = true;
    let choices = [];
    value = (typeof value == 'undefined') ? null : value;

    if (options.choices) {
      choices = options.choices;
    } else if (options.callback) {
      choices = options.callback.apply(this);
    }

    if (choices.indexOf(value) == -1) {
      returnValue = __("%s is not a valid value", value);
    }

    return returnValue;
  }

}, /** @prototype */ {});

export default Validation;
