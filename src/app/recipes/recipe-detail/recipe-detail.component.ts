import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Recipe} from '../recipe.model'
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
 recipe:Recipe
  recipeID:number

  paramsSubscription:Subscription
  constructor(private recipeService:RecipeService, private activeRoute:ActivatedRoute, private router:Router) {

  }

  ngOnInit()
  {
    this.paramsSubscription = this.activeRoute.params
      .subscribe(newParams => {
        this.recipeID = + newParams['id'];
        this.recipe = this.recipeService.getRecipe(this.recipeID);
      })
  }

  sendToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    // for(let i=0;i<this.recipe.ingredients.length;i++)
    // {
    //   this.shoppingListService.AddIngredient(this.recipe.ingredients[i]);
    // }
  }

  onEditRecipe()
  {
    this.router.navigate(['edit'], {relativeTo:this.activeRoute})
  }

  onDeleteRecipe(index:number)
  {
    if(confirm("Do you want to Delete this recipe?"))
    {
      this.recipeService.deleteRecipe(index)
    }
    this.router.navigate(['/recipes']);
  }
}
