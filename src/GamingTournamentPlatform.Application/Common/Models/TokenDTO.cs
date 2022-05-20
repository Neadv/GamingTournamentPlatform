namespace GamingTournamentPlatform.Application.Common.Models
{
    public class TokenDTO
    {
        public string AccessToken { get; set; }
        public int AcessTokenExpireInMinutes { get; set; }
        public DateTime AcessTokenExpireDate { get; set; }

        public TokenDTO(string accessToken, int acessTokenExpireInMinutes)
        {
            AccessToken = accessToken;
            AcessTokenExpireInMinutes = acessTokenExpireInMinutes;
            AcessTokenExpireDate = DateTime.Now.AddMinutes(acessTokenExpireInMinutes);
        }
    }
}
