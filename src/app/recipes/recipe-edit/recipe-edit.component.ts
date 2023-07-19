import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  recipeID:number;
  allowEdit:boolean = false;

  recipeForm:FormGroup

  constructor(private activeRoute: ActivatedRoute, private recipeService:RecipeService, private router:Router) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((newParams:Params) => {
      this.recipeID = + newParams['id'];
      this.allowEdit = newParams['id'] !== undefined;
      // console.log(this.allowEdit);
      this.initForm();
      //will be undefined if we are creating a new component. (will return false)
      // will be set if we are editing a new component (will return true)
    })
  }

  private initForm()
  {
    let recipeName =  '';
    let recipeDescription = '';
    let recipeImageURL = '';
    let recipeIngredients = new FormArray([])

    if(this.allowEdit) //fetching the recipe, if in edit mode.
    {
      const fetchedRecipe = this.recipeService.getRecipe(this.recipeID)
      recipeName = fetchedRecipe.name;
      recipeDescription = fetchedRecipe.description;
      recipeImageURL = fetchedRecipe.imageURL;
      if(fetchedRecipe.ingredients !== undefined)
      {
        for(let ingredient of fetchedRecipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount,
                  [Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)]),
              })
          );
        }
      }
    }
    this.recipeForm = new FormGroup<any>({
      'name':new FormControl(recipeName, [Validators.required]),
      'description':new FormControl(recipeDescription, [Validators.required]),
      'imageURL':new FormControl(recipeImageURL, [Validators.required]),
      'ingredients':recipeIngredients
    })
  }

  onSubmit()
  {
    // const newRecipe = new Recipe(this.recipeForm.value.name,
    //   this.recipeForm.value.description,
    //   this.recipeForm.value.imageURL,
    //   this.recipeForm.value.ingredients);

    //Instead of extracting all data to fit our recipe, we can simply call this.recipeForm.value ,
    // which should have an object in the same structure.
    console.log(this.recipeForm.value);
    if(this.allowEdit) //should push the updated recipe.
    {
      this.recipeService.updateRecipe(this.recipeID,this.recipeForm.value)
    }
    else
    {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    console.log(this.recipeForm);
    this.router.navigate(['../'], {relativeTo:this.activeRoute})
  }

  onCancel()
  {
    this.router.navigate(['../'], {relativeTo:this.activeRoute})
  }

  getIngredientsControl()
  {
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient()
  {
    (<FormArray> this.recipeForm.get('ingredients')).push(new FormGroup({ //since 2 inputs are required we use a FormGroup
      'name':new FormControl(null, [Validators.required]),
      'amount':new FormControl(null,
        [Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onDeleteIngredient(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
