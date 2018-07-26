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
import "passbolt-mad/test/bootstrap";
import Validation from "passbolt-mad/util/validation";

describe("mad.Validation", () => {
  const htmlTags = ['<!DOCTYPE>', '<a>', '<abbr>', '<acronym>', '<address>', '<applet>', '<area>', '<article>', '<aside>', '<audio>', '<b>', '<base>', '<basefont>', '<bdi>', '<bdo>', '<big>', '<blockquote>', '<body>', '<br>', '<button>', '<canvas>', '<caption>', '<center>', '<cite>', '<code>', '<col>', '<colgroup>', '<command>', '<datalist>', '<dd>', '<del>', '<details>', '<dfn>', '<dir>', '<div>', '<dl>', '<dt>', '<em>', '<embed>', '<fieldset>', '<figcaption>', '<figure>', '<font>', '<footer>', '<form>', '<frame>', '<frameset>', '<head>', '<header>', '<hgroup>', '<h1> - <h6>', '<hr>', '<html>', '<i>', '<iframe>', '<img>', '<input>', '<ins>', '<kbd>', '<keygen>', '<label>', '<legend>', '<li>', '<link>', '<map>', '<mark>', '<menu>', '<meta>', '<meter>', '<nav>', '<noframes>', '<noscript>', '<object>', '<ol>', '<optgroup>', '<option>', '<output>', '<p>', '<param>', '<pre>', '<progress>', '<q>', '<rp>', '<rt>', '<ruby>', '<s>', '<samp>', '<script>', '<section>', '<select>', '<small>', '<source>', '<span>', '<strike>', '<strong>', '<style>', '<sub>', '<summary>', '<sup>', '<table>', '<tbody>', '<td>', '<textarea>', '<tfoot>', '<th>', '<thead>', '<time>', '<title>', '<tr>', '<track>', '<tt>', '<u>', '<ul>', '<var>', '<video>', '<wbr>'];
  const samples = {
    'alphaASCII': 'abcdefghijklmnopqrstuvwxyz',
    'alphaASCIIUpper': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'alphaAccent': 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÚÚÚÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ',
    'alphaLatin': 'La solution gestion de mot de passe parfaite pour les business et les petites entreprises sans oublier les accents indispensables dans l\'alphabet latin ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÚÚÚÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ',
    'alphaChinese': '完善的密碼管理解決方案 為小型公司和企業的商人',	// The perfect password management solution for businesses and small companies
    'alphaArabic': 'إدارة كلمة المرور الحل المثالي للشركات الصغيرة والشركات رجل الأعمال', // The perfect password management solution for businesses and small companies
    'alphaRussian': 'Идеальное решение для управления пароль для небольших компаний и предприятий бизнесмена', // The perfect password management solution for businesses and small companies
    'digit': '0123456789',
    'float': '3.57',
    'special': '!@#$%^&*()_-+={}[]:";<>?,./\\|~',
    'null': null,
    'email': 'passbolt_team-2016.ùnicôde@passbolt-team-2016.com',
    'date': '01/01/2012',
    'html': '<h1>La solution de gestion de mot de passe</h1> parfaite pour les <b>business</b> et les <span style="font-size:10px">petites</span> entreprises sans oublier les accents <span style="background: url()">indispensables</span> dans l\'alphabet latin ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÚÚÚÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'
  };

  it('Validation : alpha ASCII', () => {
    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('alpha', samples['alphaASCII'], null, {'type': 'ASCII'})).to.be.true;
    expect(Validation.validate('alpha', samples['alphaASCIIUpper'], null, {'type': 'ASCII'})).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('alpha', samples['alphaAccent'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['alphaLatin'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['alphaChinese'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['alphaArabic'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['alphaRussian'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['special'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['digit'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['float'], null, {'type': 'ASCII'})).to.be.a('string');
    expect(Validation.validate('alpha', samples['email'], null, {'type': 'ASCII'})).to.be.a('string');
  });

  it('Validation : alpha', () => {
    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('alpha', samples['alphaASCII'])).to.be.true;
    expect(Validation.validate('alpha', samples['alphaASCIIUpper'])).to.be.true;
    expect(Validation.validate('alpha', samples['alphaAccent'])).to.be.true;
    expect(Validation.validate('alpha', samples['alphaLatin'])).to.be.true;
    expect(Validation.validate('alpha', samples['alphaChinese'])).to.be.true;
    expect(Validation.validate('alpha', samples['alphaArabic'])).to.be.true;
    expect(Validation.validate('alpha', samples['alphaRussian'])).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('alpha', samples['special'])).to.be.a('string');
    expect(Validation.validate('alpha', samples['digit'])).to.be.a('string');
    expect(Validation.validate('alpha', samples['float'])).to.be.a('string');
    expect(Validation.validate('alpha', samples['email'])).to.be.a('string');
  });

  it('Validation : alphaNumeric', () => {
    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('alphaNumeric', samples['alphaASCII'])).to.be.true;
    expect(Validation.validate('alphaNumeric', samples['alphaASCIIUpper'])).to.be.true;
    expect(Validation.validate('alphaNumeric', samples['alphaAccent'])).to.be.true;
    expect(Validation.validate('alphaNumeric', samples['alphaLatin'])).to.be.true;
    expect(Validation.validate('alphaNumeric', samples['alphaChinese'])).to.be.true;
    expect(Validation.validate('alphaNumeric', samples['alphaArabic'])).to.be.true;
    expect(Validation.validate('alphaNumeric', samples['alphaRussian'])).to.be.true;
    expect(Validation.validate('alphaNumeric', samples['digit'])).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('alphaNumeric', samples['email'])).to.be.a('string');
    expect(Validation.validate('alphaNumeric', samples['float'])).to.be.a('string');
    expect(Validation.validate('alphaNumeric', samples['special'])).to.be.a('string');
  });

  it('Validation : num', () => {
    let str = '';
    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    // integer
    expect(Validation.validate('num', samples['digit'])).to.be.true;
    // negative integer
    expect(Validation.validate('num', `-${samples['digit']}`)).to.be.true;
    // float
    expect(Validation.validate('num', samples['float'])).to.be.true;
    // negative float
    expect(Validation.validate('num', `-${samples['float']}`)).to.be.true;
    // float with 0 in first char
    str = '0.233';
    expect(Validation.validate('num', str)).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    // mal formed float
    str = '.57';
    expect(Validation.validate('num', str)).to.be.a('string');
    // samples
    expect(Validation.validate('num', samples['email'])).to.be.a('string');
    expect(Validation.validate('num', samples['alphaASCII'])).to.be.a('string');
    expect(Validation.validate('num', samples['alphaASCIIUpper'])).to.be.a('string');
    expect(Validation.validate('num', samples['alphaAccent'])).to.be.a('string');
    expect(Validation.validate('num', samples['alphaLatin'])).to.be.a('string');
    expect(Validation.validate('num', samples['alphaChinese'])).to.be.a('string');
    expect(Validation.validate('num', samples['alphaArabic'])).to.be.a('string');
    expect(Validation.validate('num', samples['alphaRussian'])).to.be.a('string');
    expect(Validation.validate('num', samples['special'])).to.be.a('string');
  });

  it('Validation : required', () => {
    let str = '';
    ////////////////////////////////////////////////////////////////////////
    // expect success
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('required', samples['email'])).to.be.true;
    expect(Validation.validate('required', samples['alphaASCII'])).to.be.true;
    expect(Validation.validate('required', samples['alphaASCIIUpper'])).to.be.true;
    expect(Validation.validate('required', samples['alphaAccent'])).to.be.true;
    expect(Validation.validate('required', samples['alphaLatin'])).to.be.true;
    expect(Validation.validate('required', samples['alphaChinese'])).to.be.true;
    expect(Validation.validate('required', samples['alphaArabic'])).to.be.true;
    expect(Validation.validate('required', samples['alphaRussian'])).to.be.true;
    expect(Validation.validate('required', samples['digit'])).to.be.true;
    expect(Validation.validate('required', samples['float'])).to.be.true;
    expect(Validation.validate('required', samples['special'])).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('required', samples['null'])).to.be.a('string');
    str = '';
    expect(Validation.validate('required', str)).to.be.a('string');
    str = ' ';
    expect(Validation.validate('required', str)).to.be.a('string');
    str = '      ';
    expect(Validation.validate('required', str)).to.be.a('string');
    str = '\n';
    expect(Validation.validate('required', str)).to.be.a('string');
    str = '\t';
    expect(Validation.validate('required', str)).to.be.a('string');
  });

  it('Validation : email', () => {
    // List of valid cases.
    const validEmails = [
      'abc.efg@domain.com',
      'efg@domain.com',
      'abc-efg@domain.com',
      'abc_efg@domain.com',
      'raw@test.ra.ru',
      'abc-efg@domain-hyphened.com',
      "p.o'malley@domain.com",
      'abc+efg@domain.com',
      'abc&efg@domain.com',
      'abc.efg@12345.com',
      'abc.efg@12345.co.jp',
      'abc@g.cn',
      'abc@x.com',
      'henrik@sbcglobal.net',
      'sani@sbcglobal.net',
      // all ICANN TLDs
      'abc@example.aero',
      'abc@example.asia',
      'abc@example.biz',
      'abc@example.cat',
      'abc@example.com',
      'abc@example.coop',
      'abc@example.edu',
      'abc@example.gov',
      'abc@example.info',
      'abc@example.int',
      'abc@example.jobs',
      'abc@example.mil',
      'abc@example.mobi',
      'abc@example.museum',
      'abc@example.name',
      'abc@example.net',
      'abc@example.org',
      'abc@example.pro',
      'abc@example.tel',
      'abc@example.travel',
      'someone@st.t-com.hr',
      // gTLD's
      'example@host.local',
      'example@x.org',
      'example@host.xxx',
      // strange, but technically valid email addresses
      'S=postmaster/OU=rz/P=uni-frankfurt/A=d400/C=de@gateway.d400.de',
      'customer/department=shipping@example.com',
      '$A12345@example.com',
      '!def!xyz%abc@example.com',
      '_somename@example.com',
      // Unicode
      'some@eräume.foo',
      'äu@öe.eräume.foo',
      'Nyrée.surname@example.com'
    ];

    // List of invalid cases.
    const invalidEmails = [
      'abc@example',
      'abc@example.c',
      'abc@example.com.',
      'abc.@example.com',
      'abc@example..com',
      'abc@example.com.a',
      'abc;@example.com',
      'abc@example.com;',
      'abc@efg@example.com',
      'abc@@example.com',
      'abc efg@example.com',
      'abc,efg@example.com',
      'abc@sub,example.com',
      "abc@sub'example.com",
      'abc@sub/example.com',
      'abc@yahoo!.com',
      'abc@example_underscored.com',
      'raw@test.ra.ru....com'
    ];

    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    //expect(Validation.validate('email', samples['email'])).to.be.true;
    for (var i in validEmails) {
      expect(Validation.validate('email', validEmails[i])).to.be.true;
    }
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    for (var i in invalidEmails) {
      expect(Validation.validate('email', invalidEmails[i])).to.be.a('string');
    }

    // Other failure tests.
    expect(Validation.validate('email', samples['alphaASCII'])).to.be.a('string');
    expect(Validation.validate('email', samples['alphaASCIIUpper'])).to.be.a('string');
    expect(Validation.validate('email', samples['alphaAccent'])).to.be.a('string');
    expect(Validation.validate('email', samples['alphaLatin'])).to.be.a('string');
    expect(Validation.validate('email', samples['alphaChinese'])).to.be.a('string');
    expect(Validation.validate('email', samples['alphaArabic'])).to.be.a('string');
    expect(Validation.validate('email', samples['alphaRussian'])).to.be.a('string');
    expect(Validation.validate('email', samples['digit'])).to.be.a('string');
    expect(Validation.validate('email', samples['float'])).to.be.a('string');
    expect(Validation.validate('email', samples['special'])).to.be.a('string');
  });

  it('Validation : date', () => {
    let str = '',
      dates = {
        'mm/dd/yy': {
          'valid': ['01/20/12', '1/1/12'],
          'invalid': ['20/1/12', '1/32/12', '1/20/2012']
        },
        'mm/dd/yyyy': {
          'valid': ['01/20/2012', '1/20/2012'],
          'invalid': ['20/1/12', '1/32/12']
        },
        'dd/mm/yyyy': {
          'valid':  ['20/01/2012', '20/1/2012'],
          'invalid': ['41/1/12', '1/32/12']
        },
        'd/m/yy': {
          'valid':  ['20/1/12', '20/1/2012'],
          'invalid': ['41/1/12', '1/32/12']
        },
        'y/m/d': {
          'valid':  ['12/1/20', '2012/1/20'],
          'invalid': ['12/32/1', '12/1/32']
        },
        'yy/mm/dd': {
          'valid':  ['12/1/20', '2012/1/20'],
          'invalid': ['12/32/1', '12/1/32']
        },
        'yyyy/mm/dd': {
          'valid':  ['2012/01/20'],
          'invalid': ['12/1/1', '2012/13/1', '2012/1/32']
        }
      };

    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('date', samples['date'])).to.be.true;
    for (var format in dates) {
      for (var i in dates[format]['valid']) {
        expect(Validation.validate('date', dates[format]['valid'][i], null, {'format': format})).to.be.true;
      }
    }

    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    for (var format in dates) {
      for (var i in dates[format]['invalid']) {
        expect(Validation.validate('date', dates[format]['invalid'][i], null, {'format': format})).to.be.a('string');
      }
    }

    expect(Validation.validate('date', samples['alphaASCII'])).to.be.a('string');
    expect(Validation.validate('date', samples['alphaASCIIUpper'])).to.be.a('string');
    expect(Validation.validate('date', samples['alphaAccent'])).to.be.a('string');
    expect(Validation.validate('date', samples['alphaLatin'])).to.be.a('string');
    expect(Validation.validate('date', samples['alphaChinese'])).to.be.a('string');
    expect(Validation.validate('date', samples['alphaArabic'])).to.be.a('string');
    expect(Validation.validate('date', samples['alphaRussian'])).to.be.a('string');
    expect(Validation.validate('date', samples['digit'])).to.be.a('string');
    expect(Validation.validate('date', samples['float'])).to.be.a('string');
    expect(Validation.validate('date', samples['special'])).to.be.a('string');
  });

  it('Validation : lengthBetween', () => {
    let str = '';
    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    str = "abcd";
    expect(Validation.validate('lengthBetween', str, null, {params: [3]})).to.be.true;
    str = "ab";
    expect(Validation.validate('lengthBetween', str, null, {params: [0, 3]})).to.be.true;
    str = "abcde";
    expect(Validation.validate('lengthBetween', str, null, {params: [3, 8]})).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    str = "ab";
    expect(Validation.validate('lengthBetween', str, null, {params: [3]})).to.be.a('string');
    str = "abcd";
    expect(Validation.validate('lengthBetween', str, null, {params: [0, 3]})).to.be.a('string');
    str = "ab";
    expect(Validation.validate('lengthBetween', str, null, {params: [3, 8]})).to.be.a('string');
    str = "abcdefghi";
    expect(Validation.validate('lengthBetween', str, null, {params: [3, 8]})).to.be.a('string');
  });

  it('Validation : nospace', () => {
    let str = '';
    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('nospace', samples['alphaASCII'])).to.be.true;
    expect(Validation.validate('nospace', samples['alphaASCIIUpper'])).to.be.true;
    expect(Validation.validate('nospace', samples['alphaAccent'])).to.be.true;
    expect(Validation.validate('nospace', samples['digit'])).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    str = ` ${samples['alphaASCII']}`;
    expect(Validation.validate('nospace', str)).to.be.a('string');
    str = `${samples['alphaASCII']} `;
    expect(Validation.validate('nospace', str)).to.be.a('string');
    str = `${samples['alphaASCII']} ${samples['alphaASCII']}`;
    expect(Validation.validate('nospace', str)).to.be.a('string');
  });

  it('Validation : text', () => {
    const str = '';
    ////////////////////////////////////////////////////////////////////////
    // Expect success
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('required', samples['email'])).to.be.true;
    expect(Validation.validate('required', samples['alphaASCII'])).to.be.true;
    expect(Validation.validate('required', samples['alphaASCIIUpper'])).to.be.true;
    expect(Validation.validate('required', samples['alphaAccent'])).to.be.true;
    expect(Validation.validate('required', samples['alphaLatin'])).to.be.true;
    expect(Validation.validate('required', samples['alphaChinese'])).to.be.true;
    expect(Validation.validate('required', samples['alphaArabic'])).to.be.true;
    expect(Validation.validate('required', samples['alphaRussian'])).to.be.true;
    expect(Validation.validate('required', samples['digit'])).to.be.true;
    expect(Validation.validate('required', samples['float'])).to.be.true;
    expect(Validation.validate('required', samples['special'])).to.be.true;
    ////////////////////////////////////////////////////////////////////////
    // Expect failure
    ////////////////////////////////////////////////////////////////////////
    expect(Validation.validate('text', samples['html'])).to.be.a('string');
  });
});
