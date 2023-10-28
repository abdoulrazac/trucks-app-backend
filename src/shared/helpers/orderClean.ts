export const orderClean = (order = {}) => {
  if(order['orderByAsc']){
    return {[order['orderByAsc']] : 'ASC'}
  }
  if(order['orderByDesc']){
    return {[order['orderByDesc']] : 'DESC'}
  }
  return {}
}