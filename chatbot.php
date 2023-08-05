<?php 
  $siteName = 'Web Site Name';
  $siteSlogan = 'Web Site Slogan';
  $contactEmail = 'info@site.com';
  $placeHolder = 'Question...';
  $errorMessage = 'Sorry, I couldn\'t understand your message, you can contact with us via <a href="'.$contactEmail.'">'.$contactEmail.'</a>';
?>
<div id="chatButton">?</div>
<div id="chatContainer" class="chatContainer mh-100">
	<div id="chatHeader" class="justify-content-between">
		<div class="d-flex align-items-center">
			<div>
				<div id="siteName"><?php echo $siteName; ?></div>
				<div id="siteSlogan"><?php echo $siteSlogan; ?></div>
			</div>
		</div>
		<div id="closeChatBox" class="mr-3 font-weight-bold">X</div>
	</div>
	<div id="chatBox mh-100"></div>
	<textarea type="text" rows="1" id="chatInput" placeholder="<?php echo $placeHolder; ?>" onkeydown="check(event, '<?php echo $errorMessage; ?>')"></textarea>
</div>
