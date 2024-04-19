/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import { log } from 'console';
import * as vscode from 'vscode';
import { completeItems } from './completeItems';

export function activate(context: vscode.ExtensionContext) {
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
	context.subscriptions.push(...completeItems);
}