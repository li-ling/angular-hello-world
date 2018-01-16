import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(){
    //subscribing to paramMap is necessary to allow users 
    // to stay on same page and navigate (details) back and forth
    // because components are destroyed when navigate away
    this.route.paramMap
      .subscribe(params => {
        let id = +params.get('id');
        //in real world, use this param to get profil from service.getProfile(id);
        console.log(id);
      });

    //alternative way to get id if users not navigating (details) back and forth on same page
    // just use Snapshot
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
   }

   submit(){
     this.router.navigate(['/followers'],
     {queryParams:{page:1, order: 'newest'}}
    );
   }
}
