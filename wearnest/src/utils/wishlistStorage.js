const KEY = 'wearnest_wishlist_items_v1';

// item shape: { id: string, title?: string, image?: string }

function emitStorageUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('wearnest-storage-updated'));
  }
}

export function getWishlistItems() {
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

export function setWishlistItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  emitStorageUpdate();
}

export function isInWishlist(id) {
  return getWishlistItems().some((x) => x?.id === id);
}

export function addToWishlist(item) {
  const items = getWishlistItems();
  if (items.some((x) => x?.id === item.id)) return { added: false, items };
  const next = [item, ...items];
  setWishlistItems(next);
  return { added: true, items: next };
}

export function removeFromWishlist(id) {
  const items = getWishlistItems();
  const next = items.filter((x) => x?.id !== id);
  setWishlistItems(next);
  return { removed: true, items: next };
}

export function toggleWishlistItem(item) {
  if (isInWishlist(item.id)) {
    return removeFromWishlist(item.id);
  }
  return addToWishlist(item);
}

export function setLastAddedId(id) {
  localStorage.setItem('wearnest_wishlist_last_added_id_v1', id);
}

export function getLastAddedId() {
  try {
    return localStorage.getItem('wearnest_wishlist_last_added_id_v1') || null;
  } catch {
    return null;
  }
}

