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
  originalWorkout: Workout;
  workout: Workout;
  editMode = false;
  id: string;

  constructor(private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = params['id'];

            if ( this.id == null || this.id === undefined) {
              return this.editMode = false;
            }

            this.originalWorkout = this.workoutService.getWorkout(this.id);

            if ( this.originalWorkout == null || this.originalWorkout === undefined) {
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
      const newWorkout = new Workout('', value.date, value.description, value.exercise, value.sets, value.reps, value.weight);
      if (this.editMode === true) {
       this.workoutService.updateWorkout(this.originalWorkout, newWorkout);
     } else {
       this.workoutService.addWorkout(newWorkout);
     }
     this.router.navigate(['/workouts']);
   }

   onCancel() {
    this.originalWorkout ? this.router.navigate(['/workouts', this.originalWorkout.id]) : this.router.navigate(['/workouts']);
  }
}

