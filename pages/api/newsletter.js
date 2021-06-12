import { connectDatabase, insertDocument } from "../../helpers/db-util";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            res.status(422).json({message: 'Invalid email address.'});
            return; 
        }

        try {
            await insertDocument('newsletter', {email: userEmail});
            res.status(201).json({message: 'Sign up!'});
        } catch (error) {
            res.status(500).json({message: 'Insert data failed!'});
            return;
        }
    }
}

export default handler;
