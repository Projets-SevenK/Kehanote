import { Mascot } from "../components/Mascot";

export function Onboarding({ go }) {
  return (
    <div
      className="kn-screen screen-anim"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        gap: 24,
      }}
    >
      <Mascot mood="happy" size={100} className="float" />
      <h1 className="kn-wordmark" style={{ fontSize: 38, margin: 0 }}>
        Kehanote
      </h1>
      <p style={{ color: "var(--ink-500)", textAlign: "center", margin: 0 }}>
        Ton app de Révision personnelle Nini ✨
      </p>
      <button
        className="btn-primary"
        style={{ width: "100%", marginTop: 16 }}
        onClick={() => go({ name: "home" })}
      >
        Commencer
      </button>
    </div>
  );
}
