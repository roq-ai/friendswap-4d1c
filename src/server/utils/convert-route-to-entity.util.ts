const mapping: Record<string, string> = {
  friends: 'friend',
  reviews: 'review',
  'swap-requests': 'swap_request',
  swappers: 'swapper',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
