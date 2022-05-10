using System;

namespace InventoryApp.API.Helper
{
    public static class Extension
    {
        public static string calDate(this DateTime datetime)
        {
        string date = datetime.ToShortDateString();
        return  date;
        }
    }
}