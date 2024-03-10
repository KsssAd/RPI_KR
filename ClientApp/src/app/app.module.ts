import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './component/app.component';
import { NavMenuComponent } from './component/nav-menu/nav-menu.component';
import { HomeComponent } from './component/home/home.component';
import { AboutComponent } from './component/about-us/about.component';
import { ToursComponent } from './component/tours/tours.component';
import { FooterComponent } from './component/footer/footer.component';
import { TypesTourComponent } from './component/types-tour/types-tour.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    AboutComponent,
    HomeComponent,
    ToursComponent,
    FooterComponent,
    TypesTourComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'tours', component: ToursComponent },
      { path: 'about', component: AboutComponent },
      { path: 'types', component: TypesTourComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
