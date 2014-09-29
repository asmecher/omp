<!DOCTYPE html>
<html lang="{$currentLocale|replace:"_":"-"}" xml:lang="{$currentLocale|replace:"_":"-"}">
{if !$pageTitleTranslated}{translate|assign:"pageTitleTranslated" key=$pageTitle}{/if}
{assign var="pageTitleTranslated" value="plugins.generic.tinymce.pkpTags.listTags"|translate}
{include file="core:common/headerHead.tpl"}
<body id="listTagsBody">
	<script src="{$pluginJavaScriptUrl}/ListTagsHandler.js"></script>
	<script src="{$baseUrl}/lib/pkp/lib/tinymce/jscripts/tiny_mce/tiny_mce_popup.js"></script>
	<script>
		$(function() {ldelim}
			// Attach the form handler.
			$('#listTagsBody').pkpHandler(
				'$.pkp.pages.listTags.ListTagsHandler',
				{ldelim}
					previewUrl: '{url router=$smarty.const.ROUTE_PAGE page="pages" op="preview"}'
				{rdelim}
			);
		{rdelim});
	</script>
	<div class="instructions">{translate key="plugins.generic.tinymce.pkpTags.description"}</div>
	<ul class="plain">
		{* The JS handler will fill in elements here. *}
		<li>{translate key="plugins.generic.tinymce.pkpTags.noneAvailable"}</li>
	</ul>
</body>
