using Pizza.DTO;
using Pizza.Models.DATA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Dynamic;
using Pizza.DAL;
using Pizza.Utility;

namespace Pizza.BLL
{
    public class CustomerBLL
    {

        public CustomerDTO GetUsers(int start, int length, string searchValue, string sortColumnName, string sortDirection)
        {
            CustomerDTO _userListData = new CustomerDTO();

            CustomerDAL _userDAL = new CustomerDAL();

            try
            {
                _userListData = _userDAL.GetCustomers(start, length, searchValue, sortColumnName, sortDirection);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _userListData;
        }


        public CustomerDTO AddOrEditCustomer(string id)
        {
            CustomerDTO customer = new CustomerDTO();
            CustomerDAL customerDAL = new CustomerDAL();

            try
            {

                customer = customerDAL.AddOrEditCustomer(id);
            }
            catch (Exception)
            {

            }
            return customer;
        }

        public Response AddOrEditCustomer(CustomerDTO customerDTO)
        {

            Response _response = new Response();
            CustomerDAL customerDAL = new CustomerDAL();

            try
            {
                _response = customerDAL.AddOrEditCustomer(customerDTO);
            }
            catch (Exception ex)
            {
                throw;
            }
            return _response;
        }

        public Response ValidatePhoneNumber(string PhoneNumber, string CustomerID)
        {
            Response _response = new Response();

            CustomerDAL customerDAL = new CustomerDAL();
            try
            {
                _response = customerDAL.ValidatePhoneNumber(PhoneNumber, CustomerID);
            }
            catch (Exception ex)
            {

                throw;
            }
            return _response;
        }
    }
}