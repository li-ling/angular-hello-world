import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http/src/static_response';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService){
  }

  // one of Angular Lifecycle Hooks
  // use ngOnInit to make expensive server calls instead of putting it in the constructor
  ngOnInit(){
    this.service.getAll()
      .subscribe(
       posts => this.posts = posts 
      //  error => {
      //   alert ('An unexpected error occured.');
      //   console.log(error);
      // }
    );
  }


  createPost(input: HTMLInputElement) {
    let post = {title: input.value};
    this.posts.splice(0,0,post);  //optimistic update
    
    input.value = '';

      this.service.create(post)
      .subscribe(
      newPost => {
      //post.id results in error because 'id' does not exist in origial post object
        post['id'] = newPost.id;
        // this.posts.splice(0,0,post); //pessimistic update
      }, 
      (error: AppError) => {
      // to fulfil optimistic update, remove post from top of list if it fails        
        this.posts.splice(0,1); 

        if(error instanceof BadRequestError){
            // this.form.setErrors(error.originalError);
          alert ('Bad request.');
        }
        else throw error;
      });
  }

  updatePost(post){
    // PUT updates entire object    
    // this.http.put(this.url, JSON.stringify(post))
    // PATCH only modifies a few properties of the obejct
    this.service.update(post)
      .subscribe(
      updatedPost => {
        console.log(updatedPost);
      });
  }

  deletePost(post){
      // optimistic update - delete from list before request is sent
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);

      this.service.delete(post.id)
        .subscribe(
        // in a delete operation, there is no body in the resturned result
        // this is pessimistic update
        //  () => {
          // let index = this.posts.indexOf(post);
          // this.posts.splice(index,1);
        //}
        null
        ,
         (error: AppError) => {
      // optimistic update error handling
          this.posts.splice(index,0,post);

          if (error instanceof NotFoundError)
            alert('This post has already been deleted.');
          else throw error;
        });
    }


}
