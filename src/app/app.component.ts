import { FavouriteChangedEventArgs } from './favourite/favourite.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'Angular app!!';
  canSave = false;
  task = {
    title: 'Review applications',
    assignee: {
      name: null
    }
  }
  post = {
    title: "Title",
    isFavourite: true
  };
  tweet = {
    body: 'Here is the body of a tweet...',
    isLiked: true,
    likesCount: 10
  }
  onFavouriteChange(eventArgs:FavouriteChangedEventArgs ){
    console.log("Favourite Changed: ", eventArgs);
  }
}
