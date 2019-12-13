import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit, OnDestroy  {
  @Output() selectedWorkoutEvent = new EventEmitter<Workout>();
  subscription: Subscription;
  term: string;

  workouts: Workout[] = [];

  constructor(private workoutService: WorkoutService) { }

    ngOnInit() {
      this.workoutService.getWorkouts();
      this. subscription = this.workoutService.workoutListChangedEvent
        .subscribe((workoutList: Workout[]) => { 
          this.workouts = workoutList;
        });
    }
  
    onKeyPress(value: string){
      this.term = value;
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

}






