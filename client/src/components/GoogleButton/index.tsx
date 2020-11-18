import React from 'react'
import GoogleLogin from 'react-google-login';

const GoogleButton = () => {
  const responseGoogle = (response: any) => {
    console.log(response);
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3000/api/v1/auth",
    //   data: {tokenId: response.tokenId}
    // }).then(response => {
    //   console.log(response)
    // })
  }
  return (
    <GoogleLogin
      clientId="765939231519-o35chvevngta54m1mirgdqhpesfosf52.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleButton