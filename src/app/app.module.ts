import { CodeDisplayComponent } from './code-display/code-display.component';
import { RepositoryDisplayComponent } from './repository-display/repository-display.component';
import { UnifiedSearchService } from './unified-search.service';
import { GitCodeSearchService } from './git-code-search.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GitSearchService } from './git-search.service';
import { GitSearchComponent } from './git-search/git-search.component';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoSpecialCharsDirective } from './no-special-chars.directive';

const appRoutes: Routes = [
  { path: '',
    component: HomePageComponent
  },
  { path: 'search',
    redirectTo: '/search/angular',
    pathMatch: 'full' },
  {
    path: 'search/:query',
    component: GitSearchComponent,
    data: {title: 'Git Search'}
  },
  { path: '**', component: NotFoundComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    GitSearchComponent,
    HomePageComponent,
    NotFoundComponent,
    NoSpecialCharsDirective,
    RepositoryDisplayComponent,
    CodeDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [GitSearchService, GitCodeSearchService, UnifiedSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
