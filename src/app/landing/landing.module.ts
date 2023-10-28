import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { SharedModule } from "src/app/shared/shared.module";
import { environment } from "../../environments/environment";

import { LandingRoutingModule } from "./landing-routing.module";
import { HomeComponent } from "./home/home.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { MessageService } from "primeng/api";
import { RECAPTCHA_V3_SITE_KEY, RecaptchaModule } from "ng-recaptcha";

@NgModule({
  declarations: [HomeComponent, GalleryComponent],
  imports: [CommonModule, SharedModule, LandingRoutingModule, RecaptchaModule],
  providers: [
    AuthenticationService,
    MessageService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
})
export class LandingModule {}
