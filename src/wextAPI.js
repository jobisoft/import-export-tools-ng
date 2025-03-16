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


// wextAPI.js

messenger.NotifyTools.onNotifyBackground.addListener(async (info) => {
	let rv;
	switch (info.command) {
		case "windowsGetAll":
			var w = await browser.windows.getAll(info.options);
			return w;
		case "getCurrentURL":
			// method one: via tabs in focused window
			try {
				var w = await browser.windows.getAll({ populate: true });
			} catch {
				return "unknown";
			}

			let cw = w.find(fw => fw.focused)
			let url1 = cw.tabs.find(t => t.active).url;
			if (!url1) {
				url1 = "undefinedURL";
			}
			return url1;
		case "getSelectedMessages":
			var msgList = [];
			try {
				msgList = await browser.mailTabs.getSelectedMessages();
			} catch {
				msgList = null;
			}
			return msgList;
		case "getFullMessage":

			rv = await getFullMessage(info.messageId);
			return rv;
		case "getAttachmentFile":
			console.log(info)

			console.log(await browser.messages.getFull(info.msgId.id), info.msgId);

			console.log(await browser.messages.listAttachments(info.msgId.id), info.msgId);
			try {
				var fileObj = await browser.messages.getAttachmentFile(info.msgId.id, info.attPartName);
			} catch (ex) {
				return ex;
				let atts = await browser.messages.listAttachments(info.msgId.id);
				let pn = atts[0].partName;
				let fileObj = await browser.messages.getAttachmentFile(info.msgId.id, pn);
				let allAccounts = await messenger.accounts.list(true);

				// we cannot know name so just grab first "none" type account
				let localFolder = allAccounts.find(acc => acc.type == "none");
				console.log(localFolder.folders[0])
				let msgHdr = await messenger.messages.import(fileObj, localFolder.folders[0].id);
				let atts2 = await browser.messages.listAttachments(msgHdr.id);
				console.log(atts2)
			}

			return fileObj;
		case "createFolder":
			console.log(window.folder)
			break;
		case "openHelp":
			window.wextOpenHelp({ bmark: info.bmark });
			break;
		case "shutdown":
			console.log("shut")
			await messenger.menus.refresh();
			await messenger.menus.removeAll();
			break;
		case "createSubfolder":
			try {
				let ver = await window.getThunderbirdVersion();
				var folderOrId;
				var res;
				if (ver.major >= 121) {
					folderOrId = info.folder.id;
				} else {
					folderOrId = info.folder;
				}
				res = await messenger.folders.create(folderOrId, info.childName);

				return res;
			} catch (ex) {
				console.log(ex)
				return ex;
			}
	}
	return false;
}
);