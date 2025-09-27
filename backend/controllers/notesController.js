const admin = require('firebase-admin');
const db = admin.firestore();

const getNotes = async (req, res) => {
  try {
    const userId = req.user.uid;
    const searchQuery = req.query.q;
    let query = db.collection('notes').where('userId', '==', userId);
    const snapshot = await query.get();
    let notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (searchQuery) {
        notes = notes.filter(note => 
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (note.content && note.content.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error while fetching notes." });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // --- START OF FIX ---
    // This validation check ensures the title is not empty.
    // This is the key change that fixes the "400 Bad Request" error.
    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Note title is required.' });
    }
    // --- END OF FIX ---

    const userId = req.user.uid;
    const docRef = await db.collection('notes').add({
      title,
      content: content || '', // Ensure content is at least an empty string
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    res.status(201).json({ id: docRef.id, title, content, userId });
  } catch (error) {
    console.error("Error creating note:", error); 
    res.status(500).json({ message: "Internal server error while creating note." });
  }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        
        // Add validation for the update function as well
        if (!title || title.trim() === '') {
            return res.status(400).json({ message: 'Note title is required.' });
        }
        
        const userId = req.user.uid;
        const noteRef = db.collection('notes').doc(id);
        const doc = await noteRef.get();

        if (!doc.exists || doc.data().userId !== userId) {
            return res.status(401).json({ message: 'Not authorized or note not found' });
        }

        await noteRef.update({ 
            title, 
            content: content || '', 
            updatedAt: new Date().toISOString() 
        });

        res.json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Internal server error while updating note." });
    }
};

const deleteNote = async (req, res) => {
     try {
        const { id } = req.params;
        const userId = req.user.uid;
        const noteRef = db.collection('notes').doc(id);
        const doc = await noteRef.get();

        if (!doc.exists || doc.data().userId !== userId) {
            return res.status(401).json({ message: 'Not authorized or note not found' });
        }

        await noteRef.delete();
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Internal server error while deleting note." });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };