import * as jose from 'jose';

const generateToken = async (payload) => {
    try {
        const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
        const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(new Date().getTime() + parseInt(5*24*60*60*1000))
            .sign(secret);
        return token;
    } catch (err) {
        console.log(err);
    }
};

const verifyToken = async (token) => {
    try {
        const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
        const {payload} = await jose.jwtVerify(token, secret);
        
        if (!payload||payload.exp <= Date.now()) return null;

        return {email:payload.email,uid:payload.uid,username:payload.username}
    } catch (err) {
        console.log(err);
        return null;
    }
};

export { generateToken, verifyToken };
