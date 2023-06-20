import { ReviewInterface } from 'interfaces/review';
import { SwapRequestInterface } from 'interfaces/swap-request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SwapperInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  review_review_reviewed_idToswapper?: ReviewInterface[];
  review_review_reviewer_idToswapper?: ReviewInterface[];
  swap_request_swap_request_requested_idToswapper?: SwapRequestInterface[];
  swap_request_swap_request_requester_idToswapper?: SwapRequestInterface[];
  user?: UserInterface;
  _count?: {
    review_review_reviewed_idToswapper?: number;
    review_review_reviewer_idToswapper?: number;
    swap_request_swap_request_requested_idToswapper?: number;
    swap_request_swap_request_requester_idToswapper?: number;
  };
}

export interface SwapperGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
