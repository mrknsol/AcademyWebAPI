using webapi.Services.Interfaces;

namespace webapi.Services.Classes;
public class BlackListService : IBlackListService
{
    public HashSet<string> BlackList { get; set; } = new();
    public void AddTokenToBlackList(string token)
    {
        BlackList.Add(token);
    }

    public bool IsTokenBlackListed(string token)
    {
        return BlackList.Contains(token);
    }
}
