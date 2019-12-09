import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Workout } from '../workout.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})

export class WorkoutEditComponent implements OnInit {
  workout: Workout = null;
  groupWorkout: Workout[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id: string;
  originalWorkout: Workout;
  invalidGroupWorkout: boolean = false;

  constructor(private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = params['id'];
            
            if ( this.id == null || this.id == undefined) {
              return this.editMode = false;
            }
  
            this.originalWorkout = this.workoutService.getWorkout(this.id);
  
            if ( this.originalWorkout == null || this.originalWorkout == undefined){
              return;
            }
  
            this.editMode = true;
            this.workout = JSON.parse(JSON.stringify(this.originalWorkout));
          }
        );
    }

    onSubmit(form: NgForm) {
      // get values from form’s fields
      const value = form.value;
      const newWorkout = new Workout('', value,'','', value , value,'');
      if(this.editMode == true) {
       this.workoutService.updateWorkout(this.originalWorkout, newWorkout);
     }
     else {
       this.workoutService.addWorkout(newWorkout);
     }
     this.router.navigate(['/workout']);
   }

   onCancel(){
    this.router.navigate(['/workout']);
  }

  isInvalidWorkout(newWorkout: Workout){
    if(!newWorkout){
      return true;
    }

    if(newWorkout.id === this.workout.id){
      return true;
    }

    for (let i = 0; i < this.groupWorkout.length; i++){
      if (newWorkout.id === this.groupWorkout[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedWorkout: Workout = $event.dragData;
    this.invalidGroupWorkout = this.isInvalidWorkout(selectedWorkout);
    if (this.invalidGroupWorkout){
      return;
    }
    this.groupWorkout.push(selectedWorkout);
    this.invalidGroupWorkout = false;
  }

  onRemoveItem(idx: number){
    if (idx < 0 || idx >= this.groupWorkout.length){
      return;
    }
      this.groupWorkout.splice(idx, 1);
      this.invalidGroupWorkout = false;
  }

}






