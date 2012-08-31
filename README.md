

Markdown Editor plugin with LaTeX support for Question2Answer
=================================================

Disclaimer
-------------------------------------------------

This is an improved version of the plugin made by Scott Svivian. 
[q2a-markdown-editor](https://github.com/svivian/q2a-markdown-editor)
Thanks to him for this great job :)


Introduction
-------------------------------------------------

This is an editor plugin for popular open source Q&A platform, [Question2Answer](http://www.question2answer.org). It uses Markdown to format posts, which is a simple text-friendly markup language using for example \*\*bold\*\* for **bold text** or \> for quoting sources.

The plugin uses modified versions of the PageDown scripts (released by Stack Overflow) for the editor and live preview respectively.




Installation
-------------------------------------------------

1. Download and extract the `markdown-editor` folder to the `qa-plugins` folder in your Q2A installation.
2. Log in to your Q2A site as a Super Administrator and head to Admin > Posting.
3. Set the default editor for questions and answers to 'Markdown Editor'. The editor does also work for comments, but keeping to plain text is recommended.

In Admin > Plugins, you can set two options:

- "Plaintext comments" - Sets a post as plaintext when converting answers to comments.
- "Use syntax highlighting" - Integrates [highlight.js](http://softwaremaniacs.org/soft/highlight/en/) for code blocks (including while writing posts). All common programming languages are supported, but you can add more using the [customized download here](http://softwaremaniacs.org/soft/highlight/en/download/). Save the file and overwrite `pagedown/highlight.min.js`. Similarly, any of the custom styles can be added to your stylesheet instead of the provided styles.



Extra bits
-------------------------------------------------

**Converting old posts:** If you have been running your Q2A site for a little while, you may wish to convert old content to Markdown. This does not work reliably for HTML content (created via the WYSIWYG editor); it is pretty safe for plain text content, but check your posts afterwards as some formatting may go awry. You can convert text posts automatically using this SQL query:

    UPDATE qa_posts SET format='markdown' WHERE format='' AND type IN ('Q', 'A', 'Q_HIDDEN', 'A_HIDDEN')

(Make sure to change `qa_` above to your installation's table prefix if it is different.)