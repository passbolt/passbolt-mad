import 'mad/component/composite';
import 'mad/view/template/component/workspace.ejs!';

/*
 * @class mad.controller.component.WorkspaceController
 * @inherits mad.controller.CompositeController
 * @parent mad.controller.component
 *
 * Our implementation of a workspace controller. The component
 * is by definition an organized container which will carry other
 * components
 *
 * @constructor
 * Create a workspace controller
 * @param {array} options Optional parameters
 * @return {mad.controller.component.FreeCompositeController}
 */
/**
 * @parent Mad.components_api
 * @class mad.component.FreeComposite
 * @inherits {mad.component.Composite}
 *
 * Our implementation of a workspace controller. The component
 * is by definition an organized container which will carry other
 * components
 *
 * @constructor
 * Instantiate a new FreeComposite Component.
 * @param {HTMLElement|can.NodeList|CSSSelectorString} el The element the control will be created on
 * @param {Object} [options] option values for the component.  These get added to
 * this.options and merged with defaults static variable
 * @return {mad.component.FreeComposite}
 */
var FreeComposite = mad.component.FreeComposite = mad.component.Composite.extend('mad.component.FreeComposite', /** @static */ {

    defaults: {
        'label': 'WorkspaceController'
    }
}, /** @prototype */ {

    /**
     * Add a component to the container
     * @param {String} ComponentClass The component class to use to instantiate the component
     * @param {Array} componentOptions The optional data to pass to the component constructor
     * @param {String} area The area to add the component. Default : mad-container-main
     * @todo Implement this function with the view system
     */
    addComponent: function (ComponentClass, componentOptions, area) {
        area = area || 'mad-container-main';
        var returnValue = null;
        var $area = $('.' + area, this.element);
        var component = mad.helper.ComponentHelper.create($area, 'inside_replace', ComponentClass, componentOptions);
        return this._super(component);
    }
});

export default FreeComposite;
