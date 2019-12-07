using WorkoutApp.Models;
using WorkoutApp.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WorkoutApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly WorkoutService _workoutService;

        public WorkoutController(WorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpGet]
        public ActionResult<List<Workout>> Get() =>
            _workoutService.Get();

        [HttpGet("{id:length(24)}", Name = "GetWorkout")]
        public ActionResult<Workout> Get(string id)
        {
            var workout = _workoutService.Get(id);

            if (workout == null)
            {
                return NotFound();
            }

            return workout;
        }

        [HttpPost]
        public ActionResult<Workout> Create(Workout workout)
        {
            _workoutService.Create(workout);

            return CreatedAtRoute("GetWorkout", new { id = workout.Id.ToString() }, workout);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Workout workoutIn)
        {
            var workout = _workoutService.Get(id);

            if (workout == null)
            {
                return NotFound();
            }

            _workoutService.Update(id, workoutIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var workout = _workoutService.Get(id);

            if (workout == null)
            {
                return NotFound();
            }

            _workoutService.Remove(workout.Id);

            return NoContent();
        }
    }
}