/**
 * @file plugins/generic/tinymce/js/TinyMCEHelper.js
 *
 * Copyright (c) 2014 Simon Fraser University Library
 * Copyright (c) 2000-2014 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @class TinyMCEHelper
 * @ingroup js_controllers
 *
 * @brief TinyMCE helper methods
 */
(function($) {



	/**
	 * Helper singleton
	 * @constructor
	 *
	 * @extends $.pkp.classes.ObjectProxy
	 */
	$.pkp.classes.TinyMCEHelper = function() {
		throw new Error('Trying to instantiate the TinyMCEHelper singleton!');
	};


	//
	// Public static methods.
	//
	/**
	 * Callback used by the tinyMCE plugin to trigger the tinyMCEInitialized
	 * event in the DOM.
	 * @param {Object} tinyMCEObject The tinyMCE object instance being
	 * initialized.
	 */
	$.pkp.classes.TinyMCEHelper.prototype.triggerTinyMCEInitialized =
			function(tinyMCEObject) {
		var $inputElement = $('#' + tinyMCEObject.editorId);
		$inputElement.trigger('tinyMCEInitialized', [tinyMCEObject]);
	};


	/**
	 * Callback used by the tinyMCE plugin upon setup.
	 * @param {Object} tinyMCEObject The tinyMCE object instance being
	 * set up.
	 */
	$.pkp.classes.TinyMCEHelper.prototype.triggerTinyMCESetup =
			function(tinyMCEObject) {

		// For read-only controls, set up TinyMCE read-only mode.
		if ($('#' + tinyMCEObject.id).attr('readonly')) {
			tinyMCEObject.settings.readonly = true;
		}

		// Add a fake HTML5 placeholder when the editor is intitialized
		tinyMCEObject.onInit.add(function(tinyMCEObject) {
			var $element = $('#' + tinyMCEObject.id),
					placeholderText,
					$placeholder,
					$placeholderParent;

			// Don't add anything if we don't have a placeholder
			placeholderText = $('#' + tinyMCEObject.id).attr('placeholder');
			if (placeholderText === '') {
				return;
			}

			// Create placeholder element
			$placeholder = /** @type {jQueryObject} */ ($('<span></span>')
					.html(/** @type {string} */ (placeholderText)));
			$placeholder.addClass('mcePlaceholder');
			$placeholder.attr('id', 'mcePlaceholder-' + tinyMCEObject.id);
			if (tinyMCEObject.getContent().length) {
				$placeholder.hide();
			}

			// Create placeholder wrapper
			$placeholderParent = $('<div></div>');
			$placeholderParent.addClass('mcePlaceholderParent');
			$element.wrap($placeholderParent);
			$element.parent().append($placeholder);
		});

		tinyMCEObject.onActivate.add(function(tinyMCEObject) {
			// Hide the placeholder when the editor is activated
			$('#mcePlaceholder-' + tinyMCEObject.id).hide();
		});

		tinyMCEObject.onDeactivate.add(function(tinyMCEObject) {
			// Show the placholder when the editor is deactivated
			if (!tinyMCEObject.getContent().length) {
				$('#mcePlaceholder-' + tinyMCEObject.id).show();
			}
		});

		tinyMCEObject.onBeforeSetContent.add(function(tinyMCEObject, o) {
			var variablesParsed = $.pkp.classes.TinyMCEHelper.prototype.getVariableMap('#' + tinyMCEObject.id);
			if (variablesParsed === undefined) return;

			o.content = o.content.replace(
					/{\$([^}]+)}/g, function(match, contents, offset, s) {
				if (variablesParsed[contents] !== undefined) {
					return $.pkp.classes.TinyMCEHelper.prototype.getVariableElement(
							contents, variablesParsed[contents]).html();
				}
				return match;
			});
		});

		// When the content is first loaded into the control, replace
		// variable tags with placeholders.
/*		tinyMCEObject.onInit.add(function(tinyMCEObject) {
			var variablesParsed = $.pkp.classes.TinyMCEHelper.prototype.getVariableMap(tinyMCEObject.id);
			if (variablesParsed === undefined) return;

			tinyMCEObject.setContent(tinyMCEObject.getContent({format: 'raw'}).replace(
					/{\$([^}]+)}/g, function(match, contents, offset, s) {
				if (variablesParsed[contents] !== undefined) {
					return $.pkp.classes.TinyMCEHelper.prototype.getVariableElement(
							contents, variablesParsed[contents]).html();
				}
				return match;
			}));
		});*/

		// When the field is being saved, replace any tag placeholders
		tinyMCEObject.onSaveContent.add(function(tinyMCEObject, o) {
			var $content = $(o.content);

			// Replace tag span elements with the raw tags
			$content.find('.pkpTag').replaceWith(function() {
				return '{$' + $(this).attr('data-symbolic') + '}';
			});
			o.content = $content.html();
		});
	};


	/**
	 * Get the list of variables and their descriptions for a specified field.
	 * @param {string} selector The textarea field's selector.
	 * @return {Object|undefined} Map of variableName: variableDisplayName entries.
	 */
	$.pkp.classes.TinyMCEHelper.prototype.getVariableMap =
                        function(selector) {

		var variablesEncoded = $(selector).attr('data-variables'),
				variablesParsed;

		// If we found the data attribute, decode and return it.
		if (variablesEncoded !== undefined) {
			return $.parseJSON(decodeURIComponent(variablesEncoded));
		}

		// If we could not find the data attribute, return undefined.
		return undefined;
	};


	/**
	 * Generate an element to represent a PKP variable (e.g. primary contact name
	 * in setup) within the TinyMCE editor.
	 * @param {string} variableSymbolic The variable symbolic name.
	 * @param {string} variableName The human-readable name for the variable.
	 * @return {JQueryObject} JQuery DOM representing the PKP variable.
	 */
	$.pkp.classes.TinyMCEHelper.prototype.getVariableElement =
                        function(variableSymbolic, variableName) {

		return $('<div/>').append($('<span/>')
				.addClass('pkpTag mceNonEditable')
				.attr('data-symbolic', variableSymbolic)
				.text(variableName));
	};


/** @param {jQuery} $ jQuery closure. */
}(jQuery));
