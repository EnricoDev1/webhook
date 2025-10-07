import express from 'express';
import jwt from 'jsonwebtoken';
import {v4 as uuid} from 'uuid';
import {JWT_SECRET} from '../utils.js';

const router = express.Router();

router.get("/", (req, res) => {
    let hookId = uuid();

    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 120), // 2 ore
        hookId: hookId
    }, JWT_SECRET);
    
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, 
        sameSite: 'Lax' 
    });

    res.send(hookId);
});

// Rotta che riceve i dati, da cambiare GET
router.get("/:id", (req, res) => {
    console.log(req.params.id);
    const hookId = req.params.id;
    const client = req.clients.get(hookId);
    
    console.log(client);

    client.emit("msg", { hookId });
    
    res.send(req.params.id);
});

export default router;