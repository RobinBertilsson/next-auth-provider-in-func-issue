import { OAuthConfig } from "next-auth/providers"

export interface CustomProfile extends Record<string, any> {
  id: number
  email?: string
  name?: string
}

export interface CustomProviderOptions {
  callbackUrl: string
  clientId: string
}

export function CustomProvider(options: CustomProviderOptions): OAuthConfig<CustomProfile> {
  const { clientId, callbackUrl } = options
  const { OAUTH_BASE_URL } = process.env

  return {
    authorization: {
      url: `${OAUTH_BASE_URL}/oauth/authorize`,
      params: {
        redirect_uri: callbackUrl,
        scope: '',
      },
    },
    token: {
      url: `${OAUTH_BASE_URL}/oauth/token`,
    },
    profile(profile) {
      return {
        id: profile.id.toString(),
        email: profile.email,
        name: profile.name,
      }
    },
    userinfo: {
      url: `${OAUTH_BASE_URL}/user/me`
    },
    type: 'oauth',
    name: 'Custom',
    id: 'custom',
    clientId,
    checks: ['pkce', 'state'],
  }
}