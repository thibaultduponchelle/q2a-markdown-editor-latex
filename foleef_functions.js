$(document).ready(function(){
	//Default Action
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content
	//On Click Event
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active content
		return false;
	});
					 $("a.single_image").fancybox();	
					 
					jQuery.fn.extend({
						insertAtCaret: function(myValue){
						  return this.each(function(i) {
							if (document.selection) {
							  this.focus();
							  sel = document.selection.createRange();
							  sel.text = myValue;
							  this.focus();
							}
							else if (this.selectionStart || this.selectionStart == "0") {
							  var startPos = this.selectionStart;
							  var endPos = this.selectionEnd;
							  var scrollTop = this.scrollTop;
							  this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
							  this.focus();
							  this.selectionStart = startPos + myValue.length;
							  this.selectionEnd = startPos + myValue.length;
							  this.scrollTop = scrollTop;
							} else {
							  this.value += myValue;
							  this.focus();
							}
						  })
						}
					});					 
					
					$("#progress").hide();
					$("#tex2img_embed").hide();
					$("#asciiTextBox").hide();
					$("#asciiNote").hide();
					$("#iImgLoader").hide();
					
											
					$("#tex2img_embed_web").click(function() { this.focus(); this.select(); });
					$("#tex2img_embed_forum").click(function() { this.focus(); this.select(); });
					$("#tex2img_embed_twitter").click(function() { this.focus(); this.select(); });
				
					$(".iSymbol a").click(function(e) {
						latex = $(this).attr("title");
						$(".wmd-input").insertAtCaret(" $"+latex+"$ ");
						e.preventDefault();					
					});
					$(".iThumb a").click(function(e) {
						//$("a#clear_btn").click();
						url = $(this).attr("title");
						$("#wmd-input").val(url);
						e.preventDefault();						
					});
					
					$("#check_bit_ly").change(function(e) {
						var checked = $("#check_bit_ly").attr("checked");
						if(checked)
						{
							$("#wait").show();
							var long_url = escape($(this).val());
							$.ajax({
								url : 'http://www.sciweavers.org/bit_ly?url=' + long_url + '',
									success : function (data) {
									var short_url = data.trim();
									var w = $("#hide_width").val();
									var h = $("#hide_height").val();
									var ALT = $("#hide_alt").val();
									var web_url = '<img src=\"' + short_url + '\" align=\"center\" border=\"0\" alt=\"' + ALT + '\" width=\"' + w + '\" height=\"' + h + '\" />';
									$("#tex2img_embed_web").val(web_url);
									$("#tex2img_embed_twitter").val(short_url);
									$("#tex2img_embed_forum").val("[img]" + short_url + "[/img]");
									$("#wait").hide();
								}
							});
						}
						else
						{
							$("#wait").show();
							var w = $("#hide_width").val();
							var h = $("#hide_height").val();
							var ALT = $("#hide_alt").val();
							var long_url = $("#hide_long_url").val();
							var web_url = '<img src=\"' + long_url + '\" align=\"center\" border=\"0\" alt=\"' + ALT + '\" width=\"' + w + '\" height=\"' + h + '\" />';
							$("#tex2img_embed_web").val(web_url);
							$("#tex2img_embed_twitter").val(long_url);
							$("#tex2img_embed_forum").val("[img]" + long_url + "[/img]");
							$("#wait").hide();
						}
					});
					
					var options_tex2img_upload_form = { 
						target:    "#tex2img_status_div",
						url:       "/process_form_tex2img",
						type:      "post",
					}; 
					
					$("#tex2img_form").submit(function() {
						$(this).ajaxSubmit(options_tex2img_upload_form);
						$("#iImgLoader").html("");
						$("#iImgLoader").hide();
						$("#asciiTextBox").hide();
						$("#asciiNote").hide();
						$("#check_bit_ly").attr("checked", false);
						$("#tex2img_status_div").hide();
						$("#tex2img_success_div").hide();
						$("#tex2img_embed").hide();
						$("#progress").show();
						$("#submit_tex2img").attr("disabled", "true");						
						return false;
					});	
				
					$("#hide_banner").click(function() {
						$("#iBanner").slideUp(700);
					});	
						
					function msg(logo, title, teaser, url)
					{
						var body = '<div class="notice">'
											  + '<div class="notice-body">'
												  + '<img src="/sites/all/modules/sci_2ools/images/' + logo + '" alt="" />'
												  + '<div class="title"><a href="' + url + '">' + title + '</a></div>'
												  + '<div class="teaser">' + teaser + '</div>'
											  + '</div>'
										  + '</div>';
						return body;
					}
					
					function volatile_notice(logo, title, teaser, url)
					{
						var notice = msg(logo, title, teaser, url);
							  
						$( notice ).purr(
							{
								usingTransparentPNG: true
							}
						);			
						return false;		
					}
					
					function sticky_notice(logo, title, teaser, url)
					{
						var notice = msg(logo, title, teaser, url);
							  
						$( notice ).purr(
							{
								usingTransparentPNG: true,
								isSticky: true
							}
						);
						
						return false;
					}
					
					function greet(logo, title, teaser)
					{
						var body = '<div class="notice">'
											  + '<div class="notice-body">'
												  + '<div class="flag"><img src="/files/markers/' + logo + '" alt="" /></div>'
												  + '<div class="title"><a href="/">' + title + '</a></div>'
												  + '<div class="teaser">' + teaser + '</div>'
											  + '</div>'
										  + '</div>';
						return body;
					}
					
					function greet_special(logo, title, teaser)
					{
						var body = '<div class="notice">'
												  + '<div><img src="/sites/all/modules/sci_2ools/images/japan.png" alt="" /></div>'
										  + '</div>';
						return body;
					}
					
					function greet_notice(flag, title, teaser)
					{
						var notice = greet(flag, title, teaser);												  
						$( notice ).purr(
							{
								usingTransparentPNG: true
							}
						);			
						return false;		
					}
					function greet_notice_special(flag, title, teaser)
					{
						var notice = greet_special(flag, title, teaser);												  
						$( notice ).purr(
							{
								usingTransparentPNG: true
							}
						);			
						return false;		
					}
			});
