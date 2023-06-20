import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { swapperValidationSchema } from 'validationSchema/swappers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.swapper
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSwapperById();
    case 'PUT':
      return updateSwapperById();
    case 'DELETE':
      return deleteSwapperById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSwapperById() {
    const data = await prisma.swapper.findFirst(convertQueryToPrismaUtil(req.query, 'swapper'));
    return res.status(200).json(data);
  }

  async function updateSwapperById() {
    await swapperValidationSchema.validate(req.body);
    const data = await prisma.swapper.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteSwapperById() {
    const data = await prisma.swapper.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
