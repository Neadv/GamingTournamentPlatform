namespace GamingTournamentPlatform.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public User(string username, string email)
        {
            UserName = username;
            Email = email;
        }

        protected User() { }
    }
}
