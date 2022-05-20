namespace GamingTournamentPlatform.Application.Common.Security
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = true, Inherited = true)]
    public class AuthorizeAttribute : Attribute
    {
        public AuthorizeAttribute() {
            Roles = Array.Empty<string>();
        }

        public AuthorizeAttribute(params string[] roles)
        {
            Roles = roles;
        }

        public string[] Roles { get; set; }
    }
}
