import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[] = [
        {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            routerLink : ['/profile'] 
        },
        {
            separator: true
        },
        {
            label: 'Deconnexion',
            icon: 'pi pi-fw pi-power-off',
            routerLink : ['/logout'] 
        }
    ];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService) { }
}
