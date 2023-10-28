import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from '../service/app.layout.service';
import { AuthenticationService} from 'src/app/core/services/auth.service'
import {ROLES} from "../../models/constants";
import {IMenuItem} from "../../models/interfaces";


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    @Input() menuItems : IMenuItem[] = [];
    constructor(
        public layoutService: LayoutService, 
    ) { }

    ngOnInit() {
        this.model = this.menuItems ;
    }
}
