import { sign, verify } from "jsonwebtoken";
import { envs } from "../../settings/envs";

export class AccessToken {
  static async create({ userId }: { userId: string }): Promise<string> {
    return new Promise((res, rej) => {
      sign(
        { userId },
        envs.SECRET_KEY,
        (error: Error | null, encoded?: string | undefined) => {
          if (!encoded) return rej(error);
          res(encoded);
        },
      );
    });
  }

  static async validate({
    accessToken,
  }: {
    accessToken: string;
  }): Promise<string> {
    return new Promise((res, rej) => {
      try {
        const response = verify(accessToken, envs.SECRET_KEY);
        res(response as string);
      } catch (error) {
        rej(error);
      }
    });
  }
}
