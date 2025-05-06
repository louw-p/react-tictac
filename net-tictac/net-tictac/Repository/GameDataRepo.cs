using Microsoft.Data.Sqlite;
using System.Text.Json;

namespace net_tictac.Repository
{
    public class GameDataRepo
    {
        private readonly string _connectionString;

        public GameDataRepo(string connectionString)
        {
            _connectionString = connectionString;

            // Ensure the database and table are created
            InitializeDatabase();
        }

        private void InitializeDatabase()
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText = @"
                CREATE TABLE IF NOT EXISTS GameData (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    History TEXT NOT NULL
                );
            ";
            command.ExecuteNonQuery();
        }

        public void SaveGame(string[][] history)
        {
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText = @"
                INSERT INTO GameData (History)
                VALUES (@History);
            ";

            var historyJson = JsonSerializer.Serialize(history);
            command.Parameters.AddWithValue("@History", historyJson);

            command.ExecuteNonQuery();
        }

        public List<string[][]> GetGame()
        {

            var games = new List<string[][]>();
            using var connection = new SqliteConnection(_connectionString);
            connection.Open();

            var command = connection.CreateCommand();
            command.CommandText = @"
                SELECT * FROM GameData;
            ";

            using var reader = command.ExecuteReader();
            while (reader.Read())
            {
                // Retrieve the JSON string from the database
                var historyJson = reader.GetString(0);


                // Deserialize the JSON back into a string[][]
                var history = JsonSerializer.Deserialize<string[][]>(historyJson);

                if (history != null)
                {
                    games.Add(history);
                }
            }

            // If no record is found, return null or throw an exception
            return games;
        }
    }
}