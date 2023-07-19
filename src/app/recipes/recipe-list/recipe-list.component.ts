import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {DataStorageService} from '../../shared/data-storage-service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  // @Output() recipeWasSelected = new EventEmitter<Recipe>() //passes the Recipe selected.
  recipes:Array<Recipe>;// = [ new Recipe('DummyRecipe', 'This is a Dummy Recipe', "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"), new Recipe('This is another Test Recipe', 'This is a Dummy Recipe', "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg")]; //An Array of recipes
  recipeSubscription:Subscription;
  constructor(private recipeService:RecipeService, private router:Router, private activeRoute:ActivatedRoute, private dataStorage:DataStorageService) {
  }
  ngOnInit()
  {
    this.dataStorage.fetchRecipes().subscribe(() =>{
      console.log("Recipes fetched");
    });
    this.recipes = this.recipeService.getRecipes();
    this.recipeSubscription = this.recipeService.recipeUpdatedSubscription
      .subscribe(updatedRecipeData => {
        this.recipes = updatedRecipeData;
      })
  }

  ngOnDestroy() {
this.recipeSubscription.unsubscribe();
  }

  // onRecipeSelected(recipeSelected:Recipe)
  // {
  //   this.recipeWasSelected.emit(recipeSelected);
  // }

  onCreateRecipe()
  {
    this.router.navigate(['new'],{relativeTo:this.activeRoute} )
  }

}
