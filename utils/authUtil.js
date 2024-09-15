const jwt = require('jsonwebtoken');

const createToken = async ({payload}) => {
    const token = await jwt.sign({payload}, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_DATE
    });

    return token;
}

const attachCookiesToResponse = async ({res, tokenUser}) => {

    const token = await createToken({payload: tokenUser});

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
    });

}


module.exports = {
    createToken,
    attachCookiesToResponse
}