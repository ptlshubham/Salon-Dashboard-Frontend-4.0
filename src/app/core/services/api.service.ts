import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public static HOST_URL: string = "http://localhost:8100";
  // public static HOST_URL: string = "http://85.31.232.128:8100";

  constructor() { }
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public static getUserLoginURL: string = ApiService.HOST_URL + '/authenticate/GetUsersLogin';
  public static updateLogoutDetailsURL: string = ApiService.HOST_URL + '/admin/UpdateLogoutDetails'
  public static saveServicesListURL: string = ApiService.HOST_URL + '/admin/SaveServicesList';
  public static getAllServicesURL: string = ApiService.HOST_URL + '/admin/GetAllServices';
  public static updateServicesListURL: string = ApiService.HOST_URL + '/admin/UpdateServicesList/';
  public static saveEmployeeListURL: string = ApiService.HOST_URL + '/admin/SaveEmployeeList';
  public static getAllEmployeeURL: string = ApiService.HOST_URL + '/admin/GetAllEmployee';
  public static getOnlyIdealEmployeeList: string = ApiService.HOST_URL + '/admin/GetOnlyIdealEmployeeList';
  public static removeEmployeeListURL: string = ApiService.HOST_URL + '/admin/RemoveEmployeeList/';
  public static saveCustomerListURL: string = ApiService.HOST_URL + '/admin/SaveCustomerList';
  public static saveLoginUserURL: string = ApiService.HOST_URL + '/authenticate/UserLogin';
  public static getAllCustomerURL: string = ApiService.HOST_URL + '/admin/GetAllCustomer';
  public static saveAppointmentListURL: string = ApiService.HOST_URL + '/admin/SaveBookingDetails';
  public static updateAppointementEmployeeDetails: string = ApiService.HOST_URL + '/admin/UpdateAppointementEmployeeDetails';
  public static removeAppointementEmployeeData: string = ApiService.HOST_URL + '/admin/RemoveAppointementEmployeeData';
  public static getAllAppointmentURL: string = ApiService.HOST_URL + '/admin/GetAllAppointment';
  public static getViewAppointmentURL: string = ApiService.HOST_URL + '/admin/GetViewAppointment';
  public static getAllEnquiryListURL: string = ApiService.HOST_URL + '/admin/GetAllAppointment';
  public static getDailyTotalURL: string = ApiService.HOST_URL + '/admin/GetDailyTotal';
  public static getMonthlyTotalURL: string = ApiService.HOST_URL + '/admin/GetMonthlyTotal';
  public static updateCustomerListURL: string = ApiService.HOST_URL + '/admin/UpdateCustomerList';
  public static removeCustomerDetailsURL: string = ApiService.HOST_URL + '/admin/removeCustomerDetails/';
  public static removeServicesListURL: string = ApiService.HOST_URL + '/admin/RemoveServicesList/';
  public static forgotPasswordURL: string = ApiService.HOST_URL + '/admin/ForgotPassword';
  public static getOneTimePasswordURL: string = ApiService.HOST_URL + '/admin/GetOneTimePassword';
  public static updatePasswordURL: string = ApiService.HOST_URL + '/admin/UpdatePassword';
  public static updateActiveStatusURL: string = ApiService.HOST_URL + '/admin/UpdateActiveStatus';
  public static updateEnquiryStatusURL: string = ApiService.HOST_URL + '/admin/UpdateEnquiryStatus';
  public static getCustomerTotalPointsURL: string = ApiService.HOST_URL + '/admin/GetCustomerTotalPoints';
  public static updateEmployeeListURL: string = ApiService.HOST_URL + '/admin/UpdateEmployeeList';
  public static updateWorkingStatusURL: string = ApiService.HOST_URL + '/admin/UpdateWorkingStatus';
  public static getAllCustomerDataListURL: string = ApiService.HOST_URL + '/admin/GetAllCustomerDataList';
  public static getCustomerByIdURL: string = ApiService.HOST_URL + '/admin/GetCustomerById';
  public static getUsedServicesByCustomerURL: string = ApiService.HOST_URL + '/admin/GetUsedServicesByCustomer';
  public static getAllCompletedServicesURL: string = ApiService.HOST_URL + '/admin/GetAllCompletedServices';
  public static saveAdminLoginURL: string = ApiService.HOST_URL + '/admin/login';
  public static ChackForPasswordURL: string = ApiService.HOST_URL + '/admin/ChackForPassword';
  public static saveModeOfPayment: string = ApiService.HOST_URL + '/admin/SaveModeOfPayment';
  public static getAllModeOfPayment: string = ApiService.HOST_URL + '/admin/GetAllModeOfPayment';
  public static getMonthlyPayment: string = ApiService.HOST_URL + '/admin/GetMonthlyPayment';
  public static saveOfferListURL: string = ApiService.HOST_URL + '/admin/SaveOfferList';
  public static getAllOfferDataListURL: string = ApiService.HOST_URL + '/admin/GetAllOfferDataList';
  public static getUsedServicesByOfferURL: string = ApiService.HOST_URL + '/admin/GetUsedServicesByOffer';
  public static getAllOfferURL: string = ApiService.HOST_URL + '/admin/GetAllOffer';
  public static getActiveOfferURL: string = ApiService.HOST_URL + '/admin/GetActiveOffer';
  public static getOfferTotalPointsURL: string = ApiService.HOST_URL + '/admin/GetOfferTotalPoints';
  public static updateOfferListURL: string = ApiService.HOST_URL + '/admin/UpdateOfferList';
  public static removeOfferDetailsURL: string = ApiService.HOST_URL + '/admin/removeOfferDetails/';
  public static saveExpensesListURL: string = ApiService.HOST_URL + '/admin/SaveExpensesList';
  public static getAllExpensesURL: string = ApiService.HOST_URL + '/admin/GetAllExpenses';
  public static removeexpensesDetailsURL: string = ApiService.HOST_URL + '/admin/RemoveExpensesDetails/';
  public static updateExpensesDetailsURL: string = ApiService.HOST_URL + '/admin/UpdateExpensesDetails';
  public static getMonthlyExpensesURL: string = ApiService.HOST_URL + '/admin/getMonthlyExpensesList';
  public static saveProductsListURL: string = ApiService.HOST_URL + '/admin/SaveProductsList';
  public static getAllProductsListURL: string = ApiService.HOST_URL + '/admin/GetAllProductsList';
  public static getActiveProductsURL: string = ApiService.HOST_URL + '/admin/GetActiveProducts';
  public static removeProductDetailsURL: string = ApiService.HOST_URL + '/admin/RemoveProductDetails/';
  public static getAllSalaryListURL: string = ApiService.HOST_URL + '/admin/GetAllSalaryList';
  public static updateSalaryStatusURL: string = ApiService.HOST_URL + '/admin/UpdateSalaryStatus';
  public static updateSalaryListURL: string = ApiService.HOST_URL + '/admin/UpdateSalaryList';
  public static saveSalaryListURL: string = ApiService.HOST_URL + '/admin/SaveSalaryList';
  public static removeSalaryListURL: string = ApiService.HOST_URL + '/admin/RemoveSalaryList/';
  public static saveCategoryListURL: string = ApiService.HOST_URL + '/admin/SaveCategoryList/';
  public static getAllCategoryListURL: string = ApiService.HOST_URL + '/admin/GetAllCategoryList/';
  public static updateCategoryListURL: string = ApiService.HOST_URL + '/admin/UpdateCategoryList/';
  public static removeCategoryDetailsURL: string = ApiService.HOST_URL + '/admin/RemoveCategoryDetails/';
  public static updateProductListURL: string = ApiService.HOST_URL + '/admin/UpdateProductList';
  public static uploadMainImageURL: string = ApiService.HOST_URL + '/admin/UploadProductImage/';
  public static uploadMultiImageURL: string = ApiService.HOST_URL + '/admin/UploadMultiProductImage/';
  public static removeImageURL: string = ApiService.HOST_URL + '/admin/RemoveRecentUoloadImage/';
  public static courosalImageURL: string = ApiService.HOST_URL + '/admin/CourosalImage/';
  public static getCartDataByID: string = ApiService.HOST_URL + '/admin/GetCartDataByID/';
  public static verificationURL: string = ApiService.HOST_URL + '/admin/Verification';
  public static getRegisterOtpURL: string = ApiService.HOST_URL + '/admin/GetRegisterOtp';
  public static saveUserCustomerListURL: string = ApiService.HOST_URL + '/admin/SaveUserCustomerList';
  public static saveOfferPurchaseURL: string = ApiService.HOST_URL + '/admin/saveOfferPurchase';
  public static saveVendorListURL: string = ApiService.HOST_URL + '/admin/SaveVendorList';
  public static getAllVendorURL: string = ApiService.HOST_URL + '/admin/GetAllVendor';
  public static removeVendorListURL: string = ApiService.HOST_URL + '/admin/RemoveVendorList/';
  public static updateVendorListURL: string = ApiService.HOST_URL + '/admin/UpdateVendorList/';
  public static getCustomerDataByIdURL: string = ApiService.HOST_URL + '/admin/GetCustomerDataById/';
  public static saveMembershipListURL: string = ApiService.HOST_URL + '/admin/SaveMembershipList';
  public static getUsedServicesByMembershipURL: string = ApiService.HOST_URL + '/admin/GetUsedServicesByMembership';
  public static getAllOMembershipURL: string = ApiService.HOST_URL + '/admin/GetAllMembership';
  public static getAllActiveMembershipURL: string = ApiService.HOST_URL + '/admin/GetAllActiveMembership';
  public static updateMembershipListURL: string = ApiService.HOST_URL + '/admin/UpdateMembershipList';
  public static removeMembershipDetailsURL: string = ApiService.HOST_URL + '/admin/removeMembershipDetails/';
  public static getAllMembershipURL: string = ApiService.HOST_URL + '/admin/getAllMembership/';
  public static getWebBannersURL: string = ApiService.HOST_URL + '/admin/GetWebBanners';
  public static uploadBannersImageURL: string = ApiService.HOST_URL + '/admin/UploadBannersImage';
  public static saveWebBannersURL: string = ApiService.HOST_URL + '/admin/SaveWebBanners';
  public static getWebBannerURL: string = ApiService.HOST_URL + '/admin/GetWebBanner';
  public static removeWebBannersURL: string = ApiService.HOST_URL + '/admin/RemoveWebBanners';
  public static updateActiveWebStatusURL: string = ApiService.HOST_URL + '/admin/UpdateActiveWebBanners';
  public static saveCartListURL: string = ApiService.HOST_URL + '/admin/saveCartList';
  public static getAllCartListURL: string = ApiService.HOST_URL + '/admin/getAllCartList';
  public static removeCartDetailsURL: string = ApiService.HOST_URL + '/admin/removeCartDetails';
  public static updateCartListURL: string = ApiService.HOST_URL + '/admin/updateCartList';
  public static saveOrderListURL: string = ApiService.HOST_URL + '/admin/saveOrderList';
  public static updateActiveOffersURL: string = ApiService.HOST_URL + '/admin/UpdateActiveOffers';
  public static updateActiveMemberShipURL: string = ApiService.HOST_URL + '/admin/UpdateActiveMemberShip';
  public static savePlaceOrderListURL: string = ApiService.HOST_URL + '/admin/SavePlaceOrderList';
  public static getAllOrderListURL: string = ApiService.HOST_URL + '/admin/GetAllOrderList';
  public static savePurchaseServiceListURL: string = ApiService.HOST_URL + '/admin/SavePurchaseServiceList';
  public static getAllMembershipPurchasedURL: string = ApiService.HOST_URL + '/admin/GetAllMembershipPurchased';
  public static getMembershipPurchasedByIDURL: string = ApiService.HOST_URL + '/admin/GetMembershipPurchasedByID';
  public static removeLastInsertedOTPURL: string = ApiService.HOST_URL + '/admin/removeLastInsertedOTP';
  public static getAllProductOrderListURL: string = ApiService.HOST_URL + '/admin/GetAllProductOrderList/';
  public static removeCustomerOrderURL: string = ApiService.HOST_URL + '/admin/RemoveCustomerOrder/';
  public static removeOrderDetailsURL: string = ApiService.HOST_URL + '/admin/RemoveOrderDetails';
  public static saveAcceptUserOrderURL: string = ApiService.HOST_URL + '/admin/SaveAcceptUserOrder';
  public static getActivatedMembershipURL: string = ApiService.HOST_URL + '/admin/GetActivatedMembership/';
  public static saveRatingsDetailsURL: string = ApiService.HOST_URL + '/admin/SaveRatingsDetails';
  public static updatePurchaseMembershipStatusURL: string = ApiService.HOST_URL + '/admin/UpdatePurchaseMembershipStatusURL/';
  // Organization Apis
  public static saveRegistrationListURL: string = ApiService.HOST_URL + '/admin/SaveRegistrationList';
  public static getAllRegistrationURL: string = ApiService.HOST_URL + '/admin/GetAllRegistration';
  public static updateRegistrationListURL: string = ApiService.HOST_URL + '/admin/UpdateRegistrationList';
  public static removeRegistrationDetailsURL: string = ApiService.HOST_URL + '/admin/RemoveRegistrationDetails/';
  //
  public static saveVendorProductListURL: string = ApiService.HOST_URL + '/admin/saveVendorProductList';
  public static saveVendorOrderListURL: string = ApiService.HOST_URL + '/admin/saveVendorOrderList'
}
