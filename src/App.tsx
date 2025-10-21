import { useEffect, useMemo, useState } from 'react'
import { SuperHero } from './SuperHero'      // ← import de la classe
import SuperHerosData from './SuperHeros.json' // ← import du JSON

function App() {
  const nom = "SARI Rim"

  // États
  const [compteur, setCompteur] = useState(0)
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState<'name' | 'id'>('name')
  const [heroes, setHeroes] = useState<SuperHero[]>([])
  const [selectedHero, setSelectedHero] = useState<SuperHero | null>(null)

  const total = heroes.length
  
  // Étape 3 : useEffect pour changer le titre
  useEffect(() => {
    document.title = `Compteur : ${compteur}`
  }, [compteur])

  // Charger les héros depuis le JSON → tableau d’instances SuperHero
  useEffect(() => {
    const arr = (SuperHerosData as any[]).map(
      (h) => new SuperHero(h.id, h.name, h["id-api"], h.slug)
    )
    setHeroes(arr)
  }, [])

  // Filtrage et tri avec useMemo
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return heroes
    return heroes.filter(h => h.name.toLowerCase().includes(q))
  }, [search, heroes])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    if (sortOption === 'name') arr.sort((a, b) => a.name.localeCompare(b.name))
    else arr.sort((a, b) => a.id - b.id)
    return arr
  }, [filtered, sortOption])

  return (
    <main style={{ textAlign: "center", fontFamily: "system-ui" }}>
      <h1>Bonjour {nom}, je découvre React !</h1>

      <hr style={{ margin: '40px' }} />

      {/* compteur */}
      <h2 style={{ fontSize: '35px' }}>Compteur : {compteur}</h2>
      <button onClick={() => setCompteur(compteur + 1)} style={{ marginLeft: 10, backgroundColor: '#d0dee4ff' }}>+</button>
      <button onClick={() => setCompteur(0)} style={{ marginLeft: 10, backgroundColor: '#80A1BA' }}>
        Réinitialiser
      </button>

      <hr style={{ margin: '40px' }} />

      {/* Base super-héros */}
      <h1>Liste des super-héros</h1>

      <div style={{ fontFamily: 'system-ui'}}>
      <h3>La liste contient {total} super-héros :</h3>
      </div>
      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher un héros…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 8, width: '67%', marginRight: 12 }}
      />

      {/* Liste dynamique */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {sorted.map(hero => (
          <li key={hero.id}>
            <button
              onClick={() => setSelectedHero(hero)}
              style={{
                background: '',
                border: '',
                width:'70%',
                cursor: 'pointer',
                fontSize: 16,
                textAlign:'left'
              }}
            >
              {hero.name}
            </button>
          </li>
        ))}
        {sorted.length === 0 && <li>Aucun résultat…</li>}
      </ul>

      {/* Détail du héros sélectionné */}
      {selectedHero && (
        <div style={{
          border: '1px solid #ddd',
          borderRadius: 12,
          padding: 20,
          marginTop: 20,
          display: 'inline-block',
          background: '#f8f9fa'
        }}>
        </div>
      )}
    </main>
  )
}

export default App