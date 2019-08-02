using Pizza.BLL;
using Pizza.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pizza.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult ValidateLogin(string PhoneNumber)
        {
            LoginBLL _loginBLL = new LoginBLL();

            Response _response = new Response();
            try
            {
                _response = _loginBLL.ValidateLogin(PhoneNumber);
                if (_response.Status)
                {
                    Session["UserName"] = Convert.ToString(_response.Data);
                }
            }
            catch (Exception ex)
            {
            }
            return Json(_response, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logoff()
        {
            Session.Clear();
            Session.RemoveAll();
            Session.Abandon();
            return RedirectToAction("Index");
        }

    }
}