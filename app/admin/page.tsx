"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { BUCKET, cmsReady, supabase } from "@/lib/supabase";

/**
 * The panel Eddie runs the site from — phone first, because that is where he
 * edits. Every write is optimistic-free: it saves, then reloads the row, so
 * what you see on screen is what is actually in the database.
 */

type Row = Record<string, any>;
const TABS = ["Hero", "Projects", "Services", "Skills", "Testimonials", "Leads"] as const;
type Tab = (typeof TABS)[number];

/** Columns added by supabase-migration-2026-09.sql. Saving degrades without them. */
const EXTRA_PROJECT_COLS = ["client", "year", "problem", "solution", "result", "metrics"];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>("Hero");
  const [toast, setToast] = useState("");

  const flash = useCallback((m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 3200);
  }, []);

  useEffect(() => {
    if (!cmsReady) return setChecking(false);
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setChecking(false);
    });
  }, []);

  if (!cmsReady) return <NotWired />;
  if (checking)
    return (
      <div className="grid min-h-screen place-items-center text-ink-80">
        <Loader2 className="animate-spin" aria-label="Loading" />
      </div>
    );
  if (!authed) return <Login onIn={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-50 border-b border-stone-2 bg-paper/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1080px] items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-paper font-grotesk text-[0.68rem] font-semibold text-paper">
              EN
            </span>
            <span className="display text-[1.05rem] text-ink">Site control</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-stone-2 bg-paper px-3 py-2 text-[0.8rem] text-ink"
            >
              View site
            </a>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                setAuthed(false);
              }}
              aria-label="Log out"
              className="grid h-9 w-9 place-items-center rounded-lg border border-stone-2 bg-paper text-ink-80"
            >
              <LogOut size={15} aria-hidden />
            </button>
          </div>
        </div>

        <div className="no-bar mx-auto flex max-w-[1080px] gap-1.5 overflow-x-auto px-4 pb-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`min-h-[38px] flex-none rounded-lg border px-3.5 text-[0.85rem] transition-colors duration-200 ${
                tab === t
                  ? "border-ink bg-paper-2 text-ink"
                  : "border-stone-2 bg-paper text-ink-80"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-[1080px] px-4 pt-6">
        {tab === "Hero" && <ProfilePanel flash={flash} />}
        {tab === "Projects" && <ProjectsPanel flash={flash} />}
        {tab === "Services" && <ListPanel flash={flash} kind="services" />}
        {tab === "Skills" && <ListPanel flash={flash} kind="skills" />}
        {tab === "Testimonials" && <ListPanel flash={flash} kind="testimonials" />}
        {tab === "Leads" && <LeadsPanel flash={flash} />}
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[100] max-w-[92vw] -translate-x-1/2 rounded-xl border border-stone-2 bg-paper-2 px-5 py-3 text-[0.88rem] text-ink "
        >
          {toast}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── env not configured ────────────────────────── */

function NotWired() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <span className="eyebrow">Admin offline</span>
      <h1 className="mt-5 text-[2rem]">The CMS is not connected.</h1>
      <p className="mt-4 leading-[1.75]">
        This panel needs two environment variables. Add them in Vercel under{" "}
        <span className="text-ink">Settings → Environment Variables</span>, then redeploy:
      </p>
      <pre className="mt-5 overflow-x-auto rounded-xl border border-stone-2 bg-paper p-4 font-grotesk text-[0.78rem] text-vermilion">
        {`NEXT_PUBLIC_SUPABASE_URL=https://zjvroxaehidqjocyjqkp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...`}
      </pre>
      <p className="mt-5 text-[0.9rem] leading-relaxed">
        Use the new <span className="font-grotesk text-ink">sb_publishable_</span> key from
        Supabase → Settings → API Keys. The old <span className="font-grotesk">eyJ…</span> key was
        disabled on 2 Aug 2026 and will not work. The public site keeps running on its built-in
        content until this is set.
      </p>
    </div>
  );
}

/* ──────────────────────────────── login ────────────────────────────────── */

function Login({ onIn }: { onIn: () => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) throw error;
      onIn();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setErr(
        /fetch|network|load failed/i.test(msg)
          ? "Can't reach the database. Check your internet, or that the Supabase URL and key in Vercel are correct."
          : /invalid login/i.test(msg)
            ? "Wrong email or password."
            : msg
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={login} className="border border-stone-2 bg-paper w-full max-w-[400px] p-8">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-paper font-grotesk text-[0.75rem] font-semibold text-paper">
          EN
        </span>
        <h1 className="mt-5 display text-[1.5rem]">Site control</h1>
        <p className="mt-1.5 text-[0.88rem]">Sign in to edit the site.</p>

        <div className="mt-6 space-y-3.5">
          <div>
            <Label htmlFor="ad-email">Email</Label>
            <Input
              id="ad-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <Label htmlFor="ad-pass">Password</Label>
            <Input
              id="ad-pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <button disabled={busy} className="btn btn-primary mt-6 w-full disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : null}
          Sign in
        </button>
        {err && (
          <p role="alert" className="mt-3 text-[0.85rem] text-vermilion-ink">
            {err}
          </p>
        )}
      </form>
    </div>
  );
}

/* ─────────────────────────────── primitives ────────────────────────────── */

const Label = (p: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    {...p}
    className="mb-1.5 block font-grotesk text-[0.66rem] uppercase tracking-[0.14em] text-stone"
  />
);

const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...p}
    className="h-11 w-full rounded-xl border border-stone-2 bg-paper-2 px-3.5 text-[0.9rem] text-ink outline-none transition-colors duration-200 focus:border-ink"
  />
);

const TArea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...p}
    className="w-full resize-y rounded-xl border border-stone-2 bg-paper-2 px-3.5 py-3 text-[0.9rem] leading-relaxed text-ink outline-none transition-colors duration-200 focus:border-ink"
  />
);

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border border-stone-2 bg-paper mb-4 p-5 lg:p-6">
      {title && <h2 className="mb-5 display text-[1.25rem]">{title}</h2>}
      {children}
    </div>
  );
}

function Save({ onClick, busy }: { onClick: () => void; busy?: boolean }) {
  return (
    <button onClick={onClick} disabled={busy} className="btn btn-primary disabled:opacity-60">
      {busy ? <Loader2 size={15} className="animate-spin" aria-hidden /> : null}
      Save
    </button>
  );
}

function Danger({ onClick, label = "Delete" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex min-h-[38px] items-center gap-1.5 rounded-lg border border-stone-2 px-3 text-[0.8rem] text-vermilion-ink transition-colors duration-200 hover:bg-paper-2"
    >
      <Trash2 size={13} aria-hidden />
      {label}
    </button>
  );
}

async function uploadFile(file: File, prefix: string): Promise<string | null> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${prefix}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, cacheControl: "3600" });
  if (error) {
    alert("Upload failed: " + error.message);
    return null;
  }
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/* ──────────────────────────────── profile ──────────────────────────────── */

function ProfilePanel({ flash }: { flash: (m: string) => void }) {
  const [p, setP] = useState<Row>({});
  const [stats, setStats] = useState<{ value: string; label: string }[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from("pf_profile").select("*").eq("id", 1).maybeSingle();
    setP(data || {});
    setStats(Array.isArray(data?.stats) ? data!.stats : []);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const set = (k: string, v: any) => setP((o) => ({ ...o, [k]: v }));

  async function save() {
    setBusy(true);
    const { error } = await supabase
      .from("pf_profile")
      .update({
        hero_eyebrow: p.hero_eyebrow,
        hero_h1: p.hero_h1,
        hero_sub: p.hero_sub,
        hero_promise: p.hero_promise,
        about_md: p.about_md,
        stats,
      })
      .eq("id", 1);
    setBusy(false);
    flash(error ? "Error: " + error.message : "Saved. Live within a minute.");
    if (!error) load();
  }

  async function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    flash("Uploading photo…");
    const url = await uploadFile(f, "photo");
    if (!url) return;
    await supabase.from("pf_profile").update({ photo_url: url }).eq("id", 1);
    set("photo_url", url);
    flash("Photo updated.");
  }

  return (
    <>
      <Card title="Headline & about">
        <div className="space-y-4">
          <div>
            <Label htmlFor="he">Eyebrow (small line above the headline)</Label>
            <Input
              id="he"
              value={p.hero_eyebrow || ""}
              onChange={(e) => set("hero_eyebrow", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="h1">
              Headline — everything after the | turns amber italic
            </Label>
            <TArea
              id="h1"
              rows={2}
              value={p.hero_h1 || ""}
              onChange={(e) => set("hero_h1", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hs">Sub-headline</Label>
            <TArea
              id="hs"
              rows={3}
              value={p.hero_sub || ""}
              onChange={(e) => set("hero_sub", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hp">Promise line (used on the closing CTA)</Label>
            <TArea
              id="hp"
              rows={2}
              value={p.hero_promise || ""}
              onChange={(e) => set("hero_promise", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ab">About paragraph</Label>
            <TArea
              id="ab"
              rows={5}
              value={p.about_md || ""}
              onChange={(e) => set("about_md", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 border-t border-stone-2 pt-5">
          <Label>The four numbers</Label>
          <div className="mt-2 space-y-2">
            {stats.map((s, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="w-[34%]">
                  <Input
                    aria-label={`Stat ${i + 1} value`}
                    placeholder="12+"
                    value={s.value}
                    onChange={(e) =>
                      setStats((a) =>
                        a.map((x, j) => (j === i ? { ...x, value: e.target.value } : x))
                      )
                    }
                  />
                </div>
                <div className="flex-1">
                  <Input
                    aria-label={`Stat ${i + 1} label`}
                    placeholder="Systems shipped"
                    value={s.label}
                    onChange={(e) =>
                      setStats((a) =>
                        a.map((x, j) => (j === i ? { ...x, label: e.target.value } : x))
                      )
                    }
                  />
                </div>
                <button
                  onClick={() => setStats((a) => a.filter((_, j) => j !== i))}
                  aria-label={`Remove stat ${i + 1}`}
                  className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-stone-2 text-ink-80"
                >
                  <X size={14} aria-hidden />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStats((a) => [...a, { value: "", label: "" }])}
            className="mt-3 flex min-h-[38px] items-center gap-1.5 rounded-lg border border-stone-2 px-3 text-[0.82rem] text-ink-80"
          >
            <Plus size={13} aria-hidden />
            Add a number
          </button>
        </div>

        <div className="mt-6">
          <Save onClick={save} busy={busy} />
        </div>
      </Card>

      <Card title="Your photo">
        <div className="flex flex-wrap items-center gap-5">
          {p.photo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.photo_url}
              alt="Current portrait"
              className="h-[120px] w-[96px] rounded-xl border border-stone-2 object-cover"
            />
          )}
          <div className="min-w-[220px] flex-1">
            <Label htmlFor="ph">Upload a new one (tall portrait works best)</Label>
            <input
              id="ph"
              type="file"
              accept="image/*"
              onChange={onPhoto}
              className="w-full text-[0.82rem] text-ink-80 file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:text-paper"
            />
          </div>
        </div>
      </Card>
    </>
  );
}

/* ──────────────────────────────── projects ─────────────────────────────── */

function ProjectsPanel({ flash }: { flash: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("pf_projects").select("*").order("sort");
    setRows(data || []);
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  async function add() {
    const { error } = await supabase.from("pf_projects").insert([
      {
        title: "New project",
        blurb: "One sentence on what it does for its owner.",
        tags: ["Web"],
        sort: (rows[rows.length - 1]?.sort ?? 0) + 1,
      },
    ]);
    if (error) return flash("Error: " + error.message);
    flash("Added. Open it and fill it in.");
    load();
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="display text-[1.25rem]">Projects</h2>
        <button onClick={add} className="btn btn-quiet !min-h-[42px] !px-4 !text-[0.85rem]">
          <Plus size={14} aria-hidden />
          New project
        </button>
      </div>

      {loading && <p className="text-ink-80">Loading…</p>}
      {!loading && !rows.length && (
        <div className="border border-stone-2 bg-paper p-8 text-center">
          <p className="text-ink-80">No projects yet. The site is showing its built-in examples.</p>
          <button onClick={add} className="btn btn-primary mt-5">
            <Plus size={15} aria-hidden />
            Add your first
          </button>
        </div>
      )}

      {rows.map((p) => (
        <ProjectItem key={p.id} row={p} reload={load} flash={flash} />
      ))}
    </>
  );
}

function ProjectItem({
  row,
  reload,
  flash,
}: {
  row: Row;
  reload: () => void;
  flash: (m: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState<Row>(row);
  const [metrics, setMetrics] = useState<{ value: string; label: string }[]>(
    Array.isArray(row.metrics) ? row.metrics : []
  );

  const set = (k: string, v: any) => setF((o) => ({ ...o, [k]: v }));

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    flash("Uploading image…");
    const url = await uploadFile(file, "project");
    if (!url) return;
    set("cover_url", url);
    flash("Image ready — press Save.");
  }

  async function save() {
    setBusy(true);
    const base: Row = {
      title: f.title,
      blurb: f.blurb,
      accent: f.accent || "#F0A64B",
      live_url: f.live_url || null,
      cover_url: f.cover_url || null,
      sort: Number(f.sort) || 0,
      published: !!f.published,
      tags: String(f.tags ?? "")
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean),
    };
    const full: Row = {
      ...base,
      client: f.client || null,
      year: f.year || null,
      problem: f.problem || null,
      solution: f.solution || null,
      result: f.result || null,
      metrics: metrics.filter((m) => m.value || m.label),
    };

    let { error } = await supabase.from("pf_projects").update(full).eq("id", row.id);

    // The case-study columns only exist after supabase-migration-2026-09.sql.
    // Without them, keep the basics saveable and say exactly what is missing.
    if (error && EXTRA_PROJECT_COLS.some((c) => error!.message.includes(c))) {
      ({ error } = await supabase.from("pf_projects").update(base).eq("id", row.id));
      flash(
        error
          ? "Error: " + error.message
          : "Saved the basics. Run supabase-migration-2026-09.sql to store the case-study fields."
      );
    } else {
      flash(error ? "Error: " + error.message : "Saved. Live within a minute.");
    }

    setBusy(false);
    reload();
  }

  async function del() {
    if (!confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("pf_projects").delete().eq("id", row.id);
    flash(error ? "Error: " + error.message : "Deleted.");
    reload();
  }

  const tagsValue = Array.isArray(f.tags) ? f.tags.join(", ") : (f.tags ?? "");

  return (
    <div className="border border-stone-2 bg-paper mb-3 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        {row.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={row.cover_url}
            alt=""
            className="h-12 w-16 flex-none rounded-lg border border-stone-2 object-cover"
          />
        ) : (
          <span className="grid h-12 w-16 flex-none place-items-center rounded-lg border border-stone-2 bg-paper-2 text-stone">
            <ImageIcon size={15} aria-hidden />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.98rem] text-ink">{row.title}</span>
          <span className="block truncate font-grotesk text-[0.7rem] text-stone">
            {(row.tags || []).join(" · ") || "no tags"}
            {row.published ? "" : " · hidden"}
          </span>
        </span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`flex-none text-stone transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="space-y-4 border-t border-stone-2 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={`t-${row.id}`}>Title</Label>
              <Input
                id={`t-${row.id}`}
                value={f.title || ""}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`c-${row.id}`}>Client / where</Label>
              <Input
                id={`c-${row.id}`}
                placeholder="Jean de Dieu / Kigali"
                value={f.client || ""}
                onChange={(e) => set("client", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`b-${row.id}`}>One-line summary (shown on the card)</Label>
            <TArea
              id={`b-${row.id}`}
              rows={2}
              value={f.blurb || ""}
              onChange={(e) => set("blurb", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor={`tg-${row.id}`}>Tags (comma separated)</Label>
              <Input
                id={`tg-${row.id}`}
                value={tagsValue}
                onChange={(e) => set("tags", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`u-${row.id}`}>Live URL</Label>
              <Input
                id={`u-${row.id}`}
                type="url"
                placeholder="https://"
                value={f.live_url || ""}
                onChange={(e) => set("live_url", e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor={`y-${row.id}`}>Year</Label>
              <Input
                id={`y-${row.id}`}
                value={f.year || ""}
                onChange={(e) => set("year", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`a-${row.id}`}>Accent colour</Label>
              <div className="flex gap-2">
                <input
                  id={`a-${row.id}`}
                  type="color"
                  value={f.accent || "#F0A64B"}
                  onChange={(e) => set("accent", e.target.value)}
                  className="h-11 w-12 flex-none cursor-pointer rounded-xl border border-stone-2 bg-paper"
                />
                <Input
                  aria-label="Accent hex"
                  value={f.accent || "#F0A64B"}
                  onChange={(e) => set("accent", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`s-${row.id}`}>Order</Label>
              <Input
                id={`s-${row.id}`}
                type="number"
                value={f.sort ?? 0}
                onChange={(e) => set("sort", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`img-${row.id}`}>Cover image</Label>
            <div className="flex flex-wrap items-center gap-4">
              {f.cover_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.cover_url}
                  alt="Cover preview"
                  className="h-20 w-32 rounded-lg border border-stone-2 object-cover"
                />
              )}
              <input
                id={`img-${row.id}`}
                type="file"
                accept="image/*"
                onChange={onCover}
                className="flex-1 text-[0.82rem] text-ink-80 file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:text-paper"
              />
            </div>
            <p className="mt-2 text-[0.78rem] text-stone">
              Wide screenshot, roughly 1600×1000. No image is fine — the card draws its own.
            </p>
          </div>

          <details className="rounded-xl border border-stone-2 bg-paper p-4">
            <summary className="cursor-pointer text-[0.9rem] text-ink">
              Case study (shown on the project&apos;s own page)
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor={`p-${row.id}`}>The problem they had</Label>
                <TArea
                  id={`p-${row.id}`}
                  rows={3}
                  value={f.problem || ""}
                  onChange={(e) => set("problem", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`so-${row.id}`}>What you built</Label>
                <TArea
                  id={`so-${row.id}`}
                  rows={3}
                  value={f.solution || ""}
                  onChange={(e) => set("solution", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`r-${row.id}`}>What changed for them</Label>
                <TArea
                  id={`r-${row.id}`}
                  rows={3}
                  value={f.result || ""}
                  onChange={(e) => set("result", e.target.value)}
                />
              </div>

              <div>
                <Label>Big numbers (up to 4)</Label>
                <div className="space-y-2">
                  {metrics.map((m, i) => (
                    <div key={i} className="flex items-end gap-2">
                      <div className="w-[34%]">
                        <Input
                          aria-label={`Metric ${i + 1} value`}
                          placeholder="24/7"
                          value={m.value}
                          onChange={(e) =>
                            setMetrics((a) =>
                              a.map((x, j) => (j === i ? { ...x, value: e.target.value } : x))
                            )
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          aria-label={`Metric ${i + 1} label`}
                          placeholder="Coverage"
                          value={m.label}
                          onChange={(e) =>
                            setMetrics((a) =>
                              a.map((x, j) => (j === i ? { ...x, label: e.target.value } : x))
                            )
                          }
                        />
                      </div>
                      <button
                        onClick={() => setMetrics((a) => a.filter((_, j) => j !== i))}
                        aria-label={`Remove metric ${i + 1}`}
                        className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-stone-2 text-ink-80"
                      >
                        <X size={14} aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
                {metrics.length < 4 && (
                  <button
                    onClick={() => setMetrics((a) => [...a, { value: "", label: "" }])}
                    className="mt-3 flex min-h-[38px] items-center gap-1.5 rounded-lg border border-stone-2 px-3 text-[0.82rem] text-ink-80"
                  >
                    <Plus size={13} aria-hidden />
                    Add a number
                  </button>
                )}
              </div>
            </div>
          </details>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-2 pt-4">
            <label className="flex cursor-pointer items-center gap-2.5 text-[0.88rem] text-ink">
              <input
                type="checkbox"
                checked={!!f.published}
                onChange={(e) => set("published", e.target.checked)}
                className="h-4 w-4 accent-[#1D2725]"
              />
              Show on the site
            </label>
            <div className="flex items-center gap-2">
              <Danger onClick={del} />
              <Save onClick={save} busy={busy} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────────── generic list panels (services/skills/quotes) ────────── */

type Kind = "services" | "skills" | "testimonials";

const KIND: Record<
  Kind,
  { table: string; title: string; blank: Row; fields: [string, string, "line" | "area"][] }
> = {
  services: {
    table: "pf_services",
    title: "Services",
    blank: { title: "New service", outcome: "What the client gets.", icon: "globe", sort: 99 },
    fields: [
      ["title", "Title", "line"],
      ["outcome", "What it does for them", "area"],
      ["icon", "Icon: globe, chat, repeat or chart", "line"],
    ],
  },
  skills: {
    table: "pf_skills",
    title: "Skills",
    blank: { grp: "Systems", label: "New capability", sort: 99 },
    fields: [
      ["grp", "Group (each unique group is a column)", "line"],
      ["label", "Label", "line"],
    ],
  },
  testimonials: {
    table: "pf_testimonials",
    title: "Testimonials",
    blank: { name: "Client name", role: "Company", quote: "What they said.", sort: 99 },
    fields: [
      ["quote", "Quote", "area"],
      ["name", "Name", "line"],
      ["role", "Company / role", "line"],
    ],
  },
};

function ListPanel({ flash, kind }: { flash: (m: string) => void; kind: Kind }) {
  const cfg = KIND[kind];
  const [rows, setRows] = useState<Row[]>([]);

  const load = useCallback(async () => {
    const { data } = await supabase.from(cfg.table).select("*").order("sort");
    setRows(data || []);
  }, [cfg.table]);
  useEffect(() => {
    load();
  }, [load]);

  async function add() {
    const { error } = await supabase.from(cfg.table).insert([cfg.blank]);
    flash(error ? "Error: " + error.message : "Added.");
    load();
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="display text-[1.25rem]">{cfg.title}</h2>
        <button onClick={add} className="btn btn-quiet !min-h-[42px] !px-4 !text-[0.85rem]">
          <Plus size={14} aria-hidden />
          New
        </button>
      </div>

      {rows.map((r) => (
        <ListItem key={r.id} row={r} cfg={cfg} kind={kind} reload={load} flash={flash} />
      ))}
      {!rows.length && <p className="text-ink-80">Nothing here yet.</p>}
    </>
  );
}

function ListItem({
  row,
  cfg,
  kind,
  reload,
  flash,
}: {
  row: Row;
  cfg: (typeof KIND)[Kind];
  kind: Kind;
  reload: () => void;
  flash: (m: string) => void;
}) {
  const [f, setF] = useState<Row>(row);
  const [busy, setBusy] = useState(false);
  const set = (k: string, v: any) => setF((o) => ({ ...o, [k]: v }));

  async function save() {
    setBusy(true);
    const payload: Row = { sort: Number(f.sort) || 0 };
    cfg.fields.forEach(([k]) => (payload[k] = f[k]));
    if (kind === "testimonials") payload.published = !!f.published;
    const { error } = await supabase.from(cfg.table).update(payload).eq("id", row.id);
    setBusy(false);
    flash(error ? "Error: " + error.message : "Saved.");
    reload();
  }

  async function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    flash("Uploading…");
    const url = await uploadFile(file, "avatar");
    if (!url) return;
    await supabase.from(cfg.table).update({ avatar_url: url }).eq("id", row.id);
    flash("Photo updated.");
    reload();
  }

  return (
    <div className="border border-stone-2 bg-paper mb-3 space-y-4 p-4 lg:p-5">
      {cfg.fields.map(([k, label, type]) => (
        <div key={k}>
          <Label htmlFor={`${row.id}-${k}`}>{label}</Label>
          {type === "area" ? (
            <TArea
              id={`${row.id}-${k}`}
              rows={3}
              value={f[k] || ""}
              onChange={(e) => set(k, e.target.value)}
            />
          ) : (
            <Input
              id={`${row.id}-${k}`}
              value={f[k] || ""}
              onChange={(e) => set(k, e.target.value)}
            />
          )}
        </div>
      ))}

      {kind === "testimonials" && (
        <div className="flex flex-wrap items-center gap-4">
          {row.avatar_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={row.avatar_url}
              alt=""
              className="h-12 w-12 rounded-full border border-stone-2 object-cover"
            />
          )}
          <div className="min-w-[200px] flex-1">
            <Label htmlFor={`av-${row.id}`}>Photo or logo</Label>
            <input
              id={`av-${row.id}`}
              type="file"
              accept="image/*"
              onChange={onAvatar}
              className="w-full text-[0.82rem] text-ink-80 file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-2 file:text-paper"
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2.5 text-[0.88rem] text-ink">
            <input
              type="checkbox"
              checked={!!f.published}
              onChange={(e) => set("published", e.target.checked)}
              className="h-4 w-4 accent-[#1D2725]"
            />
            Public
          </label>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-t border-stone-2 pt-4">
        <div className="w-[110px]">
          <Label htmlFor={`o-${row.id}`}>Order</Label>
          <Input
            id={`o-${row.id}`}
            type="number"
            value={f.sort ?? 0}
            onChange={(e) => set("sort", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Danger
            onClick={async () => {
              if (!confirm("Delete this?")) return;
              await supabase.from(cfg.table).delete().eq("id", row.id);
              flash("Deleted.");
              reload();
            }}
          />
          <Save onClick={save} busy={busy} />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────── leads ───────────────────────────────── */

function LeadsPanel({ flash }: { flash: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pf_leads")
      .select("*")
      .order("created_at", { ascending: false });
    setErr(error?.message || "");
    setRows(data || []);
    setLoading(false);
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const unread = rows.filter((r) => r.status === "new").length;

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="display text-[1.25rem]">
          Leads{" "}
          {unread > 0 && (
            <span className="ml-1 rounded-full bg-paper px-2 py-0.5 font-grotesk text-[0.7rem] text-paper">
              {unread} new
            </span>
          )}
        </h2>
        <button
          onClick={load}
          className="flex min-h-[42px] items-center gap-1.5 rounded-lg border border-stone-2 px-3.5 text-[0.85rem] text-ink-80"
        >
          <RefreshCw size={14} aria-hidden />
          Refresh
        </button>
      </div>

      {err && (
        <p role="alert" className="border border-stone-2 bg-paper mb-4 p-4 text-[0.88rem] text-vermilion-ink">
          {err} — if this mentions a policy, run supabase-migration-2026-09.sql.
        </p>
      )}
      {loading && <p className="text-ink-80">Loading…</p>}
      {!loading && !rows.length && !err && <p className="text-ink-80">No leads yet.</p>}

      {rows.map((l) => (
        <div
          key={l.id}
          className={`border border-stone-2 bg-paper mb-3 p-5 ${l.status === "new" ? "border-l-2 border-l-vermilion" : ""}`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="text-[0.98rem] text-ink">
              {l.name || "Someone"}
              {l.email && (
                <a href={`mailto:${l.email}`} className="ml-2 text-[0.85rem] text-vermilion">
                  {l.email}
                </a>
              )}
            </div>
            <span className="font-grotesk text-[0.72rem] text-stone">
              {new Date(l.created_at).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-[0.9rem] text-ink">{l.subject}</div>
          <p className="mt-1.5 whitespace-pre-wrap text-[0.88rem] leading-relaxed">{l.message}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {l.status === "new" && (
              <button
                onClick={async () => {
                  await supabase.from("pf_leads").update({ status: "read" }).eq("id", l.id);
                  load();
                }}
                className="min-h-[38px] rounded-lg border border-stone-2 px-3 text-[0.82rem] text-ink-80"
              >
                Mark read
              </button>
            )}
            <Danger
              onClick={async () => {
                if (!confirm("Delete this lead?")) return;
                await supabase.from("pf_leads").delete().eq("id", l.id);
                flash("Deleted.");
                load();
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
}
