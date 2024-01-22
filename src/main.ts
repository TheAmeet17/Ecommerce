
import express, { NextFunction, Request, Response } from 'express'
import admin from '../src/routes/admin.router'
import user from '../src/routes/user.route'
import buildError from './utils/build-error'
const app = express()

app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server ready at : localhost:${PORT}`)
})

app.use('/admin',admin)
app.use('/user',user)


app.use((err: any, req: Request, res: Response, next:NextFunction) =>{
    const error = buildError(err)
         res.status(error.code).json({error})
     }
 );
 

export default app



