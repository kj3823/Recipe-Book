import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {DataStorageService} from '../shared/data-storage-service'
import {Observable} from 'rxjs';
import {RecipeService} from './recipe.service';
@Injectable({
  providedIn:'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>
{
  constructor(private dataStorageService:DataStorageService, private recipeService:RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    const fetchedRecipes= this.recipeService.getRecipes();
    console.log(fetchedRecipes.length);
    if(fetchedRecipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    }
    else {
      return this.recipeService.getRecipes();
    }
    //Subscribe will be called automatically, by the resolver.
  }
}
