using Pizza.DTO;
using Pizza.Models.DATA;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Dynamic;
using Pizza.Utility;

namespace Pizza.DAL
{
    public class CustomerDAL
    {
        public CustomerDTO GetCustomers(int start, int length, string searchValue, string sortColumnName, string sortDirection)
        {
            PizzaEntities _entities = new PizzaEntities();

            CustomerDTO _userListData = new CustomerDTO();

            try
            {

                var data = _entities.Customers.Where(wde => wde.Name != null);

                Common _common = new Common();

                _userListData.TotalRows = data.Select(s => s.Custormer_UID).Count();

                // filtering
                if (!string.IsNullOrEmpty(searchValue))
                {

                    data = data.Where(x => x.Name.ToLower().Contains(searchValue.ToLower()));
                }

                _userListData.TotalRowsAfterFiltering = data.Count();

                //sorting
                data = data.OrderBy(sortColumnName + " " + sortDirection);

                //paging
                _userListData.CustomerListData = data.Skip(start).Take(length).ToList().Select(s => new CustomerDTO
                {
                    Custormer_UID = s.Custormer_UID,
                    CustormerUID = _common.Encrypt(Convert.ToString(s.Custormer_UID)),
                    Name = s.Name,
                    PhoneNumber = s.PhoneNumber,
                    Address1 = s.Address1,
                    Address2 = s.Address2,
                    City = s.City,
                    State = s.State,
                    Zip = s.Zip,
                    EmployeeID = s.EmployeeID,
                    EmployeeName = _entities.Employees.Where(wde => wde.Employee_UID == s.EmployeeID).Select(s1 => s1.EmployeeName).FirstOrDefault()
                }).ToList();


            }
            catch (Exception ex)
            {
                throw ex;
            }
            return _userListData;
        }

        public CustomerDTO AddOrEditCustomer(string id)
        {
            PizzaEntities _entities = new PizzaEntities();
            Common _common = new Common();
            CustomerDTO customer = new CustomerDTO();

            try
            {
                int CustomerID = Convert.ToInt32(_common.Decrypt(id));

                customer = _entities.Customers.Where(wde => wde.Custormer_UID == CustomerID).Select(s => new CustomerDTO()
                {
                    CustormerUID = id,
                    Custormer_UID=s.Custormer_UID,
                    Name = s.Name,
                    PhoneNumber = s.PhoneNumber,
                    Address1 = s.Address1,
                    Address2 = s.Address2,
                    State = s.State,
                    City = s.City,
                    Zip = s.Zip,
                    EmployeeID = s.EmployeeID

                }).FirstOrDefault();

            }
            catch (Exception)
            {

            }
            return customer;
        }

        public Response AddOrEditCustomer(CustomerDTO customerDTO)
        {
            PizzaEntities _entities = new PizzaEntities();
            Common _common = new Common();

            Response _response = new Response();
            _response.Status = false;

            if (!string.IsNullOrEmpty(customerDTO.CustormerUID))
            {
                _response.Message = "Customer information updation failed";
            }
            else
            {
                _response.Message = "Customer information creation failed.";
            }

            try
            {
                if (!string.IsNullOrEmpty(customerDTO.CustormerUID))
                {
                    customerDTO.Custormer_UID = Convert.ToInt32(_common.Decrypt(customerDTO.CustormerUID));

                }

                var CustomerData = _entities.Customers.Where(wde => wde.Custormer_UID == customerDTO.Custormer_UID).FirstOrDefault();

                if (CustomerData != null)
                {
                    CustomerData.PhoneNumber = customerDTO.PhoneNumber;
                    CustomerData.Address1 = customerDTO.Address1;
                    CustomerData.Address2 = customerDTO.Address2;
                    CustomerData.City = customerDTO.City;
                    CustomerData.State = customerDTO.State;
                    CustomerData.Zip = customerDTO.Zip;
                    CustomerData.EmployeeID = customerDTO.EmployeeID;
                    _entities.SaveChanges();
                    _response.Status = true;
                    _response.Message = "Customer information Updated Successfully.";
                }
                else
                {
                    CustomerData = new Customer();
                    CustomerData.Name = customerDTO.Name;
                    CustomerData.PhoneNumber = customerDTO.PhoneNumber;
                    CustomerData.Address1 = customerDTO.Address1;
                    CustomerData.Address2 = customerDTO.Address2;
                    CustomerData.City = customerDTO.City;
                    CustomerData.State = customerDTO.State;
                    CustomerData.Zip = customerDTO.Zip;
                    CustomerData.EmployeeID = customerDTO.EmployeeID;
                    CustomerData.OriginalAddDate = DateTime.Now;
                    _entities.AddToCustomers(CustomerData);
                    _entities.SaveChanges();
                    _response.Status = true;
                    _response.Message = "Customer information created Successfully.";
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            return _response;
        }

        public Response ValidatePhoneNumber(string PhoneNumber, string CustomerID)
        {
            PizzaEntities _entities = new PizzaEntities();
            Common _common = new Common();
            Response _response = new Response();
            _response.Status = false;
            try
            {
                if (!string.IsNullOrEmpty(CustomerID))
                {
                    int CustomerId = Convert.ToInt32(_common.Decrypt(CustomerID));

                    var UserData = _entities.Customers.Where(w => w.Custormer_UID != CustomerId).AsEnumerable().Where(w => w.PhoneNumber == PhoneNumber).FirstOrDefault();

                    if (UserData != null)
                    {
                        _response.Status = false;
                        _response.Message = "Username shold be unique!";
                    }
                    else
                    {
                        _response.Status = true;
                    }
                }
                else
                {
                    var UserData = _entities.Customers.AsEnumerable().Where(w => w.PhoneNumber == PhoneNumber).FirstOrDefault();

                    if (UserData != null)
                    {
                        _response.Status = false;
                        _response.Message = "Username shold be unique!";
                    }
                    else
                    {
                        _response.Status = true;
                    }
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            return _response;
        }
    }
}