import {NgModule} from "@angular/core";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesComponent} from "./recipes.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {RecipesRoutingModule} from "./recipes.routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations:[
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  //Not required since they are used internally in this component.
  // exports:[RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipeDetailComponent,
  //   RecipesComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent],
  imports:[
    RecipesRoutingModule,
    //We need this here, otherwise routing related capabilities will not be present.
    ReactiveFormsModule,
    // CommonModule //used to get access to BrowserModule
    SharedModule
  ]
})
export class RecipesModule
{

}
