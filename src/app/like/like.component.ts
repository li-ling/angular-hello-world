import { Component,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {
    @Input('isActive') isActive:boolean;
    @Input('likesCount') numberLikes:number;

    //@Output('click') click = new EventEmitter();

    onClick(){
        // if (this.btnSelected){
        //     this.numLikes--;
        // } else {
        //     this.numLikes++;
        // }
        this.numberLikes += (this.isActive) ? -1 : 1;
        this.isActive = !this.isActive;
        // console.log(`Total Likes= ${this.numberLikes}, isLiked = ${this.isActive}`);

    }

    get numLikes() {
        return this.numberLikes;
    }

    get likesCount(){
        return this.numberLikes;
    }

}
