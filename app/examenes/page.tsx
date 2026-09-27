"use client";
import {useEffect,useState} from "react";
import {createClient} from "../../lib/supabase-browser";

export default function Examenes(){
 const s=createClient(); const [attempts,setAttempts]=useState<any[]>([]); const [loading,setLoading]=useState(true);
 useEffect(()=>{(async()=>{const{data:{user}}=await s.auth.getUser();if(!user){location.href="/auth";return}const{data}=await s.from("exam_attempts").select("*").eq("user_id",user.id).order("started_at",{ascending:false});setAttempts(data||[]);setLoading(false)})()},[s]);
 async function nuevo(n:number){const{data:{user}}=await s.auth.getUser();if(!user)return;const{data,error}=await s.from("exam_attempts").insert({user_id:user.id,exam_number:n}).select().single();if(!error&&data)location.href="/examen/"+data.id}
 return <main className="profilePage"><nav className="nav"><a className="brand" href="/"><span className="brandMark">L</span><span>APLIKA</span></a><a className="loginButton" href="/perfil">Mi perfil</a></nav><section className="profileCard"><span className="eyebrow">EXÁMENES</span><h1>Exámenes oficiales de práctica</h1><p>30 preguntas por examen. Tu progreso queda guardado para poder continuar después.</p><div className="examGrid">{[1,2,3].map(n=><button className="primary" key={n} onClick={()=>nuevo(n)}>Examen {n}</button>)}</div><h2>Mis intentos</h2>{loading?<p>Cargando…</p>:attempts.length===0?<p>Aún no tienes exámenes.</p>:attempts.map(a=><div className="attempt" key={a.id}><b>Examen {a.exam_number}</b><span>{a.status==="completed"?(a.passed?"APTO":"NO APTO"):"En curso"}</span></div>)}</section></main>
}