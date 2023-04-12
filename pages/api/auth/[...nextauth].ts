import { CustomProvider } from "~/lib/CustomAuthProvider"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"

/**
 * This commented section will work, or at least redirect correctly
 */
// export default NextAuth({
//   providers: [
//     CustomProvider({
//       callbackUrl: `http://localhost:3000/api/auth/callback/custom`,
//       clientId: 'fake-client-id',
//     }),
//   ],
// })

/**
 * This commented section will also work, when not using `req.headers.origin`
 */
// export default async function auth(req: NextApiRequest, res: NextApiResponse) {
//   const providers = [
//     CustomProvider({
//       callbackUrl: `https://whatever.com/api/auth/callback/custom`,
//       clientId: 'fake-client-id',
//     }),
//   ]

//   return await NextAuth(req, res, {
//     providers,
//   })
// }

/**
 * This will not work, not even redirect, it will just redirect back
 */
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CustomProvider({
      callbackUrl: `${req.headers.origin}/api/auth/callback/custom`,
      clientId: 'fake-client-id',
    }),
  ]

  return await NextAuth(req, res, {
    providers,
  })
}