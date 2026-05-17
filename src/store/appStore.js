import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/**
 * Global app store — persisted to localStorage.
 * Extend this store as the app grows (user preferences, auth, etc.)
 */
export const useAppStore = create(
  persist(
    (set, get) => ({
      // ─── Inquiry / EOI tracking ───
      inquiries: [],
      hasSubmittedEOI: false,

      addInquiry: (inquiry) =>
        set(state => ({
          inquiries: [
            ...state.inquiries,
            { ...inquiry, id: Date.now(), createdAt: new Date().toISOString() },
          ],
          hasSubmittedEOI: true,
        })),

      // ─── User unit preferences ───
      preferredUnitSize: null,          // e.g. 'standard' | 'premium' | 'grand'
      setPreferredUnitSize: (size) => set({ preferredUnitSize: size }),

      // ─── Navigation state ───
      lastVisitedPage: '/',
      setLastVisitedPage: (page) => set({ lastVisitedPage: page }),

      // ─── UI / session state ───
      contactFormData: null,
      setContactFormData: (data) => set({ contactFormData: data }),

      // ─── Utility ───
      clearAll: () =>
        set({
          inquiries: [],
          hasSubmittedEOI: false,
          preferredUnitSize: null,
          contactFormData: null,
          lastVisitedPage: '/',
        }),
    }),
    {
      name: 'marvel-infra-gachibowli',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        inquiries: state.inquiries,
        hasSubmittedEOI: state.hasSubmittedEOI,
        preferredUnitSize: state.preferredUnitSize,
        lastVisitedPage: state.lastVisitedPage,
      }),
    }
  )
)
