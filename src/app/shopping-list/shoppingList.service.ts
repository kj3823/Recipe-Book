import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
export class ShoppingListService
{
  private ingredients: Array<Ingredient>= [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];

  // ingredientsChanged = new EventEmitter<Array<Ingredient>>();
  ingredientsChanged = new Subject<Array<Ingredient>>();

  startedEditing = new Subject<number>();
getIngredients()
{
  return this.ingredients.slice();
}
  AddIngredient(ingredient:Ingredient)
  {
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.emit(this.ingredients.slice()); //inform other components that data has changed.
    this.ingredientsChanged.next(this.ingredients.slice()); //inform other components that data has changed.
  }

  addIngredients(listOfIngredients:Ingredient[])
  {
    this.ingredients.push(...listOfIngredients); //spread operator, adds all our ingredients together.
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());
  };

  getIngredient(index:number)
  {
    return this.ingredients[index];
  }

  deleteIngredient(index:number)
  {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number, updatedIngredient:Ingredient)
  {
    this.ingredients[index] = updatedIngredient;
    console.log(this.ingredients);
    this.ingredientsChanged.next(
      this.ingredients.slice()
    )
  }
}
