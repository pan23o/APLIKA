"use client";
import {useEffect,useState} from "react";
import {createClient} from "../../lib/supabase-browser";

export default function Perfil(){
  const s=createClient();
  const [user,setUser]=useState<any>();
  const [p,setP]=useState<any>();

  useEffect(()=>{
    (async()=>{
      const {data}=await s.auth.getUser();
      if(!data.user){location.href="/auth";return;}
      setUser(data.user);
      const {data:profile}=await s.from("profiles").select("*").eq("id",data.user.id).single();
      setP(profile);
    })();
  },[s]);

  async function out(){await s.auth.signOut();location.href="/"}

  if(!user)return <main className="authPage"><div className="authCard">Cargando…</div></main>;

  return <main className="profilePage"><nav className="nav"><a className="brand" href="/"><span className="brandMark">L</span><span>APLIKA</span></a><button className="loginButton" onClick={out}>Cerrar sesión</button></nav><section className="profileCard"><span className="eyebrow">MI CUENTA</span><h1>{p?.full_name||user.email}</h1><p>{user.email}</p><div className="profileGrid"><div><small>Permiso</small><strong>{p?.license||"B"}</strong></div><div><small>Tipo de cuenta</small><strong>{p?.role==="admin"?"Administrador":"Alumno"}</strong></div></div><a className="primary" href="/">Volver al inicio</a></section></main>
}