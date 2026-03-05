import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
  hasHydrated: boolean;
  onboardingComplete: boolean;
  selectedInterests: string[];
  pollVotes: Record<string, string>;
  setHasHydrated: (value: boolean) => void;
  toggleInterest: (interest: string) => void;
  completeOnboarding: () => void;
  votePoll: (pollId: string, optionId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      onboardingComplete: false,
      selectedInterests: [],
      pollVotes: {},
      setHasHydrated: (value) => set({ hasHydrated: value }),
      toggleInterest: (interest) =>
        set((state) => {
          const exists = state.selectedInterests.includes(interest);
          return {
            selectedInterests: exists
              ? state.selectedInterests.filter((item) => item !== interest)
              : [...state.selectedInterests, interest],
          };
        }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      votePoll: (pollId, optionId) =>
        set((state) => ({
          pollVotes: {
            ...state.pollVotes,
            [pollId]: optionId,
          },
        })),
    }),
    {
      name: 'startup-app-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);
