import { isEmail } from "validator";
const required = value => {
    if (!value) {
      return true
    }
  };
  const vmail = value => {
    if (!isEmail(value)) {
      return true
    }
  };
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return true
    }
  };
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return true
    }
  };
  const vform={
    required,
    vmail,
    vusername,
    vpassword
}

export default vform;