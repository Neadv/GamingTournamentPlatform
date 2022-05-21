namespace GamingTournamentPlatform.Application.Common.Models
{
    public class TokenDTO
    {
        public string AccessToken { get; set; }
        public int ExpireInMinutes { get; set; }
        public DateTime ExpireDate { get; set; }

        public TokenDTO(string accessToken, int acessTokenExpireInMinutes)
        {
            AccessToken = accessToken;
            ExpireInMinutes = acessTokenExpireInMinutes;
            ExpireDate = DateTime.Now.AddMinutes(acessTokenExpireInMinutes);
        }
    }
}
