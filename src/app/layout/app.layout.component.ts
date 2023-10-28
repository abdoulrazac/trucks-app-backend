import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar/app.sidebar.component";
import { AppTopBarComponent } from "./app.topbar/app.topbar.component";
import { ROLES } from "../models/constants";
import { AuthenticationService } from "../core/services/auth.service";
import { IMenuItem } from "../models/interfaces";
import {
  APP_ACCOUNTANT_HOME,
  APP_ACCOUNTANT_INPUT,
  APP_ACCOUNTANT_INVOICE,
  APP_ACCOUNTANT_OUTPUT,
  APP_ACCOUNTANT_SALARY,
  APP_ADMIN_CONDUCTOR,
  APP_ADMIN_HOME,
  APP_ADMIN_INVOICE,
  APP_ADMIN_SOCIETY,
  APP_ADMIN_TRAVEL,
  APP_CONDUCTOR_EXPENSE,
  APP_CONDUCTOR_HOME,
  APP_CONDUCTOR_TRAVEL,
  APP_PROFILE,
  APP_RESOURCE_CATEGORY,
  APP_RESOURCE_TRUCK,
  APP_RESOURCE_USER,
  APP_RESOURCE_VEHICLE,
  APP_WELCOME,
} from "../models/app-path";

@Component({
  selector: "app-layout",
  templateUrl: "./app.layout.component.html",
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  menuItems: IMenuItem[];
  overlayMenuOpenSubscription: Subscription;

  showSpinner: boolean = false;

  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    private authService: AuthenticationService
  ) {
    this.menuItems = [];
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            "document",
            "click",
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopbar.menuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );

              if (isOutsideClicked) {
                this.hideMenu();
              }
            }
          );
        }

        if (!this.profileMenuOutsideClickListener) {
          this.profileMenuOutsideClickListener = this.renderer.listen(
            "document",
            "click",
            (event) => {
              const isOutsideClicked = !(
                this.appTopbar.menu.nativeElement.isSameNode(event.target) ||
                this.appTopbar.menu.nativeElement.contains(event.target) ||
                this.appTopbar.topbarMenuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.topbarMenuButton.nativeElement.contains(
                  event.target
                )
              );

              if (isOutsideClicked) {
                this.hideProfileMenu();
              }
            }
          );
        }

        if (this.layoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(["/login"]);
    }
    const roles = user?.roles ? user.roles : [];
    this.menuItems.push({
      label: "Welcome",
      items: [
        {
          label: "Accueil",
          icon: "pi pi-fw pi-home",
          routerLink: [APP_WELCOME],
        },
      ],
    });

    // Admin
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.MANAGER)) {
      this.menuItems.push({
        label: "Admin",
        items: [
          {
            label: "Tableau de bord",
            icon: "pi pi-fw pi-home",
            routerLink: [APP_ADMIN_HOME],
          },
          {
            label: "Voyages",
            icon: "pi pi-truck",
            routerLink: [APP_ADMIN_TRAVEL],
          },
          {
            label: "Societés",
            icon: "pi pi-building",
            routerLink: [APP_ADMIN_SOCIETY],
          },
          {
            label: "Conducteurs",
            icon: "pi pi-users",
            routerLink: [APP_ADMIN_CONDUCTOR],
          },
          {
            label: "Factures",
            icon: "pi pi-copy",
            routerLink: [APP_ADMIN_INVOICE],
          },
        ],
      });
    }
    if (roles.includes(ROLES.ACCOUNTANT) || roles.includes(ROLES.ADMIN)) {
      this.menuItems.push({
        label: "Comptabilité",
        items: [
          {
            label: "Accueil",
            icon: "pi pi-fw pi-wallet",
            routerLink: [APP_ACCOUNTANT_HOME],
          },
          {
            label: "Factures",
            icon: "pi pi-fw pi-copy",
            routerLink: [APP_ACCOUNTANT_INVOICE],
          },
          {
            label: "Recette",
            icon: "pi pi-fw pi-dollar",
            routerLink: [APP_ACCOUNTANT_INPUT],
          },
          {
            label: "Dépenses",
            icon: "pi pi-fw pi-money-bill",
            routerLink: [APP_ACCOUNTANT_OUTPUT],
          },
          {
            label: "Salaires",
            icon: "pi pi-fw pi-users",
            routerLink: [APP_ACCOUNTANT_SALARY],
          },
        ],
      });
    }
    if (roles.includes(ROLES.ADMIN) || roles.includes(ROLES.MANAGER)) {
      this.menuItems.push({
        label: "Ressources",
        items: [
          {
            label: "Utilisateurs",
            icon: "pi pi-fw pi-users",
            routerLink: [APP_RESOURCE_USER],
          },
          {
            label: "Vehicules",
            icon: "pi pi-fw pi-car",
            routerLink: [APP_RESOURCE_VEHICLE],
          },
          {
            label: `Remorques`,
            icon: "pi pi-fw pi-truck",
            routerLink: [APP_RESOURCE_TRUCK],
          },
          {
            label: `Catégories`,
            icon: "pi pi-fw pi-bookmark",
            routerLink: [APP_RESOURCE_CATEGORY],
          },
        ],
      });
    }

    if (roles.includes(ROLES.CONDUCTOR) || roles.includes(ROLES.ADMIN)) {
      this.menuItems.push({
        label: "Conducteurs",
        items: [
          {
            label: "Tableau de bord",
            icon: "pi pi-fw pi-home",
            routerLink: [APP_CONDUCTOR_HOME],
          },
          {
            label: "Mes voyages",
            icon: "pi pi-truck",
            routerLink: [APP_CONDUCTOR_TRAVEL],
          },
          {
            label: "Mes pannes",
            icon: "pi pi-exclamation-triangle",
            routerLink: [APP_CONDUCTOR_EXPENSE],
          },
        ],
      });
    }
    this.menuItems.push({
      label: "Mon compte",
      items: [
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          routerLink: [APP_PROFILE],
        },
      ],
    });
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add("blocked-scroll");
    } else {
      document.body.className += " blocked-scroll";
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove("blocked-scroll");
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          "(^|\\b)" + "blocked-scroll".split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  }

  get containerClass() {
    return {
      "layout-theme-light": this.layoutService.config.colorScheme === "light",
      "layout-theme-dark": this.layoutService.config.colorScheme === "dark",
      "layout-overlay": this.layoutService.config.menuMode === "overlay",
      "layout-static": this.layoutService.config.menuMode === "static",
      "layout-static-inactive":
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === "static",
      "layout-overlay-active": this.layoutService.state.overlayMenuActive,
      "layout-mobile-active": this.layoutService.state.staticMenuMobileActive,
      "p-input-filled": this.layoutService.config.inputStyle === "filled",
      "p-ripple-disabled": !this.layoutService.config.ripple,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
