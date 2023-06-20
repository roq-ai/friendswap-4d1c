import { SwapperInterface } from 'interfaces/swapper';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  reviewer_id: string;
  reviewed_id: string;
  rating: number;
  comment?: string;
  created_at?: any;
  updated_at?: any;

  swapper_review_reviewer_idToswapper?: SwapperInterface;
  swapper_review_reviewed_idToswapper?: SwapperInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  reviewer_id?: string;
  reviewed_id?: string;
  comment?: string;
}
