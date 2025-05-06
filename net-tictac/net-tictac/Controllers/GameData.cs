using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using net_tictac.Repository;

namespace net_tictac.Controllers
{
    [ApiController]
    [EnableCors("AllowAll")]
    [Route("[controller]")]
    public class GameData : ControllerBase
    {

        private readonly ILogger<GameData> _logger;
        private readonly GameDataRepo _repo;

        public GameData(ILogger<GameData> logger)
        {
            _logger = logger;
            _repo = new GameDataRepo("Data Source=GameData.db");
        }


        [HttpPost("SaveGame")]
        public IActionResult Post([FromBody] Game gameData)
        {
            try
            {
                // Log the received data
                _logger.LogInformation("Received game data: {@GameData}", gameData);

                // Process the game data (e.g., save to database)
                _repo.SaveGame(gameData.history);
                // Return success response
                return Ok(new { message = "Game saved successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while saving the game data.");
                return StatusCode(500, new { error = "An internal server error occurred." });
            }
        }

        [HttpGet("GetGame")]
        public IActionResult Get()
        {
            try
            {

                // Process the game data (e.g., save to database)
                Game returnGame = new Game();
                var game = _repo.GetGame();
                //returnGame.history = game;
                // Return success response
                return Ok(new { history = game});
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while saving the game data.");
                return StatusCode(500, new { error = "An internal server error occurred." });
            }
        }

        public class Game
        {
            public string[][] history { get; set; }
            // Add other properties as needed
        }
    }
}

