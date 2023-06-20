import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { friendValidationSchema } from 'validationSchema/friends';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.friend
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFriendById();
    case 'PUT':
      return updateFriendById();
    case 'DELETE':
      return deleteFriendById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFriendById() {
    const data = await prisma.friend.findFirst(convertQueryToPrismaUtil(req.query, 'friend'));
    return res.status(200).json(data);
  }

  async function updateFriendById() {
    await friendValidationSchema.validate(req.body);
    const data = await prisma.friend.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFriendById() {
    const data = await prisma.friend.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
