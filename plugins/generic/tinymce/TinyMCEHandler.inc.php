<?php

/**
 * @file TinyMCEHandler.inc.php
 *
 * Copyright (c) 2014 Simon Fraser University Library
 * Copyright (c) 2003-2014 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @package plugins.generic.tinymce
 * @class TinyMCEHandler
 * Display TinyMCE plugin related pages.
 */

import('classes.handler.Handler');

class TinyMCEHandler extends Handler {
	/** @var TinyMCEPlugin The TinyMCE plugin */
	static $plugin;


	/**
	 * Constructor
	 */
	function TinyMCEHandler() {
		parent::Handler();
	}

	/**
	 * Provide the TinyMCE plugin to the handler.
	 * @param $plugin TinyMCEPlugin
	 */
	static function setPlugin($plugin) {
		self::$plugin = $plugin;
	}

	/**
	 * List available tags in a TinyMCE plugin pop-up.
	 * @param $args array Arguments array.
	 * @param $request PKPRequest Request object.
	 */
	function listtags($args, $request) {
		// Assign the template vars needed and display
		$templateMgr = TemplateManager::getManager($request);
		$templateMgr->assign('pluginJavaScriptUrl', self::$plugin->getJavaScriptURL($request));
		$templateMgr->display(self::$plugin->getTemplatePath() . 'listtags.tpl');
	}
}

?>
