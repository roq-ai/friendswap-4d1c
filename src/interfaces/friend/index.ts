import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FriendInterface {
  id?: string;
  user_id: string;
  friend_id: string;
  created_at?: any;
  updated_at?: any;

  user_friend_user_idTouser?: UserInterface;
  user_friend_friend_idTouser?: UserInterface;
  _count?: {};
}

export interface FriendGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  friend_id?: string;
}
