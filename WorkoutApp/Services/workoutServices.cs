using WorkoutApp.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace WorkoutApp.Services
{
    public class WorkoutService
    {
        private readonly IMongoCollection<Workout> _workouts;

        public WorkoutService(IWorkoutAppDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _workouts = database.GetCollection<Workout>(settings.WorkoutCollectionName);
        }

        public List<Workout> Get() =>
            _workouts.Find(workout => true).ToList();

        public Workout Get(string id) =>
            _workouts.Find<Workout>(workout => workout.Id == id).FirstOrDefault();

        public Workout Create(Workout workout)
        {
            _workouts.InsertOne(workout);
            return workout;
        }

        public void Update(string id, Workout workoutIn) =>
            _workouts.ReplaceOne(workout => workout.Id == id, workoutIn);

        public void Remove(Workout workoutIn) =>
            _workouts.DeleteOne(workout => workout.Id == workoutIn.Id);

        public void Remove(string id) => 
            _workouts.DeleteOne(workout => workout.Id == id);
    }
}