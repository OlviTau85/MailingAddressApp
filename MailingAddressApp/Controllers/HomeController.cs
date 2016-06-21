using MailingAddressApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace MailingAddressApp.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
           /* Random r = new Random();
            long ticks = DateTime.Now.Ticks;
            string[] countries = new[] {"Streets", "Россия", "Украина", "Белоруссия"};

            List<string>[] countriesArr = new[] { new List<string>(), new List<string>(), new List<string>(), new List<string>()};
            for (int i = 0; i < countriesArr.Length; i++)
            {
                StreamReader sr = new StreamReader(countries[i] + ".txt");
                while (!sr.EndOfStream)
                {
                    countriesArr[i].Add(sr.ReadLine());
                }
                sr.Close();
            }


            using (MailAddressEntities dc = new MailAddressEntities())
            {

                for (int i = 0; i < 10000; i++)
                {
                    int idx = r.Next(countries.Length - 1) + 1;
                    string country = countries[idx];
                    string city = countriesArr[idx][r.Next(countriesArr[idx].Count)];
                    string street = countriesArr[0][r.Next(countriesArr[0].Count)];
                    string index = (r.Next(100000, 999999)).ToString();
                    int house = r.Next(1, 200);

                    StreamReader sr = new StreamReader(country + ".txt");
                    sr.ReadLine();

                    MailAddress newaddress = new MailAddress();
                    newaddress.Country = country;
                    newaddress.City = city;
                    newaddress.Street = street;
                    newaddress.Index = index;
                    newaddress.HouseNumber = house;
                    int y = r.Next(2010, 2016);
                    int m = r.Next(1, 12);
                    int d = r.Next(1, 30);
                    newaddress.CreationDate = new DateTime(y, y == 2015 && m > 6 ? 6 : m, m == 2 && d > 28 ? 28 : d);
                    dc.MailAddresses.Add(newaddress);
                    dc.SaveChanges();
                }
            }*/
            return View();
        }
    }
}
