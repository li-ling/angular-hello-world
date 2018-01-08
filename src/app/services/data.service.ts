import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadRequestError } from '../common/bad-request-error';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw'; //import static methods


@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }

  getAll(){
    return this.http.get(this.url)
        //map transform response object to an array of json object
        .map(response => response.json())
        .catch(this.handleError);
  }

  create(resource){
    return this.http.post(this.url, JSON.stringify(resource))
    .map(response => response.json())
    // .catch((error: Response) => {
    //     if (error.status === 400)
    //       return  Observable.throw(new BadRequestError(error.json()));
        
    //     return  Observable.throw(new AppError(error.json()));
    //   });
    // above code can be refactored as follows
    .catch(this.handleError);
    
  }

  update(resource){
    return this.http.patch(this.url + '/'+ resource.id, JSON.stringify({isRead: true}))
        .map(response => response.json())  
        .catch(this.handleError);
  }

//with Observables, nothing will happen until you
//subscribe to them. Observables are lazy.
// Promises are eager. you can convert observables to promises
// by using 'toPromise()'

  delete(id){
    return this.http.delete(this.url + '/'+ id)
        .map(response => response.json())
    // use this operator only if you want to convert to promise
        // .toPromise() 
    // .catch((error: Response) => {
      //   if (error.status === 404)
      //     return  Observable.throw(new NotFoundError());

      //   return  Observable.throw(new AppError(error.json()));
      // });
      // above code can be refactored into
        .catch (this.handleError);
  }

  private handleError(error: Response){
    if (error.status === 400)
      return  Observable.throw(new BadRequestError(error.json()));

    if (error.status === 404)
    return  Observable.throw(new NotFoundError());

    return  Observable.throw(new AppError(error.json()));

  }
}
