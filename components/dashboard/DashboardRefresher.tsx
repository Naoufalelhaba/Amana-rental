'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

const INTERVAL_MS = 60_000

export function DashboardRefresher() {
  const router = useRouter()
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [refreshing, setRefreshing] = useState(false)

  function refresh() {
    setRefreshing(true)
    router.refresh()
    setLastUpdate(new Date())
    setTimeout(() => setRefreshing(false), 800)
  }

  useEffect(() => {
    const id = setInterval(refresh, INTERVAL_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      onClick={refresh}
      title={`Dernière mise à jour : ${lastUpdate.toLocaleTimeString('fr-MA')}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
    >
      <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
      <span className="hidden sm:inline">Actualiser</span>
    </button>
  )
}
