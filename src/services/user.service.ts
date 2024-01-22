import Boom from '@hapi/boom'
import prisma from '../libs/prisma'
import { User } from '@prisma/client'
import { exclude } from '../utils'
import { z } from 'zod'
import { updateUserBodySchema } from '../validators/user.validator'
import bcrypt from 'bcryptjs';
import { createAccessToken , createRefreshToken} from '../utils/token.util'

export const create = async (user: User) => {
    try {
        return await prisma.user.create({
            data: user,
        })
    } catch (e: any) {
        if (
            e.code === 'P2002' &&
            e.meta?.target &&
            e.meta?.target[0] === 'email'
        ) {
            throw Boom.conflict('User with this email already exists')
        }
        throw e
    }
}

export const get = async () => {
    const users = await prisma.user.findMany()
    return users.map((user) => exclude(user, ['password']))
}

export const getById = async (id: number) => {
    try {
        const user = await prisma.user.findFirstOrThrow({
            where: { id },
            include: {
                addresses: true,
            },
        })
        return exclude(user, ['password'])
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`User with id ${id} does not exist`)
        }
        throw err
    }
}

export const remove = async (id: number) => {
    try {
        await prisma.user.delete({
            where: { id },
        })
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`User with id ${id} does not exist`)
        }
        throw err
    }
}

export const updateById = async (
    id: number,
    user: z.infer<typeof updateUserBodySchema>
) => {
    const { addresses, ...rest } = user

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: rest,
            include: {
                addresses: true,
            },
        })

        if (!addresses) return exclude(updatedUser, ['password'])

        const updatedAddresses = await Promise.all(
            addresses.map(async (address) => {
                if (address.id) {
                    return prisma.address.update({
                        where: { id: address.id },
                        data: address,
                    })
                }
                const newAddress = await prisma.address.create({
                    data: {
                        ...address,
                        id: undefined,
                        user: { connect: { id } },
                    },
                })
                return newAddress
            })
        )

        updatedUser.addresses = updatedAddresses

        return exclude(updatedUser, ['password'])
    } catch (err: any) {
        if (err.code === 'P2025') {
            throw Boom.notFound(`User with id ${id} does not exist`)
        }
        throw err
    }
}


export const userlogin = async(email:string,password:string)=>{
      const Find = await prisma.user.findFirst({where:{
         email:email,
      }})

      if(!Find) {
        throw Boom.notFound('User is not register');
      }

      const passwordMatch = await bcrypt.compare(password,Find.password);
      if(!passwordMatch){
        throw Boom.unauthorized('Password does not match');


      }

      const accessToken = createAccessToken(Find.id,Find.is_admin);
      const refreshToken = createRefreshToken(Find.id,Find.is_admin);

      return{
        accessToken,
        refreshToken
      }
    
    }