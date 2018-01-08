import { CoursesService } from './courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'courses', //CSS selector
    //use string interpolation for headins,strings,divs,spans
    //only use directives to MODIY the DOM structure or attributes of DOM elements
    templateUrl: './courses.component.html'
})
export class CoursesComponent{
    title = "List of courses";
    imageUrl = "http://lorempixel.com/400/200";
    isActive = true;
    courses;
    email = "me@example.com";
    text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum risus vitae enim pharetra, iaculis varius diam placerat. Aliquam sodales nibh risus, eu euismod libero placerat id. Etiam quis vulputate enim, sit amet varius tortor. Ut egestas nibh ligula, et hendrerit sem fermentum at. Suspendisse facilisis erat at ullamcorper venenatis. Curabitur fringilla ante vel leo lacinia, in pellentesque leo ornare. Mauris imperdiet diam sed nulla sodales faucibus. Aenean rhoncus egestas sapien ut facilisis.`;
    viewMode = 'something else';

    onAdd(){
        this.courses.push({id: 4, name:'course 4'});
    }
    onChange(course){
        //this.courses.splice(this.courses.indexOf(course),1);
        course.name= 'Updated';
    }
    
    loadCourses(){
        this.courses = 
        [{id: 1, name: 'course 1' },
        {id: 2, name: 'course 2' },
        {id: 3, name: 'course 3' }];
    }

    trackCourse(index, course){
        return course ? course.id : undefined;
    }

    onDivClicked(){
        console.log("Div was clicked");
    }
    onSave($event){
        $event.stopPropagation();
        console.log("Button was clicked", $event);

    }

    onKeyUp($event){
        console.log($event.target.value);
    }

    onKeyUp2(){
        console.log(this.email);
    }

    //use dependency injection instead of explicit creation of instance
    // 'new CoursesService()' inside the constructor method
    constructor(service: CoursesService){
        this.courses = service.getCourses();
    }

    getTitle(){
        return this.title;
    }

}