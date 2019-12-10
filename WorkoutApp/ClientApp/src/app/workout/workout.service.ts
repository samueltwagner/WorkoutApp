import { Injectable, EventEmitter } from '@angular/core';
import { Workout } from './workout.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root'})

export class WorkoutService {
  workoutListChangedEvent = new Subject<Workout[]>();
  // contactChangedEvent = new EventEmitter<Contact[]>();
  // contactSelectedEvent = new EventEmitter<Contact>();
  workouts: Workout[] = [];
  maxWorkoutId: number;

  constructor(private http: HttpClient) { 
    this.fetchWorkouts();
    this.maxWorkoutId = this.getMaxId();
  }

  fetchWorkouts(){
    return this.http
    .get<Workout[]>(
      'https://localhost:5001/api/workout'
    )
    .subscribe((workouts: Workout[]) => {
      this.workouts = workouts;
      this.maxWorkoutId = this.getMaxId();
      this.workouts.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
      this.workoutListChangedEvent.next(this.workouts.slice());
      },
    (error: any) => {
      console.log(error);
      }
    )
  }

  storeWorkouts() {
    this.workouts = JSON.parse(JSON.stringify(this.workouts));
    const header = new HttpHeaders({'Content-Type': 'json'});
    this.http
      .put('https://samueltwagner-cms.firebaseio.com/contacts.json', this.workouts, {headers: header})
      .subscribe((returnedWorkouts: Workout[]) => {
        this.workoutListChangedEvent.next(returnedWorkouts.slice());
      });
  }

  getWorkout(id: string): Workout {
    for (const workout of this.workouts){
      if (workout.id === id) {
        return workout;
      }
    }
    return null;
  }

  getWorkouts(): Workout[] {
    return this.workouts.slice();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let workout of this.workouts) {
      let workoutId = +workout.id;
        if (workoutId > maxId) {
          maxId = workoutId;
        }
        return maxId;
    }
  }

  addWorkout(newWorkout: Workout){
    if (!newWorkout) {
      return;
    }
    else {
      this.maxWorkoutId++;
      newWorkout.id = String(this.maxWorkoutId);
      this.workouts.push(newWorkout);
      this.storeWorkouts();
    }
  }

  updateWorkout(originalWorkout: Workout, newWorkout: Workout){
    if (!originalWorkout  ||  !newWorkout){
      return;
    }
    const pos = this.workouts.indexOf(originalWorkout);
    if ( pos < 0 ){
      console.log("No negative indexes");
      return;
    }
    newWorkout.id = originalWorkout.id;
    this.workouts[pos] = newWorkout;
    this.storeWorkouts();
  }
  
  deleteWorkout(workout: Workout) {
    if (workout === null || workout === undefined) {
      return;
    }
    const pos = this.workouts.indexOf(workout);
    if (pos < 0) {
        return;
      }
      this.workouts.splice(pos, 1);
      this.storeWorkouts();
  }
}
