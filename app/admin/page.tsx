"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase, BUCKET } from "@/lib/supabase";

type Row = Record<string, any>;
const TABS = ["Hero / About", "Projects", "Services", "Skills", "Testimonials", "Leads"] as const;
type Tab = (typeof TABS)[number];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<Tab>("Hero / About");
  const [toast, setToast] = useState("");

  const flash = useCallback((m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2600);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setChecking(false);
    });
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) return setErr(error.message);
    setAuthed(true);
  }
  async function logout() {
    await supabase.auth.signOut();
    setAuthed(false);
  }

  if (checking) return <div className="grid min-h-screen place-items-center text-coffee-soft">Loading…</div>;

  if (!authed)
    return (
      <div className="grid min-h-screen place-items-center px-6">
        <form onSubmit={login} className="w-full max-w-[400px] rounded-[20px] border border-mocha-line bg-paper p-9 shadow-[var(--shadow-card)]">
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-[13px] bg-gradient-to-br from-caramel to-caramel-deep font-bold text-white">EN</div>
          <h2 className="font-display text-[1.5rem] text-espresso">Portfolio Admin</h2>
          <p className="mb-5 mt-1.5 text-[0.9rem] text-coffee-soft">Sign in to manage your site.</p>
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
          <div className="h-3.5" />
          <Label>Password</Label>
          <Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required autoComplete="current-password" />
          <button className="mt-5 w-full rounded-[11px] bg-gradient-to-br from-caramel to-caramel-deep py-3 font-semibold text-white">Sign In</button>
          {err && <p className="mt-3 text-[0.86rem] text-[#a8331f]">{err}</p>}
        </form>
      </div>
    );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-mocha-line bg-cream/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-4 px-5 py-3.5">
          <div className="flex items-center gap-3 font-display font-extrabold text-espresso">
            <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-gradient-to-br from-caramel to-caramel-deep text-[0.85rem] font-bold text-white">EN</span>
            Portfolio Admin
          </div>
          <div className="flex items-center gap-2.5">
            <a href="/" target="_blank" className="rounded-[10px] border border-mocha-line bg-paper px-3.5 py-2 text-[0.82rem] font-semibold text-espresso">View site ↗</a>
            <button onClick={logout} className="rounded-[10px] border border-mocha-line bg-paper px-3.5 py-2 text-[0.82rem] font-semibold text-espresso">Log out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1080px] px-5 pb-24 pt-6">
        <div className="mb-6 flex flex-wrap gap-1.5">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-[10px] border px-4 py-2 text-[0.88rem] font-medium ${
                tab === t ? "border-transparent bg-gradient-to-br from-caramel to-caramel-deep text-white" : "border-mocha-line bg-paper text-coffee"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Hero / About" && <ProfilePanel flash={flash} />}
        {tab === "Projects" && <ProjectsPanel flash={flash} />}
        {tab === "Services" && <ServicesPanel flash={flash} />}
        {tab === "Skills" && <SkillsPanel flash={flash} />}
        {tab === "Testimonials" && <TestimonialsPanel flash={flash} />}
        {tab === "Leads" && <LeadsPanel flash={flash} />}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-xl bg-espresso px-5 py-3 text-[0.9rem] text-white shadow-[var(--shadow-card)]">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ── helpers ── */
async function uploadFile(file: File, prefix: string): Promise<string | null> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${prefix}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true, cacheControl: "3600" });
  if (error) { alert("Upload error: " + error.message); return null; }
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}
const Label = (p: any) => <label className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-wide text-coffee-soft" {...p} />;
const Input = (p: any) => <input className="w-full rounded-[10px] border border-mocha-line bg-cream px-3.5 py-2.5 text-[0.92rem] text-espresso outline-none focus:border-caramel" {...p} />;
const TArea = (p: any) => <textarea className="w-full resize-y rounded-[10px] border border-mocha-line bg-cream px-3.5 py-2.5 text-[0.92rem] text-espresso outline-none focus:border-caramel" {...p} />;
const Card = (p: any) => <div className="mb-4 rounded-[16px] border border-mocha-line bg-paper p-6 shadow-[var(--shadow-soft)]" {...p} />;
const Btn = ({ className = "", ...p }: any) => <button className={`rounded-[11px] bg-gradient-to-br from-caramel to-caramel-deep px-5 py-2.5 text-[0.88rem] font-semibold text-white ${className}`} {...p} />;
const BtnGhost = ({ className = "", ...p }: any) => <button className={`rounded-[10px] border border-mocha-line bg-paper px-3 py-1.5 text-[0.82rem] font-semibold text-espresso ${className}`} {...p} />;
const BtnDanger = ({ className = "", ...p }: any) => <button className={`rounded-[10px] border border-[rgba(168,51,31,0.3)] bg-paper px-3 py-1.5 text-[0.82rem] font-semibold text-[#a8331f] ${className}`} {...p} />;

/* ── PROFILE ── */
function ProfilePanel({ flash }: { flash: (m: string) => void }) {
  const [p, setP] = useState<Row>({});
  const [stats, setStats] = useState<{ value: string; label: string }[]>([]);
  const load = useCallback(async () => {
    const { data } = await supabase.from("pf_profile").select("*").eq("id", 1).maybeSingle();
    setP(data || {});
    setStats(Array.isArray(data?.stats) ? data!.stats : []);
  }, []);
  useEffect(() => { load(); }, [load]);
  const set = (k: string, v: any) => setP((o) => ({ ...o, [k]: v }));

  async function save() {
    const { error } = await supabase.from("pf_profile").update({
      hero_eyebrow: p.hero_eyebrow, hero_h1: p.hero_h1, hero_sub: p.hero_sub, hero_promise: p.hero_promise, about_md: p.about_md,
    }).eq("id", 1);
    flash(error ? "Error: " + error.message : "Saved ✓");
  }
  async function saveStats() {
    const { error } = await supabase.from("pf_profile").update({ stats }).eq("id", 1);
    flash(error ? "Error: " + error.message : "Stats saved ✓");
  }
  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    flash("Uploading…");
    const url = await uploadFile(f, "photo");
    if (!url) return;
    await supabase.from("pf_profile").update({ photo_url: url }).eq("id", 1);
    set("photo_url", url);
    flash("Photo updated ✓");
  }

  return (
    <>
      <Card>
        <h3 className="mb-4 font-display text-[1.2rem] text-espresso">Hero &amp; About</h3>
        <Label>Hero eyebrow</Label><Input value={p.hero_eyebrow || ""} onChange={(e: any) => set("hero_eyebrow", e.target.value)} />
        <div className="h-3.5" /><Label>Hero headline (text after &quot;|&quot; shows caramel-italic)</Label><Input value={p.hero_h1 || ""} onChange={(e: any) => set("hero_h1", e.target.value)} />
        <div className="h-3.5" /><Label>Hero subheadline</Label><TArea rows={2} value={p.hero_sub || ""} onChange={(e: any) => set("hero_sub", e.target.value)} />
        <div className="h-3.5" /><Label>Promise line</Label><Input value={p.hero_promise || ""} onChange={(e: any) => set("hero_promise", e.target.value)} />
        <div className="h-3.5" /><Label>About paragraph</Label><TArea rows={4} value={p.about_md || ""} onChange={(e: any) => set("about_md", e.target.value)} />
        <div className="mt-4"><Btn onClick={save}>Save Hero &amp; About</Btn></div>
      </Card>

      <Card>
        <h3 className="mb-4 font-display text-[1.2rem] text-espresso">Your Photo</h3>
        <div className="flex flex-wrap items-center gap-4">
          {p.photo_url && <img src={p.photo_url} alt="" className="h-[120px] w-[90px] rounded-[14px] border border-mocha-line object-cover" />}
          <div className="min-w-[220px] flex-1">
            <Label>Upload new photo (tall portrait works best)</Label>
            <input type="file" accept="image/*" onChange={onPhoto} className="text-[0.85rem]" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-display text-[1.2rem] text-espresso">Stats (the 4 numbers)</h3>
        {stats.map((s, i) => (
          <div key={i} className="mb-2.5 flex items-end gap-2">
            <div className="flex-1"><Label>Value</Label><Input value={s.value} onChange={(e: any) => setStats((a) => a.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} /></div>
            <div className="flex-1"><Label>Label</Label><Input value={s.label} onChange={(e: any) => setStats((a) => a.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} /></div>
            <BtnDanger onClick={() => setStats((a) => a.filter((_, j) => j !== i))}>✕</BtnDanger>
          </div>
        ))}
        <div className="mt-2 flex gap-2">
          <BtnGhost onClick={() => setStats((a) => [...a, { value: "", label: "" }])}>+ Add stat</BtnGhost>
          <Btn onClick={saveStats}>Save Stats</Btn>
        </div>
      </Card>
    </>
  );
}

/* ── generic list panel for projects/services/skills/testimonials ── */
function ProjectsPanel({ flash }: { flash: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const load = useCallback(async () => { const { data } = await supabase.from("pf_projects").select("*").order("sort"); setRows(data || []); }, []);
  useEffect(() => { load(); }, [load]);
  async function add() { await supabase.from("pf_projects").insert([{ title: "New Project", blurb: "Describe it…", tags: ["Web"], sort: 99 }]); load(); flash("Added ✓"); }
  async function del(id: string) { if (!confirm("Delete this project?")) return; await supabase.from("pf_projects").delete().eq("id", id); load(); flash("Deleted ✓"); }
  async function save(id: string, get: (f: string) => string, file?: File | null) {
    const payload: Row = { title: get("title"), blurb: get("blurb"), accent: get("accent"), live_url: get("live_url"), sort: +get("sort"), published: get("published") === "true", tags: get("tags").split(",").map((s) => s.trim()).filter(Boolean) };
    if (file) { const url = await uploadFile(file, "project"); if (url) payload.cover_url = url; }
    const { error } = await supabase.from("pf_projects").update(payload).eq("id", id); load(); flash(error ? error.message : "Saved ✓");
  }
  return (
    <>
      <div className="mb-3.5 flex items-center justify-between"><h3 className="font-display text-[1.2rem] text-espresso">Projects</h3><BtnGhost onClick={add}>+ New project</BtnGhost></div>
      {rows.map((p) => <ProjectItem key={p.id} p={p} onSave={save} onDel={del} />)}
      {!rows.length && <p className="text-coffee-soft">No projects yet.</p>}
    </>
  );
}
function ProjectItem({ p, onSave, onDel }: any) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const g = (f: string) => (document.getElementById(`pj-${p.id}-${f}`) as HTMLInputElement)?.value ?? "";
  return (
    <div className="mb-3 rounded-[12px] border border-mocha-line bg-cream p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {p.cover_url && <img src={p.cover_url} className="h-[46px] w-[60px] rounded-lg object-cover" alt="" />}
          <div><div className="font-bold text-espresso">{p.title}</div><div className="text-[0.8rem] text-coffee-soft">{(p.tags || []).join(", ")} {p.published ? "" : "· hidden"}</div></div>
        </div>
        <div className="flex gap-2"><BtnGhost onClick={() => setOpen((v) => !v)}>Edit</BtnGhost><BtnDanger onClick={() => onDel(p.id)}>Delete</BtnDanger></div>
      </div>
      {open && (
        <div className="mt-3 grid gap-2.5">
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div><Label>Title</Label><Input id={`pj-${p.id}-title`} defaultValue={p.title} /></div>
            <div><Label>Accent (hex)</Label><Input id={`pj-${p.id}-accent`} defaultValue={p.accent || "#B07A4B"} /></div>
          </div>
          <div><Label>Blurb</Label><TArea id={`pj-${p.id}-blurb`} rows={2} defaultValue={p.blurb} /></div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div><Label>Tags (comma separated)</Label><Input id={`pj-${p.id}-tags`} defaultValue={(p.tags || []).join(", ")} /></div>
            <div><Label>Live URL</Label><Input id={`pj-${p.id}-live_url`} defaultValue={p.live_url || ""} /></div>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div><Label>Sort</Label><Input id={`pj-${p.id}-sort`} type="number" defaultValue={p.sort || 0} /></div>
            <div><Label>Published</Label>
              <select id={`pj-${p.id}-published`} defaultValue={String(!!p.published)} className="w-full rounded-[10px] border border-mocha-line bg-cream px-3.5 py-2.5 text-[0.92rem] text-espresso">
                <option value="true">Yes</option><option value="false">No</option>
              </select>
            </div>
          </div>
          <div><Label>Cover image</Label><input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-[0.85rem]" /></div>
          <Btn className="w-max" onClick={() => onSave(p.id, g, file)}>Save</Btn>
        </div>
      )}
    </div>
  );
}

function ServicesPanel({ flash }: { flash: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const load = useCallback(async () => { const { data } = await supabase.from("pf_services").select("*").order("sort"); setRows(data || []); }, []);
  useEffect(() => { load(); }, [load]);
  return (
    <>
      <div className="mb-3.5 flex items-center justify-between"><h3 className="font-display text-[1.2rem] text-espresso">Services</h3>
        <BtnGhost onClick={async () => { await supabase.from("pf_services").insert([{ title: "New Service", outcome: "What the client gets…", sort: 99 }]); load(); flash("Added ✓"); }}>+ New service</BtnGhost></div>
      {rows.map((s) => {
        const g = (f: string) => (document.getElementById(`sv-${s.id}-${f}`) as HTMLInputElement)?.value ?? "";
        return (
          <div key={s.id} className="mb-3 rounded-[12px] border border-mocha-line bg-cream p-4">
            <div className="mb-2 flex justify-between"><div className="font-bold text-espresso">{s.title}</div><BtnDanger onClick={async () => { if (!confirm("Delete?")) return; await supabase.from("pf_services").delete().eq("id", s.id); load(); flash("Deleted ✓"); }}>Delete</BtnDanger></div>
            <Label>Title</Label><Input id={`sv-${s.id}-title`} defaultValue={s.title} />
            <div className="h-2.5" /><Label>Outcome</Label><TArea id={`sv-${s.id}-outcome`} rows={2} defaultValue={s.outcome} />
            <div className="mt-2 flex items-end gap-2"><div className="w-[120px]"><Label>Sort</Label><Input id={`sv-${s.id}-sort`} type="number" defaultValue={s.sort || 0} /></div>
              <Btn onClick={async () => { const { error } = await supabase.from("pf_services").update({ title: g("title"), outcome: g("outcome"), sort: +g("sort") }).eq("id", s.id); flash(error ? error.message : "Saved ✓"); }}>Save</Btn></div>
          </div>
        );
      })}
      {!rows.length && <p className="text-coffee-soft">No services yet.</p>}
    </>
  );
}

function SkillsPanel({ flash }: { flash: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const load = useCallback(async () => { const { data } = await supabase.from("pf_skills").select("*").order("sort"); setRows(data || []); }, []);
  useEffect(() => { load(); }, [load]);
  return (
    <>
      <div className="mb-3.5 flex items-center justify-between"><h3 className="font-display text-[1.2rem] text-espresso">Skills / Capabilities</h3>
        <BtnGhost onClick={async () => { await supabase.from("pf_skills").insert([{ grp: "24/7 Automated Customer Follow-Up", label: "New capability", sort: 99 }]); load(); flash("Added ✓"); }}>+ New</BtnGhost></div>
      <p className="mb-3.5 text-[0.86rem] text-coffee-soft">Each unique <b>group</b> becomes a column on the site.</p>
      {rows.map((s) => {
        const g = (f: string) => (document.getElementById(`sk-${s.id}-${f}`) as HTMLInputElement)?.value ?? "";
        return (
          <div key={s.id} className="mb-2.5 flex items-end gap-2 rounded-[12px] border border-mocha-line bg-cream p-3">
            <div className="flex-1"><Label>Group</Label><Input id={`sk-${s.id}-grp`} defaultValue={s.grp} /></div>
            <div className="flex-1"><Label>Label</Label><Input id={`sk-${s.id}-label`} defaultValue={s.label} /></div>
            <div className="w-[80px]"><Label>Sort</Label><Input id={`sk-${s.id}-sort`} type="number" defaultValue={s.sort || 0} /></div>
            <Btn onClick={async () => { const { error } = await supabase.from("pf_skills").update({ grp: g("grp"), label: g("label"), sort: +g("sort") }).eq("id", s.id); flash(error ? error.message : "Saved ✓"); }}>Save</Btn>
            <BtnDanger onClick={async () => { await supabase.from("pf_skills").delete().eq("id", s.id); load(); flash("Deleted ✓"); }}>✕</BtnDanger>
          </div>
        );
      })}
      {!rows.length && <p className="text-coffee-soft">No skills yet.</p>}
    </>
  );
}

function TestimonialsPanel({ flash }: { flash: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const load = useCallback(async () => { const { data } = await supabase.from("pf_testimonials").select("*").order("sort"); setRows(data || []); }, []);
  useEffect(() => { load(); }, [load]);
  return (
    <>
      <div className="mb-3.5 flex items-center justify-between"><h3 className="font-display text-[1.2rem] text-espresso">Testimonials</h3>
        <BtnGhost onClick={async () => { await supabase.from("pf_testimonials").insert([{ name: "Client name", role: "Company", quote: "What they said…", sort: 99 }]); load(); flash("Added ✓"); }}>+ New</BtnGhost></div>
      {rows.map((t) => <TItem key={t.id} t={t} load={load} flash={flash} />)}
      {!rows.length && <p className="text-coffee-soft">No testimonials yet.</p>}
    </>
  );
}
function TItem({ t, load, flash }: any) {
  const [file, setFile] = useState<File | null>(null);
  const g = (f: string) => (document.getElementById(`tm-${t.id}-${f}`) as HTMLInputElement)?.value ?? "";
  async function save() {
    const payload: Row = { quote: g("quote"), name: g("name"), role: g("role"), sort: +g("sort"), published: g("published") === "true" };
    if (file) { flash("Uploading photo…"); const url = await uploadFile(file, "avatar"); if (url) payload.avatar_url = url; }
    const { error } = await supabase.from("pf_testimonials").update(payload).eq("id", t.id); load(); flash(error ? error.message : "Saved ✓");
  }
  return (
    <div className="mb-3 rounded-[12px] border border-mocha-line bg-cream p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {t.avatar_url && <img src={t.avatar_url} className="h-[46px] w-[46px] rounded-full object-cover" alt="" />}
          <div className="font-bold text-espresso">{t.name} <span className="text-[0.82rem] font-normal text-coffee-soft">{t.role}</span>
            {t.consent_public ? <span className="ml-1.5 rounded-full bg-[rgba(176,122,75,0.12)] px-2 py-0.5 font-mono text-[0.68rem] text-caramel-deep">client approved</span> : null}
            {!t.published ? <span className="ml-1.5 rounded-full bg-[rgba(176,122,75,0.12)] px-2 py-0.5 font-mono text-[0.68rem] text-caramel-deep">private</span> : null}
          </div>
        </div>
        <BtnDanger onClick={async () => { if (!confirm("Delete?")) return; await supabase.from("pf_testimonials").delete().eq("id", t.id); load(); flash("Deleted ✓"); }}>Delete</BtnDanger>
      </div>
      <Label>Quote / case study</Label><TArea id={`tm-${t.id}-quote`} rows={3} defaultValue={t.quote} />
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        <div><Label>Name</Label><Input id={`tm-${t.id}-name`} defaultValue={t.name} /></div>
        <div><Label>Role / company</Label><Input id={`tm-${t.id}-role`} defaultValue={t.role || ""} /></div>
      </div>
      <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
        <div><Label>Sort</Label><Input id={`tm-${t.id}-sort`} type="number" defaultValue={t.sort || 0} /></div>
        <div><Label>Show on site?</Label>
          <select id={`tm-${t.id}-published`} defaultValue={String(!!t.published)} className="w-full rounded-[10px] border border-mocha-line bg-cream px-3.5 py-2.5 text-[0.92rem] text-espresso">
            <option value="true">Yes — public</option><option value="false">No — private</option>
          </select>
        </div>
      </div>
      <div className="mt-2"><Label>Photo / logo</Label><input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-[0.85rem]" /></div>
      <div className="mt-2"><Btn onClick={save}>Save</Btn></div>
    </div>
  );
}

function LeadsPanel({ flash }: { flash: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const load = useCallback(async () => { const { data } = await supabase.from("pf_leads").select("*").order("created_at", { ascending: false }); setRows(data || []); }, []);
  useEffect(() => { load(); }, [load]);
  return (
    <>
      <div className="mb-3.5 flex items-center justify-between"><h3 className="font-display text-[1.2rem] text-espresso">Leads inbox</h3><BtnGhost onClick={load}>Refresh</BtnGhost></div>
      {rows.map((l) => (
        <div key={l.id} className={`mb-3 rounded-[12px] border border-mocha-line bg-paper p-4 ${l.status === "new" ? "border-l-4 border-l-caramel" : ""}`}>
          <div className="flex flex-wrap justify-between gap-3">
            <div><b className="text-espresso">{l.name || "—"}</b> · <a href={`mailto:${l.email}`} className="text-caramel-deep">{l.email}</a>
              <span className="ml-1.5 rounded-full bg-[rgba(176,122,75,0.12)] px-2 py-0.5 font-mono text-[0.68rem] text-caramel-deep">{l.status}</span></div>
            <div className="text-[0.8rem] text-coffee-soft">{new Date(l.created_at).toLocaleString()}</div>
          </div>
          <div className="my-2 font-medium text-espresso">{l.subject}</div>
          <div className="whitespace-pre-wrap text-[0.9rem] text-coffee-soft">{l.message}</div>
          <div className="mt-2.5 flex gap-2">
            <a className="rounded-[10px] border border-mocha-line bg-paper px-3 py-1.5 text-[0.82rem] font-semibold text-espresso" href={`mailto:${l.email}?subject=Re: ${encodeURIComponent(l.subject || "")}`}>Reply</a>
            {l.status === "new" && <BtnGhost onClick={async () => { await supabase.from("pf_leads").update({ status: "read" }).eq("id", l.id); load(); }}>Mark read</BtnGhost>}
            <BtnDanger onClick={async () => { if (!confirm("Delete lead?")) return; await supabase.from("pf_leads").delete().eq("id", l.id); load(); flash("Deleted ✓"); }}>Delete</BtnDanger>
          </div>
        </div>
      ))}
      {!rows.length && <p className="text-coffee-soft">No leads yet.</p>}
    </>
  );
}
