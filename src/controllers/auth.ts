import { Request, Response, NextFunction } from 'express'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(
  '765939231519-o35chvevngta54m1mirgdqhpesfosf52.apps.googleusercontent.com'
)
export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { tokenId } = req.body

  const client = new OAuth2Client(
    '765939231519-o35chvevngta54m1mirgdqhpesfosf52.apps.googleusercontent.com'
  )
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        '765939231519-o35chvevngta54m1mirgdqhpesfosf52.apps.googleusercontent.com', // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    const payload = ticket.getPayload()
    const userid = payload['sub']
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error)
}
