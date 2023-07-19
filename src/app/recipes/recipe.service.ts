import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model'
import {ShoppingListService} from '../shopping-list/shoppingList.service';
import {Subject} from 'rxjs';
@Injectable()
export class RecipeService{

  recipeUpdatedSubscription = new Subject<Array<Recipe>>();
// private recipes:Array<Recipe> = [ new Recipe('DummyRecipe', 'This is a Dummy Recipe',
//   "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
//   [new Ingredient('Meat', 1), new Ingredient('French Fries', 2)]),
//   new Recipe('This is another Test Recipe', 'This is a Dummy Recipe',
//     "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
//     [new Ingredient('Bread', 2), new Ingredient('Meat', 1)])
// ]; //An Array of recipes
  private recipes:Array<Recipe> = [];

  // public selectedRecipe = new EventEmitter<Recipe>();
  constructor(private shoppingListService:ShoppingListService) {
  }


  getRecipes()
  {
    return this.recipes.slice(); //returns a copy of the array.
  }

  addIngredientsToShoppingList(ingredients:Ingredient[])
  {
    this.shoppingListService.addIngredients(ingredients);
  }

  getRecipe(index:number)
  {
    return this.recipes[index];
  }

  addRecipe(newRecipe:Recipe)
  {
    this.recipes.push(newRecipe);
    this.recipeUpdatedSubscription //to inform the recipe component, that data has changed.
      .next(this.recipes.slice());
  }
  updateRecipe(index:number, updatedRecipe:Recipe)
  {
    this.recipes[index] = updatedRecipe;
    this.recipeUpdatedSubscription //to inform the recipe component, that data has changed.
      .next(this.recipes.slice());
  }

  deleteRecipe(index :number)
  {
    this.recipes.splice(index, 1);
    this.recipeUpdatedSubscription
      .next(this.recipes.slice())
  }

  setRecipes(fetchedRecipes:Recipe[])
  {
    this.recipes = fetchedRecipes;
    this.recipeUpdatedSubscription.next(this.recipes.slice());
    //recipes changed.
  }
}
