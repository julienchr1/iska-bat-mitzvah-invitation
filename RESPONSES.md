# 📊 Gérer les réponses RSVP

Comment consulter, exporter et analyser les réponses des invités.

## 🔍 Consulter en temps réel

### Méthode 1 : Dashboard Supabase (recommandé)

1. Allez sur https://app.supabase.com
2. Ouvrez votre projet
3. Allez dans **Table Editor**
4. Cliquez sur `rsvp_responses`
5. Voyez toutes les réponses en temps réel ✅

### Méthode 2 : SQL Query

Dans **SQL Editor** :

```sql
-- Voir toutes les réponses (les plus récentes d'abord)
SELECT nom, statut_rsvp, nombre_personnes, created_at 
FROM rsvp_responses 
ORDER BY created_at DESC;
```

## 📈 Statistiques

### Résumé par statut

```sql
SELECT 
  statut_rsvp,
  COUNT(*) as nombre_reponses,
  SUM(nombre_personnes) as total_personnes
FROM rsvp_responses
GROUP BY statut_rsvp
ORDER BY nombre_reponses DESC;
```

### Total des participants

```sql
SELECT SUM(nombre_personnes) as total_participants
FROM rsvp_responses
WHERE statut_rsvp = 'oui';
```

### Réponses par jour

```sql
SELECT 
  DATE(created_at) as jour,
  COUNT(*) as reponses,
  SUM(nombre_personnes) as participants
FROM rsvp_responses
GROUP BY DATE(created_at)
ORDER BY jour DESC;
```

## 📥 Exporter les données

### Format CSV

1. Dans Supabase Table Editor
2. Cliquez sur la flèche à côté de `rsvp_responses`
3. Sélectionnez **Export as CSV**
4. Téléchargez le fichier

### Via SQL (avancé)

```sql
-- Exporter en CSV depuis SQL
COPY (
  SELECT nom, statut_rsvp, nombre_personnes, created_at 
  FROM rsvp_responses 
  ORDER BY created_at DESC
) TO STDOUT WITH CSV HEADER;
```

## 🔧 Opérations courantes

### Voir qui a dit "Oui"

```sql
SELECT nom, nombre_personnes, created_at
FROM rsvp_responses
WHERE statut_rsvp = 'oui'
ORDER BY nom;
```

### Voir qui n'a pas répondu

Créez une liste de tous les invités et comparez-la.

### Modifier une réponse

Dans Supabase Table Editor :
1. Cliquez sur la ligne
2. Modifiez les valeurs
3. Sauvegarde automatique ✅

### Supprimer une réponse

1. Cliquez sur la ligne
2. Cliquez sur les 3 points (...)
3. Delete

⚠️ Cette action ne peut pas être annulée !

### Ajouter une réponse manuellement

```sql
INSERT INTO rsvp_responses (nom, statut_rsvp, nombre_personnes)
VALUES ('Marie Dupont', 'oui', 2);
```

## 📋 Checklists

### Avant l'événement

- [ ] Vérifier le nombre total de participants
- [ ] Préparer les places assises
- [ ] Commander le gâteau (nombre correct)
- [ ] Préparer les noms pour les marque-places
- [ ] Rappeler les invités qui n'ont pas répondu

### Après l'événement

- [ ] Remercier ceux qui ont répondu
- [ ] Archiver les données
- [ ] Prendre une capture d'écran des stats

## 📧 Créer un rappel

Vous devez le faire manuellement, mais voici une question à poser :

> Avez-vous confirmé votre présence à la Bat Mitzvah d'Iska ?
> [Lien vers le formulaire]

## 🎯 Cas d'usage

### Cas 1 : "Combien de personnes viendront ?"

```sql
SELECT COUNT(*) as nombre_oui, SUM(nombre_personnes) as participants
FROM rsvp_responses
WHERE statut_rsvp = 'oui';
```

### Cas 2 : "Qui a répondu avec ?"

```sql
SELECT nom, nombre_personnes
FROM rsvp_responses
ORDER BY nombre_personnes DESC;
```

### Cas 3 : "Quand ont-ils répondu ?"

```sql
SELECT 
  HOUR(created_at) as heure,
  COUNT(*) as reponses
FROM rsvp_responses
GROUP BY HOUR(created_at)
ORDER BY heure;
```

## 🔒 Sécurité des données

- Les données sont dans Supabase (serveur sécurisé)
- RLS activé (seulement vous pouvez lire/modifier)
- Jamais de partage public
- Sauvegarde automatique

## 📱 Sur mobile

Supabase mobile est limité. Recommandation :
- Consultez sur desktop pour la meilleure expérience
- Ou installez l'appli Supabase (iOS/Android)

## 🚨 Problèmes

### "Je ne vois pas les réponses"
- Vérifiez que la table existe : `SELECT * FROM rsvp_responses;`
- Vérifiez que RLS ne bloque pas les lectures

### "Un doublon est apparu"
- Quelqu'un a rempli le formulaire deux fois
- Supprimez la deuxième ligne (Table Editor)

### "Je veux réinitialiser"
- Supprimer toutes les données : `DELETE FROM rsvp_responses;`
- ⚠️ Irréversible !

---

**Besoin d'aide ? Consultez [README.md](./README.md)**
