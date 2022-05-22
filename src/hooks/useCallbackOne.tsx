import { useMemoOne } from './useMemoOne';

export function useCallbackOne<T>(callback: T, inputs?: any[]): T {
  return useMemoOne(() => callback, inputs);
}
