import SignUpImg from "../assets/Images/signup.webp"
import Template from "../Components/core/auth/Template"

const SignUp = () => {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free "
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={SignUpImg}
      formType="signup"
    />
  )
}

export default SignUp