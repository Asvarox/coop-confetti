import type * as Party from "partykit/server";

interface MessageConfetti {
  type: "confetti";
    x: number;
    y: number;
}

export type Message = MessageConfetti;

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log(
      `Connected:
  id: ${conn.id}
  room: ${this.party.id}
  url: ${new URL(ctx.request.url).pathname}`
    );
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`connection ${sender.id} sent message: ${message}`);
    try {
        const parsedMessage: Message = JSON.parse(message);
        if (parsedMessage.type === "confetti") {
            this.party.broadcast(message, [sender.id]);
        }
    } catch (e) {
      console.warn("Failed to parse message", e, message);
    }
  }
}

Server satisfies Party.Worker;
