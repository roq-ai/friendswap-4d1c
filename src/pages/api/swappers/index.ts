import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { swapperValidationSchema } from 'validationSchema/swappers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getSwappers();
    case 'POST':
      return createSwapper();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSwappers() {
    const data = await prisma.swapper
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'swapper'));
    return res.status(200).json(data);
  }

  async function createSwapper() {
    await swapperValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.review_review_reviewed_idToswapper?.length > 0) {
      const create_review_review_reviewed_idToswapper = body.review_review_reviewed_idToswapper;
      body.review_review_reviewed_idToswapper = {
        create: create_review_review_reviewed_idToswapper,
      };
    } else {
      delete body.review_review_reviewed_idToswapper;
    }
    if (body?.review_review_reviewer_idToswapper?.length > 0) {
      const create_review_review_reviewer_idToswapper = body.review_review_reviewer_idToswapper;
      body.review_review_reviewer_idToswapper = {
        create: create_review_review_reviewer_idToswapper,
      };
    } else {
      delete body.review_review_reviewer_idToswapper;
    }
    if (body?.swap_request_swap_request_requested_idToswapper?.length > 0) {
      const create_swap_request_swap_request_requested_idToswapper =
        body.swap_request_swap_request_requested_idToswapper;
      body.swap_request_swap_request_requested_idToswapper = {
        create: create_swap_request_swap_request_requested_idToswapper,
      };
    } else {
      delete body.swap_request_swap_request_requested_idToswapper;
    }
    if (body?.swap_request_swap_request_requester_idToswapper?.length > 0) {
      const create_swap_request_swap_request_requester_idToswapper =
        body.swap_request_swap_request_requester_idToswapper;
      body.swap_request_swap_request_requester_idToswapper = {
        create: create_swap_request_swap_request_requester_idToswapper,
      };
    } else {
      delete body.swap_request_swap_request_requester_idToswapper;
    }
    const data = await prisma.swapper.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
