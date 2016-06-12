using MailingAddressApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MailingAddressApp.Controllers
{
    public class DataController : Controller
    {
        //
        // GET: /Data/

        public JsonResult GetMailAddressList()
        {
            List<MailAddress> adsList = new List<MailAddress>();
            using (MailAddressEntities dc = new MailAddressEntities())
            {
                adsList = dc.MailAddresses.OrderBy(ord => ord.CreationDate).ToList();
            }
            return new JsonResult { Data = adsList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

    }
}
