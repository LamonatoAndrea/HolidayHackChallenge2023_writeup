function buildAndGotoUrl(roomId, gamet, roomt) {
	var new_url = window.location.href.split('/').slice(0, -1).join('/') + '/room/';
	new_url += "?username=" + username;
	new_url += "&roomId=" + roomId;
	new_url += "&roomType=" + roomt;
	new_url += "&gameType=" + gamet;
	
	if (resourceId && resourceId.length) {
		new_url += "&id=" + resourceId;
	}

	if (playerAvatar && playerAvatar.length) {
		new_url += "&dna=" + playerAvatar;
	}

	window.location.href = new_url;
}