// import jwt from 'jsonwebtoken';
// import { Admins, AdminsSchema } from '../schemas/admins.schema';
// import cookieParser from 'cookie-parser';

// const Authenticate = async (req, res, next) => {
//   try {
//     const token = req.cookies.Book;
//     const infos = jwt.verify(token, 'Book');
//     const rootuser = await Admins.findOne({
//       _id: infos._id,
//       'tokens.token': token,
//     });
//     if (!rootuser) {
//       res.status(422).json({ error: 'error' });
//     }
//     req.token = token;
//     req.rootuser = rootuser;
//     req.userID = rootuser._id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(422).json({ error: 'error' });
//   }
// };

// module.exports = Authenticate;
