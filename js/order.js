var submit = (e) => {
  e.preventDefault();
  let name = document.getElementById('name').value
  let billingAddress = document.getElementById('billingAddress').value
  let deliveryAddress = document.getElementById('deliveryAddress').value
  let mobile = document.getElementById('mobile').value
  let date = document.getElementById('date').value
  console.log(name, billingAddress, deliveryAddress, mobile, date)
  if(name == null || name == "") {
    alert('Full Name is required!')
    return false
  } else if (billingAddress == null || billingAddress == ""){
    alert('Billing Address is required!')
    return false
  } else if (deliveryAddress == null || deliveryAddress == ""){
    alert('Delivery Address is required!')
    return false
  } else if (mobile == null || billingAddress == "" || mobile.length != 10){
    alert('10 difit mobile number is required!')
    return false
  } else if (date == null || date == ""){
    alert('Date is required!')
    return false
  }
}