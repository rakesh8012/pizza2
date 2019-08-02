using Pizza.Models.DATA;
using Pizza.Utility;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Pizza.DAL
{
    public class LoginDAL
    {
        public Response ValidateLogin(string PhoneNumber)
        {

            PizzaEntities _entities = new PizzaEntities();

            Response _response = new Response();

            _response.Status = false;

            _response.Message = "Invalid username or password!";
            try
            {
                if (!(string.IsNullOrEmpty(PhoneNumber)))
                {

                    var UserData = _entities.Customers.Where(wde => wde.PhoneNumber == PhoneNumber).FirstOrDefault();

                    if (UserData != null)
                    {
                        _response.Status = true;
                        _response.Message = "Login successfully!";
                        _response.Data = UserData.Name;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _response;
        }
    }
}