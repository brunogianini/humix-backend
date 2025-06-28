import express, { Request, Response } from 'express'
import cors from "cors"
import router from './routes/routes'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Funcionando!" })
})

app.listen(3001, () => {
    console.log('Server is running on port 3000')
})

