export const port = Number(process.env.PORT) || 7000
export const nodeEnv = process.env.NODE_ENV
export const dbUrl = process.env.DB_URL
export const languageDefault = process.env.LOCALE
export const secretKey: string = process.env.SECRET_KEY || 'secretKey'
export const jwtSecret: string = process.env.JWT_SECRET|| 'quienfuerapacopameterlapresa'
export const webpayCommerceCode: string = process.env.WEBPAY_COMMERCE_CODE || '597055555532'
export const webpayApiKey: string = process.env.WEBPAY_API_KEY || '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'