import express from 'express';
import {v4 as uuid} from 'uuid';

const router = express.Router();

router.post("/hookid", (req, res) => {
    let hookId = uuid();    

    res.json({
        "id": hookId
    });
});

router.get("/:id", (req, res) => {
    const hookId = req.params.id;    
    const client = req.clients.get(hookId);
    const reqId = uuid();

    if (client) {
        let data = {
            "id": reqId(),
            "method": req.method,
            "headers": req.headers,
            "body": req.body
        };

        client.emit("msg", data);
        res.send(req.params.id);
    }
    else {
        res.send("no hook found");
    }
});

export default router;