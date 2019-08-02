using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pizza.DTO
{
    public class CustomerDTO
    {

        public int Custormer_UID { get; set; }
        public string CustormerUID { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { set; get; }
        public string Address1 { set; get; }
        public string Address2 { set; get; }
        public string City { set; get; }
        public string State { set; get; }
        public string Zip { set; get; }
        public int EmployeeID { set; get; }

        public string EmployeeId { set; get; }
        public string EmployeeName { set; get; }

        public List<CustomerDTO> CustomerListData { get; set; }

        public int TotalRows { get; set; }

        public int TotalRowsAfterFiltering { get; set; }
    }
}