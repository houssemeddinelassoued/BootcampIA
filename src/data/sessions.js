// ─── Fil Rouge (idées de startup) ────────────────────────────────────────────
export const FIL_ROUGE_OPTIONS = [
  {
    id: 'ecotrack', emoji: '🌱', name: 'EcoTrack Bizerte', color: 'emerald',
    secteur: 'Développement durable / Industrie', cible: 'PME industrielles de Bizerte / Responsable QHSE',
    tagline: 'Suivi d\'empreinte carbone pour zones industrielles et export',
    persona: {
      nom: 'Sophie Martin', age: 38, emoji: '👩‍💼',
      role: 'Directrice RSE', entreprise: 'TransLog PME (80 salariés)',
      frustrations: [
        'Bilan GES manuel dans 5 fichiers Excel différents',
        'Impossible de suivre les émissions en temps réel',
        'Rapport CSRD chronophage : 3 jours de travail par an',
      ],
      objectifs: [
        'Automatiser la collecte des données carbone',
        'Générer un rapport CSRD en 30 minutes',
        'Sensibiliser les équipes avec des dashboards lisibles',
      ],
      citation: '« Je passe des journées à croiser des données. Je veux me concentrer sur les actions, pas les calculs. »',
      userStories: [
        { persona:'Responsable RSE', action:'importer mes factures d\'énergie', benefice:'calculer mon scope 2 automatiquement', priority:'🔴 Critique' },
        { persona:'Responsable RSE', action:'voir un tableau de bord mensuel', benefice:'suivre l\'évolution de nos émissions', priority:'🔴 Critique' },
        { persona:'Dirigeant', action:'générer le rapport CSRD annuel', benefice:'être conforme à la réglementation', priority:'🟠 Haute' },
        { persona:'Responsable RSE', action:'paramétrer des alertes de dépassement', benefice:'réagir avant la fin du trimestre', priority:'🟠 Haute' },
        { persona:'Employé', action:'voir mon impact carbone personnel', benefice:'comprendre ma contribution et agir', priority:'🟡 Moyenne' },
      ],
    },
    pitchDeck: {
      probleme: '78 % des PME sont sous obligation CSRD mais sans outil adapté — bilan GES = 3 jours de travail manuel.',
      solution: 'EcoTrack automatise la collecte (API bancaires + OCR factures) et génère le rapport CSRD en 30 min.',
      marche: 'TAM : 300 K PME françaises concernées · SAM : 50 K PME > 50 salariés · SOM (an 1) : 2 000 PME',
      equipe: 'Sophie (ex-Deloitte RSE) · Alex (CTO ex-Greenly) · Marie (Product ex-Qonto)',
      mvp: 'Import CSV + calcul scopes 1-2 + dashboard · 12 PME pilotes · NPS 72',
      monetisation: 'SaaS 149 €/mois (< 50 sal.) · 399 €/mois (< 250 sal.) · Rapport CSRD 999 €',
    },
    coldEmail: `Objet : EcoTrack — votre bilan CSRD en 30 min (au lieu de 3 jours)

Bonjour [Prénom],

Votre PME est concernée par la CSRD 2025 — mais sortir le bilan GES vous prend encore 3 jours de tableaux Excel ?

EcoTrack connecte vos factures et comptes en 20 minutes, calcule vos scopes 1-2-3 automatiquement et génère le rapport réglementaire en un clic.

12 PME l'utilisent déjà — je vous offre un audit carbone gratuit en 30 min.

Un créneau cette semaine ?

Sophie
Co-fondatrice, EcoTrack`,
    pitchElevator: `EcoTrack est le premier outil de pilotage carbone conçu pour les PME sous obligation CSRD. Là où les grandes entreprises ont des équipes RSE, nous offrons la même puissance en 3 clics : import de données, calcul automatique des scopes 1-2-3, et rapport CSRD en 30 minutes au lieu de 3 jours. Cible : les 50 000 PME françaises concernées dès 2025. Phase pilote : 12 clients, NPS 72. Nous levons 800 K€ pour accélérer l'intégration bancaire et les partenariats comptables.`,
  },
  {
    id: 'talentmatch', emoji: '🌾', name: 'AgroSense', color: 'blue',
    secteur: 'AgriTech', cible: 'Exploitations agricoles / Coopératives locales',
    tagline: 'Aide IA pour irrigation, rendement et alertes maladies cultures',
    persona: {
      nom: 'Thomas Dubois', age: 32, emoji: '👨‍💻',
      role: 'Head of Talent', entreprise: 'SaaS startup (50 salariés)',
      frustrations: ['Trier 200 CV par offre manuellement', 'Questions d\'entretien répétitives', 'Pas d\'ATS adapté aux startups'],
      objectifs: ['Réduire le time-to-hire à 2 semaines', 'Identifier les bons profils en 10 min', 'Standardiser les entretiens'],
      citation: '« Je noie dans les CV. J\'ai besoin d\'un premier filtre intelligent avant de perdre 2h par candidat. »',
      userStories: [
        { persona:'Recruteur', action:'uploader un CV et une fiche de poste', benefice:'obtenir un score de matching en 30 secondes', priority:'🔴 Critique' },
        { persona:'Recruteur', action:'recevoir des questions d\'entretien adaptées', benefice:'mener un entretien structuré', priority:'🔴 Critique' },
        { persona:'Manager', action:'voir les points forts/faibles du candidat', benefice:'prendre une décision éclairée', priority:'🟠 Haute' },
      ],
    },
    pitchDeck: {
      probleme: 'Time-to-hire moyen : 6 semaines. 73 % du temps = triage manuel de CV.',
      solution: 'TalentMatch score les CV en 30 secondes et génère des questions d\'entretien personnalisées.',
      marche: '5 M startups mondiales · marché RH tech : 30 Md$',
      equipe: 'Thomas (ex-Doctolib RH) · Julie (ML Engineer)',
      mvp: 'Scoring + questions · 8 bêta clients · 4.8/5',
      monetisation: '49 €/mois · 199 €/mois illimité',
    },
    coldEmail: `Objet : Réduire votre time-to-hire à 2 semaines — sans ATS coûteux

Bonjour [Prénom],

Votre équipe trie 200 CV par semaine à la main ? TalentMatch score chaque profil en 30 secondes et génère les questions d'entretien adaptées automatiquement.

8 startups l'utilisent déjà — essai gratuit 14 jours.

Thomas`,
    pitchElevator: `TalentMatch réduit le time-to-hire de 6 semaines à 2, en scorant les CV en 30 secondes et générant des questions d'entretien sur mesure. Cible : startups de 10 à 200 salariés. 8 clients bêta, NPS 68. Nous cherchons 300 K€ d'amorçage.`,
  },
  {
    id: 'juribot', emoji: '🏭', name: 'QualiChain Agro', color: 'amber',
    secteur: 'Agroalimentaire / Traçabilité', cible: 'PME agroalimentaires / Responsables qualité',
    tagline: 'Traçabilité lots + conformité qualité pour filières agro',
    persona: {
      nom: 'Clara Petit', age: 29, emoji: '👩‍🎨',
      role: 'Freelance Designer', entreprise: 'Auto-entrepreneur',
      frustrations: ['Signer des contrats sans les comprendre', 'Pas les moyens d\'un avocat', 'Clauses abusives non détectées'],
      objectifs: ['Comprendre chaque contrat en 5 min', 'Identifier les clauses à renégocier', 'Travailler l\'esprit tranquille'],
      citation: '« J\'ai signé une clause de cession totale des droits sans le réaliser. Plus jamais. »',
      userStories: [
        { persona:'Freelance', action:'uploader mon contrat PDF', benefice:'obtenir un résumé clair en 2 minutes', priority:'🔴 Critique' },
        { persona:'Freelance', action:'voir les clauses à risque surlignées', benefice:'savoir quoi renégocier', priority:'🔴 Critique' },
        { persona:'Freelance', action:'comparer avec un contrat type', benefice:'avoir une référence équitable', priority:'🟠 Haute' },
      ],
    },
    pitchDeck: {
      probleme: '60 % des freelances signent des contrats sans comprendre les clauses à risque. Un avocat coûte 250 €/h.',
      solution: 'JuriBot analyse vos contrats en 2 min, surligne les clauses à risque et propose des reformulations.',
      marche: '3 M freelances en France · 200 M freelances mondiaux',
      equipe: 'Clara (Produit) · Marc (NLP Engineer ex-LexisNexis)',
      mvp: 'Analyse PDF + 5 types de clauses · 200 bêta users · 4.9/5',
      monetisation: 'Freemium (3 analyses/mois) + Pro 19 €/mois illimité',
    },
    coldEmail: `Objet : Signez vos contrats l'esprit tranquille — sans avocat

Bonjour [Prénom],

Avez-vous déjà signé un contrat avec une clause de cession de droits totale sans le voir ? JuriBot analyse votre PDF en 2 minutes et surligne les clauses à risque en rouge.

3 analyses gratuites ce mois-ci.

Clara`,
    pitchElevator: `JuriBot protège les freelances et TPE contre les clauses contractuelles abusives, sans avocat. Upload PDF → résumé clair + clauses à risque surlignées en 2 minutes. 200 bêta testeurs, NPS 81. Nous levons 200 K€ d'amorçage.`,
  },
  {
    id: 'zerogaspi', emoji: '♻️', name: 'ZéroGaspi Bizerte', color: 'orange',
    secteur: 'Agroalimentaire / Économie circulaire', cible: 'Unités de transformation / Distribution locale',
    tagline: 'Prévision des invendus et revalorisation des surplus alimentaires',
    persona: {
      nom: 'Karim Benali', age: 44, emoji: '👨‍🍳',
      role: 'Gérant de restaurant', entreprise: 'Bistrot Le Parisien (35 couverts)',
      frustrations: ['Jeter 80-120 € de nourriture par jour', 'Pas de visibilité sur les invendus', 'Promos faites trop tard'],
      objectifs: ['Réduire le gaspillage de 50 %', 'Lancer des promos automatiques le soir', 'Améliorer la marge brute'],
      citation: '« Je jette l\'équivalent d\'un loyer tous les mois. C\'est insupportable. »',
      userStories: [
        { persona:'Gérant', action:'saisir mes stocks du soir', benefice:'savoir quoi mettre en promo automatiquement', priority:'🔴 Critique' },
        { persona:'Gérant', action:'voir un tableau de bord hebdomadaire', benefice:'identifier mes pics de gaspillage', priority:'🔴 Critique' },
        { persona:'Gérant', action:'envoyer une notification clients', benefice:'écouler les invendus à -30 %', priority:'🟠 Haute' },
      ],
    },
    pitchDeck: {
      probleme: '30 % de la nourriture produite est gaspillée. Un restaurant jette en moyenne 80-150 € par jour.',
      solution: 'ZéroGaspi prédit les invendus et déclenche des promos automatiques via SMS/app, sans action manuelle.',
      marche: '175 000 restaurants en France · CAC moyen : 200 € · LTV : 2 000 €',
      equipe: 'Karim (Opérations restauration) · Lisa (Data Scientist)',
      mvp: 'Prédiction J+1 + notifications · 15 restaurants pilotes · -40 % gaspillage moyen',
      monetisation: '79 €/mois par établissement',
    },
    coldEmail: `Objet : -40 % de gaspillage alimentaire dès le mois prochain

Bonjour [Prénom],

Vous jetez combien par semaine ? ZéroGaspi prédit vos invendus et déclenche les promos automatiquement — sans que vous touchiez à rien.

15 restaurants pilotes : -40 % de gaspillage en moyenne.

Essai gratuit 30 jours — sans engagement.

Karim`,
    pitchElevator: `ZéroGaspi réduit de 40 % le gaspillage alimentaire des restaurants en prédisant les invendus et déclenchant les promos automatiquement. 15 restaurants pilotes, NPS 74. Nous levons 400 K€ pour intégrer les systèmes de caisse.`,
  },
  {
    id: 'coachzen', emoji: '⚙️', name: 'AgtoTech Assistant', color: 'violet',
    secteur: 'Agto Tech / Productivité industrielle', cible: 'Ateliers mécaniques et PME techniques',
    tagline: 'Assistant IA de maintenance, qualité et amélioration continue',
    persona: {
      nom: 'Marie Leclerc', age: 33, emoji: '👩‍💼',
      role: 'Manager marketing', entreprise: 'Grande entreprise (CDI)',
      frustrations: ['Ne tient jamais ses bonnes résolutions', 'Apps trop génériques', 'Manque de temps pour le suivi'],
      objectifs: ['Installer des habitudes durables', 'Réduire le stress quotidien', 'Se sentir accompagnée sans coach coûteux'],
      citation: '« J\'ai essayé 5 apps de bien-être. Elles sont toutes pareilles. J\'ai besoin de quelqu\'un qui me comprend vraiment. »',
      userStories: [
        { persona:'Utilisatrice', action:'décrire mon objectif bien-être', benefice:'obtenir un plan personnalisé en 2 min', priority:'🔴 Critique' },
        { persona:'Utilisatrice', action:'faire un check-in quotidien de 1 min', benefice:'suivre mes progrès sans effort', priority:'🔴 Critique' },
        { persona:'Utilisatrice', action:'recevoir des encouragements adaptés à mon humeur', benefice:'rester motivée même les mauvais jours', priority:'🟠 Haute' },
      ],
    },
    pitchDeck: {
      probleme: '75 % des résolutions échouent avant 3 semaines. Les apps de bien-être ont un taux d\'abandon de 90 % à 30 jours.',
      solution: 'CoachZen adapte le plan quotidien en temps réel selon l\'humeur, la fatigue et les contraintes de l\'utilisateur.',
      marche: 'Marché bien-être digital : 10 Md$ · 30 M d\'utilisateurs potentiels en France',
      equipe: 'Marie (Psychologie comportementale) · Antoine (LLM Engineer)',
      mvp: 'Check-in quotidien + plan adaptatif + nudges · 500 bêta users · 4.7/5',
      monetisation: 'Freemium + Premium 9,99 €/mois',
    },
    coldEmail: `Objet : Et si vos bonnes résolutions tenaient enfin ?

Bonjour [Prénom],

Vous avez commencé l'année avec de bonnes intentions. Elles ont tenu combien de temps ?

CoachZen adapte votre plan bien-être chaque jour selon votre humeur et votre emploi du temps — 1 minute de check-in suffit.

500 personnes l'utilisent déjà. Essai gratuit 14 jours.

Marie`,
    pitchElevator: `CoachZen est un coach de bien-être personnalisé qui adapte votre programme quotidien en temps réel selon votre humeur. Pas une app de plus — une vraie relation de coaching. 500 bêta users, 4.7/5, taux de rétention J30 : 68 %. Nous cherchons 250 K€ d'amorçage.`,
  },
];

// ─── Sessions ─────────────────────────────────────────────────────────────────
export const SESSIONS = [
  {
    id: 1, num: '01', emoji: '🧠',
    title: "L'IA comme Co-fondateur Virtuel",
    subtitle: 'Comprendre, sécuriser, prendre les bonnes décisions',
    duration: 45, color: 'violet',
    accentClass: 'text-violet-400', borderClass: 'border-violet-500/30',
    badgeClass: 'bg-violet-500/15 border-violet-500/30 text-violet-300',
    gradientFrom: 'from-violet-600', gradientTo: 'to-purple-700',
    objective: 'Créer un socle de connaissances commun, démystifier la technologie et instaurer les bonnes pratiques de sécurité.',
    tools: [
      { name:'ChatGPT', org:'OpenAI' }, { name:'Claude', org:'Anthropic' },
      { name:'Mistral (Le Chat)', org:'Mistral AI' }, { name:'Ollama', org:'Local' }, { name:'Hugging Face', org:'Community' },
    ],
    segments: [
      {
        id:'s1-panorama', title:'Panorama & Démystification', duration:15, type:'demo', emoji:'🔍',
        keyPoints:[
          'Un LLM prédit le token suivant — pas une base de données',
          'Le RAG = livre ouvert pendant un examen (anti-hallucinations)',
          'Les agents = employés autonomes qui planifient et agissent',
        ],
        note:'💡 Commencez par faire deviner le mot suivant dans « Demain il va faire… ». Le groupe répond — le concept de prédiction de tokens devient immédiatement concret.\n\n⚠️ Évitez le jargon : tenseurs, transformers, RLHF. Restez sur : tokens, contexte, prédiction.\n\n⏭️ Transition : « Et si on pouvait donner à l\'IA les données de notre startup ? C\'est exactement ce que fait le RAG. »',
      },
      {
        id:'s1-securite', title:'Sécurité & Propriété Intellectuelle', duration:15, type:'theory', emoji:'🔐',
        keyPoints:[
          '🚨 Gratuit ≠ sécurisé — vos données entraînent le modèle',
          '✅ Enterprise/Team = zéro entraînement sur vos données',
          '✅ API = vos données ne réentraînent pas le modèle',
          '✅ Local (Ollama/LM Studio) = tout reste chez vous',
        ],
        note:'🔥 Déclencheur : « Qui a déjà collé du code ou des données clients dans ChatGPT gratuit ? » (Levée de mains — souvent 80 % de la salle). L\'effet choc crée l\'attention.\n\n📌 Règle à mémoriser : « Si c\'est gratuit et en ligne → vos données entraînent le modèle. Période. »\n\n⏭️ Transition : « Maintenant qu\'on sait comment se protéger, voyons où l\'IA crée vraiment de la valeur. »',
      },
      {
        id:'s1-valeur', title:'Création de Valeur — GenAIBIZ', duration:15, type:'activity', emoji:'💡',
        keyPoints:[
          'ROI max : support client, code, contenu, analyse data',
          'Critère d\'automatisabilité : répétitif + basé sur du texte/données',
          'Commencer petit : 1 tâche automatisée = déjà une victoire',
        ],
        note:'🎯 Moment de chaleur humaine. Chacun note sa tâche chronophage → on affiche au mur → on regroupe par catégorie : Contenu, Analyse, Communication, Développement.\n\n🔥 Après l\'activité : « Qui pense que sa tâche peut être automatisée à 80 %+ ? » → presque toutes les mains.\n\n⏭️ Transition : « Gardez votre post-it — en Session 3, on va prototyper exactement ça. »',
      },
    ],
    takeaway: "L'IA n'est ni magique ni une base de données. Sécurisez vos données. Visez le ROI.",
    livrable: "Carte des tâches automatisables de l'équipe (post-its priorisés).",
  },
  {
    id: 2, num: '02', emoji: '🗺️',
    title: 'Planifier, Concevoir & Étudier son marché',
    subtitle: 'Discovery, personas et backlog — tout en 1h',
    duration: 60, color: 'blue',
    accentClass: 'text-blue-400', borderClass: 'border-blue-500/30',
    badgeClass: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    gradientFrom: 'from-blue-600', gradientTo: 'to-cyan-700',
    objective: 'Équiper les profils Business & Produit pour accélérer la phase de discovery et la conception produit.',
    tools: [
      { name:'Perplexity AI', org:'Perplexity' }, { name:'Claude', org:'Anthropic' },
      { name:'NotebookLM', org:'Google' }, { name:'Notion AI', org:'Notion' },
    ],
    segments: [
      {
        id:'s2-marche', title:'Étude de marché augmentée', duration:20, type:'demo', emoji:'🔬',
        keyPoints:[
          'Perplexity : réponses sourcées (toujours vérifier !)',
          'NotebookLM / Claude : analyse de gros PDF en secondes',
          'Mapping concurrentiel en 5 minutes, pas 5 jours',
        ],
        note:'🎯 Démo comparative : tapez la même question dans Google vs Perplexity vs ChatGPT. La différence de qualité et de traçabilité est frappante.\n\n📁 Cas pratique en live : « Analyse le marché des outils carbone B2B France 2025 et donne les 5 acteurs principaux avec leurs différenciateurs. »\n\n⚠️ Rappel permanent : vérifier les sources. Hallucinations possibles même avec Perplexity.\n\n⏭️ Transition : « On a la carte du marché. Maintenant : à qui on vend ? »',
      },
      {
        id:'s2-ideation', title:'Idéation & Structuration Produit', duration:20, type:'workshop', emoji:'✏️',
        keyPoints:[
          'Prompt systémique : Rôle + Contexte + Contraintes + Format',
          'L\'Avocat du Diable pour challenger sans complaisance',
          'Business Model Canvas généré et challengé en 5 min',
        ],
        note:'⚙️ Atelier binômes : 5 min pour construire le prompt du persona. Circulez — aidez les groupes bloqués.\n\nFormule : « Tu es expert en [secteur]. Génère un persona pour [type d\'entreprise] qui cherche à [problème]. Format : prénom, âge, rôle, 3 frustrations, 3 objectifs, une citation. »\n\n🔥 L\'Avocat du Diable : « Joue l\'Avocat du Diable contre EcoTrack. » Les objections générées sont souvent meilleures que celles de la salle.\n\n⏭️ Transition : « On a notre persona. Maintenant, ses frustrations → fonctionnalités. »',
      },
      {
        id:'s2-execution', title:"Du Concept à l'Exécution", duration:20, type:'demo', emoji:'⚙️',
        keyPoints:[
          'User Story : En tant que [persona], je veux [action] afin de [bénéfice]',
          'Backlog = User Stories priorisées (Critique / Haute / Moyenne)',
          'Export direct vers Jira, Notion ou Linear',
        ],
        note:'🎯 Montrez la chaîne complète en live : persona → features → User Stories → backlog formaté.\n\nPrompt exact : « À partir du persona Sophie (Responsable RSE), génère 5 User Stories pour EcoTrack au format "En tant que [rôle], je veux [action] afin de [bénéfice]". Présente-les en tableau avec une colonne Priorité. »\n\n📋 À la fin, chaque groupe doit avoir son backlog — c\'est LE livrable concret.\n\n⏭️ Transition : « Vous avez votre backlog. En Session 3, on prototypera la première User Story. »',
      },
    ],
    takeaway: "Bien cadré, un prompt fait gagner des heures sur la discovery — mais vérifiez toujours les sources.",
    livrable: "Persona + Business Model Canvas + backlog au format tableau.",
  },
  {
    id: 3, num: '03', emoji: '⚡',
    title: 'Prototypage Rapide (esprit hackathon)',
    subtitle: "De l'idée au MVP en 2 heures chrono",
    duration: 120, color: 'orange',
    accentClass: 'text-orange-400', borderClass: 'border-orange-500/30',
    badgeClass: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    gradientFrom: 'from-orange-600', gradientTo: 'to-amber-600',
    objective: "L'effet « waouh » : prouver qu'on passe de l'idée au MVP technique en un temps record.",
    tools: [
      { name:'v0.dev', org:'Vercel' }, { name:'Lovable', org:'Lovable' },
      { name:'bolt.new', org:'StackBlitz' }, { name:'Cursor', org:'Cursor' },
      { name:'GitHub Copilot', org:'GitHub' }, { name:'Windsurf', org:'Codeium' },
    ],
    segments: [
      {
        id:'s3-maquette', title:'Maquettage — profils Business/Design', duration:45, type:'demo', emoji:'🎨',
        keyPoints:[
          'Photo d\'un schéma papier → HTML/Tailwind avec Claude Vision',
          'v0.dev : interface React en quelques prompts texte',
          'Lovable / bolt.new : app complète depuis une description',
        ],
        note:'🎨 Démo choc : dessinez une interface ultra-simple AU TABLEAU (1 header, 1 tableau, 1 bouton). Prenez en photo. Collez dans Claude : « Génère le code HTML/Tailwind de cette interface. » → Effet waouh immédiat.\n\n⚡ v0.dev en live : « Crée un dashboard de suivi carbone avec graphique d\'émissions mensuelles, indicateur scope 1-2-3, bouton d\'export. » → Résultat en 20 secondes.\n\n⏳ Donnez 15 min aux Non-Tech pour créer LEUR maquette (fil rouge).\n\n⏭️ Transition : « Voilà le front. Construisons maintenant le cerveau — l\'API back. »',
      },
      {
        id:'s3-tech', title:'Accélération — profils Tech (live coding)', duration:45, type:'demo', emoji:'💻',
        keyPoints:[
          'Cursor : génération fonction + test unitaire en 1 prompt',
          'GitHub Copilot : complétion contextuelle dans l\'IDE',
          'Débogage de stack trace : résolution en quelques secondes',
        ],
        note:'💻 Démo Cursor/Copilot dans un vrai IDE. Contexte : « Génère un endpoint FastAPI pour calculer le scope 2, avec type hints et son test pytest. »\n\n🐛 Débogage : préparez une vraie stack trace Python AVANT la session (AttributeError ou KeyError). Collez dans l\'IA → résolution quasi-instantanée. L\'effet waouh des profils Tech.\n\n🗄️ Schéma SQL : « Génère le schéma SQLite pour EcoTrack : entreprises, sites, émissions, factures avec les FK. »\n\n⏭️ Transition : « On a le front ET le back. Il reste à connecter les deux — en live. »',
      },
      {
        id:'s3-e2e', title:"Boucle de Création End-to-End", duration:30, type:'activity', emoji:'🔗',
        keyPoints:[
          'User Story du fil rouge → front (Non-Tech) + API back (Tech)',
          'Connexion en direct : fetch() + CORS + endpoint réel',
          'Résultat : un MVP démontrable en 30 minutes',
        ],
        note:'🏆 C\'est LE pic émotionnel de la journée. Constituez les binômes MAINTENANT si pas encore fait.\n\nSimplifier à l\'extrême : 1 seul écran front, 1 seul endpoint back (/calculate-footprint). Ne pas viser la perfection — viser la démonstration.\n\n📦 Plan B : si la connexion lâche, ayez un MVP pré-construit en local prêt à montrer.\n\n🎉 Célébrez chaque étape. Les participants ont besoin d\'encouragements continus.\n\n⏭️ Transition : « Vous avez un MVP. En Session 4, on le pitche. »',
      },
    ],
    takeaway: "Un MVP démontrable se construit en heures, pas en semaines — mais le code généré doit être relu et compris.",
    livrable: "Prototype cliquable (front) connecté à une API minimale (back).",
  },
  {
    id: 4, num: '04', emoji: '🚀',
    title: 'Déploiement, Pitch & Clôture',
    subtitle: "Packager, pitcher et partir avec un plan d'action",
    duration: 45, color: 'emerald',
    accentClass: 'text-emerald-400', borderClass: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    gradientFrom: 'from-emerald-600', gradientTo: 'to-teal-600',
    objective: "Packager le travail, préparer la communication et donner un cap clair pour l'après-formation.",
    tools: [
      { name:'Gamma.app', org:'Gamma' }, { name:'Tome', org:'Tome' },
      { name:'DALL·E 3', org:'OpenAI' }, { name:'Ideogram', org:'Ideogram' },
    ],
    segments: [
      {
        id:'s4-pitch', title:'Pitch & Communication', duration:20, type:'demo', emoji:'🎤',
        keyPoints:[
          'Gamma.app : pitch deck visuel en 30 secondes depuis le BMC',
          'Cold email : contexte + valeur unique + CTA en 1 prompt',
          'Pitch ascenseur 30s : le meilleur test de clarté',
        ],
        note:'🎯 Démo Gamma.app en live : collez le BMC de la Session 2 + « Génère un pitch deck 8 slides : Problème, Solution, Marché, MVP, Démo, Équipe, Modèle éco, Prochaines étapes. » → Résultat visuel en 30 secondes.\n\n✉️ Cold email : montrez le prompt exact, demandez à 2-3 participants de lire le résultat à voix haute.\n\n🎙️ Pitch ascenseur : proposez à 2 volontaires de prononcer leur pitch 30s à voix haute. Très mémorable.\n\n⏭️ Transition : « Maintenant, comment itérer avec les retours utilisateurs ? »',
      },
      {
        id:'s4-suite', title:'Préparer la suite : Analyser & Itérer', duration:10, type:'theory', emoji:'🔄',
        keyPoints:[
          'Analyse de sentiment sur tickets support (catégorisation auto)',
          'Clustering de feedbacks : NPS → thèmes d\'amélioration',
          'Boucle : Feedback → Analyse IA → Action → Re-test',
        ],
        note:'⚡ Section courte mais impactante. Montrez 5-6 feedbacks fictifs + « Catégorise ces retours par thème (UX, Performance, Prix, Fonctionnalités) et donne une note de sentiment. »\n\nObjectif : planter la graine du product data-driven même pour les non-tech.',
      },
      {
        id:'s4-qna', title:"Q&A — Plan d'Action Anti-Bullshit", duration:15, type:'activity', emoji:'🧭',
        keyPoints:[
          '⚠️ Les 3 pièges : hallucinations, code spaghetti, dépendance',
          '🧰 Checklist : 3 outils à installer avant de partir',
          '🎯 Engagement : 1 tâche à automatiser cette semaine',
        ],
        note:'⚠️ Ne JAMAIS sauter cette partie. C\'est elle qui évite les déceptions post-formation.\n\nSoyez honnête : « L\'IA fait des erreurs, génère du code non maintenable, peut s\'arrêter du jour au lendemain. Ce n\'est pas un remplacement — c\'est un accélérateur qui demande une supervision humaine. »\n\n🎯 Engagement final : chacun écrit sur une carte « Cette semaine, je vais utiliser l\'IA pour : ___ » → échangez les cartes (engagement social).\n\n📲 Distribuez la checklist : ChatGPT/Claude + Perplexity + 1 outil de son profil.',
      },
    ],
    takeaway: "L'IA accélère la mise sur le marché — gardez l'humain dans la boucle (revue + esprit critique).",
    livrable: "Pitch deck + cold email + pitch ascenseur + checklist des 3 outils.",
  },
];
