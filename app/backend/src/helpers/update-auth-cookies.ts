import { AuthTokens } from '@/services/auth';
import { Response } from '@/types/routes';
import config from '@/config';

interface UpdateAuthCookiesOptions {
  res: Response;
  tokens: AuthTokens | null;
}

export default function updateAuthCookies({
  res,
  tokens
}: UpdateAuthCookiesOptions): void {
  if (tokens && tokens.accessToken && tokens.refreshToken) {
    res.cookie('isSignedIn', 'true');

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: config.environment !== 'local',
      secure: config.environment !== 'local',
      signed: true
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: config.environment !== 'local',
      secure: config.environment !== 'local',
      signed: true
    });
  } else {
    res.clearCookie('isSignedIn');
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
}
