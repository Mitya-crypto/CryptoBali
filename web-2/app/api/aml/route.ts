import { NextResponse } from 'next/server'
function verdict(score:number){ if (score<20) return 'Низкий риск'; if (score<60) return 'Средний риск'; return 'Высокий риск' }
export async function POST(){ const score = Math.floor(Math.random()*100); return NextResponse.json({ score, verdict: verdict(score) }) }