import express from "express";
import cors from 'cors'
import { randomUUID } from "crypto";

const app = express();
app.use(cors())
const port = 5151;

const mockData = [
   { id: 1, title: 'React Query', content: 'Who needs redux anyway right' },
   { id: 2, title: 'Redux', content: 'I\'m still relevant' },
   { id: 3, title: 'Zustand', content: 'I\'m slightly cooler than the other guy' }
]

app.get("/", (req, res) => {
   res.send("Hello from server");
});

app.get('/notes', (req, res) => {
   console.log(randomUUID())
   res.send(mockData)
})

app.listen(port, () => {
   console.log(`server listening at http://localhost:${port}`);
});
