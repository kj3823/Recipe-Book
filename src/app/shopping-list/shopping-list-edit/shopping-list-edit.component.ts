import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model'
import {ShoppingListService} from '../shoppingList.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  // @ViewChild('nameInput', {static:false}) newIngredientName:ElementRef
  // @ViewChild('amountInput', {static:false}) newIngredientAmount:ElementRef
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('form', {static:false}) shoppingListForm:NgForm

  editingSubscription:Subscription;
  editMode:boolean = false;
  editingItemIndex:number;
  editedItem:Ingredient;
  constructor(private shoppingListService:ShoppingListService) {
  }
  onSubmit(form:NgForm)
  {
    // const newIngredient = new Ingredient(this.newIngredientName.nativeElement.value, this.newIngredientAmount.nativeElement.value)
    // this.shoppingListService.AddIngredient(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
    if(this.editMode)
    {
      this.editedItem = {name: this.shoppingListForm.value.name, amount :this.shoppingListForm.value.amount}
      this.shoppingListService.updateIngredient(this.editingItemIndex, this.editedItem);
    }
    else
    {
      const newIngredient = new Ingredient(form.value.name, form.value.amount);
      this.shoppingListService.AddIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onClear()
  {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editingItemIndex);
    this.onClear();
  }

  ngOnInit()
  {
    this.editingSubscription = this.shoppingListService.startedEditing
      .subscribe((indexOfItem:number) => {
        this.editMode = true;
        this.editingItemIndex = indexOfItem;
        this.editedItem = this.shoppingListService.getIngredient(this.editingItemIndex);
        this.shoppingListForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        });
      })
  }
  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
}
