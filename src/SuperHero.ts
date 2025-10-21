// Définition d'une classe pour représenter un super-héros
export class SuperHero {
  // Propriétés du super-héros
  id: number;      // identifiant unique
  name: string;    // nom du héros
  idApi: number;   // identifiant dans une API externe
  slug?: string;   // version courte du nom (optionnelle)

  // Constructeur : permet d'initialiser les propriétés quand on crée un héros
  constructor(id: number, name: string, idApi: number, slug?: string) {
    this.id = id;        // on affecte la valeur reçue à la propriété id
    this.name = name;    // on affecte la valeur reçue à la propriété name
    this.idApi = idApi;  // on affecte la valeur reçue à la propriété idApi
    this.slug = slug;    // on affecte la valeur reçue à la propriété slug
  }
}
