import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
  //encapsulation: ViewEncapsulation.Emulated
  //styles: [` .glyphicon {color: green;}`]
  //inputs: ['isFavourite'] //brittle, not recommended
})
export class FavouriteComponent implements OnInit {
  // use alias to minize breakages due to name refactoring
  @Input('is-favourite') isFavourite:boolean;
  //isFavourite: boolean; 

  @Output('change') click = new EventEmitter();
  title;

  onStarClicked(){
    this.isFavourite = !this.isFavourite;
    this.click.emit({newValue: this.isFavourite});
  }

  onKeyUp(){    
  }
  constructor() { }

  ngOnInit() {
  }

}

export interface FavouriteChangedEventArgs {
  newValue: boolean
}