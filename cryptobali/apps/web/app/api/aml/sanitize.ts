export function scoreToVerdict(score:number){
  if (score < 20) return 'Низкий риск'
  if (score < 60) return 'Средний риск'
  return 'Высокий риск'
}