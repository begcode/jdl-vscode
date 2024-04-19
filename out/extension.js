"use strict";
/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const completeItems_1 = require("./completeItems");
function activate(context) {
    // context.subscriptions.push(
    // 	vscode.languages.registerHoverProvider('jdl', {
    // 		provideHover(document, position, token) {
    // 			log('token: ', token);
    // 			log('position: ', position);
    // 			return {
    // 				contents: ['Hover Content']
    // 			};
    // 		},
    // 	}),
    // );
    context.subscriptions.push(...completeItems_1.completeItems);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map