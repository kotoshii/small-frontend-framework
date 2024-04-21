/*
 * TODO:
 *   3. Improve typings
 *   4. CLI
 *
 * */

import { Component } from '~core/components/component';
import { createApp } from '~core/init/create-app';
import { Link } from '~core/router/components/link';
import { Route } from '~core/router/components/route';
import { Router } from '~core/router/components/router';
import { h, hFragment } from '~core/vdom/h';
import { SFFElement } from '~core/vdom/types/SFFElement';
import { SFFNode } from '~core/vdom/types/SFFNode';

export {
  Component,
  createApp,
  hFragment as fragment,
  h,
  Link,
  Route,
  Router,
  SFFElement,
  SFFNode,
};
