import { SwapperInterface } from 'interfaces/swapper';
import { GetQueryInterface } from 'interfaces';

export interface SwapRequestInterface {
  id?: string;
  requester_id: string;
  requested_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  swapper_swap_request_requester_idToswapper?: SwapperInterface;
  swapper_swap_request_requested_idToswapper?: SwapperInterface;
  _count?: {};
}

export interface SwapRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  requester_id?: string;
  requested_id?: string;
  status?: string;
}
