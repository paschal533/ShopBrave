export default function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function registerValidate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid Username...!";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password Not Match...!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Confirm Password";
  }

  return errors;
}

export function createProductValidate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.keyDetails) {
    errors.keyDetails = "Required";
  }

  if (!values.specification) {
    errors.specification = "Required";
  }

  if (!values.category) {
    errors.category = "Required";
  }

  if (!values.colors) {
    errors.colors = "Required";
  }

  if (!values.sizes) {
    errors.sizes = "Required";
  }

  if (!values.deliveryDays) {
    errors.deliveryDays = "Required";
  }

  if (!values.price) {
    errors.price = "Required";
  }

  return errors;
}

export function paymentValidate(values) {
  const errors = {};

  if (!values.country) {
    errors.country = "Required";
  } else if (values.country.includes(" ")) {
    errors.country = "Invalid country name...!";
  }

  if (!values.address1) {
    errors.address1 = "Required";
  }

  if (!values.address2) {
    errors.address2 = "Required";
  }

  if (!values.zipCode) {
    errors.zipCode = "Required";
  }

  if (!values.city) {
    errors.city = "Required";
  }
}

export function createSellerValidate(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.includes(" ")) {
    errors.firstName = "Invalid first name...!";
  }

  if (!values.sellerWalletAddress) {
    errors.sellerWalletAddress = "Required";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.includes(" ")) {
    errors.lastName = "Invalid last name...!";
  }

  if (!values.businessName) {
    errors.businessName = "Required";
  } else if (values.businessName.includes(" ")) {
    errors.businessName = "Invalid Business name...!";
  }

  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.city) {
    errors.city = "Required";
  } else if (values.city.includes(" ")) {
    errors.city = "Invalid city...!";
  }

  if (!values.postalCode) {
    errors.postalCode = "Required";
  } else if (values.postalCode.includes(" ")) {
    errors.postalCode = "Invalid Postal Code...!";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.profileImage) {
    errors.profileImage = "Required";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else if (values.phone.includes(" ")) {
    errors.phone = "Invalid phone...!";
  }

  if (!values.category) {
    errors.category = "Required";
  } else if (values.category.includes(" ")) {
    errors.category = "Invalid category...!";
  }

  if (!values.availability) {
    errors.availability = "Required";
  }

  if (!values.deliveryDays) {
    errors.deliveryDays = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.businessEmail) {
    errors.businessEmail = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.businessEmail)
  ) {
    errors.businessEmail = "Invalid Business email address";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  // validate confirm password
  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Password Not Match...!";
  } else if (values.cpassword.includes(" ")) {
    errors.cpassword = "Invalid Confirm Password";
  }

  return errors;
}
