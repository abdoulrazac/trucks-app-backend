import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppConfigComponent } from './app.config.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        AppConfigComponent
    ],
    exports: [
        AppConfigComponent
    ]
})
export class AppConfigModule { }
