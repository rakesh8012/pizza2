using Pizza.BLL;
using Pizza.DTO;
using Pizza.Models.DATA;
using Pizza.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pizza.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetCustomers()
        {

            int start = Convert.ToInt32(Request["start"]);
            int length = Convert.ToInt32(Request["length"]);
            string searchValue = Request["search[value]"];
            string sortColumnName = Request["columns[" + Request["order[0][column]"] + "][name]"];
            string sortDirection = Request["order[0][dir]"];

            CustomerBLL _userBLL = new CustomerBLL();

            CustomerDTO _userListData = new CustomerDTO();

            _userListData = _userBLL.GetUsers(start, length, searchValue, sortColumnName, sortDirection);



            return Json(new { data = _userListData.CustomerListData, draw = Request["draw"], recordsTotal = _userListData.TotalRows, recordsFiltered = _userListData.TotalRowsAfterFiltering }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult AddOrEditCustomer(string id = null)
        {
            PizzaEntities _entities = new PizzaEntities();
            List<SelectListItem> _employees = new List<SelectListItem>();
            CustomerDTO customerDTO = new CustomerDTO();
            CustomerBLL customerBLL = new CustomerBLL();
            try
            {
                customerDTO = customerBLL.AddOrEditCustomer(id);

                _employees = _entities.Employees.ToList().Select(s => new SelectListItem
                {

                    Value = Convert.ToString(s.Employee_UID),
                    Text = s.EmployeeName
                }).ToList();

                ViewBag.Employees = _employees;
            }
            catch (Exception ex)
            {

            }
            return View(customerDTO);
        }

        [HttpPost]
        public JsonResult SaveOrUpdateCustomer(string Name, string PhoneNumber, string Address1, string Address2, string City, string State, string Zip, string EmployeeId, string Custormer_UID)
        {
            CustomerBLL customerBLL = new CustomerBLL();
            Response _response = new Response();
            try
            {
                CustomerDTO customerDTO = new CustomerDTO();
                customerDTO.Name = Name;
                customerDTO.PhoneNumber = PhoneNumber;
                customerDTO.Address1 = Address1;
                customerDTO.Address2 = Address2;
                customerDTO.City = City;
                customerDTO.State = State;
                customerDTO.Zip = Zip;
                customerDTO.EmployeeID = Convert.ToInt32(EmployeeId);
                customerDTO.CustormerUID = Custormer_UID;

                _response = customerBLL.AddOrEditCustomer(customerDTO);
            }
            catch (Exception)
            {

            }
            return Json(_response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult VaidatePhoneNumber(string PhoneNumber, string CustomerID)
        {
            CustomerBLL customerBLL = new CustomerBLL();
            Response _response = new Response();

            try
            {
                _response = customerBLL.ValidatePhoneNumber(PhoneNumber, CustomerID);
            }
            catch (Exception)
            {

            }
            return Json(_response, JsonRequestBehavior.AllowGet);
        }
    }
}