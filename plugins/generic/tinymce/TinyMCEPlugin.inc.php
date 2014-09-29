<?php

/**
 * @file plugins/generic/tinymce/TinyMCEPlugin.inc.php
 *
 * Copyright (c) 2014 Simon Fraser University Library
 * Copyright (c) 2003-2014 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @class TinyMCEPlugin
 * @ingroup plugins_generic_tinymce
 *
 * @brief TinyMCE WYSIWYG plugin for textareas - to allow cross-browser HTML editing
 */

import('lib.pkp.classes.plugins.GenericPlugin');

define('TINYMCE_INSTALL_PATH', 'lib/pkp/lib/tinymce');
define('TINYMCE_JS_PATH', TINYMCE_INSTALL_PATH . '/jscripts/tiny_mce');

class TinyMCEPlugin extends GenericPlugin {
	/**
	 * Register the plugin, if enabled; note that this plugin
	 * runs under both Press and Site contexts.
	 * @param $category string
	 * @param $path string
	 * @return boolean
	 */
	function register($category, $path) {
		if (parent::register($category, $path)) {
			if ($this->getEnabled()) {
				// Inject TinyMCE editor upon template display
				HookRegistry::register('TemplateManager::display',array(&$this, 'callbackHandleDisplay'));

				// Watch for requests for the PKP tags pop-up
				HookRegistry::register('LoadHandler', array($this, 'callbackHandleTagsPopup'));
			}
			return true;
		}
		return false;
	}

	/**
	 * Get the name of the settings file to be installed on new press
	 * creation.
	 * @return string
	 */
	function getContextSpecificPluginSettingsFile() {
		return $this->getPluginPath() . '/settings.xml';
	}

	/**
	 * Get the name of the settings file to be installed site-wide when
	 * OMP is installed.
	 * @return string
	 */
	function getInstallSitePluginSettingsFile() {
		return $this->getPluginPath() . '/settings.xml';
	}

	/**
	 * Hook callback function for TemplateManager::display
	 * @param $hookName string
	 * @param $args array
	 * @return boolean
	 */
	function callbackHandleDisplay($hookName, $args) {
		$request =& Registry::get('request');
		$dispatcher = $request->getDispatcher();
		$templateMgr =& $args[0];

		$baseUrl = $templateMgr->get_template_vars('baseUrl');
		$additionalHeadData = $templateMgr->get_template_vars('additionalHeadData');

		$allLocales = AppLocale::getAllLocales();
		$localeList = array();
		foreach ($allLocales as $key => $locale) {
			$localeList[] = String::substr($key, 0, 2);
		}
		$templateMgr->assign('localeList', join(',', $localeList));
		$tinyMceHeaders = $templateMgr->fetch($this->getTemplatePath() . 'headers.tpl');

		$templateMgr->assign('additionalHeadData', $additionalHeadData . "\n" . $tinyMceHeaders);
		return false;
	}

	/**
	 * Watch for requests to the TinyMCE pop-up.
	 * @param $hookName string The name of the invoked hook
	 * @param $args array Hook parameters
	 * @return boolean Hook handling status
	 */
	function callbackHandleTagsPopup($hookName, $args) {
		$page =& $args[0];
		$op =& $args[1];

		switch ("$page/$op") {
			case 'tinymce/listtags':
				define('HANDLER_CLASS', 'TinyMCEHandler');
				$this->import('TinyMCEHandler');

				// Allow the TinyMCE handler to get the plugin object
				TinyMCEHandler::setPlugin($this);
				return true;
		}

		return false;
	}

	/**
	 * Get the display name of this plugin
	 * @return string
	 */
	function getDisplayName() {
		return __('plugins.generic.tinymce.name');
	}

	/**
	 * Get the description of this plugin
	 * @return string
	 */
	function getDescription() {
		return __('plugins.generic.tinymce.description');
	}

	/**
	 * Get the JavaScript URL for this plugin.
	 */
	function getJavaScriptURL($request) {
		return $request->getBaseUrl() . '/' . $this->getPluginPath() . '/js';
	}

	/**
	 * @copydoc PKPPlugin::getTemplatePath
	 */
	function getTemplatePath() {
		return parent::getTemplatePath() . 'templates/';
	}
}

?>
