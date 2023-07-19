import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../auth/auth.guard";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "./recipes-resolver-service";

const routes:Routes = [
  {
    path:'', component:RecipesComponent, canActivate:[AuthGuard], //for lazy loading(path changed, since we are at '' by default)
    // path:'recipes', component:RecipesComponent, canActivate:[AuthGuard],
  children:[
    {path:'', component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent},
    //Dynamic routes should be added last
    {path:':id', component:RecipeDetailComponent, resolve: {recipes:RecipesResolverService}},
    {path:':id/edit', component:RecipeEditComponent, resolve: {recipes:RecipesResolverService}}
  ]
  },
]
@NgModule({
  imports:[RouterModule.forChild(routes)], //Merges child routes, with parent routes.
  exports:[RouterModule]
})
export class RecipesRoutingModule
{
}
