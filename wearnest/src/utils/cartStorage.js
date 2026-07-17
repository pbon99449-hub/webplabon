const KEY = 'wearnest_cart_items_v1';

function emitStorageUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('wearnest-storage-updated'));
  }
}

export function getCartItems() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function setCartItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  emitStorageUpdate();
}

export function isInCart(id) {
  return getCartItems().some((x) => x?.id === id);
}

export function addToCart(item) {
  const items = getCartItems();
  if (items.some((x) => x?.id === item.id)) return { added: false, items };

  const next = [...items, item];
  setCartItems(next);
  return { added: true, items: next };
}

export function removeFromCart(id) {
  const items = getCartItems();
  const next = items.filter((x) => x?.id !== id);
  setCartItems(next);
  return { removed: true, items: next };
}

export function toggleCartItem(item) {
  if (isInCart(item.id)) {
    return removeFromCart(item.id);
  }
  return addToCart(item);
}
