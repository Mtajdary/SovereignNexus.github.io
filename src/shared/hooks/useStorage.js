import { useState, useEffect, useCallback } from 'react';
import { dbStorage } from '../../storage/db';

export const useStorage = (storeName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const records = await dbStorage.getAll(storeName);
      setData(records);
      setError(null);
    } catch (err) {
      console.error(`Error loading store ${storeName}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [storeName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveItem = async (item) => {
    try {
      await dbStorage.put(storeName, item);
      await loadData();
      return true;
    } catch (err) {
      console.error(`Error saving to ${storeName}:`, err);
      setError(err);
      return false;
    }
  };

  const removeItem = async (id) => {
    try {
      await dbStorage.delete(storeName, id);
      await loadData();
      return true;
    } catch (err) {
      console.error(`Error deleting from ${storeName}:`, err);
      setError(err);
      return false;
    }
  };

  return {
    data,
    loading,
    error,
    saveItem,
    removeItem,
    refresh: loadData
  };
};
