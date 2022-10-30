export const config = {
  nellysCoinServer: process.env.NELLYS_COIN_SERVER!,
  nellysCoinClientId: process.env.NELLYS_COIN_CLIENT_ID!,
  nellysCoinClientSecret: process.env.NELLYS_COIN_CLIENT_SECRET!,

  joiOptions: {
    errors: {
      wrap: { label: '' },
    },
    abortEarly: true,
  },
};
