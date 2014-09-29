{**
 * plugins/generic/tinymce/templates/headers.tpl
 *
 * Copyright (c) 2014 Simon Fraser University Library
 * Copyright (c) 2003-2014 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * Headers for TinyMCE template
 *}
<script type="text/javascript" src="{$baseUrl}/{$smarty.const.TINYMCE_JS_PATH}/tiny_mce_gzip.js"></script>
<script type="text/javascript" src="{$baseUrl}/plugins/generic/tinymce/js/TinyMCEHelper.js"></script>
<script type="text/javascript">
	tinyMCE_GZ.init({ldelim}
		relative_urls: 'false',
		plugins: 'paste,jbimages,fullscreen,noneditable',
		themes: 'advanced',
		languages: '{$localeList}',
		disk_cache: true
	{rdelim});
</script>
<script type="text/javascript">
	tinyMCE.PluginManager.load('pkpTags', '{$baseUrl}/plugins/generic/tinymce/plugins/pkpTags/editor_plugin.js');
</script>
<script type="text/javascript">
	tinyMCE.init({ldelim}
		width: '100%',
		entity_encoding: 'raw',
		plugins: 'paste,jbimages,fullscreen,noneditable,-pkpTags',
		mode: 'specific_textareas',
		editor_selector: 'richContent',
		language: "{$currentLocale|substr:0:2}",
		relative_urls: false,
		forced_root_block: "p",
		paste_auto_cleanup_on_paste: true,
		apply_source_formatting: false,
		theme : "advanced",
		theme_advanced_buttons1: "cut,copy,paste,|,bold,italic,underline,bullist,numlist,|,link,unlink,help,code,fullscreen,jbimages,pkpTags",
		theme_advanced_buttons2: "",
		theme_advanced_buttons3: "",
		init_instance_callback: $.pkp.classes.TinyMCEHelper.prototype.triggerTinyMCEInitialized,
		setup: $.pkp.classes.TinyMCEHelper.prototype.triggerTinyMCESetup,
		pkp_listtags_url: "{url router=$smarty.const.ROUTE_PAGE page="tinymce" op="listtags"}",
		content_css: "{$baseUrl}/plugins/generic/tinymce/styles/content.css",
	{rdelim});
</script>

