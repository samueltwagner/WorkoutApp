import { Injectable, EventEmitter } from '@angular/core';
import { Workout } from './workout.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root'})

export class WorkoutService {
  workouts: Workout[] = [];
  workoutListChangedEvent = new Subject<Workout[]>();

  constructor(private http: HttpClient) {}

  sortAndSend() {
    this.workouts.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    this.workoutListChangedEvent.next(this.workouts.slice());
  }

  // GET
  getWorkouts() {
    return this.http.get<{ message: string, workouts: Workout[] }>
      ('https://localhost:5001/api/workout/')
      .subscribe(
        (workoutData) => {
          this.workouts = JSON.parse(JSON.stringify(workoutData));
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getWorkout(workoutId: string): Workout {
    for (const workout of this.workouts) {
      if (workout.id === workoutId) {
        return workout;
      }
    }
    return null;
  }

  // POST
  addWorkout(newWorkout: Workout) {
    if (!newWorkout) {
      return;
    } else {
      newWorkout.id = '';
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      // add to database
      this.http.post<{ message: string, workout: Workout}>
        ('https://localhost:5001/api/workout/',
          newWorkout,
          { headers: headers })
        .subscribe(
          (responseData) => {
            // add new document to documents
            console.log(responseData);
            this.workouts.push(JSON.parse(JSON.stringify(responseData)));
            this.sortAndSend();
          }
        );
    }
  }

  // PUT Update
  updateWorkout(originalWorkout: Workout, newWorkout: Workout) {
    if (!originalWorkout  ||  !newWorkout) {
      return;
    }
    const pos = this.workouts.indexOf(originalWorkout);
    if ( pos < 0 ) {
      console.log('No negative indexes');
      return;
    }
    newWorkout.id = originalWorkout.id;
    // newWorkout._id = originalWorkout._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('https://localhost:5001/api/workout/' + originalWorkout.id,
      newWorkout, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.workouts[pos] = newWorkout;
          this.sortAndSend();
        }
      );
  }

  // DELETE
  deleteWorkout(workout: Workout) {
    if (workout === null || workout === undefined) {
      return;
    }
    const pos = this.workouts.findIndex(d => d.id === workout.id);
    if (pos < 0) {
        return;
      }
      this.http.delete('https://localhost:5001/api/workout/' + workout.id)
      .subscribe(
        (response: Response) => {
          this.workouts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
