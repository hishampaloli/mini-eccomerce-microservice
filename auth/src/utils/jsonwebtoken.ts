import jwt from 'jsonwebtoken';


const generateToken = (id: any) => {
    return jwt.sign({id}, process.env.JWT_KEY!, {
        expiresIn: '10d'
    });
}


export default generateToken;