<?php
/*
	Plugin Name: Markdown Editor with LaTeX support
	Plugin URI: https://github.com/thibaultduponchelle/q2a-markdown-editor-latex
	Plugin Description: Markdown editor plugin with LaTeX support 
	Plugin Version: 0.9
	Plugin Date: 2012-08-14
	Plugin Author: Thibault Duponchelle & Scott Svivian
	Plugin Author URI: https://github.com/thibaultduponchelle/q2a-markdown-editor-latex 
	Plugin Contributors: NoahY
	Plugin License: GPLv3
	Plugin Minimum Question2Answer Version: 1.4
	Plugin Update Check URI: https://github.com/thibaultduponchelle/q2a-markdown-editor-latex

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

	More about this license: http://www.gnu.org/licenses/gpl.html
*/

if ( !defined('QA_VERSION') )
{
	header('Location: ../../');
	exit;
}


qa_register_plugin_module('editor', 'qa-markdown-editor.php', 'qa_markdown_editor', 'Markdown Editor');
qa_register_plugin_module('viewer', 'qa-markdown-viewer.php', 'qa_markdown_viewer', 'Markdown Viewer');
qa_register_plugin_module('event', 'qa-md-events.php', 'qa_markdown_events', 'Markdown events');
qa_register_plugin_layer('qa-md-layer.php', 'Markdown Editor layer');
