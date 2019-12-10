import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Workout } from '../../workout.model';

@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.css']
})
export class WorkoutItemComponent implements OnInit {

  @Input() workout: Workout;
  @Output() workoutSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(){
    this.workoutSelected.emit()
  }
}

