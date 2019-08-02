var Bid = Bid;
var GetBuildingInfoDetailsURL = GetBuildingInfoDetailsURL;
var GetCompDetailsURL = GetCompDetailsURL;
var GetContactDetailsURL = GetContactDetailsURL;
var GetVendorDetailsURL = GetVendorDetailsURL;
var ComponenteditURL = ComponenteditURL;
var ContaceditURL = ContaceditURL;
var VendoreditURL = VendoreditURL;
var CompdeleteURL = CompdeleteURL;
var ContdeleteURL = ContdeleteURL;
var SaveorUpdateBuildingInfoUrl = SaveorUpdateBuildingInfoUrl;
var SaveorUpdateVendorsUrl = SaveorUpdateVendorsUrl;
var SaveorUpdateContactsUrl = SaveorUpdateContactsUrl;
var VenddeleteURL = VenddeleteURL;
var apiUrl = apiUrl;
var SaveorUpdateComponentUrl = SaveorUpdateComponentUrl;
var filter = filter;
$(document).ready(function () {
     

    $.validator.methods.smartCaptcha = function (value, element, param) {
        return value == param;
    };


    $("#Buildinginfo").validate({
        
        errorClass: "has-error",
        validClass: "state-success",
        errorElement: "em",

        rules: {
            BuildingName: {
                required: true
            },
            Address: {
                required: true,
            },
            City: {
                required: true,
            },
            State: {
                required: true
            },
            ZipCode: {
                required: true,
            },
            ContactName: {
                required: true
            },
            PhoneNumber: {
                required: true,
                validatePhone: true
            },

            Email: {
                required: true,
                ValidateEmail: true
            }

        },

        messages: {
            BuildingName: {
                required: 'Enter Full BuildingName'
            },
            Address: {
                required: 'Enter Address',
            },
            City: {
                required: 'Enter City',
            },
            State: {
                required: 'Enter State'
            },
            ZipCode: {
                required: 'Enter Zip Code'
            },
            ContactName: {
                required: 'Enter Contact Name'
            },
            PhoneNumber: {
                required: 'Enter Phone Number'
            },
            Email: {
                required: 'Enter Email',
                ValidateEmail: 'Enter a valid email'
            }
            

        },

        highlight: function (element, errorClass, validClass) {
            
            $(element).addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
          
            $(element).removeClass(errorClass).addClass(validClass);
        },
        errorPlacement: function (error, element) {
             
            if (element.is(":radio") || element.is(":checkbox")) {
                element.closest('.option-group').after(error);
            } else {
                error.insertAfter(element.parent());
            }
        },
        submitHandler: function (form) {
           
            var BIdata = {
                BuildingName: $.trim($("#txtBuildingName").val()),
                Address: $.trim($("#txtBuildingAddress").val()),
                City: $.trim($("#txtBuildingCity").val()),
                State: $.trim($("#txtBuildingState").val()),
                ZipCode: $.trim($("#txtBuildingZipCode").val()),
                BuildContactName: $.trim($("#txtBuildingContactName").val()),
                PhoneNumber: $.trim($("#txtBuildingPhoneNumber").val()),
                Email: $.trim($("#txtBuildingEmail").val()),
                BID: Bid
            };
            saveOrupdateBuildingInfo(BIdata);
        }

    });
  
    $('#txtBuildingZipCode,#txtYearInstallament').keyup(function () {
        
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }
    });
        $(".tab2").addClass("disabled")
        $(".tab3").addClass("disabled")
        $(".tab4").addClass("disabled")  
        if (Bid != '')
        {
            debugger;
            //$(".loadingmodal").show();
            $(".tab2").removeClass("disabled")
            $(".tab3").removeClass("disabled")
            $(".tab4").removeClass("disabled")
            $.ajax({
                type: "POST",
                url: GetBuildingInfoDetailsURL,
                data: JSON.stringify({ "BuildingId": Bid }),
                contentType: "application/json;",
                dataType: "json",
                success: function (result) {
                    if (result) {
                        $("#txtBuildingName").val(result.BuildingName);
                        $("#txtBuildingAddress").val(result.Address);
                        $("#txtBuildingCity").val(result.City);
                        $("#txtBuildingState").val(result.State);
                        $('#txtBuildingZipCode').val(result.ZipCode);
                        $('#txtBuildingContactName').val(result.BuildContactName);
                        $('#txtBuildingPhoneNumber').val(result.PhoneNumber);
                        $("#txtBuildingEmail").val(result.Email);
                        $("#btnsave").html("Update");

                      //  $(".loadingmodal").hide();
                    }
                    else {
                        // ShowErrorMessage("Something went wrong...");
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    // ShowErrorMessage("Something went wrong...");
                }

            });
        }

        $('#tab2').click(function (event) {

        //    $(".loadingmodal").show();
            if ($(this).hasClass('disabled')) {
                return false;
            }
            else {
                $.ajax({
                    type: "POST",
                    url: GetCompDetailsURL,
                    data: JSON.stringify({ "BuildingId": Bid }),
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (result) {
                        if (result) {
                             
                            BindCompDataTable(result);

                           // $(".loadingmodal").hide();
                        }
                        else {
                            // ShowErrorMessage("Something went wrong...");
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        // ShowErrorMessage("Something went wrong...");
                    }
                });
            }
        });
        $('#tab3').click(function (event) {

          //  $(".loadingmodal").show();
            if ($(this).hasClass('disabled')) {
                return false;
            }
            else {
                    $.ajax({
                    type: "POST",
                    url: GetContactDetailsURL,
                    data: JSON.stringify({ "BuildingId": Bid }),
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (result) {
                        if (result) {

                            BindContactDataTable(result);

                           // $(".loadingmodal").hide();
                        }
                        else {
                            // ShowErrorMessage("Something went wrong...");
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        // ShowErrorMessage("Something went wrong...");
                    }
                });
            }
        });
        $('#tab4').click(function (event) {

         //   $(".loadingmodal").show();
            if ($(this).hasClass('disabled')) {
                return false;
            }
            else {
                  $.ajax({
                    type: "POST",
                    url: GetVendorDetailsURL,
                    data: JSON.stringify({ "BuildingId": Bid }),
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (result) {
                        if (result) {

                            BindVendorDataTable(result);

                          //  $(".loadingmodal").hide();
                        }
                        else {
                            // ShowErrorMessage("Something went wrong...");
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        // ShowErrorMessage("Something went wrong...");
                    }
                });
            }
        });

     
        $('.form-control').keyup(function () {
            $(this).closest(".form-group").find(".errbl").removeClass("has-error");
            $(this).closest(".errortxt").removeClass("has-error");
        });

    });
 ;
$(document).on("click", ".compoedit", function () {
 var Cid = this.id;
    if (Cid != '') {
        $.ajax({
            type: "POST",
            url: ComponenteditURL,
            data: JSON.stringify({ "CId": Cid }),
            contentType: "application/json;",
            dataType: "json",
            success: function (result) {
                if (result) {
                    $("#txtCompType").val(result.ComponentType);
                    $("#txtManufacture").val(result.Manufacturer);
                    $("#txtCompmodel").val(result.Model);
                    $("#txtYearInstallament").val(result.InstallationYear);
                    $('#txtComplocation').val(result.Location);
                    $('#hdnCompid').val(result.CID);
                    $("#btnCmpSave").html("Update");
                }
                else {
                    // ShowErrorMessage("Something went wrong...");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // ShowErrorMessage("Something went wrong...");
            }

        });
    }
});
$(document).on("click", ".Contactedit", function () {
    var Contactid = this.id;
    if (Contactid != '') {
        $.ajax({
            type: "POST",
            url: ContaceditURL,
            data: JSON.stringify({ "ContactId": Contactid }),
            contentType: "application/json;",
            dataType: "json",
            success: function (result) {
                if (result) {
                    $("#txtContName").val(result.ContactName);
                    $("#txtContRole").val(result.Role);
                    $("#txtContVender").val(result.Vendor);
                    $("#txtContPhone").val(result.ContactPhone);
                    $('#txtContEmail').val(result.ContactEmail);
                    $('#txtContNotes').val(result.ContactNotes);
                    $('#hdnContid').val(result.ContactID);
                    $("#btnContSave").html("Update");
                }
                else {
                    // ShowErrorMessage("Something went wrong...");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // ShowErrorMessage("Something went wrong...");
            }

        });
    }
});
$(document).on("click", ".Vendoredit", function () {
    var vid = this.id;
    if (vid != '') {
        $.ajax({
            type: "POST",
            url: VendoreditURL,
            data: JSON.stringify({ "vendorId": vid }),
            contentType: "application/json;",
            dataType: "json",
            success: function (result) {
                if (result) {
                    $("#txtVendorname").val(result.VendorName);
                    $("#txtVendorAddress").val(result.VendorAddress);
                    $("#txtVendorType").val(result.VendorType);
                    $("#txtVendorPhone").val(result.VendorPhone);
                    $('#txtVendorEmail').val(result.VendorEmail);
                    $('#txtVendorNotes').val(result.VendorNotes);
                    $('#hdnvendid').val(result.VendorID);
                    $("#btnVendorSave").html("Update");
                }
                else {
                    // ShowErrorMessage("Something went wrong...");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                // ShowErrorMessage("Something went wrong...");
            }

        });
    }
});
$(document).on("click", ".componetDelete", function () {
    var ComponentId = this.id;
    
    if (ComponentId !="") {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Component!",
            type: "warning",
            showCancelButton: true,
            //confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {

              //  $(".loadingmodal").show();
    $.ajax({
        type: "POST",
        url: CompdeleteURL,
        data: JSON.stringify({ "ComponentId": ComponentId }),
        contentType: "application/json;",
        success: function (result) {
         //   $(".loadingmodal").hide();
            ShowSuccessMessage("Component " + result + " successfully.");

            
            $("#tab2").trigger('click');
        },
        error: function (xhr, result, error) {
            // ShowErrorMessage("Something went wrong...");
        }

    });
        }
    });
    }
});
$(document).on("click", ".Contactdelete", function () {
    var ContId = this.id;
     
    if (ContId != "") {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Contact!",
            type: "warning",
            showCancelButton: true,
            //confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {

              //  $(".loadingmodal").show();
    $.ajax({
        type: "POST",
        url: ContdeleteURL,
        data: JSON.stringify({ "ContId": ContId }),
        contentType: "application/json;",
        success: function (result) {
           // $(".loadingmodal").hide();
            ShowSuccessMessage("Contact " + result + " successfully.");

           
            $("#tab3").trigger('click');
        },
        error: function (xhr, result, error) {
            // ShowErrorMessage("Something went wrong...");
        }

    });
        }
    });
    }
});
$(document).on("click", ".VendorDelete", function () {
    var VendorId = this.id;
   
    if (VendorId != "") {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Vendor!",
            type: "warning",
            showCancelButton: true,
            //confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
 // $(".loadingmodal").show();
    $.ajax({
        type: "POST",
        url: VenddeleteURL,
        data: JSON.stringify({ "VendorId": VendorId }),
        contentType: "application/json;",
        success: function (result) {
            $("#tab4").trigger('click');

     //       $(".loadingmodal").hide();
             ShowSuccessMessage("Vendor " + result + " successfully.");


        },
        error: function (xhr, result, error) {
            // ShowErrorMessage("Something went wrong...");
        }

    });
        }
    });
    }
});
 
    

   
 
$(document).on("click", "#btnCmpSave", function () {
   
    if (validateFormComponents()) {
        var data = {
            ComponentType: $.trim($("#txtCompType").val()),
            Manufacturer: $.trim($("#txtManufacture").val()),
            Model: $.trim($("#txtCompmodel").val()),
            InstallationYear: $.trim($("#txtYearInstallament").val()),
            Location: $.trim($("#txtComplocation").val()),
            BID: Bid,
            CID: $.trim($("#hdnCompid").val()),
        };
        saveOrupdateComponents(data);
    }
});
$(document).on("click", "#btnContSave", function () {
   
    if (validateFormContacts()) {
        var data = {
            ContactName: $.trim($("#txtContName").val()),
            Role: $.trim($("#txtContRole").val()),
            Vendor: $.trim($("#txtContVender").val()),
            ContactPhone: $.trim($("#txtContPhone").val()),
            ContactEmail: $.trim($("#txtContEmail").val()),
            ContactNotes: $.trim($("#txtContNotes").val()),
            BID: Bid,
            ContactID: $.trim($("#hdnContid").val()),
        };
        saveOrupdateContacts(data);
    }
});
$(document).on("click", "#btnVendorSave", function () {
    
    if (validateFormVendors()) {
        var data = {
            VendorName: $.trim($("#txtVendorname").val()),
            VendorAddress: $.trim($("#txtVendorAddress").val()),
            VendorType: $.trim($("#txtVendorType").val()),
            VendorPhone: $.trim($("#txtVendorPhone").val()),
            VendorEmail: $.trim($("#txtVendorEmail").val()),
            VendorNotes: $.trim($("#txtVendorNotes").val()),
            BID: Bid,
            VendorID: $.trim($("#hdnvendid").val()),
        };
        saveOrupdateVendors(data);
    }
});
$(document).on("click", "#btnCancel", function () {
    $("#btnsave").html("Save");
    cancelbuildinginfo();
});
$(document).on("click", "#btnCmpCancel", function () {
    $("#btnCmpSave").html("Save");
    cancelComponents();
});
$(document).on("click", "#btnContCancel", function () {
    $("#btnContSave").html("Save");
    cancelContacts();
});
$(document).on("click", "#btnVendorCancel", function () {
    $("#btnVendorSave").html("Save");
    cancelVendors();
});

function BindCompDataTable(DBdata) {
    if ($.fn.DataTable.isDataTable('#TblComponents')) {
        $('#TblComponents').DataTable().destroy();
    }
    $("#TblComponents").DataTable({
        data: DBdata,
        "columns": [
                    { "data": "ComponentType", "autowidth": true },
                    { "data": "Manufacturer", "autowidth": true },
                    { "data": "Model", "autowidth": true },
                    { "data": "InstallationYear", "autowidth": true },
                    { "data": "Location", "autowidth": true },
                      {// this is Actions Column
                          mRender: function (data, type, row) {
                              var linkEdit = '<div class="action-buttons"> <a  title="Edit" id="' + row.CID + '" class="compoedit"><i class="fa fa-edit blue-color fa-2x"></i></a> <a class="componetDelete" title="Delete" id="' + row.CID + '"><i class="fa fa-trash-o text-danger fa-2x"></i></a></div>';
                              return linkEdit;
                          }, "sorting": false
                      }
        ]
    });
    $(".dataTables_length").hide();
    $(".dataTables_filter").hide();

}
function BindContactDataTable(DBdata) {
    if ($.fn.DataTable.isDataTable('#TblContacts')) {
        $('#TblContacts').DataTable().destroy();
    }
    $("#TblContacts").DataTable({
        data: DBdata,
        "columns": [
                    { "data": "ContactName", "autowidth": true },
                    { "data": "Role", "autowidth": true },
                    { "data": "Vendor", "autowidth": true },
                    { "data": "ContactPhone", "autowidth": true },
                    { "data": "ContactEmail", "autowidth": true },
                      { "data": "ContactNotes", "autowidth": true },
                        {// this is Actions Column
                            mRender: function (data, type, row) {
                                var linkEdit = '<div class="action-buttons"> <a title="Edit" class="Contactedit"  id="' + row.ContactID + '"><i class="fa fa-edit blue-color fa-2x"></i></a> <a class="Contactdelete" title="Delete" id="' + row.ContactID + '"><i class="fa fa-trash-o text-danger fa-2x"></i></a></div>';
                                return linkEdit;
                            }, "sorting": false
                        }
        ]
    });
    $(".dataTables_length").hide();
    $(".dataTables_filter").hide();
}
function BindVendorDataTable(DBdata) {
    if ($.fn.DataTable.isDataTable('#TblVendors')) {
        $('#TblVendors').DataTable().destroy();
    }
    $("#TblVendors").DataTable({
        data: DBdata,
        "columns": [
                    { "data": "VendorName", "autowidth": true },
                    { "data": "VendorAddress", "autowidth": true },
                    { "data": "VendorType", "autowidth": true },
                    { "data": "VendorPhone", "autowidth": true },
                    { "data": "VendorEmail", "autowidth": true },
                      { "data": "VendorNotes", "autowidth": true },
                        {// this is Actions Column
                            mRender: function (data, type, row) {
                                var linkEdit = '<div class="action-buttons"> <a  title="Edit" class="Vendoredit" id="' + row.VendorID + '"><i class="fa fa-edit blue-color fa-2x"></i></a> <a class="VendorDelete" title="Delete" id="' + row.VendorID + '"><i class="fa fa-trash-o text-danger fa-2x"></i></a></div>';
                                return linkEdit;
                            }, "sorting": false
                        },
        ]
    });
    $(".dataTables_length").hide();
    $(".dataTables_filter").hide();
}
function cancelbuildinginfo() {
    $("#txtBuildingName").val('');
    $("#txtBuildingAddress").val(''),
    $("#txtBuildingCity").val('');
    $("#txtBuildingState").val('');
    $("#txtBuildingZipCode").val('');
    $("#txtBuildingContactName").val('');
    $("#txtBuildingPhoneNumber").val('');
    $("#txtBuildingEmail").val('');
}
function cancelComponents() {
    $("#txtCompType").val('');
    $("#txtManufacture").val(''),
    $("#txtCompmodel").val('');
    $("#txtYearInstallament").val('');
    $("#txtComplocation").val('');
    $("#hdnCompid").val('');
}
function cancelContacts() {
    $("#txtContName").val('');
    $("#txtContRole").val(''),
    $("#txtContVender").val('');
    $("#txtContPhone").val('');
    $("#txtContEmail").val('');
    $("#txtContNotes").val('');
    $("#hdnContid").val('');
}
function cancelVendors() {
    $("#txtVendorname").val('');
    $("#txtVendorAddress").val(''),
    $("#txtVendorType").val('');
    $("#txtVendorPhone").val('');
    $("#txtVendorEmail").val('');
    $("#txtVendorNotes").val('');
    $("#hdnvendid").val('');
}
function saveOrupdateBuildingInfo(data) {

  //  $(".loadingmodal").show();
    $.ajax({
        type: "POST",
        url: SaveorUpdateBuildingInfoUrl,
        data: JSON.stringify(data),
        contentType: "application/json;",
        dataType: "json",
        success: function (result) {
         
            if (result != "Updated") {
              
                $("#hdnbid").val(result);
             
               
               
             //   $(".loadingmodal").hide();
                ShowSaveSuccessMessage("Building Information saved  successfully.", result)
                //ShowSuccessMessage("Building Information saved  successfully.");
             //   window.location.href = apiUrl + "Admin/BuildingSetup/Create?id=" + result + "";

            }

            else {
                
                $("#hdnbid").val(result);
               
                ShowSuccessMessage("Building Information updated  successfully.");
            }

        },
        error: function (ex) {

            //ShowErrorMessage("Something went wrong...");

        }

    });

}
function saveOrupdateComponents(data) {
  //  $(".loadingmodal").show();
    $.ajax({
        type: "POST",
        url: SaveorUpdateComponentUrl,
        data: JSON.stringify(data),
        contentType: "application/json;",
        dataType: "json",
        success: function (result) {
            if (result == "Saved") {
                
                $("#btnCmpSave").html("Save");
                cancelComponents();
            //    $(".loadingmodal").hide();
                $("#tab2").trigger('click');
                ShowSuccessMessage("Building Component Details " + result + " successfully.");
            }

            else {

                $("#btnCmpSave").html("Save");
                cancelComponents();
                $("#tab2").trigger('click');
                ShowSuccessMessage("Building Component Details " + result + " successfully.");
            }

        },
        error: function (ex) {

            //ShowErrorMessage("Something went wrong...");

        }

    });

}
function saveOrupdateContacts(data) {
 //   $(".loadingmodal").show();
    $.ajax({
        type: "POST",
        url: SaveorUpdateContactsUrl,
        data: JSON.stringify(data),
        contentType: "application/json;",
        dataType: "json",
        success: function (result) {
            if (result == "Saved") {
                $("#btnContSave").html("Save");
                cancelContacts();
          //      $(".loadingmodal").hide();
                $("#tab3").trigger('click');
                ShowSuccessMessage("Building Contact Details " + result + " successfully.");
            }

            else {
                $("#btnContSave").html("Save");
                cancelContacts();
                $("#tab3").trigger('click');
                ShowSuccessMessage("Building Contact Details " + result + " successfully.");
            }

        },
        error: function (ex) {

            // ShowErrorMessage("Something went wrong...");

        }

    });

}
function saveOrupdateVendors(data) {
  //  $(".loadingmodal").show();
    $.ajax({
        type: "POST",
        url: SaveorUpdateVendorsUrl,
        data: JSON.stringify(data),
        contentType: "application/json;",
        dataType: "json",
        success: function (result) {
            if (result == "Saved") {
                cancelVendors();
              //  $(".loadingmodal").hide();
                $("#btnVendorSave").html("Save");
                $("#tab4").trigger('click');
            
                ShowSuccessMessage("Building Vendor Details " + result + " successfully.");
            }

            else {
                cancelVendors();

                $("#btnVendorSave").html("Save");
                $("#tab4").trigger('click');
                ShowSuccessMessage("Building Vendor Details" + result + " successfully.");
            }

        },
        error: function (ex) {

            // ShowErrorMessage("Something went wrong...");

        }

    });

}
function validateFormbasicinfo() {

    var status = true;

    if ($.trim($("#txtBuildingName").val()) == "") {
        $(".txtBuildingName").addClass("has-error");
        status = false;
    }
    else {
        $(".txtBuildingName").removeClass("has-error");
    }
    if ($.trim($("#txtBuildingAddress").val()) == "") {
        $(".txtBuildingAddress").addClass("has-error");
        status = false;
    }
    else {
        $(".txtBuildingAddress").removeClass("has-error");
    }

    if ($.trim($("#txtBuildingCity").val()) == "") {
        $(".txtBuildingCity").addClass("has-error");
        status = false;
    }
    else {
        $(".txtBuildingCity").removeClass("has-error");
    }
    if ($.trim($("#txtBuildingState").val()) == "") {
        $(".txtBuildingState").addClass("has-error");
        status = false;
    }
    else {
        $(".txtBuildingState").removeClass("has-error");

    }
    if ($.trim($("#txtBuildingZipCode").val()) == "") {
        $(".txtBuildingZipCode").addClass("has-error");
        status = false;
    }
    else {
        $(".txtBuildingZipCode").removeClass("has-error");
    }
    if ($.trim($("#txtBuildingContactName").val()) == "") {
        $(".txtBuildingContactName").addClass("has-error");
        status = false;
    }
    else {
        $(".txtBuildingContactName").removeClass("has-error");
    }
    if ($.trim($("#txtBuildingPhoneNumber").val()) == "") {
        $(".txtBuildingPhoneNumber").addClass("has-error");
        status = false;
    }
    else {
        if (validatePhone($.trim($("#txtBuildingPhoneNumber").val()))) {

            $('#txtBuildingPhoneNumber').removeClass("has-error");

        }
        else {
            $('#txtBuildingPhoneNumber').addClass("has-error");
            status = false;
        }
    }
    if ($.trim($("#txtBuildingEmail").val()) == "") {
        $(".txtBuildingEmail").addClass("has-error");
        
        status = false;
    }
    else {
        if (validateEmail($.trim($("#txtBuildingEmail").val()))) {

            $('#txtBuildingEmail').removeClass("has-error");

        }
        else {
            $('#txtBuildingEmail').addClass("has-error");
            status = false;
        }
        
    }

    return status;
}
function validateFormComponents() {

    var status = true;

    if ($.trim($("#txtCompType").val()) == "") {
        $(".txtCompType").addClass("has-error");
        status = false;
    }
    else {
        $(".txtCompType").removeClass("has-error");
    }
    if ($.trim($("#txtManufacture").val()) == "") {
        $(".txtManufacture").addClass("has-error");
        status = false;
    }
    else {
        $(".txtManufacture").removeClass("has-error");
    }

    if ($.trim($("#txtCompmodel").val()) == "") {
        $(".txtCompmodel").addClass("has-error");
        status = false;
    }
    else {
        $(".txtCompmodel").removeClass("has-error");
    }
    if ($.trim($("#txtYearInstallament").val()) == "") {
        $(".txtYearInstallament").addClass("has-error");
        status = false;
    }
    else {
        $(".txtYearInstallament").removeClass("has-error");

    }
    if ($.trim($("#txtComplocation").val()) == "") {
        $(".txtComplocation").addClass("has-error");
        status = false;
    }
    else {
        $(".txtComplocation").removeClass("has-error");
    }


    return status;
}
function validateFormContacts() {

    var status = true;

    if ($.trim($("#txtContName").val()) == "") {
        $(".txtContName").addClass("has-error");
        status = false;
    }
    else {
        $(".txtContName").removeClass("has-error");
    }
    if ($.trim($("#txtContRole").val()) == "") {
        $(".txtContRole").addClass("has-error");
        status = false;
    }
    else {
        $(".txtContRole").removeClass("has-error");
    }

    if ($.trim($("#txtContVender").val()) == "") {
        $(".txtContVender").addClass("has-error");
        status = false;
    }
    else {
        $(".txtContVender").removeClass("has-error");
    }
    if ($.trim($("#txtContPhone").val()) == "") {
        $(".txtContPhone").addClass("has-error");
        status = false;
    }
    else {
        if (validatePhone($.trim($("#txtContPhone").val()))) {

            $('#txtContPhone').removeClass("has-error");

        }
        else {
            $('#txtContPhone').addClass("has-error");
            status = false;
        }

    }
    if ($.trim($("#txtContEmail").val()) == "") {
        $(".txtContEmail").addClass("has-error");
        status = false;
    }
    else {
        if (validateEmail($.trim($("#txtContEmail").val()))) {

            $('#txtContEmail').removeClass("has-error");

        }
        else {
            $('#txtContEmail').addClass("has-error");
            status = false;
        }
    }

    if ($.trim($("#txtContNotes").val()) == "") {
        $(".txtContNotes").addClass("has-error");
        status = false;
    }
    else {
        $(".txtContNotes").removeClass("has-error");
    }

    return status;
}
function validateFormVendors() {

    var status = true;

    if ($.trim($("#txtVendorname").val()) == "") {
        $(".txtVendorname").addClass("has-error");
        status = false;
    }
    else {
        $(".txtVendorname").removeClass("has-error");
    }
    if ($.trim($("#txtVendorAddress").val()) == "") {
        $(".txtVendorAddress").addClass("has-error");
        status = false;
    }
    else {
        $(".txtVendorAddress").removeClass("has-error");
    }

    if ($.trim($("#txtVendorType").val()) == "") {
        $(".txtVendorType").addClass("has-error");
        status = false;
    }
    else {
        $(".txtVendorType").removeClass("has-error");
    }
    if ($.trim($("#txtVendorPhone").val()) == "") {
        $(".txtVendorPhone").addClass("has-error");
        status = false;
    }
    else {
        if (validatePhone($.trim($("#txtVendorPhone").val()))) {

            $('#txtVendorPhone').removeClass("has-error");

        }
        else {
            $('#txtVendorPhone').addClass("has-error");
            status = false;
        }

    }
    if ($.trim($("#txtVendorEmail").val()) == "") {
        $(".txtVendorEmail").addClass("has-error");
        status = false;
    }
    else {
        if (validateEmail($.trim($("#txtVendorEmail").val()))) {

            $('#txtVendorEmail').removeClass("has-error");

        }
        else {
            $('#txtVendorEmail').addClass("has-error");
            status = false;
        }
    }

    if ($.trim($("#txtVendorNotes").val()) == "") {
        $(".txtVendorNotes").addClass("has-error");
        status = false;
    }
    else {
        $(".txtVendorNotes").removeClass("has-error");
    }

    return status;
}

function ShowSuccessMessage(message) {
    swal({
        title: "",
        text: message,
        type: "success"
    });
}
function ShowSaveSuccessMessage(message,result) {
    swal({
        title: "",
        text: message,
        type: "success"
    }, function () {
        window.location.href = apiUrl + "BuildingSetup/Create?id=" + result + "";
       // var url = "/Announcements/Announcements/List";
       // window.location.href = url
    });
}
 
function validateEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function validatePhone(txtPhone) {
    var a = txtPhone;
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9 -+]{2,3}\)[ \-]*)|([0-9 -+]{2,4})[ \-]*)*?[0-9 -+]{3,4}?[ \-]*[0-9 -+]{3,4}?$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}
 