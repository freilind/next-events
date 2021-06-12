import { getAllDocuments, insertDocument } from "../../../helpers/db-util";

const handler = async (req, res) => {
    const eventId = req.query.eventId;

    if (req.method === 'POST') {
        const { email, name, text } = req.body;

        if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '' ){
            res.status(422).json({message: 'Invalid input.'});
            return; 
        }
        console.log(email, name, text);
        const newComment = {
            email,
            name,
            text,
            eventId
        };

        try {
            const result = await insertDocument('comments', newComment);
            newComment.id = result.insertedId;
            res.status(201).json({message: 'Added comment', comment: newComment});
        } catch (error) {
            res.status(500).json({message: 'Insert data failed!'});
            return;
        }
    }

    if (req.method === 'GET') {
        try {
            const comments = await getAllDocuments('comments', {_id: -1}, { eventId: eventId });
            res.status(200).json({comments});
        } catch (error) {
            res.status(500).json({ message: 'Getting comments failed.' });
            console.log(error);
            return;
        }
    }
}

export default handler;