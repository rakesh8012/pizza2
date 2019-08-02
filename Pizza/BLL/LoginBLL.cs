using Pizza.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Pizza.Utility;

namespace Pizza.BLL
{
    public class LoginBLL
    {
        public Response ValidateLogin(string PhoneNumber)
        {
            Response _response = new Response();

            LoginDAL _loginDAL = new LoginDAL();

            try
            {
                _response = _loginDAL.ValidateLogin(PhoneNumber);

            }
            catch (Exception ex)
            {
                throw ex;
            }

            return _response;
        }
    }
}