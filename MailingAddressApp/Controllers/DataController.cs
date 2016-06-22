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
        const int itemsPerPage = 3000;
        //
        // GET: /Data/

        public JsonResult GetMailAddressList(int id)
        {
            try
            {
                List<MailAddress> adsList = new List<MailAddress>();
                using (MailAddressEntities dc = new MailAddressEntities())
                {
                    adsList = dc.MailAddresses.OrderBy(ord => ord.Id).Skip((int)(id - 1) * itemsPerPage).Take(itemsPerPage).ToList();
                }
                return new JsonResult { Data = adsList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (System.Data.EntityException) 
            {
                return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.DenyGet };
            }
            catch (ArgumentNullException)
            {
                return new JsonResult { JsonRequestBehavior = JsonRequestBehavior.DenyGet };
            }
            
        }

    }
}
