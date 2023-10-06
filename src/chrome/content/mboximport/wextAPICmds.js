/*
	ImportExportTools NG is a extension for Thunderbird mail client
	providing import and export tools for messages and folders.
	The extension authors:
		Copyright (C) 2023 : Christopher Leidigh, The Thunderbird Team

	ImportExportTools NG is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


// wextAPICmd.js

async function getSelectedMsgs() {

	let msgIdList = await window.ietngAddon.notifyTools.notifyBackground({ command: "getSelectedMessages" });
	var msgURIS = [];
	msgIdList.messages.forEach(msg => {
		let realMessage = window.ietngAddon.extension
		.messageManager.get(msg.id);
		
		let uri = realMessage.folder.getUriForMsg(realMessage);
		msgURIS.push(uri);
	});
	return msgURIS;
}

async function openHelp(bookmark) {
	let win = getMail3Pane();
	await win.ietngAddon.notifyTools.notifyBackground({ command: "openHelp", bmark: bookmark });

	
}
