import json from '~/static/inventory.json'
import sm10_json from '~/static/SM_10_inventory.json'
import sm11_json from '~/static/SM_11_inventory.json'

export const getInventory = () => useState('inventory', () => Object.assign(json, sm10_json, sm11_json))
export const getCart = () => useState('cart', () => new Object())
export const getCartItems = () => useState('cartItems', () => 0)