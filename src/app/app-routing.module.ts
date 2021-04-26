import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "donate/:id",
    loadChildren: () =>
      import("./pages/donate/donate.module").then((m) => m.DonatePageModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfilePageModule),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
