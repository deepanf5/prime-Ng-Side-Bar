import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
    inputStyle: string;
    colorScheme: string;
    theme: string;
    ripple: boolean;
    menuMode: string;
    scale: number;
}

interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
};

state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
};

    private configUpdate = new Subject<AppConfig>();

    private overlayOpen = new Subject<any>();

    configUpdate$ = this.configUpdate.asObservable();

    overlayOpen$ = this.overlayOpen.asObservable();

  constructor() { }


  onMenuToggle() {
    if(this.isOverlay()) {
      console.log('overlay is working')
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
              }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive;
  }
  else {
    this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

    if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
    }
}
  }

  isOverlay() {
    return this.config.menuMode === 'overlay';
}

isDesktop() {
  return window.innerWidth > 991;
}

isMobile() {
  return !this.isDesktop();
}

onConfigUpdate() {
  this.configUpdate.next(this.config);
}


}
