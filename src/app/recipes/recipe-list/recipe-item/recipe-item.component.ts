import { Component, Input } from '@angular/core';
import {Recipe} from '../../recipe.model'
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {

@Input() recipe:Recipe
  @Input() recipeID:number;
  // @Output() recipeSelected = new EventEmitter<void>()

  // onRecipeClicked()
  // {
  //   this.recipeService.selectedRecipe.emit(this.recipe);//emits the selected recipe.
  //   // this.recipeSelected.emit();
  // }
}
