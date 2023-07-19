import {Component, Injectable} from '@angular/core'
import {RecipeService} from './recipe.service';
@Injectable()
@Component({
  selector:'app-recipes',
  templateUrl:'./recipes.component.html'
  // providers:[RecipeService] // service is available to all children of Recipe Component, but not outside it.
})

export class RecipesComponent {

  constructor() {
  }
}
