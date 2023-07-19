import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/Operators';

import {AuthService} from '../auth/auth.service';

//Required since a service is benign injected into another service.
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService:AuthService) {
  }

  storeRecipes() {
    // You can return that observable, and subscribe in that component (useful for showing a loading indicator)
    const fetchedRecipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-22245-default-rtdb.firebaseio.com/recipes.json', fetchedRecipes) //.json for firebase
      .subscribe(responseData => {
        console.log(responseData);
      })
  }

  fetchRecipes() {
    return this.authService.userData.pipe(take(1), exhaustMap(user => { //only one subscription is allowed.(then unsubscribes)
      /*The exhaustMap operator, waits for the userData observable to finish, then attaches the inside observable to the chain,
        (in our case the recipe observable), then it works like a normal observable, with the next methods being called.
         Returned is an HTTP Observable*/

        return this.http.get<Recipe[]>('https://recipe-book-22245-default-rtdb.firebaseio.com/recipes.json',
          // {
          //   params: new HttpParams().set('auth', user.Token) //setting queryParameter.
          // } //we get a recipe of arrays.
          // Params not required, since we are setting this using an Interceptor.
        )
    }),
      map(fetchedRecipes => {
        return fetchedRecipes.map(recipe => { //map for Array is called here.(new array created)
          return {
            ...recipe,
            ingredients: recipe.ingredients === undefined ? [] : recipe.ingredients
          }
          //pulls out all properties of recipes, and checks if our recipes array is empty or not.
        })
      }),
      tap(recipes => { //allows us to execute code without altering the data.
        this.recipeService.setRecipes(recipes);
      }))
  }
}
