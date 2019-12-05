namespace WorkoutApp.Models
{
    public class WorkoutAppDatabaseSettings : IWorkoutAppDatabaseSettings
    {
        public string WorkoutCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IWorkoutAppDatabaseSettings
    {
        string WorkoutCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}