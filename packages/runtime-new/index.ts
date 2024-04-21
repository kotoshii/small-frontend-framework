/*
 * TODO:
 *   1. Global state
 *   2. Router
 *   3. Improve typings
 *   4. CLI
 *
 * */

import { Component } from '~core/components/component';
import { createApp } from '~core/init/create-app';
import { h, hFragment } from '~core/vdom/h';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';

export { Component, createApp, hFragment as fragment, h, SFFElement, SFFNode };
