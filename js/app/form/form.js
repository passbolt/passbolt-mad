import $ from "jquery";
import mad from "mad/mad";
import "mad/form/form";
import "mad/form/element/textbox";
import "test/helper/model";

var form = new mad.Form($('#form'));
form.start();

// Add category id hidden field
form.addElement(
    new mad.form.Textbox($('#js_test_model_attribute'), {
        modelReference: 'mad.test.model.TestModel.testModelAttribute',
        validate: false
    }).start()
);
//// Add resource name field
//form.addElement(
//    new mad.form.element.TextboxController($('#js_field_name'), {
//        modelReference: 'passbolt.model.Resource.name'
//    }).start(),
//    new mad.form.FeedbackController($('#js_field_name_feedback'), {}).start()
//);
//// Add resource uri field
//form.addElement(
//    new mad.form.element.TextboxController($('#js_field_uri'), {
//        modelReference: 'passbolt.model.Resource.uri'
//    }).start(),
//    new mad.form.FeedbackController($('#js_field_uri_feedback'), {}).start()
//);
//// Add resource username field
//form.addElement(
//    new mad.form.element.TextboxController($('#js_field_username'), {
//        modelReference: 'passbolt.model.Resource.username'
//    }).start(),
//    new mad.form.FeedbackController($('#js_field_username_feedback'), {}).start()
//);
//// Add secrets forms.
//can.each(form.options.data.Secret, function (secret, i) {
//    var form = new passbolt.controller.form.secret.CreateFormController('#js_secret_edit_' + i, {
//        data: secret,
//        secret_i: i
//    });
//    form.start();
//    form.load(secret);
//    self.options.secretsForms.push(form);
//});
//// Add resource description field
//form.addElement(
//    new mad.form.element.TextboxController($('#js_field_description'), {
//        modelReference: 'passbolt.model.Resource.description'
//    }).start(),
//    new mad.form.FeedbackController($('#js_field_description_feedback'), {}).start()
//);
//$('#js_field_name').focus();