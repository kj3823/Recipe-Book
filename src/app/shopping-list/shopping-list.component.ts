import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shoppingList.service';
import {Subscription} from 'rxjs';
import {LoggingService} from "../logging.service";
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
 ingredients: Array<Ingredient>; //=[new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)];

  private ingredientSubscription:Subscription;

  constructor(private shoppingListService:ShoppingListService, private loggingService:LoggingService) {
  }

  ngOnInit()
  {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (newIngredients:Ingredient[]) =>{
        this.ingredients = newIngredients;
      }
    )
    this.loggingService.printLog("Hello from Shopping List component ngOnInit()")
  }

  ngOnDestroy()
  {
    this.ingredientSubscription.unsubscribe();
  }

  onEditItem(index:number)
  {
    this.shoppingListService.startedEditing
      .next(index) //passes the index on
  }
}
