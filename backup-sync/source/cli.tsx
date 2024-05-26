#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
// import meow from 'meow';
import App from './app.js';

// const cli = meow(
// 	`
// 	Usage
// 	  $ backup-sync

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ backup-sync --name=Jane
// 	  Hello, Jane
// `,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// );

render(<App />);
