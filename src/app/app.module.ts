import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';


import {HeaderComponent} from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import {RecipesComponent} from './recipes/recipes.component';
import {DropdownDirective} from './shared/dropdown-directive'
import {ShoppingListService} from './shopping-list/shoppingList.service';
import {RecipeService} from './recipes/recipe.service';
import {AuthInterceptorService} from './auth/auth.interceptor.service';

import {AppRoutingModule} from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import {AuthComponent} from './auth/auth.component';

import{LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AlertComponent} from "./shared/alert/alert.component";
import {PlaceholderDirective} from "./shared/placeholder.directive";
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";
import {LoggingService} from "./logging.service";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // DropdownDirective,
    // AuthComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, //Our User Derived Module.
    // ReactiveFormsModule,
    HttpClientModule,
    // RecipesModule, //All recipe related components are put in the imports array
    ShoppingListModule,
    CoreModule,
    AuthModule
  ],
  providers: [
  //   ShoppingListService, RecipeService,  //the recipe service is required so we keep the same instance active.
  //   {
  //   provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true
  // }
  //   LoggingService
  ],
  bootstrap: [AppComponent], //components that are present in index.html file.
})
export class AppModule { }
