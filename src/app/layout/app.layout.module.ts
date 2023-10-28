import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMenuComponent} from './app.menu/app.menu.component';
import {AppMenuitemComponent} from './app.menu/app.menuitem.component';
import {RouterModule} from '@angular/router';
import {AppTopBarComponent} from './app.topbar/app.topbar.component';
import {AppFooterComponent} from './app.footer/app.footer.component';
import {AppConfigModule} from './config/config.module';
import {AppSidebarComponent} from "./app.sidebar/app.sidebar.component";
import {AppLayoutComponent} from "./app.layout.component";
import {SharedModule} from 'src/app/shared/shared.module';
import {MessageService} from 'primeng/api';
import {AuthenticationService} from "../core/services/auth.service";

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule, 
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule, 
        RouterModule,
        AppConfigModule,
    ],
    exports: [AppLayoutComponent],
    providers: [MessageService, AuthenticationService]
})
export class AppLayoutModule { }
