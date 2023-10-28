import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { NotfoundComponent } from "./notfound/notfound.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  { path: "login", redirectTo: "/auth" },
  { path: "logout", redirectTo: "/auth/logout" },
  {
    path: "welcome",
    loadChildren: () =>
      import("./features/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "resources/users",
    loadChildren: () =>
      import("./features/accounts/accounts.module").then(
        (m) => m.AccountsModule
      ),
  },
  {
    path: "resources/categories",
    loadChildren: () =>
      import("./features/categories/categories.module").then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./features/profile/profile.module").then((m) => m.ProfileModule),
  },
  { path: "notfound", component: NotfoundComponent },
  {
    path: "",
    loadChildren: () =>
      import("./landing/landing.module").then((m) => m.LandingModule),
  },
  { path: "**", redirectTo: "/notfound" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
