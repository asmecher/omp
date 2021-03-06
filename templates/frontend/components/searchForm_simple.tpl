{**
 * templates/frontend/components/searchForm_simple.tpl
 *
 * Copyright (c) 2014-2015 Simon Fraser University Library
 * Copyright (c) 2003-2015 John Willinsky
 * Distributed under the GNU GPL v2. For full terms see the file docs/COPYING.
 *
 * @brief Simple display of a search form with just text input and search button
 *
 * @uses $searchQuery string Previously input search query
 *}
<form class="pkp_search" action="{url router=$smarty.const.ROUTE_PAGE page="catalog" op="results"}" method="post">
	<input name="query" value="{$searchQuery|escape}" type="text">
	<button>{translate key="common.searchCatalog"}</button>
</form>
