import { Injectable } from '@angular/core';

@Injectable()

export class Workout {

    constructor(
        // public _id: string,
        public id: string,
        public date: Date,
        public description: string,
        public exercise: string,
        public sets: number,
        public reps: number,
        public weight: string
    ) {}
}
