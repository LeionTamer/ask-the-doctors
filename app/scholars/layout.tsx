import { TSXProvider } from '@/components/providers'
import { ReactNode } from 'react'

export default function ScholarsLayout({ children }: { children: ReactNode }) {
  return <TSXProvider>{children}</TSXProvider>
}
