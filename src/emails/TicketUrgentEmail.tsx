import { Html, Body, Container, Text, Tailwind } from "@react-email/components";
import React from "react";

type TicketUrgentEmailProps = {
  username: string;
  ticketCode: string;
}

export default function TicketUrgentEmail({ username, ticketCode }: TicketUrgentEmailProps) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-gray-100 p-10 font-sans">
          <Container className="bg-white rounded shadow p-6">
            <Text className="text-2xl font-bold">Urgent Ticket Created</Text>
            <Text>Ticket with Urgent Priority has been created by {username} with ticket code :
            </Text>
            <Text className="font-bold">{ticketCode}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}