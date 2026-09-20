import json from '~/static/inventory.json'
import swsh05_json from '~/static/SWSH_05_inventory.json'
import sm10_json from '~/static/SM_10_inventory.json'
import sm11_json from '~/static/SM_11_inventory.json'
import me2_json from '~/static/ME2_inventory.json'
import sv09_json from '~/static/SV_09_inventory.json'
import bs_json from '~/static/BS_inventory.json'
import ju_json from '~/static/JU_inventory.json'
import me1_json from '~/static/ME1_inventory.json'

export const getInventory = () => useState('inventory', () => Object.assign(json, swsh05_json, sm10_json, sm11_json, me2_json, sv09_json, bs_json, ju_json, me1_json))
export const getCart = () => useState('cart', () => new Object())
export const getCartItems = () => useState('cartItems', () => 0)