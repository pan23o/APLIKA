"use client";
import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import {createClient} from "../../../lib/supabase-browser";

type Q={id:string;text:string;question?:string;answers?:string[];options?:string[];correct_answer?:number;explanation?:string;image_url?:string};

export default function Examen(){
 const {id}=useParams<{id:string}>(); const s=createClient();
 const [qs,setQs]=useState<Q[]>([]),[idx,setIdx]=useState(0),[answers,setAnswers]=useState<Record<string,number>>({}),[seconds,setSeconds]=useState(30*60),[loading,setLoading]=useState(true),[done,setDone]=useState(false),[error,setError]=useState("");
 useEffect(()=>{(async()=>{const{data}=await s.from("exam_attempts").select("*").eq("id",id).single();if(!data){setError("Examen no encontrado");setLoading(false);return}
   const{data:existing}=await s.from("exam_answers").select("*").eq("attempt_id",id);const map:Record<string,number>={};(existing||[]).forEach((a:any)=>{if(a.answer_index!==null)map[a.question_id]=a.answer_index});setAnswers(map);
   const{data:q}=await s.from("questions").select("*").limit(30);setQs(q||[]);setIdx(data.current_question||0);setLoading(false)})()},[id,s]);
 useEffect(()=>{if(loading||done)return;const t=setInterval(()=>setSeconds(x=>{if(x<=1){clearInterval(t);finish();return 0}return x-1}),1000);return()=>clearInterval(t)},[loading,done]);
 async function choose(n:number){const q=qs[idx];if(!q)return;setAnswers(a=>({...a,[q.id]:n}));await s.from("exam_answers").upsert({attempt_id:id,question_id:q.id,answer_index:n,is_correct:q.correct_answer===n},{onConflict:"attempt_id,question_id"});await s.from("exam_attempts").update({current_question:idx}).eq("id",id)}
 async function finish(){let score=0;for(const q of qs)if(answers[q.id]===q.correct_answer)score++;const passed=score>=27;await s.from("exam_attempts").update({status:"completed",score,passed,completed_at:new Date().toISOString()}).eq("id",id);setDone(true)}
 if(loading)return <main className="authPage"><div className="authCard">Cargando examen…</div></main>;
 if(error)return <main className="authPage"><div className="authCard">{error}</div></main>;
 if(done)return <main className="profilePage"><section className="profileCard"><span className="eyebrow">RESULTADO</span><h1>Examen terminado</h1><p>Tu resultado se ha guardado en APLIKA.</p><a className="primary" href="/examenes">Ver mis exámenes</a></section></main>;
 const q=qs[idx];const opts=q?.answers||q?.options||[];
 return <main className="examPage"><header className="examHeader"><a className="brand" href="/examenes"><span className="brandMark">L</span>APLIKA</a><strong>{Math.floor(seconds/60).toString().padStart(2,"0")}:{(seconds%60).toString().padStart(2,"0")}</strong></header><section className="questionCard"><div className="questionTop"><span>Pregunta {idx+1} de {qs.length}</span><span>{Object.keys(answers).length} respondidas</span></div><h1>{q?.text||q?.question||"Pregunta sin texto"}</h1>{q?.image_url&&<img src={q.image_url} alt="" className="questionImage"/>}<div className="answers">{opts.map((o:string,n:number)=><button key={n} className={answers[q.id]===n?"answer selected":"answer"} onClick={()=>choose(n)}>{String.fromCharCode(65+n)}. {o}</button>)}</div><div className="examActions">{idx>0&&<button className="secondary" onClick={()=>setIdx(x=>x-1)}>Anterior</button>}{idx<qs.length-1?<button className="primary" onClick={()=>setIdx(x=>x+1)}>Siguiente</button>:<button className="primary" onClick={finish}>Finalizar examen</button>}</div></section></main>
}