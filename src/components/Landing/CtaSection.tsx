
"use client"


import React, { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CtaSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      await new Promise((r) => setTimeout(r, 600))
      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <section className="section-newsletter bg-[#f3e7cf] py-16">
      <div className="newsletter-inner max-w-3xl mx-auto px-6 text-center">
        <div className="section-label flex justify-center text-sm tracking-widest text-[color:var(--muted-foreground)] mb-2">Join the Circle</div>
        <h2 className="section-title text-3xl sm:text-4xl font-serif lobster-two-bold text-[color:var(--foreground)] mb-3">
          Beauty secrets,
          <br />
          <em className="not-italic text-[color:var(--primary)]">delivered quietly</em>
        </h2>
        <p className="section-body text-[color:var(--muted-foreground)] max-w-xl mx-auto mb-6">First access to new launches, exclusive rituals, and the rare ingredient journal. No noise — only essence.</p>

        <form className="newsletter-form flex flex-wrap justify-center gap-4" onSubmit={handleSubmit}>
          <input
            className="newsletter-input px-4 py-3 rounded-md border border-[color:var(--border)] min-w-[240px] bg-[color:var(--card)] text-[color:var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email address"
          />

          <Button className="rounded-full px-6 py-3 dancing-script-philosophy" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </Button>
        </form>

        <p className="text-xs text-[color:var(--muted-foreground)] mt-4 tracking-wide">By subscribing you agree to our Privacy Policy. Unsubscribe anytime.</p>

        {status === "success" && <p className="text-sm text-green-600 mt-3">Thanks — check your inbox.</p>}
        {status === "error" && <p className="text-sm text-destructive mt-3">Something went wrong. Please try again.</p>}
      </div>
    </section>
  )
}

