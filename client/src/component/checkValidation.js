const checkValidation = (data) => {
  const err = {};
  const { name, email, age, gender, password, cpassword, role } = data;
  // if (!name || !email || !age || !gender || !password || !cpassword || !role) {
  //   return "Please Fill All The Fields";
  // }
  // if (!validateEmail(email)) {
  //   return "Please Enter Valid Email";
  // }
  // if (password !== cpassword) {
  //   return "Password do not match";
  // }
  // if (password.length < 2) {
  //   return "Please Should be at least 2 characters";
  // }
  if (!name) {
    err.name = "Please add your name.";
  }
  if (!age) {
    err.age = "Please add your age.";
  }
  if (!gender) {
    err.gender = "Please add your gender.";
  }
  if (!role) {
    err.role = "Please add your role.";
  }
  if (!email) {
    err.email = "Please add your email.";
  } else if (!validateEmail(email)) {
    err.email = "Email format is incorrect.";
  }
  if (!password) {
    err.password = "Please add your password.";
  } else if (password.length < 2) {
    err.password = "Password must be at least 2 characters.";
  }
  if (password !== cpassword) {
    err.cpassword = "Confirm password did not match.";
  }

  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default checkValidation;
