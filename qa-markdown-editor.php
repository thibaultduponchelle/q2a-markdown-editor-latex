<?php
/*
	Question2Answer Markdown editor plugin, v2.2
	License: http://www.gnu.org/licenses/gpl.html
*/

class qa_markdown_editor
{
	private $pluginurl;
	private $cssopt = 'markdown_editor_css';
	private $convopt = 'markdown_comment';
	private $hljsopt = 'markdown_highlightjs';

	function load_module( $directory, $urltoroot )
	{
		$this->pluginurl = $urltoroot;
	}

	function calc_quality( $content, $format )
	{
		return $format == 'markdown' ? 1.0 : 0.8;
	}


	function get_field(&$qa_content, $content, $format, $fieldname, $rows, $autofocus)
	{

    $html = '<link rel="stylesheet" href="'.$this->pluginurl.'free-online-latex-equation-editor_files/foleef.css" type="text/css" />' ."\n";
		
		// Include necessary  jquery stuff
		$html .= '<script type="text/javascript" src="'.$this->pluginurl.'free-online-latex-equation-editor_files/jquery_002.js"></script>' ."\n";
    $html .= '<script type="text/javascript" src="'.$this->pluginurl.'free-online-latex-equation-editor_files/jquery.js"></script>' ."\n";


		// Math jax asynchronous and init functions
    $html .= '<script type="text/javascript" src="'.$this->pluginurl.'mj_functions.js"></script>' . "\n";
    
		// Free math editor functions
		$html .= '<script type="text/javascript" src="'.$this->pluginurl.'foleef_functions.js"></script>' . "\n";

		// Get the generated name of the fields 
		$prev_id = "wmd-preview-".$fieldname;
		$input_id = "wmd-input-".$fieldname;
		$buffer_id = "wmd-buffer-".$fieldname;


		
		$html .= '<div class="wmd-panel">' ."\n"; // Open wmd-panel
		
		// What a weird line ob_start. In fact I need to include a file into a var BUT I need to execute PHP inside so include is nice, But I don't want to print it !
    ob_start(); // Redirect buffer
		include($this->pluginurl.'foleef.html'); // Execute PHP 
    $html .= ob_get_clean();	// Get the generated html

		// Button bar
		$html .= '<div id="wmd-button-bar-'.$fieldname.'" class="wmd-button-bar"></div>' . "\n";
		// Textarea
		$html .= '<textarea name="'.$fieldname.'" id="wmd-input-'.$fieldname.'" class="wmd-input" onkeydown="Preview.Update();">'.$content.'</textarea>' . "\n";
		$html .= '</div>' ."\n"; // Close wmd-panel
		// Preview 
		$html .= '<h3>Preview</h3>' . "\n";
		// Invisible Preview (used as a buffer for MathJax)
		$html .= '<div id="wmd-preview-'.$fieldname.'" class="wmd-preview" style="display:none"></div>' . "\n";
		// The preview you see
		$html .= '<div id="wmd-buffer-'.$fieldname.'" class="wmd-preview"></div>' . "\n";

		// Get the scripts for markdown editor
		$html .= '<script src="'.$this->pluginurl.'pagedown/Markdown.Converter.js"></script>' . "\n";
		$html .= '<script src="'.$this->pluginurl.'pagedown/Markdown.Sanitizer.js"></script>' . "\n";
		$html .= '<script src="'.$this->pluginurl.'pagedown/Markdown.Editor.js"></script>' . "\n";
		$html .= '<script>Preview.callback = MathJax.Callback(["CreatePreview", Preview, "'.$prev_id.'"]); Preview.callback.autoReset = true;</script>' ."\n";
		$html .= '<script>Preview.Init("'.$prev_id.'","'.$buffer_id.'");Preview.Update();</script>' ."\n";

		// comment this script and uncomment the 3 above to use the non-minified code
    //$html .= '<script src="'.$this->pluginurl.'pagedown/markdown.min.js"></script>' . "\n";

		return array( 'type'=>'custom', 'html'=>$html );
	}

	function read_post($fieldname)
	{
		$html = $this->_my_qa_post_text($fieldname);

		return array(
			'format' => 'markdown',
			'content' => $html
		);
	}

	function load_script($fieldname)
	{
		return
			'var converter = Markdown.getSanitizingConverter();' . "\n" .
			'var editor = new Markdown.Editor(converter, "-'.$fieldname.'");' . "\n" .
			'editor.run();' . "\n";
	}


	// set admin options
	function admin_form( &$qa_content )
	{
		$saved_msg = null;

		if ( qa_clicked('markdown_save') )
		{
			// save options
			$convert = qa_post_text('md_comments') ? '1' : '0';
			qa_opt($this->convopt, $convert);
			$convert = qa_post_text('md_highlightjs') ? '1' : '0';
			qa_opt($this->hljsopt, $convert);

			$saved_msg = 'Options saved.';
		}


		return array(
			'ok' => $saved_msg,
					'style' => 'wide',

			'fields' => array(
				'comments' => array(
					'type' => 'checkbox',
					'label' => 'Plaintext comments',
					'tags' => 'NAME="md_comments"',
					'value' => qa_opt($this->convopt) === '1',
					'note' => 'Sets a post as plaintext when converting answers to comments.',
				),
				'highlightjs' => array(
					'type' => 'checkbox',
					'label' => 'Use syntax highlighting',
					'tags' => 'NAME="md_highlightjs"',
					'value' => qa_opt($this->hljsopt) === '1',
					'note' => 'Integrates highlight.js for code blocks.',
				),
			),

			'buttons' => array(
				'save' => array(
					'tags' => 'NAME="markdown_save"',
					'label' => 'Save options',
					'value' => '1',
				),
			),
		);
	}


	// copy of qa-base.php > qa_post_text, with trim() function removed.
	function _my_qa_post_text($field)
	{
		return isset($_POST[$field]) ? preg_replace( '/\r\n?/', "\n", qa_gpc_to_string($_POST[$field]) ) : null;
	}


}
