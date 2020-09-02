import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  //{ path: 'home/:any', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'details/:any', loadChildren: './pages/details/details.module#DetailsPageModule' },
  { path: 'active-packages', loadChildren: './pages/active-packages/active-packages.module#ActivePackagesPageModule' },
  { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'error', loadChildren: './pages/error/error.module#ErrorPageModule' },
  { path: 'edit-package/:any', loadChildren: './pages/edit-package/edit-package.module#EditPackagePageModule' },
  { path: 'show-map', loadChildren: './pages/show-map/show-map.module#ShowMapPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'barcode-scanner', loadChildren: './pages/barcode-scanner/barcode-scanner.module#BarcodeScannerPageModule' },
  { path: 'url-changer', loadChildren: './pages/url-changer/url-changer.module#UrlChangerPageModule' }



//   { path: 'tabs',
//   component: TabsPage,
//   children: [
//     {path: 'home', children: [{path: '', loadChildren: './pages/home/home.module#HomePageModule'}]},
//     {path: 'details/:any', children: [{path: '', loadChildren: './pages/details/details.module#DetailsPageModule'}]},
//     {path: 'active-packages', children: [{path: '', loadChildren: './pages/active-packages/active-packages.module#ActivePackagesPageModule'}]},
//     {path: 'history', children: [{path: '', loadChildren: './pages/history/history.module#HistoryPageModule'}]},
//     {path: 'settings', children: [{path: '', loadChildren: './pages/settings/settings.module#SettingsPageModule'}]},
//     {path: 'help', children: [{path: '', loadChildren: './pages/help/help.module#HelpPageModule'}]},
//     {path: 'error', children: [{path: '', loadChildren: './pages/error/error.module#ErrorPageModule'}]},
//     {path: '', redirectTo: '/tabs/home', pathMatch: 'full' }
//   ]
// }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
