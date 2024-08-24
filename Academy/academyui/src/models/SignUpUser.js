class SignUpUser {
  constructor(name = '', surname = '', age = '', email = '', password = '', confirmPassword = '') {
    this.Name = name;
    this.Surname = surname;
    this.Age = age;
    this.Email = email;
    this.Password = password;
    this.ConfirmPassword = confirmPassword;
  }
}

export default SignUpUser;