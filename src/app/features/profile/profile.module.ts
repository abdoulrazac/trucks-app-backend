import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileDetailsComponent } from "./profile-details/profile-details.component";
import { ProfileFormComponent } from "./profile-form/profile-form.component";
import { CardModule } from "primeng/card";

@NgModule({
  declarations: [ProfileDetailsComponent, ProfileFormComponent],
  imports: [CommonModule, SharedModule, ProfileRoutingModule, CardModule],
})
export class ProfileModule {}
