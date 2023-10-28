import {Component, ElementRef, Input} from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import {ROLES} from "../../models/constants";
import {IMenuItem} from "../../models/interfaces";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {

    @Input() menuItems : IMenuItem[] = []
    constructor(public layoutService: LayoutService, public el: ElementRef) { }
}

