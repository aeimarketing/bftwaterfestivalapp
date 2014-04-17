jQuery(document).ready(function() {

	//fix heights/widths
	var window_height = jQuery(window).height();
	var window_width = jQuery(window).width();

});

function open_link(link) {
	//navigator.app.loadUrl(link, {openExternal : true});
	//window.open(link, '_system');

	if( navigator.app ) // Android
		navigator.app.loadUrl( link, {openExternal:true} );
	else // iOS and others
		window.open(link, "_system"); // opens in the app, not in safari

}

function open_page(page) {

	//grab current active id
	var current_active_id = jQuery('.active_page').get(0).id;

	//only do stuff if the new id is different from current active
	if (current_active_id !== (page + '_page')) {
		jQuery('.active_page').hide('slide', { direction: 'left' }).removeClass('active_page');
		jQuery('#' + page + '_page').show('slide', { direction: 'right' }).addClass('active_page');

		switch (page) {
			case 'home':
				jQuery('#nav_bar').hide('slide', { direction: 'down' });
				jQuery('#right_menu_container').hide();
				jQuery('#page_header_title').hide('slide', { direction: 'up' });
			break;

			case 'map':
				jQuery('#right_menu_container').show();
				google.maps.event.trigger(map, 'resize');
				map.fitBounds(bounds);
				jQuery('#nav_bar').show('slide', { direction: 'down' });
				jQuery('#page_header_title').hide('slide', { direction: 'up' });
			break;

			case 'notification':
				jQuery('#right_menu_container').hide();
				jQuery('#page_header_content').html('Notifications');
				jQuery('#page_header_title').show('slide', { direction: 'up' });
				jQuery('#nav_bar').show('slide', { direction: 'down' });
				//check_scrolling('#notification_page');
			break;

			case 'report':
				jQuery('#right_menu_container').hide();
				jQuery('#page_header_content').html('Report An Incident');
				jQuery('#page_header_title').show('slide', { direction: 'up' });
				jQuery('#nav_bar').show('slide', { direction: 'down' });
			break;

			default:
			break;
		}
	}
}

function resizeIframe(id) {
	alert('test height: ' + jQuery('#' + id).contents().height());
	jQuery('#' + id).css('height', jQuery('#' + id).contents().height() + 'px');
}

function show_loading() {
	jQuery('#loading_bg, #loading_div').show();
}

function hide_loading() {
	jQuery('#loading_bg, #loading_div').hide();
}

function loading_text(text) {
	jQuery('#loading_div').html(text);
}

function check_scrolling(id) {
	var content_height_check = document.querySelector(id);

	//console.log('offsetHeight/scroll: '+content_height_check.offsetHeight+' < '+content_height_check.scrollHeight);
	//console.log('jqueryidheight/childrenheight: '+jQuery(id).height() + '<' + jQuery(id).wrapInner('<div>').children().outerHeight());

	if (content_height_check.offsetHeight < content_height_check.scrollHeight ||
		jQuery(id).height() < jQuery(id).wrapInner('<div>').children().outerHeight()) {
		//element has overflow
		jQuery(id).css('overflow-y', 'scroll');
	} else {
		//element doesnt have overflow
		jQuery(id).css('overflow-y', 'hidden');
	}
}
