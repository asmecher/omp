/**
 * @file plugins/generic/tinymce/js/ListTagsHandler.js
 *
 * Copyright (c) 2014 Simon Fraser University Library
 * Copyright (c) 2000-2014 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @class ListTagsHandler
 * @ingroup plugins_generic_tinymce
 *
 * @brief Handler for the site header.
 *
 */
(function($) {

	$.pkp.pages.listTags = $.pkp.pages.listTags || {};


	/**
	 * @constructor
	 *
	 * @extends $.pkp.classes.Handler
	 *
	 * @param {jQueryObject} $pageElement The HTML element encapsulating
	 *  the element.
	 * @param {{requestedPage: string,
	 *  fetchUnreadNotificationsCountUrl: string}} options Handler options.
	 */
	$.pkp.pages.listTags.ListTagsHandler =
			function($pageElement, options) {
		var variablesParsed, $listElement = $pageElement.find('ul');

		this.parent($pageElement, options);

		// Try to get the list of available variables
		variablesParsed = $.pkp.classes.TinyMCEHelper.prototype.getVariableMap(tinyMCEPopup.editor.getElement(tinyMCEPopup.editor.id));
		if (variablesParsed !== undefined) {
			$listElement.empty();
			$.each(variablesParsed, function(index, value) {
				$listElement.append($('<li/>').append($('<a/>').attr('href', '#' + index)
						.text(value)));
			});
		}

		// Register a click handler on any available tags
		$pageElement.find('a').click(this.callbackWrapper(
				this.clickTagHandler));

	};
	$.pkp.classes.Helper.inherits(
			$.pkp.pages.listTags.ListTagsHandler,
			$.pkp.classes.Handler);


	//
	// Public methods
	//
	/**
	 * Callback that will be activated when a tag is clicked.
	 * @param {Object} callingContext The calling element or object.
	 * @param {Event} event The triggering event (e.g. a click)
	 * @return {boolean} Should return false to stop event processing.
	 */
	$.pkp.pages.listTags.ListTagsHandler.prototype.clickTagHandler =
			function(callingContext, event) {

		var tagName = event.target.hash.substring(1), $target = $(event.target),
				$newTagElement;

		// Construct a <span> to represent the tag. (Wrap it in a <div>
		// parent element because we don't have an outerHTML function.)
		$newTagElement = $.pkp.classes.TinyMCEHelper.prototype.getVariableElement(tagName, $(event.target).text());

		// Send the contents of the new span element to the TinyMCE editor.
		tinyMCEPopup.execCommand('mceInsertContent', false, $newTagElement.html());

		// Close this pop-up.
		tinyMCEPopup.close();

		return false;
	}

/** @param {jQuery} $ jQuery closure. */
}(jQuery));
