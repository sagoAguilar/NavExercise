<?php echo $this->element('media_render_scripts'); ?>
<div class="row-fluid">
    <div class="read-options no-margin-bottom">
        <?php
        	$scripts = false;
        	echo $this->element('media_render', compact('deliverable', 'talent_id', 'admin', 'revisions', 'scripts', 'mini'));
        ?>
    </div>
</div>