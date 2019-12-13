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

  //GET
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

  //POST
  addWorkout(newWorkout: Workout) {
    if (!newWorkout) {
      return;
    } else {
      newWorkout.id = "";
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      //add to database
      this.http.post<{ message: string, workout: Workout}>
        ('https://localhost:5001/api/workout/',
          newWorkout,
          { headers: headers })
        .subscribe(
          (responseData) => {
            //add new document to documents
            console.log(responseData);
            this.workouts.push(JSON.parse(JSON.stringify(responseData)));
            this.sortAndSend();
          }
        );
    }
  }

  //PUT Update
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

    //update database
    this.http.put('https://localhost:5001/api/workout/' + originalWorkout.id,
      newWorkout, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.workouts[pos] = newWorkout;
          this.sortAndSend();
        }
      )
  }

  //DELETE
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

// UNUSED WORKOUTS

// fetchWorkouts() {
//   return this.http
//   .get<Workout[]>(
//     'https://localhost:5001/api/workout'
//   )
//   .subscribe((workouts: Workout[]) => {
//     this.workouts = workouts;
//     this.maxWorkoutId = this.getMaxId();
//     this.workouts.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
//     this.workoutListChangedEvent.next(this.workouts.slice());
//     },
//   (error: any) => {
//     console.log(error);
//     }
//   );
// }

// storeWorkouts() {
//   this.workouts = JSON.parse(JSON.stringify(this.workouts));
//   const header = new HttpHeaders({'Content-Type': 'json'});
//   this.http
//     .post('https://localhost:5001/api/workout', this.workouts, {})
//     .subscribe((returnedWorkouts: Workout[]) => {
//       this.workoutListChangedEvent.next(returnedWorkouts.slice());
//     });
// }

// getWorkout(id: string): Workout {
//   for (const workout of this.workouts) {
//     if (workout.id === id) {
//       return workout;
//     }
//   }
//   return null;
// }

// getWorkouts(): Workout[] {
//   return this.workouts.slice();
// }


// getMaxId(): number {
//   let maxId = 0;

//   // var ObjectID = require('bson').ObjectID;
//   // var id  = new ObjectID();
//   // console.log(id.toString());

//   //https://stackoverflow.com/questions/10593337/is-there-any-way-to-create-mongodb-like-id-strings-without-mongodb/37438675
  
//   // const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
//   // s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

//   return maxId;
// }






//UNUSED DOCUMENTS

//   fetchDocuments() {
//     return this.http
//       .get<Document[]>(
//         'https://samueltwagner-cms.firebaseio.com/documents.json'
//       )
//       .subscribe((documents: Document[]) => {
//         this.documents = documents;
//         this.maxDocumentId = this.getMaxId();
//         this.documents.sort((a, b) => (a.name < b.name) ? 1 : (a.name > b.name) ? -1 : 0);
//         this.documentListChangedEvent.next(this.documents.slice());
//         },
//       (error: any) => {
//         console.log(error);
//         }
//       )
//   }

//   storeDocuments() {
//     this.documents = JSON.parse(JSON.stringify(this.documents));
//     const header = new HttpHeaders({'Content-Type': 'json'});
//     this.http
//       .put('https://samueltwagner-cms.firebaseio.com/documents.json', this.documents, {headers: header})
//       .subscribe((returnedDocuments: Document[]) => {
//         this.documentListChangedEvent.next(returnedDocuments.slice());
//       });
//   }

//     getMaxId(): number {
//       let maxId = 0;
//       for (let document of this.documents) {
//         let currentId = +document.id;
//           if (currentId > maxId) {
//             maxId = currentId;
//           }
//           return maxId;
//       }
//     }

//     updateDocument(originalDocument: Document, newDocument: Document){
//       if (!originalDocument  ||  !newDocument){
//         return;
//       }
//       const pos = this.documents.indexOf(originalDocument);
//       if ( pos < 0 ){
//         console.log("No negative indexes");
//         return;
//       }
//       newDocument.id = originalDocument.id;
//       this.documents[pos] = newDocument;
//       this.storeDocuments();
//     }

//     deleteDocument(document: Document) {
//       if (document === null || document === undefined) {
//         return;
//       }
//       const pos = this.documents.indexOf(document);
//       if (pos < 0) {
//         return;
//       }
//       this.documents.splice(pos, 1);
//       this.storeDocuments();
//     }
// }
