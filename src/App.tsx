// Importation des hooks React nécessaires pour gérer l’état et les effets
import { useEffect, useMemo, useState } from 'react'

// Importation d’une classe personnalisée pour représenter un super-héros
import { SuperHero } from './SuperHero'

// Importation des données JSON contenant la liste des super-héros
import SuperHerosData from './SuperHeros.json'

// Définition du composant principal de l’application
function App() {
  // Déclaration d’une variable simple (pas un state)
  const nom = "SARI Rim"

  // Déclaration des états (state) de notre composant
  // Chaque appel à useState() permet de créer une variable dynamique qui provoque un rechargement du composant quand elle change
  const [compteur, setCompteur] = useState(0) // gère la valeur du compteur
  const [search, setSearch] = useState('') // gère le texte saisi dans la barre de recherche
  const [sortOption] = useState<'name' | 'id'>('name') // option de tri (par nom ou par ID)
  const [heroes, setHeroes] = useState<SuperHero[]>([]) // stocke la liste des super-héros
  const [selectedHero, setSelectedHero] = useState<SuperHero | null>(null) // stocke le héros sélectionné

  // Variable calculée : nombre total de super-héros
  const total = heroes.length
  
  // =============================
  // 🔹 Étape 3 : Utilisation du hook useEffect
  // =============================
  // Ce hook permet d’exécuter une action “secondaire” à chaque rendu ou à chaque changement d’une variable
  // Ici : on change le titre de la page à chaque fois que le compteur est mis à jour
  useEffect(() => {
    document.title = `Compteur : ${compteur}`
  }, [compteur]) // ← dépendance : se déclenche à chaque modification de “compteur”

  // =============================
  // 🔹 Chargement initial des données
  // =============================
  // Ce useEffect s’exécute une seule fois au montage du composant (car le tableau de dépendances est vide [])
  // Il transforme les objets du fichier JSON en instances de la classe SuperHero
  useEffect(() => {
    const arr = (SuperHerosData as any[]).map(
      (h) => new SuperHero(h.id, h.name, h["id-api"], h.slug)
    )
    setHeroes(arr) // met à jour la variable d’état “heroes”
  }, [])

  // =============================
  // 🔹 Filtrage et tri des héros
  // =============================
  // Le hook useMemo() permet d’éviter de recalculer inutilement une valeur si les dépendances n’ont pas changé.
  // Ici, on filtre la liste des héros en fonction du texte saisi dans la recherche.
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return heroes // si la recherche est vide, on retourne toute la liste
    return heroes.filter(h => h.name.toLowerCase().includes(q))
  }, [search, heroes]) // recalcul seulement si “search” ou “heroes” change

  // Tri des résultats (par nom ou par id)
  const sorted = useMemo(() => {
    const arr = [...filtered]
    if (sortOption === 'name') arr.sort((a, b) => a.name.localeCompare(b.name))
    else arr.sort((a, b) => a.id - b.id)
    return arr
  }, [filtered, sortOption])

  // =============================
  // 🔹 Rendu du composant React (partie visible)
  // =============================
  return (
    // Conteneur principal de la page avec un style inline
    <main style={{ textAlign: "center", fontFamily: "system-ui" }}>
      
      {/* Titre principal */}
      <h1>Bonjour {nom}, je découvre React !</h1>

      <hr style={{ margin: '40px' }} />

      {/* Section compteur */}
      <h2 style={{ fontSize: '35px' }}>Compteur : {compteur}</h2>

      {/* Bouton pour incrémenter le compteur */}
      <button 
        onClick={() => setCompteur(compteur + 1)} 
        style={{ marginLeft: 10, backgroundColor: '#d0dee4ff' }}
      >
        +
      </button>

      {/* Bouton pour réinitialiser le compteur */}
      <button 
        onClick={() => setCompteur(0)} 
        style={{ marginLeft: 10, backgroundColor: '#80A1BA' }}
      >
        Réinitialiser
      </button>

      <hr style={{ margin: '40px' }} />

      {/* Section liste de super-héros */}
      <h1>Liste des super-héros</h1>

      {/* Affichage du nombre total de héros */}
      <div style={{ fontFamily: 'system-ui'}}>
        <h3>La liste contient {total} super-héros :</h3>
      </div>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher un héros…"
        value={search}
        onChange={e => setSearch(e.target.value)} // met à jour le state “search” à chaque frappe
        style={{ padding: 8, width: '67%', marginRight: 12 }}
      />

      {/* Liste dynamique des super-héros */}
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
        {/* Parcours du tableau trié pour créer un <li> par héros */}
        {sorted.map(hero => (
          <li key={hero.id}>
            {/* Chaque héros est un bouton cliquable */}
            <button
              onClick={() => setSelectedHero(hero)} // stocke le héros cliqué
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

        {/* Si aucun résultat ne correspond à la recherche */}
        {sorted.length === 0 && <li>Aucun résultat…</li>}
      </ul>

      {/* Affichage des détails du héros sélectionné */}
      {selectedHero && (
        <div 
          style={{
            border: '1px solid #ddd',
            borderRadius: 12,
            padding: 20,
            marginTop: 20,
            display: 'inline-block',
            background: '#f8f9fa'
          }}
        >
          {/* Tu pourrais ici afficher plus de détails : image, ID, etc. */}
        </div>
      )}
    </main>
  )
}

// Exportation du composant pour pouvoir l’utiliser dans le reste de l’application
export default App
