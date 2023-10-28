import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { LoggerModule } from "ngx-logger";
import { environment } from "src/environments/environment";
import { NotfoundComponent } from './notfound/notfound.component';
import { CustomUiModule } from './custom-ui/custom-material.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent, 
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AppLayoutModule,
        CoreModule,
        SharedModule,
        CustomUiModule.forRoot(),
        LoggerModule.forRoot({
            // serverLoggingUrl: `http://my-api/logs`,
            level: environment.logLevel,
            serverLogLevel: environment.serverLogLevel
        })
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
