
import { useState, useEffect, useCallback } from 'react';
import { QRCodeEntry, QRType, QRStyle } from './types';

const STORAGE_KEY = 'corp_qr_hub_data';

const DEFAULT_STYLE: QRStyle = {
  fgColor: '#000000',
  bgColor: '#ffffff',
  level: 'M',
  includeLogo: false,
  logoSize: 20,
  borderRadius: 0,
};

export function useQRStore() {
  const [items, setItems] = useState<QRCodeEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load storage', e);
      }
    }
  }, []);

  const saveToStorage = useCallback((newItems: QRCodeEntry[]) => {
    setItems(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  }, []);

  const addItem = (entry: Omit<QRCodeEntry, 'id' | 'createdAt' | 'analytics'>) => {
    const newItem: QRCodeEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      analytics: [],
    };
    saveToStorage([newItem, ...items]);
    return newItem;
  };

  const updateItem = (id: string, updates: Partial<QRCodeEntry>) => {
    const newItems = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    saveToStorage(newItems);
  };

  const deleteItem = (id: string) => {
    saveToStorage(items.filter((item) => item.id !== id));
  };

  const logScan = (id: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          analytics: [
            ...item.analytics,
            {
              timestamp: Date.now(),
              device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
            },
          ],
        };
      }
      return item;
    });
    saveToStorage(newItems);
  };

  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    logScan,
    DEFAULT_STYLE,
  };
}
