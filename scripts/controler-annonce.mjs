import { readFile } from 'node:fs/promises';
const file=process.argv[2];
if(!file){console.error('Usage : node scripts/controler-annonce.mjs chemin/annonce.md');process.exitCode=1;}
else{
  try{
    const text=(await readFile(file,'utf8')).trim();
    const wordCount=text?text.split(/\s+/u).length:0;
    const issues=[];
    if(wordCount>100||wordCount===0)issues.push('Longueur attendue : 1 à 100 mots, titre inclus.');
    for(const [name,pattern] of [['date',/15 novembre 2026/i],['heure',/18\s*h(?:\s*00)?/i],['durée',/90 minutes/i],['format',/en ligne/i],['public',/adultes débutants/i]]) if(!pattern.test(text))issues.push(`Fait attendu absent : ${name}.`);
    if(/14 novembre|17\s*h|https?:\/\//i.test(text))issues.push('Ancienne date, ancien horaire ou lien non fourni détecté.');
    console.log(JSON.stringify({file,wordCount,status:issues.length?'blocked':'checks-passed-review-required',issues,humanReview:['Vérifier chaque fait avec S01','Contrôler titre, objectif, prérequis et appel à l’action','Rechercher les ajouts non sourcés, notamment un prix','Décider sans confondre contrôle syntaxique et fidélité complète']},null,2));
    process.exitCode=issues.length?1:0;
  }catch(error){console.error(error.message);process.exitCode=1;}
}
