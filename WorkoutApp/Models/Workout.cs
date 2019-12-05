using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;


namespace WorkoutApp.Models
{
    public class Workout
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Exercise { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public string Weight { get; set; }
    }
}