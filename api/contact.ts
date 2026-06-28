import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

function escape(str: string) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SERVICOS: Record<string, string> = {
  landing: "Landing Page",
  visual: "Identidade Visual",
  completo: "Presença Completa",
  outro: "Outro",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { nome, email, empresa, servico, mensagem } = req.body ?? {};

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const servicoLabel = SERVICOS[servico] ?? servico ?? "—";

  try {
    await transporter.sendMail({
      from: `"KORE Studio" <${process.env.GMAIL_USER}>`,
      to: "linkoreoficial@gmail.com",
      replyTo: email,
      subject: `Novo contato via KORE Studio — ${nome}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#0d0d0d;color:#f5f5f0;border-radius:8px">
          <h2 style="margin:0 0 24px;font-size:1.5rem;color:#177c1f">Novo contato pelo site</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#999;width:120px">Nome</td><td style="padding:8px 0">${escape(nome)}</td></tr>
            <tr><td style="padding:8px 0;color:#999">Email</td><td style="padding:8px 0">${escape(email)}</td></tr>
            <tr><td style="padding:8px 0;color:#999">Empresa</td><td style="padding:8px 0">${escape(empresa || "—")}</td></tr>
            <tr><td style="padding:8px 0;color:#999">Serviço</td><td style="padding:8px 0">${escape(servicoLabel)}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #222;margin:24px 0"/>
          <p style="color:#999;margin:0 0 8px">Mensagem</p>
          <p style="margin:0;line-height:1.7;white-space:pre-wrap">${escape(mensagem)}</p>
        </div>
      `,
    });

    return res.status(200).json({ message: "Email enviado com sucesso." });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return res.status(500).json({ message: "Erro ao enviar email. Tente novamente." });
  }
}
