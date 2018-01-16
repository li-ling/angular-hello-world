import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { FollowersService } from '../services/followers.services';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private service: FollowersService) { }

  ngOnInit() {
    // two ways to get params and query params
    // let id = this.route.snapshot.paramMap.get('id')
    // let pageNum = this.route.snapshot.queryParamMap.get('page');

    // calling subscribe inside another subcribe method - not ideal   
    // let obs = Observable.combineLatest([
    //   this.route.paramMap,
    //   this.route.queryParamMap
    // ])
    // .subscribe(combined => {
    //   let id = combined[0].get('id');
    //   let page = combined[1].get('page');

    //   // use these paramets to get data from server using service like
    //   // this.service.getAll({id: id, page: page})
    //   this.service.getAll()
    //   .subscribe(
    //     followers => this.followers = followers 
    //   );    
    // });

    // using swtichMap operator to transform Observable objects into any[] directly
    let obs = Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .switchMap(combined => {
      let id = combined[0].get('id');
      let page = combined[1].get('page');
  
      return this.service.getAll();
    })
    .subscribe(followers => this.followers = followers);    
    
  }

}
