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
        const int itemsPerPage = 10000;
        //
        // GET: /Data/

        public ActionResult GetMailAddressList(int id)
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
                return new HttpStatusCodeResult(404);
            }
            catch (ArgumentNullException)
            {
                return new HttpStatusCodeResult(404);
            }   
        }

        public ActionResult GetMailAddressesCount()
        {
            try
            {
                MailAddressEntities dc = new MailAddressEntities();
                return new JsonResult { Data = (int)(1 + (dc.MailAddresses.Count() / itemsPerPage)), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (System.Data.EntityException)
            {
                return new HttpStatusCodeResult(404);
            }
            catch (ArgumentNullException)
            {
                return new HttpStatusCodeResult(404);
            }
            catch (OverflowException)
            {
                return new HttpStatusCodeResult(404);
            }
        }
    }
}
