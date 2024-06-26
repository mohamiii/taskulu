function isEmail(value: string): boolean {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(value);
}

function isEmpty(value: string): boolean {
  return value.trim() === "";
}

export function usernameError(value: string) {
  if (value.length === 0) {
    return "نام کاربری الزامی است";
  } else if (value.length < 4) {
    return "نام کاربری باید حداقل 4 کاراکتر باشد";
  } else if (value.length > 22) {
    return "نام کاربری باید حداکثر ۲۲ کاراکتر باشد";
  } else {
    return "";
  }
}

export function emailError(value: string) {
  if (isEmpty(value)) {
    return "ایمیل الزامی است";
  } else if (!isEmail(value)) {
    return "ایمیل غلط است";
  } else {
    return "";
  }
}

export function passwordError(value: string) {
  if (value.length === 0) {
    return "گذرواژه الزامی است";
  } else if (value.length < 10) {
    return "گذرواژه باید حداقل ۱۰ کاراکتر باشد";
  } else {
    return "";
  }
}

export function confirmPasswordError(
  passwordValue: string,
  confirmPasswordValue: string
) {
  if (passwordValue !== confirmPasswordValue) {
    return "گذرواژه ها باید یکسان باشند";
  } else {
    return "";
  }
}
