import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  @Output() selectedWorkoutEvent = new EventEmitter<Workout>();
  subscription: Subscription;
  term: string;

  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) { }

    ngOnInit() {
      this.workouts = this.workoutService.getWorkouts();
      this. subscription = this.workoutService.workoutListChangedEvent
        .subscribe((workoutsList: Workout[]) => { 
          this.workouts = workoutsList;
        });
  
      this.workoutService.workoutListChangedEvent
        .subscribe((workouts: Workout[]) => {
        this.workouts = workouts;
    })
    }
  
    onKeyPress(value: string){
      this.term = value;
    }
  
    // onContactSelected(contact: Contact){
    //   this.contactService.contactSelectedEvent.emit(contact);
    // }

}




