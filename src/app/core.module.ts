import {NgModule} from "@angular/core";
import {ShoppingListService} from "./shopping-list/shoppingList.service";
import {RecipeService} from "./recipes/recipe.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth.interceptor.service";
import {LoggingService} from "./logging.service";

@NgModule({
  providers:[
    ShoppingListService, RecipeService,  //the recipe service is required so we keep the same instance active.
    {
      provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true
    }
  ]
})
export class CoreModule
{

}
