import { Router } from '~core/router/components/router';

export class RouteNavigator {
  private currentPath: string;
  private routerComponent: Router | null = null;
  private static _instance: RouteNavigator | null = null;

  private constructor() {
    this.currentPath = window.location.pathname;
    window.addEventListener('popstate', this.handlePopState);
  }

  static create() {
    if (this._instance) {
      throw new Error(
        'Attempt to create another RouteNavigator instance per app. This behavior is abnormal, please check your code.',
      );
    }

    this._instance = new RouteNavigator();

    return this._instance;
  }

  static instance() {
    if (!this._instance) {
      throw new Error('Cannot use RouteNavigator before app initialization');
    }

    return this._instance;
  }

  setRouterComponent(component: Router | null) {
    this.routerComponent = component;
  }

  getCurrentPath() {
    return this.currentPath;
  }

  navigate(path: string) {
    history.pushState(null, '', path);
    this.currentPath = path;
    this.routerComponent?.patch();
  }

  private handlePopState = () => {
    this.currentPath = window.location.pathname;
    this.routerComponent?.patch();
  };
}
