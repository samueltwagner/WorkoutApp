import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutEditComponent } from './workout/workout-edit/workout-edit.component';
import { WorkoutDetailComponent } from './workout/workout-detail/workout-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },

  { path: 'workouts',  component: WorkoutComponent, 
    children: [
      { path: 'new',      component: WorkoutEditComponent },
      { path: ':id',      component: WorkoutDetailComponent },
      { path: ':id/edit', component: WorkoutEditComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
