import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {AuthComponent} from './auth/auth.component';

import {RecipesResolverService} from './recipes/recipes-resolver-service';

import {AuthGuard} from './auth/auth.guard';
import {RecipesModule} from "./recipes/recipes.module";

const routes :Routes = [
  {path:'', redirectTo:'/recipes', pathMatch:'full', resolve: {recipes:RecipesResolverService}},
  {path:'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule) //using lazyLoading
  },
  {path:'auth',
    loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) //using lazyLoading
  },
  {path:'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule) //using lazyLoading
  }
];
@NgModule({
  imports:[RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})], //Preloads all modules for lazy loading
  exports:[RouterModule]
})
export class AppRoutingModule
{

}
