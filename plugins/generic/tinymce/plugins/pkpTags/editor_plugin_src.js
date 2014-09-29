/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function(tinymce) {
	// Load the language pack
	tinymce.PluginManager.requireLangPack('pkpTags');

	// Create the plugin
	tinymce.create('tinymce.plugins.PkpTagsPlugin', {
		// Initialize
		init : function(ed, url) {
			// Register the pop-up open command
			ed.addCommand('mcePkpTags', function() {
				ed.windowManager.open({
					file : tinymce.activeEditor.getParam('pkp_listtags_url'),
					width : 320 + parseInt(ed.getLang('pkpTags.delta_width', 0)),
					height : 120 + parseInt(ed.getLang('pkpTags.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url,
				});
			});

			// Register the pop-up open button
			ed.addButton('pkpTags', {
				title: 'pkpTags.pkpTags_desc',
				cmd: 'mcePkpTags',
				image: url + '/img/icon.png'
			});
		},

		// Get plugin self-description
		getInfo : function() {
			return {
				longname : 'PkpTags',
				author : 'Public Knowledge Project',
				authorurl : 'http://pkp.sfu.ca',
				infourl : 'http://github.com/pkp/pkp-lib/tree/master/lib/tinymce/jscripts/tiny_mce/plugins/pkpTags',
				version : '1.0'
			};
		}
	});

	// Register the plugin with TinyMCE
	tinymce.PluginManager.add('pkpTags', tinymce.plugins.PkpTagsPlugin);
})(tinymce);
