import { Component, OnInit, Input } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.css']
})
export class WorkoutDetailComponent implements OnInit {
  id: string;
  workout: Workout;

  //inject from service
  constructor(private workoutService: WorkoutService,
              private router: Router,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.workout = this.workoutService.getWorkout(this.id);
      }
    )};

    onDelete(){
      this.workoutService.deleteWorkout(this.workout);
      this.router.navigate(['/workouts'], {relativeTo: this.route}); 
    }
}
